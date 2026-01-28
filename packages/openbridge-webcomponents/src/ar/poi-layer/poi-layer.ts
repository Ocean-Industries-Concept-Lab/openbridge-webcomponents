import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import compentStyle from './poi-layer.css?inline';
import '../poi-target-button-group/poi-target-button-group.js';

@customElement('obc-poi-layer')
export class ObcPoiLayer extends LitElement {
  @property({type: String}) label = '';
  @property({type: Boolean, reflect: true}) debug = false;
  @property({type: Number}) layerIndex = 0;

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

  override firstUpdated() {
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
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
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
    if (this.heightRaf) {
      cancelAnimationFrame(this.heightRaf);
      this.heightRaf = 0;
    }
    this.exitLockTimers.forEach((timerId) => window.clearTimeout(timerId));
    this.exitLockTimers.clear();
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
        attributeFilter: ['style', 'height'],
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
            node.tagName.toLowerCase() === 'obc-poi-target-button-group' ||
            node.querySelector?.('obc-poi-target') ||
            node.querySelector?.('obc-poi-target-button-group')
          ) {
            this.updateTargetObservers();
            this.scheduleGrouping();
            this.scheduleLayerHeightUpdate();
            return;
          }
        }
      }
    });
    this.layerMutationObserver.observe(this, {childList: true, subtree: true});
  }

  private scheduleGrouping() {
    if (this.groupingRaf) return;
    this.groupingRaf = requestAnimationFrame(() => {
      this.groupingRaf = 0;
      this.updateGrouping();
    });
  }

  private updateGrouping = () => {
    if (this.isGrouping) return;
    this.isGrouping = true;

    const manualGroups = Array.from(
      this.querySelectorAll('obc-poi-target-button-group')
    ).filter((group) => !group.hasAttribute('data-auto-group'));
    if (manualGroups.length > 0) {
      const anyExpanded = manualGroups.some(
        (group) => (group as unknown as {expand?: boolean}).expand === true
      );
      if (anyExpanded) {
        this.isGrouping = false;
        return;
      }
      this.isGrouping = false;
      return;
    }

    const targets = Array.from(
      this.querySelectorAll('obc-poi-target')
    ) as HTMLElement[];

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
    const preThreshold =
      Number.parseFloat(preRaw) || enterThreshold;
    const behindThreshold =
      Number.parseFloat(behindRaw) || enterThreshold;

    const currentGroupByTarget = new Map<HTMLElement, HTMLElement>();
    targets.forEach((target) => {
      const parent = target.parentElement;
      if (parent?.tagName.toLowerCase() === 'obc-poi-target-button-group') {
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
        const gap =
          Math.max(0, Math.max(ra.left, rb.left) - Math.min(ra.right, rb.right));
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

    const preVisited = new Set<HTMLElement>();
    const preClusters: HTMLElement[][] = [];
    targets.forEach((target) => {
      if (preVisited.has(target)) return;
      const stack = [target];
      const cluster: HTMLElement[] = [];
      preVisited.add(target);
      while (stack.length > 0) {
        const node = stack.pop()!;
        cluster.push(node);
        preAdjacency.get(node)!.forEach((neighbor) => {
          if (!preVisited.has(neighbor)) {
            preVisited.add(neighbor);
            stack.push(neighbor);
          }
        });
      }
    if (cluster.length >= 2) preClusters.push(cluster);
    });

    const behindVisited = new Set<HTMLElement>();
    const behindClusters: HTMLElement[][] = [];
    targets.forEach((target) => {
      if (behindVisited.has(target)) return;
      const stack = [target];
      const cluster: HTMLElement[] = [];
      behindVisited.add(target);
      while (stack.length > 0) {
        const node = stack.pop()!;
        cluster.push(node);
        behindAdjacency.get(node)!.forEach((neighbor) => {
          if (!behindVisited.has(neighbor)) {
            behindVisited.add(neighbor);
            stack.push(neighbor);
          }
        });
      }
      if (cluster.length >= 2) behindClusters.push(cluster);
    });

    const existingGroups = Array.from(
      this.querySelectorAll('obc-poi-target-button-group[data-auto-group]')
    ) as HTMLElement[];

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
      (group) => (group as unknown as {expand?: boolean}).expand === true
    );
    if (expandedAutoGroup) {
      const expandedChildren = Array.from(expandedAutoGroup.children).filter(
        (child): child is HTMLElement =>
          child.tagName.toLowerCase() === 'obc-poi-target'
      );
      const expandedAny = expandedAutoGroup as unknown as {
        expand?: boolean;
        setExpandedChildren?: (expand: boolean) => void;
      };
      const stillClustered = clusters.some(
        (cluster) =>
          cluster.length === expandedChildren.length &&
          cluster.every((target) => expandedChildren.includes(target))
      );
      if (expandedChildren.length >= 2 && stillClustered) {
        this.isGrouping = false;
        return;
      }
      expandedAny.setExpandedChildren?.(false);
      expandedAny.expand = false;
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
          this.resetTarget(child);
        });
        children.forEach((child) => this.appendChild(child));
        const exitDelay = 140;
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
        }, exitDelay);
        requestAnimationFrame(() => {
          group.removeAttribute('data-visible');
          this.scheduleGroupRemoval(group);
        });
      }
    });

    remainingClusters.forEach((cluster) => {
      const group = document.createElement('obc-poi-target-button-group');
      group.setAttribute('data-auto-group', 'true');
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
        cluster.forEach((target) => target.setAttribute('data-grouped', 'true'));
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
        if (!exitLocked && behindTargets.has(target) && !frontTargets.has(target)) {
          target.setAttribute('data-behind', 'true');
        } else {
          target.removeAttribute('data-behind');
        }
        if (exitLocked) {
          target.removeAttribute('data-pregrouped');
          target.removeAttribute('data-behind');
        }
        const isOverlapState = target.hasAttribute('data-behind');
        const anyTarget = target as HTMLElement & {visualState?: string};
        if (typeof anyTarget.visualState === 'string') {
          anyTarget.visualState = isOverlapState ? 'overlap' : 'normal';
        } else {
          target.setAttribute(
            'data-visual-state',
            isOverlapState ? 'overlap' : 'normal'
          );
        }
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
  };

  private getTargetType(target: HTMLElement): string {
    const typedTarget = target as HTMLElement & {type?: string};
    return typedTarget.type ?? target.getAttribute('type') ?? 'button';
  }

  private applyStandaloneVisualState(target: HTMLElement, overlap: boolean) {
    const type = this.getTargetType(target);
    const isEnhanced = type === 'enhanced';
    const size = overlap ? (isEnhanced ? 36 : 28) : isEnhanced ? 52 : 38;
    target.style.setProperty('--poi-size', `${size}px`);
    target.style.setProperty('--obc-poi-target-icon-opacity', overlap ? '0' : '1');
    target.style.setProperty('--obc-poi-overlap', overlap ? '1' : '0');
    target.style.setProperty(
      '--obc-poi-overlap-elements-opacity',
      overlap ? '0' : '1'
    );
    target.style.setProperty(
      '--obc-poi-label-opacity',
      overlap ? '0' : '1'
    );
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


  private refreshGroupPositions(layerRect?: DOMRect, rects?: Map<HTMLElement, DOMRect>) {
    const groups = Array.from(
      this.querySelectorAll('obc-poi-target-button-group')
    ) as HTMLElement[];
    groups.forEach((group) => {
      if (group.hasAttribute('data-auto-group')) {
        const children = Array.from(group.children).filter(
          (child): child is HTMLElement =>
            child.tagName.toLowerCase() === 'obc-poi-target'
        );
        if (children.length > 0) {
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
      }
      const updatePosition = (group as unknown as {updatePosition?: () => void})
        .updatePosition;
      updatePosition?.call(group);
    });
  }

  private getClusterBottomY(
    targets: HTMLElement[],
    rects: Map<HTMLElement, DOMRect>,
    layerRect: DOMRect
  ) {
    let maxBottom = Number.NEGATIVE_INFINITY;
    targets.forEach((target) => {
      const rect = rects.get(target) ?? target.getBoundingClientRect();
      maxBottom = Math.max(maxBottom, rect.bottom);
    });
    const offsetRaw = getComputedStyle(this).getPropertyValue(
      '--obc-poi-layer-auto-group-offset-y'
    );
    const offset = Number.parseFloat(offsetRaw) || 0;
    return Math.round(maxBottom - layerRect.top + offset);
  }

  private getGroupPositionVertical(
    targets: HTMLElement[],
    rects: Map<HTMLElement, DOMRect>,
    layerRect: DOMRect,
    group?: HTMLElement
  ) {
    let maxBottom = Number.NEGATIVE_INFINITY;
    targets.forEach((target) => {
      const rect = rects.get(target) ?? target.getBoundingClientRect();
      maxBottom = Math.max(maxBottom, rect.bottom);
    });
    const baseBottom = maxBottom - layerRect.top;
    const isAutoGroup = group?.hasAttribute('data-auto-group') ?? false;
    const transformFactor = isAutoGroup ? 1 : 0.5;
    const offsetRaw = getComputedStyle(this).getPropertyValue(
      '--obc-poi-layer-auto-group-offset-y'
    );
    let offset = Number.parseFloat(offsetRaw) || 0;
    if (isAutoGroup && this.closest('obc-poi-layer-stack')) {
      offset = 0;
    }
    return Math.round(baseBottom - layerRect.height * transformFactor + offset);
  }

  private resetTarget(target: HTMLElement) {
    const anyTarget = target as HTMLElement & {offset?: number};
    if (typeof anyTarget.offset === 'number') {
      anyTarget.offset = 0;
    }
    target.style.removeProperty('position');
    target.style.removeProperty('width');
    target.style.removeProperty('min-width');
    target.style.removeProperty('height');
    target.style.removeProperty('transform');
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
    }, 450);
    this.groupRemovalTimers.set(group, timeoutId);
  }


  private startExitLock(target: HTMLElement) {
    target.setAttribute('data-exit-lock', 'true');
    const existing = this.exitLockTimers.get(target);
    if (existing) window.clearTimeout(existing);
    const timeoutId = window.setTimeout(() => {
      target.removeAttribute('data-exit-lock');
      this.exitLockTimers.delete(target);
    }, 500);
    this.exitLockTimers.set(target, timeoutId);
  }

  private getFrontTarget(targets: HTMLElement[]) {
    return (
      targets.find((target) => target.hasAttribute('data-front')) ?? null
    );
  }

  private getTargetRect(target: HTMLElement): DOMRect {
    const targetShadow = target.shadowRoot;
    const button = targetShadow?.querySelector('obc-poi-target-button') as
      | HTMLElement
      | undefined;
    const buttonShadow = button?.shadowRoot;
    const wrapper = buttonShadow?.querySelector('.wrapper') as HTMLElement | null;
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
    const heightAttr = target.getAttribute('height');
    const heightValue = Number.parseFloat(heightAttr ?? '');
    if (!Number.isNaN(heightValue)) return heightValue;
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

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-layer': ObcPoiLayer
  }
}
