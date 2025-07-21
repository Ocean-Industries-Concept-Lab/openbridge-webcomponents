import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './navigation-item-group.css?inline';
import {ObcNavigationMenuVariant} from '../navigation-menu/navigation-menu.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

@customElement('obc-navigation-item-group')
export class ObcNavigationItemGroup extends LitElement {
  @property({type: String}) label = 'Label';
  @property({type: String}) href: string | undefined;
  @property({type: Boolean}) checked = false;
  @property({type: String}) variant: ObcNavigationMenuVariant =
    ObcNavigationMenuVariant.Full;
  @property({type: Boolean}) hug = false;

  @state() private openContainer = false;
  @state() private _iconNode: Element | null = null;

  private onClickGroup() {
    if (this.openContainer) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.openContainer = true;
    this.dispatchEvent(new CustomEvent('open'));
  }

  close() {
    this.openContainer = false;
    this.querySelectorAll('obc-navigation-item-group').forEach((item) => {
      item.close();
    });
  }

  override firstUpdated() {
    // Find the hidden icon slot
    const iconSlot = this.shadowRoot?.getElementById(
      '__groupIconSlot'
    ) as HTMLSlotElement;
    if (iconSlot) {
      iconSlot.addEventListener('slotchange', () =>
        this._updateIconNode(iconSlot)
      );
      this._updateIconNode(iconSlot);
    }
  }

  private _updateIconNode(iconSlot: HTMLSlotElement) {
    // Only pick the first assigned element in the icon slot
    const nodes = iconSlot.assignedElements({flatten: true});
    this._iconNode = nodes.length ? nodes[0] : null;
    this.requestUpdate();
  }

  private _cloneWithIconSlot(node: Element): Element {
    const clone = node.cloneNode(true) as Element;
    clone.setAttribute('slot', 'icon');
    return clone;
  }

  override render() {
    return html`
      <!-- Hidden icon slot just for picking up the icon for the group label -->
      <slot name="icon" id="__groupIconSlot" style="display:none"></slot>
      <!-- The group label as a navigation item -->
      <obc-navigation-item
        @click=${this.onClickGroup}
        .checked=${this.checked}
        .groupSelected=${this.openContainer}
        .href=${this.href}
        .label=${this.label}
        .variant=${this.variant}
        group
        id="group-item"
        ?hasIcon=${!!this._iconNode}
      >
        ${this._iconNode
          ? html`${this._cloneWithIconSlot(this._iconNode)}`
          : nothing}
      </obc-navigation-item>
      <div
        part="flyout"
        id="flyout-wrapper"
        class=${classMap({
          hug: this.hug,
          [this.variant]: true,
          open: this.openContainer,
        })}
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <div
        class=${classMap({
          shadow: true,
          open: this.openContainer,
          hug: this.hug,
        })}
      ></div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-item-group': ObcNavigationItemGroup;
  }
}
