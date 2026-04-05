import {Api} from 'figma-api';
import type {
  CanvasNode,
  ComponentNode,
  FrameNode,
  GetFileResponse,
  Style,
  SubcanvasNode,
  TextNode,
} from '@figma/rest-api-spec';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {
  getCssColorIcon,
  getSingleColorIcon,
  getStylesForNode,
  kebabToUpperCamelCase,
} from './convert-icons.js';

dotenv.config();

interface IconRef {
  name: string;
  id: string;
  javascriptName: string;
  styles: {[colorCode: string]: {cssClass: string}};
  categories: string[];
}
const documentId = 'IkDwOtza6OdjLbIdWA7mI7';

const useCache = false;

function recursiveFindNodeByPath(
  node: CanvasNode | FrameNode,
  path: string[]
): SubcanvasNode | null {
  const oldPath = [...path];
  const name = path.shift();
  for (const child of node.children) {
    if (child.name === name) {
      if (path.length === 0) {
        return child;
      }
      if (child.type === 'FRAME') {
        return recursiveFindNodeByPath(child, path);
      }
      return null;
    }
  }
  for (const child of node.children) {
    if (child.type === 'FRAME') {
      const found = recursiveFindNodeByPath(child, oldPath);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function findIconsInPage(
  node: CanvasNode,
  styles: {[styleName: string]: Style}
): IconRef[] {
  const icons: IconRef[] = [];
  const pageName = node.name.substring(3); // remove id from name
  for (const card of node.children) {
    if (card.type !== 'FRAME') {
      continue;
    }
    if (card.name === '.Navigation-bar') {
      continue;
    }
    if (card.name === 'filter') {
      continue;
    }
    if (
      ['3420:28660', '3420:31035', '3420:32585', '3427:38428'].includes(card.id)
    ) {
      // Scip "Intro cards"
      continue;
    }
    const sectionTitle = recursiveFindNodeByPath(card, [
      'Icon section title',
      'Text container',
      'Title',
    ]) as FrameNode | null;
    if (!sectionTitle) {
      console.error(
        'No section title found. Page: ' + pageName + ' Card: ' + card.name
      );
      continue;
    }
    const sectionTitleText = sectionTitle.children[1] as TextNode;
    const title = sectionTitleText.characters;
    const newIcons = recursiveFindIcons(card, [pageName, title], styles);
    console.log(
      'Found ' +
        newIcons.map((icon) => icon.name).join(', ') +
        ' icons in section: ' +
        title +
        ' on page: ' +
        pageName
    );
    icons.push(...newIcons);
  }
  return icons;
}

function recursiveFindIcons(
  node: FrameNode,
  categories: string[],
  styles: {[styleName: string]: Style}
): IconRef[] {
  const icons = node.children
    .filter(
      (child): child is ComponentNode =>
        child.type === 'COMPONENT' &&
        !['01-illustration', '0-illustration'].includes(child.name)
    )
    .map((icon) => createIconRef(icon, styles, categories));
  const frames = node.children.filter(
    (child): child is FrameNode => child.type === 'FRAME'
  );
  for (const frame of frames) {
    icons.push(...recursiveFindIcons(frame, categories, styles));
  }
  return icons;
}

export async function main() {
  // delete all icons
  const iconDir = './src/icons';
  if (fs.existsSync(iconDir)) {
    const files = fs.readdirSync(iconDir);
    for (const file of files.filter((file) => file !== 'icon.ts')) {
      fs.unlinkSync(`${iconDir}/${file}`);
    }
  } else {
    fs.mkdirSync(iconDir);
  }

  const api = new Api({
    personalAccessToken: process.env.FIGMA_TOKEN as string,
  });

  const cachepath = './script/.cache-figma.json';
  let file: GetFileResponse;
  const cacheExists = fs.existsSync(cachepath);
  const cacheIsOld =
    cacheExists &&
    fs.statSync(cachepath).mtime.getTime() < Date.now() - 1000 * 60 * 60;
  if (cacheExists && useCache && !cacheIsOld) {
    file = JSON.parse(fs.readFileSync(cachepath, 'utf8'));
  } else {
    file = await api.getFile({file_key: documentId});
    // save to cache
    fs.writeFileSync(cachepath, JSON.stringify(file));
  }

  const pages = file.document.children.filter(
    (p) => !['3512:9655', '3597:122', '3427:38027'].includes(p.id)
  );
  const styles = file.styles;

  let icons: IconRef[] = [];

  for (const page of pages) {
    icons.push(...findIconsInPage(page as CanvasNode, styles));
  }

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

  const iconsToDownload = useCache
    ? icons.filter((icon) => {
        return !fs.existsSync(`./script/.cache/icons/${icon.name}.svg`);
      })
    : icons;

  // download icons

  const split = 50;
  for (let i = 0; i < iconsToDownload.length; i += split) {
    console.log('Got images', i);
    const iconChunks = iconsToDownload.slice(i, i + split);
    const images = await api.getImages(
      {file_key: documentId},
      {
        ids: iconChunks.map((icon) => icon.id).join(','),
        scale: 1,
        format: 'svg',
      }
    );

    // write icons to disk
    await Promise.all(
      Object.keys(images.images).map(async (nodeId) => {
        const icon = icons.find((icon) => icon.id === nodeId);
        const imageUrl = images.images[nodeId];
        if (icon && imageUrl) {
          // download icons
          const request = await fetch(imageUrl);
          const imageData = await request.text();
          fs.writeFileSync(`./script/.cache/icons/${icon.name}.svg`, imageData);
        }
      })
    );
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
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-${name}')
export class Obi${upperCammelCaseName} extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg\`${singleColorIcon}\`;

  private iconCss = svg\`${cssColorIcon}\`;

  override render() {
    return html\`
      <div class="wrapper">\${this.useCssColor ? this.iconCss : this.icon}</div>
    \`;
  }


  static override styles = css\`
  .wrapper {
    height: 100%;
    width: 100%;
    line-height: 0;
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
    fileImport.push(`import './icon-${name}.js';`);

    scriptMapping.push(`'${icon.name}': ['${icon.categories.join("', '")}']`);
  }

  // write script
  const script = `export const iconIds: Record<string, string[]> = {
    ${scriptMapping.sort().join(',\n')}
};
`;
  fs.writeFileSync('./src/icons/names.ts', script);
  fileImport.sort();
  fileImport.push('export { ObiIcon } from "./icon.js";');
  fs.writeFileSync('./src/icons/index.ts', fileImport.join('\n'));
  console.log('done');
}

main();
function createIconRef(
  child: ComponentNode,
  styles: {[styleName: string]: Style},
  categories: string[] = []
): IconRef {
  const name = child.name
    .toLocaleLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'oe')
    .replace(/å/g, 'aa')
    .replace(/ /g, '')
    .replace(/%/g, '');
  const javascriptName = 'svg' + name.replace(/[^a-zA-Z0-9]/g, '');
  return {
    name: name,
    id: child.id,
    javascriptName: javascriptName,
    styles: getStylesForNode(child, styles),
    categories: categories,
  };
}
