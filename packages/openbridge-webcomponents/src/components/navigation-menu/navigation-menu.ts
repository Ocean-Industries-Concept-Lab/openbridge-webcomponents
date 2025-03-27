import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './navigation-menu.css?inline';
import {ObcNavigationItemGroup} from '../navigation-item-group/navigation-item-group';
import {ObcNavigationItem} from '../navigation-item/navigation-item';

export enum ObcNavigationMenuVariant {
  Full = 'full',
  IconOnly = 'icon-only', // Should only be used when no flyouts are present in the navigation menu
  IconOnlyLarge = 'icon-only-large', // Should be used when flyouts are present in the navigation menu
  Compact = 'compact',
}

@customElement('obc-navigation-menu')
export class ObcNavigationMenu extends LitElement {
  @property({type: String}) variant: ObcNavigationMenuVariant =
    ObcNavigationMenuVariant.Full;

  findAllElements<T extends Element>(
    el: Element,
    tag: string,
    stopTag?: string
  ): T[] {
    const elements: T[] = [];
    for (const child of el.children) {
      if (child.tagName.toLowerCase() === tag) {
        elements.push(child as T);
      } else if (stopTag && child.tagName.toLowerCase() === stopTag) {
        continue;
      } else {
        elements.push(...this.findAllElements<T>(child, tag, stopTag));
      }
    }
    return elements;
  }

  findAllGroups(el: Element): ObcNavigationItemGroup[] {
    // Find all groups that are not in a group
    return this.findAllElements<ObcNavigationItemGroup>(
      el,
      'obc-navigation-item-group'
    );
  }

  findAllItems(el: Element): ObcNavigationItem[] {
    // Find all items that are not in a group or in an item
    return this.findAllElements<ObcNavigationItem>(
      el,
      'obc-navigation-item',
      'obc-navigation-item-group'
    );
  }

  registerGroup(groups: ObcNavigationItemGroup[]) {
    groups.forEach((group) => {
      group.addEventListener('open', () => {
        groups.forEach((g) => {
          if (g !== group) {
            g.close();
          }
        });
      });
      const subGroups = this.findAllGroups(group);
      this.registerGroup(subGroups);
    });
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    const groups = this.findAllGroups(this);
    this.registerGroup(groups);
  }

  protected override updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has('variant')) {
      this.setVariantToItems();
    }
  }

  private handleSlotChange() {
    this.setVariantToItems();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('slotchange', this.handleSlotChange);
  }

  override disconnectedCallback() {
    this.removeEventListener('slotchange', this.handleSlotChange);
    super.disconnectedCallback();
  }

  private setVariantToItems() {
    const groups = this.findAllGroups(this);
    groups.forEach((group) => {
      group.variant = this.variant;
    });
    const items = this.findAllItems(this);
    items.forEach((item) => {
      item.variant = this.variant;
    });
  }

  override render() {
    return html`
      <div class="wrapper ${this.variant}">
        <nav class="main">
          <ol>
            <slot name="main"></slot>
          </ol>
        </nav>
        <div class="footer">
          <nav>
            <ol>
              <slot name="footer"></slot>
            </ol>
          </nav>
          ${this.variant === ObcNavigationMenuVariant.Full
            ? html`<div class="logo">
                <slot name="logo"></slot>
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-menu': ObcNavigationMenu;
  }
}
