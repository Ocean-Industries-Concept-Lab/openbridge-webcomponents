import {SVGTemplateResult, svg} from 'lit';

export interface Tickmark {
  angle: number;
  type: TickmarkType;
  text?: string;
  color?: string;
}

export enum TickmarkType {
  zeroLineThick = 'zeroLineThick',
  zeroLine = 'zeroLine',
  main = 'main',
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  textOnly = 'textOnly',
}

export enum TickmarkStyle {
  regular = 'regular',
  enhanced = 'enhanced',
}

/**
 * Secondary tickmark ladder spanning a watch arc.
 *
 * Emits a `secondary` mark every `interval` degrees strictly inside the arc,
 * skipping the arc centre — which carries its own `main` mark — and the arc
 * ends, where the band's rounded end cap already reads as a boundary. Angles
 * are returned signed relative to `centerAngle`, matching the convention the
 * inclinometers already use for needles and bar areas.
 *
 * @param centerAngle Watch angle the arc is centred on.
 * @param halfExtent Half-extent of the arc in degrees; the arc spans `centerAngle ± halfExtent`.
 * @param interval Spacing between ladder marks in degrees.
 */
export function arcTickmarks(
  centerAngle: number,
  halfExtent: number,
  interval = 5
): Tickmark[] {
  if (
    !Number.isFinite(centerAngle) ||
    !Number.isFinite(halfExtent) ||
    !Number.isFinite(interval) ||
    interval <= 0
  ) {
    return [];
  }
  const marks: Tickmark[] = [];
  const epsilon = 1e-6;
  for (
    let offset = interval;
    offset < halfExtent - epsilon;
    offset += interval
  ) {
    marks.push({angle: centerAngle - offset, type: TickmarkType.secondary});
    marks.push({angle: centerAngle + offset, type: TickmarkType.secondary});
  }
  return marks;
}

export function tickmarkColor(
  style: TickmarkStyle,
  tickmarkType?: TickmarkType
): string {
  if (style === TickmarkStyle.regular) {
    return 'var(--instrument-tick-mark-tertiary-color)';
  } else {
    if (tickmarkType === TickmarkType.tertiary) {
      return 'var(--instrument-tick-mark-secondary-color)';
    }
    return 'var(--instrument-tick-mark-primary-color)';
  }
}

export function tickmark(
  angle: number,
  {
    size,
    style,
    scale,
    text,
    inside,
    textRadius,
    rotation,
    maxDigits,
    color,
    radiusOffset = 0,
    endLabelsMaxMin = false,
  }: {
    size: TickmarkType;
    style: TickmarkStyle;
    scale: number;
    text?: string;
    inside: boolean;
    textRadius: number;
    rotation?: number;
    maxDigits: number;
    color?: string;
    radiusOffset?: number;
    endLabelsMaxMin?: boolean;
  }
): SVGTemplateResult | SVGTemplateResult[] {
  // Before layout settles the caller can pass a scale of 0 (or a non-finite
  // value). Label offsets are computed as `px / scale`, so a 0 scale would emit
  // ±Infinity coordinates that the browser rejects. Fall back to a 1:1 scale
  // until a real one is available (issue #1032).
  const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;
  const rOff = radiusOffset;
  let innerRadius: number;
  let outerRadius: number;
  textRadius = textRadius + (3 / safeScale + 3) * (inside ? -1 : 1);
  const rad = (angle * Math.PI) / 180;
  if (size === TickmarkType.primary) {
    innerRadius = 328 / 2 + rOff;
    outerRadius = 368 / 2 + rOff;
  } else if (size === TickmarkType.secondary) {
    innerRadius = 328 / 2 + rOff;
    outerRadius = 344 / 2 + rOff;
  } else if (size === TickmarkType.main || size === TickmarkType.zeroLine) {
    innerRadius = 320 / 2 + rOff;
    outerRadius = 368 / 2 + rOff;
  } else if (size === TickmarkType.zeroLineThick) {
    innerRadius = 224 / 2 + rOff;
    outerRadius = 368 / 2 + rOff;
  } else if (size === TickmarkType.tertiary) {
    innerRadius = 328 / 2 + rOff;
    outerRadius = 336 / 2 + rOff;
  } else {
    return [
      textSvg(text ?? '', {
        angle,
        inside,
        scale: safeScale,
        textRadius,
        endLabelsMaxMin,
      }),
    ];
  }

  // When inside, anchor ticks at the outer ring edge and grow inward,
  // preserving the same gap from the ring edge as the outside case.
  // Outside: gap = innerRadius - RING2 (320/2). E.g. secondary: 164 - 160 = 4px gap.
  // Inside: mirror that gap from the outer ring (368/2).
  if (inside) {
    const outerRingRadius = 368 / 2 + rOff;
    const ring2Radius = 320 / 2 + rOff;
    const tickLength = outerRadius - innerRadius;
    const gapFromRingEdge = Math.max(0, innerRadius - ring2Radius);
    outerRadius = outerRingRadius - gapFromRingEdge;
    innerRadius = outerRadius - tickLength;
  }
  const colorName = color ?? tickmarkColor(style, size);

  const x1 = Math.sin(rad) * innerRadius;
  const y1 = -Math.cos(rad) * innerRadius;
  const x2 = Math.sin(rad) * outerRadius;
  const y2 = -Math.cos(rad) * outerRadius;
  const strokeWidth =
    size === TickmarkType.zeroLine || size === TickmarkType.zeroLineThick
      ? 4
      : 1;
  const tick = svg`<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} stroke=${colorName} stroke-width=${strokeWidth} vector-effect="non-scaling-stroke"/>`;
  if (text) {
    if (rotation === undefined) {
      return [
        tick,
        textSvg(text, {
          angle,
          inside,
          scale: safeScale,
          textRadius,
          endLabelsMaxMin,
        }),
      ];
    } else {
      const newRadius =
        textRadius + ((4 / safeScale + 5) * (inside ? -1 : 1) * maxDigits) / 2;
      const textX = Math.sin(rad) * newRadius;
      const textY = -Math.cos(rad) * newRadius;
      return [
        tick,
        svg`<text x=${textX} y=${textY} class="label rotate ${inside ? 'inside' : ''}" transform="rotate(${-rotation})" transform-origin="${textX} ${textY}">${text}</text>`,
      ];
    }
  }
  return tick;
}

function textSvg(
  text: string,
  {
    angle,
    inside,
    scale,
    textRadius,
    endLabelsMaxMin = false,
  }: {
    angle: number;
    inside: boolean;
    scale: number;
    textRadius: number;
    endLabelsMaxMin?: boolean;
  }
) {
  const radHoriz = (angle * Math.PI) / 180;
  // "Max-min" placement: horizontal end labels (±90°) sit off the dead-center
  // tick (below outside / lifted inside), inset inward by label width.
  if (endLabelsMaxMin && Math.abs(Math.cos(radHoriz)) < 1e-6) {
    const sin = Math.sin(radHoriz);
    const inward = inside ? (6 + (text.length - 1) * 2.5) / scale : 14 / scale;
    const x = sin * (textRadius - inward);
    const y = inside ? -(6 / scale) : 12 / scale;
    return svg`<text x=${x} y=${y} class="label bottom ${inside ? 'inside' : ''}">${text}</text>`;
  }

  let positionClass;
  if (angle === 0) {
    positionClass = 'top';
  } else if (angle < 180 && angle > 0) {
    positionClass = 'right';
  } else if (angle === 180) {
    positionClass = 'bottom';
  } else {
    positionClass = 'left';
  }
  const rad = (angle * Math.PI) / 180;
  const insideGain = inside ? -1 : 1;
  const yOffset = (7 / scale) * insideGain;
  const xOffset = (6 / scale) * insideGain;

  let textX = Math.sin(rad) * (textRadius + xOffset);
  if (angle > 180) {
    textX += (4 / scale) * insideGain;
  } else if (angle < 180 && angle > 0) {
    textX -= (4 / scale) * insideGain;
  }
  const textY = -Math.cos(rad) * (textRadius + yOffset);
  return svg`<text x=${textX} y=${textY} class="label ${positionClass} ${inside ? 'inside' : ''}">${text}</text>`;
}

export interface IntervalTickmarkOptions {
  minValue: number;
  maxValue: number;
  /** Value→angle mapping (degrees, 0° = 12 o'clock). */
  mapAngle: (value: number) => number;
  primaryInterval?: number;
  secondaryInterval?: number;
  tertiaryInterval?: number;
  /** Label the primary-interval ticks and the min/max ends. */
  showLabels: boolean;
  /** Keep interval ticks unlabeled even with `showLabels` (end labels still apply). */
  suppressIntervalLabels?: boolean;
  /** Mark zero when the range spans it: `main` on a bipolar range, `textOnly` at a range end. */
  zeroTick?: boolean;
  /** Skip the max end label (a full circle's max coincides with its min). */
  suppressMaxEndLabel?: boolean;
}

/** Intervals that would emit more ticks than this are ignored (runaway guard). */
export const MAX_INTERVAL_TICKMARKS = 1000;

const TICKMARK_TYPE_RANK: Record<TickmarkType, number> = {
  [TickmarkType.zeroLineThick]: 6,
  [TickmarkType.zeroLine]: 5,
  [TickmarkType.main]: 4,
  [TickmarkType.primary]: 3,
  [TickmarkType.secondary]: 2,
  [TickmarkType.tertiary]: 1,
  [TickmarkType.textOnly]: 0,
};

export function strongerTickmarkType(
  existing: TickmarkType,
  candidate: TickmarkType
): TickmarkType {
  return TICKMARK_TYPE_RANK[candidate] > TICKMARK_TYPE_RANK[existing]
    ? candidate
    : existing;
}

/**
 * Value-interval tick ladder shared by the interval-configured gauges
 * (instrument-radial, gauge-proportional, …): primary/secondary/tertiary
 * ladders deduplicated by value, optional zero tick and min/max end labels,
 * sorted by angle.
 */
export function buildIntervalTickmarks(
  options: IntervalTickmarkOptions
): Tickmark[] {
  const {minValue, maxValue, mapAngle, showLabels} = options;
  const tickmarksByValue = new Map<number, Tickmark>();
  const normalizeValue = (value: number) =>
    Math.abs(value) < 1e-9 ? 0 : Number(value.toFixed(6));

  const upsertTickmark = (value: number, type: TickmarkType, text?: string) => {
    if (!Number.isFinite(value) || value < minValue || value > maxValue) {
      return;
    }
    const normalizedValue = normalizeValue(value);
    const existing = tickmarksByValue.get(normalizedValue);
    if (existing) {
      existing.type = strongerTickmarkType(existing.type, type);
      if (text !== undefined) {
        existing.text = text;
      }
      return;
    }
    tickmarksByValue.set(normalizedValue, {
      angle: mapAngle(normalizedValue),
      type,
      text,
    });
  };

  const addTickmarksAtInterval = (
    interval: number | undefined,
    type: TickmarkType,
    withLabels = false
  ) => {
    if (
      interval === undefined ||
      interval <= 0 ||
      !Number.isFinite(interval) ||
      (maxValue - minValue) / interval > MAX_INTERVAL_TICKMARKS
    ) {
      return;
    }
    const epsilon = Math.abs(interval) * 1e-6;
    const startValue = Math.ceil((minValue - epsilon) / interval) * interval;
    for (
      let value = startValue;
      value < maxValue - epsilon;
      value += interval
    ) {
      const normalizedValue = normalizeValue(value);
      if (
        normalizedValue <= minValue + epsilon ||
        normalizedValue >= maxValue - epsilon
      ) {
        continue;
      }
      upsertTickmark(
        normalizedValue,
        type,
        withLabels && showLabels && !options.suppressIntervalLabels
          ? normalizedValue.toString()
          : undefined
      );
    }
  };

  addTickmarksAtInterval(options.primaryInterval, TickmarkType.primary, true);
  addTickmarksAtInterval(options.secondaryInterval, TickmarkType.secondary);
  addTickmarksAtInterval(options.tertiaryInterval, TickmarkType.tertiary);

  if (options.zeroTick && minValue <= 0 && maxValue >= 0) {
    upsertTickmark(
      0,
      minValue < 0 ? TickmarkType.main : TickmarkType.textOnly,
      showLabels ? '0' : undefined
    );
  }

  if (showLabels) {
    upsertTickmark(minValue, TickmarkType.textOnly, minValue.toString());
    if (!options.suppressMaxEndLabel) {
      upsertTickmark(maxValue, TickmarkType.textOnly, maxValue.toString());
    }
  }

  return [...tickmarksByValue.values()].sort((a, b) => a.angle - b.angle);
}
