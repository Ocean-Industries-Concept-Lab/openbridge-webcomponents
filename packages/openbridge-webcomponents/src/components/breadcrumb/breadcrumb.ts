import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './breadcrumb.style';
import '../../icons/icon-02-chevron-right';

export interface BreadcrumbItem {
  label: string;
}

@customElement('obc-breadcrumb')
export class Breadcrumb extends LitElement {
  @property({attribute: false}) items = [] as BreadcrumbItem[];

  override render() {
    return html`
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <ol>
          ${this.items.map(
            (item, i) => html`
              <li>
                ${i > 0
                  ? html`<span class="icon"
                      >
                      <obi-02-chevron-right
                        class="divider"
                      ></obc-icon
                    ></span>`
                  : ''}
                <span class="label">${item.label}</span>
              </li>
            `
          )}
        </ol>
      </nav>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-breadcrumb': Breadcrumb;
  }
}
