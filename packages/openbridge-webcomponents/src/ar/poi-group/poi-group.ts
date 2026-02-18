import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, queryAssignedElements, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-group.css?inline';
import {ObcPoiData, PoiDataValue} from '../poi-data/poi-data.js';
import {ObcPoiButtonType} from '../building-blocks/poi-button/poi-button.js';
import {customElement} from '../../decorator.js';
import {
  AnimationManager,
  easeInOutQuad,
  smoothStep,
} from './animation-utils.js';

const POI_TOUCH_TARGET_VAR = '--maneuvering-components-poi-button-touch-target';
const POI_GROUP_SPACING_VAR = '--obc-poi-group-expanded-spacing';
const TOP_OFFSET_ANIMATION_MS_VAR = '--obc-poi-group-top-offset-animation-ms';
const TOP_OFFSET_ANIMATION_DELAY_MS_VAR =
  '--obc-poi-group-top-offset-animation-delay-ms';
const POI_VISUAL_TARGET_VAR =
  '--maneuvering-components-poi-button-visual-target';
const POI_VISUAL_TARGET_OVERLAP_VAR =
  '--maneuvering-components-poi-button-visual-target-overlap';
const POI_LARGE_VISUAL_TARGET_VAR =
  '--maneuvering-components-poi-button-large-visual-target';
const POI_LARGE_VISUAL_TARGET_OVERLAP_VAR =
  '--maneuvering-components-poi-button-large-visual-target-round-overlap';

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
  @property({type: Boolean, reflect: true}) collapsing = false;
  @property({type: String}) positionVertical = '0px';
  @property({type: Boolean, attribute: 'internal-swapping'})
  internalSwapping = false;
  @state() private positionLeft = '0px';
  @state() private positionRight = '0px';
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
    ObcPoiData,
    {
      originalX: number;
      expandedOffset: number;
      currentExpandedOffset: number;
      originalLeft: number;
    }
  > = new Map();
  private lockedExpandedCenter: number | null = null;
  private collapseDeltas: Map<ObcPoiData, number> = new Map();
  private topOffsetAnimationTarget: 0 | 1 | null = null;

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
            style="left: ${this.positionLeft}; top: ${this
              .positionVertical}; right: ${this.positionRight}; height: ${this
              .wrapperHeight};"
          >
            <div class="visible-wrapper"></div>
          </button>`
        : null}
    `;
  }

  updatePosition(): void {
    let left = Number.MAX_VALUE;
    let right = -Number.MAX_VALUE;
    let maxHeight = 0;
    let hasValueTargets = false;

    this._children.forEach((element) => {
      const boundingBox =
        element instanceof ObcPoiData
          ? this.getTargetButtonRect(element)
          : element.getBoundingClientRect();
      left = Math.min(left, boundingBox.left);
      right = Math.max(right, boundingBox.right);
      maxHeight = Math.max(maxHeight, boundingBox.height || 0);
      if (element instanceof ObcPoiData && element.data.length > 0) {
        hasValueTargets = true;
      }
    });

    if (left !== Number.MAX_VALUE && right !== -Number.MAX_VALUE) {
      const rootDim = this.getBoundingClientRect();
      this.positionLeft = `${left - rootDim.left}px`;
      this.positionRight = `${rootDim.right - right}px`;
      const normalizedHeight = Number.isFinite(maxHeight)
        ? Math.max(48, Math.round(maxHeight))
        : 48;
      this.wrapperHeight = `${normalizedHeight}px`;
      this.wrapperHasValues = hasValueTargets;
    } else {
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
    const hasTargets = this._children.some(
      (child) => child instanceof ObcPoiData
    );
    if (!hasTargets) return;
    this.expand = true;
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

    const targets = this._children.filter(
      (child): child is ObcPoiData => child instanceof ObcPoiData
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
      const delayMs = this.getCssVarAsNumber(
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
    frontChild: ObcPoiData | null
  ) {
    const duration = this.getCssVarAsNumber(TOP_OFFSET_ANIMATION_MS_VAR, 100);

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
        },
      }
    );
  }
  private applyTopOffsetState(progress: number, frontChild: ObcPoiData | null) {
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
      child.buttonOffsetX = buttonOffsetX;

      if (child !== frontChild) {
        const isOverlap = !visualExpanded;
        const nextValue = this.resolveTargetValue(child, isOverlap);
        child.value = nextValue;
        if (nextValue === PoiDataValue.Overlapped) {
          this.applyVisualState(child, true);
        } else {
          this.clearVisualState(child);
        }
        this.setOverlappedDataHeight(
          child,
          nextValue === PoiDataValue.Overlapped,
          frontHeight
        );
      } else {
        child.value = this.resolveTargetValue(child, false);
        this.clearVisualState(child);
        this.setOverlappedDataHeight(child, false, frontHeight);
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

  private getFrontChild(): ObcPoiData | null {
    const targets = this._children.filter(
      (child): child is ObcPoiData => child instanceof ObcPoiData
    );

    if (targets.length === 0) return null;

    let front: ObcPoiData | null = null;
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
      if (!(child instanceof ObcPoiData)) return;
      const isOverlap = !this.expand && (!front || child !== front);
      const nextValue = this.resolveTargetValue(child, isOverlap);
      child.value = nextValue;
      if (nextValue === PoiDataValue.Overlapped) {
        this.applyVisualState(child, true);
      } else {
        this.clearVisualState(child);
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

  private lastAppliedOffsets: Map<ObcPoiData, {buttonOffsetX: number}> =
    new Map();
  private lastTargetOrder: ObcPoiData[] = [];

  private updateExpandedOffsets(snap: boolean = false) {
    if (!this.expand) return;

    const targets = this._children.filter(
      (child): child is ObcPoiData => child instanceof ObcPoiData
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
        config.currentExpandedOffset = smoothStep(
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
      child.buttonOffsetX = buttonOffsetX;
    });
  }

  private getCurrentLeft(element: HTMLElement): number {
    const inline = element.style.left;
    if (inline && inline.endsWith('px')) {
      const parsed = Number.parseFloat(inline);
      if (!Number.isNaN(parsed)) {
        const transformOffset = Number.parseFloat(
          getComputedStyle(element).getPropertyValue(
            '--obc-poi-target-offset-x'
          )
        );
        return (
          parsed + (Number.isFinite(transformOffset) ? transformOffset : 0)
        );
      }
    }

    const computedStyle = window.getComputedStyle(element).left;
    const computedLeft = Number.parseFloat(computedStyle) || 0;
    const transformOffset = Number.parseFloat(
      getComputedStyle(element).getPropertyValue('--obc-poi-target-offset-x')
    );
    return (
      computedLeft + (Number.isFinite(transformOffset) ? transformOffset : 0)
    );
  }

  private getTargetButtonRect(target: ObcPoiData): DOMRect {
    const targetShadow = target.shadowRoot;
    const poi = targetShadow?.querySelector('obc-poi') as
      | HTMLElement
      | undefined;
    const poiButton = poi?.shadowRoot?.querySelector('obc-poi-button') as
      | HTMLElement
      | undefined;
    const dataButton = targetShadow?.querySelector('obc-poi-button-data') as
      | HTMLElement
      | undefined;
    const button = poiButton ?? dataButton;
    const buttonShadow = button?.shadowRoot;
    const buttonWrapper = buttonShadow?.querySelector(
      '.button-wrapper'
    ) as HTMLElement | null;
    const wrapper = buttonShadow?.querySelector(
      '.wrapper'
    ) as HTMLElement | null;
    const hasDataWrapper = wrapper?.classList.contains('has-data') ?? false;
    return (
      (hasDataWrapper ? wrapper?.getBoundingClientRect() : null) ??
      buttonWrapper?.getBoundingClientRect() ??
      wrapper?.getBoundingClientRect() ??
      button?.getBoundingClientRect() ??
      poi?.getBoundingClientRect() ??
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
    const baseSpacing = this.getCssVarAsNumber(POI_GROUP_SPACING_VAR, 50);
    return this.wrapperHasValues ? baseSpacing + 2 : baseSpacing;
  }

  private getVisualTargetSize(isEnhanced: boolean, isOverlap: boolean): number {
    if (isEnhanced) {
      return isOverlap
        ? this.getCssVarAsNumber(POI_LARGE_VISUAL_TARGET_OVERLAP_VAR, 36)
        : this.getCssVarAsNumber(POI_LARGE_VISUAL_TARGET_VAR, 52);
    }
    return isOverlap
      ? this.getCssVarAsNumber(POI_VISUAL_TARGET_OVERLAP_VAR, 32)
      : this.getCssVarAsNumber(POI_VISUAL_TARGET_VAR, 36);
  }

  private applyVisualState(target: ObcPoiData, overlap: boolean) {
    const isEnhanced = target.buttonType === ObcPoiButtonType.Enhanced;
    const size = this.getVisualTargetSize(isEnhanced, overlap);
    target.style.setProperty('--poi-size', `${size}px`);
    target.style.setProperty(
      '--obc-poi-target-icon-opacity',
      overlap ? '0' : '1'
    );
    target.style.setProperty('--obc-poi-overlap', overlap ? '1' : '0');
    target.style.setProperty(
      '--obc-poi-overlap-elements-opacity',
      overlap ? '0' : '1'
    );
    target.style.setProperty('--obc-poi-label-opacity', overlap ? '0' : '1');
    target.style.setProperty(
      '--obc-poi-label-visibility',
      overlap ? 'hidden' : 'visible'
    );
    target.style.setProperty(
      '--obc-poi-overlap-pointer-events',
      overlap ? 'none' : 'auto'
    );
  }

  private clearVisualState(target: ObcPoiData) {
    target.style.removeProperty('--poi-size');
    target.style.removeProperty('--obc-poi-target-icon-opacity');
    target.style.removeProperty('--obc-poi-overlap');
    target.style.removeProperty('--obc-poi-overlap-elements-opacity');
    target.style.removeProperty('--obc-poi-label-opacity');
    target.style.removeProperty('--obc-poi-label-visibility');
    target.style.removeProperty('--obc-poi-overlap-pointer-events');
  }

  private setOverlappedDataHeight(
    target: ObcPoiData,
    overlap: boolean,
    frontHeight: number | null
  ) {
    if (
      !overlap ||
      target.data.length === 0 ||
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

  private resolveTargetValue(
    _target: ObcPoiData,
    overlap: boolean
  ): PoiDataValue {
    if (overlap) {
      return PoiDataValue.Overlapped;
    }
    return PoiDataValue.Unchecked;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-group': ObcPoiGroup;
  }
}
