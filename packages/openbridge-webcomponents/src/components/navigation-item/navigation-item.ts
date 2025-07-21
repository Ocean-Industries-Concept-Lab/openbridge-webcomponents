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
  @property({type: Boolean, reflect: true}) hasIcon = false;

  override firstUpdated() {
    this.updateIconState();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    this.updateIconState();
  }

  private updateIconState() {
    const iconSlot = this.shadowRoot?.querySelector(
      'slot[name="icon"]'
    ) as HTMLSlotElement;
    if (iconSlot) {
      this.hasIcon = iconSlot.assignedElements().length > 0;
    }
  }

  private onSlotChange() {
    this.updateIconState();
  }

  onClick() {
    dispatchEvent(new CustomEvent('click'));
  }

  override render() {
    const showFlyout =
      this.group && this.variant !== ObcNavigationMenuVariant.IconOnly;
    const isCompact = this.variant === ObcNavigationMenuVariant.Compact;

    return html`
      <a
        class="${classMap({
          wrapper: true,
          checked: this.checked,
          'group-selected': this.groupSelected && this.group,
          'has-icon': this.hasIcon,
          [this.variant]: true,
        })}"
        href="${ifDefined(this.href)}"
        @click=${this.onClick}
      >
        <div class="visible-wrapper">
          ${this.hasIcon
            ? html`<slot
                name="icon"
                class="icon leading"
                @slotchange=${this.onSlotChange}
              ></slot>`
            : nothing}
          ${![
            ObcNavigationMenuVariant.IconOnly,
            ObcNavigationMenuVariant.IconOnlyLarge,
          ].includes(this.variant)
            ? html`
                <span
                  class=${classMap({
                    label: true,
                    'label-flyout': showFlyout && !isCompact,
                  })}
                >
                  ${this.label}
                </span>
              `
            : nothing}
          ${showFlyout
            ? html`
                <div class="flyout-wrapper">
                  <obi-arrow-flyout-google
                    class="icon trailing"
                  ></obi-arrow-flyout-google>
                </div>
              `
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
