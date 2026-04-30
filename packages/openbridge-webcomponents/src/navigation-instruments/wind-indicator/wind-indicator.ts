import {LitElement, css, html, svg, type SVGTemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {styleMap} from 'lit/directives/style-map.js';
import '../../icons/index.js';

export enum WindIndicatorType {
  arrow = 'arrow',
  shaft = 'shaft',
  labeled = 'labeled',
}

export enum WindIndicatorDirection {
  true = 'true',
  relative = 'relative',
}

export enum WindIndicatorPriority {
  regular = 'regular',
  enhanced = 'enhanced',
}

const VIEW_SIZE = 48;
const CX = VIEW_SIZE / 2;
const CY = VIEW_SIZE / 2;

const FRAME_R = 18;
const N_ARROW_BASE_ROTATION_DEG = -25;

const TRUE_N_ARROW_D =
  'M23.5912 1.56962L19.5628 7.20939C19.3264 7.54032 19.563 8.00001 19.9696 8.00001H28.0264C28.4331 8.00001 28.6697 7.54032 28.4333 7.20939L24.4049 1.56962C24.2055 1.29045 23.7906 1.29045 23.5912 1.56962Z';

const SHAFT_TRUE_CIRCLE_TPL = svg`
  <circle
    cx="24.0004"
    cy="23.9996"
    r="2"
    transform="rotate(60 24.0004 23.9996)"
    fill="var(--instrument-frame-primary-color)"
    stroke="currentColor"
    stroke-width="1.5"
    vector-effect="non-scaling-stroke"
  />
`;

const SHAFT_TRUE_WIND_BARB_TPL = svg`
  <path
    d="M39.613 20.3747C39.7971 20.6935 39.6878 21.1013 39.3689 21.2853C39.0501 21.4694 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L35.3036 18.2439L37.3036 21.708C37.4876 22.0269 37.3784 22.4346 37.0595 22.6187C36.7407 22.8028 36.3329 22.6935 36.1489 22.3747L34.1489 18.9106L32.9942 19.5772L33.9942 21.3093C34.1782 21.6281 34.069 22.0359 33.7501 22.22C33.4313 22.4041 33.0235 22.2948 32.8395 21.9759L31.8395 20.2439L24.3339 24.5772L23.6672 23.4225L36.3114 16.1224C36.6621 15.9201 37.1103 16.0402 37.3128 16.3907L39.613 20.3747Z"
    fill="currentColor"
  />
`;

const SHAFT_TRUE_WIND_BARB_D_BY_LEVEL: string[] = [
  'M33.0954 23.7527C35.1680 22.5560 35.8782 19.9058 34.6816 17.8332C33.4850 15.7606 30.8347 15.0504 28.7621 16.2471C26.6895 17.4437 25.9794 20.0939 27.1760 22.1665L26.3099 22.6665C24.8372 20.1156 25.7112 16.8538 28.2621 15.3810C30.8130 13.9083 34.0748 14.7823 35.5476 17.3332C37.0204 19.8841 36.1463 23.1459 33.5954 24.6187C31.0445 26.0914 27.7827 25.2174 26.3099 22.6665L27.1760 22.1665C28.3726 24.2392 31.0228 24.9493 33.0954 23.7527L33.0954 23.7527',
  'M37.2797 16.3332C37.4638 16.6521 37.3545 17.0598 37.0356 17.2439L24.3339 24.5772L23.6672 23.4225L36.3690 16.0892C36.6878 15.9051 37.0956 16.0143 37.2797 16.3332L37.2797 16.3332',
  'M37.2797 16.3332C37.4638 16.6521 37.3545 17.0598 37.0356 17.2439L35.3036 18.2439L36.3036 19.9759C36.4877 20.2948 36.3784 20.7025 36.0595 20.8866C35.7407 21.0707 35.3330 20.9615 35.1489 20.6426L34.1489 18.9106L24.3339 24.5772L23.6672 23.4225L36.3690 16.0892C36.6878 15.9051 37.0956 16.0143 37.2797 16.3332L37.2797 16.3332',
  'M39.6130 20.3747C39.7971 20.6936 39.6878 21.1013 39.3690 21.2854C39.0501 21.4695 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L24.3339 24.5772L23.6672 23.4225L36.3115 16.1224C36.6621 15.9201 37.1103 16.0402 37.3129 16.3907L39.6130 20.3747L39.6130 20.3747',
  'M39.6130 20.3747C39.7971 20.6936 39.6878 21.1013 39.3690 21.2854C39.0501 21.4695 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L35.3036 18.2439L36.3036 19.9759C36.4877 20.2948 36.3784 20.7025 36.0595 20.8866C35.7407 21.0707 35.3330 20.9615 35.1489 20.6426L34.1489 18.9106L24.3339 24.5772L23.6672 23.4225L36.3115 16.1224C36.6621 15.9201 37.1103 16.0402 37.3129 16.3907L39.6130 20.3747L39.6130 20.3747',
  'M39.6130 20.3747C39.7971 20.6936 39.6878 21.1013 39.3690 21.2854C39.0501 21.4695 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L35.3036 18.2439L37.3036 21.7080C37.4877 22.0269 37.3784 22.4346 37.0595 22.6187C36.7407 22.8028 36.3330 22.6935 36.1489 22.3747L34.1489 18.9106L24.3339 24.5772L23.6672 23.4225L36.3115 16.1224C36.6621 15.9201 37.1103 16.0402 37.3129 16.3907L39.6130 20.3747L39.6130 20.3747',
  'M39.6130 20.3747C39.7971 20.6936 39.6878 21.1013 39.3690 21.2854C39.0501 21.4695 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L35.3036 18.2439L37.3036 21.7080C37.4877 22.0269 37.3784 22.4346 37.0595 22.6187C36.7407 22.8028 36.3330 22.6935 36.1489 22.3747L34.1489 18.9106L32.9942 19.5772L33.9942 21.3093C34.1783 21.6281 34.0690 22.0359 33.7501 22.2200C33.4313 22.4041 33.0235 22.2948 32.8394 21.9759L31.8395 20.2439L24.3339 24.5772L23.6672 23.4225L36.3115 16.1224C36.6621 15.9201 37.1103 16.0402 37.3129 16.3907L39.6130 20.3747L39.6130 20.3747',
  'M39.613 20.3747C39.7971 20.6935 39.6878 21.1013 39.3689 21.2853C39.0501 21.4694 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L35.3036 18.2439L37.3036 21.708C37.4876 22.0269 37.3784 22.4346 37.0595 22.6187C36.7407 22.8028 36.3329 22.6935 36.1489 22.3747L34.1489 18.9106L32.9942 19.5772L33.9942 21.3093C34.1782 21.6281 34.069 22.0359 33.7501 22.22C33.4313 22.4041 33.0235 22.2948 32.8395 21.9759L31.8395 20.2439L24.3339 24.5772L23.6672 23.4225L36.3114 16.1224C36.6621 15.9201 37.1103 16.0402 37.3128 16.3907L39.613 20.3747Z',
  'M39.6130 20.3747C39.7971 20.6936 39.6878 21.1013 39.3690 21.2854C39.0501 21.4695 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L35.3036 18.2439L37.3036 21.7080C37.4877 22.0269 37.3784 22.4346 37.0595 22.6187C36.7407 22.8028 36.3330 22.6935 36.1489 22.3747L34.1489 18.9106L32.9942 19.5772L34.9941 23.0413C35.1782 23.3602 35.0690 23.7679 34.7501 23.9520C34.4313 24.1361 34.0235 24.0269 33.8394 23.7080L31.8395 20.2439L30.6847 20.9105L31.6847 22.6426C31.8688 22.9615 31.7596 23.3692 31.4407 23.5533C31.1218 23.7374 30.7141 23.6281 30.5300 23.3093L29.5300 21.5772L24.3339 24.5772L23.6672 23.4225L36.3115 16.1224C36.6621 15.9201 37.1103 16.0402 37.3129 16.3907L39.6130 20.3747L39.6130 20.3747',
  'M39.6130 20.3747C39.7971 20.6936 39.6878 21.1013 39.3690 21.2854C39.0501 21.4695 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L35.3036 18.2439L37.3036 21.7080C37.4877 22.0269 37.3784 22.4346 37.0595 22.6187C36.7407 22.8028 36.3330 22.6935 36.1489 22.3747L34.1489 18.9106L32.9942 19.5772L34.9941 23.0413C35.1782 23.3602 35.0690 23.7679 34.7501 23.9520C34.4313 24.1361 34.0235 24.0269 33.8394 23.7080L31.8395 20.2439L30.6847 20.9105L32.6847 24.3747C32.8688 24.6935 32.7596 25.1012 32.4407 25.2853C32.1218 25.4694 31.7141 25.3602 31.5300 25.0413L29.5300 21.5772L24.3339 24.5772L23.6672 23.4225L36.3115 16.1224C36.6621 15.9201 37.1103 16.0402 37.3129 16.3907L39.6130 20.3747L39.6130 20.3747',
  'M39.6130 20.3747C39.7971 20.6936 39.6878 21.1013 39.3690 21.2854C39.0501 21.4695 38.6424 21.3602 38.4583 21.0413L36.4583 17.5772L35.3036 18.2439L37.3036 21.7080C37.4877 22.0269 37.3784 22.4346 37.0595 22.6187C36.7407 22.8028 36.3330 22.6935 36.1489 22.3747L34.1489 18.9106L32.9942 19.5772L34.9941 23.0413C35.1782 23.3602 35.0690 23.7679 34.7501 23.9520C34.4313 24.1361 34.0235 24.0269 33.8394 23.7080L31.8395 20.2439L30.6847 20.9105L32.6847 24.3747C32.8688 24.6935 32.7596 25.1012 32.4407 25.2853C32.1218 25.4694 31.7141 25.3602 31.5300 25.0413L29.5300 21.5772L28.3753 22.2439L29.3753 23.9759C29.5594 24.2948 29.4502 24.7025 29.1313 24.8866C28.8124 25.0707 28.4047 24.9615 28.2206 24.6426L27.2206 22.9105L24.3339 24.5772L23.6672 23.4225L36.3115 16.1224C36.6621 15.9201 37.1103 16.0402 37.3129 16.3907L39.6130 20.3747L39.6130 20.3747',
  'M37.3380 16.4822L37.3672 16.5654L38.7821 21.5122C38.9920 22.2462 38.0802 22.7726 37.5496 22.2238L34.2758 18.8373L24.3339 24.5772L23.6672 23.4224L36.2952 16.1318C36.6825 15.9082 37.1705 16.0816 37.3380 16.4822L37.3380 16.4822',
  'M37.3380 16.4822L37.3672 16.5654L38.7821 21.5122C38.9920 22.2462 38.0802 22.7726 37.5496 22.2238L34.2758 18.8373L32.9942 19.5772L34.9942 23.0413C35.1783 23.3602 35.0690 23.7679 34.7502 23.9520C34.4313 24.1361 34.0236 24.0268 33.8395 23.7080L31.8395 20.2438L24.3339 24.5772L23.6672 23.4224L36.2952 16.1318C36.6825 15.9082 37.1705 16.0816 37.3380 16.4822L37.3380 16.4822',
];

const SHAFT_RELATIVE_EXPORT_OFFSET_X = -9.9395;
const SHAFT_RELATIVE_EXPORT_OFFSET_Y = -9.9404;
const SHAFT_RELATIVE_FIGMA_CX = 33.9395;
const SHAFT_RELATIVE_FIGMA_CY = 33.9404;
const SHAFT_RELATIVE_WIND_7_D =
  'M41.332 19.8761C41.5987 19.9476 41.757 20.2217 41.6855 20.4885C41.614 20.7552 41.3399 20.9135 41.0731 20.842L38.1754 20.0656L37.9165 21.0315L40.8143 21.8079C41.0811 21.8794 41.2394 22.1536 41.1679 22.4203C41.0964 22.6871 40.8222 22.8453 40.5555 22.7739L37.6577 21.9974L37.3989 22.9633L38.8478 23.3516C39.1145 23.423 39.2728 23.6972 39.2014 23.9639C39.1299 24.2307 38.8557 24.389 38.589 24.3175L37.1401 23.9293L35.4578 30.2078L34.4918 29.949L37.326 19.3719C37.4046 19.0787 37.706 18.9046 37.9993 18.9831L41.332 19.8761Z';
const SHAFT_RELATIVE_WIND_ICON_ROTATE_DEG = -157;
const SHAFT_RELATIVE_WIND_ICON_TX = 32.0346;
const SHAFT_RELATIVE_WIND_ICON_TY = 18.4132;
const SHAFT_RELATIVE_WIND_ICON_AXIS_SCALE = 0.4914435;
const SHAFT_RELATIVE_WIND_ROTATION_OFFSET_DEG = 129.2663;
const SHAFT_RELATIVE_HDG_BG_X = 28.4395;
const SHAFT_RELATIVE_HDG_BG_Y = 28.4404;
const SHAFT_RELATIVE_HDG_BG_SIZE = 11;
const SHAFT_RELATIVE_HDG_TRIANGLE_D =
  'M33.7061 28.5957C33.7904 28.3887 34.0885 28.3887 34.1728 28.5957L37.9016 37.7605C38.0812 38.2018 37.5854 38.6136 37.1728 38.3657L33.9395 36.4404L30.7061 38.3657C30.2935 38.6136 29.7977 38.2018 29.9773 37.7605L33.7061 28.5957Z';

const SHAFT_ARROW_OFFSET_DEG = 118;
const SHAFT_TRUE_ARROW_OFFSET_DEG = SHAFT_ARROW_OFFSET_DEG;

const LABELED_TICK_MARKS_TPL = svg`
  <mask
    id="obc-wind-indicator-labeled-ticks-mask-0"
    style="mask-type: alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="48"
    height="48"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40ZM24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36Z"
      fill="white"
    />
  </mask>
  <g mask="url(#obc-wind-indicator-labeled-ticks-mask-0)">
    <path
      d="M24 0V24M24 24L12 3.21539M24 24L3.21539 12M24 24H0M24 24L3.21539 36M24 24L12 44.7846M24 24V48M24 24L36 44.7846M24 24L44.7846 36M24 24H48M24 24L44.7846 12M24 24L36 3.21539"
      stroke="var(--instrument-frame-tertiary-color)"
      vector-effect="non-scaling-stroke"
    />
  </g>
  <mask
    id="obc-wind-indicator-labeled-ticks-mask-1"
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
      fill="white"
    />
  </mask>
  <g mask="url(#obc-wind-indicator-labeled-ticks-mask-1)">
    <path
      d="M24 0V24M24 24H0M24 24V48M24 24H48"
      stroke="var(--instrument-frame-tertiary-color)"
      vector-effect="non-scaling-stroke"
    />
  </g>
`;

const LABELED_ARROW_FRAME_R = 17.5;
const LABELED_ARROW_SCALE = FRAME_R / LABELED_ARROW_FRAME_R;
const LABELED_ARROW_CX = 32.7881;
const LABELED_ARROW_CY = 32.7852;
const LABELED_ARROW_OFFSET_DEG = 29.7225;
const LABELED_ARROW_TPL = svg`
  <circle
    cx="22.7845"
    cy="15.4642"
    r="2"
    transform="rotate(150 22.7845 15.4642)"
    fill="currentColor"
  />
  <path
    d="M41.7842 48.373L37.7842 41.4448"
    stroke="currentColor"
    stroke-linecap="round"
    vector-effect="non-scaling-stroke"
  />
  <path
    d="M27.7842 24.124L23.7842 17.1958"
    stroke="currentColor"
    stroke-linecap="round"
    vector-effect="non-scaling-stroke"
  />
  <path
    d="M44.9277 46.0779L44.3529 52.0069C44.3198 52.3483 43.9605 52.5558 43.6482 52.4137L38.2261 49.947C39.4419 49.5603 40.6351 49.0376 41.7854 48.3735C42.9356 47.7093 43.9849 46.9374 44.9277 46.0779Z"
    fill="currentColor"
  />
`;

/**
 * `<obc-wind-indicator>` – A compact wind indicator with a fixed frame and a rotating wind marker.
 *
 * Visualizes a discrete wind `level` using a compact icon plus optional mode layers.
 *
 * ## Features
 *
 * - **Variants:** `type` (`arrow` | `shaft` | `labeled`), `direction` (`true` | `relative`), `priority` (`regular` | `enhanced`).
 * - **Discrete input:** `level` selects the icon state; mapping from real wind to `level` happens outside.
 *
 * ## Usage Guidelines
 *
 * Use when you need a small wind cue next to other compact indicators.
 */
@customElement('obc-wind-indicator')
export class ObcWindIndicator extends LitElement {
  @property({type: String}) type: WindIndicatorType = WindIndicatorType.arrow;

  @property({type: String}) direction: WindIndicatorDirection =
    WindIndicatorDirection.true;

  @property({type: String}) priority: WindIndicatorPriority =
    WindIndicatorPriority.regular;

  @property({type: Number}) level = 0;

  @property({type: Number}) heading = 0;

  /**
   * Primary wind direction input (wind-from).
   *
   * Represents the direction the wind comes **from** in degrees.
   * - `0` / `360`: wind from north → marker points south (down)
   * - `180`: wind from south → marker points north (up)
   */
  @property({type: Number, attribute: 'wind-from-angle'}) windFromAngle = 0;

  /**
   * @deprecated Use `windFromAngle` instead.
   */
  @property({type: Number})
  get angle() {
    return this.windFromAngle;
  }
  set angle(value: number) {
    this.windFromAngle = value;
  }

  static override styles = css`
    :host {
      display: flex;
      box-sizing: border-box;
      width: var(--global-size-spacing-touch-target-min);
      height: var(--global-size-spacing-touch-target-min);
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
    }

    svg {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      flex-shrink: 0;
    }

    text {
      font: var(--font-family-main);
    }

    svg g[data-name='hdg'] path {
      fill: currentColor !important;
    }

    svg g[data-name='wind'] path {
      fill: currentColor !important;
    }
  `;

  private clampLevel(value: number): number {
    if (!Number.isFinite(value)) {
      return 0;
    }
    return Math.max(0, Math.min(12, Math.round(value)));
  }

  private get clampedLevel(): number {
    return this.clampLevel(this.level);
  }

  private get accentColor(): string {
    return this.priority === WindIndicatorPriority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private getWindBaseAngle(): number {
    if (this.type === WindIndicatorType.labeled) {
      return this.windFromAngle;
    }
    return this.direction === WindIndicatorDirection.relative
      ? this.windFromAngle - this.heading
      : this.windFromAngle;
  }

  private getWindRotation(offsetDeg = 0): number {
    return this.getWindBaseAngle() + offsetDeg;
  }

  private readonly windIconCache = new Map<string, SVGTemplateResult>();

  private getWindIconSvg(tagName: string): SVGTemplateResult | null {
    const cached = this.windIconCache.get(tagName);
    if (cached) {
      return cached;
    }

    const ctor = customElements.get(tagName) as
      | (new () => {icon?: SVGTemplateResult; iconCss?: SVGTemplateResult})
      | undefined;

    if (!ctor) {
      return null;
    }

    const instance = new ctor();
    const tpl: SVGTemplateResult | undefined =
      instance.iconCss ?? instance.icon;
    if (!tpl) {
      return null;
    }

    this.windIconCache.set(tagName, tpl);
    return tpl;
  }

  private getWindIconTagName(
    type: WindIndicatorType,
    _direction: WindIndicatorDirection,
    level: number
  ): string {
    const index = Math.max(0, Math.min(12, Math.round(level))) + 1;

    if (type === WindIndicatorType.shaft) {
      return `obi-wind-shaft-${index}`;
    }

    return `obi-wind-true-${index}`;
  }

  private getWindIcon(
    type: WindIndicatorType,
    direction: WindIndicatorDirection,
    level: number
  ): SVGTemplateResult | null {
    const tagName = this.getWindIconTagName(type, direction, level);
    return this.getWindIconSvg(tagName);
  }

  private renderFrame() {
    return svg`
      <circle
        cx="${CX}"
        cy="${CY}"
        r="${FRAME_R}"
        fill="var(--instrument-frame-primary-color)"
        stroke="var(--instrument-frame-tertiary-color)"
        vector-effect="non-scaling-stroke"
      />
    `;
  }

  private renderNorthArrow() {
    if (this.type === WindIndicatorType.labeled) {
      return null;
    }

    const baseRotation =
      this.direction === WindIndicatorDirection.relative
        ? this.heading +
          (this.type === WindIndicatorType.shaft
            ? N_ARROW_BASE_ROTATION_DEG
            : 0)
        : 0;

    return svg`
      <g transform="rotate(${baseRotation} ${CX} ${CY})">
        <g transform="translate(0 -1.5)">
          <path
            d="${TRUE_N_ARROW_D}"
            fill="var(--instrument-frame-tertiary-color)"
          />
        </g>
      </g>
    `;
  }

  private renderLabeledTickMarks() {
    if (this.type !== WindIndicatorType.labeled) {
      return null;
    }

    return LABELED_TICK_MARKS_TPL;
  }

  private renderLabeledArrow() {
    if (this.type !== WindIndicatorType.labeled) {
      return null;
    }

    const color =
      this.priority === WindIndicatorPriority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--element-neutral-color)';

    const styles = {color};

    return svg`
      <g
        style=${styleMap(styles)}
        transform="translate(${CX} ${CY}) rotate(${this.getWindRotation(LABELED_ARROW_OFFSET_DEG)}) scale(${LABELED_ARROW_SCALE}) translate(-${LABELED_ARROW_CX} -${LABELED_ARROW_CY})"
      >
        ${LABELED_ARROW_TPL}
      </g>
    `;
  }

  private renderHdgGroup() {
    if (this.type === WindIndicatorType.labeled) {
      return null;
    }

    if (
      this.type === WindIndicatorType.shaft &&
      this.direction === WindIndicatorDirection.relative
    ) {
      const windStyles = {color: this.accentColor};
      const windIcon = this.getWindIcon(
        WindIndicatorType.shaft,
        this.direction,
        this.clampedLevel
      );

      const windMarker = svg`
        <g
          style=${styleMap(windStyles)}
          transform="translate(${SHAFT_RELATIVE_EXPORT_OFFSET_X} ${SHAFT_RELATIVE_EXPORT_OFFSET_Y})"
          data-name="wind"
        >
          <g
            transform="rotate(${this.getWindRotation(SHAFT_RELATIVE_WIND_ROTATION_OFFSET_DEG)} ${SHAFT_RELATIVE_FIGMA_CX} ${SHAFT_RELATIVE_FIGMA_CY})"
          >
            ${
              windIcon
                ? svg`<g transform="translate(${SHAFT_RELATIVE_WIND_ICON_TX} ${SHAFT_RELATIVE_WIND_ICON_TY}) scale(${SHAFT_RELATIVE_WIND_ICON_AXIS_SCALE}) rotate(${SHAFT_RELATIVE_WIND_ICON_ROTATE_DEG} 12 12) rotate(180 12 12)">${windIcon}</g>`
                : svg`<path d="${SHAFT_RELATIVE_WIND_7_D}" fill="currentColor" />`
            }
          </g>
        </g>
      `;

      return svg`
        <g>
          ${windMarker}
          <g
            transform="translate(${SHAFT_RELATIVE_EXPORT_OFFSET_X} ${SHAFT_RELATIVE_EXPORT_OFFSET_Y})"
          >
            <g
              transform="rotate(${this.heading} ${SHAFT_RELATIVE_FIGMA_CX} ${SHAFT_RELATIVE_FIGMA_CY})"
            >
            <rect
              x="${SHAFT_RELATIVE_HDG_BG_X}"
              y="${SHAFT_RELATIVE_HDG_BG_Y}"
              width="${SHAFT_RELATIVE_HDG_BG_SIZE}"
              height="${SHAFT_RELATIVE_HDG_BG_SIZE}"
              rx="${SHAFT_RELATIVE_HDG_BG_SIZE / 2}"
              fill="var(--instrument-frame-primary-color)"
              stroke="var(--instrument-frame-primary-color)"
            />
            <path
              d="${SHAFT_RELATIVE_HDG_TRIANGLE_D}"
              fill="var(--element-symbol-color)"
            />
            </g>
          </g>
        </g>
      `;
    }

    if (
      this.type === WindIndicatorType.shaft &&
      this.direction === WindIndicatorDirection.true
    ) {
      const styles = {color: this.accentColor};
      return svg`
        <g
          style=${styleMap(styles)}
          transform="rotate(${this.getWindRotation(SHAFT_TRUE_ARROW_OFFSET_DEG)} ${CX} ${CY})"
          data-name="hdg"
        >
          ${
            this.clampedLevel === 7
              ? SHAFT_TRUE_WIND_BARB_TPL
              : svg`<path d=${SHAFT_TRUE_WIND_BARB_D_BY_LEVEL[this.clampedLevel]} fill="currentColor" />`
          }
          ${SHAFT_TRUE_CIRCLE_TPL}
        </g>
      `;
    }

    const icon = this.getWindIcon(this.type, this.direction, this.clampedLevel);
    if (!icon) {
      return null;
    }
    const styles = {color: this.accentColor};

    return svg`
      <g
        style=${styleMap(styles)}
        transform="translate(${CX} ${CY}) rotate(${this.getWindRotation()}) translate(-12 -12)"
        data-name="hdg"
      >
        ${icon}
      </g>
    `;
  }

  private renderLabel() {
    if (this.type !== WindIndicatorType.labeled) {
      return null;
    }

    return svg`
      <text
        x="${CX}"
        y="${CY + 1}"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="var(--element-active-color)"
        font-size="var(--global-typography-ui-label-active-font-size)"
        font-weight="var(--global-typography-ui-label-active-font-weight)"
        line-height="var(--global-typography-ui-label-active-line-height)"
      >
        ${this.clampedLevel}
      </text>
    `;
  }

  override render() {
    return html`
      <svg
        viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${this.renderFrame()} ${this.renderNorthArrow()}
        ${this.renderHdgGroup()} ${this.renderLabeledTickMarks()}
        ${this.renderLabeledArrow()} ${this.renderLabel()}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-wind-indicator': ObcWindIndicator;
  }
}
