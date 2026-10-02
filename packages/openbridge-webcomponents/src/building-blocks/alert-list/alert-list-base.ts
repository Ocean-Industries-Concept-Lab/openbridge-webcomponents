import {
  CSSResultGroup,
  LitElement,
  PropertyValues,
  html,
  nothing,
  unsafeCSS,
} from 'lit';
import {queryAssignedElements, query, state} from 'lit/decorators.js';
import compentStyle from './alert-list.css?inline';
import '../../components/scrollbar/scrollbar.js';
import {ObcScrollbar} from '../../components/scrollbar/scrollbar.js';
import {ObcAlertMenuItem} from '../../components/alert-menu-item/alert-menu-item.js';

/** What an empty alert list shows where its `empty-*` slots are left unfilled. */
export interface AlertListEmptyFallback {
  icon?: unknown;
  title?: unknown;
}

/**
 * `ObcAlertListBase` – Scrolling list of slotted alert items that animates items
 * into place and shows an empty state when no item passes its filter.
 *
 * Not registered as an element: the subclasses decide which items pass.
 * `obc-alert-list` runs a predicate the consumer sets.
 *
 * ### Features
 * - **Filter:** `matchesFilter()` decides which items count; the list re-reads
 *   it when items are added or removed, when an item attribute named by
 *   `observedItemAttributes` changes, and when `filterChanged()` reports a
 *   change of the subclass's filter inputs.
 * - **Motion:** items that move slide to their new place; new items play
 *   their intro animation once the list has been seen.
 * - **Empty state:** icon, title and description slots, with fallback content
 *   from `emptyFallback`.
 * - **Visible items:** `getVisibleElements()` returns the items that pass the
 *   filter and sit inside the scroll viewport.
 */
export class ObcAlertListBase extends LitElement {
  private oldElementTop: Map<HTMLElement, number> = new Map();
  private mutationObserver: MutationObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private hasRenderedPanel = false;
  @state() _empty = false;

  @queryAssignedElements({flatten: true})
  protected alertItems!: HTMLElement[];

  @query('#scrollbar', true)
  private scrollbar!: ObcScrollbar;

  /** Whether the list counts an item as one it shows. */
  protected matchesFilter(_item: HTMLElement): boolean {
    return true;
  }

  /** Whether this update changed what `matchesFilter` decides. */
  protected filterChanged(_changed: PropertyValues): boolean {
    return false;
  }

  /** Item attributes whose changes can change what `matchesFilter` decides. */
  protected get observedItemAttributes(): string[] {
    return ['status', 'shelved'];
  }

  protected get emptyFallback(): AlertListEmptyFallback {
    return {};
  }

  override firstUpdated() {
    this.applyFilter();
    this.setupMutationObserver();
  }

  override connectedCallback() {
    super.connectedCallback();
    const intersectionObserver = new IntersectionObserver((entries) => {
      // If intersectionRatio is 0, the target is out of view
      if (entries[0].intersectionRatio === 0) {
        this.hasRenderedPanel = false;
      }
    });
    intersectionObserver.observe(this);
    this.intersectionObserver = intersectionObserver;

    this.setupMutationObserver();
  }

  override disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  protected override willUpdate(_changedProperties: PropertyValues): void {
    if (this.filterChanged(_changedProperties)) {
      this.applyFilter();
      this.updateOldElementTop();
    }
  }

  /** Runs whenever the items or the filter change; a subclass extends it to act on each item. */
  protected applyFilter() {
    this._empty = this.getAlertItems().length === 0;
  }

  private getAlertItems() {
    return this.alertItems.filter((item) => this.matchesFilter(item));
  }

  private updateOldElementTop() {
    const elements = this.getAlertItems();
    if (elements.length === 0) {
      return;
    }

    // Get the top of the element,
    // the element may be in an animation
    // we therefor sum the height of each element
    const firstElement = elements[0];
    const firstElementRect = firstElement.getBoundingClientRect();
    let top = firstElementRect.top;
    this.oldElementTop.clear();
    elements.forEach((element) => {
      const elementRect = element.getBoundingClientRect();
      if (elementRect.height === 0) {
        return;
      }
      this.oldElementTop.set(element, top);
      top += elementRect.height;
    });
  }

  private setupMutationObserver() {
    if (this.mutationObserver) {
      // Make a new observer to avoid memory leaks
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    this.mutationObserver = new MutationObserver(() => {
      this.handleElementsChange();
    });

    const slotElements = this.alertItems;
    slotElements.forEach((element) => {
      // Earlier observed elements are just updated, and not registered twice.
      this.mutationObserver?.observe(element, {
        attributes: true,
        attributeFilter: this.observedItemAttributes,
      });
    });
  }

  private handleSlotChange() {
    this.handleElementsChange();
    this.setupMutationObserver();
  }

  private handleElementsChange() {
    // Take records to ensure the observer is not triggered again
    this.mutationObserver?.takeRecords();
    this.applyFilter();
    if (!this.checkVisibility()) {
      return;
    }

    const elements = this.getAlertItems();
    // Animate the elements to their new positions
    const oldElementTop: Map<HTMLElement, number> = new Map(this.oldElementTop);

    requestAnimationFrame(() => {
      this.updateOldElementTop();
      let hasNewElements = false;
      elements.forEach((element) => {
        const elementRect = element.getBoundingClientRect();
        const oldTop = oldElementTop.get(element);
        if (oldTop === undefined) {
          // New element
          (element as ObcAlertMenuItem).animateIntro = this.hasRenderedPanel;
          hasNewElements = true;
          setTimeout(() => {
            (element as ObcAlertMenuItem).animateIntro = false;
          }, 101);
          return;
        }
        const diff = oldTop - elementRect.top;
        if (diff === 0) return;
        element.style.transform = `translateY(${diff}px)`;
        element.style.transition = 'none';

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- the read forces the reflow that restarts the transition
        element.offsetHeight;

        // Remove the transition after the animation is complete
        element.style.transition = 'transform 100ms ease-in-out';
        element.style.transform = 'translateY(0px)';
      });
      this.hasRenderedPanel = true;
      if (hasNewElements) {
        setTimeout(() => {
          this.updateOldElementTop();
        }, 101);
      }
    });
  }

  public getVisibleElements(): {element: HTMLElement; index: number}[] {
    // Get all slotted elements in the visible tab's scrollbar

    const scrollbarRect = this.scrollbar.getBoundingClientRect();
    const slottedElements = this.getAlertItems();

    // Filter for only visible elements that are within the scrollbar viewport
    return slottedElements
      .map((element, index) => ({element, index}))
      .filter(({element}) => {
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') {
          return false;
        }

        // Check if the element is within the scrollbar's viewport
        const elementRect = element.getBoundingClientRect();

        // Check if element overlaps with scrollbar viewport
        const isVisible = !(
          elementRect.top < scrollbarRect.top ||
          elementRect.bottom > scrollbarRect.bottom
        );

        return isVisible;
      });
  }

  override render() {
    const fallback = this.emptyFallback;
    return html` <obc-scrollbar class="alert-list" id="scrollbar">
      <slot @slotchange=${this.handleSlotChange}></slot>
      ${
        this._empty
          ? html` <div class="empty-list">
              <div class="icon">
                <slot name="empty-icon">${fallback.icon}</slot>
              </div>
              <div class="empty-title">
                <slot name="empty-title">${fallback.title}</slot>
              </div>
              <div class="empty-description">
                <slot name="empty-description"></slot>
              </div>
            </div>`
          : nothing
      }
    </obc-scrollbar>`;
  }

  static override styles: CSSResultGroup = unsafeCSS(compentStyle);
}
