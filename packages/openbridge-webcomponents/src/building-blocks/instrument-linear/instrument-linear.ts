import {svg, SVGTemplateResult, nothing} from 'lit';
import {InstrumentState, Priority} from '../../navigation-instruments/types.js';

import {LinearAdviceRaw} from '../../navigation-instruments/thruster/advice.js';
import {renderAdvice} from './advice.js';

export function atSetpoint(
  thrust: number,
  setpoint: number | undefined,
  options: {
    autoAtSetpoint: boolean;
    autoSetpointDeadband: number;
    touching: boolean;
    atSetpoint: boolean;
  }
): boolean {
  if (options.touching) {
    return false;
  }

  if (options.autoAtSetpoint && setpoint !== undefined) {
    return Math.abs(thrust - setpoint) < options.autoSetpointDeadband;
  }

  return options.atSetpoint;
}

/**
 * @param height - The height of the thruster
 * @param value - The value of the thruster
 * @param colors - The colors of the thruster (box and container)
 * @param options - The options of the thruster
 *  - hideTicks - Whether to hide the ticks
 *  - flipAdicePattern - Whether to flip the advice pattern, to be used when the thruster is on the bottom
 *  - hideContainer - Whether to not render the rounded container/wrapper around the thruster,
 *                    used by the main engine
 *  - narrow - Whether to use the narrow version of the thruster
 * @param advice - The advice of the thruster
 * @returns - The thruster top single sided
 */
export function watchfaceLinear(
  {
    height,
    width,
    scaleWidth,
    minValue,
    maxValue,
  }: {
    height: number;
    width: number;
    scaleWidth: number;
    minValue: number;
    maxValue: number;
  },
  box: {min: number; max: number; fill?: string}[],
  bar: {value: number} | undefined,
  colors: {container: string},
  options: {
    hideContainer: boolean;
    off: boolean;
    priority: Priority;
  },
  tickmarks: {
    /** Array of values where full-width main tickmarks are drawn. */
    mainTickmarks?: number[];
    primaryTickmarkInterval?: number;
    secondaryTickmarkInterval?: number;
  },
  advice: LinearAdviceRaw[]
) {
  const r = 8;
  const path = `M -${width / 2} 0  V -${height / 2 - 8}  a 8 8 0 0 1 8 -8 h ${width - r * 2} a 8 8 0 0 1 8 8 V ${height / 2 - r} a 8 8 0 0 1 -8 8 h -${width - 2 * r} a 8 8 0 0 1 -8 -8 Z`;
  const container = svg`
      <path d=${path} 
       fill=${colors.container}
       />
  `;
  const w2 = width - scaleWidth - r;
  let track: SVGTemplateResult | typeof nothing = svg`
      <path d="M -${width / 2} 0  V -${height / 2 - r}  a 8 8 0 0 1 8 -8 h ${w2} V ${height / 2} h -${w2} a 8 8 0 0 1 -8 -8 Z" 
       stroke="var(--instrument-frame-secondary-color)"
       fill="var(--instrument-frame-secondary-color)"
       vector-effect="non-scaling-stroke"
       />
  `;
  const containerStroke = svg`
      <path d=${path} 
      stroke="var(--instrument-frame-tertiary-color)" 
      fill="none" 
      vector-effect="non-scaling-stroke"/>
  `;
  if (options.off) {
    track = nothing;
  }

  const {boxFill, boxStroke, barFill, barStroke} = getColors(
    options.priority === Priority.enhanced
  );

  const tickmarksSvg: SVGTemplateResult[] = [];
  const maskId = 'boxMask';
  const mask = options.hideContainer
    ? nothing
    : svg`
  <defs>
  <mask id=${maskId}>
  <path d=${path} fill="white" stroke="white" vector-effect="non-scaling-stroke"/>
  </defs>`;
  const maskAttr = options.hideContainer ? undefined : `url(#${maskId})`;

  const skipValues: number[] = [];
  if (tickmarks.mainTickmarks) {
    for (const value of tickmarks.mainTickmarks) {
      if (value < minValue || value > maxValue) continue;
      const y = valueToY(value, minValue, maxValue, height);
      tickmarksSvg.push(
        svg`<line x1=${-width / 2} x2=${width / 2} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
      skipValues.push(value);
    }
  }

  const tickmarksX = width / 2 - scaleWidth + 4;

  if (tickmarks.primaryTickmarkInterval !== undefined) {
    const {svgs, values} = generateTickmarks({
      height,
      interval: tickmarks.primaryTickmarkInterval,
      minValue,
      maxValue,
      tickmarksX,
      tickmarksWidth: width / 2 - tickmarksX,
      skipValues,
    });
    tickmarksSvg.push(...svgs);
    skipValues.push(...values);
  }

  if (tickmarks.secondaryTickmarkInterval !== undefined) {
    const {svgs, values} = generateTickmarks({
      height,
      interval: tickmarks.secondaryTickmarkInterval,
      minValue,
      maxValue,
      tickmarksX,
      tickmarksWidth: 8,
      skipValues,
    });
    tickmarksSvg.push(...svgs);
    skipValues.push(...values);
  }
  const boxX = -width / 2;
  const boxWidth = width - scaleWidth;
  const boxesSvg = box.map((b) => {
    const minY = valueToY(b.min, minValue, maxValue, height);
    const maxY = valueToY(b.max, minValue, maxValue, height);
    const boxY = Math.min(minY, maxY);
    const boxHeight = Math.abs(maxY - minY);
    return svg`<rect width=${boxWidth} height=${boxHeight} x=${boxX} y=${boxY} fill=${b.fill ?? boxFill} stroke=${b.fill ?? boxStroke} vector-effect="non-scaling-stroke"/>`;
  });

  const advicesSvg = advice.map((a) =>
    renderAdvice(height, minValue, maxValue, width, scaleWidth, a)
  );
  const barSvg = bar
    ? svg`
<rect x=${boxX} y=${valueToY(bar.value, minValue, maxValue, height) - 4} width=${boxWidth} height="8" rx="4" fill=${barFill} stroke=${barStroke} vector-effect="non-scaling-stroke"/>
`
    : nothing;
  const all: (SVGTemplateResult | SVGTemplateResult[] | symbol)[] = [
    mask,
    containerStroke,
    svg`<g mask=${maskAttr}>${tickmarksSvg}${boxesSvg} </g>`,
    advicesSvg,
    barSvg,
  ];
  if (!options.hideContainer) {
    all.splice(0, 0, [container, track] as SVGTemplateResult[] | symbol);
  }

  return all;
}

export function valueToY(
  value: number,
  minValue: number,
  maxValue: number,
  height: number
): number {
  const range = maxValue - minValue;
  return ((-value + minValue) * height) / range + height / 2;
}

function generateTickmarks({
  height,
  interval,
  tickmarksX,
  tickmarksWidth,
  minValue,
  maxValue,
  skipValues,
}: {
  height: number;
  interval: number;
  tickmarksX: number;
  tickmarksWidth: number;
  minValue: number;
  maxValue: number;
  skipValues: number[];
}): {svgs: SVGTemplateResult[]; values: number[]} {
  const tickmarksSvg: SVGTemplateResult[] = [];
  const values: number[] = [];
  for (let v = 0; v < maxValue; v += interval) {
    if (skipValues.includes(v)) {
      continue;
    }
    const y = valueToY(v, minValue, maxValue, height);
    values.push(v);
    tickmarksSvg.push(
      svg`<line x1=${tickmarksX} x2=${tickmarksX + tickmarksWidth} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
    );
  }
  for (let v = -interval; v > minValue; v -= interval) {
    if (skipValues.includes(v)) {
      continue;
    }
    const y = valueToY(v, minValue, maxValue, height);
    values.push(v);
    tickmarksSvg.push(
      svg`<line x1=${tickmarksX} x2=${tickmarksX + tickmarksWidth} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
    );
  }
  return {svgs: tickmarksSvg, values};
}

function getColors(enhanced: boolean): {
  boxFill: string;
  boxStroke: string;
  barFill: string;
  barStroke: string;
} {
  if (enhanced) {
    return {
      boxFill: 'var(--instrument-enhanced-tertiary-color)',
      boxStroke: 'var(--instrument-enhanced-tertiary-color)',
      barFill: 'var(--instrument-enhanced-secondary-color)',
      barStroke: 'var(--instrument-enhanced-tertiary-color)',
    };
  } else {
    return {
      boxFill: 'var(--instrument-regular-tertiary-color)',
      boxStroke: 'var(--instrument-regular-tertiary-color)',
      barFill: 'var(--instrument-regular-secondary-color)',
      barStroke: 'var(--instrument-regular-tertiary-color)',
    };
  }
}

export function thrusterColors(
  options: {atSetpoint: boolean; touching: boolean},
  state: InstrumentState,
  priority: Priority = Priority.regular
) {
  const isEnhanced = priority === Priority.enhanced;
  let boxColor = isEnhanced
    ? 'var(--instrument-enhanced-secondary-color)'
    : 'var(--instrument-regular-secondary-color)';
  let setPointColor = isEnhanced
    ? 'var(--instrument-enhanced-primary-color)'
    : 'var(--instrument-regular-primary-color)';
  let arrowColor = 'var(--instrument-regular-secondary-color)';
  let containerBackgroundColor = 'var(--instrument-frame-primary-color)';
  let zeroLineColor = isEnhanced
    ? 'var(--instrument-enhanced-secondary-color)'
    : 'var(--instrument-regular-secondary-color)';
  let hideTicks = false;
  if (options.atSetpoint) {
    setPointColor = boxColor;
  }
  if (state === InstrumentState.loading) {
    boxColor = 'transparent';
    setPointColor = 'var(--instrument-frame-tertiary-color)';
    zeroLineColor = 'var(--instrument-frame-tertiary-color)';
    arrowColor = 'var(--instrument-regular-secondary-color)';
    hideTicks = true;
  } else if (state === InstrumentState.off) {
    boxColor = 'transparent';
    setPointColor = 'var(--instrument-frame-tertiary-color)';
    arrowColor = 'var(--instrument-frame-tertiary-color)';
    zeroLineColor = 'var(--instrument-frame-tertiary-color)';
    hideTicks = true;
    containerBackgroundColor = 'transparent';
  }
  return {
    zeroLineColor,
    boxColor,
    containerBackgroundColor,
    hideTicks,
    setPointColor,
    arrowColor,
  };
}
