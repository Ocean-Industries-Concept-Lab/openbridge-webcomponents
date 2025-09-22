import {svg, SVGTemplateResult, nothing} from 'lit';
import {InstrumentState} from '../../navigation-instruments/types.js';

import {
  adviceMask,
  AdviceState,
  AdviceType,
} from '../../navigation-instruments/watch/advice.js';
import {LinearAdviceRaw} from '../../navigation-instruments/thruster/advice.js';
import {TickmarkStyle} from '../../navigation-instruments/watch/tickmark.js';
import {singleSidedTickmark} from '../../navigation-instruments/thruster/tickmark.js';
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
  }: {height: number; width: number; scaleWidth: number},
  box: {min: number; max: number},
  bar: {value: number} | undefined,
  colors: {container: string},
  options: {
    hideContainer: boolean;
    off: boolean;
    enhanced: boolean;
  },
  tickmarks: {
    mainTickbar?: number;
    primaryTickbarsInterval?: number;
    secondaryTickbarsInterval?: number;
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

  const {boxFill, boxStroke, barFill, barStroke} = getColors(options.enhanced);

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

  const tickmarksY0 = (-(tickmarks.mainTickbar ?? 0) * height) / 200;
  if (tickmarks.mainTickbar !== undefined) {
    const y = tickmarksY0;
    tickmarksSvg.push(
      svg`<line x1=${-width / 2} x2=${width / 2} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
    );
  }

  const tickmarksX = width / 2 - scaleWidth + 4;

  if (tickmarks.primaryTickbarsInterval !== undefined) {
    tickmarksSvg.push(
      ...generateTickmarks({
        height,
        interval: tickmarks.primaryTickbarsInterval,
        tickmarksY0,
        tickmarksX,
        tickmarksWidth: width / 2 - tickmarksX,
      })
    );
  }

  if (tickmarks.secondaryTickbarsInterval !== undefined) {
    tickmarksSvg.push(
      ...generateTickmarks({
        height,
        interval: tickmarks.secondaryTickbarsInterval,
        tickmarksY0,
        tickmarksX,
        tickmarksWidth: 8,
      })
    );
  }

  const boxHeight = ((box.max - box.min) * height) / 200;
  const boxWidth = width - scaleWidth;
  const boxX = -width / 2;
  const boxY = (-box.max * height) / 200;

  // The mask is used to clip the box to the container shape

  const boxSvg = svg`
    <rect width=${boxWidth} height=${boxHeight} x=${boxX} y=${boxY} fill=${boxFill} stroke=${boxStroke} vector-effect="non-scaling-stroke"/>`;
  const advicesSvg = advice.map((a) =>
    renderAdvice(height, width, scaleWidth, a)
  );
  const barSvg = bar
    ? svg`
<rect x=${boxX} y=${(-bar.value * height) / 200 - 4} width=${boxWidth} height="8" rx="4" fill=${barFill} stroke=${barStroke} vector-effect="non-scaling-stroke"/>
`
    : nothing;
  const all = [
    mask,
    containerStroke,
    svg`<g mask=${maskAttr}>${tickmarksSvg}${boxSvg} </g>`,
    advicesSvg,
    barSvg,
  ];
  if (!options.hideContainer) {
    all.splice(0, 0, [container, track]);
  }

  return all;
}

function generateTickmarks({
  height,
  interval,
  tickmarksY0,
  tickmarksX,
  tickmarksWidth,
}: {
  height: number;
  interval: number;
  tickmarksY0: number;
  tickmarksX: number;
  tickmarksWidth: number;
}): SVGTemplateResult[] {
  const tickmarksSvg: SVGTemplateResult[] = [];
  for (
    let y = (interval * height) / 200 + tickmarksY0;
    y < height / 2;
    y += (interval * height) / 200
  ) {
    tickmarksSvg.push(
      svg`<line x1=${tickmarksX} x2=${tickmarksX + tickmarksWidth} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
    );
  }
  for (
    let y = (-interval * height) / 200 + tickmarksY0;
    y > -height / 2;
    y -= (interval * height) / 200
  ) {
    tickmarksSvg.push(
      svg`<line x1=${tickmarksX} x2=${tickmarksX + tickmarksWidth} y1=${y} y2=${y} stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
    );
  }
  return tickmarksSvg;
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
  state: InstrumentState
) {
  let boxColor = 'var(--instrument-enhanced-secondary-color)';
  let setPointColor = 'var(--instrument-enhanced-primary-color)';
  let arrowColor = 'var(--instrument-regular-secondary-color)';
  let containerBackgroundColor = 'var(--instrument-frame-primary-color)';
  let zeroLineColor = 'var(--instrument-enhanced-secondary-color)';
  let hideTicks = false;
  if (options.atSetpoint) {
    setPointColor = boxColor;
  }
  if (state === InstrumentState.active) {
    boxColor = 'var(--instrument-regular-secondary-color)';
    zeroLineColor = 'var(--instrument-regular-secondary-color)';
    setPointColor = 'var(--instrument-regular-primary-color)';
    arrowColor = 'var(--instrument-regular-secondary-color)';
    if (options.atSetpoint) {
      setPointColor = boxColor;
    }
  } else if (state === InstrumentState.loading) {
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
