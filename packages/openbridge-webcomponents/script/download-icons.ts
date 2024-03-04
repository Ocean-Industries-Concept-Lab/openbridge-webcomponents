import * as Figma from 'figma-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {GetFileResult} from 'figma-api/lib/api-types';
import {
  getCssColorIcon,
  getSingleColorIcon,
  getStylesForNode,
  kebabToUpperCamelCase,
} from './convert-icons';

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

    const component = `import {LitElement, html, css, svg} from 'lit';
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

  static override styles = css\`
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

main();
