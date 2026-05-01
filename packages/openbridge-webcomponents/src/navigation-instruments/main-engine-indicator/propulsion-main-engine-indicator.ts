import {LitElement, html, nothing, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './propulsion-main-engine-indicator.css?inline';
import {InstrumentState, Priority} from '../types.js';

const VIEW_SIZE = 48;
const FRAME_X = 8;
const FRAME_Y = 8;
const FRAME_SIZE = 32;
const FRAME_RADIUS = 2;
const FRAME_STROKE_WIDTH = 1;
const FRAME_CLIP_X = FRAME_X - FRAME_STROKE_WIDTH / 2;
const FRAME_CLIP_Y = FRAME_Y - FRAME_STROKE_WIDTH / 2;
const FRAME_CLIP_SIZE = FRAME_SIZE + FRAME_STROKE_WIDTH;
const FRAME_CLIP_RADIUS = FRAME_RADIUS + FRAME_STROKE_WIDTH / 2;

const TRACK_Y = 8;
const TRACK_WIDTH = 8;
const TRACK_HEIGHT = 32;
const OFF_SPEED_TRACK_X = 20;
const OFF_SPEED_TRACK_WIDTH = 8;
const OFF_THRUST_LINE_X = 28;
const OFF_THRUST_LINE_WIDTH = 12;
const OFF_THRUST_LINE_HEIGHT = 2;
const SPEED_FILL_MAX_HEIGHT = 31;
const SPEED_TRACK_X = 12;
const THRUST_TRACK_X = 28;
const THRUST_ZERO_Y = TRACK_Y + TRACK_HEIGHT / 2;
const THRUST_HALF_HEIGHT = TRACK_HEIGHT / 2;
const SPEED_BODY_WIDTH = 8;
const SPEED_BODY_X = SPEED_TRACK_X;
const SPEED_FOOT_X = 8;
const SPEED_FOOT_DEPTH = 2;
const SPEED_FOOT_RADIUS = 2;
const SPEED_FOOT_OVERLAP = 1;
const SPEED_CAP_X = SPEED_TRACK_X;
const SPEED_CAP_WIDTH = 8;
const SPEED_CAP_HEIGHT = 1;
const SPEED_ZERO_BASELINE_HEIGHT = 1;
const SPEED_ZERO_SNAP_MAX_HEIGHT = 2;
const THRUST_BODY_WIDTH = 8;
const THRUST_BODY_X = THRUST_TRACK_X;
const THRUST_SHELF_WIDTH = 12;
const THRUST_SHELF_HEIGHT = 1;

const FRAME_MARKER_PATH =
  'M23.5931 2.56973L19.5647 8.2095C19.3283 8.54043 19.5649 9.00012 19.9716 9.00012H28.0284C28.4351 9.00012 28.6716 8.54043 28.4353 8.2095L24.4069 2.56973C24.2074 2.29056 23.7925 2.29056 23.5931 2.56973Z';

let nextFrameClipId = 0;

/**
 * `<obc-propulsion-main-engine-indicator>` – Compact dual-track main engine indicator without setpoints.
 *
 * ## Features
 *
 * - **Tracks:** fixed **48×48** layout with a top frame marker, a left speed track, and a right thrust track.
 * - **Inputs:** `rpmValue` is clamped to **0…1** and fills upward from the bottom. `pitchValue` is clamped to **-1…1** and fills from the center line toward the selected direction.
 * - **Deprecated aliases:** `speed` maps to `rpmValue * 100` and `thrust` maps to `pitchValue * 100`.
 * - **States:** `state="active"` renders live bars, `priority` selects enhanced or regular tokens, and non-active states keep the frame while hiding the dynamic bars.
 *
 * ## Usage Guidelines
 *
 * Use when the larger `obc-main-engine` is too dense and only a compact visual summary of speed and thrust is needed. Use `obc-main-engine` when setpoints or the larger scale treatment are required.
 */
@customElement('obc-propulsion-main-engine-indicator')
export class ObcPropulsionMainEngineIndicator extends LitElement {
  private readonly frameClipId = `obc-propulsion-main-engine-indicator-frame-clip-${nextFrameClipId++}`;

  private internalPitchValue = 0;

  private internalRpmValue = 0;

  @property({type: Number})
  get pitchValue(): number {
    return this.internalPitchValue;
  }
  set pitchValue(v: number) {
    const old = this.internalPitchValue;
    this.internalPitchValue = Number.isFinite(v) ? v : 0;
    this.requestUpdate('pitchValue', old);
  }

  @property({type: Number})
  get rpmValue(): number {
    return this.internalRpmValue;
  }
  set rpmValue(v: number) {
    const old = this.internalRpmValue;
    this.internalRpmValue = Number.isFinite(v) ? v : 0;
    this.requestUpdate('rpmValue', old);
  }

  @property({type: Number})
  get thrust(): number {
    return this.pitchValue * 100;
  }
  set thrust(v: number) {
    const old = this.thrust;
    this.pitchValue = (Number.isFinite(v) ? v : 0) / 100;
    this.requestUpdate('thrust', old);
  }

  @property({type: Number})
  get speed(): number {
    return this.rpmValue * 100;
  }
  set speed(v: number) {
    const old = this.speed;
    this.rpmValue = (Number.isFinite(v) ? v : 0) / 100;
    this.requestUpdate('speed', old);
  }

  @property({type: String}) state: InstrumentState = InstrumentState.active;

  @property({type: String}) priority: Priority = Priority.regular;

  @property({type: Boolean}) hasSilhouette = false;

  static override styles = unsafeCSS(componentStyle);

  private clampRpmValue(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }

    return Math.max(0, Math.min(1, value));
  }

  private clampPitchValue(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }

    return Math.max(-1, Math.min(1, value));
  }

  private getThrustBodyHeight(thrust: number): number {
    if (thrust === 0) {
      return 0;
    }

    return Math.max(
      2,
      Math.min(
        THRUST_HALF_HEIGHT,
        Math.round((Math.abs(thrust) / 100) * THRUST_HALF_HEIGHT)
      )
    );
  }

  private getThrustBodyPath(
    y: number,
    height: number,
    growsUp: boolean
  ): string {
    const x = THRUST_BODY_X;
    const w = THRUST_BODY_WIDTH;
    const bottomY = y + height;
    const rightX = x + w;

    if (growsUp) {
      return [`M${x} ${y}`, `H${rightX}`, `V${bottomY}`, `H${x}`, 'Z'].join(
        ' '
      );
    }

    return [`M${x} ${bottomY}`, `V${y}`, `H${rightX}`, `V${bottomY}`, 'Z'].join(
      ' '
    );
  }

  private getSpeedFillPath(topY: number): string {
    const x = SPEED_FOOT_X - SPEED_FOOT_OVERLAP;
    const bodyX = SPEED_BODY_X;
    const bodyW = SPEED_BODY_WIDTH;
    const r = SPEED_FOOT_RADIUS;
    const rightX = bodyX + bodyW;
    const bottomY = TRACK_Y + TRACK_HEIGHT + SPEED_FOOT_OVERLAP;
    const footTopY = bottomY - SPEED_FOOT_DEPTH;
    const bodyTopY = Math.min(topY + SPEED_CAP_HEIGHT, bottomY);

    return [
      `M${bodyX} ${bodyTopY}`,
      `H${rightX}`,
      `V${bottomY}`,
      `H${bodyX}`,
      `A${r} ${r} 0 0 1 ${x} ${footTopY}`,
      `H${bodyX}`,
      'Z',
    ].join(' ');
  }

  private getSpeedFillHeight(rpmValue: number): number {
    const clampedRpm = this.clampRpmValue(rpmValue);

    if (clampedRpm <= 0) {
      return SPEED_ZERO_BASELINE_HEIGHT;
    }

    const rawHeight = clampedRpm * SPEED_FILL_MAX_HEIGHT;

    if (rawHeight <= SPEED_ZERO_SNAP_MAX_HEIGHT) {
      return SPEED_ZERO_BASELINE_HEIGHT;
    }

    return Math.round(rawHeight);
  }

  private get isActiveState(): boolean {
    return this.state === InstrumentState.active;
  }

  private get showSilhouette(): boolean {
    return this.hasSilhouette && this.state !== InstrumentState.off;
  }

  private get speedFillColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private get accentColor(): string {
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private renderSilhouette() {
    if (!this.showSilhouette) {
      return nothing;
    }

    const s = 0.5;
    const left = FRAME_X;
    const top = FRAME_Y;
    const right = FRAME_X + FRAME_SIZE;
    const bottom = FRAME_Y + FRAME_SIZE;
    const outside = 1.75;
    const short = 3;
    const silhouetteMarkerPath = 'M 19.9 6.6 L 24 1.75 L 28.1 6.6';

    return svg`
      <path
        d="${silhouetteMarkerPath}"
        transform="translate(0 -0.8)"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${s}"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M ${left - outside} ${top + short} Q ${left - outside} ${top - outside} ${left + short} ${top - outside}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${s}"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M ${right - short} ${top - outside} Q ${right + outside} ${top - outside} ${right + outside} ${top + short}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${s}"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M ${left - outside} ${bottom - short} Q ${left - outside} ${bottom + outside} ${left + short} ${bottom + outside}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${s}"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M ${right - short} ${bottom + outside} Q ${right + outside} ${bottom + outside} ${right + outside} ${bottom - short}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${s}"
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    `;
  }

  private renderFrame() {
    return svg`
      <defs>
        <clipPath id="${this.frameClipId}" clipPathUnits="userSpaceOnUse">
          <rect
            x="${FRAME_CLIP_X}"
            y="${FRAME_CLIP_Y}"
            width="${FRAME_CLIP_SIZE}"
            height="${FRAME_CLIP_SIZE}"
            rx="${FRAME_CLIP_RADIUS}"
          />
        </clipPath>
      </defs>
      <path
        d="${FRAME_MARKER_PATH}"
        fill="var(--instrument-frame-tertiary-color)"
      />
      <rect
        x="${FRAME_X}"
        y="${FRAME_Y}"
        width="${FRAME_SIZE}"
        height="${FRAME_SIZE}"
        rx="${FRAME_RADIUS}"
        fill="var(--instrument-frame-primary-color)"
        stroke="var(--instrument-frame-tertiary-color)"
        vector-effect="non-scaling-stroke"
      />
      ${
        this.state !== InstrumentState.off
          ? svg`
            <rect
              x="${SPEED_TRACK_X}"
              y="${TRACK_Y}"
              width="${TRACK_WIDTH}"
              height="${TRACK_HEIGHT}"
              fill="var(--instrument-frame-secondary-color)"
              stroke="var(--instrument-frame-secondary-color)"
              vector-effect="non-scaling-stroke"
            />
            <rect
              x="${THRUST_TRACK_X}"
              y="${TRACK_Y}"
              width="${TRACK_WIDTH}"
              height="${TRACK_HEIGHT}"
              fill="var(--instrument-frame-secondary-color)"
              stroke="var(--instrument-frame-secondary-color)"
              vector-effect="non-scaling-stroke"
            />
          `
          : nothing
      }
    `;
  }

  private renderOffState() {
    if (this.state !== InstrumentState.off) {
      return nothing;
    }

    return svg`
      <rect
        x="${OFF_SPEED_TRACK_X}"
        y="${TRACK_Y}"
        width="${OFF_SPEED_TRACK_WIDTH}"
        height="${TRACK_HEIGHT}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        vector-effect="non-scaling-stroke"
      />
      <rect
        x="${OFF_THRUST_LINE_X}"
        y="${THRUST_ZERO_Y - OFF_THRUST_LINE_HEIGHT / 2}"
        width="${OFF_THRUST_LINE_WIDTH}"
        height="${OFF_THRUST_LINE_HEIGHT}"
        fill="var(--instrument-frame-tertiary-color)"
      />
    `;
  }

  private renderOutline() {
    return svg`
      <rect
        x="${FRAME_X}"
        y="${FRAME_Y}"
        width="${FRAME_SIZE}"
        height="${FRAME_SIZE}"
        rx="${FRAME_RADIUS}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderSpeedBar() {
    if (!this.isActiveState) {
      return nothing;
    }

    const totalHeight = this.getSpeedFillHeight(this.rpmValue);

    const topY = TRACK_Y + TRACK_HEIGHT - totalHeight;

    return svg`
      <g clip-path="url(#${this.frameClipId})">
        <path
          d="${this.getSpeedFillPath(topY)}"
          fill="${this.speedFillColor}"
          stroke="${this.speedFillColor}"
          vector-effect="non-scaling-stroke"
        />
        <rect
          x="${SPEED_CAP_X}"
          y="${topY}"
          width="${SPEED_CAP_WIDTH}"
          height="${SPEED_CAP_HEIGHT}"
          rx="${SPEED_CAP_HEIGHT / 2}"
          fill="${this.accentColor}"
          stroke="${this.accentColor}"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderThrustBar() {
    if (!this.isActiveState) {
      return nothing;
    }

    const pitch = this.clampPitchValue(this.pitchValue);
    const thrust = pitch * 100;
    const height = this.getThrustBodyHeight(thrust);
    const bodyY = thrust > 0 ? THRUST_ZERO_Y - height : THRUST_ZERO_Y;
    const shelfY = THRUST_ZERO_Y - THRUST_SHELF_HEIGHT / 2;

    return svg`
      ${
        height > 0
          ? svg`
            <path
              d="${this.getThrustBodyPath(bodyY, height, thrust > 0)}"
              fill="${this.accentColor}"
              stroke="${this.accentColor}"
              vector-effect="non-scaling-stroke"
            />
          `
          : nothing
      }
      <rect
        x="${THRUST_BODY_X}"
        y="${shelfY}"
        width="${THRUST_SHELF_WIDTH}"
        height="${THRUST_SHELF_HEIGHT}"
        rx="${THRUST_SHELF_HEIGHT / 2}"
        fill="${this.accentColor}"
        stroke="${this.accentColor}"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  override render() {
    return html`
      <div class="container">
        <svg
          viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${this.renderSilhouette()} ${this.renderFrame()}
          ${this.renderOutline()} ${this.renderOffState()}
          ${this.renderSpeedBar()} ${this.renderThrustBar()}
        </svg>
      </div>
    `;
  }
}

@customElement('obc-main-engine-indicator')
export class ObcMainEngineIndicator extends ObcPropulsionMainEngineIndicator {}

declare global {
  interface HTMLElementTagNameMap {
    'obc-propulsion-main-engine-indicator': ObcPropulsionMainEngineIndicator;
    'obc-main-engine-indicator': ObcMainEngineIndicator;
  }
}
