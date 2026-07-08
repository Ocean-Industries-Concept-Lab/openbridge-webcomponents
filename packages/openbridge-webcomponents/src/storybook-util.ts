import './icons/icon-placeholder.js';
import './icons/icon-search.js';
import './icons/icon-radar-iec.js';
import './icons/icon-palette-day.js';
import './icons/icon-display-brilliance-low.js';
import './icons/icon-display-brilliance-proposal.js';
import './icons/icon-close-google.js';
import './icons/icon-ship.js';
import {HTMLTemplateResult, TemplateResult, html} from 'lit';
import {spread} from '@open-wc/lit-helpers';

export const iconIds = [
  'placeholder',
  'search',
  'display-brilliance-low',
  'display-brilliance-proposal',
  'radar-iec',
  'palette-day',
  'ship',
  'close-google',
].sort();

export function iconIdToIconHtml(
  id: string,
  attributes: Record<string, string> = {}
): TemplateResult {
  switch (id) {
    case 'placeholder':
      return html`<obi-placeholder ${spread(attributes)}></obi-placeholder>`;
    case 'search':
      return html`<obi-search ${spread(attributes)}></obi-search>`;
    case 'palette-day':
      return html`<obi-palette-day ${spread(attributes)}></obi-palette-day>`;
    case 'display-brilliance-low':
      return html`<obi-display-brilliance-low
        ${spread(attributes)}
      ></obi-display-brilliance-low>`;
    case 'display-brilliance-proposal':
      return html`<obi-display-brilliance-proposal
        ${spread(attributes)}
      ></obi-display-brilliance-proposal>`;
    case 'radar-iec':
      return html`<obi-radar-iec ${spread(attributes)}></obi-radar-iec>`;
    case 'ship':
      return html`<obi-ship ${spread(attributes)}></obi-ship>`;
    case 'close-google':
      return html`<obi-close-google ${spread(attributes)}></obi-close-google>`;
    default:
      throw new Error(`Unknown icon id: ${id}`);
  }
}

export function crossDecorator(
  story: () => unknown,
  context: {globals?: {cross?: boolean} | Record<string, unknown>}
): HTMLTemplateResult {
  const cross = (context.globals as {cross?: boolean})?.cross ?? false;
  return html` <style>
      .wrapper {
        width: 100%;
        height: 100vh;
        position: relative;
      }

      .wrapper > * {
        position: absolute;
        top: 50%;
        left: 50%;
      }

      .wrapper.cross::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        left: calc(50% - 0.5px);
        background-color: rgb(0, 0, 0, 0.3);
      }

      .wrapper.cross::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        top: calc(50% - 0.5px);
        background-color: rgb(0, 0, 0, 0.3);
        z-index: -100;
      }
    </style>
    <div class="wrapper ${cross ? 'cross' : ''}">${story()}</div>`;
}

export function widthDecorator(
  story: () => unknown,
  context: {args: {width?: number; height?: number}}
): HTMLTemplateResult {
  // Stories that manage their own container (e.g. user-resizable sizing
  // playgrounds) opt out with `parameters: {widthDecorator: false}` — the
  // fixed-size overflow:auto wrapper would fence in their resize handle.
  // (Read via a cast so the signature stays assignable to Storybook's
  // DecoratorFunction for every Meta typing in the repo.)
  const parameters = (context as {parameters?: {widthDecorator?: boolean}})
    .parameters;
  if (parameters?.widthDecorator === false) {
    return html`${story()}`;
  }
  const width = context.args.width ?? 300;
  const height = context.args.height ?? width;
  return html` <div
    class="wrapper"
    style="width: ${width}px; height: ${height}px; overflow: auto;"
  >
    ${story()}
  </div>`;
}

/**
 * User-resizable container for sizing-playground stories: drag the
 * bottom-right corner and watch the content adapt. CSS `resize` only works
 * with a non-visible `overflow`, hence `overflow: auto` on the box itself.
 */
export function resizableStoryBox(
  content: unknown,
  {width = 560, height = 320}: {width?: number; height?: number} = {}
): HTMLTemplateResult {
  return html`<div
    style="resize: both; overflow: auto; border: 1px dashed var(--instrument-frame-tertiary-color, gray); width: ${width}px; height: ${height}px; display: flex; gap: 8px; align-items: stretch;"
  >
    ${content}
  </div>`;
}

/**
 * One captioned column inside a sizing-playground flex row. A `pinned`
 * instrument sets its own intrinsic size (faceDiameter), so its column
 * shrink-wraps; an adaptive one gets an equal share of the remaining space.
 */
export function playgroundColumn(
  caption: string,
  content: unknown,
  {pinned = false}: {pinned?: boolean} = {}
): HTMLTemplateResult {
  return html`<div
    style="flex: ${pinned
      ? '0 0 auto'
      : '1 1 0'}; min-width: 0; display: flex; flex-direction: column; gap: 2px;"
  >
    <span
      style="flex: 0 0 auto; font-family: var(--font-family-main, sans-serif); font-size: 11px; color: var(--instrument-frame-secondary-color, gray); white-space: nowrap;"
    >
      ${caption}
    </span>
    <div style="flex: 1 1 0; min-height: 0;">${content}</div>
  </div>`;
}

/** Short explanatory line rendered above a sizing-playground box. */
export function storyHint(text: string): HTMLTemplateResult {
  return html`<p
    style="max-width: 70ch; margin: 0 0 8px; font-family: var(--font-family-main, sans-serif); font-size: 12px; color: var(--instrument-frame-secondary-color, gray);"
  >
    ${text}
  </p>`;
}
