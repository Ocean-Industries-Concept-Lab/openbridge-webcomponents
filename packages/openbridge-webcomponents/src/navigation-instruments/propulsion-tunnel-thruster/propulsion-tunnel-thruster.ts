import {LitElement, html, nothing, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './propulsion-tunnel-thruster.css?inline';

export enum TunnelThrusterState {
  InCommand = 'in-command',
  NotInCommand = 'not-in-command',
  Off = 'off',
}

const VIEW_W = 36;
const VIEW_H = 12;
const FRAME_X = (48 - VIEW_W) / 2;
const FRAME_Y = (48 - VIEW_H) / 2;

const FRAME_PATH =
  'M0.5 2.5C0.5 1.39543 1.39543 0.5 2.5 0.5H34.5C35.6046 0.5 36.5 1.39543 36.5 2.5V10.5C36.5 11.6046 35.6046 12.5 34.5 12.5H2.5C1.39543 12.5 0.5 11.6046 0.5 10.5V2.5Z';
const FRAME_BACKGROUND_PATH =
  'M0 2C0 0.895431 0.895431 0 2 0H34C35.1046 0 36 0.895431 36 2V10C36 11.1046 35.1046 12 34 12H2C0.895432 12 0 11.1046 0 10V2Z';

const CENTER_X = VIEW_W / 2;
const THRUST_FILL_HEIGHT = 9;
const CENTER_LINE_WIDTH = 2;

const FRAME_STROKE_WIDTH = 1;
const STROKE_HALF = FRAME_STROKE_WIDTH / 2;

const FRAME_OUTER_LEFT_X = 0;
const FRAME_OUTER_RIGHT_X = VIEW_W + FRAME_STROKE_WIDTH;

const MAX_THRUST_LEFT = CENTER_X - FRAME_OUTER_LEFT_X;
const MAX_THRUST_RIGHT = FRAME_OUTER_RIGHT_X - CENTER_X;

const STROKE_OUTSET = STROKE_HALF;

let nextClipId = 0;

/**
 * `<obc-propulsion-tunnel-thruster>` – Compact bidirectional tunnel-thruster level indicator.
 *
 * Renders a **36×12** rounded frame inside a **48×48** canvas with a central zero
 * line with rounded caps, extended downward by the full frame stroke width so it
 * masks the bottom border at the center (the top aligns with the frame body).
 * A bottom-half thrust fill extends from the
 * center. The thrust fill extends by a full stroke width at the bottom so it
 * can mask the entire bottom border. The fill and center line paint above the
 * frame stroke where they overlap so the active color also masks the border at
 * the sides at extreme thrust. Thrust width uses the stroke **outer** edges
 * (0 and VIEW_W+1), so the right bar is 1px longer than the left to match SVG
 * stroke centers at 0.5 and 36.5.
 *
 * ## Features
 *
 * - **Value:** `value` is clamped to **-1…1**; the fill extends from the center
 *   toward either side of the zero line.
 * - **States:** `in-command`, `not-in-command`, and `off` switch the accent
 *   palette (enhanced vs regular vs inactive).
 * - **Silhouette:** `hasSilhouette` adds an optional silhouette stroke behind the
 *   frame when not `off`.
 *
 * ## Usage Guidelines
 *
 * Use for a compact tunnel-thruster cue where the full tunnel-thruster watch
 * layout is not required.
 */
@customElement('obc-propulsion-tunnel-thruster')
export class ObcPropulsionTunnelThruster extends LitElement {
  private readonly thrustClipId = `obc-propulsion-tunnel-thruster-thrust-${nextClipId++}`;

  private internalValue = 0;
  private internalThrust = 0;

  @property({type: Number})
  get value(): number {
    return this.internalValue;
  }
  set value(v: number) {
    const old = this.internalValue;
    this.internalValue = Number.isFinite(v) ? v : 0;
    this.requestUpdate('value', old);
  }

  @property({type: Number})
  get thrust(): number {
    return this.internalThrust;
  }
  set thrust(v: number) {
    const old = this.internalThrust;
    this.internalThrust = Number.isFinite(v) ? v : 0;
    const oldValue = this.internalValue;
    this.internalValue = this.internalThrust / 100;
    this.requestUpdate('value', oldValue);
    this.requestUpdate('thrust', old);
  }

  @property({type: String})
  state: TunnelThrusterState = TunnelThrusterState.InCommand;

  @property({type: Boolean})
  hasSilhouette = false;

  static override styles = unsafeCSS(componentStyle);

  private get normalizedValue(): number {
    const v = Number.isFinite(this.value) ? this.value : 0;
    return Math.max(-1, Math.min(1, v));
  }

  private get clampedThrust(): number {
    return this.normalizedValue * 100;
  }

  private get isActive(): boolean {
    return this.state !== TunnelThrusterState.Off;
  }

  private get isInCommand(): boolean {
    return this.state === TunnelThrusterState.InCommand;
  }

  private get barColor(): string {
    if (!this.isActive) {
      return 'var(--instrument-frame-tertiary-color)';
    }

    return this.isInCommand
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get thrustFillRect(): {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null {
    if (!this.isActive || this.clampedThrust === 0) {
      return null;
    }

    const tunnelThrust = -this.clampedThrust;
    const t = Math.abs(this.clampedThrust) / 100;

    const h = THRUST_FILL_HEIGHT;
    const y = VIEW_H + 2 * STROKE_OUTSET - THRUST_FILL_HEIGHT;

    if (tunnelThrust > 0) {
      const w = MAX_THRUST_LEFT * t;
      let x = CENTER_X - w;
      let width = w;
      if (x < FRAME_OUTER_LEFT_X - 1e-9) {
        x = FRAME_OUTER_LEFT_X;
        width = CENTER_X - FRAME_OUTER_LEFT_X;
      }
      return {
        x,
        y,
        width,
        height: h,
      };
    }

    const w = MAX_THRUST_RIGHT * t;
    return {
      x: CENTER_X,
      y,
      width: w,
      height: h,
    };
  }

  private renderSilhouette() {
    if (!this.hasSilhouette || this.state === TunnelThrusterState.Off) {
      return nothing;
    }

    return svg`
      <path
        d="M -1 2.5 Q -1 -1 3.0 -1"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="0.5"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M 33.6 -1 Q 38 -1 38 2.0"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="0.5"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M -1 10.6 Q -1 13.8 3.0 13.8"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="0.5"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M 33.6 13.8 Q 38 13.8 38 10.6"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="0.5"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `;
  }

  private renderThrustFill() {
    const rect = this.thrustFillRect;

    if (!rect) {
      return nothing;
    }

    return svg`
      <g clip-path="url(#${this.thrustClipId})">
        <rect
          x="${rect.x}"
          y="${rect.y}"
          width="${rect.width}"
          height="${rect.height}"
          fill="${this.barColor}"
        />
      </g>
    `;
  }

  private renderCenterLine() {
    const x = CENTER_X - CENTER_LINE_WIDTH / 2;
    const capR = CENTER_LINE_WIDTH / 2;
    const y = 0;
    const h = VIEW_H + 2 * STROKE_OUTSET;
    return svg`
      <rect
        x="${x}"
        y="${y}"
        width="${CENTER_LINE_WIDTH}"
        height="${h}"
        rx="${capR}"
        fill="${this.barColor}"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  override render() {
    return html`
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="${this.thrustClipId}">
            <rect
              x="${-STROKE_OUTSET}"
              y="${-STROKE_OUTSET}"
              width="${FRAME_OUTER_RIGHT_X +
              STROKE_OUTSET -
              FRAME_OUTER_LEFT_X}"
              height="${VIEW_H + 3 * STROKE_OUTSET}"
              rx="${2 + STROKE_OUTSET}"
              ry="${2 + STROKE_OUTSET}"
            />
          </clipPath>
        </defs>
        <g transform="translate(${FRAME_X} ${FRAME_Y})">
          ${this.renderSilhouette()}
          <path
            d="${FRAME_BACKGROUND_PATH}"
            fill="var(--instrument-frame-primary-color)"
          />
          <path
            d="${FRAME_PATH}"
            fill="none"
            stroke="var(--instrument-frame-tertiary-color)"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          ${this.renderThrustFill()} ${this.renderCenterLine()}
        </g>
      </svg>
    `;
  }
}

@customElement('obc-tunnel-thruster')
export class ObcTunnelThruster extends ObcPropulsionTunnelThruster {}

declare global {
  interface HTMLElementTagNameMap {
    'obc-propulsion-tunnel-thruster': ObcPropulsionTunnelThruster;
    'obc-tunnel-thruster': ObcTunnelThruster;
  }
}
