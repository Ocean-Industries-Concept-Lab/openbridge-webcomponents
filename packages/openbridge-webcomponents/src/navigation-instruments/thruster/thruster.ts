import {LitElement, svg, html, css, nothing, SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {InstrumentState, Priority} from '../types.js';
import {LinearAdvice, LinearAdviceRaw, renderAdvice} from './advice.js';
import {AdviceState} from '../watch/advice.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {singleSidedTickmark} from './tickmark.js';
import {PropellerType, bottomPropeller, topPropeller} from './propeller.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {
  drawSetpointMarker,
  getSetpointOutwardOffset,
  SetpointColorMode,
  SetpointVisualState,
  SETPOINT_ANIMATION_CSS_VAR,
  SETPOINT_ANIMATION_DURATION_DEFAULT,
} from '../../svghelpers/setpoint.js';
import {customElement} from '../../decorator.js';

/**
 * @element obc-thruster
 *
 * @prop {number} thrust - The thrust of the thruster in percent (-100 - +100)
 * @prop {boolean} touching - Highlight the thruster when the lever is being touched
 * @prop {Priority} priority - Color priority: `Priority.enhanced` uses the blue/enhanced color palette, `Priority.regular` (default) uses the standard palette.
 */
@customElement('obc-thruster')
export class ObcThruster extends SetpointMixin(LitElement, {
  defaultDeadband: 1,
}) {
  private _setpointId = `thruster-sp-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: Number}) thrust: number = 0;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Boolean}) tunnel: boolean = false;
  @property({type: Boolean}) singleSided: boolean = false;
  @property({type: Boolean}) singleDirection: boolean = false;
  @property({type: Boolean}) singleDirectionHalfSize: boolean = false;
  @property({type: Array}) advices: LinearAdvice[] = [];
  @property({type: String}) topPropeller: PropellerType = PropellerType.none;
  @property({type: String}) bottomPropeller: PropellerType = PropellerType.none;

  override render() {
    return html`<div class="container">
      ${thruster(this.thrust, this.setpoint, this.state, this.priority, {
        atSetpoint: this.atSetpoint,
        tunnel: this.tunnel,
        setpointAtZeroDeadband: this.setpointAtZeroDeadband,
        autoAtSetpoint: !this.disableAutoAtSetpoint,
        autoSetpointDeadband: this.autoAtSetpointDeadband,
        touching: this.touching,
        singleSided: this.singleSided,
        advices: this.advices,
        singleDirection: this.singleDirection,
        singleDirectionHalfSize: this.singleDirectionHalfSize,
        topPropeller: this.topPropeller,
        bottomPropeller: this.bottomPropeller,
        narrow: !this.tunnel,
        newSetpoint: this.newSetpoint,
        setpointId: this._setpointId,
      })}
    </div>`;
  }

  static override styles = css`
    .container {
      height: 100%;
      width: 100%;
    }

    .container > svg {
      height: 100%;
      width: 100%;
    }
  `;
}

export function thrusterTop(
  height: number,
  value: number,
  colors: {box: string; container: string},
  options: {hideTicks: boolean; hideContainer: boolean; off: boolean}
) {
  const container = svg`
      <path transform="translate(0 -2)" d="M -44 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 72 a 8 8 0 0 1 8 8 V 0 Z" fill=${colors.container} stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;
  const track = options.off
    ? null
    : svg`<rect width="40" height=${height} x="-20" y=${-2 - height} fill="var(--instrument-frame-secondary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>`;

  const tickmarks = [];

  const nTicks = 2;
  const delta = height / nTicks;
  if (!options.hideTicks) {
    for (let i = 1; i < nTicks; i++) {
      tickmarks.push(
        svg`<line x1="-24" x2="-44" y1=${-i * delta - 2}  y2=${
          -i * delta - 2
        } stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
      tickmarks.push(
        svg`<line  x1="24"  x2="44" y1=${-i * delta - 2}  y2=${
          -i * delta - 2
        } stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" vector-effect="non-scaling-stroke"/>`
      );
    }
  }

  const barHeight = (height * value) / 100;
  const barY = -2 - barHeight;
  const bar = svg`<rect width="40" height=${barHeight} x="-20" y=${barY} fill=${colors.box} stroke=${colors.box} vector-effect="non-scaling-stroke"/>`;
  if (options.hideContainer) {
    return [track, tickmarks, bar];
  } else {
    return [container, track, tickmarks, bar];
  }
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
export function thrusterTopSingleSided(
  height: number,
  value: number,
  colors: {box: string; container: string},
  options: {
    hideTicks: boolean;
    flipAdicePattern: boolean;
    hideContainer: boolean;
    narrow: boolean;
    off: boolean;
  },
  advice: LinearAdviceRaw[]
) {
  const container = options.narrow
    ? svg`
      <path transform="translate(0 -2)" d="M -32 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 48 a 8 8 0 0 1 8 8 V 0 Z" fill=${colors.container} stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `
    : svg`
      <path transform="translate(0 -2)" d="M -40 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 56 a 8 8 0 0 1 8 8 V 0 Z" fill=${colors.container} stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;
  let track: SVGTemplateResult | null = options.narrow
    ? svg`
      <path transform="translate(0 -2)" d="M -32 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 32 V 0 Z" fill="var(--instrument-frame-secondary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `
    : svg`
      <path transform="translate(0 -2)" d="M -40 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h 40 V 0 Z" fill="var(--instrument-frame-secondary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
  `;
  if (options.off) {
    track = null;
  }

  const tickmarks = options.hideTicks
    ? []
    : [singleSidedTickmark(height, 50, TickmarkStyle.hinted)];

  const barHeight = (height * value) / 100;
  const barWidth = options.narrow ? 40 : 48;
  const barX = options.narrow ? -32 : -40;
  const barY = -2 - barHeight;
  const maskId = options.flipAdicePattern
    ? 'thrusterBarMask1'
    : 'thrusterBarMask2';
  // The mask is used to clip the bar to the container shape
  const mask = options.hideContainer
    ? nothing
    : svg`
  <defs>
  <mask id=${maskId}>
  <path transform="translate(0 -2)" d="M ${barX} 0  v -${height - 8}  a 8 8 0 0 1 8 -8 h ${barWidth} V 0 Z" fill="white" stroke="white" vector-effect="non-scaling-stroke"/>
  </defs>`;
  const maskAttr = options.hideContainer ? undefined : `url(#${maskId})`;
  const bar = svg`
    ${mask}
    <rect mask=${maskAttr} width=${barWidth} height=${barHeight} x=${barX} y=${barY} fill=${colors.box} stroke=${colors.box} vector-effect="non-scaling-stroke"/>`;
  const advicesSvg = advice.map((a) =>
    renderAdvice(height, a, options.flipAdicePattern)
  );
  const all = [tickmarks, bar, advicesSvg];
  if (!options.hideContainer) {
    all.splice(0, 0, [container, track]);
  }
  if (!options.narrow) {
    return svg`<g transform="translate(4 0)">${all}</g>`;
  } else {
    return all;
  }
}

export function thrusterBottom(
  height: number,
  value: number,
  colors: {box: string; container: string},
  options: {hideTicks: boolean; hideContainer: boolean; off: boolean}
) {
  const container = svg`
      <g transform="rotate(180)">
        ${thrusterTop(height, value, colors, options)}
      </g>
  `;
  return container;
}

function thrusterBottomSingleSided(
  height: number,
  value: number,
  colors: {box: string; container: string},
  options: {
    hideTicks: boolean;
    flipAdicePattern: boolean;
    hideContainer: boolean;
    narrow: boolean;
    off: boolean;
  },
  advice: LinearAdviceRaw[]
) {
  const container = svg`
      <g transform="rotate(180) scale(-1,1)">
        ${thrusterTopSingleSided(height, value, colors, {hideTicks: options.hideTicks, flipAdicePattern: options.flipAdicePattern, hideContainer: options.hideContainer, narrow: options.narrow, off: options.off}, advice)}
      </g>
  `;
  return container;
}

// ============================================================================
// Thruster Setpoint Configuration & Rendering (Unified)
// ============================================================================

/**
 * Fine-tune inward adjustment (px) for thruster setpoint markers.
 * Similar to `RADIAL_SETPOINT_INWARD_ADJUST` in watch.ts — nudges the marker
 * tip closer to the bar edge so it visually aligns with design specs.
 */
const THRUSTER_SETPOINT_INWARD_ADJUST = 4;

/**
 * Configuration for rendering a thruster setpoint marker.
 */
export interface ThrusterSetpointConfig {
  /** Instrument state (determines disabled status) */
  state: InstrumentState;
  /** Color priority (determines enhanced vs regular color palette) */
  priority: Priority;
  /** Whether value is at the setpoint (within deadband) */
  atSetpoint: boolean;
  /** User is physically interacting (renders focus visual state) */
  touching: boolean;
  /** Deadband for zero detection */
  setpointAtZeroDeadband: number;
  /** Whether the thruster is single-sided (marker on right side only) */
  singleSided: boolean;
  /** Whether to use narrow layout */
  narrow: boolean;
  /** Pending setpoint during adjustment (shows dual markers) */
  newSetpoint?: number;
  /** Unique ID prefix for SVG defs (avoids collisions with multiple instances) */
  id: string;
  /** Enable CSS-animated confirm transition for setpoint markers. */
  animateSetpoint?: boolean;
  /** Value of departing new-setpoint during confirm animation fade-out. */
  departingNewSetpoint?: number;
}

/**
 * Compute the Y coordinate for a thruster setpoint marker.
 *
 * @param height - Thruster bar height
 * @param value - Setpoint value (percent, -100 to +100)
 * @param isAtZero - Whether the value is within zero-snap deadband
 * @returns Y offset (negative = upward)
 */
function thrusterSetpointY(
  height: number,
  value: number,
  isAtZero: boolean
): number {
  return -(isAtZero
    ? 0
    : Math.sign(value) * ((height * Math.abs(value)) / 100 + 2));
}

/**
 * Derive visual state for a thruster setpoint, mirroring the radial and linear
 * derivation functions in setpoint.ts and external-scale.ts.
 */
function deriveThrusterSetpointVisualState(config: {
  state: InstrumentState;
  priority: Priority;
  atSetpoint: boolean;
  touching: boolean;
  setpointAtZero: boolean;
  hasNewSetpoint: boolean;
}): {
  visualState: SetpointVisualState;
  colorMode: SetpointColorMode;
  disabled: boolean;
} {
  const disabled =
    config.state === InstrumentState.loading ||
    config.state === InstrumentState.off;
  const colorMode =
    config.priority === Priority.enhanced
      ? SetpointColorMode.enhanced
      : SetpointColorMode.regular;

  if (disabled) {
    return {
      visualState: SetpointVisualState.notEqual,
      colorMode,
      disabled: true,
    };
  }

  // Focus: touching without pending adjustment
  if (config.touching && !config.hasNewSetpoint) {
    return {visualState: SetpointVisualState.focus, colorMode, disabled: false};
  }

  // At zero
  if (config.atSetpoint && config.setpointAtZero) {
    return {
      visualState: SetpointVisualState.equalZero,
      colorMode,
      disabled: false,
    };
  }

  // At setpoint
  if (config.atSetpoint) {
    return {visualState: SetpointVisualState.equal, colorMode, disabled: false};
  }

  return {
    visualState: SetpointVisualState.notEqual,
    colorMode,
    disabled: false,
  };
}

/**
 * Render thruster setpoint marker(s) using the unified `drawSetpointMarker()`
 * system from `setpoint.ts`.
 *
 * Replaces the legacy `setpointSvg()` function with proper visual states
 * (focus, equalZero, equal, notEqual), themed colors, and sized markers.
 *
 * For double-sided thrusters, renders matching markers on both sides of the bar.
 * When `newSetpoint` is defined, renders dual markers (original dimmed + new in focus).
 *
 * @param height - Thruster bar height in SVG units
 * @param setpointValue - Setpoint value (percent, -100 to +100)
 * @param config - Setpoint rendering configuration
 * @returns SVG template with positioned setpoint marker(s)
 */
export function renderThrusterSetpoint(
  height: number,
  setpointValue: number,
  config: ThrusterSetpointConfig
): SVGTemplateResult {
  const setpointAtZero =
    Math.abs(setpointValue) < config.setpointAtZeroDeadband;
  const hasNewSetpoint = config.newSetpoint !== undefined;
  const hasDepartingNewSetpoint = config.departingNewSetpoint !== undefined;
  const animate = config.animateSetpoint === true;

  const {visualState, colorMode, disabled} = deriveThrusterSetpointVisualState({
    state: config.state,
    priority: config.priority,
    atSetpoint: config.atSetpoint,
    touching: config.touching,
    setpointAtZero,
    hasNewSetpoint,
  });

  // Y position (matches legacy formula)
  const y = thrusterSetpointY(height, setpointValue, setpointAtZero);

  // X position: legacy base offset + visual state outward offset
  // Legacy base: 28 for double-sided, 16 for single-sided narrow, 20 for single-sided non-narrow
  const baseX = 28 + (config.singleSided ? -12 : 0) + (config.narrow ? 0 : 4);
  const outwardOffset = getSetpointOutwardOffset(visualState);
  const tipX = baseX + outwardOffset - THRUSTER_SETPOINT_INWARD_ADJUST;

  // Render original setpoint marker
  const opacity = hasNewSetpoint ? 0.75 : 1;

  // Right marker: rotate(90) makes tip point left (inward toward bar)
  const rightMarker = drawSetpointMarker({
    visualState,
    colorMode,
    disabled,
    id: `${config.id}-r`,
  });

  const result: SVGTemplateResult[] = [];

  if (animate) {
    const duration = `var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT})`;
    result.push(
      svg`<g style="transform: translate(${tipX}px, ${y}px) rotate(90deg); opacity: ${opacity}; transition: transform ${duration} ease-out, opacity ${duration} ease-out;">${rightMarker}</g>`
    );
    if (!config.singleSided) {
      const leftMarker = drawSetpointMarker({
        visualState,
        colorMode,
        disabled,
        id: `${config.id}-l`,
      });
      result.push(
        svg`<g style="transform: translate(${-tipX}px, ${y}px) rotate(-90deg); opacity: ${opacity}; transition: transform ${duration} ease-out, opacity ${duration} ease-out;">${leftMarker}</g>`
      );
    }
  } else {
    result.push(
      svg`<g transform="translate(${tipX}, ${y}) rotate(90)" opacity="${opacity}">${rightMarker}</g>`
    );
    if (!config.singleSided) {
      const leftMarker = drawSetpointMarker({
        visualState,
        colorMode,
        disabled,
        id: `${config.id}-l`,
      });
      result.push(
        svg`<g transform="translate(${-tipX}, ${y}) rotate(-90)" opacity="${opacity}">${leftMarker}</g>`
      );
    }
  }

  // New setpoint marker in focus state (dual-marker adjustment preview)
  // OR departing newSetpoint during confirm animation fade-out
  if (hasNewSetpoint || hasDepartingNewSetpoint) {
    const isActive = hasNewSetpoint;
    const newValue = isActive
      ? config.newSetpoint!
      : config.departingNewSetpoint!;
    const newAtZero = Math.abs(newValue) < config.setpointAtZeroDeadband;
    const newY = thrusterSetpointY(height, newValue, newAtZero);
    const focusOffset = getSetpointOutwardOffset(SetpointVisualState.focus);
    const newTipX = baseX + focusOffset - THRUSTER_SETPOINT_INWARD_ADJUST;
    const targetOpacity = isActive ? 1 : 0;

    const newRightMarker = drawSetpointMarker({
      visualState: SetpointVisualState.focus,
      colorMode,
      disabled: false,
      id: `${config.id}-nr`,
    });

    if (animate) {
      const duration = `var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT})`;
      result.push(
        svg`<g style="transform: translate(${newTipX}px, ${newY}px) rotate(90deg); opacity: ${targetOpacity}; transition: opacity ${duration} ease-out;">${newRightMarker}</g>`
      );
      if (!config.singleSided) {
        const newLeftMarker = drawSetpointMarker({
          visualState: SetpointVisualState.focus,
          colorMode,
          disabled: false,
          id: `${config.id}-nl`,
        });
        result.push(
          svg`<g style="transform: translate(${-newTipX}px, ${newY}px) rotate(-90deg); opacity: ${targetOpacity}; transition: opacity ${duration} ease-out;">${newLeftMarker}</g>`
        );
      }
    } else {
      result.push(
        svg`<g transform="translate(${newTipX}, ${newY}) rotate(90)" opacity="${targetOpacity}">${newRightMarker}</g>`
      );
      if (!config.singleSided) {
        const newLeftMarker = drawSetpointMarker({
          visualState: SetpointVisualState.focus,
          colorMode,
          disabled: false,
          id: `${config.id}-nl`,
        });
        result.push(
          svg`<g transform="translate(${-newTipX}, ${newY}) rotate(-90)" opacity="${targetOpacity}">${newLeftMarker}</g>`
        );
      }
    }
  }

  return svg`${result}`;
}

/**
 * @deprecated Use `renderThrusterSetpoint` instead, which supports
 * focus visual state, equalZero sizing, and the unified marker system.
 *
 * Legacy setpoint marker rendering with hardcoded SVG IDs.
 * Kept for backward compatibility only.
 */
export function setpointSvg(
  height: number,
  value: number,
  setpointAtZero: boolean,
  colors: {fill: string; stroke: string},
  options: {
    filled: boolean;
    singleSided: boolean;
    narrow: boolean;
  }
) {
  const y = -(setpointAtZero
    ? 0
    : Math.sign(value) * ((height * Math.abs(value)) / 100 + 2));
  const extra = (options.singleSided ? -12 : 0) + (options.narrow ? 0 : 4);
  let path;
  if (options.filled) {
    path =
      'M23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
  } else {
    path =
      'M18.5836 8L5.4086 8L11.9961 17.1526L18.5836 8ZM23.5119 8C24.6981 6.35191 23.5696 4 21.5926 4L2.39959 4C0.422598 4 -0.705911 6.35191 0.480283 8L11.9961 24L23.5119 8Z';
  }
  return svg`
    <defs>
      <g id="thrusterSetpoint">
        <path fill-rule="evenodd" clip-rule="evenodd" transform="translate(24 -12) rotate(90)" d=${path} vector-effect="non-scaling-stroke"/>
      </g>
      <mask id="thrusterSetpointMask">
        <rect x="-20" y="-20" width="50" height="50" fill="white" />
        <use href="#thrusterSetpoint" fill="black" />
      </mask>
    </defs>
  <g transform="translate(0 ${y})">
    <use href="#thrusterSetpoint" fill=${colors.fill} stroke="none" transform="translate(${28 + extra} 0)"/>
    <use href="#thrusterSetpoint" mask="url(#thrusterSetpointMask)" transform="translate(${28 + extra} 0)" fill="none" stroke=${colors.stroke} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    ${
      options.singleSided
        ? null
        : svg`
    <use href="#thrusterSetpoint" transform="rotate(180) translate(28 0)" fill=${colors.fill} stroke="none"/>
    <use href="#thrusterSetpoint" transform="rotate(180) translate(28 0)" mask="url(#thrusterSetpointMask)" fill="none" stroke=${colors.stroke} stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      `
    }
  </g>
  `;
}

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

export function thruster(
  thrust: number,
  setpoint: number | undefined,
  state: InstrumentState,
  priority: Priority,
  options: {
    atSetpoint: boolean;
    tunnel: boolean;
    singleSided: boolean;
    singleDirection: boolean;
    singleDirectionHalfSize: boolean;
    setpointAtZeroDeadband: number;
    autoAtSetpoint: boolean;
    autoSetpointDeadband: number;
    touching: boolean;
    advices: LinearAdvice[];
    topPropeller: PropellerType;
    bottomPropeller: PropellerType;
    narrow: boolean;
    /** Pending setpoint during adjustment (shows dual markers) */
    newSetpoint?: number;
    /** Unique ID prefix for setpoint SVG defs. Falls back to legacy hardcoded IDs. */
    setpointId?: string;
    /** Enable CSS-animated confirm transition. */
    animateSetpoint?: boolean;
    /** Departing new-setpoint value during confirm animation fade-out. */
    departingNewSetpoint?: number;
  }
) {
  if (options.tunnel) {
    thrust = -thrust;
    setpoint = setpoint === undefined ? undefined : -setpoint;
  }

  if (!options.singleSided && options.advices.length > 0) {
    throw new Error('Double sided thruster does not support advice');
  }

  options.atSetpoint = atSetpoint(thrust, setpoint, options);

  const tc = thrusterColors(options, state, priority);

  let centerLine = svg`
    <rect x="-44" y="-2" width="88" height="4" stroke-width="1" fill=${tc.zeroLineColor} stroke=${tc.zeroLineColor} vector-effect="non-scaling-stroke"/>
  `;
  if (options.singleSided) {
    const width = options.narrow ? 64 : 72;
    const x = options.narrow ? -32 : -36;
    centerLine = svg`<rect x=${x} y="-2" width=${width} height="4" stroke-width="1" fill=${tc.zeroLineColor} stroke=${tc.zeroLineColor} vector-effect="non-scaling-stroke"/>`;
  }

  const setpointAtZero =
    Math.abs(setpoint || 0) < options.setpointAtZeroDeadband;

  const {topAdvices, bottomAdvices} = convertThrustAdvices(
    options.advices,
    setpoint
  );

  const thrusterSvg = [];
  const baseheight = options.topPropeller === PropellerType.none ? 134 : 106;
  const height = options.singleDirection ? baseheight * 2 : baseheight;
  if (options.singleSided) {
    thrusterSvg.push(
      thrusterTopSingleSided(
        height,
        Math.max(thrust, 0),
        {box: tc.boxColor, container: tc.containerBackgroundColor},
        {
          hideTicks: tc.hideTicks,
          flipAdicePattern: false,
          hideContainer: false,
          narrow: options.narrow,
          off: state === InstrumentState.off,
        },
        topAdvices
      )
    );
    if (!(options.singleDirection || options.singleDirectionHalfSize)) {
      thrusterSvg.push(
        thrusterBottomSingleSided(
          height,
          Math.max(-thrust, 0),
          {box: tc.boxColor, container: tc.containerBackgroundColor},
          {
            hideTicks: tc.hideTicks,
            flipAdicePattern: true,
            hideContainer: false,
            narrow: options.narrow,
            off: state === InstrumentState.off,
          },
          bottomAdvices
        )
      );
    }
    thrusterSvg.push(centerLine);
  } else {
    thrusterSvg.push(
      thrusterTop(
        height,
        Math.max(thrust, 0),
        {box: tc.boxColor, container: tc.containerBackgroundColor},
        {
          hideTicks: tc.hideTicks,
          hideContainer: false,
          off: state === InstrumentState.off,
        }
      )
    );
    if (!options.singleDirection) {
      thrusterSvg.push(
        thrusterBottom(
          height,
          Math.max(-thrust, 0),
          {box: tc.boxColor, container: tc.containerBackgroundColor},
          {
            hideTicks: tc.hideTicks,
            hideContainer: false,
            off: state === InstrumentState.off,
          }
        )
      );
    }
    thrusterSvg.push(centerLine);
  }
  if (setpoint !== undefined) {
    if (options.setpointId) {
      // Unified setpoint rendering with proper visual states
      thrusterSvg.push(
        renderThrusterSetpoint(height, setpoint, {
          state,
          priority,
          atSetpoint: options.atSetpoint,
          touching: options.touching,
          setpointAtZeroDeadband: options.setpointAtZeroDeadband,
          singleSided: options.singleSided,
          narrow: options.narrow,
          newSetpoint: options.newSetpoint,
          id: options.setpointId,
          animateSetpoint: options.animateSetpoint,
          departingNewSetpoint: options.departingNewSetpoint,
        })
      );
    } else {
      // Legacy fallback (deprecated — no focus/equalZero visual states)
      thrusterSvg.push(
        setpointSvg(
          height,
          setpoint,
          setpointAtZero,
          {
            fill: tc.setPointColor,
            stroke: 'var(--border-silhouette-color)',
          },
          {
            filled:
              priority === Priority.enhanced || state === InstrumentState.off,
            singleSided: options.singleSided,
            narrow: options.narrow,
          }
        )
      );
    }
  }

  if (options.tunnel) {
    return svg`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-160 -64  320 128" x="-160" y="-64">
        <g transform="rotate(-90)">
          ${thrusterSvg}
        </g>
      </svg>`;
  } else {
    let viewBox = '-80 -160 160 320';
    let y = -160;
    if (options.singleDirection) {
      viewBox = '-80 -300 160 320';
      y = -320;
    }
    const top = topPropeller(height, tc.arrowColor, options.topPropeller);
    const bottom = bottomPropeller(
      options.singleDirectionHalfSize ? 0.5 : height,
      options.bottomPropeller
    );
    return svg`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox=${viewBox} x="-80" y=${y} width="160" height="320">
      ${top}
      ${bottom}
      ${thrusterSvg}
    </svg>
  `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-thruster': ObcThruster;
  }
}

export function convertThrustAdvices(
  advices: LinearAdvice[],
  thrustSetpoint: number | undefined
): {topAdvices: LinearAdviceRaw[]; bottomAdvices: LinearAdviceRaw[]} {
  const rawAdvices: LinearAdviceRaw[] = advices.map((a) => {
    const triggered =
      thrustSetpoint !== undefined &&
      thrustSetpoint >= a.min &&
      thrustSetpoint <= a.max;
    let state: AdviceState;
    if (triggered) {
      state = AdviceState.triggered;
    } else if (a.hinted) {
      state = AdviceState.hinted;
    } else {
      state = AdviceState.regular;
    }
    return {
      min: a.min,
      max: a.max,
      type: a.type,
      state,
      hinted: a.hinted,
    };
  });

  const topAdvices = rawAdvices.filter((a) => a.min >= 0);
  const bottomAdvices = rawAdvices
    .filter((a) => a.max <= 0)
    .map((a) => ({...a, min: -a.max, max: -a.min}));
  return {topAdvices, bottomAdvices};
}

export function thrusterColors(
  options: {atSetpoint: boolean; touching: boolean},
  state: InstrumentState,
  priority: Priority
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
