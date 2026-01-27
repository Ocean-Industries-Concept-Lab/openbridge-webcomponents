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
  private lastHeight = 0;
  private isGrouping = false;
  private targetObservers = new Map<HTMLElement, MutationObserver>();
  private groupingRaf = 0;
  private groupRemovalTimers = new WeakMap<HTMLElement, number>();

  override firstUpdated() {
    this.setupResizeObserver();
    this.updateTargetObservers();
    this.scheduleGrouping();
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', () => {
      this.updateTargetObservers();
      this.scheduleGrouping();
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.targetObservers.forEach((observer) => observer.disconnect());
    this.targetObservers.clear();
    if (this.groupingRaf) {
      cancelAnimationFrame(this.groupingRaf);
      this.groupingRaf = 0;
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
      const observer = new MutationObserver(() => this.scheduleGrouping());
      observer.observe(target, {
        attributes: true,
        attributeFilter: ['style', 'height'],
      });
      this.targetObservers.set(target, observer);
    });
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
    const enterThreshold = Number.parseFloat(enterRaw) || 20;
    const exitThreshold =
      Number.parseFloat(exitRaw) || Math.max(enterThreshold + 12, 32);
    const preThreshold =
      Number.parseFloat(preRaw) || Math.max(enterThreshold + 24, 24);

    const currentGroupByTarget = new Map<HTMLElement, HTMLElement>();
    targets.forEach((target) => {
      const parent = target.parentElement;
      if (parent?.tagName.toLowerCase() === 'obc-poi-target-button-group') {
        currentGroupByTarget.set(target, parent as HTMLElement);
      }
    });

    const rects = new Map<HTMLElement, DOMRect>();
    targets.forEach((target) => {
      rects.set(target, this.getTargetRect(target));
    });

    const adjacency = new Map<HTMLElement, Set<HTMLElement>>();
    targets.forEach((target) => adjacency.set(target, new Set()));
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

    const existingGroups = Array.from(
      this.querySelectorAll('obc-poi-target-button-group[data-auto-group]')
    ) as HTMLElement[];

    const frontTargets = new Set<HTMLElement>();
    clusters.forEach((cluster) => {
      const front = this.getFrontTarget(cluster);
      if (front) frontTargets.add(front);
    });

    const expandedAutoGroup = existingGroups.find(
      (group) => (group as unknown as {expand?: boolean}).expand === true
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
        children.forEach((child) => this.resetTarget(child));
        children.forEach((child) => this.appendChild(child));
        this.scheduleGroupRemoval(group);
      }
    });

    remainingClusters.forEach((cluster) => {
      const group = document.createElement('obc-poi-target-button-group');
      group.setAttribute('data-auto-group', 'true');
      group.setAttribute('data-visible', 'true');
      group.setAttribute(
        'positionVertical',
        `${this.getClusterBottomY(cluster, rects, layerRect)}px`
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
        target.removeAttribute('data-grouped');
        if (target.hasAttribute('data-front-exit')) {
          target.setAttribute('data-front', 'true');
          target.removeAttribute('data-pregrouped');
        } else if (frontTargets.has(target)) {
          target.setAttribute('data-front', 'true');
          target.removeAttribute('data-pregrouped');
        } else if (preGrouped.has(target)) {
          target.removeAttribute('data-front');
          target.setAttribute('data-pregrouped', 'true');
        } else {
          target.removeAttribute('data-front');
          target.removeAttribute('data-pregrouped');
        }
        this.resetTarget(target);
      }
    });

    this.refreshGroupPositions(layerRect, rects);

    requestAnimationFrame(() => {
      targets.forEach((target) => target.removeAttribute('data-front-exit'));
    });

    this.isGrouping = false;
  };

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
          const rectMap =
            rects ??
            new Map(
              children.map((child) => [child, this.getTargetRect(child)])
            );
          const layerBounds = layerRect ?? this.getBoundingClientRect();
          group.setAttribute(
            'positionVertical',
            `${this.getClusterBottomY(children, rectMap, layerBounds)}px`
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

  private resetTarget(target: HTMLElement) {
    const anyTarget = target as HTMLElement & {overlap?: boolean; offset?: number};
    if (typeof anyTarget.overlap === 'boolean') {
      anyTarget.overlap = false;
    }
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
    group.removeAttribute('data-visible');
    group.setAttribute('data-exiting', 'true');
    const existing = this.groupRemovalTimers.get(group);
    if (existing) {
      window.clearTimeout(existing);
    }
    const timeoutId = window.setTimeout(() => {
      group.remove();
      this.groupRemovalTimers.delete(group);
    }, 450);
    this.groupRemovalTimers.set(group, timeoutId);
  }

  private getFrontTarget(targets: HTMLElement[]) {
    if (targets.length === 0) return null;
    let front = targets[0];
    let maxZ = Number.NEGATIVE_INFINITY;
    targets.forEach((target) => {
      const zRaw = getComputedStyle(target).zIndex;
      const z = Number.parseInt(zRaw, 10);
      const zValue = Number.isNaN(z) ? 0 : z;
      if (zValue > maxZ) {
        maxZ = zValue;
        front = target;
      }
    });
    return front;
  }

  private getTargetRect(target: HTMLElement): DOMRect {
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
