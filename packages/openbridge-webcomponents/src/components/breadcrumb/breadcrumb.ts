import { LitElement, unsafeCSS, html, } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./breadcrumb.css?inline";
import "../icon/icon";

export interface BreadcrumbItem {
  label: string;
}

@customElement('ob-breadcrumb')
export class Breadcrumb extends LitElement {
  @property({ type: Array<Breadcrumb> }) items = [] as BreadcrumbItem[];

  render() {
    return html`
    <nav aria-label="Breadcrumb" class="breadcrumb">
    <ol>
    ${this.items.map((item, i) => html`
      <li>
          
          ${i > 0 ? html`<span class="icon"><ob-icon icon="02-chevron-right" class="divider"></ob-icon></span>` : ''}
          <span class="label">${item.label}</span>
      </li>
      `)}
    </ol>
  </nav>
    `
  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-breadcrumb': Breadcrumb

  }
}
