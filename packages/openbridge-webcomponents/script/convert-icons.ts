import * as Figma from 'figma-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const figmaVariablesPath = path.join(__dirname, 'figmavariables.json');
const figmaVariables = JSON.parse(fs.readFileSync(figmaVariablesPath, 'utf8'));

dotenv.config();

export interface IconRef {
  name: string;
  id: string;
  javascriptName: string;
  styles: {[colorCode: string]: {cssClass: string}};
}

export function getSingleColorIcon(imageData: string, icon: IconRef): string {
  // replace fill color with currentColor
  const fillRegex = /fill="[^"]+"/g;
  const replace = 'fill="currentColor"';
  let imageDataNew = imageData.replace(fillRegex, replace);

  // remove fillOpacity
  const fillOpacityRegex = /fill-opacity="[^"]+"/g;
  imageDataNew = imageDataNew.replace(fillOpacityRegex, '');

  return imageDataNew;
}

export function getCssColorIcon(imageData: string, icon: IconRef): string {
  // replace fill color with currentColor
  const fillRegex = /fill="([^"]+)"/g;

  const replace = (match: string, color: string) => {
    const cssClass = icon.styles[color];
    if (cssClass === undefined) {
      if (color === 'black') return 'fill="currentColor"';
      if (color === 'none') return 'fill="none"';
      if (color === 'white') return 'fill="none"';
      if (color === '#C90000')
        return 'fill="var(--alarm-enabled-background-color)"';
      console.warn(
        'No css class for color',
        color,
        icon.name,
        Object.keys(icon.styles)
      );
      return 'fill="currentColor"';
    }
    return `style="fill: var(--${cssClass.cssClass})"`;
  };
  imageData = imageData.replace(fillRegex, replace);

  // remove fillOpacity
  const fillOpacityRegex = /fill-opacity="[^"]+"/g;
  imageData = imageData.replace(fillOpacityRegex, '');

  // replace stroke color with currentColor
  const strokeRegex = /stroke="([^"]+)"/g;
  const replaceStroke = (match: string, color: string) => {
    const cssClass = icon.styles[color];
    if (cssClass === undefined) {
      if (color === 'black') return 'stroke="currentColor"';
      if (color === 'none') return 'stroke="none"';
      if (color === 'white') return 'stroke="none"';
      console.warn(
        'No css class for color',
        color,
        icon.name,
        Object.keys(icon.styles)
      );
      return 'stroke="currentColor"';
    }
    return `style="stroke: var(--${cssClass.cssClass})"`;
  };
  imageData = imageData.replace(strokeRegex, replaceStroke);

  // remove strokeOpacity
  const strokeOpacityRegex = /stroke-opacity="[^"]+"/g;
  imageData = imageData.replace(strokeOpacityRegex, '');

  return imageData;
}

export function kebabToUpperCamelCase(kebabCase: string): string {
  const words = kebabCase.replace(/ /g, '').split('-');
  const upperCamelCase = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return upperCamelCase;
}

export function getStylesForNode(
  node: Figma.Node,
  styles: {[styleId: string]: Figma.Style}
): {[colorCode: string]: {cssClass: string}} {
  let out = {};

  if ('children' in node) {
    for (const child of node.children) {
      out = {...out, ...getStylesForNode(child, styles)};
      if ('fills' in child) {
        let fils: string | undefined;
        child.fills.forEach((fill) => {
          if (fill.type === 'SOLID') {
            if (fils !== undefined) {
              console.warn(
                'Multiple fills',
                fils,
                rgbaToHexOrColorName(fill.color!)
              );
            }
            fils = rgbaToHexOrColorName(fill.color!);
            if ('boundVariables' in fill) {
              const variableId = fill.boundVariables.color.id;
              out[fils] = {cssClass: figmaVariables[variableId]};
            }
          }
        });
        if (fils !== undefined && child.styles && 'fill' in child.styles) {
          const styleId = child.styles.fill as string;
          const figmaStyle = styles[styleId];
          const cssClass = styleToCssClass(figmaStyle);
          out[fils] = {cssClass: cssClass};
        }
      }
      if ('strokes' in child) {
        let strokes: string;
        child.strokes.forEach((stroke) => {
          if (stroke.type === 'SOLID') {
            if (strokes !== undefined) {
              console.warn(
                'Multiple strokes',
                strokes,
                rgbaToHexOrColorName(stroke.color!)
              );
            }
            strokes = rgbaToHexOrColorName(stroke.color!);
            if ('boundVariables' in stroke) {
              const variableId = stroke.boundVariables.color.id;
              out[strokes] = {cssClass: figmaVariables[variableId]};
            }
          }
        });
        if (strokes !== undefined && child.styles?.stroke) {
          const styleId = child.styles.stroke;
          const figmaStyle = styles[styleId];
          const cssClass = styleToCssClass(figmaStyle);
          out[strokes] = {cssClass: cssClass};
        }
      }
      if ('fillOverrideTable' in child) {
        for (const fill of Object.values(child.fillOverrideTable)) {
          if (fill === null) continue;
          if ('fills' in fill) {
            for (const f of fill.fills) {
              if (f.type === 'SOLID') {
                const color = rgbaToHexOrColorName(f.color!);
                if ('boundVariables' in f) {
                  const variableId = f.boundVariables.color.id;
                  out[color] = {cssClass: figmaVariables[variableId]};
                }
              }
            }
          }
          if (!('inheritFillStyleId' in fill)) continue;
          const styleId = fill.inheritFillStyleId;
          const figmaStyle = styles[styleId];
          const color = rgbaToHexOrColorName(fill.fills[0].color!);
          const cssClass = styleToCssClass(figmaStyle);
          out[color] = {cssClass: cssClass};
        }
      }
    }
  }

  return out;
}

function decimalToHex(d: number): string {
  const v = Math.round(d * 255).toString(16);
  return v.length === 1 ? `0${v}` : v;
}

function rgbaToHexOrColorName(rgba: Figma.Color): string {
  const isBlack = rgba.r === 0 && rgba.g === 0 && rgba.b === 0 && rgba.a === 1;
  const isWhite = rgba.r === 1 && rgba.g === 1 && rgba.b === 1 && rgba.a === 1;
  if (isBlack) {
    return 'black';
  } else if (isWhite) {
    return 'white';
  } else {
    return `#${decimalToHex(rgba.r)}${decimalToHex(rgba.g)}${decimalToHex(
      rgba.b
    )}`.toUpperCase();
  }
}

function styleToCssClass(style: Figma.Style): string {
  return style.name.replace(/[\/ ]/g, '-').toLocaleLowerCase();
}
