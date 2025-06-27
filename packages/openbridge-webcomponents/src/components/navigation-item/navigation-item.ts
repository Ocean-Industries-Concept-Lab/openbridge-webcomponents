import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './navigation-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../../icons/icon-arrow-flyout-google.js';

import {ObcNavigationMenuVariant} from '../navigation-menu/navigation-menu.js';
import {customElement} from '../../decorator.js';

@customElement('obc-navigation-item')
export class ObcNavigationItem extends LitElement {
  @property({type: String}) label = 'Label';
  @property({type: String}) href: string | undefined;
  @property({type: Boolean}) checked = false;
  @property({type: String}) variant = ObcNavigationMenuVariant.Full;
  @property({type: Boolean}) group = false;
  @property({type: Boolean}) groupSelected = false;

  onClick() {
    dispatchEvent(new CustomEvent('click'));
  }

  override render() {
    return html`
      <a
        class="${classMap({
          wrapper: true,
          checked: this.checked,
          'group-selected': this.groupSelected && this.group,
          [this.variant]: true,
        })}"
        href="${ifDefined(this.href)}"
        @click=${this.onClick}
      >
        <div class="visible-wrapper">
          <slot name="icon" class="icon leading"></slot>
          ${![
            ObcNavigationMenuVariant.IconOnly,
            ObcNavigationMenuVariant.IconOnlyLarge,
          ].includes(this.variant)
            ? html`<span class="label"> ${this.label} </span>`
            : nothing}
          ${this.group && this.variant !== ObcNavigationMenuVariant.IconOnly
            ? html` <div class="flyout-wrapper">
                <obi-arrow-flyout-google
                  class="icon trailing"
                ></obi-arrow-flyout-google>
              </div>`
            : nothing}
        </div>
      </a>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-item': ObcNavigationItem;
  }
}
