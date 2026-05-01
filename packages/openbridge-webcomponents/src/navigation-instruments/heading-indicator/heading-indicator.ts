import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './heading-indicator.css?inline';
import {customElement} from '../../decorator.js';

const COMPASS_NORTH_MARKER_PATH =
  'M23.5929 1.56961L19.5645 7.20938C19.3281 7.54031 19.5646 8 19.9713 8L28.0281 8C28.4348 8 28.6714 7.54031 28.435 7.20938L24.4066 1.56961C24.2072 1.29044 23.7923 1.29044 23.5929 1.56961Z';
const COMPASS_RING_MASK_PATH =
  'M24 8C32.8366 8 40 15.1634 40 24C40 32.8366 32.8366 40 24 40C15.1634 40 8 32.8366 8 24C8 15.1634 15.1634 8 24 8ZM24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10Z';
const COMPASS_RING_TICKS_PATH =
  'M24 0V24M24 24L19.8324 0.364611M24 24L15.7915 1.44736M24 24L12 3.21539M24 24L8.5731 5.61493M24 24L5.61494 8.5731M24 24L3.21539 12M24 24L1.44738 15.7915M24 24L0.364617 19.8324M24 24H0M24 24L0.364611 28.1676M24 24L1.44739 32.2085M24 24L3.21539 36M24 24L5.61493 39.4269M24 24L8.5731 42.3851M24 24L12 44.7846M24 24L15.7915 46.5526M24 24L19.8324 47.6354M24 24V48M24 24L28.1676 47.6354M24 24L32.2085 46.5526M24 24L36 44.7846M24 24L39.4269 42.3851M24 24L42.3851 39.4269M24 24L44.7846 36M24 24L46.5526 32.2085M24 24L47.6354 28.1676M24 24H48M24 24L47.6354 19.8325M24 24L46.5526 15.7915M24 24L44.7846 12M24 24L42.3851 8.57313M24 24L39.4269 5.61497M24 24L36 3.21539M24 24L32.2085 1.44741M24 24L28.1676 0.364646';
const COMPASS_CROSSHAIR_MASK_PATH =
  'M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36Z';
const HDG_ARROW_HEAD_PATH =
  'M5.3584 0.857422C5.64497 0.381014 6.35503 0.38101 6.6416 0.857422L6.69629 0.966797L10.4258 10.1318C10.798 11.0476 9.77261 11.8324 8.97559 11.3535V11.3525L6 9.58106L3.02344 11.3525L3.02441 11.3535C2.2274 11.8324 1.20197 11.0476 1.57422 10.1318L5.30371 0.966797L5.3584 0.857422Z';
const HDG_COMPACT_ARROW_HEAD_PATH =
  'M3.42969 0.817383C3.68447 0.394063 4.3157 0.393867 4.57031 0.817383L4.61816 0.915039L7.10449 7.02539C7.41674 7.79394 6.55693 8.4421 5.89746 8.0459V8.04492L3.99902 6.91504L2.10059 8.04492L2.10156 8.0459C1.44206 8.44186 0.583033 7.79395 0.895508 7.02539L3.38086 0.915039L3.42969 0.817383Z';
const XTD_FRAME_PATH =
  'M30.5 0.500001C31.6046 0.500001 32.5 1.39543 32.5 2.5L32.5 30.5C32.5 31.6046 31.6046 32.5 30.5 32.5H2.5C1.39543 32.5 0.5 31.6046 0.5 30.5L0.500001 2.5C0.500001 1.39543 1.39543 0.5 2.5 0.5L30.5 0.500001Z';

function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

export enum HeadingIndicatorType {
  HDG = 'HDG',
  XTD = 'XTD',
}

/**
 * `<obc-heading-indicator>` – A compact heading status indicator with HDG and XTD variants.
 *
 * Renders a 48 x 48 icon used as a small status cue for heading-related modes.
 *
 * ## Features
 *
 * - **Types**: `HDG` uses a circular compass scale with a centered heading cue.
 * - **Types**: `XTD` uses a split rectangular frame with a fixed centerline, a movable position cue driven by `xtd`, and arrow rotation driven by `angle`.
 * - **Fixed-size output**: both variants render inside the same 48 x 48 viewport.
 *
 * ## Usage Guidelines
 *
 * - Use `type="HDG"` for the compass-style heading cue.
 * - Use `type="XTD"` for the split-frame cross-track cue.
 */
@customElement('obc-heading-indicator')
export class ObcHeadingIndicator extends LitElement {
  private idBase = `heading-indicator-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: String})
  type: HeadingIndicatorType = HeadingIndicatorType.HDG;

  @property({type: Number})
  angle = 0;

  /** Cross-track deviation in the range [-1, 1]. */
  @property({type: Number})
  xtd = 0;

  private get normalizedAngle(): number {
    return normalizeAngle(this.angle);
  }

  private renderCompassFace(rotation = 0) {
    const ringMaskId = `${this.idBase}-ring-mask`;
    const crosshairMaskId = `${this.idBase}-crosshair-mask`;

    return svg`
      <path
        transform="rotate(${rotation}, 24, 24)"
        d="${COMPASS_NORTH_MARKER_PATH}"
        fill="var(--instrument-tick-mark-tertiary-color)"
      />
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="var(--instrument-frame-primary-color)"
        stroke="var(--instrument-frame-tertiary-color)"
      />
      <mask
        id="${ringMaskId}"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="48"
        height="48"
      >
        <path d="${COMPASS_RING_MASK_PATH}" fill="var(--instrument-frame-primary-color)" />
      </mask>
      <g mask="url(#${ringMaskId})">
        <path
          d="${COMPASS_RING_TICKS_PATH}"
          stroke="var(--instrument-frame-tertiary-color)"
        />
      </g>
      <mask
        id="${crosshairMaskId}"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="-14"
        y="-14"
        width="76"
        height="76"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="${COMPASS_CROSSHAIR_MASK_PATH}"
          fill="var(--instrument-frame-primary-color)"
        />
      </mask>
      <g mask="url(#${crosshairMaskId})">
        <path
          d="M24 0V24M24 24H0M24 24V48M24 24H48"
          stroke="var(--instrument-frame-tertiary-color)"
        />
      </g>
    `;
  }

  private renderHdgArrow(rotation = 0) {
    return svg`
      <g transform="rotate(${rotation}, 24, 24)">
        <svg x="20" y="7" width="8" height="9" viewBox="0 0 8 9" fill="none">
          <path
            d="${HDG_COMPACT_ARROW_HEAD_PATH}"
            fill="var(--instrument-enhanced-secondary-color)"
            stroke="var(--border-silhouette-color)"
          />
        </svg>
        <svg
          x="23"
          y="11"
          width="2"
          height="14"
          viewBox="0 0 2 14"
          fill="none"
        >
          <path
            d="M1 1L1 13"
            stroke="var(--instrument-enhanced-secondary-color)"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <svg
          x="23.5"
          y="25"
          width="1"
          height="15"
          viewBox="0 0 1 15"
          fill="none"
        >
          <path
            d="M0.5 0.5L0.500001 14.5"
            stroke="var(--instrument-enhanced-secondary-color)"
            stroke-linecap="round"
          />
        </svg>
        <svg x="22" y="23" width="4" height="4" viewBox="0 0 4 4" fill="none">
          <circle
            cx="2"
            cy="2"
            r="1"
            fill="var(--instrument-frame-primary-color)"
            stroke="var(--instrument-enhanced-secondary-color)"
            stroke-width="2"
          />
        </svg>
      </g>
    `;
  }

  private renderHdg() {
    return html`
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderCompassFace(0)}
        ${this.renderHdgArrow(this.normalizedAngle)}
      </svg>
    `;
  }

  private renderXtd() {
    const XTD_FRAME_X = 7.5;
    const XTD_FRAME_INNER_WIDTH = 32;
    const XTD_ARROW_WIDTH = 12;
    const XTD_ARROW_HEIGHT = 12;
    const XTD_BLUE_LINE_WIDTH = 2;
    const XTD_CENTER_X = 23;
    const XTD_ARROW_Y = 24;
    const XTD_BLUE_LINE_X_BASE = XTD_CENTER_X - XTD_BLUE_LINE_WIDTH / 2;
    const XTD_ARROW_X_BASE = XTD_CENTER_X - XTD_ARROW_WIDTH / 2;
    const maxOffsetPx = Math.min(
      XTD_ARROW_X_BASE - XTD_FRAME_X,
      XTD_FRAME_X + XTD_FRAME_INNER_WIDTH - XTD_ARROW_WIDTH - XTD_ARROW_X_BASE
    );
    const clampedXtd = Math.max(-1, Math.min(1, this.xtd));
    const offsetPx = clampedXtd * maxOffsetPx;
    const arrowX = XTD_ARROW_X_BASE + offsetPx;
    const arrowCenterX = arrowX + XTD_ARROW_WIDTH / 2;
    const arrowCenterY = XTD_ARROW_Y + XTD_ARROW_HEIGHT / 2;

    return html`
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="${XTD_FRAME_PATH}"
          transform="translate(7.5 7.5)"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <svg x="23" y="8" width="1" height="32" viewBox="0 0 1 32" fill="none">
          <path d="M0.5 0V32" stroke="var(--instrument-frame-tertiary-color)" />
        </svg>
        <svg
          x=${XTD_BLUE_LINE_X_BASE + offsetPx}
          y="8"
          width="2"
          height="25"
          viewBox="0 0 2 25"
          fill="none"
        >
          <path
            d="M1 0V25"
            stroke="var(--instrument-enhanced-secondary-color)"
            stroke-width="2"
          />
        </svg>
        <g
          transform="rotate(${this
            .normalizedAngle}, ${arrowCenterX}, ${arrowCenterY})"
        >
          <svg
            x=${arrowX}
            y="${XTD_ARROW_Y}"
            width="${XTD_ARROW_WIDTH}"
            height="${XTD_ARROW_HEIGHT}"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="${HDG_ARROW_HEAD_PATH}"
              fill="var(--instrument-enhanced-secondary-color)"
              stroke="var(--border-silhouette-color)"
            />
          </svg>
        </g>
      </svg>
    `;
  }

  override render() {
    return this.type === HeadingIndicatorType.XTD
      ? this.renderXtd()
      : this.renderHdg();
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-heading-indicator': ObcHeadingIndicator;
  }
}
