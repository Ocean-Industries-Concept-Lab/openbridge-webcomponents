import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-layer.css?inline';
import '../poi-group/poi-group.js';
import {PoiDataValue, PoiDataVisualRectPreference} from '../poi/poi-data.js';
import {Poi, isPoi, POI_ATTR} from '../poi/poi.js';
import {ObcPoiButtonType} from '../poi-button/poi-button.js';
import {
  buildAdjacencyMaps,
  buildClusters,
  type GroupingThresholds,
} from './poi-layer-grouping-utils.js';
import {updateCrossingModeState} from './poi-layer-crossing-utils.js';
import {getEffectivePoiX} from '../poi/poi-position.js';
import {easeInOutQuad} from '../poi-group/animation-utils.js';

const EXIT_DELAY_MS_VAR = '--obc-poi-layer-exit-delay-ms';
const GROUP_REMOVAL_DELAY_MS_VAR = '--obc-poi-layer-group-removal-delay-ms';
const EXIT_LOCK_DURATION_MS_VAR = '--obc-poi-layer-exit-lock-duration-ms';

const POI_TOUCH_TARGET_VAR = '--maneuvering-components-poi-button-touch-target';
const POI_VISUAL_TARGET_VAR =
  '--maneuvering-components-poi-button-visual-target-round';
const POI_VISUAL_TARGET_OVERLAP_VAR =
  '--maneuvering-components-poi-button-visual-target-round-overlap';
const POI_LARGE_VISUAL_TARGET_VAR =
  '--maneuvering-components-poi-button-large-visual-target-round';
const POI_LARGE_VISUAL_TARGET_OVERLAP_VAR =
  '--maneuvering-components-poi-button-large-visual-target-round-overlap';
const POI_CROSSING_MIN_GAP_VAR = '--obc-poi-layer-crossing-min-gap';

interface PoiButtonGroupElement extends HTMLElement {
  expand?: boolean;
  collapsing?: boolean;
  updatePosition?: () => void;
  refreshExpandedLayout?: (preserveCenter?: boolean) => void;
  internalSwapping?: boolean;
}

export enum OverlapMode {
  Grouping = 'grouping',
  Crossing = 'crossing',
}

/**
 * `<obc-poi-layer>` - A POI layout container that resolves overlapping targets by grouping or crossing strategies.
 *
 * This component watches slotted POI targets, applies overlap state/visual rules, and coordinates automatic `obc-poi-group` creation when needed.
 * Use it as the main layer container when you want centralized overlap behavior plus layer height updates for parent layout systems.
 *
 * ### Features
 * - Overlap strategies: `overlapMode="grouping"` builds overlap clusters; `overlapMode="crossing"` continuously adjusts horizontal offsets to reduce crossings.
 * - Auto-group lifecycle: Creates/removes auto groups and preserves front/behind/pre-group states during transitions.
 * - Manual group support: Respects existing `obc-poi-group` elements and can optionally join nearby targets while a group is expanded (`joinWhileExpanded`).
 * - Dynamic observation: Reacts to slot changes, target style/position mutations, and target size changes to recompute grouping and layer height.
 * - Layer diagnostics: `debug` shows a label overlay using `label`.
 * - Selection flag: `isSelected` reflects to attribute but has no direct runtime layout logic in this class.
 * - Group ordering option: `internalSwapping` is forwarded to groups to allow expanded ordering updates based on movement.
 *
 * ### Usage Guidelines
 * - Place `obc-poi-data` targets (and optional `obc-poi-group`) in the default slot.
 * - Choose `overlapMode` based on behavior:
 *   - `grouping`: best when overlaps should collapse into expandable clusters.
 *   - `crossing`: best when targets stay independent but should separate horizontally.
 * - Listen for `layer-resize` to keep parent containers in sync with computed layer height.
 * - Enable `joinWhileExpanded` only when targets should be able to join an already expanded auto-group.
 * - **TODO(designer):** Confirm intended user-visible behavior for `isSelected`, since it currently reflects an attribute but is not consumed by the layer logic here.
 *
 * ### Slots
 * | Slot | Renders When... | Purpose |
 * | --- | --- | --- |
 * | default | Always | Hosts POI targets (`obc-poi-data*`) and optional manual `obc-poi-group` elements. |
 *
 * ### Events
 * - `layer-resize` - Fired when computed layer height changes. Detail: `{ height: number, label: string }`.
 *
 * ### Best Practices
 * - Keep POI targets as direct descendants when possible to reduce grouping ambiguity.
 * - Use stable `x`/`y` updates for animated scenarios so grouping and crossing calculations remain predictable.
 * - Avoid adding non-POI interactive wrappers inside the layer unless needed, as layer observers track POI-related descendants.
 *
 * ### Example
 * ```html
 * <obc-poi-layer label="Targets" overlapMode="grouping" debug>
 *   <obc-poi-data x="180" y="110"></obc-poi-data>
 *   <obc-poi-data x="205" y="90"></obc-poi-data>
 *   <obc-poi-data x="230" y="100"></obc-poi-data>
 * </obc-poi-layer>
 * ```
 *
 * @slot - Default slot for POI targets and optional POI groups.
 * @fires layer-resize {CustomEvent<{height:number,label:string}>} Fired when the layer height changes.
 */
@customElement('obc-poi-layer')
export class ObcPoiLayer extends LitElement {
  @property({type: String}) label = '';
  @property({type: Boolean}) debug = false;
  @property({type: String}) overlapMode: OverlapMode = OverlapMode.Grouping;
  @property({type: Boolean})
  isSelected = false;
  @property({type: Boolean, attribute: 'join-while-expanded'})
  joinWhileExpanded = false;
  @property({type: Boolean, attribute: 'internal-swapping'})
  internalSwapping = false;

  @query('.wrapper') private wrapper?: HTMLElement;

  private resizeObserver?: ResizeObserver;
  private targetResizeObserver?: ResizeObserver;
  private lastHeight = 0;
  private isGrouping = false;
  private targetObservers = new Map<Poi, MutationObserver>();
  private targetSizeElements = new Map<Poi, HTMLElement>();
  private groupingRaf = 0;
  private heightRaf = 0;
  private groupRemovalTimers = new WeakMap<HTMLElement, number>();
  private exitLockTimers = new Map<HTMLElement, number>();
  private layerMutationObserver?: MutationObserver;
  private autoGroupCollapseTimeout = 0;
  private crossingModeRaf = 0;
  private cachedCrossingTargets: Poi[] = [];
  private crossingTargetsDirty = false;
  private crossingOrder: Poi[] = [];
  private crossingLastEffectiveX = new Map<Poi, number>();
  private previousPositions = new Map<Poi, number>();
  private lastOffsets = new Map<Poi, number>();
  private static readonly GROUP_LAYER_HOOK_ATTR = 'data-in-poi-layer';
  private handleSlotChange = () => {
    this.updateTargetObservers();
    this.scheduleGrouping();
    this.scheduleLayerHeightUpdate();
  };
  private handleCollapseFinished = () => {
    this.scheduleGrouping();
  };

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasUpdated) return;
    this.setupResizeObserver();
    this.setupTargetResizeObserver();
    this.setupLayerMutationObserver();
    this.updateTargetObservers();
    this.scheduleGrouping();
    this.scheduleLayerHeightUpdate();
    this.addLayerEventListeners();
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', this.handleSlotChange);
  }

  override firstUpdated() {
    this.crossingTargetsDirty = true;
    this.setupResizeObserver();
    this.setupTargetResizeObserver();
    this.setupLayerMutationObserver();
    this.updateTargetObservers();
    this.scheduleGrouping();
    this.scheduleLayerHeightUpdate();
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', this.handleSlotChange);
    requestAnimationFrame(() => {
      this.updateTargetObservers();
      this.scheduleLayerHeightUpdate();
    });
    this.addLayerEventListeners();
  }

  private handlePoiDataLayoutChange = () => {
    this.scheduleGrouping();
    this.scheduleLayerHeightUpdate();
  };

  private handleGroupExpand = (event: CustomEvent<{expand: boolean}>) => {
    const group = event.target as HTMLElement;
    if (!group?.tagName?.toLowerCase().includes('group')) return;
    if (group.hasAttribute('data-exiting')) return;

    const targets = this.getAllTargets();
    const groupedTargets = new Set<Poi>(this.getGroupTargets(group));
    if (groupedTargets.size === 0) return;

    if (event.detail.expand) {
      targets.forEach((target) => {
        if (!groupedTargets.has(target)) {
          const nextValue = this.resolveTargetValue(target, true);
          target.value = nextValue;
          if (nextValue === PoiDataValue.Overlapped) {
            this.applyStandaloneVisualState(target, true);
          } else {
            this.clearStandaloneVisualState(target);
          }
        }
      });
    }
  };

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeLayerEventListeners();
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.removeEventListener('slotchange', this.handleSlotChange);
    this.resizeObserver?.disconnect();
    this.targetResizeObserver?.disconnect();
    this.layerMutationObserver?.disconnect();
    this.targetObservers.forEach((observer) => observer.disconnect());
    this.targetObservers.clear();
    this.targetSizeElements.clear();
    if (this.groupingRaf) {
      cancelAnimationFrame(this.groupingRaf);
      this.groupingRaf = 0;
    }
    if (this.crossingModeRaf) {
      cancelAnimationFrame(this.crossingModeRaf);
      this.crossingModeRaf = 0;
    }
    this.previousPositions.clear();
    if (this.heightRaf) {
      cancelAnimationFrame(this.heightRaf);
      this.heightRaf = 0;
    }
    this.exitLockTimers.forEach((timerId) => window.clearTimeout(timerId));
    this.exitLockTimers.clear();
    if (this.autoGroupCollapseTimeout) {
      window.clearTimeout(this.autoGroupCollapseTimeout);
      this.autoGroupCollapseTimeout = 0;
    }
    this.buttonOffsetXResetRaf.forEach((rafId) => cancelAnimationFrame(rafId));
    this.buttonOffsetXResetRaf.clear();
    this.lastOffsets.clear();
    this.crossingLastEffectiveX.clear();
  }

  private addLayerEventListeners() {
    this.addEventListener(
      'obc-poi-data-layout-change',
      this.handlePoiDataLayoutChange as EventListener
    );
    this.addEventListener('expand', this.handleGroupExpand as EventListener);
    this.addEventListener(
      'collapse-finished',
      this.handleCollapseFinished as EventListener
    );
  }

  private removeLayerEventListeners() {
    this.removeEventListener(
      'obc-poi-data-layout-change',
      this.handlePoiDataLayoutChange as EventListener
    );
    this.removeEventListener('expand', this.handleGroupExpand as EventListener);
    this.removeEventListener(
      'collapse-finished',
      this.handleCollapseFinished as EventListener
    );
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.updateLayerHeight(entry.contentRect.height);
      }
    });
    if (this.wrapper) {
      this.resizeObserver.observe(this.wrapper);
      this.updateLayerHeight(this.wrapper.getBoundingClientRect().height);
    }
  }

  private setupTargetResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;
    if (this.targetResizeObserver) return;
    this.targetResizeObserver = new ResizeObserver(() =>
      this.scheduleLayerHeightUpdate()
    );
  }

  private scheduleLayerHeightUpdate() {
    if (this.heightRaf) return;
    this.heightRaf = requestAnimationFrame(() => {
      this.heightRaf = 0;
      this.syncLayerHeight();
    });
  }

  private syncLayerHeight() {
    if (!this.isConnected) return;
    const minHeight = this.getLayerMinHeight();
    const heightFloor = this.getLayerHeightFloor(minHeight);
    const targets = this.getAllTargets();
    if (targets.length === 0) {
      const nextHeight = heightFloor;
      this.style.setProperty('--obc-poi-layer-height', `${nextHeight}px`);
      this.updateLayerHeight(nextHeight);
      return;
    }
    const rects = new Map<Poi, DOMRect>();
    targets.forEach((target) => rects.set(target, this.getTargetRect(target)));
    let maxHeight = 0;
    rects.forEach((rect) => {
      const height = rect?.height ?? 0;
      if (Number.isFinite(height)) {
        maxHeight = Math.max(maxHeight, height);
      }
    });
    const nextHeight = Math.max(maxHeight, heightFloor);
    if (nextHeight <= 0) {
      this.style.setProperty('--obc-poi-layer-height', '0px');
      this.updateLayerHeight(0);
      return;
    }
    const roundedHeight = Math.round(nextHeight);
    this.style.setProperty('--obc-poi-layer-height', `${roundedHeight}px`);
    this.updateLayerHeight(roundedHeight);
  }

  private getLayerMinHeight(): number {
    const minHeightRaw = getComputedStyle(this).minHeight;
    const minHeight = Number.parseFloat(minHeightRaw);
    return Number.isFinite(minHeight) ? minHeight : 0;
  }

  private getLayerHeightFloor(minHeight: number): number {
    if (!this.hasAttribute('data-stack-inactive')) {
      return minHeight;
    }

    return Math.max(minHeight, this.lastHeight);
  }

  private updateLayerHeight(nextHeight: number) {
    const roundedHeight = Math.round(nextHeight);
    if (roundedHeight === this.lastHeight) return;
    this.lastHeight = roundedHeight;
    this.dispatchEvent(
      new CustomEvent('layer-resize', {
        detail: {
          height: roundedHeight,
          label: this.label,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private updateTargetObservers() {
    const targets = this.getAllTargets();
    const targetSet = new Set(targets);

    this.targetObservers.forEach((observer, target) => {
      if (!targetSet.has(target)) {
        observer.disconnect();
        this.targetObservers.delete(target);
      }
    });

    targets.forEach((target) => {
      if (this.targetObservers.has(target)) return;
      const observer = new MutationObserver(() => {
        this.scheduleGrouping();
        this.scheduleLayerHeightUpdate();
      });
      observer.observe(target, {
        attributes: true,
        attributeFilter: ['style', 'y', 'button-y'],
      });
      this.targetObservers.set(target, observer);
    });
    this.updateTargetSizeObservers(targets, targetSet);
  }

  private updateTargetSizeObservers(targets: Poi[], targetSet: Set<Poi>) {
    if (!this.targetResizeObserver) return;
    this.targetSizeElements.forEach((element, target) => {
      if (!targetSet.has(target) || !element.isConnected) {
        this.targetResizeObserver?.unobserve(element);
        this.targetSizeElements.delete(target);
      }
    });
    targets.forEach((target) => {
      const sizeElement = this.getTargetSizeElement(target);
      if (!sizeElement) return;
      const existing = this.targetSizeElements.get(target);
      if (existing === sizeElement) return;
      if (existing) {
        this.targetResizeObserver?.unobserve(existing);
      }
      this.targetResizeObserver?.observe(sizeElement);
      this.targetSizeElements.set(target, sizeElement);
    });
  }

  private getTargetSizeElement(target: Poi): HTMLElement | null {
    return target.getVisualElement(PoiDataVisualRectPreference.Size);
  }

  private isPoiLayerRelevantNode(node: HTMLElement): boolean {
    if (isPoi(node) || node.tagName.toLowerCase() === 'obc-poi-group')
      return true;
    return !!node.querySelector(`[${POI_ATTR}], obc-poi-group`);
  }

  private setupLayerMutationObserver() {
    this.layerMutationObserver?.disconnect();
    this.layerMutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== 'childList') continue;
        const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
        for (const node of nodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (this.isPoiLayerRelevantNode(node)) {
            this.updateTargetObservers();
            this.scheduleGrouping();
            this.scheduleLayerHeightUpdate();
            this.crossingTargetsDirty = true;
            return;
          }
        }
      }
    });
    this.layerMutationObserver.observe(this, {childList: true, subtree: true});
  }

  public requestGroupingUpdate() {
    this.scheduleGrouping();
    this.scheduleLayerHeightUpdate();
  }

  private scheduleGrouping() {
    if (this.overlapMode === OverlapMode.Crossing) {
      this.scheduleCrossingMode();
      return;
    }
    if (this.groupingRaf) return;
    this.groupingRaf = requestAnimationFrame(() => {
      this.groupingRaf = 0;
      this.updateGrouping();
    });
  }

  private scheduleCrossingMode() {
    if (this.crossingModeRaf) return;
    this.crossingModeRaf = requestAnimationFrame(() => {
      try {
        this.crossingModeRaf = 0;
        const shouldContinue = this.updateCrossingMode();
        if (
          this.overlapMode === OverlapMode.Crossing &&
          this.isConnected &&
          shouldContinue
        ) {
          this.scheduleCrossingMode();
        }
      } catch (error) {
        console.error('[poi-layer] Error in crossing mode:', error);
        this.crossingModeRaf = 0;
      }
    });
  }

  private updateCrossingMode(): boolean {
    if (this.crossingTargetsDirty) {
      this.cachedCrossingTargets = this.getAllTargets();
      this.crossingTargetsDirty = false;
    }
    const targets = this.cachedCrossingTargets;
    const buttonWidth = this.getTouchTargetSize();
    const minGap = this.getCssVarAsNumber(
      POI_CROSSING_MIN_GAP_VAR,
      buttonWidth + 4
    );
    const next = updateCrossingModeState({
      targets,
      buttonWidth,
      minGap,
      previousPositions: this.previousPositions,
      lastOffsets: this.lastOffsets,
      crossingOrder: this.crossingOrder,
      crossingLastEffectiveX: this.crossingLastEffectiveX,
    });
    this.previousPositions = next.previousPositions;
    this.crossingOrder = next.crossingOrder;
    return next.shouldContinue;
  }

  private toggleGroupLayerHook(group: HTMLElement, hasTargets: boolean) {
    if (hasTargets) {
      group.setAttribute(ObcPoiLayer.GROUP_LAYER_HOOK_ATTR, '');
    } else {
      group.removeAttribute(ObcPoiLayer.GROUP_LAYER_HOOK_ATTR);
    }
  }

  private updateGrouping() {
    if (this.isGrouping) return;
    this.isGrouping = true;
    try {
      const manualGroups = (
        Array.from(
          this.querySelectorAll('obc-poi-group')
        ) as PoiButtonGroupElement[]
      ).filter((group) => !group.hasAttribute('data-auto-group'));
      const manualGroupedTargets = new Set<HTMLElement>();
      manualGroups.forEach((group) => {
        const groupTargets = this.getGroupTargets(group);
        this.toggleGroupLayerHook(group, groupTargets.length > 0);
        groupTargets.forEach((target) => manualGroupedTargets.add(target));
      });
      if (manualGroups.length > 0) {
        const anyExpanded = manualGroups.some(
          (group) => group.expand === true || group.collapsing === true
        );
        if (anyExpanded) {
          return;
        }
      }

      const targets = this.getAllTargets().filter(
        (target) =>
          !manualGroupedTargets.has(target) &&
          !target.hasAttribute('data-stack-returning')
      );

      const layerRect = this.getBoundingClientRect();
      const enterRaw = getComputedStyle(this).getPropertyValue(
        '--obc-poi-layer-overlap-enter'
      );
      const exitRaw = getComputedStyle(this).getPropertyValue(
        '--obc-poi-layer-overlap-exit'
      );
      const preRaw = getComputedStyle(this).getPropertyValue(
        '--obc-poi-layer-overlap-pre'
      );
      const behindRaw = getComputedStyle(this).getPropertyValue(
        '--obc-poi-layer-overlap-behind'
      );
      const enterThreshold = Number.parseFloat(enterRaw) || 0;
      const exitThreshold =
        Number.parseFloat(exitRaw) || Math.max(enterThreshold + 8, 8);
      const preThreshold = Number.parseFloat(preRaw) || enterThreshold;
      const behindThreshold = Number.parseFloat(behindRaw) || enterThreshold;

      const currentGroupByTarget = new Map<Poi, HTMLElement>();
      targets.forEach((target) => {
        const parent = target.parentElement;
        if (parent?.tagName.toLowerCase() === 'obc-poi-group') {
          currentGroupByTarget.set(target, parent as HTMLElement);
        }
      });

      const rects = new Map<Poi, DOMRect>();
      targets.forEach((target) => {
        rects.set(target, this.getTargetRectForGrouping(target, layerRect));
      });

      const thresholds: GroupingThresholds = {
        enterThreshold,
        exitThreshold,
        preThreshold,
        behindThreshold,
      };

      const {adjacency, behindAdjacency, preGrouped} = buildAdjacencyMaps(
        targets,
        rects,
        thresholds,
        currentGroupByTarget
      );

      const clusters = buildClusters(targets, adjacency);
      const behindClusters = buildClusters(targets, behindAdjacency);

      const existingGroups = Array.from(
        this.querySelectorAll('obc-poi-group[data-auto-group]')
      ) as PoiButtonGroupElement[];

      const frontTargets = new Set<Poi>();
      clusters.forEach((cluster) => {
        const front = this.getFrontTarget(cluster, rects);
        if (front) frontTargets.add(front);
      });

      const behindTargets = new Set<Poi>();
      behindClusters.forEach((cluster) => {
        const behind = this.getShortestTarget(cluster, rects);
        if (behind) behindTargets.add(behind);
      });

      const expandedAutoGroup = existingGroups.find(
        (group) => group.expand === true || group.collapsing === true
      );
      if (expandedAutoGroup) {
        if (this.joinWhileExpanded) {
          this.tryJoinExpandedGroup(
            expandedAutoGroup,
            targets,
            rects,
            enterThreshold
          );
        }
        return;
      }

      const remainingClusters = [...clusters];
      const keptGroups: HTMLElement[] = [];

      existingGroups.forEach((group) => {
        const children = Array.from(group.children).filter(
          (child): child is Poi => isPoi(child)
        );
        const matchIndex = remainingClusters.findIndex(
          (cluster) =>
            cluster.length === children.length &&
            cluster.every((target) => children.includes(target))
        );
        if (matchIndex >= 0) {
          keptGroups.push(group);
          group.removeAttribute('data-exiting');
          group.setAttribute('data-visible', 'true');
          remainingClusters.splice(matchIndex, 1);
        } else {
          const front = this.getFrontTarget(children, rects);
          children.forEach((child) => {
            if (front && child === front) {
              child.setAttribute('data-front', 'true');
              child.setAttribute('data-front-exit', 'true');
            } else {
              child.removeAttribute('data-front');
            }
          });
          children.forEach((child) => {
            if (!front || child !== front) {
              child.setAttribute('data-exiting', 'true');
              this.startExitLock(child);
            } else {
              child.removeAttribute('data-exiting');
              child.removeAttribute('data-exit-lock');
            }
            child.removeAttribute('data-grouped');
            this.resetTarget(child);
          });
          group.removeAttribute('data-visible');
          group.setAttribute('data-exiting', 'true');
          children.forEach((child) => this.appendChild(child));
          children.forEach((child) => {
            if (!front || child !== front) {
              child.getBoundingClientRect();
            }
          });
          const exitDelay = this.getCssVarAsNumber(EXIT_DELAY_MS_VAR, 140);
          window.setTimeout(() => {
            children.forEach((child) => {
              if (!front || child !== front) {
                child.removeAttribute('data-exiting');
              }
            });
          }, exitDelay);
          requestAnimationFrame(() => {
            this.scheduleGroupRemoval(group);
          });
        }
      });

      remainingClusters.forEach((cluster) => {
        const group = document.createElement('obc-poi-group');
        group.setAttribute('data-auto-group', 'true');
        group.setAttribute('data-position-mode', 'bottom');
        group.setAttribute('data-visible', 'true');
        (group as PoiButtonGroupElement).internalSwapping =
          !!this.internalSwapping;
        group.setAttribute(
          'positionVertical',
          `${this.getGroupPositionVertical(cluster, rects, layerRect, group)}px`
        );
        cluster.forEach((target) => {
          target.removeAttribute('data-grouped');
          group.appendChild(target);
        });
        this.appendChild(group);
        requestAnimationFrame(() => {
          cluster.forEach((target) =>
            target.setAttribute('data-grouped', 'true')
          );
        });
        keptGroups.push(group);
      });

      const groupedTargets = new Set<Poi>();
      keptGroups.forEach((group) => {
        Array.from(group.children).forEach((child) => {
          if (isPoi(child)) groupedTargets.add(child);
        });
      });

      targets.forEach((target) => {
        if (!groupedTargets.has(target)) {
          const exitLocked = target.hasAttribute('data-exit-lock');
          target.removeAttribute('data-grouped');
          target.removeAttribute('data-joined-expanded');
          if (target.hasAttribute('data-front-exit')) {
            target.setAttribute('data-front', 'true');
            target.removeAttribute('data-pregrouped');
          } else if (frontTargets.has(target)) {
            target.setAttribute('data-front', 'true');
            target.removeAttribute('data-pregrouped');
          } else if (preGrouped.has(target) && !exitLocked) {
            target.removeAttribute('data-front');
            target.setAttribute('data-pregrouped', 'true');
          } else {
            target.removeAttribute('data-front');
            target.removeAttribute('data-pregrouped');
          }
          if (
            !exitLocked &&
            behindTargets.has(target) &&
            !frontTargets.has(target)
          ) {
            target.setAttribute('data-behind', 'true');
          } else {
            target.removeAttribute('data-behind');
          }
          if (exitLocked) {
            target.removeAttribute('data-pregrouped');
            target.removeAttribute('data-behind');
          }
          const isOverlapState = target.hasAttribute('data-behind');
          const nextValue = this.resolveTargetValue(target, isOverlapState);
          target.value = nextValue;
          if (nextValue === PoiDataValue.Overlapped) {
            this.applyStandaloneVisualState(target, true);
          } else {
            this.clearStandaloneVisualState(target);
          }
          this.resetTarget(target);
        } else {
          target.removeAttribute('data-behind');
          this.clearStandaloneVisualState(target);
        }
      });

      this.refreshGroupPositions(layerRect, rects);

      requestAnimationFrame(() => {
        targets.forEach((target) => target.removeAttribute('data-front-exit'));
      });

      this.scheduleLayerHeightUpdate();
    } finally {
      this.isGrouping = false;
    }
  }

  private tryJoinExpandedGroup(
    group: PoiButtonGroupElement,
    targets: Poi[],
    rects: Map<Poi, DOMRect>,
    enterThreshold: number
  ) {
    const groupTargets = this.getGroupTargets(group);
    if (groupTargets.length === 0) return;

    const groupTargetSet = new Set(groupTargets);
    const candidates = targets.filter(
      (target) =>
        !groupTargetSet.has(target) &&
        target.parentElement?.tagName.toLowerCase() !== 'obc-poi-group'
    );
    if (candidates.length === 0) return;

    const useButtonRects = group.expand === true || group.collapsing === true;
    const groupCenters = groupTargets
      .map((target) =>
        useButtonRects ? this.getTargetRect(target) : rects.get(target)
      )
      .filter((rect): rect is DOMRect => !!rect)
      .map((rect) => rect.left + rect.width / 2);
    if (groupCenters.length === 0) return;

    const leftMost = Math.min(...groupCenters);
    const rightMost = Math.max(...groupCenters);
    const groupCenter = (leftMost + rightMost) / 2;

    let bestCandidate: Poi | null = null;
    let bestGap = Number.POSITIVE_INFINITY;

    for (const candidate of candidates) {
      const candidateRect = useButtonRects
        ? this.getTargetRect(candidate)
        : rects.get(candidate);
      if (!candidateRect) continue;
      for (const member of groupTargets) {
        const memberRect = useButtonRects
          ? this.getTargetRect(member)
          : rects.get(member);
        if (!memberRect) continue;
        const overlapHeight =
          Math.min(candidateRect.bottom, memberRect.bottom) -
          Math.max(candidateRect.top, memberRect.top);
        if (overlapHeight <= 0) continue;
        const gap = Math.max(
          0,
          Math.max(candidateRect.left, memberRect.left) -
            Math.min(candidateRect.right, memberRect.right)
        );
        if (gap <= enterThreshold && gap < bestGap) {
          bestGap = gap;
          bestCandidate = candidate;
        }
      }
    }

    if (!bestCandidate) return;

    bestCandidate.setAttribute('data-joined-expanded', 'true');

    const candidateRect = rects.get(bestCandidate);
    const candidateCenter =
      candidateRect?.left !== undefined
        ? candidateRect.left + candidateRect.width / 2
        : 0;
    const insertBefore = candidateCenter < groupCenter;

    if (insertBefore) {
      group.insertBefore(bestCandidate, groupTargets[0] ?? null);
    } else {
      group.appendChild(bestCandidate);
    }

    bestCandidate.setAttribute('data-grouped', 'true');
    bestCandidate.removeAttribute('data-behind');
    bestCandidate.removeAttribute('data-pregrouped');
    bestCandidate.value = this.resolveTargetValue(bestCandidate, false);
    this.clearStandaloneVisualState(bestCandidate);

    const touchRaw = getComputedStyle(group).getPropertyValue(
      '--maneuvering-components-poi-button-touch-target'
    );
    const touchSize = Number.parseFloat(touchRaw) || 0;
    if (touchSize > 0) {
      const touchTarget = `${touchSize}px`;
      bestCandidate.style.width = touchTarget;
      bestCandidate.style.minWidth = touchTarget;
      bestCandidate.style.height = touchTarget;
    }

    group.refreshExpandedLayout?.(true);
  }

  private applyStandaloneVisualState(target: Poi, overlap: boolean) {
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

  private resolveTargetValue(target: Poi, overlap: boolean): PoiDataValue {
    if (overlap) {
      return PoiDataValue.Overlapped;
    }

    if (target.selected) {
      return PoiDataValue.Checked;
    }
    return PoiDataValue.Unchecked;
  }

  private clearStandaloneVisualState(target: HTMLElement) {
    target.style.removeProperty('--poi-size');
    target.style.removeProperty('--obc-poi-target-icon-opacity');
    target.style.removeProperty('--obc-poi-overlap');
    target.style.removeProperty('--obc-poi-overlap-elements-opacity');
    target.style.removeProperty('--obc-poi-label-opacity');
    target.style.removeProperty('--obc-poi-label-visibility');
    target.style.removeProperty('--obc-poi-overlap-pointer-events');
  }

  private refreshGroupPositions(
    layerRect?: DOMRect,
    rects?: Map<Poi, DOMRect>
  ) {
    const groups = Array.from(
      this.querySelectorAll('obc-poi-group')
    ) as PoiButtonGroupElement[];
    groups.forEach((group) => {
      const children = Array.from(group.children).filter(
        (child): child is Poi => isPoi(child)
      );
      this.toggleGroupLayerHook(group, children.length > 0);
      const hasPositionAttr =
        group.hasAttribute('positionvertical') ||
        group.hasAttribute('positionVertical');
      if (
        !group.hasAttribute('data-auto-group') &&
        !group.hasAttribute('data-position-mode')
      ) {
        group.setAttribute('data-position-mode', 'bottom');
      }
      const shouldSetPosition =
        group.hasAttribute('data-auto-group') || !hasPositionAttr;
      if (group.hasAttribute('data-auto-group')) {
        (group as PoiButtonGroupElement).internalSwapping =
          !!this.internalSwapping;
      }
      if (children.length > 0 && shouldSetPosition) {
        const layerBounds = layerRect ?? this.getBoundingClientRect();
        const rectMap =
          rects ??
          new Map(
            children.map((child) => [
              child,
              this.getTargetRectForGrouping(child, layerBounds),
            ])
          );
        group.setAttribute(
          'positionVertical',
          `${this.getGroupPositionVertical(children, rectMap, layerBounds, group)}px`
        );
      }
      group.updatePosition?.();
    });
  }

  private getGroupPositionVertical(
    targets: Poi[],
    rects: Map<Poi, DOMRect>,
    layerRect: DOMRect,
    group?: PoiButtonGroupElement
  ) {
    let maxBottom = Number.NEGATIVE_INFINITY;
    targets.forEach((target) => {
      const rect = rects.get(target) ?? target.getBoundingClientRect();
      maxBottom = Math.max(maxBottom, rect.bottom);
    });
    const baseBottom = maxBottom - layerRect.top;
    const isAutoGroup = group?.hasAttribute('data-auto-group') ?? false;
    const offsetRaw = getComputedStyle(this).getPropertyValue(
      '--obc-poi-layer-auto-group-offset-y'
    );
    let offset = Number.parseFloat(offsetRaw) || 0;
    if (isAutoGroup && this.closest('obc-poi-layer-stack')) {
      offset = 0;
    }
    return Math.round(baseBottom + offset);
  }

  private resetTarget(target: Poi) {
    if (typeof target.targetOffsetX === 'number') {
      target.setRuntimeHorizontalOffsets?.(target.buttonOffsetX, 0);
      if (!target.setRuntimeHorizontalOffsets) {
        target.targetOffsetX = 0;
      }
    }
    this.animateButtonOffsetXToZero(target);
    target.style.removeProperty('--obc-poi-target-offset-x');
    target.style.removeProperty('position');
    target.style.removeProperty('width');
    target.style.removeProperty('min-width');
    target.style.removeProperty('height');
    target.style.removeProperty('transform');
    target.style.removeProperty('--obc-poi-group-overlap-height');
    target.style.removeProperty('--obc-poi-group-overlap-shift');
  }

  private buttonOffsetXResetRaf = new Map<Poi, number>();

  private animateButtonOffsetXToZero(target: Poi) {
    const start = target.buttonOffsetX;
    if (!Number.isFinite(start) || Math.abs(start) < 0.5) {
      target.setRuntimeHorizontalOffsets?.(0, target.targetOffsetX);
      if (!target.setRuntimeHorizontalOffsets) {
        target.buttonOffsetX = 0;
      }
      return;
    }

    const existing = this.buttonOffsetXResetRaf.get(target);
    if (existing) {
      cancelAnimationFrame(existing);
    }

    const duration = 100;
    const startTime = performance.now();
    const step = (now: number) => {
      try {
        if (!target.isConnected) {
          this.buttonOffsetXResetRaf.delete(target);
          return;
        }
        const t = Math.min((now - startTime) / duration, 1);
        const eased = easeInOutQuad(t);
        const nextButtonOffsetX = start + (0 - start) * eased;
        target.setRuntimeHorizontalOffsets?.(
          nextButtonOffsetX,
          target.targetOffsetX
        );
        if (!target.setRuntimeHorizontalOffsets) {
          target.buttonOffsetX = nextButtonOffsetX;
        }
        if (t < 1) {
          this.buttonOffsetXResetRaf.set(target, requestAnimationFrame(step));
        } else {
          this.buttonOffsetXResetRaf.delete(target);
        }
      } catch (error) {
        console.error('[poi-layer] Error in button offset reset:', error);
        this.buttonOffsetXResetRaf.delete(target);
      }
    };

    this.buttonOffsetXResetRaf.set(target, requestAnimationFrame(step));
  }

  private scheduleGroupRemoval(group: HTMLElement) {
    const existing = this.groupRemovalTimers.get(group);
    if (existing) {
      window.clearTimeout(existing);
    }
    group.setAttribute('data-exiting', 'true');
    const removalDelay = this.getCssVarAsNumber(
      GROUP_REMOVAL_DELAY_MS_VAR,
      250
    );
    const timeoutId = window.setTimeout(() => {
      group.remove();
      this.groupRemovalTimers.delete(group);
    }, removalDelay);
    this.groupRemovalTimers.set(group, timeoutId);
  }

  private startExitLock(target: HTMLElement) {
    target.setAttribute('data-exit-lock', 'true');
    const existing = this.exitLockTimers.get(target);
    if (existing) window.clearTimeout(existing);
    const lockDuration = this.getCssVarAsNumber(EXIT_LOCK_DURATION_MS_VAR, 500);
    const timeoutId = window.setTimeout(() => {
      target.removeAttribute('data-exit-lock');
      this.exitLockTimers.delete(target);
    }, lockDuration);
    this.exitLockTimers.set(target, timeoutId);
  }

  private getFrontTarget(targets: Poi[], rects?: Map<Poi, DOMRect>) {
    if (targets.length === 0) return null;
    let front = targets[0];
    let maxHeight = this.getTargetHeight(front, rects);
    targets.forEach((target) => {
      const height = this.getTargetHeight(target, rects);
      if (height > maxHeight) {
        maxHeight = height;
        front = target;
      }
    });
    return front;
  }

  private getTargetRect(target: HTMLElement): DOMRect {
    if (isPoi(target)) {
      return target.getVisualRect(PoiDataVisualRectPreference.Largest);
    }
    return target.getBoundingClientRect();
  }

  private getTargetRectForGrouping(
    target: HTMLElement,
    layerRect: DOMRect
  ): DOMRect {
    const rect = this.getTargetRect(target);
    const leftValue = getEffectivePoiX(target);
    if (!Number.isFinite(leftValue)) return rect;
    const width = rect.width || 0;
    const height = rect.height || 0;
    const left = layerRect.left + leftValue - width / 2;
    const top = layerRect.bottom - height;
    return new DOMRect(left, top, width, height);
  }

  private getTargetHeight(target: Poi, rects?: Map<Poi, DOMRect>): number {
    const targetY = Number.isFinite(target.y ?? NaN) ? (target.y ?? 0) : null;
    const yAttr = target.getAttribute('y');
    const yValue = Number.parseFloat(yAttr ?? '');
    const attrTargetY = !Number.isNaN(yValue) ? yValue : null;
    const buttonY =
      typeof target.buttonY === 'number' && Number.isFinite(target.buttonY)
        ? target.buttonY
        : null;
    const buttonYAttr = target.getAttribute('button-y');
    const buttonYValue = Number.parseFloat(buttonYAttr ?? '');
    const attrButtonY = !Number.isNaN(buttonYValue) ? buttonYValue : null;
    const logicalHeight = Math.max(
      targetY ?? 0,
      attrTargetY ?? 0,
      buttonY ?? 0,
      attrButtonY ?? 0
    );
    if (logicalHeight > 0) {
      return logicalHeight;
    }
    const rect = rects?.get(target) ?? this.getTargetRect(target);
    return rect.height;
  }

  private getShortestTarget(targets: Poi[], rects?: Map<Poi, DOMRect>) {
    if (targets.length === 0) return null;
    let shortest = targets[0];
    let minHeight = this.getTargetHeight(shortest, rects);
    targets.forEach((target) => {
      const height = this.getTargetHeight(target, rects);
      if (height < minHeight) {
        minHeight = height;
        shortest = target;
      }
    });
    return shortest;
  }

  private getAllTargets(): Poi[] {
    return Array.from(this.querySelectorAll(`[${POI_ATTR}]`)).filter(
      (node): node is Poi =>
        isPoi(node) && !node.hasAttribute('data-stack-selected')
    );
  }

  private getGroupTargets(group: ParentNode): Poi[] {
    return Array.from(group.querySelectorAll(`[${POI_ATTR}]`)).filter(
      (node): node is Poi => isPoi(node)
    );
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('isSelected')) {
      this.dispatchEvent(new Event('layer-selection-changed', {bubbles: true}));
    }
  }

  override render() {
    return html`
      <div class="wrapper${this.debug ? ' debug' : ''}">
        ${this.debug
          ? html`<span class="debug-label">${this.label || 'Layer'}</span>`
          : nothing}
        <slot></slot>
      </div>
    `;
  }

  private getCssVarAsNumber(varName: string, fallback: number): number {
    const raw = getComputedStyle(this).getPropertyValue(varName).trim();
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  private getTouchTargetSize(): number {
    return this.getCssVarAsNumber(POI_TOUCH_TARGET_VAR, 48);
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

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-layer': ObcPoiLayer;
  }
}
