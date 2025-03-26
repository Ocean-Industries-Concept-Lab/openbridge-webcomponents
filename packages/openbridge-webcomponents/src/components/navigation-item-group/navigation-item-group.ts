import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import compentStyle from './navigation-item-group.css?inline';
import {ObcNavigationMenuVariant} from '../navigation-menu/navigation-menu';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-navigation-item-group')
export class ObcNavigationItemGroup extends LitElement {
  @property({type: String}) label = 'Label';
  @property({type: String}) href: string | undefined;
  @property({type: Boolean}) checked = false;
  @property({type: String}) variant: ObcNavigationMenuVariant =
    ObcNavigationMenuVariant.Full;
  @property({type: Boolean}) hug = false;

  @state() private openContainer = false;

  private onClickGroup() {
    if (this.openContainer) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    const groupItem = this.shadowRoot?.getElementById(
      'flyout-wrapper'
    ) as HTMLDialogElement;
    this.openContainer = true;
    groupItem.show();
    this.dispatchEvent(new CustomEvent('open'));
  }

  close() {
    const groupItem = this.shadowRoot?.getElementById(
      'flyout-wrapper'
    ) as HTMLDialogElement;
    this.openContainer = false;
    groupItem.close();
    this.querySelectorAll('obc-navigation-item-group').forEach((item) => {
      item.close();
    });
  }

  override render() {
    return html`
      <obc-navigation-item
        @click=${this.onClickGroup}
        .checked=${this.checked}
        .groupSelected=${this.openContainer}
        .href=${this.href}
        .label=${this.label}
        .variant=${this.variant}
        group
        id="group-item"
      >
        <slot name="icon" slot="icon"></slot>
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
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-item-group': ObcNavigationItemGroup;
  }
}
