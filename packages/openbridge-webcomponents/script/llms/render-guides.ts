import type {Channel} from './channel.js';
import {normalizeHeadings} from './render-component.js';
import {
  docsPageUrl,
  storyPageUrl,
  type DocsRef,
  type StoriesInfo,
} from './stories.js';

/** A stories file that documents a module rather than one element (Setpoint, External Scale, Advice). */
export function isModuleGuide(info: StoriesInfo): boolean {
  return (
    info.title !== undefined &&
    info.componentTag === undefined &&
    info.componentDocs !== undefined
  );
}

export function renderStoriesGuide(
  info: StoriesInfo,
  channel: Channel,
  resolveDocs: (ref: DocsRef) => string | undefined
): string {
  const title = info.title!;
  const docs =
    typeof info.componentDocs === 'string'
      ? info.componentDocs
      : info.componentDocs && resolveDocs(info.componentDocs);
  const out = [
    `# ${title.split('/').pop()}`,
    '',
    `[Storybook](${docsPageUrl(channel, title)})`,
    '',
  ];
  if (docs) out.push(normalizeHeadings(docs.trim()), '');
  if (info.stories.length) {
    out.push(
      '## Stories',
      '',
      ...info.stories.map(
        (st) =>
          `- [${st.name}](${storyPageUrl(channel, title, st.name)})${st.doc ? `: ${st.doc}` : ''}`
      ),
      ''
    );
  }
  return out.join('\n').replace(/\n+$/, '\n');
}
