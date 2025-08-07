import {HTMLTemplateResult, LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './test.css?inline';
import {property} from 'lit/decorators.js';

@customElement('obc-test')
export class ObcTest extends LitElement {
  @property({type: Array}) data: {[key: string]: {value: string}}[] = [];
  @property({type: Array}) columns: {
    label?: string;
    key: string;
    renderCell?: (
      value: unknown,
      row: {[key: string]: {value: string}},
      rowIndex: number
    ) => HTMLTemplateResult;
  }[] = [];

  override render() {
    return html`
      <div class="grid-container">
        <div class="grid-header">
          ${this.columns.map(
            (col) =>
              html`<div class="grid-header-cell">${col.label ?? col.key}</div>`
          )}
        </div>
        <div class="grid-body">
          ${this.data.map(
            (row, rowIndex) => html`
              <div class="grid-row">
                ${this.columns.map((col) => {
                  const value = row[col.key];
                  return html`
                    <div class="grid-cell">
                      ${col.renderCell
                        ? col.renderCell(value, row, rowIndex)
                        : (value ?? nothing)}
                    </div>
                  `;
                })}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-test': ObcTest;
  }
}
