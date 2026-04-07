import * as fs from 'fs';
import * as path from 'path';
import {globSync} from 'glob';

interface DefaultSizeEntry {
  tagname: string;
  baseHeightPx?: number;
  baseWidthPx?: number;
}

const OUTPUT_FILE = path.resolve(process.cwd(), 'default-sizes.json');
const SOURCE_GLOB = 'src/**/*.ts';
const IGNORE_GLOBS = ['src/**/*.stories.ts'];

const IGNORE_TAGS = ['obc-instrument-field', 'obc-graph-mini'];

function parseSnapshotSizeFromFile(filePath: string): DefaultSizeEntry[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const entries: DefaultSizeEntry[] = [];
  const docAndDecoratorRegex =
    /\/\*\*[\s\S]*?\*\/\s*@customElement\((['"`])([^'"`]+)\1\)/g;
  const isInstrument = isInstrumentFile(filePath);

  for (const match of content.matchAll(docAndDecoratorRegex)) {
    const fullMatch = match[0];
    const tagname = match[2];

    if (!tagname.startsWith('obc-')) {
      console.log(`Skipping ${tagname} in ${filePath}`);
      continue;
    }

    if (IGNORE_TAGS.includes(tagname)) {
      continue;
    }

    const baseHeightMatch = fullMatch.match(
      /@snapshot-base-height\s*([0-9]+(?:\.[0-9]+)?)px/
    );
    const baseWidthMatch = fullMatch.match(
      /@snapshot-base-width\s*([0-9]+(?:\.[0-9]+)?)px/
    );
    const hasSomeSizes = baseHeightMatch || baseWidthMatch;

    if (!hasSomeSizes && !isInstrument) {
      continue;
    }

    const defaultHeightPx = isInstrument ? 512 : undefined;
    const defaultWidthPx = isInstrument ? 512 : undefined;

    const baseHeightPx = baseHeightMatch ? Number(baseHeightMatch[1]) : defaultHeightPx;
    const baseWidthPx = baseWidthMatch ? Number(baseWidthMatch[1]) : defaultWidthPx;

    entries.push({
      tagname,
      baseHeightPx,
      baseWidthPx,
    });
  }

  if (entries.length > 0) {
    return entries;
  }

  if (!isInstrument) {
    return entries;
  }

 
  // Get tags without documentation
  const tagsWithoutDocumentation = content.matchAll(/@customElement\((['"`])([^'"`]+)\1\)/g) ?? [];
  for (const match of tagsWithoutDocumentation) {
    const tagname = match[2];
    if (IGNORE_TAGS.includes(tagname)) {
      continue;
    }
    entries.push({
      tagname: tagname,
      baseHeightPx: 512,
      baseWidthPx: 512,
    });
  }

  return entries;
}

function isInstrumentFile(filePath: string): boolean {
  const inInstrumentFolder = filePath.includes('navigation-instruments');
  const isIndicator = filePath.includes('indicator');
  return inInstrumentFolder && !isIndicator;
}

function generateDefaultSizesFile() {
  const filePaths = globSync(SOURCE_GLOB, {
    ignore: IGNORE_GLOBS,
    absolute: true,
  });
  const tsFilePaths = filePaths.filter((filePath) =>
    fs.statSync(filePath).isFile()
  );

  const allEntries = tsFilePaths.flatMap((filePath) =>
    parseSnapshotSizeFromFile(filePath)
  );

  const deduplicated = Array.from(
    new Map(allEntries.map((entry) => [entry.tagname, entry])).values()
  ).sort((a, b) => a.tagname.localeCompare(b.tagname));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({defaultSizes: deduplicated}, null, 2) + '\n');

  console.log(`Generated ${path.basename(OUTPUT_FILE)} (${deduplicated.length})`);
}

generateDefaultSizesFile();
