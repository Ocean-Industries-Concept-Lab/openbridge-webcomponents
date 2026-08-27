import * as fs from 'fs';
import * as path from 'path';
import {globSync} from 'glob';

interface ElementMetaEntry {
  tagname: string;
  primaryStorybook: string;
  screenshotPath: string | null;
  widthPx: number | null;
  heightPx: number | null;
}

interface StoryPrimaryRow {
  tagname: string;
  primaryStorybook: string;
}

const OUTPUT_FILE = path.resolve(process.cwd(), 'element-meta.json');
const SOURCE_GLOB = 'src/**/*.stories.ts';

const PIXEL_RATIO = 1.61;

const COMPONENT_TAG_RE = /component\s*:\s*['"](obc-[a-z0-9-]+)['"]/;
const STORY_EXPORT_RE =
  /export\s+const\s+([A-Za-z0-9_]+)\s*:\s*(?:StoryObj|Story)(?:<[^>]*>)?\s*=\s*\{/g;

function inferTagnameFromFilename(filePath: string): string {
  const base = path.basename(filePath, '.stories.ts');
  return base.startsWith('obc-') ? base : `obc-${base}`;
}

function extractComponentTag(content: string): string | undefined {
  const m = content.match(COMPONENT_TAG_RE);
  return m?.[1];
}

function skipLineComment(content: string, i: number): number {
  if (content[i] === '/' && content[i + 1] === '/') {
    let j = i + 2;
    while (j < content.length && content[j] !== '\n' && content[j] !== '\r') {
      j++;
    }
    return j;
  }
  return i;
}

function skipBlockComment(content: string, i: number): number {
  if (content[i] === '/' && content[i + 1] === '*') {
    let j = i + 2;
    while (j < content.length - 1) {
      if (content[j] === '*' && content[j + 1] === '/') {
        return j + 2;
      }
      j++;
    }
    return content.length;
  }
  return i;
}

function skipSingleQuotedString(content: string, i: number): number {
  let j = i + 1;
  while (j < content.length) {
    const c = content[j];
    if (c === '\\') {
      j += 2;
      continue;
    }
    if (c === "'") {
      return j + 1;
    }
    j++;
  }
  return content.length;
}

function skipDoubleQuotedString(content: string, i: number): number {
  let j = i + 1;
  while (j < content.length) {
    const c = content[j];
    if (c === '\\') {
      j += 2;
      continue;
    }
    if (c === '"') {
      return j + 1;
    }
    j++;
  }
  return content.length;
}

function skipTemplateLiteral(content: string, i: number): number {
  let j = i + 1;
  while (j < content.length) {
    const c = content[j];
    if (c === '\\') {
      j += 2;
      continue;
    }
    if (c === '`') {
      return j + 1;
    }
    if (c === '$' && content[j + 1] === '{') {
      j = skipTemplateInterpolation(content, j + 2);
      continue;
    }
    j++;
  }
  return content.length;
}

function skipTemplateInterpolation(content: string, i: number): number {
  let j = i;
  let depth = 0;
  while (j < content.length) {
    let k = skipLineComment(content, j);
    if (k !== j) {
      j = k;
      continue;
    }
    k = skipBlockComment(content, j);
    if (k !== j) {
      j = k;
      continue;
    }
    const c = content[j];
    if (c === "'") {
      j = skipSingleQuotedString(content, j);
      continue;
    }
    if (c === '"') {
      j = skipDoubleQuotedString(content, j);
      continue;
    }
    if (c === '`') {
      j = skipTemplateLiteral(content, j);
      continue;
    }
    if (c === '{') {
      depth++;
      j++;
      continue;
    }
    if (c === '}') {
      if (depth === 0) {
        return j + 1;
      }
      depth--;
      j++;
      continue;
    }
    j++;
  }
  return content.length;
}

function findStoryObjectEnd(content: string, openBraceIndex: number): number {
  let j = openBraceIndex + 1;
  let depth = 1;
  while (j < content.length && depth > 0) {
    let k = skipLineComment(content, j);
    if (k !== j) {
      j = k;
      continue;
    }
    k = skipBlockComment(content, j);
    if (k !== j) {
      j = k;
      continue;
    }
    const c = content[j];
    if (c === "'") {
      j = skipSingleQuotedString(content, j);
      continue;
    }
    if (c === '"') {
      j = skipDoubleQuotedString(content, j);
      continue;
    }
    if (c === '`') {
      j = skipTemplateLiteral(content, j);
      continue;
    }
    if (c === '{') {
      depth++;
      j++;
      continue;
    }
    if (c === '}') {
      depth--;
      j++;
      continue;
    }
    j++;
  }
  return j;
}

function extractDisplayName(storyBody: string, exportName: string): string {
  const m = /^\s*name\s*:\s*['"]([^'"]+)['"]/m.exec(storyBody);
  return m?.[1] ?? storybookNameFromExport(exportName);
}

function storybookNameFromExport(exportName: string): string {
  return exportName
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .trim();
}

function slugifyPrimaryStorybookForFilename(label: string): string {
  return label.replace(/\s+/g, '-').replace(/[/\\?%*:|"<>]/g, '_');
}

function screenshotPathFor(tagname: string, primaryStorybook: string): string {
  const slug = slugifyPrimaryStorybookForFilename(primaryStorybook);
  return `screenshots/${tagname}-${slug}.png`;
}

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function readPngFilePixelSize(
  absolutePath: string
): {width: number; height: number} | undefined {
  if (!fs.existsSync(absolutePath)) {
    return undefined;
  }
  const fd = fs.openSync(absolutePath, 'r');
  try {
    const header = Buffer.alloc(24);
    const bytesRead = fs.readSync(fd, header, 0, 24, 0);
    if (bytesRead < 24 || !header.subarray(0, 8).equals(PNG_SIGNATURE)) {
      return undefined;
    }
    const ihdr = header.subarray(12, 16).toString('ascii');
    if (ihdr !== 'IHDR') {
      return undefined;
    }
    const width = header.readUInt32BE(16);
    const height = header.readUInt32BE(20);
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
      return undefined;
    }
    return {width, height};
  } finally {
    fs.closeSync(fd);
  }
}

function logicalSizeFromRetinaPng(absolutePath: string): {
  widthPx: number | null;
  heightPx: number | null;
} {
  const px = readPngFilePixelSize(absolutePath);
  if (!px) {
    return {widthPx: null, heightPx: null};
  }
  return {
    widthPx: Math.round(px.width / PIXEL_RATIO),
    heightPx: Math.round(px.height / PIXEL_RATIO),
  };
}

function parseStoriesFile(
  filePath: string,
  content: string
): StoryPrimaryRow[] {
  const tagname =
    extractComponentTag(content) ?? inferTagnameFromFilename(filePath);
  const entries: StoryPrimaryRow[] = [];

  for (const match of content.matchAll(STORY_EXPORT_RE)) {
    const exportName = match[1];
    const openBraceIndex = match.index! + match[0].length - 1;
    const end = findStoryObjectEnd(content, openBraceIndex);
    const storyBody = content.slice(openBraceIndex, end);
    entries.push({
      tagname,
      primaryStorybook: extractDisplayName(storyBody, exportName),
    });
  }

  return entries;
}

function generateElementMeta() {
  const filePaths = globSync(SOURCE_GLOB, {absolute: true});
  const tsFilePaths = filePaths
    .filter((fp) => fs.statSync(fp).isFile())
    .sort((a, b) => a.localeCompare(b));

  const primaryByTag = new Map<string, string>();
  for (const fp of tsFilePaths) {
    const fileEntries = parseStoriesFile(fp, fs.readFileSync(fp, 'utf-8'));
    for (const {tagname, primaryStorybook} of fileEntries) {
      if (!primaryByTag.has(tagname)) {
        primaryByTag.set(tagname, primaryStorybook);
      }
    }
  }

  const allEntries: ElementMetaEntry[] = [...primaryByTag.entries()]
    .map(([tagname, primaryStorybook]) => {
      const screenshotPath = screenshotPathFor(tagname, primaryStorybook);
      const absShot = path.resolve(process.cwd(), screenshotPath);
      if (!fs.existsSync(absShot)) {
        console.error(
          `Missing screenshot for ${tagname}: expected file at ${screenshotPath}`
        );
        return {
          tagname,
          primaryStorybook,
          screenshotPath: null,
          widthPx: null,
          heightPx: null,
        };
      }
      const {widthPx, heightPx} = logicalSizeFromRetinaPng(absShot);
      return {
        tagname,
        primaryStorybook,
        screenshotPath,
        widthPx,
        heightPx,
      };
    })
    .sort((a, b) => a.tagname.localeCompare(b.tagname));

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(allEntries, null, 2) + '\n',
    'utf-8'
  );

  console.log(
    `Generated ${path.basename(OUTPUT_FILE)} (${allEntries.length} entries)`
  );
}

generateElementMeta();
