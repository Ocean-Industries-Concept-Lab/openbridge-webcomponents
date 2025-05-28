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
  'close-google'
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
  context: {globals: {cross: boolean}}
): HTMLTemplateResult {
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
    <div class="wrapper ${context.globals.cross ? 'cross' : ''}">
      ${story()}
    </div>`;
}

export function widthDecorator(
  story: () => unknown,
  context: {args: {width: number; height?: number}}
): HTMLTemplateResult {
  const width = context.args.width;
  const height = context.args.height ?? width;
  return html` <div
    class="wrapper"
    style="width: ${width}px; height: ${height}px"
  >
    ${story()}
  </div>`;
}
