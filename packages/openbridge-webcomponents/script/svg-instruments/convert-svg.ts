import { FrameNode, StyleDict, StyledNode } from "./figma-types";
import { DOMParser, XMLSerializer } from "xmldom";

function childNodes2Elements(nodes: NodeListOf<ChildNode>): Element[] {
  const data = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.nodeName === "#text") continue;
    if (node.nodeName === "defs") continue;
    data.push(node as Element);
  }
  return data;
}

function getSvgId(svgNode: Element): string {
  let svgId = (svgNode.getAttribute("id") as string).replace("Â°", "°");
  const reDeg = /Â°/gi;
  svgId = svgId.replace(reDeg, "°");
  const re = new RegExp("_[0-9]+$");
  if (svgId.match(re)) {
    svgId = svgId.replace(re, "");
  }
  return svgId;
}

function replaceAll(string: string, search: string, replace: string): string {
  return string.split(search).join(replace);
}

function makeid(): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function convertSvg(
  figmaElement: FrameNode,
  svgString: string,
  styles: StyleDict,
  removeAttrs: boolean
): string {
  const svgDoc = new DOMParser().parseFromString(svgString, "text/svg");
  const root = svgDoc.firstChild;
  if (root === null) return "";

  for (const nd of childNodes2Elements(root.childNodes)) {
    const svgId = getSvgId(nd);
    const elementId = figmaElement.name;
    if (svgId !== elementId) {
      console.warn(
        `Figma element id and svg id does not match (${elementId} !== ${svgId})`
      );
    }
    parseNode(figmaElement as unknown as StyledNode, nd, styles, removeAttrs);
  }
  let out = new XMLSerializer().serializeToString(svgDoc);
  const clipPrefix = makeid();
  out = replaceAll(out, "url(#clip", `url(#${clipPrefix}clip`);
  out = replaceAll(out, 'clipPath id="clip', `clipPath id="${clipPrefix}clip`);
  out = replaceAll(out, "url(#path-", `url(#${clipPrefix}path-`);
  out = replaceAll(out, 'mask id="path-', `mask id="${clipPrefix}path-`);
  return out;
}

function findFigmaNode(
  figmaElement: StyledNode,
  svgNode: Element
): StyledNode | undefined {
  const path = getSvgPath(svgNode);
  path.shift();
  return searchFigmaNode(figmaElement, path);
}

/** Searching for figma node matching the svg id path.
 *
 * Supports figma nodes having same name.
 * @param figmaElement
 * @param svgIds
 */
function searchFigmaNode(
  figmaElement: StyledNode,
  svgIds: string[]
): StyledNode | undefined {
  if (svgIds.length === 0) return figmaElement;
  if (figmaElement.children === undefined) return undefined;

  const currentId = svgIds.shift();
  const figmaNodes = figmaElement.children
    .filter((f) => f.name === currentId && f.visible !== false)
    .map((f) => {
      const ids = [...svgIds];
      return searchFigmaNode(f, ids);
    })
    .filter((value) => value !== undefined) as StyledNode[];
  if (figmaNodes.length > 0) return figmaNodes[0];
  else return undefined;
}

function getSvgPath(svgNode: Element): string[] {
  if (svgNode.parentNode === null) return [];
  const svgId = getSvgId(svgNode);

  const ids = getSvgPath(svgNode.parentNode as Element);
  if (svgId.length !== 0) {
    ids.push(svgId);
  }
  return ids;
}

function parseNode(
  figmaRoot: StyledNode,
  svgNode: Element,
  styles: StyleDict,
  removeAttrs: boolean
) {
  const figmaNode = findFigmaNode(figmaRoot, svgNode);
  if (figmaNode === undefined) {
    console.warn(
      `Missing figma node: ${svgNode.getAttribute("id")}. Skipping subnodes.`
    );
    return;
  }

  const cssClasses = [];
  if (svgNode.hasAttribute("id")) {
    if (
      svgNode.hasAttribute("id") &&
      figmaNode.styles &&
      figmaNode.styles.stroke &&
      svgNode.hasAttribute("stroke")
    ) {
      if (removeAttrs) {
        svgNode.removeAttribute("stroke");
        svgNode.removeAttribute("stroke-opacity");
      }
      const strokeStyleId = figmaNode.styles.stroke;
      if (strokeStyleId !== undefined) {
        const styleName = convertStyleName(
          styles[strokeStyleId].name,
          "-stroke"
        );
        cssClasses.push(styleName);
      }
    }

    if (
      svgNode.hasAttribute("id") &&
      figmaNode.styles &&
      figmaNode.styles.fill &&
      svgNode.hasAttribute("fill")
    ) {
      if (removeAttrs) {
        svgNode.removeAttribute("fill");
      }
      const strokeStyleId = figmaNode.styles.fill;
      if (strokeStyleId !== undefined) {
        const styleName = convertStyleName(styles[strokeStyleId].name, "-fill");
        cssClasses.push(styleName);
      }
    }
  } else if (figmaNode.styles) {
    const hasBackground =
      figmaNode.background && figmaNode.background.length === 1;
    const svgHasFill = svgNode.hasAttribute("fill");
    const hasStrokeInsideOrOutside =
      figmaNode.strokeAlign &&
      (figmaNode.strokeAlign === "INSIDE" ||
        figmaNode.strokeAlign === "OUTSIDE");
    const mask = svgNode.getAttribute("mask");
    const hasMaskInsideOrOutside =
      mask && (mask.match(/inside/) || mask.match(/outside/));
    if (
      svgHasFill &&
      !hasMaskInsideOrOutside &&
      ((hasBackground && figmaNode.styles.fills) || figmaNode.styles.fill)
    ) {
      // Special case for background fill for frame
      if (removeAttrs) {
        svgNode.removeAttribute("fill");
      }

      const strokeStyleId = figmaNode.styles.fills || figmaNode.styles.fill;
      if (strokeStyleId !== undefined) {
        const styleName = convertStyleName(styles[strokeStyleId].name, "-fill");
        cssClasses.push(styleName);
      }
    }

    if (
      hasStrokeInsideOrOutside &&
      hasMaskInsideOrOutside &&
      svgHasFill &&
      figmaNode.styles &&
      figmaNode.styles.stroke
    ) {
      if (removeAttrs) {
        svgNode.removeAttribute("fill");
      }
      const strokeStyleId = figmaNode.styles.stroke;
      if (strokeStyleId !== undefined) {
        const styleName = convertStyleName(styles[strokeStyleId].name, "-fill");
        cssClasses.push(styleName);
      }
    }

    const hasStroke = figmaNode.strokes && figmaNode.strokes.length === 1;
    if (
      hasStroke &&
      svgNode.hasAttribute("stroke") &&
      figmaNode.styles &&
      figmaNode.styles.strokes
    ) {
      // Special case for stroke on frame
      if (removeAttrs) {
        svgNode.removeAttribute("stroke");
      }
      const strokeStyleId = figmaNode.styles.strokes;
      if (strokeStyleId !== undefined) {
        const styleName = convertStyleName(
          styles[strokeStyleId].name,
          "-stroke"
        );
        cssClasses.push(styleName);
      }
    }
  }

  if (cssClasses.length > 0) {
    svgNode.setAttribute("class", cssClasses.join(" "));
  }
  const childSvgs = childNodes2Elements(svgNode.childNodes);
  if (childSvgs.length > 0) {
    for (let i = 0; i < childSvgs.length; i++) {
      const svgNode = childSvgs[i];
      parseNode(figmaRoot, svgNode, styles, removeAttrs);
    }
  }
}

function convertStyleName(str: string, suffix: string): string {
  return "ob-" + str.replace(/\//g, "-").toLowerCase() + suffix;
}
