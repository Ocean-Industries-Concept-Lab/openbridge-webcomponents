import {
  LitElement,
  SVGTemplateResult,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {property} from 'lit/decorators.js';
import {circle} from '../../svghelpers/index.js';
import {roundedArch} from '../../svghelpers/roundedArch.js';
import {
  deriveRadialSetpointConfig,
  drawSetpointMarker,
  getSetpointOutwardOffset,
  RADIAL_SETPOINT_RADIUS,
  SetpointColorMode,
} from '../../svghelpers/setpoint.js';
import {InstrumentState} from '../types.js';
import compentStyle from './watch.css?inline';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {adviceMask, AngleAdviceRaw, renderAdvice} from './advice.js';
import {Tickmark, TickmarkStyle, tickmark} from './tickmark.js';
import {renderLabels} from './label.js';
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

/**
 * Radial-specific adjustment for setpoint positioning (in pixels).
 * Positive values move the setpoint toward the circle center.
 * Negative values move the setpoint outward (away from center).
 *
 * This is applied on top of the visual state offsets from setpoint.ts
 * (SETPOINT_NOT_EQUAL_OFFSET, SETPOINT_ZERO_OFFSET) to fine-tune
 * radial positioning independently from linear instruments.
 *
 * Adjust this value to match the Figma design.
 */
const RADIAL_SETPOINT_INWARD_ADJUST = 4;

@customElement('obc-watch')
export class ObcWatch extends LitElement {
  private _setpointId = `watch-setpoint-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: String}) watchCircleType: WatchCircleType =
    WatchCircleType.single;
  @property({type: Boolean}) northArrow: boolean = false;
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Boolean}) atAngleSetpoint: boolean = false;
  /**
   * Whether the setpoint is at zero (angle = 0).
   * When true AND atAngleSetpoint is true, triggers equalZero visual state.
   */
  @property({type: Boolean}) atAngleSetpointZero: boolean = false;
  /**
   * Whether the user is actively adjusting the setpoint (e.g., dragging).
   * When true, the setpoint displays in "focus" visual state.
   */
  @property({type: Boolean}) focused: boolean = false;
  /**
   * Optional override for setpoint color mode.
   * When set, overrides the color mode derived from instrument state.
   * Useful for showing regular colors in inCommand state (e.g., for stories).
   */
  @property({type: String}) colorMode: SetpointColorMode | undefined;
  @property({type: Number}) padding: number | undefined;
  @property({type: Array, attribute: false}) areas: WatchArea[] = [];
  @property({type: Array, attribute: false}) barAreas: WatchBarArea[] = [];
  @property({type: Array, attribute: false}) needles: WatchNeedle[] = [];
  @property({type: Array, attribute: false}) tickmarks: Tickmark[] = [];
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: Array, attribute: false}) advices: AngleAdviceRaw[] = [];
  @property({type: Boolean}) crosshairEnabled: boolean = false;
  @property({type: Boolean}) labelFrameEnabled: boolean = false;
  @property({type: Array, attribute: false}) vessels: WatchVessel[] = [];
  @property({type: Number}) wind: number | null = null;
  @property({type: Number}) windFromDirectionDeg: number | null = null;
  @property({type: Number}) windSymbolRadius: number | null = null;
  @property({type: Number}) current: number | null = null;
  @property({type: Number}) currentFromDirectionDeg: number | null = null;
  @property({type: Number}) currentSymbolRadius: number | null = null;
  @property({type: Boolean}) starboardPortIndicator: boolean = false;
  @property({type: Number}) clipTop: number = 0; // in percent of height
  @property({type: Number}) clipBottom: number = 0; // in percent of height
  @property({type: Number}) scaleWindIcon: number = 1;
  @property({type: Number}) rotation: number | undefined;

  // @ts-expect-error TS6133: The controller ensures that the render
  // function is called on resize of the element
  private _resizeController = new ResizeController(this, {});

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

  private renderCrosshair(radius: number): SVGTemplateResult {
    return svg`
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
        style: TickmarkStyle.hinted,
        scale,
        text: t.text,
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
    const labels = this.labelFrameEnabled
      ? renderLabels(scale, this.rotation)
      : nothing;
    const wind =
      this.wind != null && this.windFromDirectionDeg != null
        ? svg`<g transform="scale(${this.scaleWindIcon})">${renderWind({
            wind: this.wind,
            fromDirectionDeg: this.windFromDirectionDeg,
            radius: this.windSymbolRadius ?? 192,
          })}</g>`
        : nothing;
    const current =
      this.current != null && this.currentFromDirectionDeg != null
        ? renderCurrent({
            current: this.current,
            fromDirectionDeg: this.currentFromDirectionDeg,
            radius: this.currentSymbolRadius ?? 192,
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
        ${this.crosshairEnabled ? this.renderCrosshair(184) : nothing}
        ${this.renderNorthArrow()} ${this.renderStarboardPortIndicator()}
        ${current} ${wind} ${tickmarks} ${advices} ${angleSetpoint} ${labels}
        ${this.renderVesselImage()} ${this.renderNeedles()}
      </svg>
    `;
  }

  /**
   * Render the setpoint marker using the unified setpoint rendering from setpoint.ts.
   *
   * The marker is positioned on the outer ring at the setpoint angle.
   * Transform sequence:
   * 1. Rotate to the setpoint angle (+ 90° because 0° is at 12 o'clock in watch coordinates)
   * 2. Translate outward to the ring radius
   * 3. Rotate 180° so the marker tip points inward toward the center
   */
  private renderSetpoint(): SVGTemplateResult | typeof nothing {
    if (this.angleSetpoint === undefined) {
      return nothing;
    }

    // Derive visual parameters from instrument state
    const derived = deriveRadialSetpointConfig({
      state: this.state,
      atSetpoint: this.atAngleSetpoint,
      atZero: this.atAngleSetpointZero,
      focused: this.focused,
    });

    // Allow colorMode override (useful for stories showing regular colors in inCommand state)
    const colorMode = this.colorMode ?? derived.colorMode;
    const {visualState, disabled} = derived;

    // Get the outward offset based on visual state:
    // - notEqual/focus: 4px outward (away from center)
    // - equalZero: 8px outward (away from center)
    // - equal: 0px (marker sits closer to the ring)
    // Then apply radial-specific adjustment (positive = toward center)
    const outwardOffset = getSetpointOutwardOffset(visualState);
    const radius =
      RADIAL_SETPOINT_RADIUS + outwardOffset - RADIAL_SETPOINT_INWARD_ADJUST;

    // Generate the marker SVG using the unified drawing function
    const marker = drawSetpointMarker({
      visualState,
      colorMode,
      disabled,
      id: this._setpointId,
    });

    // Position the marker on the outer ring:
    // - rotate(angle + 90) converts watch coordinates (0° = 12 o'clock) to SVG coordinates (0° = 3 o'clock)
    // - translate(-radius, 0) moves to the ring edge + offset
    // - rotate(270) orients the marker to point inward toward center
    //
    // The marker starts pointing DOWN (+Y). After all transforms:
    // - At 12 o'clock (angle=0): orientation = 90° + 270° + (0+90°) mod 360 = 90° (DOWN toward center) ✓
    // - At 3 o'clock (angle=90): orientation = 90° + 270° + (90+90°) mod 360 = 180° (LEFT toward center) ✓
    return svg`
      <g transform="rotate(${this.angleSetpoint + 90}) translate(${-radius}, 0) rotate(270)">
        ${marker}
      </g>
    `;
  }

  private renderNorthArrow(): SVGTemplateResult | typeof nothing {
    if (!this.northArrow) {
      return nothing;
    }
    return svg`
<path transform="translate(-256, -256)" fill-rule="evenodd" clip-rule="evenodd" d="M238.152 96.9842L255.998 72L273.844 96.9839C267.985 96.3338 262.031 96 256 96C249.967 96 244.012 96.3339 238.152 96.9842Z" fill="var(--instrument-frame-tertiary-color)"/>
    `;
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
