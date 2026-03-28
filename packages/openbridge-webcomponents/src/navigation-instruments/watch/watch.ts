import {
  LitElement,
  PropertyValues,
  SVGTemplateResult,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {property, state} from 'lit/decorators.js';
import {circle} from '../../svghelpers/index.js';
import {roundedArch} from '../../svghelpers/roundedArch.js';
import {
  cssSafeAngle,
  deriveRadialSetpointConfig,
  drawSetpointMarker,
  getSetpointAnimationDurationMs,
  getSetpointOutwardOffset,
  RADIAL_SETPOINT_RADIUS,
  SetpointVisualState,
  SETPOINT_ANIMATION_CSS_VAR,
  SETPOINT_ANIMATION_DURATION_DEFAULT,
} from '../../svghelpers/setpoint.js';
import {InstrumentState, Priority} from '../types.js';
import compentStyle from './watch.css?inline';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {adviceMask, AngleAdviceRaw, renderAdvice} from './advice.js';
import {Tickmark, TickmarkStyle, tickmark} from './tickmark.js';
export {TickmarkStyle};
import {
  RotType,
  RotPosition,
  renderRotDots,
  renderRotBarStatic,
  renderRotBarDots,
  shortestAngularDeltaDeg,
} from '../rate-of-turn/rot-renderer.js';
export {RotType, RotPosition};
import {RateOfTurnController} from '../rate-of-turn/rate-of-turn.controller.js';
import {
  renderLabels,
  renderNorthArrow,
  getLabelPositions,
  LabelPosition,
} from './label.js';
import {VesselImage, VesselImageSize, vesselImages} from './vessel.js';
import {renderCurrent, renderWind} from './environment.js';
import {customElement} from '../../decorator.js';
export {VesselImage, VesselImageSize};

export enum WatchCircleType {
  single = 'single',
  double = 'double',
  doubleThin = 'doubleThin',
  triple = 'triple',
}

export interface WatchArea {
  startAngle: number;
  endAngle: number;
  roundOutsideCut: boolean;
  roundInsideCut: boolean;
}

export interface WatchBarArea {
  startAngle: number;
  endAngle: number;
  fillColor: string;
}

export interface WatchNeedle {
  angle: number;
  fillColor: string;
  strokeColor: string;
}

export interface WatchVessel {
  size: VesselImageSize;
  transform: string;
  vesselImage: VesselImage;
}

export const OUTER_RING_RADIUS = 368 / 2;
const RING2_RADIUS = 320 / 2;
const RING3_RADIUS = 224 / 2;
const RING3B_RADIUS = 272 / 2;
const RING4_RADIUS = 176 / 2;

const RADIAL_SETPOINT_INWARD_ADJUST = 4;

/**
 * `<obc-watch>` - Core SVG renderer for circular/radial watch-based instruments.
 *
 * This component renders all circular instrument elements including rings, tickmarks,
 * bar areas, needles, advices, setpoints, vessel images, and environmental indicators
 * (wind/current). It serves as the foundation for compass, heading, rudder, speed-gauge,
 * and other radial navigation instruments.
 *
 * ## Setpoint Behavior
 *
 * The setpoint marker visual state is derived from the combination of `atAngleSetpoint`,
 * `angleSetpoint`, and `angleSetpointAtZeroDeadband` properties:
 *
 * - **notEqual**: Value differs from setpoint (triangular marker, offset outward)
 * - **equal**: Value matches setpoint (line marker, sits on ring)
 * - **equalZero**: Value matches setpoint at zero angle (double-line marker, offset outward)
 * - **focus**: User is actively adjusting via `newAngleSetpoint` - shows focus visual state
 *
 * ## newAngleSetpoint Pattern
 *
 * When `newAngleSetpoint` is defined, TWO setpoint markers are rendered:
 * 1. Original marker at `angleSetpoint` - dimmed (0.75 opacity)
 * 2. New marker at `newAngleSetpoint` - focus visual state, full opacity
 *
 * This enables the "adjustment preview" UX where users can see both the current
 * and proposed setpoint positions simultaneously.
 *
 * The `RADIAL_SETPOINT_INWARD_ADJUST` constant (4px) fine-tunes radial setpoint positioning
 * to match Figma designs, applied on top of visual state offsets from setpoint.ts.
 *
 * The `colorMode` property allows overriding the derived color mode (enhanced for enhanced priority,
 * regular for other states).
 *
 * ## Setpoint Animation (`animateSetpoint`)
 *
 * When `animateSetpoint` is true and a confirm occurs (`newAngleSetpoint` → `undefined`):
 * - The original setpoint slides to the new position via CSS transition
 * - The departing new-setpoint marker fades out
 * - Angular transitions always take the shortest path via accumulated
 *   CSS-safe angles (`cssSafeAngle()`), so even 350° → 10° animates +20°
 *
 * Duration: `var(--setpoint-animation-duration, 300ms)`
 *
 * Internally, `_departingNewAngleSetpoint` captures the departing angle during confirm
 * fade-out and `_animationTimer` auto-clears it after the animation duration.
 * `_setpointCssAngle` tracks the accumulated CSS angle to avoid long-way-around
 * transitions across the 0°/360° boundary.
 *
 * @property {InstrumentState} state - Instrument state (active, loading, off)
 * @property {Priority} priority - Color priority (enhanced = blue palette, regular = gray palette)
 * @property {number|undefined} angleSetpoint - Setpoint angle in degrees (0° = 12 o'clock)
 * @property {number|undefined} newAngleSetpoint - New setpoint being adjusted (focus mode)
 * @property {boolean} atAngleSetpoint - Whether value matches setpoint (within deadband)
 * @property {number} angleSetpointAtZeroDeadband - Deadband for zero detection (default 0.5°)
 * @property {boolean} setpointOverride - Override to derive setpoint color from priority regardless of state
 * @property {RotType|undefined} rotType - ROT visualization type: `'dots'` (spinning dots) or `'bar'` (arc bar with clipped dots). Undefined hides the ROT layer.
 * @property {RotPosition} rotPosition - Track on which ROT elements are placed: `'scale'` (on the outer ring) or `'innerCircle'` (default, inside the inner ring)
 * @property {number} rotStartAngle - Start angle of the ROT bar arc in degrees (0° = 12 o'clock, clockwise). Only used when `rotType` is `'bar'`.
 * @property {number} rotEndAngle - End angle of the ROT bar arc in degrees. The bar is hidden when the difference from `rotStartAngle` is less than 0.1°.
 * @property {string|undefined} rotColor - Override color for ROT dots and the bar end-dot stroke. Defaults to `--instrument-regular-secondary-color`.
 * @property {string|undefined} rotBarColor - Override fill color for the ROT bar arc background. Defaults to `--instrument-regular-tertiary-color`.
 * @property {number} rotationsPerMinute - Spin speed of the ROT dot ring in rotations per minute. Sign controls direction (positive = clockwise).
 */
@customElement('obc-watch')
export class ObcWatch extends LitElement {
  private _setpointId = `watch-setpoint-${Math.random().toString(36).slice(2, 9)}`;
  private _newSetpointId = `watch-new-setpoint-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: String}) watchCircleType: WatchCircleType =
    WatchCircleType.single;
  @property({type: Boolean}) northArrow: boolean = false;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Number}) newAngleSetpoint: number | undefined;
  @property({type: Boolean}) atAngleSetpoint: boolean = false;
  @property({type: Number}) angleSetpointAtZeroDeadband: number = 0.5;
  @property({type: Boolean}) setpointOverride: boolean = false;
  @property({type: Boolean}) touching: boolean = false;

  @property({type: Boolean}) animateSetpoint: boolean = false;

  @state() private _departingNewAngleSetpoint: number | undefined;
  private _animationTimer?: ReturnType<typeof setTimeout>;

  /**
   * Accumulated CSS-safe angle for the original setpoint marker.
   * Ensures CSS rotate() transitions always take the shortest path,
   * even across the 0°/360° boundary.
   */
  private _setpointCssAngle: number = 0;

  /** Whether the setpoint CSS angle has been initialised (to skip transition on first render). */
  private _setpointCssAngleInit = false;
  @property({type: Number}) padding: number | undefined;
  @property({type: Array, attribute: false}) areas: WatchArea[] = [];
  @property({type: Array, attribute: false}) barAreas: WatchBarArea[] = [];
  @property({type: Array, attribute: false}) needles: WatchNeedle[] = [];
  @property({type: Array, attribute: false}) tickmarks: Tickmark[] = [];
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Array, attribute: false}) advices: AngleAdviceRaw[] = [];
  @property({type: Boolean}) crosshairEnabled: boolean = false;
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Array, attribute: false}) vessels: WatchVessel[] = [];
  @property({type: Number}) wind: number | null = null;
  @property({type: Number}) windFromDirectionDeg: number | null = null;
  @property({type: Number}) windSymbolRadius: number | null = null;
  @property({type: String}) windColor: string | undefined;
  @property({type: Number}) current: number | null = null;
  @property({type: Number}) currentFromDirectionDeg: number | null = null;
  @property({type: Number}) currentSymbolRadius: number | null = null;
  @property({type: String}) currentColor: string | undefined;
  @property({type: Boolean}) starboardPortIndicator: boolean = false;
  @property({type: Number}) clipTop: number = 0; // in percent of height
  @property({type: Number}) clipBottom: number = 0; // in percent of height
  @property({type: Number}) scaleWindIcon: number = 1;
  @property({type: Number}) rotation: number | undefined;

  @property({type: String}) rotType: RotType | undefined;
  @property({type: String}) rotPosition: RotPosition = RotPosition.innerCircle;
  @property({type: Number}) rotStartAngle: number = 0;
  @property({type: Number}) rotEndAngle: number = 0;
  @property({type: String}) rotColor: string | undefined;
  @property({type: String}) rotBarColor: string | undefined;
  @property({type: Number})
  set rotationsPerMinute(value: number) {
    this._rotationsPerMinute = value;
    if (this._rotController) {
      this._rotController.rotationsPerMinute = value;
    }
  }
  get rotationsPerMinute() {
    return this._rotationsPerMinute;
  }
  private _rotationsPerMinute = 0;
  private _rotController?: RateOfTurnController;

  // @ts-expect-error TS6133: The controller ensures that the render
  // function is called on resize of the element
  private _resizeController = new ResizeController(this, {});

  override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);

    // Detect confirm: newAngleSetpoint was defined, now undefined
    if (changed.has('newAngleSetpoint') && this.animateSetpoint) {
      const prev = changed.get('newAngleSetpoint') as number | undefined;
      if (prev !== undefined && this.newAngleSetpoint === undefined) {
        this._departingNewAngleSetpoint = prev;
        clearTimeout(this._animationTimer);
        const duration = getSetpointAnimationDurationMs(this);
        this._animationTimer = setTimeout(() => {
          this._departingNewAngleSetpoint = undefined;
        }, duration);
      }
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._animationTimer);
    this.disposeRotController();
  }

  private disposeRotController(): void {
    if (this._rotController) {
      this._rotController.destroy();
      this.removeController(this._rotController);
      this._rotController = undefined;
    }
  }

  override updated(changed: PropertyValues): void {
    super.updated(changed);
    const el = this.rotType
      ? this.renderRoot.querySelector('#rot-spinner')
      : null;
    if (!el) {
      this.disposeRotController();
      return;
    }
    if (!this._rotController || this._rotController.el !== el) {
      this.disposeRotController();
      this._rotController = new RateOfTurnController(
        this,
        el,
        this._rotationsPerMinute
      );
    }
  }

  private get innerRingRadius(): number {
    if (this.watchCircleType === WatchCircleType.single) {
      return RING2_RADIUS;
    } else if (this.watchCircleType === WatchCircleType.double) {
      return RING3_RADIUS;
    } else if (this.watchCircleType === WatchCircleType.doubleThin) {
      return RING3B_RADIUS;
    } else if (this.watchCircleType === WatchCircleType.triple) {
      return RING4_RADIUS;
    }
    throw new Error(`Invalid watch circle type: ${this.watchCircleType}`);
  }

  private watchCircle(): SVGTemplateResult | SVGTemplateResult[] {
    const rings = [];
    if (this.state !== InstrumentState.off) {
      rings.push(svg`
        <circle
          cx="0"
          cy="0"
          r="172"
          stroke="var(--instrument-frame-primary-color)"
          fill="none"
          stroke-width="24"
        />`);

      if (this.watchCircleType !== WatchCircleType.single) {
        const r1 = RING2_RADIUS;
        const r2 =
          this.watchCircleType === WatchCircleType.doubleThin
            ? RING3B_RADIUS
            : RING3_RADIUS;
        const r = (r1 + r2) / 2;
        const strokeWidth = r1 - r2;
        rings.push(
          svg`
            <circle cx="0" cy="0" r=${r} stroke="var(--instrument-frame-secondary-color)" stroke-width=${strokeWidth} fill="none" />
            <circle cx="0" cy="0" r=${r1} stroke="var(--instrument-frame-secondary-color)" stroke-width="1" fill="none" vector-effect="non-scaling-stroke" />
            <circle cx="0" cy="0" r=${r2} stroke="var(--instrument-frame-secondary-color)" stroke-width="1" fill="none" vector-effect="non-scaling-stroke" />
        `
        );
      }
      if (this.watchCircleType === WatchCircleType.triple) {
        const r1 = RING3_RADIUS;
        const r2 = RING4_RADIUS;
        const r = (r1 + r2) / 2;
        const strokeWidth = r1 - r2;
        rings.push(
          svg`<circle cx="0" cy="0" r=${r} stroke="var(--instrument-frame-primary-color)" stroke-width=${strokeWidth} fill="none" />`
        );
      }
    }

    let result = rings;
    if (this.areas.length > 0) {
      const areas = this.areas.map((area) => {
        const svgPath = roundedArch({
          startAngle: area.startAngle,
          endAngle: area.endAngle,
          R: OUTER_RING_RADIUS,
          r: this.innerRingRadius,
          roundOutsideCut: area.roundOutsideCut,
          roundInsideCut: area.roundInsideCut,
        });
        return svgPath;
      });
      const mask = svg`<mask id="cutMask">
        <rect x="-200" y="-200" width="400" height="400" fill="black" />
        ${areas.map((area) => svg`<path d=${area} fill="white" vector-effect="non-scaling-stroke" stroke="white" stroke-width="1"/>`)}
      </mask>`;
      result = [mask, svg`<g mask="url(#cutMask)">${rings}</g>`];
      areas.forEach((area) => {
        result.push(
          svg`<path d=${area} fill="none" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>`
        );
      });
    } else {
      if (this.state !== InstrumentState.off) {
        result.push(
          circle('outerRing', {
            radius: 368 / 2,
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })
        );

        result.push(svg`
          ${circle('innerRing', {
            radius: this.innerRingRadius,
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })}
        `);
      } else {
        result.push(svg`
          ${circle('innerRing', {
            radius: OUTER_RING_RADIUS,
            strokeWidth: 1,
            strokeColor: 'var(--instrument-frame-tertiary-color)',
            strokePosition: 'center',
            fillColor: 'none',
          })}
        `);
      }
    }
    return result;
  }

  private renderCrosshair(
    radius: number,
    labelKnockouts?: {
      positions: LabelPosition[];
      rotation: number | undefined;
      scale: number;
      /** Inner ring radius – crosshair is hidden between labelRadius and this value. */
      innerRingRadius: number;
    }
  ): SVGTemplateResult {
    const hasMask = labelKnockouts && labelKnockouts.positions.length > 0;

    // Radius at which labels sit (distance from centre).
    // Any position is equally valid — they're all at the same radial distance.
    const labelRadius = hasMask
      ? Math.max(
          ...labelKnockouts!.positions.map((l) =>
            Math.abs(l.x !== 0 ? l.x : l.y)
          )
        )
      : 0;
    // Small extra padding so the crosshair doesn't start/end right at the
    // label edge — use the same visual pad as the letter knockouts.
    const ringGapPad = hasMask ? 3 / labelKnockouts!.scale : 0;

    return svg`
      ${
        hasMask
          ? svg`
        <defs>
          <mask
            id="crosshair-label-mask"
            maskUnits="userSpaceOnUse"
            x="-${radius}" y="-${radius}"
            width="${radius * 2}" height="${radius * 2}"
          >
            <rect x="-${radius}" y="-${radius}" width="${radius * 2}" height="${radius * 2}" fill="white"/>
            <!-- Annular ring knockout: hide crosshair between labels and inner ring -->
            <circle cx="0" cy="0" r="${labelKnockouts!.innerRingRadius}" fill="black"/>
            <circle cx="0" cy="0" r="${labelRadius - ringGapPad}" fill="white"/>
            <!-- Per-label rectangular knockouts -->
            ${labelKnockouts!.positions.map((l) => {
              const fontSize = 12 / labelKnockouts!.scale;
              const pad = 3 / labelKnockouts!.scale;
              const size = fontSize + pad * 2;
              return svg`
                <rect
                  x="${l.x - size / 2}" y="${l.y - size / 2}"
                  width="${size}" height="${size}"
                  fill="black"
                  transform="rotate(${-(labelKnockouts!.rotation ?? 0)})"
                  transform-origin="${l.x} ${l.y}"
                />
              `;
            })}
          </mask>
        </defs>`
          : nothing
      }
      <g mask=${hasMask ? 'url(#crosshair-label-mask)' : nothing}>
        <line
          x1="-${radius}"
          y1="0"
          x2="${radius}"
          y2="0"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
        <line
          x1="0"
          y1="-${radius}"
          x2="0"
          y2="${radius}"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderBars(): SVGTemplateResult[] | typeof nothing {
    if (this.barAreas.length === 0) {
      return nothing;
    }
    return this.barAreas.map((bar, index) => {
      const startAngle = Math.min(bar.startAngle, bar.endAngle);
      const endAngle = Math.max(bar.startAngle, bar.endAngle);
      const arc = roundedArch({
        r: RING3_RADIUS,
        R: RING2_RADIUS,
        startAngle: startAngle,
        endAngle: endAngle,
        roundInsideCut: false,
        roundOutsideCut: false,
      });
      // The mask is a sector to cut out the stroke on the start and end of the bar
      const mask = svg`<mask id="barMask-${index}">
        <rect x="-200" y="-200" width="400" height="400" fill="black" />
        <path d=${roundedArch({
          r: 1,
          R: 200,
          startAngle: startAngle,
          endAngle: endAngle,
          roundInsideCut: false,
          roundOutsideCut: false,
        })} fill="white" />
      </mask>`;
      return svg`
        ${mask}
        <g mask="url(#cutMask)">
        <path 
          d=${arc} 
          fill=${bar.fillColor} 
          stroke=${bar.fillColor} 
          stroke-width="1" 
          vector-effect="non-scaling-stroke" 
          mask="url(#barMask-${index})" 
          />
          </g>
          `;
    });
  }

  private renderNeedles(): SVGTemplateResult[] | typeof nothing {
    if (this.needles.length === 0) {
      return nothing;
    }
    return this.needles.map((needle) => {
      return svg`
        <rect 
          transform="rotate(${needle.angle})" 
          x="-4" y="-160" width="8" height="48" rx="4" 
          fill=${needle.fillColor} 
          stroke=${needle.strokeColor}
          stroke-width="1"
          vector-effect="non-scaling-stroke"
          paint-order="stroke fill"
        />
      `;
    });
  }

  private getScale({width, height}: {width: number; height: number}): number {
    let clientWidth = this.clientWidth;
    let clientHeight = this.clientHeight;
    if (clientWidth === 0 || clientHeight === 0) {
      const box = this.parentElement?.getBoundingClientRect();
      if (box) {
        clientWidth = box.width;
        clientHeight = box.height;
      }
    }
    const scale = Math.min(clientWidth / width, clientHeight / height);
    if (scale === Infinity || scale < 0) {
      throw new Error('Watch scale is not valid');
    }
    return scale;
  }

  private getPadding(): number {
    if (this.padding !== undefined) {
      return this.padding;
    }
    const hasTickmarksWithText =
      this.tickmarks.length > 0 &&
      this.tickmarks.some((t) => t.text !== undefined);
    if (hasTickmarksWithText && !this.tickmarksInside) {
      return 24 * 2.5;
    }
    return 24;
  }

  override render() {
    const width = (176 + this.getPadding()) * 2;
    const height = width * (1 - this.clipTop / 100 - this.clipBottom / 100);
    const top = -width / 2 + (width * this.clipTop) / 100;
    const scale = this.getScale({width, height});
    const viewBox = `-${width / 2} ${top} ${width} ${height}`;
    const angleSetpoint = this.renderSetpoint();
    const textRadius = this.tickmarksInside
      ? this.innerRingRadius
      : OUTER_RING_RADIUS;
    const maxDigits = Math.max(
      ...this.tickmarks.map((t) => t.text?.length ?? 0)
    );
    const tickmarks = this.tickmarks.map((t) =>
      tickmark(t.angle, {
        size: t.type,
        style: this.tickmarkStyle,
        scale,
        text: this.showLabels ? undefined : t.text,
        inside: this.tickmarksInside,
        textRadius,
        rotation: this.rotation,
        maxDigits,
        color: t.color,
      })
    );
    const advices = this.advices
      ? this.advices.map((a) => renderAdvice(a))
      : nothing;

    // Compute label positions once – used for both rendering and crosshair knockout.
    const insideLabels = this.tickmarksInside && this.showLabels;
    const includeNorth = !this.northArrow;
    const labelPositions = this.showLabels
      ? getLabelPositions({
          scale,
          inside: this.tickmarksInside,
          innerRadius: this.innerRingRadius,
          includeNorth,
        })
      : undefined;

    const labels = labelPositions
      ? renderLabels({
          scale,
          rotation: this.rotation,
          inside: this.tickmarksInside,
          innerRadius: this.innerRingRadius,
          includeNorth,
        })
      : nothing;
    const northArrowEl = this.northArrow
      ? renderNorthArrow({
          scale,
          rotation: this.rotation,
          inside: this.tickmarksInside,
        })
      : nothing;
    const wind =
      this.wind != null && this.windFromDirectionDeg != null
        ? svg`<g transform="scale(${this.scaleWindIcon})">${renderWind({
            wind: this.wind,
            fromDirectionDeg: this.windFromDirectionDeg,
            radius: this.windSymbolRadius ?? 192,
            color: this.windColor,
          })}</g>`
        : nothing;
    const current =
      this.current != null && this.currentFromDirectionDeg != null
        ? renderCurrent({
            current: this.current,
            fromDirectionDeg: this.currentFromDirectionDeg,
            radius: this.currentSymbolRadius ?? 192,
            color: this.currentColor,
          })
        : nothing;
    return html`
      <svg
        width="100%"
        height="100%"
        viewBox=${viewBox}
        style="--scale: ${scale}"
        transform="rotate(${this.rotation ?? 0})"
      >
        ${this.watchCircle()} ${this.renderBars()}
        ${this.crosshairEnabled
          ? this.renderCrosshair(
              184,
              insideLabels && labelPositions
                ? {
                    positions: labelPositions,
                    rotation: this.rotation,
                    scale,
                    innerRingRadius: this.innerRingRadius,
                  }
                : undefined
            )
          : nothing}
        ${northArrowEl} ${this.renderStarboardPortIndicator()} ${current}
        ${wind} ${tickmarks} ${this.renderRot()} ${advices} ${angleSetpoint}
        ${labels} ${this.renderVesselImage()} ${this.renderNeedles()}
      </svg>
    `;
  }

  private renderRot(): SVGTemplateResult | typeof nothing {
    if (!this.rotType) return nothing;

    const color = this.rotColor ?? 'var(--instrument-regular-secondary-color)';
    const barColor =
      this.rotBarColor ?? 'var(--instrument-regular-tertiary-color)';

    if (this.rotType === RotType.bar) {
      const hasBar =
        shortestAngularDeltaDeg(this.rotStartAngle, this.rotEndAngle) >= 0.1;
      return svg`
        ${renderRotBarStatic({
          startAngle: this.rotStartAngle,
          endAngle: this.rotEndAngle,
          color,
          barColor,
          position: this.rotPosition,
          maskId: 'rot-bar-mask',
        })}
        ${
          hasBar
            ? svg`<g clip-path="url(#rot-bar-mask)">
              <g id="rot-spinner">
                ${renderRotBarDots(color, this.rotPosition)}
              </g>
            </g>`
            : nothing
        }
      `;
    }

    return svg`
      <g id="rot-spinner">
        ${renderRotDots(color, this.rotPosition)}
      </g>
    `;
  }

  private renderSetpoint(): SVGTemplateResult | typeof nothing {
    if (this.angleSetpoint === undefined) {
      return nothing;
    }

    const derived = deriveRadialSetpointConfig({
      state: this.state,
      priority: this.priority,
      atSetpoint: this.atAngleSetpoint,
      angleSetpoint: this.angleSetpoint,
      setpointAtZeroDeadband: this.angleSetpointAtZeroDeadband,
      newAngleSetpoint: this.newAngleSetpoint,
      touching: this.touching,
      setpointOverride: this.setpointOverride,
    });

    const {visualState, colorMode, disabled, hasNewSetpoint} = derived;

    const outwardOffset = getSetpointOutwardOffset(visualState);
    const radius =
      RADIAL_SETPOINT_RADIUS + outwardOffset - RADIAL_SETPOINT_INWARD_ADJUST;

    // Render original setpoint marker (dimmed when newAngleSetpoint is active)
    const opacity = hasNewSetpoint ? 0.75 : 1;
    const originalMarker = drawSetpointMarker({
      visualState,
      colorMode,
      disabled,
      id: this._setpointId,
    });

    const animate = this.animateSetpoint;
    const hasDeparting = this._departingNewAngleSetpoint !== undefined;

    // Compute CSS-safe accumulated angle so transitions always take the short path
    const rawAngle = this.angleSetpoint + 90;
    if (!this._setpointCssAngleInit) {
      // First render: set angle without transition
      this._setpointCssAngle = rawAngle;
      this._setpointCssAngleInit = true;
    } else {
      this._setpointCssAngle = cssSafeAngle(this._setpointCssAngle, rawAngle);
    }

    // Use CSS style transform when animating for smooth transition
    const originalSetpoint = animate
      ? svg`
        <g style="transform: rotate(${this._setpointCssAngle}deg) translateX(${-radius}px) rotate(270deg); opacity: ${opacity}; transition: transform var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT}) ease-out, opacity var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT}) ease-out;">
          ${originalMarker}
        </g>
      `
      : svg`
        <g transform="rotate(${this.angleSetpoint + 90}) translate(${-radius}, 0) rotate(270)" opacity="${opacity}">
          ${originalMarker}
        </g>
      `;

    // Render newAngleSetpoint in focus state (always on top)
    // OR render departing newAngleSetpoint during confirm fade-out
    if (hasNewSetpoint || hasDeparting) {
      const isActive = hasNewSetpoint;
      const newAngle = isActive
        ? this.newAngleSetpoint!
        : this._departingNewAngleSetpoint!;
      const targetOpacity = isActive ? 1 : 0;

      const focusOutwardOffset = getSetpointOutwardOffset(
        SetpointVisualState.focus
      );
      const focusRadius =
        RADIAL_SETPOINT_RADIUS +
        focusOutwardOffset -
        RADIAL_SETPOINT_INWARD_ADJUST;

      const newMarker = drawSetpointMarker({
        visualState: SetpointVisualState.focus,
        colorMode,
        disabled: false, // newSetpoint is never disabled
        id: this._newSetpointId,
      });

      if (animate) {
        const duration = `var(${SETPOINT_ANIMATION_CSS_VAR}, ${SETPOINT_ANIMATION_DURATION_DEFAULT})`;
        return svg`
          ${originalSetpoint}
          <g style="transform: rotate(${newAngle + 90}deg) translateX(${-focusRadius}px) rotate(270deg); opacity: ${targetOpacity}; transition: opacity ${duration} ease-out;">
            ${newMarker}
          </g>
        `;
      }

      return svg`
        ${originalSetpoint}
        <g transform="rotate(${newAngle + 90}) translate(${-focusRadius}, 0) rotate(270)" opacity="${targetOpacity}">
          ${newMarker}
        </g>
      `;
    }

    return originalSetpoint;
  }

  private renderVesselImage(): SVGTemplateResult[] | typeof nothing {
    if (this.vessels.length === 0) {
      return nothing;
    }

    return this.vessels.map((v) => {
      let size;
      switch (v.size) {
        case VesselImageSize.large:
          size = 224;
          break;
        case VesselImageSize.medium:
          size = 160;
          break;
        default:
          size = 100;
      }

      const scale = size / 160;
      return svg`<g style="transform: ${v.transform} scale(${scale}) translate(-80px, -80px) ">${vesselImages[v.vesselImage]}</g>`;
    });
  }

  private renderStarboardPortIndicator(): SVGTemplateResult[] | typeof nothing {
    if (!this.starboardPortIndicator) {
      return nothing;
    }
    return [
      adviceMask(
        0,
        180,
        'var(--instrument-starboard-secondary-color)',
        'var(--instrument-starboard-secondary-color)'
      ),
      adviceMask(
        180,
        360,
        'var(--instrument-port-secondary-color)',
        'var(--instrument-port-secondary-color)'
      ),
    ];
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-watch': ObcWatch;
  }
}
