/**
 * Grouping utilities for POI layer overlap detection and clustering
 */

/**
 * Interface for grouping thresholds
 */
export interface GroupingThresholds {
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
export function buildClusters<T>(
  targets: T[],
  adjacency: Map<T, Set<T>>
): T[][] {
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
export function checkOverlap(
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
export function buildAdjacencyMaps<T extends HTMLElement>(
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
