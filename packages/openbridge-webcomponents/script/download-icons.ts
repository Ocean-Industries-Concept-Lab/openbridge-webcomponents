import * as Figma from 'figma-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {GetFileResult} from 'figma-api/lib/api-types';

dotenv.config();

interface IconRef {
  name: string;
  id: string;
  javascriptName: string;
  styles: {[colorCode: string]: {cssClass: string}};
}
const documentId = '97IQwfn2ybi9Cas78ei8BE';
const pageId = '3861-87027';

const useCache = true;

export async function main() {
  // delete all icons
  const iconDir = './src/icons';
  if (fs.existsSync(iconDir)) {
    const files = fs.readdirSync(iconDir);
    for (const file of files) {
      fs.unlinkSync(`${iconDir}/${file}`);
    }
  } else {
    fs.mkdirSync(iconDir);
  }

  const api = new Figma.Api({
    personalAccessToken: process.env.FIGMA_TOKEN as string,
  });

  const cachepath = './script/.cache-figma.json';
  let file: GetFileResult;
  if (fs.existsSync(cachepath) && useCache) {
    file = JSON.parse(fs.readFileSync(cachepath, 'utf8'));
  } else {
    file = await api.getFile(documentId, {ids: [pageId]});
    // save to cache
    fs.writeFileSync(cachepath, JSON.stringify(file));
  }
  console.log('Got page');
  const page = file.document.children.find(
    (child) => child.name === 'I1 Icons and lines'
  ) as Figma.Node<'CANVAS'>;
  const styles = file.styles;

  // filter all frames with name starting with two digits
  const frames = page!.children.filter(
    (child) =>
      child.name.match(/^\d{2}/) &&
      child.name !== '01 App documentation template'
  ) as Figma.Node<'FRAME'>[];
  let icons = frames.flatMap((frame): IconRef[] => {
    return frame.children.map((child) => {
      const name = child.name.replace(/ /g, '');
      const javascriptName = 'svg' + name.replace(/[^a-zA-Z0-9]/g, '');
      return {
        name: name,
        id: child.id,
        javascriptName: javascriptName,
        styles: getStylesForNode(child, styles),
      };
    });
  });

  // remove duplicate icon names
  const seen = new Set();
  icons = icons.filter((icon) => {
    const duplicate = seen.has(icon.javascriptName);
    seen.add(icon.javascriptName);
    if (duplicate) {
      console.log('Duplicate icon name', icon.name);
    }
    return !duplicate;
  });

  // download all icons
  if (!useCache) {
    const split = 50;
    for (let i = 0; i < icons.length; i += split) {
      console.log('Got images', i);
      const iconChunks = icons.slice(i, i + split);
      const images = await api.getImage(documentId, {
        ids: iconChunks.map((icon) => icon.id).join(','),
        scale: 1,
        format: 'svg',
      });

      // write icons to disk
      await Promise.all(
        Object.keys(images.images).map(async (nodeId) => {
          const icon = icons.find((icon) => icon.id === nodeId);
          const imageUrl = images.images[nodeId];
          if (icon && imageUrl) {
            // download icons
            const request = await fetch(imageUrl);
            const imageData = await request.text();
            fs.writeFileSync(
              `./script/.cache/icons/${icon.name}.svg`,
              imageData
            );
          }
        })
      );
    }
  }

  const scriptMapping: string[] = [];
  const fileImport: string[] = [];
  for (const icon of icons) {
    const imageData = fs.readFileSync(
      `./script/.cache/icons/${icon.name}.svg`,
      'utf8'
    );
    const cssColorIcon = getCssColorIcon(imageData, icon);
    const singleColorIcon = getSingleColorIcon(imageData, icon);

    // convert icon.name from kebab case to upper cammel case
    const upperCammelCaseName = kebabToUpperCamelCase(icon.name);
    const name = icon.name.toLowerCase();

    const component = `import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-${name}')
export class Obi${upperCammelCaseName} extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg\`${singleColorIcon}\`;

  private iconCss = svg\`${cssColorIcon}\`;

  override render() {
    return html\`
      <div class="wrapper" >
        \${this.useCssColor? this.iconCss : this.icon}
      </div>
    \`;
  }

  static override styles = unsafeCSS(css)\`
  .wrapper {
    height: 100%;
    width: 100%;
  }
  .wrapper > * {
      height: 100%;
      width: 100%;
    }
  \`;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-${name}': Obi${upperCammelCaseName};
  }
}`;
    fs.writeFileSync(`./src/icons/icon-${name}.ts`, component);
    fileImport.push(`import './icon-${name}';`);

    scriptMapping.push(`'${icon.name}'`);
  }

  // write script
  const script = `export const iconIds: string[] = [
    ${scriptMapping.sort().join(',\n')}
];
`;
  fs.writeFileSync('./src/icons/names.ts', script);
  fileImport.sort();
  fs.writeFileSync('./src/icons/index.ts', fileImport.join('\n'));
  console.log('done');
}

function getSingleColorIcon(imageData: string, icon: IconRef): string {
  // replace fill color with currentColor
  const fillRegex = /fill="[^"]+"/g;
  const replace = 'fill="currentColor"';
  let imageDataNew = imageData.replace(fillRegex, replace);

  // remove fillOpacity
  const fillOpacityRegex = /fill-opacity="[^"]+"/g;
  imageDataNew = imageDataNew.replace(fillOpacityRegex, '');

  return imageDataNew;
}

function getCssColorIcon(imageData: string, icon: IconRef): string {
  // replace fill color with currentColor
  const fillRegex = /fill="([^"]+)"/g;

  const replace = (match: string, color: string) => {
    const cssClass = icon.styles[color];
    if (cssClass === undefined) {
      if (color === 'black') return 'fill="currentColor"';
      if (color === 'none') return 'fill="none"';
      if (color === 'white') return 'fill="none"';
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

  return imageData;
}

function kebabToUpperCamelCase(kebabCase: string): string {
  const words = kebabCase.replace(/ /g, '').split('-');
  const upperCamelCase = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return upperCamelCase;
}

function getStylesForNode(
  node: Figma.Node,
  styles: {[styleId: string]: Figma.Style}
): {[colorCode: string]: {cssClass: string}} {
  let out = {};

  if ('children' in node) {
    for (const child of node.children) {
      out = {...out, ...getStylesForNode(child, styles)};
      if ('fills' in child && 'styles' in child) {
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
          }
        });
        if (fils !== undefined && child.styles && 'fill' in child.styles) {
          const styleId = child.styles.fill as string;
          const figmaStyle = styles[styleId];
          const cssClass = styleToCssClass(figmaStyle);
          out[fils] = {cssClass: cssClass};
        }
      }
      if ('strokes' in child && 'styles' in child) {
        let strokes: string;
        child.strokes.forEach((fill) => {
          if (fill.type === 'SOLID') {
            if (strokes !== undefined) {
              console.warn(
                'Multiple strokes',
                strokes,
                rgbaToHexOrColorName(fill.color!)
              );
            }
            strokes = rgbaToHexOrColorName(fill.color!);
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

main();
