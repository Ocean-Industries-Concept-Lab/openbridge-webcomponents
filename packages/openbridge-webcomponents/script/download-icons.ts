import * as Figma from 'figma-api';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { GetFileResult } from 'figma-api/lib/api-types';

dotenv.config();

interface IconRef {
    name: string;
    id: string;
    javascriptName: string;
    styles: { [colorCode: string]: { cssClass: string } };
}
const documentId = '97IQwfn2ybi9Cas78ei8BE';
const pageId = '3861-87027';

const useCache = false;

export async function main() {
    // delete all icons
    const iconDir = './src/assets/icons';
    if (fs.existsSync(iconDir)) {
        const files = fs.readdirSync(iconDir);
        for (const file of files) {
            fs.unlinkSync(`${iconDir}/${file}`);
        }
    } else {
        fs.mkdirSync(iconDir);
    }

    const iconCssDir = './src/assets/icons';
    if (fs.existsSync(iconCssDir)) {
        const files = fs.readdirSync(iconCssDir);
        for (const file of files) {
            fs.unlinkSync(`${iconCssDir}/${file}`);
        }
    } else {
        fs.mkdirSync(iconCssDir);
    }


    const api = new Figma.Api({
        personalAccessToken: process.env.FIGMA_TOKEN as string,
    });

    const cachepath = "./script/.cache-figma.json"
    let file: GetFileResult;
    if (fs.existsSync(cachepath) && useCache) {
        file = JSON.parse(fs.readFileSync(cachepath, 'utf8'));
    } else {
        file = await api.getFile(documentId, { ids: [pageId] });
        // save to cache
        fs.writeFileSync(cachepath, JSON.stringify(file));
    }
    console.log("Got page")
    const page = file.document.children.find((child) => child.name === 'I1 Icons and lines') as Figma.Node<'CANVAS'>;
    const styles = file.styles;

    // filter all frames with name starting with two digits
    const frames = page!.children.filter((child) => child.name.match(/^\d{2}/) && child.name !== '01 App documentation template') as Figma.Node<'FRAME'>[];
    let icons = frames.flatMap((frame): IconRef[] => {
        return frame.children.map((child) => {
            const name = child.name
            const javascriptName = "svg" + name.replace(/[^a-zA-Z0-9]/g, '');
            return {
                name: name,
                id: child.id,
                javascriptName: javascriptName,
                styles: getStylesForNode(child, styles)
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
    if (!useCache) {
        const split = 50;
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
                    fs.writeFileSync(`./script/.cache/icons/${icon.name}.svg`, imageData);

                }
            }));
        }
    }


    const scriptMapping: string[] = [];
    for (const icon of icons) {
        const imageData = fs.readFileSync(`./script/.cache/icons/${icon.name}.svg`, 'utf8');
        writeSingleColorIcon(imageData, icon);
        writeCssColorIcon(imageData, icon);
        scriptMapping.push(`'${icon.name}'`);
    }



    // write script
    const script = `export const iconIds: string[] = [
    ${scriptMapping.sort().join(',\n')}
];
`;
    fs.writeFileSync('./src/icons.ts', script);
    console.log("done")
}

function writeSingleColorIcon(imageData: string, icon: IconRef) {
    // replace fill color with currentColor
    const fillRegex = /fill="[^"]+"/g;
    const replace = 'fill="currentColor"';
    let imageDataNew = imageData.replace(fillRegex, replace);

    // remove fillOpacity
    const fillOpacityRegex = /fill-opacity="[^"]+"/g;
    imageDataNew = imageDataNew.replace(fillOpacityRegex, '');

    fs.writeFileSync(`./src/assets/icons/${icon.name}.svg`, imageDataNew);
}

function writeCssColorIcon(imageData: string, icon: IconRef) {
    // replace fill color with currentColor
    const fillRegex = /fill="([^"]+)"/g;

    const replace = (match: string, color: string) => {
        const cssClass = icon.styles[color];
        if (cssClass === undefined) {
            if (color === 'black') return 'fill="currentColor"';
            if (color === 'none') return 'fill="none"';
            if (color === 'white') return 'fill="none"';
            console.warn("No css class for color", color, icon.name, Object.keys(icon.styles));
            return 'fill="currentColor"';
        }
        return `style="fill: var(--${cssClass.cssClass})"`;
    };
    imageData = imageData.replace(fillRegex, replace);

    // remove fillOpacity
    const fillOpacityRegex = /fill-opacity="[^"]+"/g;
    imageData = imageData.replace(fillOpacityRegex, '');

    fs.writeFileSync(`./src/assets/icons-css/${icon.name}.svg`, imageData);
}



function getStylesForNode(node: Figma.Node, styles: { [styleId: string]: Figma.Style }): { [colorCode: string]: { cssClass: string } } {
    let out = {};

    if ('children' in node) {
        for (const child of node.children) {
            out = { ...out, ...getStylesForNode(child, styles) };
            if ('fills' in child && 'styles' in child) {
                let fils: string;
                child.fills.forEach((fill) => {
                    if (fill.type === 'SOLID') {
                        if (fils !== undefined) {
                            console.warn("Multiple fills", fils, rgbaToHexOrColorName(fill.color!));
                        }
                        fils = rgbaToHexOrColorName(fill.color!);
                    }
                });
                if (fils !== undefined) {
                    const styleId = child.styles.fill;
                    const figmaStyle = styles[styleId];
                    const cssClass = styleToCssClass(figmaStyle);
                    out[fils] = { cssClass: cssClass };
                }

            }
            if ('strokes' in child && 'styles' in child) {
                let strokes: string;
                child.strokes.forEach((fill) => {
                    if (fill.type === 'SOLID') {
                        if (strokes !== undefined) {
                            console.warn("Multiple strokes", strokes, rgbaToHexOrColorName(fill.color!));
                        }
                        strokes = rgbaToHexOrColorName(fill.color!);
                    }
                });
                if (strokes !== undefined && child.styles?.stroke) {
                    const styleId = child.styles.stroke;
                    const figmaStyle = styles[styleId];
                    const cssClass = styleToCssClass(figmaStyle);
                    out[strokes] = { cssClass: cssClass };
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
                    out[color] = { cssClass: cssClass };
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
        return `#${decimalToHex(rgba.r)}${decimalToHex(rgba.g)}${decimalToHex(rgba.b)}`.toUpperCase();
    }
}

function styleToCssClass(style: Figma.Style): string {
    return style.name.replace(/[\/ ]/g, '-').toLocaleLowerCase();
}

main();