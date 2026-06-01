import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './speed-indicator.css?inline';
import '../speed-arrows/speed-arrows.js';
import {ActiveColor, Direction} from '../speed-arrows/speed-arrows.js';

export enum SpeedIndicatorType {
  Needle = 'Needle',
  LongLat = 'LongLat',
}

export const DEFAULT_LONG_LAT_LEVELS = [2, 1, 0, 0, 2, 0] as const;

const LONG_LAT_SLOT_CENTERS_PX = [
  {x: 24, y: 9},
  {x: 34, y: 19},
  {x: 34, y: 29},
  {x: 24, y: 39},
  {x: 14, y: 29},
  {x: 14, y: 19},
] as const;

const LONG_LAT_DIRECTIONS: Direction[] = [
  Direction.forward,
  Direction.right,
  Direction.right,
  Direction.backward,
  Direction.left,
  Direction.left,
];

const SHIP_PATH_D = 'M0.5 15.5V5Q0.5 2.95 3 0.5Q5.5 2.95 5.5 5V15.5H0.5Z';

/**
 * `<obc-speed-indicator>` – A compact speed indicator with two display variants.
 *
 * ## Features
 *
 * - **Needle**: Shows a dial with a filled sector and a rotating needle driven by `speed` and `maxSpeed`.
 * - **LongLat**: Shows an own-ship marker with directional chevrons. `longLatLevels` is a 6-item list
 *   of per-slot levels (0–3), where `0` hides the chevrons for that slot.
 *
 * This component is display-only; callers are expected to derive the LongLat slot values from upstream data.
 */
@customElement('obc-speed-indicator')
export class ObcSpeedIndicator extends LitElement {
  @property({type: String})
  type: SpeedIndicatorType = SpeedIndicatorType.Needle;

  @property({type: Number}) speed: number = 0;

  @property({type: Number}) maxSpeed: number = 100;

  @property({type: Array, attribute: false})
  longLatLevels?: number[];

  static override styles = unsafeCSS(componentStyle);

  private getLongLatSlots(): number[] {
    const src = this.longLatLevels ?? DEFAULT_LONG_LAT_LEVELS;
    return Array.from({length: LONG_LAT_DIRECTIONS.length}, (_, i) => {
      const v = src[i];
      if (typeof v !== 'number' || !Number.isFinite(v)) {
        return 0;
      }
      return Math.max(0, Math.min(3, Math.floor(v)));
    });
  }

  override render() {
    if (this.type === SpeedIndicatorType.LongLat) {
      return this.renderLongLat();
    }
    return this.renderNeedle();
  }

  private renderNeedle() {
    const maxSpeed =
      typeof this.maxSpeed === 'number' && Number.isFinite(this.maxSpeed)
        ? this.maxSpeed
        : 0;
    const rawSpeed =
      typeof this.speed === 'number' && Number.isFinite(this.speed)
        ? this.speed
        : 0;

    const progress =
      maxSpeed > 0 ? Math.max(0, Math.min(1, rawSpeed / maxSpeed)) : 0;
    const speedAngle = progress * 225 - 90;

    const r = 20;
    const x = 34 + r * Math.sin((speedAngle * Math.PI) / 180);
    const y = 34 - r * Math.cos((speedAngle * Math.PI) / 180);

    const largeArc = speedAngle > 90 ? 1 : 0;
    const sweep = progress > 0 ? 1 : 0;

    const speedPath = `M34 34 L 14 34 A ${r} ${r} 0 ${largeArc} ${sweep} ${x} ${y} Z`;

    return html`
      <svg
        width="48"
        height="48"
        viewBox="10 10 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="${speedPath}"
          fill="var(--instrument-enhanced-tertiary-color)"
          stroke="var(--instrument-enhanced-tertiary-color)"
        />
        <path
          d="M14 34L34 34.0001"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-linecap="square"
        />
        <path
          d="M19.8579 48.1421C17.0608 45.3451 15.156 41.7814 14.3843 37.9018C13.6126 34.0222 14.0087 30.0009 15.5224 26.3463C17.0362 22.6918 19.5996 19.5682 22.8886 17.3706C26.1776 15.173 30.0444 14 34 14C37.9556 14 41.8224 15.173 45.1114 17.3706C48.4004 19.5682 50.9638 22.6918 52.4776 26.3463C53.9913 30.0009 54.3874 34.0222 53.6157 37.9018C52.844 41.7814 50.9392 45.3451 48.1421 48.1421"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-linecap="round"
        />
        <path
          transform="rotate(${speedAngle + 45})"
          transform-origin="34 34"
          d="M31.8821 36.1213C33.0537 37.2928 34.9532 37.2928 36.1248 36.1213C37.2963 34.9497 37.2963 33.0502 36.1248 31.8786C34.9532 30.707 19.9836 19.8474 19.9836 19.8474C19.9384 19.8181 19.8892 19.83 19.8586 19.8606C19.828 19.8912 19.8161 19.9404 19.8454 19.9856C19.9039 20.0761 30.7106 34.9497 31.8821 36.1213Z"
          fill="var(--instrument-enhanced-secondary-color)"
          stroke="var(--instrument-enhanced-secondary-color)"
          stroke-linecap="square"
        />
      </svg>
    `;
  }

  private renderLongLat() {
    const levels = this.getLongLatSlots();

    return html`
      <div class="longlat">
        <div class="longlat-ship" aria-hidden="true">
          <svg
            width="6"
            height="16"
            viewBox="0 0 6 16"
            overflow="visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="${SHIP_PATH_D}"
              fill="var(--instrument-frame-primary-color)"
              stroke="var(--element-inactive-color)"
              stroke-width="var(--instrument-components-output-pointer-stroke-width)"
              vector-effect="non-scaling-stroke"
            />
          </svg>
        </div>
        ${levels.map((n, i) => {
          const {x, y} = LONG_LAT_SLOT_CENTERS_PX[i];
          return html`
            <div class="longlat-slot" style="left: ${x}px; top: ${y}px;">
              <obc-speed-arrows
                .direction=${LONG_LAT_DIRECTIONS[i]}
                .nActiveArrows=${n}
                .activeColor=${ActiveColor.Enhanced}
                .readout=${false}
              ></obc-speed-arrows>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-speed-indicator': ObcSpeedIndicator;
  }
}
