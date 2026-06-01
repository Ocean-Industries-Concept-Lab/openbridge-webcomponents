import {Api} from 'figma-api';
import type {
  CanvasNode,
  FrameNode,
  GetFileResponse,
  Style,
  SubcanvasNode,
} from '@figma/rest-api-spec';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {
  IconRef,
  getCssColorIcon,
  getStylesForNode,
  kebabToUpperCamelCase,
} from './convert-icons.js';

dotenv.config();

const documentId = 'TPoHGyeEtlcpnNekOa4lY3';

const useCache = false;

const iconMapUrl: {url: string; name: string; typeA: boolean}[] = [
  {
    url: 'https://www.figma.com/file/TPoHGyeEtlcpnNekOa4lY3/OpenBridge-CAM?type=design&node-id=850-47442&mode=design&t=QA1ohadrbRZxW1ss-4',
    name: '14-alarm-unack',
    typeA: true,
  },
  {
    url: 'https://www.figma.com/file/TPoHGyeEtlcpnNekOa4lY3/OpenBridge-CAM?type=design&node-id=850-47508&mode=design&t=QA1ohadrbRZxW1ss-4',
    name: '14-alarm-unack',
    typeA: false,
  },
  {
    url: 'https://www.figma.com/file/TPoHGyeEtlcpnNekOa4lY3/OpenBridge-CAM?type=design&node-id=850-47481&mode=design&t=QA1ohadrbRZxW1ss-4',
    name: '14-alarm-silenced',
    typeA: true,
  },
  {
    url: 'https://www.figma.com/file/TPoHGyeEtlcpnNekOa4lY3/OpenBridge-CAM?type=design&node-id=850-47505&mode=design&t=QA1ohadrbRZxW1ss-4',
    name: '14-alarm-silenced',
    typeA: false,
  },
  {
    url: 'https://www.figma.com/file/TPoHGyeEtlcpnNekOa4lY3/OpenBridge-CAM?type=design&node-id=850-47445&mode=design&t=QA1ohadrbRZxW1ss-4',
    name: '14-warning-unack',
    typeA: true,
  },
  {
    url: 'https://www.figma.com/file/TPoHGyeEtlcpnNekOa4lY3/OpenBridge-CAM?type=design&node-id=850-47475&mode=design&t=QA1ohadrbRZxW1ss-4',
    name: '14-warning-unack',
    typeA: false,
  },
];

const iconMap: {id: string; name: string; typeA: boolean}[] = iconMapUrl.map(
  (icon) => {
    let id = icon.url.match(/node-id=([0-9/-]+)/)![1];
    // replace - with :
    id = id.replace(/-/g, ':');
    return {id, name: icon.name, typeA: icon.typeA};
  }
);

const iconDir = './src/components/alert-icon/icons';
const cacheDir = './script/.cache/alert-icons';

export async function main() {
  // delete all icons

  if (fs.existsSync(iconDir)) {
    const files = fs.readdirSync(iconDir);
    for (const file of files) {
      fs.unlinkSync(`${iconDir}/${file}`);
    }
  } else {
    fs.mkdirSync(iconDir);
  }

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, {recursive: true});
  }

  const api_token = process.env.FIGMA_TOKEN;
  if (!api_token) {
    throw new Error('FIGMA_TOKEN is not set, please set it in the .env file');
  }

  const api = new Api({
    personalAccessToken: api_token,
  });

  const cachepath = './script/.cache-figma-alert.json';
  let file: GetFileResponse;
  if (fs.existsSync(cachepath) && useCache) {
    file = JSON.parse(fs.readFileSync(cachepath, 'utf8'));
  } else {
    file = await api.getFile({file_key: documentId}, {ids: '850:47441'});
    // save to cache
    fs.writeFileSync(cachepath, JSON.stringify(file, null, 2));
  }
  console.log('Got page');
  const page = file.document.children.find(
    (p) => p.name === 'Icons'
  ) as CanvasNode;
  const frames = page.children.filter(
    (child) => child.name === 'Frame 3'
  ) as FrameNode[];
  const styles: {[styleId: string]: Style} = file.styles;

  const knownIds = iconMap.map((icon) => icon.id);
  let icons = frames.flatMap((frame): IconRef[] => {
    return frame.children
      .filter((child) => knownIds.includes(child.id))
      .map((child) => {
        const icon = iconMap.find((icon) => icon.id === child.id);
        const name = icon!.name + (icon!.typeA ? '-a' : '-b');
        const javascriptName = 'svg' + kebabToUpperCamelCase(name);
        return {
          name: name,
          id: child.id,
          javascriptName: javascriptName,
          styles: getStylesForNode(child as SubcanvasNode, styles),
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
            fs.writeFileSync(`${cacheDir}/${icon.name}.svg`, imageData);
          }
        })
      );
    }
  }

  const fileImport: string[] = [];
  for (const icon of icons) {
    const imageData = fs.readFileSync(`${cacheDir}/${icon.name}.svg`, 'utf8');
    const cssColorIcon = getCssColorIcon(imageData, icon);

    // convert icon.name from kebab case to upper cammel case
    const name = icon.name.toLowerCase();

    const component = `import {svg} from 'lit';
export const ${icon.javascriptName} = svg\`${cssColorIcon}\`;
`;
    fs.writeFileSync(`${iconDir}/icon-${name}.ts`, component);
    fileImport.push(
      `import {${icon.javascriptName}} from './icons/icon-${name}';`
    );
  }

  fileImport.sort();
  console.log(fileImport.join('\n'));
  console.log('done');
}

main();
