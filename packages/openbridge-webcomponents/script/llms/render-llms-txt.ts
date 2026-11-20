import {
  CORE_PACKAGE,
  WRAPPER_PACKAGES,
  rawUrl,
  siteUrl,
  unpkgUrl,
  type Channel,
} from './channel.js';
import {FAMILIES} from './manifest.js';
import type {AgentDocSummary, Guide, PackageMeta} from './sources.js';
import type {ComponentEntry} from './types.js';

export interface LlmsTxtInput {
  pkg: PackageMeta;
  channel: Channel;
  entries: ComponentEntry[];
  guides: Guide[];
  agentDocs: AgentDocSummary[];
  componentHref: (e: ComponentEntry) => string;
  guideHref: (g: Guide) => string;
  extraReference?: {name: string; href: string; note: string}[];
}

const WRAPPER_LABELS: Record<(typeof WRAPPER_PACKAGES)[number], string> = {
  '@oicl/openbridge-webcomponents-react': 'React',
  '@oicl/openbridge-webcomponents-vue': 'Vue',
  '@oicl/openbridge-webcomponents-ng': 'Angular',
  '@oicl/openbridge-webcomponents-svelte': 'Svelte',
};

const link = (name: string, href: string, note?: string): string =>
  `- [${name}](${href})${note ? `: ${note}` : ''}`;

const guideTitle = (g: Guide): string => g.title.replace(/^Introduction\//, '');

function componentLine(e: ComponentEntry, href: string): string {
  const summary = e.summary ?? 'no summary yet';
  let status: string;
  if (e.lifecycle === 'deprecated') {
    status = e.deprecatedNote
      ? `deprecated: ${e.deprecatedNote}`
      : 'deprecated';
  } else {
    status = e.lifecycle ?? 'lifecycle unknown';
  }
  return `${link(e.tag, href, summary)} (${status})`;
}

export function renderLlmsTxt(input: LlmsTxtInput): string {
  const {
    channel: ch,
    entries,
    guides,
    agentDocs,
    componentHref,
    guideHref,
  } = input;
  const out: string[] = [];
  const section = (title: string, lines: string[]) => {
    if (lines.length === 0) return;
    out.push(`## ${title}`, '', ...lines, '');
  };

  out.push(
    '# OpenBridge Web Components',
    '',
    `> ${input.pkg.description}`,
    '',
    `Install \`npm i ${CORE_PACKAGE}\` (\`@next\` for the develop`,
    'line). The README covers the palette CSS, the theme attribute, size classes',
    'and fonts; read it before any component page. Components are documented in',
    'their source JSDoc, which also feeds the custom elements manifest and the',
    'React, Vue, Angular and Svelte wrappers.',
    ''
  );

  section('Getting started', [
    link(
      'README',
      unpkgUrl(ch, CORE_PACKAGE, 'README.md'),
      'install, the setup lines, usage, wrappers, CDN bundle'
    ),
    link(
      'Getting started: React',
      rawUrl(ch, 'docs/getting-started-react.md'),
      'the React wrapper, step by step'
    ),
    link(
      'Getting started: Angular',
      rawUrl(ch, 'docs/getting-started-angular.md'),
      'the Angular wrapper, step by step'
    ),
    link(
      'Custom charts with OpenBridge theming',
      rawUrl(ch, 'docs/graph.md'),
      "Chart.js plots in the library's colours"
    ),
    ...WRAPPER_PACKAGES.map((pkg) =>
      link(
        `${WRAPPER_LABELS[pkg]} wrapper README`,
        unpkgUrl(ch, pkg, 'README.md'),
        `install and usage for ${WRAPPER_LABELS[pkg]}`
      )
    ),
  ]);

  section(
    'Guides',
    guides
      .filter((g) => !g.optional)
      .map((g) => link(guideTitle(g), guideHref(g)))
  );

  section('Component reference', [
    link(
      'custom-elements.json',
      siteUrl(ch, '/custom-elements.json'),
      'every element with its properties, attributes, events, slots and lifecycle; about 5 MiB'
    ),
    link(
      'Storybook',
      siteUrl(ch, '/'),
      'rendered docs and live stories, for people'
    ),
    link(
      'Storybook index',
      siteUrl(ch, '/index.json'),
      'story and docs page ids'
    ),
    ...(input.extraReference ?? []).map((r) => link(r.name, r.href, r.note)),
  ]);

  for (const family of FAMILIES) {
    section(
      family.title,
      entries
        .filter((e) => e.family === family.id)
        .map((e) => componentLine(e, componentHref(e)))
    );
  }

  section('Optional', [
    ...guides
      .filter((g) => g.optional)
      .map((g) => link(guideTitle(g), guideHref(g))),
    link('Contributing', rawUrl(ch, 'CONTRIBUTING.md'), 'how to contribute'),
    link(
      'Implementation guidelines',
      rawUrl(ch, 'IMPLEMENTATION_GUIDELINES.md'),
      'architecture, PostCSS mixins, SVG practices'
    ),
    link(
      'AGENTS.md',
      rawUrl(ch, 'AGENTS.md'),
      'how the library is built and documented'
    ),
    ...agentDocs.map((d) =>
      link(d.name, rawUrl(ch, d.repoPath), d.description)
    ),
  ]);

  return out.join('\n').replace(/\n+$/, '\n');
}

/** Counts the minimum the spec asks for: a description, and a summary line in it. */
export function gapReport(entries: ComponentEntry[]): string {
  const count = (list: ComponentEntry[]) => ({
    total: list.length,
    noDescription: list.filter((e) => !e.description).length,
    noSummary: list.filter((e) => e.description && e.summary === undefined)
      .length,
  });
  const all = count(entries);
  const lines = [
    `llms.txt: ${all.total} components, ${all.noDescription} without a description, ${all.noSummary} without a summary line`,
  ];
  for (const family of FAMILIES) {
    const c = count(entries.filter((e) => e.family === family.id));
    if (c.noDescription === 0 && c.noSummary === 0) continue;
    lines.push(
      `  ${family.id}: ${c.noDescription} without a description, ${c.noSummary} without a summary line`
    );
  }
  return lines.join('\n');
}
