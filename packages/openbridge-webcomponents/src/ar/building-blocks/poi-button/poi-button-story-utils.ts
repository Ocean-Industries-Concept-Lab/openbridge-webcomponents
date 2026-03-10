import {html, TemplateResult} from 'lit';

export const canvasStyle =
  'transform: translate(-50%, -50%); width: min(1100px, 92vw); max-height: 88vh; overflow: auto; padding: 8px 12px 24px;';
export const sectionStyle = 'margin-bottom: 24px;';
export const gridStyle =
  'display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 14px 16px; align-items: start;';
export const itemStyle =
  'display: flex; flex-direction: column; align-items: center; gap: 8px;';
export const stageStyle = 'position: relative; width: 140px; height: 130px;';
export const stageTallStyle =
  'position: relative; width: 180px; height: 220px;';
export const buttonAnchorStyle =
  'position: absolute; left: 50%; bottom: 0;';
export const labelStyle =
  'font-size: 11px; line-height: 1.2; text-align: center; font-family: sans-serif;';

export function renderOverview(content: TemplateResult) {
  return html`<div style=${canvasStyle}>${content}</div>`;
}
