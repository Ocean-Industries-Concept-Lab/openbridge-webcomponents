import './icons/icon-01-placeholder';
import './icons/icon-01-search';
import './icons/icon-06-radar';
import './icons/icon-04-day';
import './icons/icon-04-brilliance-low';
import './icons/icon-04-brilliance-high';
import './icons/icon-06-ship';
import {HTMLTemplateResult, TemplateResult, html} from 'lit';
import {spread} from '@open-wc/lit-helpers';

export const iconIds = [
  '01-placeholder',
  '01-search',
  '04-brilliance-low',
  '04-brilliance-high',
  '06-radar',
  '04-day',
  '06-ship',
].sort();

export function iconIdToIconHtml(
  id: string,
  attributes: Record<string, string> = {}
): TemplateResult {
  switch (id) {
    case '01-placeholder':
      return html`<obi-01-placeholder
        ${spread(attributes)}
      ></obi-01-placeholder>`;
    case '01-search':
      return html`<obi-01-search ${spread(attributes)}></obi-01-search>`;
    case '04-day':
      return html`<obi-04-day ${spread(attributes)}></obi-04-day>`;
    case '04-brilliance-low':
      return html`<obi-04-brilliance-low
        ${spread(attributes)}
      ></obi-04-brilliance-low>`;
    case '04-brilliance-high':
      return html`<obi-04-brilliance-high
        ${spread(attributes)}
      ></obi-04-brilliance-high>`;
    case '06-radar':
      return html`<obi-06-radar ${spread(attributes)}></obi-06-radar>`;
    case '06-ship':
      return html`<obi-06-ship ${spread(attributes)}></obi-06-ship>`;
    default:
      throw new Error(`Unknown icon id: ${id}`);
  }
}

export function crossDecorator(story: () => unknown): HTMLTemplateResult {
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

      .wrapper::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        left: calc(50% - 0.5px);
        background-color: rgb(0, 0, 0, 0.3);
      }

      .wrapper::after {
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
    <div class="wrapper">${story()}</div>`;
}

export function widthDecorator(
  story: () => unknown,
  context: {args: {width: number}}
): HTMLTemplateResult {
  return html` <div
    class="wrapper"
    style="width: ${context.args.width}px; height: ${context.args.width}px"
  >
    ${story()}
  </div>`;
}


export function beta6Decorator(
  story: () => unknown
): HTMLTemplateResult {
  return html` <div style="
  border-radius: 100px; 
  background-color: var(--instrument-enhanced-primary-color); 
  color: var(--instrument-frame-primary-color); 
  height: 32px; 
  padding: 0 24px; 
  box-sizing: border-box; 
  width: fit-content; 
  display: grid; 
  place-content: center;
  font-family: 'Noto Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 570;
  line-height: 24px; /* 150% */
  margin-bottom: 64px;
">Beta 6.0</div>
    ${story()}
  `;
}