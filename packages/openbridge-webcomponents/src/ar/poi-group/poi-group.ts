import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-group.css?inline';
import {PoiDataValue, PoiDataVisualRectPreference} from '../poi/poi-data.js';
import {Poi, isPoi} from '../poi/poi.js';
import {ObcPoiButtonType} from '../poi-button/poi-button.js';
import {customElement} from '../../decorator.js';
import {AnimationManager, easeInOutQuad, frameLerp} from './animation-utils.js';
import {getEffectivePoiX} from '../poi/poi-position.js';
import {
  getCssVarAsNumber,
  getTouchTargetSize,
  getVisualTargetSize,
} from '../poi/poi-css-vars.js';
import {
  applyPoiVisualState,
  clearPoiVisualState,
} from '../poi/poi-visual-state.js';

const POI_GROUP_SPACING_VAR = '--obc-poi-group-expanded-spacing';
const TOP_OFFSET_ANIMATION_MS_VAR = '--obc-poi-group-top-offset-animation-ms';
const TOP_OFFSET_ANIMATION_DELAY_MS_VAR =
  '--obc-poi-group-top-offset-animation-delay-ms';

export type ExpandEvent = CustomEvent<{expand: boolean}>;

/**
 * `<obc-poi-group>` - A POI cluster component that collapses overlapping targets into one trigger and expands them into a spread list.
 *
 * This component wraps multiple `obc-poi-data` elements and manages their collapsed/expanded presentation as a single interactive unit.
 * Use it when nearby targets should be presented as one grouped control until the user expands the group.
 *
 * ### Features
 * - Expand/collapse state: Controlled by `expand`; collapse animation state is exposed through `collapsing`.
 * - Automatic wrapper sizing: Computes collapsed wrapper width/height from slotted target button bounds.
 * - Front-target handling: Keeps one front target visually prioritized while collapsing other targets into overlap state.
 * - Backdrop interaction: Shows a backdrop while expanded and collapses on backdrop click.
 * - Dynamic ordering: `internalSwapping` enables reordering while expanded based on current horizontal positions.
 * - Vertical placement: `positionVertical` sets the wrapper/group top offset used for collapsed positioning.
 *
 * ### Usage Guidelines
 * - Slot only `obc-poi-data` items that should behave as one grouped target set.
 * - Control expand/collapse via the `expand` property, or let the built-in wrapper button toggle expansion.
 * - Use the `expand` event detail to synchronize nearby standalone targets (for example, set outside targets to overlapped while this group is open).
 * - Treat `collapsing` as component-managed runtime state unless you have a specific orchestration need.
 * - **TODO(designer):** Confirm whether external consumers should set `collapsing` directly, or if it should remain fully internal.
 *
 * ### Slots
 * | Slot | Renders When... | Purpose |
 * | --- | --- | --- |
 * | default | Always | Contains grouped `obc-poi-data` targets managed by this component. |
 *
 * ### Events
 * - `expand` - Fired when expand state changes. Detail: `{ expand: boolean }`.
 * - `collapse-finished` - Fired when the collapse animation has fully completed.
 *
 * ### Best Practices
 * - Keep grouped targets positioned consistently so wrapper bounds and front-target selection remain stable.
 * - Prefer one `obc-poi-group` per overlap cluster rather than nesting groups.
 * - Use `internalSwapping` only when live target crossing should reorder expanded items.
 *
 * ### Example
 * ```html
 * <obc-poi-group positionVertical="240px">
 *   <obc-poi-data x="300" button-y="240" y="240"></obc-poi-data>
 *   <obc-poi-data x="320" button-y="240" y="240"></obc-poi-data>
 *   <obc-poi-data x="340" button-y="240" y="240"></obc-poi-data>
 * </obc-poi-group>
 * ```
 *
 * @slot - Default slot for grouped `obc-poi-data` targets.
 * @fires expand {CustomEvent<{expand:boolean}>} Fired when the group expand state changes.
 * @fires collapse-finished {CustomEvent<void>} Fired after collapse animation completes.
 */
@customElement('obc-poi-group')
export class ObcPoiGroup extends LitElement {
  @property({type: Boolean}) expand = false;
  @property({type: Boolean}) collapsing = false;
  @property({type: String}) positionVertical = '0px';
  @property({type: Boolean, attribute: 'internal-swapping'})
  internalSwapping = false;
  @state() private wrapperOffsetX = '0px';
  @state() private wrapperWidth = '48px';
  @state() private wrapperVisible = false;
  @state() private wrapperHeight = '48px';
  @state() private wrapperHasValues = false;

  @queryAssignedElements({flatten: true})
  _children!: Array<HTMLElement>;

  private boundUpdatePosition: () => void;
  private topOffsetAnimationManager = new AnimationManager();
  private topOffsetProgress = 0;
  private slotChangeRaf = 0;
  private topOffsetTargets: Map<
    Poi,
    {
      originalX: number;
      expandedOffset: number;
      currentExpandedOffset: number;
      originalLeft: number;
    }
  > = new Map();
  private lockedExpandedCenter: number | null = null;
  private collapseDeltas: Map<Poi, number> = new Map();
  private topOffsetAnimationTarget: 0 | 1 | null = null;
  private pendingReleasedTarget: {
    target: Poi;
    promise: Promise<boolean>;
    resolve: (released: boolean) => void;
  } | null = null;

  constructor() {
    super();
    this.boundUpdatePosition = this.updatePosition.bind(this);
  }

  override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.updatePosition();
    this.syncFrontChild();
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', this.onSlotChange);
    if (!this.expand) {
      this.wrapperVisible = true;
    }
  }

  override connectedCallback() {
    super.connectedCallback();
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
    this.topOffsetAnimationManager.cancel();
    if (this.topOffsetDelayTimeout) {
      clearTimeout(this.topOffsetDelayTimeout);
      this.topOffsetDelayTimeout = null;
    }
    this.resolvePendingRelease(false);
    super.disconnectedCallback();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('expand')) {
      if (this.collapsing && this.expand) {
        this.expand = false;
        return;
      }
      this.setExpandedChildren(this.expand);
    }
  }

  override willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);
    // Prevent a one-frame wrapper flash when collapse starts.
    if (
      changedProperties.has('expand') &&
      !this.expand &&
      this.topOffsetProgress > 0
    ) {
      this.wrapperVisible = false;
    }
  }

  onBackdropClick(event: Event): void {
    event.stopPropagation();
    this.expand = false;
  }

  override render() {
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
              'with-values': this.wrapperHasValues,
            })}
            style="left: 0; top: ${this.positionVertical}; width: ${this
              .wrapperWidth}; height: ${this
              .wrapperHeight}; --obc-poi-group-wrapper-x: ${this
              .wrapperOffsetX};"
          >
            <div class="visible-wrapper"></div>
          </button>`
        : null}
    `;
  }

  updatePosition(): void {
    if (this.expand || this.collapsing) {
      return;
    }

    let left = Number.MAX_VALUE;
    let right = -Number.MAX_VALUE;
    let maxHeight = 0;
    let hasValueTargets = false;

    this._children.forEach((element) => {
      if (isPoi(element)) {
        const anchorRect = this.getTargetButtonRect(
          element,
          PoiDataVisualRectPreference.Anchor
        );
        const sizeRect = this.getTargetButtonRect(
          element,
          PoiDataVisualRectPreference.Group
        );
        left = Math.min(left, anchorRect.left);
        right = Math.max(right, anchorRect.right);
        maxHeight = Math.max(maxHeight, sizeRect.height || 0);
        if (Array.isArray(element.data) && element.data.length > 0) {
          hasValueTargets = true;
        }
        return;
      }

      const boundingBox = element.getBoundingClientRect();
      left = Math.min(left, boundingBox.left);
      right = Math.max(right, boundingBox.right);
      maxHeight = Math.max(maxHeight, boundingBox.height || 0);
    });

    if (left !== Number.MAX_VALUE && right !== -Number.MAX_VALUE) {
      const rootDim = this.getBoundingClientRect();
      const targetLeftPx = left - rootDim.left;
      const targetRightPx = right - rootDim.left;
      const targetWidth = Math.max(0, targetRightPx - targetLeftPx);
      this.wrapperOffsetX = `${targetLeftPx}px`;
      this.wrapperWidth = `${targetWidth}px`;
      const normalizedHeight = Number.isFinite(maxHeight)
        ? Math.max(48, Math.round(maxHeight))
        : 48;
      this.wrapperHeight = `${normalizedHeight}px`;
      this.wrapperHasValues = hasValueTargets;
    } else {
      this.wrapperOffsetX = '0px';
      this.wrapperWidth = '48px';
      this.wrapperHeight = '48px';
      this.wrapperHasValues = false;
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
    if (this.hasAttribute('data-exiting')) return;
    const hasTargets = this._children.some((child) => isPoi(child));
    if (!hasTargets) return;
    this.expand = true;
  }

  public releaseTarget(target: Poi): Promise<boolean> {
    if (target.parentElement !== this) {
      return Promise.resolve(false);
    }

    if (this.pendingReleasedTarget) {
      if (this.pendingReleasedTarget.target === target) {
        return this.pendingReleasedTarget.promise;
      }
      return Promise.resolve(false);
    }

    if (!this.expand && !this.collapsing) {
      this.releaseTargetToParent(target);
      return Promise.resolve(true);
    }

    let resolveRelease!: (released: boolean) => void;
    const promise = new Promise<boolean>((resolve) => {
      resolveRelease = resolve;
    });

    this.pendingReleasedTarget = {
      target,
      promise,
      resolve: resolveRelease,
    };
    this.expand = false;
    return promise;
  }

  setExpandedChildren(expand: boolean): void {
    this.dispatchEvent(
      new CustomEvent('expand', {
        detail: {expand: this.expand},
        bubbles: true,
        composed: true,
      })
    );
    const frontChild = this.getFrontChild();

    if (expand) {
      this.calculateTopOffsetTargets();
    }

    if (!expand) {
      if (this.topOffsetProgress > 0) {
        this.wrapperVisible = false;
      }
      this.lockedExpandedCenter = null;
    }

    if (!expand && frontChild) {
      this.appendChild(frontChild);
    }

    this.animateTopOffset(expand ? 1 : 0);
  }

  private calculateTopOffsetTargets(preserveCenter = false) {
    this.topOffsetTargets.clear();

    const targets = this._children.filter((child): child is Poi =>
      isPoi(child)
    );

    if (targets.length === 0) return;

    const positions = targets.map((child) => {
      const rect = this.getTargetButtonRect(child);
      const currentLeft = this.getCurrentLeft(child);
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
    const computedCenter = (leftMost + rightMost) / 2;
    const groupCenter =
      preserveCenter && this.lockedExpandedCenter !== null
        ? this.lockedExpandedCenter
        : computedCenter;
    if (!preserveCenter) {
      this.lockedExpandedCenter = groupCenter;
    }

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

  private topOffsetDelayTimeout: ReturnType<typeof setTimeout> | null = null;

  refreshExpandedLayout(preserveCenter = false): void {
    if (!this.expand) return;
    this.calculateTopOffsetTargets(preserveCenter);
    this.applyTopOffsetState(this.topOffsetProgress, this.getFrontChild());
    this.scheduleExpandedOffsets();
  }

  private animateTopOffset(targetProgress: number) {
    const normalizedTarget = targetProgress === 1 ? 1 : 0;
    const hasPendingOrRunningAnimation =
      this.topOffsetAnimationManager.isRunning() ||
      this.topOffsetDelayTimeout !== null;
    if (
      hasPendingOrRunningAnimation &&
      this.topOffsetAnimationTarget === normalizedTarget
    ) {
      return;
    }
    if (
      !hasPendingOrRunningAnimation &&
      Math.abs(this.topOffsetProgress - normalizedTarget) < 0.001
    ) {
      return;
    }

    this.topOffsetAnimationTarget = normalizedTarget;
    this.topOffsetAnimationManager.cancel();
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
    const isCollapsing = targetProgress === 0 && this.topOffsetProgress > 0;
    if (isCollapsing) {
      this.collapseDeltas.clear();
      this.topOffsetTargets.forEach((config, child) => {
        const currentLeft = this.getCurrentLeft(child);
        const delta = currentLeft - config.originalLeft;
        this.collapseDeltas.set(child, delta);
      });
      const delayMs = getCssVarAsNumber(
        this,
        TOP_OFFSET_ANIMATION_DELAY_MS_VAR,
        0
      );
      if (delayMs > 0) {
        this.topOffsetDelayTimeout = setTimeout(() => {
          this.topOffsetDelayTimeout = null;
          this.runTopOffsetAnimation(targetProgress, frontChild);
        }, delayMs);
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
    frontChild: Poi | null
  ) {
    const duration = getCssVarAsNumber(this, TOP_OFFSET_ANIMATION_MS_VAR, 100);

    this.topOffsetAnimationManager.start(
      targetProgress,
      this.topOffsetProgress,
      {
        duration,
        onUpdate: (progress) => {
          this.topOffsetProgress = progress;

          if (targetProgress === 1) {
            this.updateExpandedOffsets(true);
          }

          this.applyTopOffsetState(progress, frontChild);
        },
        onComplete: () => {
          this.topOffsetAnimationTarget = null;
          if (targetProgress === 0) {
            this.collapsing = false;
            this.releasePendingTarget();
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
        },
        onError: (error) => {
          console.error('[poi-group] Error in top offset animation:', error);
          this.topOffsetAnimationTarget = null;
          this.collapsing = false;
          this.resolvePendingRelease(false);
        },
      }
    );
  }
  private applyTopOffsetState(progress: number, frontChild: Poi | null) {
    const eased = easeInOutQuad(progress);
    const frontHeight = frontChild
      ? this.getTargetButtonRect(frontChild).height
      : null;

    const visualExpanded = this.collapsing ? false : progress > 0.5;
    const touchAreaExpanded = progress > 0.5;

    this.topOffsetTargets.forEach((config, child) => {
      if (child.parentElement !== this) {
        this.topOffsetTargets.delete(child);
        this.collapseDeltas.delete(child);
        this.lastAppliedOffsets.delete(child);
        return;
      }
      const isCollapsing = this.collapseDeltas.size > 0;
      let delta: number;
      if (isCollapsing) {
        delta = this.collapseDeltas.get(child) ?? 0;
      } else {
        const currentLeft = this.getCurrentLeft(child);
        delta = currentLeft - config.originalLeft;
      }

      const buttonOffsetX = (config.currentExpandedOffset - delta) * eased;
      child.setRuntimeHorizontalOffsets?.(buttonOffsetX, child.targetOffsetX);
      if (!child.setRuntimeHorizontalOffsets) {
        child.buttonOffsetX = buttonOffsetX;
      }

      if (child !== frontChild) {
        const isOverlap = !visualExpanded;
        const nextValue = this.resolveTargetValue(child, isOverlap);
        child.value = nextValue;
        if (nextValue === PoiDataValue.Overlapped) {
          applyPoiVisualState(
            child,
            true,
            getVisualTargetSize(
              this,
              child.buttonType === ObcPoiButtonType.Enhanced,
              true
            )
          );
        } else {
          clearPoiVisualState(child);
        }
        this.setOverlappedDataHeight(
          child,
          nextValue === PoiDataValue.Overlapped,
          frontHeight
        );
      } else {
        child.value = this.resolveTargetValue(child, false);
        clearPoiVisualState(child);
        this.setOverlappedDataHeight(child, false, frontHeight);
      }

      if (touchAreaExpanded) {
        const touchTarget = `${getTouchTargetSize(this)}px`;
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

  private getFrontChild(): Poi | null {
    const targets = this._children.filter((child): child is Poi =>
      isPoi(child)
    );

    if (targets.length === 0) return null;

    let front: Poi | null = null;
    let maxHeight = Number.NEGATIVE_INFINITY;
    const frontByAttr = targets.find((child) =>
      child.hasAttribute('data-front')
    );
    const epsilon = 0.001;

    for (const child of targets) {
      const yValue =
        typeof child.y === 'number' && Number.isFinite(child.y)
          ? child.y
          : Number.parseFloat(child.getAttribute('y') ?? '');
      if (Number.isNaN(yValue)) continue;

      if (yValue > maxHeight + epsilon) {
        maxHeight = yValue;
        front = child;
        continue;
      }

      if (
        Math.abs(yValue - maxHeight) <= epsilon &&
        frontByAttr &&
        child === frontByAttr
      ) {
        front = child;
      }
    }

    return front ?? targets[0] ?? null;
  }

  private syncFrontChild() {
    const front = this.getFrontChild();
    const frontHeight = front ? this.getTargetButtonRect(front).height : null;
    this._children.forEach((child) => {
      if (!isPoi(child)) return;
      const isOverlap = !this.expand && (!front || child !== front);
      const nextValue = this.resolveTargetValue(child, isOverlap);
      child.value = nextValue;
      if (nextValue === PoiDataValue.Overlapped) {
        applyPoiVisualState(
          child,
          true,
          getVisualTargetSize(
            this,
            child.buttonType === ObcPoiButtonType.Enhanced,
            true
          )
        );
      } else {
        clearPoiVisualState(child);
      }
      if (front && child === front) {
        child.setAttribute('data-front', 'true');
      } else {
        child.removeAttribute('data-front');
      }
      this.setOverlappedDataHeight(
        child,
        nextValue === PoiDataValue.Overlapped,
        frontHeight
      );
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
    try {
      this.updateExpandedOffsets();
      requestAnimationFrame(() => this.runExpandedLoop());
    } catch (error) {
      console.error('[poi-group] Error in expanded loop:', error);
      this.expandedLoopRunning = false;
    }
  }

  private stopExpandedObserver() {
    this.expandedLoopRunning = false;
    this.lastAppliedOffsets.clear();
    this.lastTargetOrder = [];
  }

  private scheduleExpandedOffsets() {
    if (!this.expand) return;
    this.updateExpandedOffsets();
  }

  private lastAppliedOffsets: Map<Poi, {buttonOffsetX: number}> = new Map();
  private lastTargetOrder: Poi[] = [];

  private updateExpandedOffsets(snap: boolean = false) {
    if (!this.expand) return;

    const targets = this._children.filter((child): child is Poi =>
      isPoi(child)
    );

    const sortedByCurrentPosition = [...targets]
      .map((child) => {
        const currentLeft = this.getCurrentLeft(child);
        return {child, currentLeft};
      })
      .sort((a, b) => a.currentLeft - b.currentLeft)
      .map((item) => item.child);

    const orderedTargets = this.internalSwapping
      ? sortedByCurrentPosition
      : this.lastTargetOrder.length > 0
        ? this.lastTargetOrder
        : sortedByCurrentPosition;

    const orderChanged =
      this.lastTargetOrder.length !== orderedTargets.length ||
      orderedTargets.some(
        (child, index) => this.lastTargetOrder[index] !== child
      );

    if (
      this.internalSwapping &&
      orderChanged &&
      this.lastTargetOrder.length > 0
    ) {
      const spacing = this.getExpandedSpacing();
      const totalWidth = (orderedTargets.length - 1) * spacing;

      const groupCenter =
        this.lockedExpandedCenter ??
        (() => {
          const positions = orderedTargets.map((child) => {
            return this.getCurrentLeft(child);
          });
          const leftMost = Math.min(...positions);
          const rightMost = Math.max(...positions);
          return (leftMost + rightMost) / 2;
        })();
      if (this.lockedExpandedCenter === null) {
        this.lockedExpandedCenter = groupCenter;
      }
      const startX = groupCenter - totalWidth / 2;

      orderedTargets.forEach((child, index) => {
        const config = this.topOffsetTargets.get(child);
        if (!config) return;

        const targetX = startX + index * spacing;
        const newExpandedOffset = targetX - config.originalX;

        config.expandedOffset = newExpandedOffset;
      });
    }

    this.lastTargetOrder = orderedTargets;

    targets.forEach((child) => {
      if (child.parentElement !== this) {
        this.topOffsetTargets.delete(child);
        this.lastAppliedOffsets.delete(child);
        return;
      }
      const config = this.topOffsetTargets.get(child);
      if (!config) return;

      const currentLeft = this.getCurrentLeft(child);
      const delta = currentLeft - config.originalLeft;

      if (snap) {
        config.currentExpandedOffset = config.expandedOffset;
      } else {
        config.currentExpandedOffset = frameLerp(
          config.currentExpandedOffset,
          config.expandedOffset,
          0.1
        );
      }

      const buttonOffsetX = config.currentExpandedOffset - delta;

      const last = this.lastAppliedOffsets.get(child);
      if (last && last.buttonOffsetX === buttonOffsetX) {
        return;
      }

      this.lastAppliedOffsets.set(child, {buttonOffsetX});
      child.setRuntimeHorizontalOffsets?.(buttonOffsetX, child.targetOffsetX);
      if (!child.setRuntimeHorizontalOffsets) {
        child.buttonOffsetX = buttonOffsetX;
      }
    });
  }

  private getCurrentLeft(element: HTMLElement): number {
    const computedLeft = getEffectivePoiX(element);
    const targetOffsetX =
      typeof (element as Poi).targetOffsetX === 'number' &&
      Number.isFinite((element as Poi).targetOffsetX)
        ? (element as Poi).targetOffsetX
        : 0;
    return computedLeft + targetOffsetX;
  }

  private getTargetButtonRect(
    target: Poi,
    preference: PoiDataVisualRectPreference = PoiDataVisualRectPreference.Group
  ): DOMRect {
    return target.getVisualRect(preference);
  }

  private getExpandedSpacing(): number {
    const baseSpacing = getCssVarAsNumber(this, POI_GROUP_SPACING_VAR, 50);
    return this.wrapperHasValues ? baseSpacing + 2 : baseSpacing;
  }

  private setOverlappedDataHeight(
    target: Poi,
    overlap: boolean,
    frontHeight: number | null
  ) {
    const dataLength = Array.isArray(target.data) ? target.data.length : 0;
    if (
      !overlap ||
      dataLength === 0 ||
      frontHeight === null ||
      !Number.isFinite(frontHeight)
    ) {
      target.style.removeProperty('--obc-poi-group-overlap-height');
      target.style.removeProperty('--obc-poi-group-overlap-shift');
      return;
    }

    const adjustedHeight = Math.max(0, frontHeight * 0.95);
    const shift = Math.max(0, frontHeight - adjustedHeight);
    target.style.setProperty(
      '--obc-poi-group-overlap-height',
      `${adjustedHeight}px`
    );
    target.style.setProperty('--obc-poi-group-overlap-shift', `${shift}px`);
  }

  private resolveTargetValue(target: Poi, overlap: boolean): PoiDataValue {
    if (overlap) {
      return PoiDataValue.Overlapped;
    }
    if (target.selected) {
      return PoiDataValue.Checked;
    }
    return PoiDataValue.Unchecked;
  }

  private releasePendingTarget() {
    const pending = this.pendingReleasedTarget;
    if (!pending) {
      return;
    }

    const released = this.releaseTargetToParent(pending.target);
    this.resolvePendingRelease(released);
  }

  private resolvePendingRelease(released: boolean) {
    const pending = this.pendingReleasedTarget;
    if (!pending) {
      return;
    }

    this.pendingReleasedTarget = null;
    pending.resolve(released);
  }

  private releaseTargetToParent(target: Poi): boolean {
    if (target.parentElement !== this) {
      return false;
    }

    target.setRuntimeHorizontalOffsets?.(0, 0);
    if (!target.setRuntimeHorizontalOffsets) {
      target.buttonOffsetX = 0;
      target.targetOffsetX = 0;
    }
    target.removeAttribute('data-grouped');
    target.removeAttribute('data-joined-expanded');
    target.removeAttribute('data-pregrouped');
    target.removeAttribute('data-behind');
    target.removeAttribute('data-front');
    target.removeAttribute('data-front-exit');
    target.removeAttribute('data-exiting');
    target.removeAttribute('data-exit-lock');
    target.style.removeProperty('position');
    target.style.removeProperty('width');
    target.style.removeProperty('min-width');
    target.style.removeProperty('height');
    target.style.removeProperty('transform');
    target.style.removeProperty('--obc-poi-group-overlap-height');
    target.style.removeProperty('--obc-poi-group-overlap-shift');
    clearPoiVisualState(target);

    const parent = this.parentElement;
    if (!parent) {
      return false;
    }

    parent.insertBefore(target, this);
    this.updatePosition();

    const groupParent = parent as HTMLElement & {
      requestGroupingUpdate?: () => void;
    };
    groupParent.requestGroupingUpdate?.();

    this.dispatchEvent(
      new CustomEvent<{target: Poi}>('obc-poi-group-target-released', {
        detail: {target},
        bubbles: true,
        composed: true,
      })
    );

    return true;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-group': ObcPoiGroup;
  }
}
