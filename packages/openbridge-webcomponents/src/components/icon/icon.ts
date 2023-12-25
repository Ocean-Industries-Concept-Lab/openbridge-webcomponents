import {LitElement} from 'lit';
import {html, unsafeStatic} from 'lit/static-html.js';

import {customElement, property} from 'lit/decorators.js';
import '../../icons';

@customElement('obc-icon')
export class Icon extends LitElement {
  @property({type: String}) icon = '01-placeholder';
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  override render() {
    const tag = unsafeStatic(`obi-${this.icon}`);
    return html`
      <${tag} size=${this.size} ?use-css-color=${this.useCssColor}>
      </${tag}>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-icon': Icon;
  }
}
