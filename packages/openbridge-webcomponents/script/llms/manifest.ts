import fs from 'node:fs';
import type {
  ComponentEntry,
  Family,
  FamilyId,
  Manifest,
  ManifestDeclaration,
} from './types.js';

export type {ComponentEntry, Manifest} from './types.js';

export const FAMILIES: readonly Family[] = [
  {id: 'components', title: 'UI components'},
  {
    id: 'navigation-instruments',
    title: 'Navigation instruments and indicators',
  },
  {id: 'bars-graphs', title: 'Charts'},
  {id: 'building-blocks', title: 'Building blocks'},
  {id: 'automation', title: 'Automation'},
  {id: 'ar', title: 'Augmented reality'},
  {id: 'integration-systems', title: 'Integration systems'},
  {id: 'pages', title: 'Pages'},
];

const FAMILY_IDS = new Set<string>(FAMILIES.map((f) => f.id));

export function readManifest(file: string): Manifest {
  if (!fs.existsSync(file)) {
    throw new Error(
      'custom-elements.json not found; run npm run analyze first'
    );
  }
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Manifest;
}

export function familyOf(modulePath: string): FamilyId | undefined {
  const dir = modulePath.split('/')[1];
  return dir && FAMILY_IDS.has(dir) ? (dir as FamilyId) : undefined;
}

/** Cuts after the first sentence, where the next one starts with a capital or a code span. */
export function firstSentence(text: string): string {
  const m = /\.\s+(?=[A-Z`])/.exec(text);
  return m ? text.slice(0, m.index + 1) : text;
}

const TAG_PREFIX = /^`<?obc-[\w-]+>?`\s*(?:[–—-]\s*)?/;
const NOT_A_SUMMARY = /^(#|```|@|\*\*TODO\(|TODO\()/;

export function summaryOf(description: string | undefined): string | undefined {
  if (!description) return undefined;
  const paragraph = description
    .split(/\n\s*\n/)[0]
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join(' ');
  if (!paragraph || NOT_A_SUMMARY.test(paragraph)) return undefined;
  const text = firstSentence(paragraph.replace(TAG_PREFIX, '')).trim();
  return text ? text.replace(/[[\]|]/g, (c) => `\\${c}`) : undefined;
}

export function componentEntries(
  manifest: Manifest,
  warn: (msg: string) => void
): ComponentEntry[] {
  const entries: ComponentEntry[] = [];
  for (const module of manifest.modules) {
    for (const declaration of module.declarations ?? []) {
      const tag = declaration.tagName;
      if (!tag?.startsWith('obc-')) continue;
      const family = familyOf(module.path);
      if (!family) {
        warn(
          `llms.txt: ${tag} in ${module.path} is outside the families; skipped`
        );
        continue;
      }
      entries.push(toEntry(tag, family, module.path, declaration));
    }
  }
  const order = new Map(FAMILIES.map((f, i) => [f.id, i]));
  return entries.sort(
    (a, b) =>
      order.get(a.family)! - order.get(b.family)! || a.tag.localeCompare(b.tag)
  );
}

function toEntry(
  tag: string,
  family: FamilyId,
  modulePath: string,
  declaration: ManifestDeclaration
): ComponentEntry {
  const {deprecated} = declaration;
  return {
    tag,
    className: declaration.name ?? '',
    modulePath,
    family,
    summary: summaryOf(declaration.description),
    lifecycle: declaration.lifecycle,
    deprecatedNote:
      typeof deprecated === 'string' ? firstSentence(deprecated) : undefined,
    description: declaration.description ?? '',
    declaration,
  };
}
