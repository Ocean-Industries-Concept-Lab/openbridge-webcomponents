/**
 * llms.txt generator
 *
 * Writes the agent-facing docs into `llms/` (gitignored): `llms.txt`, and a
 * copy of the manifest so the Storybook root serves both. Runs at the end of
 * `npm run analyze`; `--channel next|latest` picks the hosts the links use
 * (`LLMS_CHANNEL`, then `GITHUB_REF_NAME`, when the flag is absent).
 */
import fs from 'node:fs';
import path from 'node:path';
import {rawUrl, resolveChannel} from './llms/channel.js';
import {componentEntries, readManifest} from './llms/manifest.js';
import {gapReport, renderLlmsTxt} from './llms/render-llms-txt.js';
import {agentDocs, mdxGuides, packageMeta} from './llms/sources.js';

const PACKAGE_ROOT = path.resolve(import.meta.dirname, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '../..');
const PACKAGE_DIR = 'packages/openbridge-webcomponents';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

const warn = (msg: string) => console.warn(msg);

function main(): void {
  const channel = resolveChannel(arg('--channel'), process.env);
  const out = path.resolve(PACKAGE_ROOT, arg('--out') ?? 'llms');
  const manifestFile = path.join(PACKAGE_ROOT, 'custom-elements.json');

  const manifest = readManifest(manifestFile);
  const entries = componentEntries(manifest, warn);
  const guides = mdxGuides(path.join(PACKAGE_ROOT, 'docs'), warn);

  const llmsTxt = renderLlmsTxt({
    pkg: packageMeta(path.join(PACKAGE_ROOT, 'package.json')),
    channel,
    entries,
    guides,
    agentDocs: agentDocs(path.join(REPO_ROOT, 'docs/agents'), warn),
    componentHref: (e) => rawUrl(channel, `${PACKAGE_DIR}/${e.modulePath}`),
    guideHref: (g) =>
      rawUrl(channel, `${PACKAGE_DIR}/docs/${path.basename(g.file)}`),
  });

  fs.rmSync(out, {recursive: true, force: true});
  fs.mkdirSync(out, {recursive: true});
  fs.writeFileSync(path.join(out, 'llms.txt'), llmsTxt);
  fs.copyFileSync(manifestFile, path.join(out, 'custom-elements.json'));
  console.log(gapReport(entries));
}

try {
  main();
} catch (e) {
  console.error((e as Error).message);
  process.exit(1);
}
