import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {queryAssignedElements, query, property, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list.css?inline';
import '../../components/scrollbar/scrollbar.js';
import {ObcScrollbar} from '../../components/scrollbar/scrollbar.js';
import {ObcAlertMenuItem} from '../../components/alert-menu-item/alert-menu-item.js';

@customElement('obc-alert-list')
export class ObcAlertList extends LitElement {
  @property({attribute: false}) filter: (item: ObcAlertMenuItem) => boolean =
    () => true;

  private oldElementTop: Map<HTMLElement, number> = new Map();
  private mutationObserver: MutationObserver | null = null;
  private hasRenderedPanel = false;
  @state() _empty = false;

  @queryAssignedElements({flatten: true})
  private alertItems!: HTMLElement[];

  @query('#scrollbar', true)
  private scrollbar!: ObcScrollbar;

  override firstUpdated() {
    this.updateEmpty();
    this.setupMutationObserver();

    const intersectionObserver = new IntersectionObserver((entries) => {
      // If intersectionRatio is 0, the target is out of view
      if (entries[0].intersectionRatio === 0) {
        this.hasRenderedPanel = false;
      }
    });
    intersectionObserver.observe(this);
  }

  protected override willUpdate(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('filter')) {
      this.updateEmpty();
      this.updateOldElementTop();
    }
  }

  private updateEmpty() {
    this._empty = this.getAlertItems().length === 0;
  }

  private getAlertItems() {
    let alertItems = this.alertItems;
    const isVueWrapper =
      alertItems.length === 1 && alertItems[0].tagName === 'SPAN';
    if (isVueWrapper) {
      alertItems = Array.from(alertItems[0].childNodes).filter(
        (child) => child.nodeType === Node.ELEMENT_NODE
      ) as HTMLElement[];
    }
    return (alertItems as ObcAlertMenuItem[]).filter(this.filter);
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
    // Delete the old observer
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    const slotElements = this.alertItems;
    const observer = new MutationObserver(() => {
      this.handleSlotChange();
    });
    slotElements.forEach((element) => {
      observer.observe(element, {attributes: true});
    });
    this.mutationObserver = observer;
  }

  private handleSlotChange() {
    if (!this.checkVisibility()) {
      return;
    }
    this.updateEmpty();
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

        // Force a reflow to ensure the animation is applied
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
      this.setupMutationObserver();
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
    return html` <obc-scrollbar class="alert-list" id="scrollbar">
      <slot @slotchange=${this.handleSlotChange}></slot>
      ${this._empty
        ? html` <div class="empty-list">
            <div class="icon">
              <slot name="empty-icon"></slot>
            </div>
            <div class="empty-title">
              <slot name="empty-title"></slot>
            </div>
            <div class="empty-description">
              <slot name="empty-description"></slot>
            </div>
          </div>`
        : nothing}
    </obc-scrollbar>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list': ObcAlertList;
  }
}
