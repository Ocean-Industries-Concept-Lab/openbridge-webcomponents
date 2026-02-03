import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-layer.css?inline';
import '../poi-group/poi-group.js';
import {ObcPoiTarget, PoiTargetVisualState} from '../poi-target/poi-target.js';
import {ObcPoiTargetButtonType} from '../poi-target-button/poi-target-button.js';

const EXIT_DELAY_MS = 140;
const GROUP_REMOVAL_DELAY_MS = 450;
const EXIT_LOCK_DURATION_MS = 500;

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
 * Interface for POI button group element properties used by the layer.
 */
interface PoiButtonGroupElement extends HTMLElement {
  expand?: boolean;
  collapsing?: boolean;
  useTopOffset: boolean;
  updatePosition?: () => void;
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
 * - Default slot for `obc-poi-target` and `obc-poi-group`.
 *
 * ### Events
 * - `layer-resize` when the computed layer height changes.
 *
 * ### Example
 * ```html
 * <obc-poi-layer label="Radar" layerIndex="1">
 *   <obc-poi-target x="120" height="200"></obc-poi-target>
 *   <obc-poi-target x="240" height="220"></obc-poi-target>
 * </obc-poi-layer>
 * ```
 *
 * @slot - Default slot for `obc-poi-target` and `obc-poi-group`.
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
  private cachedCrossingTargets: ObcPoiTarget[] = [];
  private crossingTargetsDirty = false;
  private crossingOrder: ObcPoiTarget[] = [];
  private crossingNeighbor = new Map<ObcPoiTarget, ObcPoiTarget>();
  private crossingDirection = new Map<ObcPoiTarget, number>();
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
      this.querySelectorAll('obc-poi-target')
    ) as ObcPoiTarget[];
    const groupedTargets = new Set<HTMLElement>(
      Array.from(group.querySelectorAll('obc-poi-target')) as ObcPoiTarget[]
    );

    if (event.detail.expand) {
      targets.forEach((target) => {
        if (!groupedTargets.has(target)) {
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
      this.querySelectorAll('obc-poi-target')
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
      this.querySelectorAll('obc-poi-target')
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
    const button = targetShadow?.querySelector('obc-poi-target-button') as
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
            node.tagName.toLowerCase() === 'obc-poi-target' ||
            node.tagName.toLowerCase() === 'obc-poi-group' ||
            node.querySelector?.('obc-poi-target') ||
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
      this.crossingModeRaf = 0;
      const shouldContinue = this.updateCrossingMode();
      if (
        this.overlapMode === OverlapMode.Crossing &&
        this.isConnected &&
        shouldContinue
      ) {
        this.scheduleCrossingMode();
      }
    });
  }

  private updateCrossingMode(): boolean {
    if (this.crossingTargetsDirty) {
      this.cachedCrossingTargets = Array.from(
        this.querySelectorAll('obc-poi-target')
      ) as ObcPoiTarget[];
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
    const movingTargets = new Set<HTMLElement>();
    const deltas = new Map<ObcPoiTarget, number>();

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
        movingTargets.add(target);
        deltas.set(target, left - prevPos);
      }
    });

    const orderIndex = new Map<ObcPoiTarget, number>();
    this.crossingOrder.forEach((target, index) => {
      orderIndex.set(target, index);
    });

    const orderedTargets = targets
      .map((target) => {
        const left = currentPositions.get(target) ?? 0;
        return {
          target,
          center: left + buttonWidth / 2,
          isMoving: movingTargets.has(target),
        };
      })
      .sort((a, b) => {
        const delta = a.center - b.center;
        if (Math.abs(delta) > 0.5) return delta;
        return (
          (orderIndex.get(a.target) ?? 0) - (orderIndex.get(b.target) ?? 0)
        );
      });

    const targetOffsets = new Map<ObcPoiTarget, number>();
    orderedTargets.forEach((item) => targetOffsets.set(item.target, 0));

    let hasActiveOverlaps = false;
    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    let primaryMoving: ObcPoiTarget | null = null;
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
        let nearest: {center: number; target: ObcPoiTarget} | null = null;
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
            targetOffsets.set(movingItem.target, push * travelDir);
          }
        }
      }
    }

    const positionsChanged = movingTargets.size > 0;

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
      const nextOffset =
        Math.abs(diff) < deadZone ? targetOffset : prevOffset + diff * 0.2;

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
        group.querySelectorAll('obc-poi-target')
      ) as ObcPoiTarget[];
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

    const targets = Array.from(this.querySelectorAll('obc-poi-target')).filter(
      (target) => !manualGroupedTargets.has(target)
    ) as ObcPoiTarget[];

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

    const adjacency = new Map<HTMLElement, Set<HTMLElement>>();
    const preAdjacency = new Map<HTMLElement, Set<HTMLElement>>();
    const behindAdjacency = new Map<HTMLElement, Set<HTMLElement>>();
    targets.forEach((target) => adjacency.set(target, new Set()));
    targets.forEach((target) => preAdjacency.set(target, new Set()));
    targets.forEach((target) => behindAdjacency.set(target, new Set()));
    const preGrouped = new Set<HTMLElement>();

    for (let i = 0; i < targets.length; i += 1) {
      const a = targets[i];
      const ra = rects.get(a)!;
      for (let j = i + 1; j < targets.length; j += 1) {
        const b = targets[j];
        const rb = rects.get(b)!;
        const sameGroup =
          currentGroupByTarget.get(a) &&
          currentGroupByTarget.get(a) === currentGroupByTarget.get(b);
        const threshold = sameGroup ? exitThreshold : enterThreshold;
        const overlapHeight =
          Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
        const gap = Math.max(
          0,
          Math.max(ra.left, rb.left) - Math.min(ra.right, rb.right)
        );
        if (gap <= preThreshold && overlapHeight > 0) {
          preGrouped.add(a);
          preGrouped.add(b);
          preAdjacency.get(a)!.add(b);
          preAdjacency.get(b)!.add(a);
        }
        if (gap <= behindThreshold && overlapHeight > 0) {
          behindAdjacency.get(a)!.add(b);
          behindAdjacency.get(b)!.add(a);
        }
        if (gap <= threshold && overlapHeight > 0) {
          adjacency.get(a)!.add(b);
          adjacency.get(b)!.add(a);
        }
      }
    }

    const clusters = this.buildClusters(targets, adjacency);
    const behindClusters = this.buildClusters(targets, behindAdjacency);

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
      this.isGrouping = false;
      return;
    }

    const remainingClusters = [...clusters];
    const keptGroups: HTMLElement[] = [];

    existingGroups.forEach((group) => {
      const children = Array.from(group.children).filter(
        (child): child is HTMLElement =>
          child.tagName.toLowerCase() === 'obc-poi-target'
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
          this.resetTarget(child as ObcPoiTarget);
        });
        children.forEach((child) => this.appendChild(child));
        children.forEach((child) => {
          if (!front || child !== front) {
            child.getBoundingClientRect();
          }
        });
        window.setTimeout(() => {
          children.forEach((child) => {
            if (!front || child !== front) {
              child.removeAttribute('data-exiting');
            }
          });
        }, EXIT_DELAY_MS);
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
        target.visualState = isOverlapState
          ? PoiTargetVisualState.Overlapped
          : PoiTargetVisualState.Unchecked;
        this.applyStandaloneVisualState(target, isOverlapState);
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

  /**
   * Build clusters of connected elements using depth-first search on an adjacency map.
   * Returns only clusters with 2+ elements.
   */
  private buildClusters(
    targets: HTMLElement[],
    adjacency: Map<HTMLElement, Set<HTMLElement>>
  ): HTMLElement[][] {
    const visited = new Set<HTMLElement>();
    const clusters: HTMLElement[][] = [];

    targets.forEach((target) => {
      if (visited.has(target)) return;

      const stack = [target];
      const cluster: HTMLElement[] = [];
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

      if (cluster.length >= 2) clusters.push(cluster);
    });

    return clusters;
  }

  private applyStandaloneVisualState(target: ObcPoiTarget, overlap: boolean) {
    const isEnhanced = target.type === ObcPoiTargetButtonType.Enhanced;
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
          child.tagName.toLowerCase() === 'obc-poi-target'
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

  private resetTarget(target: ObcPoiTarget) {
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

  private topOffsetResetRaf = new Map<ObcPoiTarget, number>();

  private animateTopOffsetToZero(target: ObcPoiTarget) {
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
    };

    this.topOffsetResetRaf.set(target, requestAnimationFrame(step));
  }

  private scheduleGroupRemoval(group: HTMLElement) {
    const existing = this.groupRemovalTimers.get(group);
    if (existing) {
      window.clearTimeout(existing);
    }
    group.setAttribute('data-exiting', 'true');
    const timeoutId = window.setTimeout(() => {
      group.remove();
      this.groupRemovalTimers.delete(group);
    }, GROUP_REMOVAL_DELAY_MS);
    this.groupRemovalTimers.set(group, timeoutId);
  }

  private startExitLock(target: HTMLElement) {
    target.setAttribute('data-exit-lock', 'true');
    const existing = this.exitLockTimers.get(target);
    if (existing) window.clearTimeout(existing);
    const timeoutId = window.setTimeout(() => {
      target.removeAttribute('data-exit-lock');
      this.exitLockTimers.delete(target);
    }, EXIT_LOCK_DURATION_MS);
    this.exitLockTimers.set(target, timeoutId);
  }

  private getFrontTarget(targets: HTMLElement[]) {
    return targets.find((target) => target.hasAttribute('data-front')) ?? null;
  }

  private getTargetRect(target: HTMLElement): DOMRect {
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
    if (target instanceof ObcPoiTarget && Number.isFinite(target.y ?? NaN)) {
      return target.y ?? 0;
    }
    const heightAttr = target.getAttribute('height');
    const heightValue = Number.parseFloat(heightAttr ?? '');
    if (!Number.isNaN(heightValue)) return heightValue;
    if (target instanceof ObcPoiTarget) {
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
