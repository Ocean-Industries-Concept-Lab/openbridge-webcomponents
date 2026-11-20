import {rawUrl, type Channel} from './channel.js';
import {docsPageUrl, storyPageUrl, type StoriesInfo} from './stories.js';
import type {ComponentEntry, ManifestNamed} from './types.js';

export interface ComponentPageInput {
  entry: ComponentEntry;
  channel: Channel;
  stories: StoriesInfo[];
  seeAlso: {title: string; href: string}[];
}

const PACKAGE_DIR = 'packages/openbridge-webcomponents';

/** One table cell: pipes escaped, newlines flattened, nothing for undefined. */
export function escapeCell(text: string | undefined): string {
  return (text ?? '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
}

// GFM splits a table cell on a pipe even inside a code span unless it is escaped.
const code = (text: string | undefined): string =>
  text ? `\`${text.replace(/\n\s*/g, ' ').replace(/\|/g, '\\|')}\`` : '';

/** Shifts every heading outside fenced code so the shallowest one is `##`. */
export function normalizeHeadings(markdown: string): string {
  const lines = markdown.split('\n');
  let inFence = false;
  let min = Infinity;
  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    else if (!inFence) {
      const m = /^(#{1,6})\s/.exec(line);
      if (m) min = Math.min(min, m[1].length);
    }
  }
  if (min === Infinity || min === 2) return markdown;
  const shift = 2 - min;
  inFence = false;
  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      const m = !inFence && /^(#{1,6})(\s.*)$/.exec(line);
      return m ? '#'.repeat(m[1].length + shift) + m[2] : line;
    })
    .join('\n');
}

function table(header: string[], rows: string[][]): string[] {
  if (rows.length === 0) return ['None.'];
  return [
    `| ${header.join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${r.join(' | ')} |`),
  ];
}

function named(items: ManifestNamed[]): string[][] {
  return items.map((i) => [i.name || '(default)', escapeCell(i.description)]);
}

export function renderComponentPage(input: ComponentPageInput): string {
  const {entry, channel, stories, seeAlso} = input;
  const d = entry.declaration;
  const own = stories.filter((s) => s.componentTag === entry.tag);
  const docsTitle = own.find((s) => s.title)?.title;
  const out: string[] = [
    `# \`<${entry.tag}>\``,
    '',
    entry.summary ?? 'No summary yet.',
    '',
  ];

  const links = [
    docsTitle ? `[Storybook](${docsPageUrl(channel, docsTitle)})` : undefined,
    `[Source](${rawUrl(channel, `${PACKAGE_DIR}/${entry.modulePath}`)})`,
  ].filter(Boolean);
  out.push(
    `Lifecycle: ${entry.lifecycle ?? 'unknown'}. ${links.join(' · ')}`,
    ''
  );

  if (entry.description) out.push(normalizeHeadings(entry.description), '');
  for (const s of own) {
    if (typeof s.componentDocs === 'string')
      out.push(normalizeHeadings(s.componentDocs), '');
  }

  const attributeOf = new Map(
    (d.attributes ?? []).map((a) => [a.fieldName, a.name])
  );
  const fields = (d.members ?? []).filter(
    (m) =>
      m.kind === 'field' &&
      !m.static &&
      (m.privacy ?? 'public') === 'public' &&
      !m.name.startsWith('_')
  );
  out.push(
    '## Properties',
    '',
    ...table(
      ['Property', 'Attribute', 'Type', 'Default', 'Description'],
      fields.map((m) => [
        m.name,
        attributeOf.get(m.name) ?? '',
        code(m.type?.text),
        code(m.default),
        escapeCell(m.description),
      ])
    ),
    '',
    '## Events',
    '',
    ...table(
      ['Event', 'Type', 'Description'],
      (d.events ?? []).map((e) => [
        e.name,
        code(e.type?.text),
        escapeCell(e.description),
      ])
    ),
    '',
    '## Slots',
    '',
    ...table(['Slot', 'Description'], named(d.slots ?? [])),
    ''
  );
  if (d.cssParts?.length) {
    out.push(
      '## CSS parts',
      '',
      ...table(['Part', 'Description'], named(d.cssParts)),
      ''
    );
  }
  if (d.cssProperties?.length) {
    out.push(
      '## CSS custom properties',
      '',
      ...table(['Property', 'Description'], named(d.cssProperties)),
      ''
    );
  }

  const storyLines = own.flatMap((s) =>
    s.title
      ? s.stories.map(
          (st) =>
            `- [${st.name}](${storyPageUrl(channel, s.title!, st.exportName)})${st.doc ? `: ${escapeCell(st.doc)}` : ''}`
        )
      : []
  );
  if (storyLines.length) out.push('## Stories', '', ...storyLines, '');
  if (seeAlso.length) {
    out.push(
      '## See also',
      '',
      ...seeAlso.map((s) => `- [${s.title}](${s.href})`),
      ''
    );
  }
  return out.join('\n').replace(/\n+$/, '\n');
}
