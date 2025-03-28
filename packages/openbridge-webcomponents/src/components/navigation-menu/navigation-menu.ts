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

  findRootItems(el: Element): ObcNavigationItem[] {
    // Find all items that are not in a group or in an item
    return this.findAllElements<ObcNavigationItem>(
      el,
      'obc-navigation-item',
      'obc-navigation-item-group'
    );
  }

  findAllItems(el: Element): ObcNavigationItem[] {
    return this.findAllElements<ObcNavigationItem>(el, 'obc-navigation-item');
  }

  closeAllGroups() {
    const groups = this.findAllGroups(this);
    groups.forEach((group) => {
      group.close();
    });
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
      this.setupItems();
    }
  }

  private handleSlotChange() {
    this.setupItems();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('slotchange', this.handleSlotChange);
  }

  override disconnectedCallback() {
    this.removeEventListener('slotchange', this.handleSlotChange);
    super.disconnectedCallback();
  }

  private setupItems() {
    const hug = this.variant !== ObcNavigationMenuVariant.Full;
    this.setHugToGroups(this, hug);
    const groups = this.findAllGroups(this);
    groups.forEach((group) => {
      group.variant = this.variant;
    });
    const items = this.findRootItems(this);
    items.forEach((item) => {
      item.variant = this.variant;
    });
    const allItems = this.findAllItems(this);
    allItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.closeAllGroups();
      });
    });
  }

  private setHugToGroups(el: Element, hug: boolean) {
    const groups = this.findAllGroups(el);
    groups.forEach((group) => {
      group.hug = hug;
      this.setHugToGroups(group, hug);
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
