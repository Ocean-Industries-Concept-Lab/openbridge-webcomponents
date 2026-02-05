import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-layer.css?inline';
import '../poi-group/poi-group.js';
import {ObcPoiData, PoiDataValue} from '../poi-data/poi-data.js';
import {ObcPoiButtonType} from '../building-blocks/poi-button/poi-button.js';

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

/**
 * Grouping utilities for POI layer overlap detection and clustering
 */

/**
 * Interface for grouping thresholds
 */
interface GroupingThresholds {
  enterThreshold: number;
  exitThreshold: number;
  preThreshold: number;
  behindThreshold: number;
}

/**
 * Build clusters of connected elements using depth-first search
 * @param targets - Array of targets to cluster
 * @param adjacency - Adjacency map showing which targets are connected
 * @returns Array of clusters (arrays of connected targets)
 */
function buildClusters<T>(targets: T[], adjacency: Map<T, Set<T>>): T[][] {
  const visited = new Set<T>();
  const clusters: T[][] = [];

  targets.forEach((target) => {
    if (visited.has(target)) return;

    const stack = [target];
    const cluster: T[] = [];
    visited.add(target);

    while (stack.length > 0) {
      const node = stack.pop()!;
      cluster.push(node);
      adjacency.get(node)!.forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }

    if (cluster.length >= 2) {
      clusters.push(cluster);
    }
  });

  return clusters;
}

/**
 * Check if two rectangles overlap vertically and are within horizontal threshold
 */
function checkOverlap(
  rectA: DOMRect,
  rectB: DOMRect,
  threshold: number
): {overlaps: boolean; gap: number; overlapHeight: number} {
  const overlapHeight =
    Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top);
  const gap = Math.max(
    0,
    Math.max(rectA.left, rectB.left) - Math.min(rectA.right, rectB.right)
  );

  return {
    overlaps: gap <= threshold && overlapHeight > 0,
    gap,
    overlapHeight,
  };
}

/**
 * Build adjacency maps for overlap detection at different thresholds
 */
function buildAdjacencyMaps<T extends HTMLElement>(
  targets: T[],
  rects: Map<T, DOMRect>,
  thresholds: GroupingThresholds,
  currentGroupByTarget: Map<T, HTMLElement>
): {
  adjacency: Map<T, Set<T>>;
  preAdjacency: Map<T, Set<T>>;
  behindAdjacency: Map<T, Set<T>>;
  preGrouped: Set<T>;
} {
  const adjacency = new Map<T, Set<T>>();
  const preAdjacency = new Map<T, Set<T>>();
  const behindAdjacency = new Map<T, Set<T>>();
  const preGrouped = new Set<T>();

  targets.forEach((target) => {
    adjacency.set(target, new Set());
    preAdjacency.set(target, new Set());
    behindAdjacency.set(target, new Set());
  });

  for (let i = 0; i < targets.length; i += 1) {
    const a = targets[i];
    const ra = rects.get(a)!;

    for (let j = i + 1; j < targets.length; j += 1) {
      const b = targets[j];
      const rb = rects.get(b)!;

      const sameGroup =
        currentGroupByTarget.get(a) &&
        currentGroupByTarget.get(a) === currentGroupByTarget.get(b);
      const threshold = sameGroup
        ? thresholds.exitThreshold
        : thresholds.enterThreshold;

      const overlap = checkOverlap(ra, rb, threshold);
      const preOverlap = checkOverlap(ra, rb, thresholds.preThreshold);
      const behindOverlap = checkOverlap(ra, rb, thresholds.behindThreshold);

      if (preOverlap.overlaps) {
        preGrouped.add(a);
        preGrouped.add(b);
        preAdjacency.get(a)!.add(b);
        preAdjacency.get(b)!.add(a);
      }

      if (behindOverlap.overlaps) {
        behindAdjacency.get(a)!.add(b);
        behindAdjacency.get(b)!.add(a);
      }

      if (overlap.overlaps) {
        adjacency.get(a)!.add(b);
        adjacency.get(b)!.add(a);
      }
    }
  }

  return {adjacency, preAdjacency, behindAdjacency, preGrouped};
}

/**
 * Interface for POI button group element properties used by the layer.
 */
interface PoiButtonGroupElement extends HTMLElement {
  expand?: boolean;
  collapsing?: boolean;
  useTopOffset: boolean;
  updatePosition?: () => void;
  refreshExpandedLayout?: (preserveCenter?: boolean) => void;
  internalSwapping?: boolean;
}

export enum OverlapMode {
  Grouping = 'grouping',
  Crossing = 'crossing',
}

export enum PoiLayerRole {
  Default = 'default',
  Selected = 'selected',
  Filtered = 'filtered',
}

/**
 * `<obc-poi-layer>` arranges POI targets in a layer and manages grouping,
 * overlap, and layout updates for slotted targets.
 *
 * Use this component inside `obc-poi-layer-stack` to coordinate multiple layers
 * and keep selection or overlap behaviors consistent across a stack.
 *
 * ### Features
 * - Observes slotted targets and groups to compute layout.
 * - Emits a resize event when the layer height changes.
 * - Optional debug labeling for layer identification.
 *
 * ### Usage Guidelines
 * - Set `label` to identify the layer in debug UI and events.
 * - Toggle `debug` to render the on-layer label.
 * - Set `layerIndex` to control ordering within a stack.
 * - Use `role` to assign stack placement behavior (default/selected/filtered).
 * - Use `typeFilter` with `role="filtered"` to route specific target types.
 *
 * ### Slots
 * - Default slot for `obc-poi-data` and `obc-poi-group`.
 *
 * ### Events
 * - `layer-resize` when the computed layer height changes.
 *
 * ### Example
 * ```html
 * <obc-poi-layer label="Radar" layerIndex="1">
 *   <obc-poi-data x="120" height="200"></obc-poi-data>
 *   <obc-poi-data x="240" height="220"></obc-poi-data>
 * </obc-poi-layer>
 * ```
 *
 * @slot - Default slot for `obc-poi-data` and `obc-poi-group`.
 * @fires {CustomEvent} layer-resize - Fired when the layer height changes.
 */
@customElement('obc-poi-layer')
export class ObcPoiLayer extends LitElement {
  @property({type: String}) label = '';
  @property({type: Boolean, reflect: true}) debug = false;
  @property({type: Number}) layerIndex = 0;
  @property({type: String}) overlapMode: OverlapMode = OverlapMode.Grouping;
  @property({type: String}) override role: PoiLayerRole = PoiLayerRole.Default;
  @property({type: String, attribute: 'type-filter'}) typeFilter = '';
  @property({type: Boolean, attribute: 'join-while-expanded'})
  joinWhileExpanded = false;
  @property({type: Boolean, attribute: 'internal-swapping'})
  internalSwapping = false;

  @query('.wrapper') private wrapper?: HTMLElement;

  private resizeObserver?: ResizeObserver;
  private targetResizeObserver?: ResizeObserver;
  private lastHeight = 0;
  private isGrouping = false;
  private targetObservers = new Map<HTMLElement, MutationObserver>();
  private targetSizeElements = new Map<HTMLElement, HTMLElement>();
  private groupingRaf = 0;
  private heightRaf = 0;
  private groupRemovalTimers = new WeakMap<HTMLElement, number>();
  private exitLockTimers = new Map<HTMLElement, number>();
  private layerMutationObserver?: MutationObserver;
  private autoGroupCollapseTimeout = 0;
  private crossingModeRaf = 0;
  private cachedCrossingTargets: ObcPoiData[] = [];
  private crossingTargetsDirty = false;
  private crossingOrder: ObcPoiData[] = [];
  private crossingLastEffectiveX = new Map<ObcPoiData, number>();
  private previousPositions = new Map<HTMLElement, number>();
  private lastOffsets = new Map<HTMLElement, number>();
  private static readonly GROUP_LAYER_HOOK_ATTR = 'data-in-poi-layer';

  override firstUpdated() {
    this.crossingTargetsDirty = true;
    this.setupResizeObserver();
    this.setupTargetResizeObserver();
    this.setupLayerMutationObserver();
    this.updateTargetObservers();
    this.scheduleGrouping();
    this.scheduleLayerHeightUpdate();
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', () => {
      this.updateTargetObservers();
      this.scheduleGrouping();
      this.scheduleLayerHeightUpdate();
    });
    this.addEventListener('expand', this.handleGroupExpand as EventListener);
    this.addEventListener('collapse-finished', () => {
      this.scheduleGrouping();
    });
  }

  private handleGroupExpand = (event: CustomEvent<{expand: boolean}>) => {
    const group = event.target as HTMLElement;
    if (!group?.tagName?.toLowerCase().includes('group')) return;

    const targets = Array.from(
      this.querySelectorAll('obc-poi-data')
    ) as ObcPoiData[];
    const groupedTargets = new Set<HTMLElement>(
      Array.from(group.querySelectorAll('obc-poi-data')) as ObcPoiData[]
    );

    if (event.detail.expand) {
      targets.forEach((target) => {
        if (!groupedTargets.has(target)) {
          target.value = PoiDataValue.Overlapped;
          this.applyStandaloneVisualState(target, true);
        }
      });
    } else {
      this.scheduleGrouping();
    }
  };

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('expand', this.handleGroupExpand as EventListener);
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
    const targets = Array.from(
      this.querySelectorAll('obc-poi-data')
    ) as HTMLElement[];
    if (targets.length === 0) {
      this.style.removeProperty('--obc-poi-layer-height');
      const wrapperHeight = this.wrapper?.getBoundingClientRect().height ?? 0;
      this.updateLayerHeight(wrapperHeight);
      return;
    }
    const rects = new Map<HTMLElement, DOMRect>();
    targets.forEach((target) => rects.set(target, this.getTargetRect(target)));
    let maxHeight = 0;
    rects.forEach((rect) => {
      const height = rect?.height ?? 0;
      if (Number.isFinite(height)) {
        maxHeight = Math.max(maxHeight, height);
      }
    });
    const minHeight = this.getLayerMinHeight();
    const nextHeight = Math.max(maxHeight, minHeight);
    if (nextHeight <= 0) return;
    const roundedHeight = Math.round(nextHeight);
    this.style.setProperty('--obc-poi-layer-height', `${roundedHeight}px`);
    this.updateLayerHeight(roundedHeight);
  }

  private getLayerMinHeight(): number {
    const minHeightRaw = getComputedStyle(this).minHeight;
    const minHeight = Number.parseFloat(minHeightRaw);
    return Number.isFinite(minHeight) ? minHeight : 0;
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
          layerIndex: this.layerIndex,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private updateTargetObservers() {
    const targets = Array.from(
      this.querySelectorAll('obc-poi-data')
    ) as HTMLElement[];
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
        attributeFilter: ['style', 'y', 'height'],
      });
      this.targetObservers.set(target, observer);
    });
    this.updateTargetSizeObservers(targets, targetSet);
  }

  private updateTargetSizeObservers(
    targets: HTMLElement[],
    targetSet: Set<HTMLElement>
  ) {
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

  private getTargetSizeElement(target: HTMLElement): HTMLElement | null {
    const targetShadow = target.shadowRoot;
    const button = targetShadow?.querySelector('obc-poi-button-data') as
      | HTMLElement
      | undefined;
    const buttonShadow = button?.shadowRoot;
    return (
      (buttonShadow?.querySelector('.wrapper') as HTMLElement | null) ?? null
    );
  }

  private setupLayerMutationObserver() {
    this.layerMutationObserver?.disconnect();
    this.layerMutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== 'childList') continue;
        const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
        for (const node of nodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (
            node.tagName.toLowerCase() === 'obc-poi-data' ||
            node.tagName.toLowerCase() === 'obc-poi-group' ||
            node.querySelector?.('obc-poi-data') ||
            node.querySelector?.('obc-poi-group')
          ) {
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
      this.cachedCrossingTargets = Array.from(
        this.querySelectorAll('obc-poi-data')
      ) as ObcPoiData[];
      this.crossingTargetsDirty = false;
    }
    const targets = this.cachedCrossingTargets;

    if (targets.length < 2) {
      targets.forEach((target) => {
        target.buttonOffsetX = 0;
        target.offset = 0;
        this.lastOffsets.set(target, 0);
      });
      this.lastOffsets.clear();
      this.previousPositions.clear();
      this.crossingOrder = [];
      return false;
    }

    const currentPositions = new Map<HTMLElement, number>();
    const movingTargetsSet = new Set<HTMLElement>();
    const deltas = new Map<ObcPoiData, number>();

    const buttonWidth = this.getTouchTargetSize();
    const minGap = this.getCssVarAsNumber(
      POI_CROSSING_MIN_GAP_VAR,
      buttonWidth + 4
    );

    targets.forEach((target) => {
      const leftStr = target.style.left;
      const left = Number.parseFloat(leftStr) || 0;
      currentPositions.set(target, left);

      const prevPos = this.previousPositions.get(target);
      if (prevPos !== undefined && Math.abs(left - prevPos) > 0.5) {
        movingTargetsSet.add(target);
        deltas.set(target, left - prevPos);
      }
    });

    const orderIndex = new Map<ObcPoiData, number>();
    this.crossingOrder.forEach((target, index) => {
      orderIndex.set(target, index);
    });

    const orderedTargets = targets
      .map((target) => {
        const left = currentPositions.get(target) ?? 0;
        return {
          target,
          center: left + buttonWidth / 2,
          isMoving: movingTargetsSet.has(target),
        };
      })
      .sort((a, b) => {
        const delta = a.center - b.center;
        if (Math.abs(delta) > 0.5) return delta;
        return (
          (orderIndex.get(a.target) ?? 0) - (orderIndex.get(b.target) ?? 0)
        );
      });

    const targetOffsets = new Map<ObcPoiData, number>();
    orderedTargets.forEach((item) => targetOffsets.set(item.target, 0));

    let hasActiveOverlaps = false;
    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    let primaryMoving: ObcPoiData | null = null;
    let primaryDelta = 0;
    deltas.forEach((delta, target) => {
      if (!primaryMoving || Math.abs(delta) > Math.abs(primaryDelta)) {
        primaryMoving = target;
        primaryDelta = delta;
      }
    });
    const travelDir = primaryDelta >= 0 ? 1 : -1;

    if (primaryMoving) {
      const movingItem = orderedTargets.find(
        (item) => item.target === primaryMoving
      );
      if (movingItem) {
        let nearest: {center: number; target: ObcPoiData} | null = null;
        for (const other of orderedTargets) {
          if (other.target === movingItem.target) continue;
          const dist = Math.abs(other.center - movingItem.center);
          if (!nearest || dist < Math.abs(nearest.center - movingItem.center)) {
            nearest = {center: other.center, target: other.target};
          }
        }
        if (nearest) {
          const gap = Math.abs(nearest.center - movingItem.center);
          if (gap < minGap) {
            hasActiveOverlaps = true;
            const ratio = Math.min(1, Math.max(0, 1 - gap / minGap));
            const eased = smoothstep(ratio);
            const push = (minGap - gap) * eased;
            targetOffsets.set(movingItem.target, -push * travelDir);
          }
        }
      }
    }

    const positionsChanged = movingTargetsSet.size > 0;

    if (!hasActiveOverlaps) {
      targets.forEach((target) => {
        target.buttonOffsetX = 0;
        target.offset = 0;
        this.lastOffsets.set(target, 0);
      });
      this.lastOffsets.forEach((_, target) => {
        if (!currentPositions.has(target)) this.lastOffsets.delete(target);
      });
      this.previousPositions = currentPositions;
      this.crossingOrder = orderedTargets.map((item) => item.target);
      this.crossingLastEffectiveX.clear();
      return positionsChanged;
    }

    orderedTargets.forEach((item) => {
      const targetOffset =
        primaryMoving && item.target === primaryMoving
          ? (targetOffsets.get(item.target) ?? 0)
          : 0;
      const prevOffset = this.lastOffsets.get(item.target) ?? 0;
      const diff = targetOffset - prevOffset;
      const deadZone = 0.5;
      let nextOffset =
        Math.abs(diff) < deadZone ? targetOffset : prevOffset + diff * 0.2;

      if (primaryMoving && item.target === primaryMoving) {
        const baseCenter =
          (currentPositions.get(item.target) ?? 0) + buttonWidth / 2;
        const prevEffective =
          this.crossingLastEffectiveX.get(item.target) ?? baseCenter;
        const nextEffective = baseCenter + nextOffset;
        if (travelDir > 0 && nextEffective < prevEffective) {
          nextOffset = prevEffective - baseCenter;
        } else if (travelDir < 0 && nextEffective > prevEffective) {
          nextOffset = prevEffective - baseCenter;
        }
        this.crossingLastEffectiveX.set(item.target, baseCenter + nextOffset);
      } else {
        this.crossingLastEffectiveX.delete(item.target);
      }

      if (nextOffset !== 0) {
        item.target.buttonOffsetX = nextOffset;
        item.target.offset = -nextOffset;
      } else {
        item.target.buttonOffsetX = 0;
        item.target.offset = 0;
      }
      this.lastOffsets.set(item.target, nextOffset);
    });

    this.lastOffsets.forEach((_, target) => {
      if (!currentPositions.has(target)) this.lastOffsets.delete(target);
    });

    this.previousPositions = currentPositions;
    this.crossingOrder = orderedTargets.map((item) => item.target);
    return positionsChanged || hasActiveOverlaps;
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

    const manualGroups = (
      Array.from(
        this.querySelectorAll('obc-poi-group')
      ) as PoiButtonGroupElement[]
    ).filter((group) => !group.hasAttribute('data-auto-group'));
    const manualGroupedTargets = new Set<HTMLElement>();
    manualGroups.forEach((group) => {
      const groupTargets = Array.from(
        group.querySelectorAll('obc-poi-data')
      ) as ObcPoiData[];
      this.toggleGroupLayerHook(group, groupTargets.length > 0);
      groupTargets.forEach((target) => manualGroupedTargets.add(target));
    });
    if (manualGroups.length > 0) {
      const anyExpanded = manualGroups.some(
        (group) => group.expand === true || group.collapsing === true
      );
      if (anyExpanded) {
        this.isGrouping = false;
        return;
      }
    }

    const targets = Array.from(this.querySelectorAll('obc-poi-data')).filter(
      (target) => !manualGroupedTargets.has(target)
    ) as ObcPoiData[];

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

    const currentGroupByTarget = new Map<HTMLElement, HTMLElement>();
    targets.forEach((target) => {
      const parent = target.parentElement;
      if (parent?.tagName.toLowerCase() === 'obc-poi-group') {
        currentGroupByTarget.set(target, parent as HTMLElement);
      }
    });

    const rects = new Map<HTMLElement, DOMRect>();
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

    const frontTargets = new Set<HTMLElement>();
    clusters.forEach((cluster) => {
      const front = this.getFrontTarget(cluster);
      if (front) frontTargets.add(front);
    });

    const behindTargets = new Set<HTMLElement>();
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
      this.isGrouping = false;
      return;
    }

    const remainingClusters = [...clusters];
    const keptGroups: HTMLElement[] = [];

    existingGroups.forEach((group) => {
      const children = Array.from(group.children).filter(
        (child): child is HTMLElement =>
          child.tagName.toLowerCase() === 'obc-poi-data'
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
        const front = this.getFrontTarget(children);
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
          this.resetTarget(child as ObcPoiData);
        });
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
          group.removeAttribute('data-visible');
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

    const groupedTargets = new Set<HTMLElement>();
    keptGroups.forEach((group) => {
      Array.from(group.children).forEach((child) => {
        if (child instanceof HTMLElement) groupedTargets.add(child);
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
        target.value = isOverlapState
          ? PoiDataValue.Overlapped
          : PoiDataValue.Unchecked;
        if (isOverlapState) {
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
    this.isGrouping = false;
  }

  private tryJoinExpandedGroup(
    group: PoiButtonGroupElement,
    targets: ObcPoiData[],
    rects: Map<HTMLElement, DOMRect>,
    enterThreshold: number
  ) {
    const groupTargets = Array.from(
      group.querySelectorAll('obc-poi-data')
    ) as ObcPoiData[];
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

    let bestCandidate: ObcPoiData | null = null;
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
    bestCandidate.value = PoiDataValue.Unchecked;
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

  private applyStandaloneVisualState(target: ObcPoiData, overlap: boolean) {
    const isEnhanced = target.type === ObcPoiButtonType.Enhanced;
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
    rects?: Map<HTMLElement, DOMRect>
  ) {
    const groups = Array.from(
      this.querySelectorAll('obc-poi-group')
    ) as PoiButtonGroupElement[];
    groups.forEach((group) => {
      const children = Array.from(group.children).filter(
        (child): child is HTMLElement =>
          child.tagName.toLowerCase() === 'obc-poi-data'
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
    targets: HTMLElement[],
    rects: Map<HTMLElement, DOMRect>,
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
    const useTopOffset = group?.useTopOffset !== false;
    const transformFactor = useTopOffset ? 0 : isAutoGroup ? 1 : 0.5;
    const offsetRaw = getComputedStyle(this).getPropertyValue(
      '--obc-poi-layer-auto-group-offset-y'
    );
    let offset = Number.parseFloat(offsetRaw) || 0;
    if (isAutoGroup && this.closest('obc-poi-layer-stack')) {
      offset = 0;
    }
    return Math.round(baseBottom - layerRect.height * transformFactor + offset);
  }

  private resetTarget(target: ObcPoiData) {
    if (typeof target.offset === 'number') {
      target.offset = 0;
    }
    this.animateTopOffsetToZero(target);
    if (typeof target.buttonOffsetX === 'number') {
      target.buttonOffsetX = 0;
    }
    target.style.removeProperty('--obc-poi-target-offset-x');
    target.style.removeProperty('position');
    target.style.removeProperty('width');
    target.style.removeProperty('min-width');
    target.style.removeProperty('height');
    target.style.removeProperty('transform');
  }

  private topOffsetResetRaf = new Map<ObcPoiData, number>();

  private animateTopOffsetToZero(target: ObcPoiData) {
    const start = target.topOffset;
    if (!Number.isFinite(start) || Math.abs(start) < 0.5) {
      target.topOffset = 0;
      return;
    }

    const existing = this.topOffsetResetRaf.get(target);
    if (existing) {
      cancelAnimationFrame(existing);
    }

    const duration = 100;
    const startTime = performance.now();
    const step = (now: number) => {
      try {
        if (!target.isConnected) {
          this.topOffsetResetRaf.delete(target);
          return;
        }
        const t = Math.min((now - startTime) / duration, 1);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        target.topOffset = start + (0 - start) * eased;
        if (t < 1) {
          this.topOffsetResetRaf.set(target, requestAnimationFrame(step));
        } else {
          this.topOffsetResetRaf.delete(target);
        }
      } catch (error) {
        console.error('[poi-layer] Error in top offset reset:', error);
        this.topOffsetResetRaf.delete(target);
      }
    };

    this.topOffsetResetRaf.set(target, requestAnimationFrame(step));
  }

  private scheduleGroupRemoval(group: HTMLElement) {
    const existing = this.groupRemovalTimers.get(group);
    if (existing) {
      window.clearTimeout(existing);
    }
    group.setAttribute('data-exiting', 'true');
    const removalDelay = this.getCssVarAsNumber(
      GROUP_REMOVAL_DELAY_MS_VAR,
      450
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

  private getFrontTarget(targets: HTMLElement[]) {
    return targets.find((target) => target.hasAttribute('data-front')) ?? null;
  }

  private getTargetRect(target: HTMLElement): DOMRect {
    const targetShadow = target.shadowRoot;
    const button = targetShadow?.querySelector('obc-poi-button-data') as
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

  private getTargetRectForGrouping(
    target: HTMLElement,
    layerRect: DOMRect
  ): DOMRect {
    const rect = this.getTargetRect(target);
    const leftRaw = target.style.left;
    const leftValue = Number.parseFloat(leftRaw);
    if (Number.isNaN(leftValue)) return rect;
    const width = rect.width || 0;
    const height = rect.height || 0;
    const left = layerRect.left + leftValue - width / 2;
    const top = layerRect.bottom - height;
    return new DOMRect(left, top, width, height);
  }

  private getTargetHeight(
    target: HTMLElement,
    rects?: Map<HTMLElement, DOMRect>
  ): number {
    const yAttr = target.getAttribute('y');
    const yValue = Number.parseFloat(yAttr ?? '');
    if (!Number.isNaN(yValue)) return yValue;
    if (target instanceof ObcPoiData && Number.isFinite(target.y ?? NaN)) {
      return target.y ?? 0;
    }
    const heightAttr = target.getAttribute('height');
    const heightValue = Number.parseFloat(heightAttr ?? '');
    if (!Number.isNaN(heightValue)) return heightValue;
    if (target instanceof ObcPoiData) {
      const height = target.height;
      if (typeof height === 'number' && Number.isFinite(height)) {
        return height;
      }
    }
    const rect = rects?.get(target) ?? this.getTargetRect(target);
    return rect.height;
  }

  private getShortestTarget(
    targets: HTMLElement[],
    rects?: Map<HTMLElement, DOMRect>
  ) {
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

  override render() {
    return html`
      <div class="wrapper">
        ${this.debug
          ? html`<span class="debug-label"
              >Layer ${this.layerIndex}: ${this.label || 'Layer'}</span
            >`
          : nothing}
        <slot></slot>
      </div>
    `;
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

  /** Get the visual target size for a given type and overlap state */
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
