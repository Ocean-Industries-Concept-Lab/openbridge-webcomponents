import * as fs from "fs";
import { convertSvg } from "./convert-svg";
import { getFigmaFile, getFigmaNode, getFigmaSvg } from "./figmaImport";
import { FrameNode } from "./figma-types";
import fetch from "node-fetch";

import { exportComponents, ExportDef } from "./exports";
import * as dotenv from "dotenv";

dotenv.config();

interface FigmaNode {
  name: string;
  children: FigmaNode[];
  id: string;
}

function getElement(root: FigmaNode, path: string[]): FigmaNode | null {
  path = [...path];
  const name = path.shift();
  if (name === undefined) {
    return root;
  }
  const ele = root.children.find((value) => value.name === name);
  if (ele === undefined) {
    console.error(
      `Did not find ${name}, available names are:`,
      root.children.map((v) => v.name)
    );
    return null;
  }
  return getElement(ele, path);
}

async function main(option: { outFolder: string; removeAttributes: boolean }) {
  const mainFigmaFile = process.env.FIGMA_MAINFILE as string;

  const document: any = await getFigmaNode(mainFigmaFile, [
    "4536%3A113209",
  ]);
  const genFolder = option.outFolder;

  if (!fs.existsSync(genFolder)) {
    fs.mkdirSync(genFolder);
  }
  let styles = document.styles;

  for (const node of Object.values(document.nodes) as any[]) {
    styles = { ...styles, ...node.styles };
  }

  const elements = exportComponents
    .map((component) => {
      const element = getElement(
        {
          children: Object.values(document.nodes).map((n: any) => n.document),
        } as FigmaNode,
        component.path
      );
      if (element === null) {
        console.error(`In ${component.name}, ${component.path}`);
      }
      return { component: component, element: element };
    })
    .filter((value) => value.element !== null) as {
      component: ExportDef;
      element: FigmaNode;
    }[];

  const figmaIds = elements.map((v) => v.element.id);
  const urlSvgs = await getFigmaSvg(mainFigmaFile, figmaIds.join(","));
  const promises = [];
  for (const ele of elements) {
    promises.push(
      async () => {
        const element = ele.element;
        const component = ele.component;
        console.log(`Exporting ${component.name}`);
        let imageData;
        try {
          imageData = await fetch(urlSvgs[element.id]);
        } catch (e) {
          console.error(`Could not download SVG for ${component.name}`, e);
          throw e;
        }
        const svg = await imageData.text();
        const out = convertSvg(
          element as unknown as FrameNode,
          svg,
          styles,
          option.removeAttributes
        );

        const outputFolder = component.outputFolder
          ? `${genFolder}/${component.outputFolder}`
          : genFolder;

        if (!fs.existsSync(outputFolder)) {
          fs.mkdirSync(outputFolder);
        }
        fs.writeFileSync(`${outputFolder}/${component.name}.svg`, out);
      })
  }
  await Promise.all(promises.map(f => f())).then(() => console.log("Done"));
}

Promise.all([
  main({ outFolder: "src/generated-with-style", removeAttributes: false }),
  main({ outFolder: "src/generated-without-style", removeAttributes: true })
]).then(() => console.log("Completed autogenerate"))
  .catch((e) => console.error("Failed autogenerate \nError:\n", e));
