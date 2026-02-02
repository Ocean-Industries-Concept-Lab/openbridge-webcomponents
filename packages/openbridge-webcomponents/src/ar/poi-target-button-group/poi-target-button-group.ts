import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import componentStyle from './poi-target-button-group.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ObcPoiTarget, PoiTargetVisualState} from '../poi-target/poi-target.js';
import {customElement} from '../../decorator.js';

const POI_TOUCH_TARGET_VAR = '--maneuvering-components-poi-button-touch-target';
const POI_GROUP_SPACING_VAR = '--obc-poi-group-expanded-spacing';
const TOP_OFFSET_ANIMATION_MS = 100;
const TOP_OFFSET_ANIMATION_DELAY_MS = 0;

export type ExpandEvent = CustomEvent<{expand: boolean}>;

/**
 * Groups POI targets and manages expand/collapse layout behavior.
 * @fires {ExpandEvent} expand - Fired when the button is clicked.
 */
@customElement('obc-poi-target-button-group')
export class ObcPoiTargetButtonGroup extends LitElement {
  @property({type: Boolean}) expand = false;
  @property({type: Boolean, reflect: true}) collapsing = false;
  @property({type: String}) positionVertical = '0px';
  @property({type: Boolean}) useTopOffset = false;
  @state() private positionLeft = '0px';
  @state() private positionRight = '0px';
  @state() private wrapperVisible = false;

  @queryAssignedElements({flatten: true})
  _children!: Array<HTMLElement>;

  private boundUpdatePosition: () => void;
  private expandedObserver?: MutationObserver;
  private expandedRaf = 0;
  private topOffsetAnimationId: number | null = null;
  private topOffsetProgress = 0;
  private topOffsetAnimationStart = 0;
  private topOffsetAnimationFrom = 0;
  private slotChangeRaf = 0;
  private topOffsetTargets: Map<
    ObcPoiTarget,
    {
      originalX: number;
      expandedOffset: number;
      currentExpandedOffset: number;
      originalLeft: number;
    }
  > = new Map();
  private lockedExpandedCenter: number | null = null;
  private collapseDeltas: Map<ObcPoiTarget, number> = new Map();

  constructor() {
    super();
    this.boundUpdatePosition = this.updatePosition.bind(this);
  }

  override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.updatePosition();
    this.setExpandedChildren(this.expand, true);
    this.syncFrontChild();
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', this.onSlotChange);
    if (!this.expand) {
      this.wrapperVisible = true;
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('use-top-offset')) {
      this.useTopOffset = true;
    }
    window.addEventListener('resize', this.boundUpdatePosition);
  }

  override disconnectedCallback() {
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.removeEventListener('slotchange', this.onSlotChange);
    window.removeEventListener('resize', this.boundUpdatePosition);
    this.stopExpandedObserver();
    if (this.slotChangeRaf) {
      cancelAnimationFrame(this.slotChangeRaf);
      this.slotChangeRaf = 0;
    }
    if (this.topOffsetAnimationId) {
      cancelAnimationFrame(this.topOffsetAnimationId);
      this.topOffsetAnimationId = null;
    }
    if (this.topOffsetDelayTimeout) {
      clearTimeout(this.topOffsetDelayTimeout);
      this.topOffsetDelayTimeout = null;
    }
    super.disconnectedCallback();
  }

  onBackdropClick(event: Event): void {
    event.stopPropagation();
    this.expand = false;
    this.setExpandedChildren(this.expand);
  }

  override render() {
    if (this.useTopOffset) {
      return html`
        ${this.expand
          ? html`<div @click=${this.onBackdropClick} class="backdrop"></div>`
          : null}
        <slot></slot>
        ${!this.expand && this.wrapperVisible
          ? html`<button
              @click=${this.onClick}
              class=${classMap({
                wrapper: true,
              })}
              style="left: ${this.positionLeft}; top: ${this
                .positionVertical}; right: ${this.positionRight};"
            >
              <div class="visible-wrapper"></div>
            </button>`
          : null}
      `;
    }

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

  updatePosition(): void {
    let left = Number.MAX_VALUE;
    let right = -Number.MAX_VALUE;

    this._children.forEach((element) => {
      const boundingBox = element.getBoundingClientRect();
      left = Math.min(left, boundingBox.left);
      right = Math.max(right, boundingBox.right);
    });

    if (left !== Number.MAX_VALUE && right !== -Number.MAX_VALUE) {
      const rootDim = this.getBoundingClientRect();
      this.positionLeft = `${left - rootDim.left - 24}px`;
      this.positionRight = `${rootDim.right - right - 24}px`;
    }
  }

  private onSlotChange = () => {
    if (this.slotChangeRaf) {
      cancelAnimationFrame(this.slotChangeRaf);
    }
    this.slotChangeRaf = requestAnimationFrame(() => {
      this.slotChangeRaf = 0;
      this.updatePosition();
      if (!this.expand) {
        this.ensureFrontChildOnTop();
        this.syncFrontChild();
      }
    });
  };

  private ensureFrontChildOnTop() {
    const frontChild = this.getFrontChild();
    if (frontChild && this.lastElementChild !== frontChild) {
      this.appendChild(frontChild);
    }
  }

  onClick(): void {
    if (this.expand) return;
    this.expand = true;
    this.setExpandedChildren(this.expand);
  }

  private expandOffset: Map<ObcPoiTarget, number> = new Map();

  getExpandedChildOffset(child: ObcPoiTarget): number | null {
    return this.expandOffset.get(child) ?? null;
  }

  setExpandedChildren(expand: boolean, firstRun = false): void {
    this.dispatchEvent(
      new CustomEvent('expand', {
        detail: {expand: this.expand},
        bubbles: true,
        composed: true,
      })
    );

    if (this.useTopOffset) {
      this.setExpandedChildrenTopOffset(expand);
      return;
    }

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
        const touchTarget = `${this.getTouchTargetSize()}px`;
        child.style.width = touchTarget;
        child.style.minWidth = touchTarget;
        child.style.height = touchTarget;
      } else {
        child.style.width = 'unset';
        child.style.minWidth = 'unset';
        child.style.height = 'unset';
      }
      if (child instanceof ObcPoiTarget) {
        child.visualState =
          !expand && child !== frontChild
            ? PoiTargetVisualState.Overlap
            : PoiTargetVisualState.Normal;
        if (expand) {
          child.style.transform = 'translate(50%, 100%)';
        } else {
          child.style.transform = '';
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

    this.syncFrontChild();
  }

  private setExpandedChildrenTopOffset(expand: boolean) {
    const frontChild = this.getFrontChild();

    if (expand) {
      this.calculateTopOffsetTargets();
    }

    if (!expand) {
      this.wrapperVisible = false;
      this.lockedExpandedCenter = null;
    }

    if (!expand && frontChild) {
      this.appendChild(frontChild);
    }

    this.animateTopOffset(expand ? 1 : 0);
  }

  private calculateTopOffsetTargets() {
    this.topOffsetTargets.clear();

    const targets = this._children.filter(
      (child): child is ObcPoiTarget => child instanceof ObcPoiTarget
    );

    if (targets.length === 0) return;

    const positions = targets.map((child) => {
      const rect = this.getTargetButtonRect(child);
      const currentLeft = this.getCurrentLeft(child, true);
      return {
        child,
        currentLeft,
        centerX: currentLeft + rect.width / 2,
        width: rect.width,
      };
    });
    positions.sort((a, b) => a.currentLeft - b.currentLeft);

    const leftMost = positions[0].centerX;
    const rightMost = positions[positions.length - 1].centerX;
    const groupCenter = (leftMost + rightMost) / 2;
    this.lockedExpandedCenter = groupCenter;

    const spacing = this.getExpandedSpacing();
    const totalWidth = (positions.length - 1) * spacing;
    const startX = groupCenter - totalWidth / 2;

    positions.forEach((pos, index) => {
      const targetX = startX + index * spacing;
      const expandedOffset = targetX - pos.centerX;
      const originalLeft = pos.currentLeft;
      this.topOffsetTargets.set(pos.child, {
        originalX: pos.centerX,
        expandedOffset,
        currentExpandedOffset: expandedOffset,
        originalLeft,
      });
    });
  }

  private topOffsetTargetExpanded = false;

  private topOffsetDelayTimeout: ReturnType<typeof setTimeout> | null = null;

  private animateTopOffset(targetProgress: number) {
    if (this.topOffsetAnimationId) {
      cancelAnimationFrame(this.topOffsetAnimationId);
    }
    if (this.topOffsetDelayTimeout) {
      clearTimeout(this.topOffsetDelayTimeout);
      this.topOffsetDelayTimeout = null;
    }

    if (targetProgress === 0 && this.topOffsetProgress > 0) {
      this.collapsing = true;
    } else {
      this.collapsing = false;
    }

    const frontChild = this.getFrontChild();
    this.topOffsetTargetExpanded = targetProgress === 1;

    const isCollapsing = targetProgress === 0 && this.topOffsetProgress > 0;
    if (isCollapsing) {
      this.collapseDeltas.clear();
      this.topOffsetTargets.forEach((config, child) => {
        const currentLeft = this.getCurrentLeft(child, true);
        const delta = currentLeft - config.originalLeft;
        this.collapseDeltas.set(child, delta);
      });
      this.topOffsetTargets.forEach((_, child) => {
        if (child !== frontChild) {
          child.visualState = PoiTargetVisualState.Overlap;
        }
      });
      if (TOP_OFFSET_ANIMATION_DELAY_MS > 0) {
        this.topOffsetDelayTimeout = setTimeout(() => {
          this.topOffsetDelayTimeout = null;
          this.runTopOffsetAnimation(targetProgress, frontChild);
        }, TOP_OFFSET_ANIMATION_DELAY_MS);
      } else {
        this.runTopOffsetAnimation(targetProgress, frontChild);
      }
    } else {
      if (targetProgress === 1) {
        this.collapseDeltas.clear();
      }
      this.runTopOffsetAnimation(targetProgress, frontChild);
    }
  }

  private runTopOffsetAnimation(
    targetProgress: number,
    frontChild: ObcPoiTarget | null
  ) {
    this.topOffsetAnimationStart = performance.now();
    this.topOffsetAnimationFrom = this.topOffsetProgress;

    const step = (now: number) => {
      const elapsed = now - this.topOffsetAnimationStart;
      const duration = TOP_OFFSET_ANIMATION_MS;
      const t = duration <= 0 ? 1 : Math.min(elapsed / duration, 1);
      this.topOffsetProgress =
        this.topOffsetAnimationFrom +
        (targetProgress - this.topOffsetAnimationFrom) * t;

      if (targetProgress === 1) {
        this.updateExpandedOffsets(true);
      }

      this.applyTopOffsetState(this.topOffsetProgress, frontChild);

      if (t >= 1) {
        this.topOffsetAnimationId = null;
        if (targetProgress === 0) {
          this.collapsing = false;
          this.dispatchEvent(
            new CustomEvent('collapse-finished', {
              bubbles: true,
              composed: true,
            })
          );
          this.updatePosition();
          this.wrapperVisible = true;
          this.stopExpandedObserver();
          this.collapseDeltas.clear();
          this.lastTargetOrder = [];
          this.lastAppliedOffsets.clear();
        }
        if (targetProgress === 1) {
          this.startExpandedObserver();
          this.scheduleExpandedOffsets();
        }
      } else {
        this.topOffsetAnimationId = requestAnimationFrame(step);
      }
    };

    this.topOffsetAnimationId = requestAnimationFrame(step);
  }
  private applyTopOffsetState(
    progress: number,
    frontChild: ObcPoiTarget | null
  ) {
    const inLayer = this.closest('obc-poi-layer') !== null;
    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const visualExpanded = this.topOffsetTargetExpanded;
    const touchAreaExpanded = progress > 0.5;

    this.topOffsetTargets.forEach((config, child) => {
      const isCollapsing = this.collapseDeltas.size > 0;
      let delta: number;
      if (isCollapsing) {
        delta = this.collapseDeltas.get(child) ?? 0;
      } else {
        const currentLeft = this.getCurrentLeft(child, true);
        delta = currentLeft - config.originalLeft;
      }

      const buttonOffset = (config.currentExpandedOffset - delta) * eased;

      if (inLayer) {
        child.style.setProperty(
          '--obc-poi-target-offset-x',
          `${buttonOffset}px`
        );
        child.style.removeProperty('transform');
      } else {
        child.style.transform = `translateX(${buttonOffset}px)`;
      }

      child.offset = -buttonOffset;

      if (child !== frontChild) {
        child.visualState = visualExpanded
          ? PoiTargetVisualState.Normal
          : PoiTargetVisualState.Overlap;
      } else {
        child.visualState = PoiTargetVisualState.Normal;
      }

      if (touchAreaExpanded) {
        const touchTarget = `${this.getTouchTargetSize()}px`;
        child.style.width = touchTarget;
        child.style.minWidth = touchTarget;
        child.style.height = touchTarget;
      } else {
        child.style.width = 'unset';
        child.style.minWidth = 'unset';
        child.style.height = 'unset';
      }
    });
  }

  private getFrontChild(): ObcPoiTarget | null {
    const targets = this._children.filter(
      (child): child is ObcPoiTarget => child instanceof ObcPoiTarget
    );

    if (targets.length === 0) return null;

    const frontByAttr = targets.find((child) =>
      child.hasAttribute('data-front')
    );
    if (frontByAttr) return frontByAttr;

    let front: ObcPoiTarget | null = null;
    let maxHeight = Number.NEGATIVE_INFINITY;

    for (const child of targets) {
      const heightValue =
        typeof child.height === 'number'
          ? child.height
          : Number.parseFloat(child.getAttribute('height') ?? '');

      if (Number.isNaN(heightValue)) continue;

      if (heightValue > maxHeight) {
        maxHeight = heightValue;
        front = child;
      }
    }

    return front ?? targets[0] ?? null;
  }

  private syncFrontChild() {
    const front = this.getFrontChild();
    this._children.forEach((child) => {
      if (!(child instanceof ObcPoiTarget)) return;
      child.visualState =
        !this.expand && (!front || child !== front)
          ? PoiTargetVisualState.Overlap
          : PoiTargetVisualState.Normal;
      if (front && child === front) {
        child.setAttribute('data-front', 'true');
      } else {
        child.removeAttribute('data-front');
      }
    });
  }

  private expandedLoopRunning = false;

  private startExpandedObserver() {
    if (this.expandedLoopRunning) return;
    this.expandedLoopRunning = true;
    this.runExpandedLoop();
  }

  private runExpandedLoop() {
    if (!this.expandedLoopRunning || !this.expand) {
      this.expandedLoopRunning = false;
      return;
    }
    this.updateExpandedOffsets();
    requestAnimationFrame(() => this.runExpandedLoop());
  }

  private stopExpandedObserver() {
    this.expandedLoopRunning = false;
    this.expandedObserver?.disconnect();
    this.expandedObserver = undefined;
    if (this.expandedRaf) {
      cancelAnimationFrame(this.expandedRaf);
      this.expandedRaf = 0;
    }
    this.lastAppliedOffsets.clear();
    this.lastTargetOrder = [];
  }

  private scheduleExpandedOffsets() {
    if (!this.expand) return;
    this.updateExpandedOffsets();
  }

  private lastAppliedOffsets: Map<
    ObcPoiTarget,
    {buttonOffset: number; lineOffset: number}
  > = new Map();
  private lastTargetOrder: ObcPoiTarget[] = [];

  private updateExpandedOffsets(snap: boolean = false) {
    if (!this.expand) return;
    const inLayer = this.closest('obc-poi-layer') !== null;

    const targets = this._children.filter(
      (child): child is ObcPoiTarget => child instanceof ObcPoiTarget
    );

    const sortedByCurrentPosition = [...targets]
      .map((child) => {
        const currentLeft = this.getCurrentLeft(child, true);
        return {child, currentLeft};
      })
      .sort((a, b) => a.currentLeft - b.currentLeft)
      .map((item) => item.child);

    const orderChanged =
      this.lastTargetOrder.length !== sortedByCurrentPosition.length ||
      sortedByCurrentPosition.some(
        (child, index) => this.lastTargetOrder[index] !== child
      );

    if (orderChanged && this.lastTargetOrder.length > 0) {
      const spacing = this.getExpandedSpacing();
      const totalWidth = (sortedByCurrentPosition.length - 1) * spacing;

      const groupCenter =
        this.lockedExpandedCenter ??
        (() => {
          const positions = sortedByCurrentPosition.map((child) => {
            const leftStr = child.style.left;
            return Number.parseFloat(leftStr) || 0;
          });
          const leftMost = Math.min(...positions);
          const rightMost = Math.max(...positions);
          return (leftMost + rightMost) / 2;
        })();
      if (this.lockedExpandedCenter === null) {
        this.lockedExpandedCenter = groupCenter;
      }
      const startX = groupCenter - totalWidth / 2;

      sortedByCurrentPosition.forEach((child, index) => {
        const config = this.topOffsetTargets.get(child);
        if (!config) return;

        const targetX = startX + index * spacing;
        const newExpandedOffset = targetX - config.originalX;

        config.expandedOffset = newExpandedOffset;
      });
    }

    this.lastTargetOrder = sortedByCurrentPosition;

    targets.forEach((child) => {
      const config = this.topOffsetTargets.get(child);
      if (!config) return;

      const currentLeft = this.getCurrentLeft(child, true);
      const delta = currentLeft - config.originalLeft;

      if (snap) {
        config.currentExpandedOffset = config.expandedOffset;
      } else {
        const diff = config.expandedOffset - config.currentExpandedOffset;
        if (Math.abs(diff) < 0.5) {
          config.currentExpandedOffset = config.expandedOffset;
        } else {
          config.currentExpandedOffset += diff * 0.1;
        }
      }

      const buttonOffset = config.currentExpandedOffset - delta;
      const lineOffset = -buttonOffset;

      const last = this.lastAppliedOffsets.get(child);
      if (
        last &&
        last.buttonOffset === buttonOffset &&
        last.lineOffset === lineOffset
      ) {
        return;
      }

      this.lastAppliedOffsets.set(child, {buttonOffset, lineOffset});

      if (inLayer) {
        child.style.setProperty(
          '--obc-poi-target-offset-x',
          `${buttonOffset}px`
        );
      } else {
        child.style.transform = `translateX(${buttonOffset}px)`;
      }

      child.offset = lineOffset;
    });
  }

  private getCurrentLeft(element: HTMLElement, computed = false): number {
    const inline = element.style.left;
    if (inline && inline.endsWith('px')) {
      const parsed = Number.parseFloat(inline);
      if (!Number.isNaN(parsed)) return parsed;
    }

    if (!computed) return 0;

    const computedStyle = window.getComputedStyle(element).left;
    return Number.parseFloat(computedStyle) || 0;
  }

  private getTargetButtonRect(target: ObcPoiTarget): DOMRect {
    const targetShadow = target.shadowRoot;
    const button = targetShadow?.querySelector('obc-poi-target-button') as
      | HTMLElement
      | undefined;
    const buttonShadow = button?.shadowRoot;
    const wrapper = buttonShadow?.querySelector(
      '.wrapper'
    ) as HTMLElement | null;
    return (
      wrapper?.getBoundingClientRect() ??
      button?.getBoundingClientRect() ??
      target.getBoundingClientRect()
    );
  }

  private getCssVarAsNumber(varName: string, fallback: number): number {
    const raw = getComputedStyle(this).getPropertyValue(varName).trim();
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  private getTouchTargetSize(): number {
    return this.getCssVarAsNumber(POI_TOUCH_TARGET_VAR, 48);
  }

  private getExpandedSpacing(): number {
    return this.getCssVarAsNumber(POI_GROUP_SPACING_VAR, 50);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-target-button-group': ObcPoiTargetButtonGroup;
  }
}
