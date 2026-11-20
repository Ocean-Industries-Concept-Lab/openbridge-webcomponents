import fs from 'node:fs';
import path from 'node:path';
import {sanitize} from 'storybook/internal/csf';
import {rawUrl, siteUrl, type Channel} from './channel.js';
import {componentEntries, readManifest} from './manifest.js';
import {mdxToMarkdown} from './mdx.js';
import {renderComponentPage} from './render-component.js';
import {
  isModuleGuide,
  renderLlmsFull,
  renderStoriesGuide,
} from './render-guides.js';
import {gapReport, renderLlmsTxt} from './render-llms-txt.js';
import {agentDocs, mdxGuides, packageMeta, type Guide} from './sources.js';
import {
  storiesIndex,
  storyPageUrl,
  type DocsRef,
  type StoriesInfo,
} from './stories.js';
import type {ComponentEntry, Manifest} from './types.js';

/**
 * The llms.txt generator
 *
 * Writes `llms.txt`, a markdown page per component under `components/`, one
 * per guide under `docs/`, and `llms-full.txt` into `out`, from the manifest,
 * `docs/*.mdx`, the stories, `docs/agents` frontmatter and `package.json`.
 * The README and `docs/agents` are optional inputs: the full-bundle package
 * runs the same `prepack` chain from a copy that has neither.
 */
export interface GenerateOptions {
  packageRoot: string;
  repoRoot: string;
  out: string;
  channel: Channel;
  warn: (msg: string) => void;
}

const PACKAGE_DIR = 'packages/openbridge-webcomponents';
const CHANGELOG_TITLE = 'Introduction/Changelog';

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
    return `[Story: ${info.title} / ${story.name}](${storyPageUrl(channel, info.title, story.exportName)})`;
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
    (g) => tag.test(g.source) || g.source.includes(storiesModule)
  );
}

function optionalFile(
  file: string,
  warn: (msg: string) => void
): string | undefined {
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8');
  warn(`llms.txt: ${file} is missing; left out`);
  return undefined;
}

/** Writes the output directory and returns the gap report. */
export function generate(options: GenerateOptions): string {
  const {packageRoot, repoRoot, out, channel, warn} = options;
  const manifest = readManifest(path.join(packageRoot, 'custom-elements.json'));
  const entries = componentEntries(manifest, warn);
  const stories = storiesIndex(path.join(packageRoot, 'src'), warn);
  const moduleGuides = stories
    .filter(isModuleGuide)
    .map(moduleGuide)
    .sort((a, b) => a.title.localeCompare(b.title));
  const guides = [
    ...mdxGuides(path.join(packageRoot, 'docs'), warn),
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
    pkg: packageMeta(path.join(packageRoot, 'package.json')),
    channel,
    entries,
    guides,
    agentDocs: agentDocs(path.join(repoRoot, 'docs/agents'), warn),
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
  const readme = optionalFile(path.join(packageRoot, 'README.md'), warn);
  const orderedGuides = [
    ...guides.filter((g) => !g.optional),
    ...guides.filter((g) => g.optional),
  ];
  const llmsFull = renderLlmsFull([
    ...(readme ? [{title: 'README', markdown: readme}] : []),
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
  return gapReport(entries);
}
