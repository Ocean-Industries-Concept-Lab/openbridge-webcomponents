/**
 * llms.txt generator
 *
 * Writes the agent-facing docs into `llms/` (gitignored): `llms.txt`, a
 * markdown page per component under `components/`, one per guide under
 * `docs/`, `llms-full.txt` with all of them, and a copy of the manifest, so
 * the Storybook root serves them all. Runs at the end of `npm run analyze`;
 * `--channel next|latest` picks the hosts the links use (`LLMS_CHANNEL`,
 * then `GITHUB_REF_NAME`, when the flag is absent).
 */
import fs from 'node:fs';
import path from 'node:path';
import {sanitize} from 'storybook/internal/csf';
import {rawUrl, resolveChannel, siteUrl, type Channel} from './llms/channel.js';
import {componentEntries, readManifest} from './llms/manifest.js';
import {mdxToMarkdown} from './llms/mdx.js';
import {renderComponentPage} from './llms/render-component.js';
import {
  isModuleGuide,
  renderLlmsFull,
  renderStoriesGuide,
} from './llms/render-guides.js';
import {gapReport, renderLlmsTxt} from './llms/render-llms-txt.js';
import {agentDocs, mdxGuides, packageMeta, type Guide} from './llms/sources.js';
import {
  storiesIndex,
  storyPageUrl,
  type DocsRef,
  type StoriesInfo,
} from './llms/stories.js';
import type {ComponentEntry, Manifest} from './llms/types.js';

const PACKAGE_ROOT = path.resolve(import.meta.dirname, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '../..');
const PACKAGE_DIR = 'packages/openbridge-webcomponents';
const CHANGELOG_TITLE = 'Introduction/Changelog';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

const warn = (msg: string) => console.warn(msg);

/** The Introduction page reads these from `.storybook/channels.ts`; the generator knows the channel. */
function mdxVars(channel: Channel): Record<string, string | boolean> {
  return {
    isStable: channel.name === 'latest',
    isDevelop: channel.name !== 'latest',
    STORYBOOK_STABLE_URL: 'https://openbridge-storybook.web.app',
    STORYBOOK_DEVELOP_URL: 'https://openbridge-next-storybook.web.app',
  };
}

/** `<Canvas of={Ns.Export}>`: the stories file the MDX imported, by its path without extension. */
function storyLinkFor(
  stories: StoriesInfo[],
  channel: Channel,
  mdxFile: string
) {
  return (importPath: string, exportName: string): string | undefined => {
    const target = path
      .resolve(path.dirname(mdxFile), importPath)
      .replace(/\.ts$/, '');
    const info = stories.find((s) => s.file.replace(/\.ts$/, '') === target);
    const story = info?.stories.find((s) => s.exportName === exportName);
    if (!info?.title || !story) return undefined;
    return `[Story: ${info.title} / ${story.name}](${storyPageUrl(channel, info.title, story.name)})`;
  };
}

/** `moduleDocs()` / `classDocs()` in a stories file, resolved against the manifest like `.storybook/manifest-docs.ts` does. */
function manifestDocs(manifest: Manifest) {
  return (ref: DocsRef): string | undefined =>
    ref.kind === 'moduleDocs'
      ? manifest.modules.find((m) => m.path.endsWith(ref.arg))?.description
      : manifest.modules
          .flatMap((m) => m.declarations ?? [])
          .find((d) => d.name === ref.arg)?.description;
}

/** A stories file that documents a module is a guide too; its source feeds the See-also matching. */
function moduleGuide(info: StoriesInfo): Guide {
  return {
    title: info.title!,
    file: info.file,
    slug: sanitize(info.title!),
    optional: false,
    source: fs.readFileSync(info.file, 'utf8'),
  };
}

/** Guides that name the component's tag or import its stories module. */
function guidesMentioning(entry: ComponentEntry, guides: Guide[]): Guide[] {
  const tag = new RegExp(`${entry.tag}(?![\\w-])`);
  const storiesModule = entry.modulePath
    .replace(/^src\//, '')
    .replace(/\.ts$/, '.stories');
  return guides.filter(
    (g) =>
      g.file !== entry.modulePath &&
      (tag.test(g.source) || g.source.includes(storiesModule))
  );
}

function main(): void {
  const channel = resolveChannel(arg('--channel'), process.env);
  const out = path.resolve(PACKAGE_ROOT, arg('--out') ?? 'llms');
  const manifestFile = path.join(PACKAGE_ROOT, 'custom-elements.json');

  const manifest = readManifest(manifestFile);
  const entries = componentEntries(manifest, warn);
  const stories = storiesIndex(path.join(PACKAGE_ROOT, 'src'), warn);
  const moduleGuides = stories
    .filter(isModuleGuide)
    .map(moduleGuide)
    .sort((a, b) => a.title.localeCompare(b.title));
  const guides = [
    ...mdxGuides(path.join(PACKAGE_ROOT, 'docs'), warn),
    ...moduleGuides,
  ];
  const guideHref = (g: Guide) =>
    g.title === CHANGELOG_TITLE
      ? rawUrl(channel, `${PACKAGE_DIR}/CHANGELOG.md`)
      : siteUrl(channel, `/docs/${g.slug}.md`);
  const componentHref = (e: ComponentEntry) =>
    siteUrl(channel, `/components/${e.tag}.md`);

  const resolveDocs = manifestDocs(manifest);
  const guidePages = new Map<Guide, string>();
  for (const guide of guides) {
    if (guide.title === CHANGELOG_TITLE) continue;
    const info = stories.find((s) => s.file === guide.file);
    const page = info
      ? renderStoriesGuide(info, channel, resolveDocs)
      : `${mdxToMarkdown(guide.source, {
          readRaw: (p) =>
            fs.readFileSync(
              path.resolve(path.dirname(guide.file), p.replace(/\?raw$/, '')),
              'utf8'
            ),
          storyLink: storyLinkFor(stories, channel, guide.file),
          site: channel.site,
          vars: mdxVars(channel),
          warn,
        })}\n`;
    guidePages.set(guide, page);
  }
  const componentPages = new Map<ComponentEntry, string>(
    entries.map((entry) => [
      entry,
      renderComponentPage({
        entry,
        channel,
        stories,
        seeAlso: guidesMentioning(entry, guides).map((g) => ({
          title: g.title.replace(/^Introduction\//, ''),
          href: guideHref(g),
        })),
      }),
    ])
  );

  const llmsTxt = renderLlmsTxt({
    pkg: packageMeta(path.join(PACKAGE_ROOT, 'package.json')),
    channel,
    entries,
    guides,
    agentDocs: agentDocs(path.join(REPO_ROOT, 'docs/agents'), warn),
    componentHref,
    guideHref,
    extraReference: [
      {
        name: 'llms-full.txt',
        href: siteUrl(channel, '/llms-full.txt'),
        note: 'the README, every guide and every component page in one file',
      },
    ],
  });
  const orderedGuides = [
    ...guides.filter((g) => !g.optional),
    ...guides.filter((g) => g.optional),
  ];
  const llmsFull = renderLlmsFull([
    {
      title: 'README',
      markdown: fs.readFileSync(path.join(PACKAGE_ROOT, 'README.md'), 'utf8'),
    },
    ...orderedGuides.flatMap((g) => {
      const markdown = guidePages.get(g);
      return markdown ? [{title: g.title, markdown}] : [];
    }),
    ...entries.map((e) => ({title: e.tag, markdown: componentPages.get(e)!})),
  ]);

  fs.rmSync(out, {recursive: true, force: true});
  fs.mkdirSync(path.join(out, 'docs'), {recursive: true});
  fs.mkdirSync(path.join(out, 'components'));
  fs.writeFileSync(path.join(out, 'llms.txt'), llmsTxt);
  fs.writeFileSync(path.join(out, 'llms-full.txt'), llmsFull);
  for (const [guide, page] of guidePages) {
    fs.writeFileSync(path.join(out, 'docs', `${guide.slug}.md`), page);
  }
  for (const [entry, page] of componentPages) {
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
