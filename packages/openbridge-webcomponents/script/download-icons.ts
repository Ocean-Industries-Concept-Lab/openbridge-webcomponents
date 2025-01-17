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
  categories: string[];
}
const documentId = 'IkDwOtza6OdjLbIdWA7mI7';

const useCache = true;

function recursiveFindNodeByPath(
  node: Figma.Node<'FRAME'>,
  path: string[]
): Figma.Node | null {
  // pop the first element of the path
  const oldPath = [...path];
  const name = path.shift();
  for (const child of node.children) {
    if (child.name === name) {
      if (path.length === 0) {
        return child;
      } else {
        return recursiveFindNodeByPath(child as Figma.Node<'FRAME'>, path);
      }
    }
  }
  // if we reach here, we didn't find the node
  // search for the node in the children of the node
  for (const child of node.children) {
    if (child.type === 'FRAME') {
      const found = recursiveFindNodeByPath(
        child as Figma.Node<'FRAME'>,
        oldPath
      );
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function findIconsInPage(
  node: Figma.Node<'FRAME'>,
  styles: {[styleName: string]: Figma.Style}
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
    if (
      ['3420:28660', '3420:31035', '3420:32585', '3427:38428'].includes(card.id)
    ) {
      // Scip "Intro cards"
      continue;
    }
    const sectionTitle = recursiveFindNodeByPath(card as Figma.Node<'FRAME'>, [
      'Icon section title',
      'Text container',
      'Title',
    ]) as Figma.Node<'FRAME'>;
    if (!sectionTitle) {
      throw new Error('No section title found' + pageName + card.name);
    }
    const sectionTitleText = sectionTitle.children[1] as Figma.Node<'TEXT'>;
    const title = sectionTitleText.characters;
    icons.push(
      ...recursiveFindIcons(
        card as Figma.Node<'FRAME'>,
        [pageName, title],
        styles
      )
    );
  }
  return icons;
}

function recursiveFindIcons(
  node: Figma.Node<'FRAME'>,
  categories: string[],
  styles: {[styleName: string]: Figma.Style}
): IconRef[] {
  const icons = (
    node.children.filter(
      (child) =>
        child.type === 'COMPONENT' &&
        !['01-illustration', '0-illustration'].includes(child.name)
    ) as Figma.Node<'COMPONENT'>[]
  ).map((icon) => createIconRef(icon, styles, categories));
  const frames = node.children.filter((child) => child.type === 'FRAME');
  for (const frame of frames) {
    icons.push(
      ...recursiveFindIcons(frame as Figma.Node<'FRAME'>, categories, styles)
    );
  }
  return icons;
}

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
    file = await api.getFile(documentId);
    // save to cache
    fs.writeFileSync(cachepath, JSON.stringify(file));
  }

  const pages = file.document.children.filter(
    (p) => !['3512:9655', '3597:122', '3427:38027'].includes(p.id)
  );
  const styles = file.styles;

  let icons: IconRef[] = [];

  for (const page of pages) {
    icons.push(...findIconsInPage(page as Figma.Node<'FRAME'>, styles));
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
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-${name}')
export class Obi${upperCammelCaseName} extends LitElement {
  @property({type: Boolean}) useCssColor = false;

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
    fileImport.push(`import './icon-${name}';`);

    scriptMapping.push(`'${icon.name}': ['${icon.categories.join("', '")}']`);
  }

  // write script
  const script = `export const iconIds: Record<string, string[]> = {
    ${scriptMapping.sort().join(',\n')}
};
`;
  fs.writeFileSync('./src/icons/names.ts', script);
  fileImport.sort();
  fs.writeFileSync('./src/icons/index.ts', fileImport.join('\n'));
  console.log('done');
}

main();
function createIconRef(
  child: Figma.Node<keyof Figma.NodeTypes>,
  styles: {[styleName: string]: Figma.Style},
  categories: string[] = []
): IconRef {
  const name = child.name
    .toLocaleLowerCase()
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
