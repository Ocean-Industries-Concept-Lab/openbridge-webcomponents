import * as Figma from 'figma-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

interface IconRef {
    name: string;
    id: string;
    javascriptName: string;
}
const documentId = 'xlHvmJrFr3aADQ596DiON7';
const pageId = '3861-87027';

export async function main() {


    const api = new Figma.Api({
        personalAccessToken: process.env.FIGMA_TOKEN as string,
    });

    const cachepath = "./script/.cache-figma.json"
    let page: Figma.Node<'CANVAS'>;
    if (fs.existsSync(cachepath)) {
        page = JSON.parse(fs.readFileSync(cachepath, 'utf8'));
    } else {
        const file = await api.getFile(documentId, {depth: 3, ids: [pageId]});
        page = file.document.children.find((child) => child.name === 'I1 Icons and lines') as Figma.Node<'CANVAS'>;

        // save to cache
        fs.writeFileSync(cachepath, JSON.stringify(page));
    }
    console.log("Got page")

    // filter all frames with name starting with two digits
    const frames = page!.children.filter((child) => child.name.match(/^\d{2}/) && child.name !== '01 App documentation template') as Figma.Node<'FRAME'>[];
    let icons = frames.flatMap((frame): IconRef[] => {
        return frame.children.map((child) => {
            const name = child.name
            const javascriptName = "svg" + name.replace(/[^a-zA-Z0-9]/g, '');
            return {
                name: name,
                id: child.id,
                javascriptName: javascriptName
            };
        })
    });

    // remove duplicate icon names
    const seen = new Set();
    icons = icons.filter((icon) => {
        const duplicate = seen.has(icon.javascriptName);
        seen.add(icon.javascriptName);
        if (duplicate) {
            console.log("Duplicate icon name", icon.name);
        }
        return !duplicate;
    });
    
    // download all icons
    const split = 50;
    const scriptImports: string[] = [];
    const scriptMapping: string[] = [];
    for (let i = 0; i < icons.length; i += split) {
        console.log("Got images", i);
        const iconChunks = icons.slice(i, i + split);
        const images = await api.getImage(documentId, {
            ids: iconChunks.map((icon) => icon.id).join(','),
            scale: 1,
            format: 'svg',
        });

        // write icons to disk
        await Promise.all(Object.keys(images.images).map(async (nodeId) => {
            const icon = icons.find((icon) => icon.id === nodeId);
            const imageUrl = images.images[nodeId]
            if (icon && imageUrl) {
                

                // download icons
                const request = await fetch(imageUrl);
                let imageData = await request.text();
                // remove fill="none"
                const noneRegex = /fill="none"/g;
                imageData = imageData.replace(noneRegex, '');

                // replace fill color with currentColor
                const fillRegex = /fill="[^"]+"/g;
                const replace = 'fill="currentColor"';
                imageData = imageData.replace(fillRegex, replace);

                // remove fillOpacity
                const fillOpacityRegex = /fill-opacity="[^"]+"/g;
                imageData = imageData.replace(fillOpacityRegex, '');

                fs.writeFileSync(`./src/assets/icons/${icon.name}.svg`, imageData);

                
                scriptImports.push(`import ${icon.javascriptName} from "./assets/icons/${icon.name}.svg?raw"`);
                scriptMapping.push(`'${icon.name}': html\`\${unsafeSVG(${icon.javascriptName})}\``);
            }
        }));
    }



    // write script
    const script = `import { unsafeSVG } from "lit/directives/unsafe-svg.js"
import { TemplateResult, html } from "lit"
${scriptImports.sort().join('\n')}

export const iconsUrl: {[key: string]: TemplateResult} = {
    ${scriptMapping.sort().join(',\n')}
}
`;
    fs.writeFileSync('./src/icons.ts', script);
    console.log("done")
}

main();