/**
 * llms.txt generator
 *
 * Writes the agent-facing docs into `llms/` (gitignored): `llms.txt`, a
 * markdown page per component under `components/`, and a copy of the
 * manifest, so the Storybook root serves them all. Runs at the end of
 * `npm run analyze`; `--channel next|latest` picks the hosts the links use
 * (`LLMS_CHANNEL`, then `GITHUB_REF_NAME`, when the flag is absent).
 */
import fs from 'node:fs';
import path from 'node:path';
import {rawUrl, resolveChannel} from './llms/channel.js';
import {componentEntries, readManifest} from './llms/manifest.js';
import {renderComponentPage} from './llms/render-component.js';
import {gapReport, renderLlmsTxt} from './llms/render-llms-txt.js';
import {agentDocs, mdxGuides, packageMeta, type Guide} from './llms/sources.js';
import {storiesIndex} from './llms/stories.js';
import type {ComponentEntry} from './llms/types.js';

const PACKAGE_ROOT = path.resolve(import.meta.dirname, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '../..');
const PACKAGE_DIR = 'packages/openbridge-webcomponents';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

const warn = (msg: string) => console.warn(msg);

/** Guides that name the component's tag or import its stories module. */
function guidesMentioning(entry: ComponentEntry, guides: Guide[]): Guide[] {
  const tag = new RegExp(`${entry.tag}(?![\\w-])`);
  const storiesModule = entry.modulePath
    .replace(/^src\//, '')
    .replace(/\.ts$/, '.stories');
  return guides.filter(
    (g) => tag.test(g.source) || g.source.includes(storiesModule)
  );
}

function main(): void {
  const channel = resolveChannel(arg('--channel'), process.env);
  const out = path.resolve(PACKAGE_ROOT, arg('--out') ?? 'llms');
  const manifestFile = path.join(PACKAGE_ROOT, 'custom-elements.json');

  const manifest = readManifest(manifestFile);
  const entries = componentEntries(manifest, warn);
  const guides = mdxGuides(path.join(PACKAGE_ROOT, 'docs'), warn);
  const stories = storiesIndex(path.join(PACKAGE_ROOT, 'src'), warn);
  const guideHref = (g: Guide) =>
    rawUrl(channel, `${PACKAGE_DIR}/docs/${path.basename(g.file)}`);

  const llmsTxt = renderLlmsTxt({
    pkg: packageMeta(path.join(PACKAGE_ROOT, 'package.json')),
    channel,
    entries,
    guides,
    agentDocs: agentDocs(path.join(REPO_ROOT, 'docs/agents'), warn),
    componentHref: (e) => rawUrl(channel, `${PACKAGE_DIR}/${e.modulePath}`),
    guideHref,
  });

  fs.rmSync(out, {recursive: true, force: true});
  fs.mkdirSync(out, {recursive: true});
  fs.writeFileSync(path.join(out, 'llms.txt'), llmsTxt);
  fs.mkdirSync(path.join(out, 'components'));
  for (const entry of entries) {
    const page = renderComponentPage({
      entry,
      channel,
      stories,
      seeAlso: guidesMentioning(entry, guides).map((g) => ({
        title: g.title.replace(/^Introduction\//, ''),
        href: guideHref(g),
      })),
    });
    fs.writeFileSync(path.join(out, 'components', `${entry.tag}.md`), page);
  }
  fs.copyFileSync(manifestFile, path.join(out, 'custom-elements.json'));
  console.log(gapReport(entries));
}

try {
  main();
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
