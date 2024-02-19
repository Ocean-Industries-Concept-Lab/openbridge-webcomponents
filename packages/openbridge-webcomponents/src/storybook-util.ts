import './icons/icon-01-placeholder';
import './icons/icon-01-search';
import './icons/icon-06-radar';
import './icons/icon-04-day';
import './icons/icon-04-brilliance-low';
import './icons/icon-04-brilliance-high';
import './icons/icon-06-ship';
import {TemplateResult, html, unsafeCSS} from 'lit';
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
