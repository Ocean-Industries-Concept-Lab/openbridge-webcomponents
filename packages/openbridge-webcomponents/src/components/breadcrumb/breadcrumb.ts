import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './breadcrumb.css?inline';
import '../../icons/icon-02-chevron-right';

export interface BreadcrumbItem {
  label: string;
}

@customElement('obc-breadcrumb')
export class ObcBreadcrumb extends LitElement {
  @property({attribute: false}) items = [] as BreadcrumbItem[];

  override render() {
    return html`
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <ol>
          ${this.items.map(
            (item, i) => html`
              <li>
                ${i > 0
                  ? html`<span class="icon">
                      <obi-02-chevron-right class="divider">
                      </obi-02-chevron-right>
                    </span>`
                  : ''}
                <span class="label">${item.label}</span>
              </li>
            `
          )}
        </ol>
      </nav>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-breadcrumb': ObcBreadcrumb;
  }
}
