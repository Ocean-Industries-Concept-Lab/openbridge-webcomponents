import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './navigation-menu.css?inline';
import {ObcNavigationItemGroup} from '../navigation-item-group/navigation-item-group.js';
import {ObcNavigationItem} from '../navigation-item/navigation-item.js';
import {customElement} from '../../decorator.js';

/**
 * `ObcNavigationMenuVariant` – Enumerates the available visual and behavioral variants for `<obc-navigation-menu>`.
 *
 * - `Full`: Standard navigation menu with both icons and labels.
 * - `IconOnly`: Compact menu showing only icons (should only be used when no flyouts/submenus are present).
 * - `IconOnlyLarge`: Icon-only menu variant designed for use when flyouts/submenus are present.
 * - `Compact`: Space-saving menu with reduced padding and layout.
 *
 * Use these variants to adapt the navigation menu to different layouts or device sizes.
 */
export enum ObcNavigationMenuVariant {
  Full = 'full',
  IconOnly = 'icon-only', // Should only be used when no flyouts are present in the navigation menu
  IconOnlyLarge = 'icon-only-large', // Should be used when flyouts are present in the navigation menu
  Compact = 'compact',
}

/**
 * `<obc-navigation-menu>` – A flexible, slot-based navigation menu component for organizing primary and secondary navigation items.
 *
 * This component provides a vertical navigation structure supporting groups, flyouts, and footer sections. It adapts to various layouts and device sizes via its `variant` and `smallScreen` properties. Items and groups are provided via slots, allowing for icons, labels, and nested navigation hierarchies.
 *
 * Appears as a sidebar or persistent navigation panel, supporting both icon-only and full-label modes. Designed for use as the main navigation in applications, dashboards, or any interface requiring structured navigation.
 *
 * ## Features
 *
 * - **Variants:**  
 *   - **Full:** Displays both icons and labels for all navigation items (default).
 *   - **IconOnly:** Shows only icons for a compact appearance. *Should only be used when no navigation items have sub-items or flyouts.*
 *   - **IconOnlyLarge:** Icon-only mode that supports flyouts/submenus. Use when navigation contains groups or nested items.
 *   - **Compact:** Reduces padding and overall width for a space-saving layout.
 * - **Responsive Layout:**  
 *   - `smallScreen` property adapts the footer and logo layout for smaller viewports.
 * - **Slot-based Content:**  
 *   - `main` slot for primary navigation items and groups.
 *   - `footer` slot for secondary actions or links.
 *   - `logo` slot for branding or logo placement (position adapts based on variant and screen size).
 * - **Nested Navigation:**  
 *   - Supports nested groups and flyouts via `<obc-navigation-item-group>`.
 * - **Automatic Variant Propagation:**  
 *   - Child items and groups automatically receive the correct variant for consistent appearance.
 * - **Dynamic Content Handling:**  
 *   - Reacts to dynamic addition/removal of items and groups, updating layout and variants as needed.
 * - **Interaction:**  
 *   - Clicking a navigation item closes all open groups/flyouts for streamlined navigation.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-navigation-menu>` as the main navigation container in your application layout. Place navigation items and groups in the `main` slot for primary navigation, and use the `footer` slot for secondary actions (such as settings or help). The `logo` slot is intended for branding and is positioned according to the selected variant and screen size.
 *
 * - Use the `Full` variant for standard navigation with both icons and labels.
 * - Use `IconOnly` only when there are no nested groups or flyouts; otherwise, use `IconOnlyLarge` for icon-only navigation with flyout support.
 * - The `Compact` variant is suitable for layouts with limited space or when a minimal navigation appearance is desired.
 * - Set `smallScreen` to `true` to optimize the layout for smaller devices or responsive breakpoints.
 *
 * **TODO(designer):** Provide additional guidance on when to use each variant and recommended slot content for best usability.
 *
 * ## Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|----------------|---------|
 * | main      | Always         | Primary navigation items and groups. |
 * | footer    | Always         | Secondary navigation items (e.g., settings, help). |
 * | logo      | Always         | Branding/logo area (position varies by variant and screen size). |
 *
 * Place `<obc-navigation-item>`, `<obc-navigation-item-group>`, or other suitable elements in these slots. For icons, use `<obi-placeholder>`, `<obi-applications>`, or other OpenBridge icon components in the `icon` slot of each navigation item.
 *
 * ## Properties
 *
 * - `variant` (`ObcNavigationMenuVariant`): Controls the visual style and layout of the menu. Default is `Full`.
 * - `smallScreen` (`boolean`): When `true`, adapts the layout for small screens (e.g., moves logo into the footer area).
 *
 * ## Best Practices and Constraints
 *
 * - Only use the `IconOnly` variant when there are no navigation items with sub-items or flyouts. Use `IconOnlyLarge` if your navigation includes groups or nested items.
 * - Place only navigation-related components in the `main` and `footer` slots for clarity and accessibility.
 * - For best accessibility, ensure each navigation item has a clear label and, if using icons, a suitable `aria-label` or accessible name.
 * - Avoid placing interactive elements other than navigation items/groups in the `main` or `footer` slots.
 *
 * ## Example
 *
 * ```html
 * <obc-navigation-menu variant="full">
 *   <obc-navigation-item-group slot="main" label="Apps">
 *     <obi-applications slot="icon"></obi-applications>
 *     <obc-navigation-item label="Sub item 1" hasIcon href="#">
 *       <obi-placeholder slot="icon"></obi-placeholder>
 *     </obc-navigation-item>
 *   </obc-navigation-item-group>
 *   <obc-navigation-item slot="footer" label="Settings" hasIcon href="#">
 *     <obi-settings-iec slot="icon"></obi-settings-iec>
 *   </obc-navigation-item>
 *   <obc-vendor-button imageSrc="/companylogo-day.png" alt="logo" slot="logo"></obc-vendor-button>
 * </obc-navigation-menu>
 * ```
 *
 * In this example, the menu displays a group with sub-items in the main navigation, several footer actions, and a logo.
 *
 * @slot main - Slot for primary navigation items and groups.
 * @slot footer - Slot for secondary navigation items (e.g., settings, help).
 * @slot logo - Slot for branding/logo area.
 */
@customElement('obc-navigation-menu')
export class ObcNavigationMenu extends LitElement {
  /**
   * Controls the visual style and layout of the navigation menu.
   *
   * - `full`: Standard menu with icons and labels (default).
   * - `icon-only`: Compact, icon-only menu (use only when no flyouts/groups are present).
   * - `icon-only-large`: Icon-only menu supporting flyouts/groups.
   * - `compact`: Minimal, space-saving menu.
   */
  @property({type: String}) variant: ObcNavigationMenuVariant =
    ObcNavigationMenuVariant.Full;

  /**
   * When `true`, adapts the layout for small screens (e.g., moves logo into the footer area and adjusts item layout).
   */
  @property({type: Boolean}) smallScreen = false;

  private slotObservers: MutationObserver[] = [];

  findAllElements<T extends Element>(
    el: Element,
    tag: string,
    {
      slot,
      stopTag,
    }: {
      slot?: 'main' | 'footer' | 'logo';
      stopTag?: string;
    } = {}
  ): T[] {
    const elements: T[] = [];
    for (const child of el.children) {
      if (child.tagName.toLowerCase() === tag) {
        if (slot && child.getAttribute('slot') !== slot) {
          continue;
        }
        elements.push(child as T);
      } else if (stopTag && child.tagName.toLowerCase() === stopTag) {
        continue;
      } else {
        if (slot && child.getAttribute('slot') !== slot) {
          continue;
        }
        elements.push(...this.findAllElements<T>(child, tag, {stopTag}));
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
    return this.findAllElements<ObcNavigationItem>(el, 'obc-navigation-item', {
      stopTag: 'obc-navigation-item-group',
    });
  }

  findAllItems(
    el: Element,
    slot?: 'main' | 'footer' | 'logo'
  ): ObcNavigationItem[] {
    return this.findAllElements<ObcNavigationItem>(el, 'obc-navigation-item', {
      slot,
    });
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

  private cleanupSlotObservers() {
    this.slotObservers.forEach((observer) => observer.disconnect());
    this.slotObservers = [];
  }

  private setupSlotObservers() {
    this.cleanupSlotObservers();

    const mainSlot = this.shadowRoot?.querySelector(
      'slot[name="main"]'
    ) as HTMLSlotElement;
    const footerSlot = this.shadowRoot?.querySelector(
      'slot[name="footer"]'
    ) as HTMLSlotElement;

    [mainSlot, footerSlot].forEach((slot) => {
      if (slot) {
        const slottedElements = slot.assignedElements();
        slottedElements.forEach((element) => {
          const observer = new MutationObserver(() => {
            this.setupItems();
          });

          observer.observe(element, {
            childList: true,
            subtree: true,
          });

          this.slotObservers.push(observer);
        });
      }
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

  // Recursively set variant for children of groups
  private setVariantToFlyoutItems(el: Element) {
    // Find all descendant items inside this element (not direct children of the nav menu)
    const items = this.findAllElements<ObcNavigationItem>(
      el,
      'obc-navigation-item'
    );
    items.forEach((item) => {
      item.variant = ObcNavigationMenuVariant.Full;
    });

    const groups = this.findAllGroups(el);
    groups.forEach((group) => {
      group.variant = ObcNavigationMenuVariant.Full;
      this.setVariantToFlyoutItems(group);
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.cleanupSlotObservers();
  }

  private handleSlotChange() {
    this.setupItems();
    this.setupSlotObservers();
  }

  private setupItems() {
    const hug = this.variant !== ObcNavigationMenuVariant.Full;
    this.setHugToGroups(this, hug);

    // Set variant to all groups (top-level)
    const groups = this.findAllGroups(this);
    groups.forEach((group) => {
      group.variant = this.variant;
      // But for flyout children, force variant to full
      this.setVariantToFlyoutItems(group);
    });

    // Set variant to all root items (not in group)
    this.findRootItems(this).forEach((item) => {
      item.variant = this.variant;
    });

    // Footer and logo logic (same as before)
    const footerVariant =
      this.smallScreen && this.variant === ObcNavigationMenuVariant.Full
        ? ObcNavigationMenuVariant.Compact
        : this.variant;
    this.findAllItems(this, 'footer').forEach((item) => {
      item.variant = footerVariant;
    });
    this.findAllItems(this, 'logo').forEach((item) => {
      item.variant = footerVariant;
    });

    // Close all groups on item click (unchanged)
    this.findAllItems(this).forEach((item) => {
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
      <div
        class="wrapper ${this.variant} ${this.smallScreen
          ? 'small-screen'
          : ''}"
      >
        <nav class="main">
          <ol>
            <slot name="main" @slotchange=${this.handleSlotChange}></slot>
          </ol>
        </nav>
        <div class="footer">
          <nav>
            <ol>
              <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
              ${this.smallScreen ? html` <slot name="logo"></slot> ` : nothing}
            </ol>
          </nav>
          ${this.smallScreen
            ? nothing
            : html`
                <div class="logo">
                  <slot name="logo"></slot>
                </div>
              `}
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
