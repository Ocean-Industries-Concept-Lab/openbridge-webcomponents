import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import componentStyle from './poi-target-button-group.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ObcPoiTarget, PoiTargetVisualState} from '../poi-target/poi-target.js';
import {customElement} from '../../decorator.js';

// CSS variable names for POI sizing (defined in src/palettes/variables.css)
const POI_TOUCH_TARGET_VAR = '--maneuvering-components-poi-button-touch-target';
const POI_GROUP_SPACING_VAR = '--obc-poi-group-expanded-spacing';

export type ExpandEvent = CustomEvent<{expand: boolean}>;

/**
 * @fires {ExpandEvent} expand - Fired when the button is clicked.
 */
@customElement('obc-poi-target-button-group')
export class ObcPoiTargetButtonGroup extends LitElement {
  @property({type: Boolean}) expand = false;
  @property({type: Boolean, reflect: true}) collapsing = false;
  @property({type: String}) positionVertical = '0px';
  @property({type: Boolean}) useTopOffset?: boolean;
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
  // Captured deltas at the start of collapse animation
  private collapseDeltas: Map<ObcPoiTarget, number> = new Map();

  constructor() {
    super();
    // Bind the method once in the constructor
    this.boundUpdatePosition = this.updatePosition.bind(this);
  }

  override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.updatePosition();
    this.setExpandedChildren(this.expand, true);
    this.syncFrontChild();
    // Show wrapper after initial setup (if not expanded)
    if (!this.expand) {
      this.wrapperVisible = true;
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    if (
      this.useTopOffset === undefined &&
      !this.hasAttribute('use-top-offset')
    ) {
      this.useTopOffset = true;
    }
    this.addEventListener('slotchange', this.boundUpdatePosition);
    window.addEventListener('resize', this.boundUpdatePosition);
  }

  override disconnectedCallback() {
    this.removeEventListener('slotchange', this.boundUpdatePosition);
    window.removeEventListener('resize', this.boundUpdatePosition);
    this.stopExpandedObserver();
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

  onBackdropClick(event: Event) {
    event.stopPropagation();
    this.expand = false;
    this.setExpandedChildren(this.expand);
  }

  override render() {
    // Top offset mode: always keep children in their original positions
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

    // Always calculate targets when expanding to capture current positions
    if (expand) {
      this.calculateTopOffsetTargets();
    }

    // When collapsing, hide wrapper until animation completes
    if (!expand) {
      this.wrapperVisible = false;
      this.lockedExpandedCenter = null;
    }

    // Reorder children by height (tallest last = on top)
    if (!expand && frontChild) {
      this.appendChild(frontChild);
    }

    // Animate to target state
    this.animateTopOffset(expand ? 1 : 0);
  }

  private calculateTopOffsetTargets() {
    this.topOffsetTargets.clear();

    const targets = this._children.filter(
      (child): child is ObcPoiTarget => child instanceof ObcPoiTarget
    );

    if (targets.length === 0) return;

    // Get current positions and sort by x position
    const positions = targets.map((child) => {
      const rect = this.getTargetButtonRect(child);
      const currentLeft = this.getCurrentLeft(child);
      // Use currentLeft (offset parent space) for centerX to ensure consistency
      // with delta calculations which use currentLeft.
      return {
        child,
        currentLeft,
        centerX: currentLeft + rect.width / 2,
        width: rect.width,
      };
    });
    positions.sort((a, b) => a.currentLeft - b.currentLeft);

    // Calculate center point of the group
    const leftMost = positions[0].centerX;
    const rightMost = positions[positions.length - 1].centerX;
    const groupCenter = (leftMost + rightMost) / 2;
    this.lockedExpandedCenter = groupCenter;

    // Calculate expanded offsets - spread apart from their current position
    const spacing = this.getExpandedSpacing();
    const totalWidth = (positions.length - 1) * spacing;
    const startX = groupCenter - totalWidth / 2;

    positions.forEach((pos, index) => {
      const targetX = startX + index * spacing;
      const expandedOffset = targetX - pos.centerX;
      // Store original style.left so we can track movement
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
    // Set target state immediately so visual state transitions start right away
    this.topOffsetTargetExpanded = targetProgress === 1;

    // When collapsing, apply visual state first, then delay movement
    const isCollapsing = targetProgress === 0 && this.topOffsetProgress > 0;
    if (isCollapsing) {
      // Capture current deltas at the start of collapse
      this.collapseDeltas.clear();
      this.topOffsetTargets.forEach((config, child) => {
        const currentLeft = this.getCurrentLeft(child);
        const delta = currentLeft - config.originalLeft;
        this.collapseDeltas.set(child, delta);
      });
      // Apply scale down immediately (visual state change)
      this.topOffsetTargets.forEach((_, child) => {
        if (child !== frontChild) {
          child.visualState = PoiTargetVisualState.Overlap;
        }
      });
      // Delay movement animation to let scale transition start
      this.topOffsetDelayTimeout = setTimeout(() => {
        this.topOffsetDelayTimeout = null;
        this.runTopOffsetAnimation(targetProgress, frontChild);
      }, 150);
    } else {
      // When expanding, clear collapse deltas
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
    const step = () => {
      const diff = targetProgress - this.topOffsetProgress;
      if (Math.abs(diff) < 0.01) {
        this.topOffsetProgress = targetProgress;
        this.topOffsetAnimationId = null;
        // Final state
        this.applyTopOffsetState(this.topOffsetProgress, frontChild);
        // When collapse animation completes, update position and show wrapper
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
        // When expand animation completes, start observing for position changes
        if (targetProgress === 1) {
          this.startExpandedObserver();
          this.scheduleExpandedOffsets();
        }
      } else {
        this.topOffsetProgress += diff * 0.1;

        // Run shuffle logic during expansion to handle initial ordering/crossing immediately.
        // Snap the offsets to avoid interpolation lag during the expansion swoosh.
        if (targetProgress === 1) {
          this.updateExpandedOffsets(true);
        }

        this.applyTopOffsetState(this.topOffsetProgress, frontChild);
        this.topOffsetAnimationId = requestAnimationFrame(step);
      }
    };

    step();
  }
  private applyTopOffsetState(
    progress: number,
    frontChild: ObcPoiTarget | null
  ) {
    const inLayer = this.closest('obc-poi-layer') !== null;
    // Easing function
    const eased =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    // Visual state uses target immediately, touch area uses progress threshold
    const visualExpanded = this.topOffsetTargetExpanded;
    const touchAreaExpanded = progress > 0.5;

    this.topOffsetTargets.forEach((config, child) => {
      // Use captured collapse delta if collapsing, otherwise calculate current delta
      const isCollapsing = this.collapseDeltas.size > 0;
      let delta: number;
      if (isCollapsing) {
        delta = this.collapseDeltas.get(child) ?? 0;
      } else {
        const currentLeft = this.getCurrentLeft(child);
        delta = currentLeft - config.originalLeft;
      }

      // Button offset:
      // - Expanding: spread to expandedOffset, counter-translate by current delta to stay locked
      // - Collapsing: animate from (expandedOffset - delta) back to 0
      const buttonOffset = (config.currentExpandedOffset - delta) * eased;

      // Move button horizontally; preserve layer vertical transforms when in a layer.
      if (inLayer) {
        child.style.setProperty(
          '--obc-poi-target-offset-x',
          `${buttonOffset}px`
        );
        child.style.removeProperty('transform');
      } else {
        child.style.transform = `translateX(${buttonOffset}px)`;
      }

      // Line offset: points from button position back to target's real position
      // offset = -buttonOffset makes line point back to where target actually is
      child.offset = Math.round(-buttonOffset);

      // Visual state changes immediately with target direction
      if (child !== frontChild) {
        child.visualState = visualExpanded
          ? PoiTargetVisualState.Normal
          : PoiTargetVisualState.Overlap;
      } else {
        child.visualState = PoiTargetVisualState.Normal;
      }

      // Touch area changes at midpoint
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

  /**
   * Get the child that should be displayed in front (not collapsed).
   * Priority: 1) data-front attribute, 2) tallest height, 3) first in DOM order
   * Uses deterministic tie-breaking (DOM order) to avoid visual flicker.
   */
  private getFrontChild(): ObcPoiTarget | null {
    const targets = this._children.filter(
      (child): child is ObcPoiTarget => child instanceof ObcPoiTarget
    );

    if (targets.length === 0) return null;

    // Priority 1: Explicit data-front attribute
    const frontByAttr = targets.find((child) =>
      child.hasAttribute('data-front')
    );
    if (frontByAttr) return frontByAttr;

    // Priority 2: Tallest height (first in DOM order for tie-breaking)
    let front: ObcPoiTarget | null = null;
    let maxHeight = Number.NEGATIVE_INFINITY;

    for (const child of targets) {
      const heightValue =
        typeof child.height === 'number'
          ? child.height
          : Number.parseFloat(child.getAttribute('height') ?? '');

      if (Number.isNaN(heightValue)) continue;

      // Use > (not >=) so first element wins ties (DOM order)
      if (heightValue > maxHeight) {
        maxHeight = heightValue;
        front = child;
      }
    }

    // Priority 3: First target in DOM order if no heights defined
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
    // Just run once immediately when called
    if (!this.expand) return;
    this.updateExpandedOffsets();
  }

  // Track last applied values to avoid jitter from tiny changes
  private lastAppliedOffsets: Map<
    ObcPoiTarget,
    {buttonOffset: number; lineOffset: number}
  > = new Map();
  // Track the last known order of targets to detect when they cross
  private lastTargetOrder: ObcPoiTarget[] = [];

  private updateExpandedOffsets(snap: boolean = false) {
    if (!this.expand) return;
    const inLayer = this.closest('obc-poi-layer') !== null;

    const targets = this._children.filter(
      (child): child is ObcPoiTarget => child instanceof ObcPoiTarget
    );

    // Sort targets by their current x position (style.left)
    const sortedByCurrentPosition = [...targets]
      .map((child) => {
        const currentLeft = this.getCurrentLeft(child);
        return {child, currentLeft};
      })
      .sort((a, b) => a.currentLeft - b.currentLeft)
      .map((item) => item.child);

    // Check if order has changed since last frame
    const orderChanged =
      this.lastTargetOrder.length !== sortedByCurrentPosition.length ||
      sortedByCurrentPosition.some(
        (child, index) => this.lastTargetOrder[index] !== child
      );

    if (orderChanged && this.lastTargetOrder.length > 0) {
      // Order changed - reassign expanded slot positions based on new order
      // Calculate the slot offsets (same spacing logic as calculateTopOffsetTargets)
      const spacing = this.getExpandedSpacing();
      const totalWidth = (sortedByCurrentPosition.length - 1) * spacing;

      // Lock group center to initial expanded position
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

      // Reassign expandedOffset for each target based on new order
      sortedByCurrentPosition.forEach((child, index) => {
        const config = this.topOffsetTargets.get(child);
        if (!config) return;

        const targetX = startX + index * spacing;
        const newExpandedOffset = targetX - config.originalX;

        // Update the config with new expanded offset and original left
        config.expandedOffset = newExpandedOffset;
      });
    }

    // Update last known order
    this.lastTargetOrder = sortedByCurrentPosition;

    targets.forEach((child) => {
      const config = this.topOffsetTargets.get(child);
      if (!config) return;

      const currentLeft = this.getCurrentLeft(child);
      const delta = currentLeft - config.originalLeft;

      // Interpolate current towards expanded (target)
      if (snap) {
        config.currentExpandedOffset = config.expandedOffset;
      } else {
        const diff = config.expandedOffset - config.currentExpandedOffset;
        if (Math.abs(diff) < 0.5) {
          config.currentExpandedOffset = config.expandedOffset;
        } else {
          config.currentExpandedOffset += diff * 0.1; // Smooth factor
        }
      }

      // Counter-translate to keep button locked in expanded spread position
      const buttonOffset = Math.round(config.currentExpandedOffset - delta);
      const lineOffset = -buttonOffset;

      // Only update if values actually changed
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

      // Line offset: points from button position back to target's real position
      child.offset = lineOffset;
    });
  }

  private getCurrentLeft(element: HTMLElement): number {
    // Optimization: fast path for explicit pixel values in inline style (common in animations)
    const inline = element.style.left;
    if (inline && inline.endsWith('px')) {
      const parsed = Number.parseFloat(inline);
      if (!Number.isNaN(parsed)) return parsed;
    }

    // Slow path: computed style for CSS classes, calc(), percentages, etc.
    const computed = window.getComputedStyle(element).left;
    return Number.parseFloat(computed) || 0;
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

  /**
   * Get a CSS variable value as a number (strips 'px' suffix).
   * Falls back to the provided default if the variable is not set or invalid.
   */
  private getCssVarAsNumber(varName: string, fallback: number): number {
    const raw = getComputedStyle(this).getPropertyValue(varName).trim();
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  /** Get the touch target size from CSS variables (default 48px) */
  private getTouchTargetSize(): number {
    return this.getCssVarAsNumber(POI_TOUCH_TARGET_VAR, 48);
  }

  /** Get the expanded spacing from CSS variables (default 50px) */
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
