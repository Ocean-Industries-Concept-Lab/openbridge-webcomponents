/**
 * Crossing mode utilities for POI layer horizontal overlap handling
 */

import type {ObcPoiTarget} from '../poi-target/poi-target.js';

/**
 * Smooth step easing function
 */
export function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Configuration for crossing mode
 */
export interface CrossingConfig {
  buttonWidth: number;
  minGap: number;
}

/**
 * State for a target in crossing mode
 */
export interface CrossingTargetState {
  target: ObcPoiTarget;
  center: number;
  isMoving: boolean;
}

/**
 * Result of crossing mode calculation
 */
export interface CrossingResult {
  hasActiveOverlaps: boolean;
  positionsChanged: boolean;
  targetOffsets: Map<ObcPoiTarget, number>;
}

/**
 * Calculate offsets for targets in crossing mode
 */
export function calculateCrossingOffsets(
  orderedTargets: CrossingTargetState[],
  deltas: Map<ObcPoiTarget, number>,
  config: CrossingConfig
): CrossingResult {
  const targetOffsets = new Map<ObcPoiTarget, number>();
  orderedTargets.forEach((item) => targetOffsets.set(item.target, 0));

  let hasActiveOverlaps = false;
  let primaryMoving: ObcPoiTarget | null = null;
  let primaryDelta = 0;

  // Find primary moving target
  deltas.forEach((delta, target) => {
    if (!primaryMoving || Math.abs(delta) > Math.abs(primaryDelta)) {
      primaryMoving = target;
      primaryDelta = delta;
    }
  });

  const travelDir = primaryDelta >= 0 ? 1 : -1;

  // Calculate offsets for moving target
  if (primaryMoving) {
    const movingItem = orderedTargets.find(
      (item) => item.target === primaryMoving
    );

    if (movingItem) {
      // Find nearest target
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
        if (gap < config.minGap) {
          hasActiveOverlaps = true;
          const ratio = Math.min(1, Math.max(0, 1 - gap / config.minGap));
          const eased = smoothstep(ratio);
          const push = (config.minGap - gap) * eased;
          targetOffsets.set(movingItem.target, -push * travelDir);
        }
      }
    }
  }

  const positionsChanged = deltas.size > 0;

  return {
    hasActiveOverlaps,
    positionsChanged,
    targetOffsets,
  };
}

/**
 * Apply smooth interpolation to offset values
 */
export function applySmoothOffset(
  targetOffset: number,
  prevOffset: number,
  isPrimary: boolean,
  deadZone: number = 0.5,
  smoothSpeed: number = 0.2
): number {
  if (!isPrimary) {
    return 0;
  }

  const diff = targetOffset - prevOffset;
  if (Math.abs(diff) < deadZone) {
    return targetOffset;
  }

  return prevOffset + diff * smoothSpeed;
}

/**
 * Enforce monotonic movement in travel direction
 */
export function enforceMonotonicMovement(
  nextOffset: number,
  baseCenter: number,
  prevEffective: number | undefined,
  travelDir: number
): {offset: number; effectiveX: number} {
  const nextEffective = baseCenter + nextOffset;
  const prevX = prevEffective ?? baseCenter;

  if (travelDir > 0 && nextEffective < prevX) {
    return {
      offset: prevX - baseCenter,
      effectiveX: prevX,
    };
  }

  if (travelDir < 0 && nextEffective > prevX) {
    return {
      offset: prevX - baseCenter,
      effectiveX: prevX,
    };
  }

  return {
    offset: nextOffset,
    effectiveX: nextEffective,
  };
}
