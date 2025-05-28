import {customElement, property} from 'lit/decorators.js';
import {unsafeStatic, html} from 'lit/static-html.js';
import {nothing, LitElement} from 'lit';
import {iconIds} from './names.js';

@customElement('obi-icon')
export class ObiIcon extends LitElement {
  @property({type: String})
  icon: string | undefined;

  @property({type: Boolean})
  useCssColor: boolean = false;

  override render() {
    if (!this.icon) {
      return nothing;
    }
    if (iconIds[this.icon]) {
      const tag = unsafeStatic(`obi-${this.icon}`);
      return html`<${tag} ?useCssColor=${this.useCssColor}></${tag}>`;
    }
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-icon': ObiIcon;
  }
}
