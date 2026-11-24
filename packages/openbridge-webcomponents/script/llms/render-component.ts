import {rawUrl, type Channel} from './channel.js';
import {fenceState} from './markdown.js';
import {
  storybookUrl,
  storyPageUrl,
  type DocsRef,
  type StoriesInfo,
} from './stories.js';
import type {ComponentEntry, ManifestNamed} from './types.js';

export interface ComponentPageInput {
  entry: ComponentEntry;
  channel: Channel;
  stories: StoriesInfo[];
  seeAlso: {title: string; href: string}[];
  resolveDocs?: (ref: DocsRef) => string | undefined;
}

const PACKAGE_DIR = 'packages/openbridge-webcomponents';

/** One table cell: pipes escaped, newlines flattened, nothing for undefined. */
export function escapeCell(text: string | undefined): string {
  return (text ?? '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
}

// A list, fence, quote, heading or table line: it keeps its own line.
const BLOCK_START = /^\s*([-*+]\s|\d+[.)]\s|`{3,}|~{3,}|>|#{1,6}\s|\|)/;

/** A story as a list item: its opening prose on the line, everything after it indented under it. */
export function storyItem(
  name: string,
  url: string,
  doc: string | undefined
): string {
  const link = `- [${name}](${url})`;
  if (!doc) return link;
  const lines = doc.split('\n');
  let end = lines.findIndex((l) => !l.trim() || BLOCK_START.test(l));
  if (end === -1) end = lines.length;
  const prose = lines
    .slice(0, end)
    .map((l) => l.trim())
    .join(' ');
  const body = lines
    .slice(end)
    .map((l) => (l.trim() ? `  ${l}` : ''))
    .join('\n')
    .replace(/^\n+/, '');
  return [prose ? `${link}: ${prose}` : link, body]
    .filter(Boolean)
    .join('\n\n');
}

// GFM splits a table cell on a pipe even inside a code span unless it is escaped.
const code = (text: string | undefined): string =>
  text ? `\`${text.replace(/\n\s*/g, ' ').replace(/\|/g, '\\|')}\`` : '';

/** Shifts every heading outside fenced code so the shallowest one is `##`. */
export function normalizeHeadings(markdown: string): string {
  const lines = markdown.split('\n');
  let fence = fenceState();
  let min = Infinity;
  for (const line of lines) {
    if (fence.update(line) || fence.inFence) continue;
    const m = /^(#{1,6})\s/.exec(line);
    if (m) min = Math.min(min, m[1].length);
  }
  if (min === Infinity || min === 2) return markdown;
  const shift = 2 - min;
  fence = fenceState();
  return lines
    .map((line) => {
      if (fence.update(line) || fence.inFence) return line;
      const m = /^(#{1,6})(\s.*)$/.exec(line);
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
  const {entry, channel, stories, seeAlso, resolveDocs} = input;
  const d = entry.declaration;
  const own = stories.filter((s) => s.componentTag === entry.tag);
  const linked =
    own.find((s) => s.title && s.docsPage) ?? own.find((s) => s.title);
  const storybook = linked && storybookUrl(channel, linked);
  const out: string[] = [
    `# \`<${entry.tag}>\``,
    '',
    entry.summary ?? 'No summary yet.',
    '',
  ];

  const links = [
    storybook ? `[Storybook](${storybook})` : undefined,
    `[Source](${rawUrl(channel, `${PACKAGE_DIR}/${entry.modulePath}`)})`,
  ].filter(Boolean);
  out.push(
    `Lifecycle: ${entry.lifecycle ?? 'unknown'}. ${links.join(' · ')}`,
    ''
  );

  if (entry.description) out.push(normalizeHeadings(entry.description), '');
  for (const s of own) {
    const docs =
      typeof s.componentDocs === 'string'
        ? s.componentDocs
        : s.componentDocs && resolveDocs?.(s.componentDocs);
    // A moduleDocs() of the component's own module is the description again.
    if (docs && docs.trim() !== entry.description.trim())
      out.push(normalizeHeadings(docs), '');
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
      ? s.stories.map((st) =>
          storyItem(
            st.name,
            storyPageUrl(channel, s.title!, st.exportName),
            st.doc
          )
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
