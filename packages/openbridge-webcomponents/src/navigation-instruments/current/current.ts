import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './current.css?inline';
import {
  VesselImage,
  VesselImageSize,
  WatchCircleType,
  innerRingRadiusFor,
} from '../watch/watch.js';
import {renderCurrentForcePattern} from '../watch/force-pattern.js';
import {Priority} from '../types.js';
import {customElement} from '../../decorator.js';

export enum CurrentType {
  vessel = 'vessel',
  direction = 'direction',
}

const CURRENT_PATTERN_SCALE_VESSEL = 1.39;
const CURRENT_PATTERN_SCALE_DIRECTION = 2.0;
/** Chevron-tip anchor radius for the peripheral icon (vessel type), from Figma. */
const CURRENT_ICON_PERIPHERY_RADIUS = 116;
/** Scale of the centered 24-unit chevron glyph (direction type), from Figma (168/24). */
const CURRENT_DIRECTION_ICON_SCALE = 7;

/**
 * Round a current speed to the nearest chevron bucket (`current-0` …
 * `current-4` icons) and clamp it into that range. Non-finite input maps to
 * `null` (no icon).
 */
export function clampCurrentSpeed(value: number | null): number | null {
  if (value == null || !Number.isFinite(value)) {
    return null;
  }
  return Math.min(4, Math.max(0, Math.round(value)));
}

/**
 * `<obc-current>` – Water-current instrument with direction chevrons and a
 * force-graphics band pattern.
 *
 * Renders the current's from-direction and strength on a circular watch
 * face. Two layouts are available via `type`: `vessel` (default) shows a
 * vessel silhouette on a double-ring track face with a chevron icon at the
 * periphery pointing with the flow; `direction` shows a single-ring face
 * with a large centered chevron icon. In both, a soft band pattern fills the
 * face, rotated perpendicular to the flow.
 *
 * ## Features
 *
 * - **Types**: `vessel` (track face + vessel + peripheral icon) or
 *   `direction` (single ring + large centered icon) via `type`.
 * - **Strength buckets**: `currentSpeed` selects the chevron icon
 *   (`0`–`4` = number of chevrons); values are rounded and clamped.
 * - **Color priority**: `priority=enhanced` switches the pattern and icon to
 *   the enhanced (blue) palette.
 * - **Vessel image**: configurable silhouette rotating with
 *   `vesselHeadingDeg` (vessel type).
 *
 * ## Usage Guidelines
 *
 * Set `currentSpeed` and `currentFromDirection` to the sensor values. Use
 * `obc-wind` for the analogous wind instrument; use `obc-compass` when the
 * current indicator should overlay a full compass.
 *
 * ## Example
 *
 * ```html
 * <obc-current
 *   currentSpeed="3"
 *   currentFromDirection="330"
 *   vesselHeadingDeg="15"
 * ></obc-current>
 * ```
 *
 * @experimental
 */
@customElement('obc-current')
export class ObcCurrent extends LitElement {
  /** Layout type: `vessel` (track face with vessel) or `direction` (large centered icon). */
  @property({type: String}) type: CurrentType = CurrentType.vessel;
  /**
   * The current strength as a chevron bucket (0–4 = number of chevrons);
   * rounded and clamped. `null` hides the icon.
   * @availableWhen currentFromDirection!=null
   */
  @property({type: Number}) currentSpeed: number | null = null;
  /** The direction the current is coming from in degrees. */
  @property({type: Number}) currentFromDirection: number | null = null;
  /** Color priority: `Priority.enhanced` uses the blue/enhanced palette (default: `Priority.regular`). */
  @property({type: String}) priority: Priority = Priority.regular;
  /**
   * The image of the vessel.
   * @availableWhen type==vessel
   */
  @property({type: String}) vesselImage: VesselImage = VesselImage.genericTop;
  /**
   * Vessel heading in degrees.
   * @availableWhen type==vessel
   */
  @property({type: Number}) vesselHeadingDeg: number = 0;

  private get isVesselType(): boolean {
    return this.type !== CurrentType.direction;
  }

  private get enhanced(): boolean {
    return this.priority === Priority.enhanced;
  }

  override render() {
    const isVessel = this.isVesselType;
    const watchCircleType = isVessel
      ? WatchCircleType.double
      : WatchCircleType.single;
    const vessels = isVessel
      ? [
          {
            size: VesselImageSize.medium,
            transform: `rotate(${this.vesselHeadingDeg}deg)`,
            vesselImage: this.vesselImage,
          },
        ]
      : [];
    return html`
      <div class="wrapper">
        ${this.renderForcePattern(watchCircleType)}
        <obc-watch
          .watchCircleType=${watchCircleType}
          .priority=${this.priority}
          .vessels=${vessels}
          .current=${clampCurrentSpeed(this.currentSpeed)}
          .currentFromDirectionDeg=${this.currentFromDirection}
          .currentSymbolRadius=${CURRENT_ICON_PERIPHERY_RADIUS}
          .currentIconCentered=${!isVessel}
          .scaleCurrentIcon=${isVessel ? 1 : CURRENT_DIRECTION_ICON_SCALE}
          .currentColor=${this.enhanced
            ? 'var(--instrument-enhanced-secondary-color)'
            : undefined}
          .showLabels=${true}
          .insideLabelsFlush=${true}
          crosshairEnabled
          northArrow
          tickmarksInside
        ></obc-watch>
      </div>
    `;
  }

  private renderForcePattern(watchCircleType: WatchCircleType) {
    if (this.currentFromDirection == null) {
      return nothing;
    }
    return html`
      <svg width="100%" height="100%" viewBox="-200 -200 400 400">
        ${renderCurrentForcePattern({
          fromDirectionDeg: this.currentFromDirection,
          radius: innerRingRadiusFor(watchCircleType),
          patternScale: this.isVesselType
            ? CURRENT_PATTERN_SCALE_VESSEL
            : CURRENT_PATTERN_SCALE_DIRECTION,
          color: this.enhanced
            ? 'var(--instrument-enhanced-tertiary-color)'
            : undefined,
        })}
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-current': ObcCurrent;
  }
}
