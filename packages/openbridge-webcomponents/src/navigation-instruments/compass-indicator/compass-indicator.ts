import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './compass-indicator.css?inline';
import {customElement} from '../../decorator.js';

const HEADING_ARROW_PATH =
  'M23.1426 11.978C23.5519 11.2972 24.6131 11.3458 24.9297 12.1235L32.3877 30.4536L32.4336 30.5796C32.8455 31.8831 31.3809 32.9849 30.209 32.2808V32.2798L24 28.5835L17.79 32.2798L17.791 32.2808C16.5815 33.0075 15.0606 31.8106 15.6123 30.4536L23.0703 12.1235L23.1426 11.978Z';
const LABELED_HEADING_ARROW_PATH =
  'M7.68919 1.5401C7.80154 1.26398 8.19911 1.26398 8.31146 1.5401L13.2832 13.7598C13.5226 14.3482 12.8616 14.8972 12.3115 14.5667L8.00033 11.9997L3.68917 14.5667C3.13908 14.8972 2.478 14.3482 2.71743 13.7598L7.68919 1.5401Z';
const COURSE_ARROW_PATH =
  'M23.1426 11.978C23.5519 11.2972 24.6131 11.3458 24.9297 12.1235L32.3877 30.4536L32.4336 30.5796C32.8455 31.8831 31.3809 32.9849 30.209 32.2808V32.2798L24 28.5835L17.79 32.2798L17.791 32.2808C16.5815 33.0075 15.0606 31.8106 15.6123 30.4536L23.0703 12.1235L23.1426 11.978ZM20.0889 27.4087L23.7451 25.2388L24 25.0864L24.2549 25.2388L27.9102 27.4087L24 17.7974L20.0889 27.4087Z';
const CARDINAL_LABELS_8_WAY = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const CARDINAL_LABELS_CARDINAL = ['N', 'E', 'S', 'W'];

function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

export enum CompassIndicatorType {
  Regular = 'regular',
  Labeled = 'labeled',
}

export enum CompassIndicatorDirection {
  Heading = 'heading',
  Course = 'course',
  North = 'north',
}

/**
 * `<obc-compass-indicator>` – A compact compass direction indicator with heading, course, and north variants.
 *
 * Renders a 48 x 48 directional indicator that can switch between a circular
 * compass face and labeled compact readouts. Use it when you need a small
 * directional cue next to a numeric readout or inside dense instrument layouts.
 *
 * ## Features
 *
 * - **Types**: `regular` shows the circular compass indicator; `labeled` shows a framed indicator with a single cardinal label.
 * - **Directions**: `heading`, `course`, and `north` each use their own visual symbol.
 * - **Angle-driven output**: `angle` rotates the active symbol and drives the derived label in labeled mode.
 *
 * ## Usage Guidelines
 *
 * - Use `direction="heading"` for the filled heading arrow variant.
 * - Use `direction="course"` for the outlined course arrow variant.
 * - Use `direction="north"` for the north marker / bearing-style indicator.
 * - Switch `type` to `labeled` when the indicator should also communicate the
 *   nearest cardinal direction as text.
 */
@customElement('obc-compass-indicator')
export class ObcCompassIndicator extends LitElement {
  private idBase = `compass-indicator-${Math.random().toString(36).slice(2, 9)}`;

  @property({type: Number})
  angle = 0;

  @property({type: String})
  type: CompassIndicatorType = CompassIndicatorType.Regular;

  @property({type: String})
  direction: CompassIndicatorDirection = CompassIndicatorDirection.Heading;

  private get normalizedAngle(): number {
    return normalizeAngle(this.angle);
  }

  private get cardinalLabel(): string {
    const index =
      Math.round(this.normalizedAngle / 45) % CARDINAL_LABELS_8_WAY.length;
    return CARDINAL_LABELS_8_WAY[index];
  }

  private get cardinalLabelPrimary(): string {
    const index =
      Math.round(this.normalizedAngle / 90) % CARDINAL_LABELS_CARDINAL.length;
    return CARDINAL_LABELS_CARDINAL[index];
  }

  private renderArrow(
    direction: CompassIndicatorDirection,
    options?: {
      rotation?: number;
      translateY?: number;
      scale?: number;
    }
  ) {
    const {rotation = 0, translateY = 0, scale = 1} = options ?? {};
    const d =
      direction === CompassIndicatorDirection.Course
        ? COURSE_ARROW_PATH
        : HEADING_ARROW_PATH;

    return svg`
      <g transform="translate(0 ${translateY})">
        <g transform="rotate(${rotation}, 24, 24)">
          <g transform="translate(24 24) scale(${scale}) translate(-24 -24)">
            <path
              d="${d}"
              fill="var(--instrument-enhanced-secondary-color)"
              stroke="var(--border-silhouette-color)"
            />
          </g>
        </g>
      </g>
    `;
  }

  private renderCompassFace(rotation: number, showNorthMarker = true) {
    const ringMaskId = `${this.idBase}-ring-mask`;
    const crosshairMaskId = `${this.idBase}-crosshair-mask`;

    return svg`
      ${
        showNorthMarker
          ? svg`
            <path
              transform="rotate(${rotation}, 24, 24)"
              d="M23.5929 1.56961L19.5645 7.20938C19.3281 7.54031 19.5646 8 19.9713 8L28.0281 8C28.4348 8 28.6714 7.54031 28.435 7.20938L24.4066 1.56961C24.2072 1.29044 23.7923 1.29044 23.5929 1.56961Z"
              fill="var(--instrument-tick-mark-tertiary-color)"
            />
          `
          : null
      }
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
        <path
          d="M24 8C32.8366 8 40 15.1634 40 24C40 32.8366 32.8366 40 24 40C15.1634 40 8 32.8366 8 24C8 15.1634 15.1634 8 24 8ZM24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10Z"
          fill="var(--instrument-frame-primary-color)"
        />
      </mask>
      <g mask="url(#${ringMaskId})">
        <path
          d="M24 0V24M24 24L19.8324 0.364611M24 24L15.7915 1.44736M24 24L12 3.21539M24 24L8.5731 5.61493M24 24L5.61494 8.5731M24 24L3.21539 12M24 24L1.44738 15.7915M24 24L0.364617 19.8324M24 24H0M24 24L0.364611 28.1676M24 24L1.44739 32.2085M24 24L3.21539 36M24 24L5.61493 39.4269M24 24L8.5731 42.3851M24 24L12 44.7846M24 24L15.7915 46.5526M24 24L19.8324 47.6354M24 24V48M24 24L28.1676 47.6354M24 24L32.2085 46.5526M24 24L36 44.7846M24 24L39.4269 42.3851M24 24L42.3851 39.4269M24 24L44.7846 36M24 24L46.5526 32.2085M24 24L47.6354 28.1676M24 24H48M24 24L47.6354 19.8325M24 24L46.5526 15.7915M24 24L44.7846 12M24 24L42.3851 8.57313M24 24L39.4269 5.61497M24 24L36 3.21539M24 24L32.2085 1.44741M24 24L28.1676 0.364646"
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
          d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36Z"
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

  private renderRoundIndicator(
    direction: CompassIndicatorDirection,
    arrowRotation: number,
    faceRotation: number
  ) {
    return html`
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderCompassFace(faceRotation)}
        ${this.renderArrow(direction, {rotation: arrowRotation})}
      </svg>
    `;
  }

  private renderRegularNorthNeedle() {
    const tailClipId = `${this.idBase}-regular-north-tail-clip`;

    return svg`
      <g transform="rotate(${this.normalizedAngle - 315}, 24, 24)">
        <g transform="translate(-5 -5)">
          <svg
            x="14.5"
            y="14.5"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            overflow="visible"
          >
            <g clip-path="url(#${tailClipId})">
              <path
                d="M11.8398 17.0537L2.80041 3.49458C2.49725 3.03984 3.03904 2.49804 3.49379 2.80121L17.0529 11.8406C17.9318 12.4265 18.6859 13.1806 19.2717 14.0594L28.3112 27.6186C28.6143 28.0733 28.0726 28.6151 27.6178 28.312L14.0587 19.2725C13.1798 18.6867 12.4257 17.9326 11.8398 17.0537Z"
                fill="var(--instrument-enhanced-secondary-color)"
                stroke="var(--instrument-enhanced-secondary-color)"
              />
            </g>
            <defs>
              <clipPath id="${tailClipId}">
                <rect
                  width="8"
                  height="18"
                  fill="white"
                  transform="translate(0 5.65723) rotate(-45)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            x="15.5"
            y="15.5"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            overflow="visible"
          >
            <path
              d="M9.63184 14.8448L0.592403 1.2856C0.28924 0.830852 0.831036 0.289059 1.28578 0.592223L14.8449 9.63166C15.7238 10.2175 16.4779 10.9716 17.0637 11.8505L26.1032 25.4096C26.4063 25.8644 25.8645 26.4062 25.4098 26.103L11.8506 17.0636C10.9718 16.4777 10.2177 15.7236 9.63184 14.8448Z"
              fill="none"
              stroke="var(--instrument-enhanced-secondary-color)"
              stroke-width="1.5"
            />
          </svg>
        </g>
        <circle
          cx="24"
          cy="24"
          r="3"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-enhanced-secondary-color)"
          stroke-width="2"
        />
      </g>
    `;
  }

  private renderLabeledIndicator(direction: CompassIndicatorDirection) {
    const label = this.cardinalLabelPrimary;
    const isHeading = direction === CompassIndicatorDirection.Heading;

    return html`
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="8"
          width="32"
          height="32"
          rx="4"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <text
          x="24"
          y="11"
          fill="var(--instrument-tick-mark-label-secondary-color)"
          font-family="var(--global-typography-font-family)"
          font-size="var(--global-typography-instrument-tick-mark-active-font-size)"
          font-style="normal"
          font-weight="var(--global-typography-instrument-tick-mark-active-font-weight)"
          line-height="var(--global-typography-instrument-tick-mark-active-line-height)"
          text-anchor="middle"
          dominant-baseline="text-before-edge"
          style="font-feature-settings: 'ss04' on;"
        >
          ${label}
        </text>
        <g
          transform="translate(24 32) rotate(${this
            .normalizedAngle}) translate(-8 -8)"
        >
          <path
            d="${LABELED_HEADING_ARROW_PATH}"
            fill="${isHeading
              ? 'var(--instrument-enhanced-secondary-color)'
              : 'none'}"
            stroke="${isHeading
              ? 'none'
              : 'var(--instrument-enhanced-secondary-color)'}"
            stroke-width="${isHeading ? '0' : '1'}"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    `;
  }

  private renderNorthIndicator(labeled: boolean) {
    const label = this.cardinalLabel;

    if (!labeled) {
      return html`
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${this.renderCompassFace(0, false)} ${this.renderRegularNorthNeedle()}
        </svg>
      `;
    }

    return html`
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <path d="M24 6.5V14" stroke="var(--instrument-frame-tertiary-color)" />
        <path d="M24 34V41.5" stroke="var(--instrument-frame-tertiary-color)" />
        <path d="M6.5 24H14" stroke="var(--instrument-frame-tertiary-color)" />
        <path d="M34 24H41.5" stroke="var(--instrument-frame-tertiary-color)" />
        ${this.renderRegularNorthNeedle()}
        <circle
          cx="24"
          cy="24"
          r="12"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <text
          x="24"
          y="25"
          fill="var(--element-neutral-color)"
          font-family="var(--font-family-main)"
          font-size="var(--global-typography-ui-label-active-font-size)"
          font-weight="var(--global-typography-ui-label-active-font-weight)"
          line-height="var(--global-typography-ui-label-active-line-height)"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          ${label}
        </text>
      </svg>
    `;
  }

  override render() {
    if (this.direction === CompassIndicatorDirection.North) {
      return this.renderNorthIndicator(
        this.type === CompassIndicatorType.Labeled
      );
    }

    if (this.type === CompassIndicatorType.Labeled) {
      return this.renderLabeledIndicator(this.direction);
    }

    return this.renderRoundIndicator(this.direction, 0, -this.normalizedAngle);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass-indicator': ObcCompassIndicator;
  }
}
