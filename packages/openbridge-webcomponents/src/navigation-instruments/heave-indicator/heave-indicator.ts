import {LitElement, css, html, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';

export enum HeaveIndicatorType {
  enhanced = 'enhanced',
  regular = 'regular',
}

const VIEW_SIZE = 48;
const CENTER_Y = VIEW_SIZE / 2;

const CENTER_LINE_X1 = 7.5 + 0.5;

const FRAME_HORIZONTAL_END_X = 34;

const FRAME_STROKE_D = `M${FRAME_HORIZONTAL_END_X} 8L10 8A2 2 0 0 0 8 10L8 38A2 2 0 0 0 10 40L${FRAME_HORIZONTAL_END_X} 40`;

const TRACK_X = 35;
const TRACK_Y = 8;
const TRACK_W = 5;
const TRACK_H = 32;
const TRACK_RX = TRACK_W / 2;
const TRACK_STROKE_W = 1;
const CENTER_LINE_X2 = TRACK_X + TRACK_W - TRACK_STROKE_W / 2;
const TRACK_BORDER_X = TRACK_X + TRACK_STROKE_W / 2;
const TRACK_BORDER_Y = TRACK_Y + TRACK_STROKE_W / 2;
const TRACK_BORDER_W = TRACK_W - TRACK_STROKE_W;
const TRACK_BORDER_H = TRACK_H - TRACK_STROKE_W;
const TRACK_BORDER_RX = TRACK_RX - TRACK_STROKE_W / 2;
const TRACK_HIGHLIGHT_LEFT = TRACK_X;

const VESSEL_PATH_D =
  'M20 20H28V26C28 27.1046 27.1046 28 26 28H22C20.8954 28 20 27.1046 20 26V20Z';

const VESSEL_LOCAL_TOP = 20;
const VESSEL_LOCAL_BOTTOM = 28;
const POINTER_HEIGHT = 2;
const POINTER_RX = POINTER_HEIGHT / 2;
const POINTER_NEUTRAL_TOP =
  (VESSEL_LOCAL_TOP + VESSEL_LOCAL_BOTTOM - POINTER_HEIGHT) / 2;
const POINTER_NEUTRAL_BOTTOM = POINTER_NEUTRAL_TOP + POINTER_HEIGHT;
const POINTER_X = 28;
const POINTER_RIGHT = TRACK_X + TRACK_W;
const POINTER_RIGHT_INNER = POINTER_RIGHT - POINTER_RX;
const FRAME_Y_TOP = 8;
const FRAME_Y_BOTTOM = 40;
const TRANSLATE_Y_MIN = FRAME_Y_TOP - VESSEL_LOCAL_TOP;
const TRANSLATE_Y_MAX = FRAME_Y_BOTTOM - VESSEL_LOCAL_BOTTOM;

const TRACK_INNER_TOP = TRACK_Y + 0.5;
const TRACK_INNER_BOTTOM = TRACK_Y + TRACK_H - 0.5;
const TRACK_INNER_HALF = Math.min(
  CENTER_Y - TRACK_INNER_TOP,
  TRACK_INNER_BOTTOM - CENTER_Y
);
const TRAVEL_HALF_PX = Math.min(
  TRACK_INNER_HALF,
  Math.min(Math.abs(TRANSLATE_Y_MIN), Math.abs(TRANSLATE_Y_MAX))
);

/**
 * `<obc-heave-indicator>` – A compact vertical position indicator with a fixed track and a moving vessel highlight.
 *
 * Visualizes a single instantaneous normalized value using a compact track-and-marker layout.
 *
 * ## Features
 *
 * - **Normalized value:** `value` in `[-1, 1]` maps directly to vertical position.
 * - **Variants:** `enhanced` and `regular` change the accent color.
 *
 * ## Usage Guidelines
 *
 * Use when you need a small heave cue next to other compact indicators.
 */
@customElement('obc-heave-indicator')
export class ObcHeaveIndicator extends LitElement {
  @property({type: String}) type: HeaveIndicatorType =
    HeaveIndicatorType.enhanced;

  @property({type: Number}) value = 0;

  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
    }

    svg {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
  `;

  private clampNormalized(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }
    return Math.max(-1, Math.min(1, value));
  }

  private get clampedValue() {
    return this.clampNormalized(this.value);
  }

  private get translateY() {
    return -this.clampedValue * TRAVEL_HALF_PX;
  }

  private renderCenterLine() {
    return svg`
      <path
        d="M${CENTER_LINE_X1} ${CENTER_Y}L${CENTER_LINE_X2} ${CENTER_Y}"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="1"
        stroke-linecap="square"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderTrackFill() {
    return svg`
      <rect
        x="${TRACK_X}"
        y="${TRACK_Y}"
        width="${TRACK_W}"
        height="${TRACK_H}"
        rx="${TRACK_RX}"
        fill="var(--instrument-frame-primary-color)"
      />
    `;
  }

  private renderTrackBorder() {
    return svg`
      <rect
        x="${TRACK_BORDER_X}"
        y="${TRACK_BORDER_Y}"
        width="${TRACK_BORDER_W}"
        height="${TRACK_BORDER_H}"
        rx="${TRACK_BORDER_RX}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="${TRACK_STROKE_W}"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private get highlightColor() {
    return this.type === HeaveIndicatorType.regular
      ? 'var(--instrument-regular-secondary-color)'
      : 'var(--instrument-enhanced-secondary-color)';
  }

  private get isNeutral() {
    return Math.abs(this.clampedValue) < 0.001;
  }

  private renderPointer(top: number, color: string) {
    return svg`
      <path
        d="M${POINTER_X} ${top}H${POINTER_RIGHT_INNER}A${POINTER_RX} ${POINTER_RX} 0 0 1 ${POINTER_RIGHT} ${top + POINTER_RX}A${POINTER_RX} ${POINTER_RX} 0 0 1 ${POINTER_RIGHT_INNER} ${top + POINTER_HEIGHT}H${POINTER_X}Z"
        fill="${color}"
      />
    `;
  }

  private renderHighlight() {
    if (this.isNeutral) {
      return null;
    }

    const pointerTop = POINTER_NEUTRAL_TOP + this.translateY;
    const pointerBottom = pointerTop + POINTER_HEIGHT;
    const highlightPathD =
      this.translateY <= 0
        ? `M${POINTER_X} ${pointerTop}H${POINTER_RIGHT_INNER}A${POINTER_RX} ${POINTER_RX} 0 0 1 ${POINTER_RIGHT} ${pointerTop + POINTER_RX}V${POINTER_NEUTRAL_BOTTOM}H${TRACK_HIGHLIGHT_LEFT}V${pointerBottom}H${POINTER_X}Z`
        : `M${TRACK_HIGHLIGHT_LEFT} ${POINTER_NEUTRAL_TOP}H${POINTER_RIGHT}V${pointerBottom - POINTER_RX}A${POINTER_RX} ${POINTER_RX} 0 0 1 ${POINTER_RIGHT_INNER} ${pointerBottom}H${POINTER_X}V${pointerTop}H${TRACK_HIGHLIGHT_LEFT}Z`;

    return svg`
      <path
        d="${highlightPathD}"
        fill="${this.highlightColor}"
      />
    `;
  }

  private renderMovingVessel() {
    return svg`
      <g transform="translate(0 ${this.translateY})">
        <path
          d="${VESSEL_PATH_D}"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </g>
    `;
  }

  private renderFrameStroke() {
    return svg`
      <path
        d="${FRAME_STROKE_D}"
        fill="none"
        stroke="var(--instrument-frame-tertiary-color)"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  override render() {
    return html`
      <svg
        viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderCenterLine()} ${this.renderTrackFill()}
        ${this.renderTrackBorder()} ${this.renderHighlight()}
        ${this.isNeutral
          ? this.renderPointer(POINTER_NEUTRAL_TOP, this.highlightColor)
          : null}
        ${this.renderMovingVessel()} ${this.renderFrameStroke()}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-heave-indicator': ObcHeaveIndicator;
  }
}
