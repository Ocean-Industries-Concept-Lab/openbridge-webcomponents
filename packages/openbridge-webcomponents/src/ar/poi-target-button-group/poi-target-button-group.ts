import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import compentStyle from './poi-target-button-group.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ObcPoiTarget} from '../poi-target/poi-target.js';
import {customElement} from '../../decorator.js';

export type ExpandEvent = CustomEvent<{expand: boolean}>;

/**
 * @fires {ExpandEvent} expand - Fired when the button is clicked.
 */
@customElement('obc-poi-target-button-group')
export class ObcPoiTargetButtonGroup extends LitElement {
  @property({type: Boolean}) expand = false;
  @property({type: String}) positionVertical = '0px';
  @state() private positionLeft = '0px';
  @state() private positionRight = '0px';

  @queryAssignedElements({flatten: true})
  _children!: Array<HTMLElement>;

  private boundUpdatePosition: () => void;
  private expandedObserver?: MutationObserver;
  private expandedRaf = 0;

  constructor() {
    super();
    // Bind the method once in the constructor
    this.boundUpdatePosition = this.updatePosition.bind(this);
  }

  override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.updatePosition();
    this.setExpandedChildren(this.expand, true);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('slotchange', this.boundUpdatePosition);
    window.addEventListener('resize', this.boundUpdatePosition);
  }

  override disconnectedCallback() {
    this.removeEventListener('slotchange', this.boundUpdatePosition);
    window.removeEventListener('resize', this.boundUpdatePosition);
    this.expandedObserver?.disconnect();
    if (this.expandedRaf) {
      cancelAnimationFrame(this.expandedRaf);
      this.expandedRaf = 0;
    }
    super.disconnectedCallback();
  }

  onBackdropClick(event: Event) {
    event.stopPropagation();
    this.expand = false;
    this.setExpandedChildren(this.expand);
  }

  override render() {
    return html`
      ${this.expand
        ? html`<div @click=${this.onBackdropClick} class="backdrop"></div>`
        : html`<slot></slot>`}
      <button
        @click=${this.onClick}
        class=${classMap({
          wrapper: true,
          expand: this.expand,
        })}
        style="left: ${this.positionLeft}; top: ${this
          .positionVertical}; right: ${this.positionRight};"
      >
        ${this.expand
          ? html`<slot></slot>`
          : html`<div class="visible-wrapper"></div>`}
      </button>
    `;
  }

  // Get bounding box of the slotted elements
  updatePosition() {
    let left = Number.MAX_VALUE;
    let right = -Number.MAX_VALUE;

    this._children.forEach((element) => {
      const boundingBox = element.getBoundingClientRect();
      left = Math.min(left, boundingBox.left);
      right = Math.max(right, boundingBox.right);
    });

    if (left !== Number.MAX_VALUE && right !== -Number.MAX_VALUE) {
      const rootDim = this.getBoundingClientRect();
      // Update position properties based on bounding box
      this.positionLeft = `${left - rootDim.left - 24}px`;
      this.positionRight = `${rootDim.right - right - 24}px`;
    }
  }

  onClick() {
    if (this.expand) return;
    this.expand = !this.expand;
    this.setExpandedChildren(this.expand);
  }

  expandOffset: Map<ObcPoiTarget, number> = new Map();

  /**
   * Get the offset of the child when the group is expanded.
   * @param child - The child element to get the offset for.
   * @returns The offset of the child when the group is expanded, or null if the child is not expanded.
   */
  getExpandedChildOffset(child: ObcPoiTarget): number | null {
    return this.expandOffset.get(child) ?? null;
  }

  setExpandedChildren(expand: boolean, firstRun = false) {
    this.dispatchEvent(
      new CustomEvent('expand', {detail: {expand: this.expand}})
    );
    // Store the old position of the children
    const oldPosition = new Map<ObcPoiTarget, number>();
    if (expand || firstRun) {
      this._children.forEach((child) => {
        if (child instanceof ObcPoiTarget) {
          const boundingBox = child.getBoundingClientRect();
          oldPosition.set(child, boundingBox.left);
        }
      });
    }

    const frontChild = expand ? null : this.getFrontChild();
    if (!expand && frontChild) {
      // Ensure front renders on top without z-index.
      this.appendChild(frontChild);
    }
    if (expand) {
      const ordered = this._children
        .filter((child): child is ObcPoiTarget => child instanceof ObcPoiTarget)
        .map((child) => ({
          child,
          left: oldPosition.get(child) ?? child.getBoundingClientRect().left,
        }))
        .sort((a, b) => a.left - b.left)
        .map((item) => item.child);
      ordered.forEach((child) => this.appendChild(child));
    }
    this._children.forEach((child) => {
      child.style.position = expand ? 'static' : 'absolute';
      if (this.expand) {
        child.style.width = '48px';
        child.style.minWidth = '48px';
        child.style.height = '48px';
      } else {
        child.style.width = 'unset';
        child.style.minWidth = 'unset';
        child.style.height = 'unset';
      }
      if (child instanceof ObcPoiTarget) {
        (child as ObcPoiTarget).overlap =
          expand ? false : (child as ObcPoiTarget) !== frontChild;
        if (expand) {
          (child as ObcPoiTarget).style.transform = 'translate(50%, 100%)';
        } else {
          (child as ObcPoiTarget).style.transform = '';
        }
      }
    });

    if (expand) {
      requestAnimationFrame(() => {
        oldPosition.forEach((offset, child) => {
          const boundingBox = child.getBoundingClientRect();
          const newOffset = offset - boundingBox.left;
          this.expandOffset.set(child, newOffset);
          child.offset = newOffset;
        });
      });
      this.startExpandedObserver();
      this.scheduleExpandedOffsets();
    } else {
      requestAnimationFrame(() => {
        this.expandOffset.forEach((_, child) => {
          child.offset = 0;
        });
        this.expandOffset.clear();
      });
      this.stopExpandedObserver();
    }
  }

  private getFrontChild(): ObcPoiTarget | null {
    const frontByAttr = this._children.find(
      (child) => child instanceof ObcPoiTarget && child.hasAttribute('data-front')
    );
    if (frontByAttr && frontByAttr instanceof ObcPoiTarget) return frontByAttr;

    let front: ObcPoiTarget | null = null;
    let maxHeight = Number.NEGATIVE_INFINITY;
    this._children.forEach((child) => {
      if (!(child instanceof ObcPoiTarget)) return;
      const heightAttr = child.getAttribute('height');
      const heightValue = Number.parseFloat(heightAttr ?? '');
      if (Number.isNaN(heightValue)) return;
      if (heightValue > maxHeight) {
        maxHeight = heightValue;
        front = child;
      }
    });
    if (front && Number.isFinite(maxHeight)) {
      const candidates = this._children.filter((child) => {
        if (!(child instanceof ObcPoiTarget)) return false;
        const heightAttr = child.getAttribute('height');
        const heightValue = Number.parseFloat(heightAttr ?? '');
        return !Number.isNaN(heightValue) && heightValue === maxHeight;
      }) as ObcPoiTarget[];
      if (candidates.length > 1) {
        return candidates[Math.floor(Math.random() * candidates.length)] ?? front;
      }
    }
    return front;
  }

  private startExpandedObserver() {
    if (this.expandedObserver) return;
    this.expandedObserver = new MutationObserver(() =>
      this.scheduleExpandedOffsets()
    );
    this._children.forEach((child) => {
      this.expandedObserver?.observe(child, {
        attributes: true,
        attributeFilter: ['style'],
      });
    });
  }

  private stopExpandedObserver() {
    this.expandedObserver?.disconnect();
    this.expandedObserver = undefined;
    if (this.expandedRaf) {
      cancelAnimationFrame(this.expandedRaf);
      this.expandedRaf = 0;
    }
  }

  private scheduleExpandedOffsets() {
    if (!this.expand || this.expandedRaf) return;
    this.expandedRaf = requestAnimationFrame(() => {
      this.expandedRaf = 0;
      this.updateExpandedOffsets();
    });
  }

  private updateExpandedOffsets() {
    if (!this.expand) return;
    const layer = this.closest('obc-poi-layer');
    const layerRect = layer?.getBoundingClientRect() ?? this.getBoundingClientRect();
    this._children.forEach((child) => {
      if (!(child instanceof ObcPoiTarget)) return;
      const leftStr = child.style.left;
      if (!leftStr) return;
      const left = Number.parseFloat(leftStr);
      if (Number.isNaN(left)) return;
      const desiredX = layerRect.left + left;
      const buttonRect = this.getTargetButtonRect(child);
      const centerX = buttonRect.left + buttonRect.width / 2;
      child.offset = Math.round(desiredX - centerX);
    });
  }

  private getTargetButtonRect(target: ObcPoiTarget): DOMRect {
    const targetShadow = target.shadowRoot;
    const button = targetShadow?.querySelector('obc-poi-target-button') as
      | HTMLElement
      | undefined;
    const buttonShadow = button?.shadowRoot;
    const wrapper = buttonShadow?.querySelector(
      '.wrapper, .wrapper-overlap'
    ) as HTMLElement | null;
    return (
      wrapper?.getBoundingClientRect() ??
      button?.getBoundingClientRect() ??
      target.getBoundingClientRect()
    );
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-target-button-group': ObcPoiTargetButtonGroup;
  }
}
