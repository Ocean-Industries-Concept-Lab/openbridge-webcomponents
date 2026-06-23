import {Poi} from '../poi/poi.js';
import {getEffectivePoiX} from '../poi/poi-position.js';

interface UpdateCrossingModeParams {
  targets: Poi[];
  buttonWidth: number;
  minGap: number;
  previousPositions: Map<Poi, number>;
  lastOffsets: Map<Poi, number>;
  crossingOrder: Poi[];
  crossingLastEffectiveX: Map<Poi, number>;
}

interface UpdateCrossingModeResult {
  shouldContinue: boolean;
  previousPositions: Map<Poi, number>;
  crossingOrder: Poi[];
}

function updateCrossingModeState({
  targets,
  buttonWidth,
  minGap,
  previousPositions,
  lastOffsets,
  crossingOrder,
  crossingLastEffectiveX,
}: UpdateCrossingModeParams): UpdateCrossingModeResult {
  if (targets.length < 2) {
    targets.forEach((target) => {
      target.buttonOffsetX = 0;
      target.targetOffsetX = 0;
      lastOffsets.set(target, 0);
    });
    lastOffsets.clear();
    crossingLastEffectiveX.clear();
    return {
      shouldContinue: false,
      previousPositions: new Map<Poi, number>(),
      crossingOrder: [],
    };
  }

  const currentPositions = new Map<Poi, number>();
  const movingTargetsSet = new Set<Poi>();
  const deltas = new Map<Poi, number>();

  targets.forEach((target) => {
    const left = getEffectivePoiX(target);
    currentPositions.set(target, left);

    const prevPos = previousPositions.get(target);
    if (prevPos !== undefined && Math.abs(left - prevPos) > 0.5) {
      movingTargetsSet.add(target);
      deltas.set(target, left - prevPos);
    }
  });

  const orderIndex = new Map<Poi, number>();
  crossingOrder.forEach((target, index) => {
    orderIndex.set(target, index);
  });

  const orderedTargets = targets
    .map((target) => ({
      target,
      center: (currentPositions.get(target) ?? 0) + buttonWidth / 2,
      isMoving: movingTargetsSet.has(target),
    }))
    .sort((a, b) => {
      const delta = a.center - b.center;
      if (Math.abs(delta) > 0.5) return delta;
      return (orderIndex.get(a.target) ?? 0) - (orderIndex.get(b.target) ?? 0);
    });

  const targetOffsets = new Map<Poi, number>();
  orderedTargets.forEach((item) => targetOffsets.set(item.target, 0));

  let hasActiveOverlaps = false;
  const smoothstep = (t: number) => t * t * (3 - 2 * t);

  let primaryMoving: Poi | null = null;
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
      let nearest: {center: number; target: Poi} | null = null;
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
          const push = (minGap - gap) * smoothstep(ratio);
          targetOffsets.set(movingItem.target, -push * travelDir);
        }
      }
    }
  }

  const positionsChanged = movingTargetsSet.size > 0;

  if (!hasActiveOverlaps) {
    targets.forEach((target) => {
      target.buttonOffsetX = 0;
      target.targetOffsetX = 0;
      lastOffsets.set(target, 0);
    });
    lastOffsets.forEach((_, target) => {
      if (!currentPositions.has(target)) lastOffsets.delete(target);
    });
    crossingLastEffectiveX.clear();
    return {
      shouldContinue: positionsChanged,
      previousPositions: currentPositions,
      crossingOrder: orderedTargets.map((item) => item.target),
    };
  }

  orderedTargets.forEach((item) => {
    const targetOffset =
      primaryMoving && item.target === primaryMoving
        ? (targetOffsets.get(item.target) ?? 0)
        : 0;
    const prevOffset = lastOffsets.get(item.target) ?? 0;
    const diff = targetOffset - prevOffset;
    const deadZone = 0.5;
    let nextOffset =
      Math.abs(diff) < deadZone ? targetOffset : prevOffset + diff * 0.2;

    if (primaryMoving && item.target === primaryMoving) {
      const baseCenter =
        (currentPositions.get(item.target) ?? 0) + buttonWidth / 2;
      const prevEffective =
        crossingLastEffectiveX.get(item.target) ?? baseCenter;
      const nextEffective = baseCenter + nextOffset;
      if (travelDir > 0 && nextEffective < prevEffective) {
        nextOffset = prevEffective - baseCenter;
      } else if (travelDir < 0 && nextEffective > prevEffective) {
        nextOffset = prevEffective - baseCenter;
      }
      crossingLastEffectiveX.set(item.target, baseCenter + nextOffset);
    } else {
      crossingLastEffectiveX.delete(item.target);
    }

    if (nextOffset !== 0) {
      item.target.buttonOffsetX = nextOffset;
      item.target.targetOffsetX = 0;
    } else {
      item.target.buttonOffsetX = 0;
      item.target.targetOffsetX = 0;
    }
    lastOffsets.set(item.target, nextOffset);
  });

  lastOffsets.forEach((_, target) => {
    if (!currentPositions.has(target)) lastOffsets.delete(target);
  });

  return {
    shouldContinue: positionsChanged || hasActiveOverlaps,
    previousPositions: currentPositions,
    crossingOrder: orderedTargets.map((item) => item.target),
  };
}

export {updateCrossingModeState};
