import fetch from 'node-fetch';
import dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import {createHmac} from 'crypto';

dotenv.config();

const baseUrl = 'https://api.figma.com';
const figmaToken = process.env.FIGMA_TOKEN;
if (figmaToken === undefined) throw 'Missing figma token in environment';
const header = {headers: {'X-Figma-Token': figmaToken}};

async function getUrl<T>(url: string): Promise<T> {
  const res = await fetch(url, header);
  if (res.status !== 200) {
    const responseText = await res.text();
    throw Error(`Something failed when downloading: ${url}\n${responseText}`);
  }
  return await res.json();
}

async function getUrlOrCache<T>(url: string): Promise<T> {
  let metaUrl = url;
  if (metaUrl.includes('?')) {
    metaUrl += '&depth=1';
  } else {
    metaUrl += '?depth=1';
  }
  const metaData = (await getUrl(metaUrl)) as any;
  const hash = await sha256(url);
  const cachedir = '.figmacache';
  if (!fs.existsSync(cachedir)) {
    fs.mkdirSync(cachedir);
  }
  const filepath = path.join(cachedir, `${hash}.json`);
  if (fs.existsSync(filepath)) {
    const cache = JSON.parse(fs.readFileSync(filepath).toString());
    if (cache.lastModified == metaData.lastModified) {
      return cache;
    }
  }
  const res = await getUrl<T>(url);
  fs.writeFileSync(filepath, JSON.stringify(res));
  return res;
}

export async function getFigmaFile(fileId: string): Promise<any> {
  return await getUrlOrCache<any>(`${baseUrl}/v1/files/${fileId}`);
}

export async function getFigmaNode(
  fileId: string,
  nodeIds: string[]
): Promise<unknown> {
  return await getUrlOrCache<any>(
    `${baseUrl}/v1/files/${fileId}/nodes?ids=${nodeIds.join(',')}`
  );
}

export async function getFigmaSvg(
  fileId: string,
  elementIds: string
): Promise<{[id: string]: string}> {
  const imageUrlData = await fetch(
    `${baseUrl}/v1/images/${fileId}?ids=${elementIds}&format=svg&svg_include_id=true`,
    header
  );
  if (imageUrlData.status !== 200) {
    const responseText = await imageUrlData.text();
    throw Error(`Something failed when downloading SVG: ${responseText}`);
  }
  const imageUrls = await imageUrlData.json();
  return imageUrls.images;
}

async function sha256(message: string): Promise<string> {
  return createHmac('sha256', message).digest('hex');
}
