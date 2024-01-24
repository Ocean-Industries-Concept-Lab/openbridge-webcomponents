import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './navigation-item.style';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

@customElement('obc-navigation-item')
export class ObcNavigationItem extends LitElement {
  @property({type: String}) label = 'Label';
  @property({type: String, }) href: string | undefined;
  @property({type: Boolean}) checked = false;

  onClick() {
    dispatchEvent(new CustomEvent('click'));
  }

  override render() {
    return html`
      <a
        class="${classMap({wrapper: true, checked: this.checked})}"
        href="${ifDefined(this.href)}"
        @click=${this.onClick}
      >
        <slot name="icon" class="icon"> </slot name="icon">
        <span class="label"> ${this.label} </span>
      </a>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-item': ObcNavigationItem;
  }
}
