import {LitElement, html, unsafeCSS} from 'lit';
import componentStyle from './rot-linear.css?inline';
import instrumentReadoutStyle from '../readout/instrument-readout.css?inline';
import {property} from 'lit/decorators.js';
import '../watch-flat/watch-flat.js';
import {Tickmark, TickmarkType} from '../watch-flat/tickmark-flat.js';
import {Label, LabelPosition} from '../compass-flat/compass-flat.js';
import {
  centerReadoutStyles,
  renderCenterReadouts,
} from '../readout/center-readout.js';
import {ReadoutSize} from '../readout/readout.js';
import {customElement} from '../../decorator.js';
import {Priority} from '../types.js';

/** Width of the strip content in SVG user-space units (watch-flat default). */
const STRIP_WIDTH = 352;

/**
 * `<obc-rot-linear>` — Horizontal rate-of-turn strip with a bar growing from
 * the center of the track band.
 *
 * The linear counterpart of the `<obc-rate-of-turn>` track bar and the
 * rate-of-turn sibling of `<obc-compass-flat>`: a static (non-scrolling)
 * strip with a numeric scale on top and a track band in which a filled bar
 * grows from the center (zero) to the measured rate of turn, ending in a
 * needle marker.
 *
 * ## Features
 *
 * - **Track bar**: A bar from the band center to the measured value with a
 *   needle marker at its end; the value is clamped to ±`rotMaxValue`.
 * - **Numeric scale**: Labels at zero, ±half range and ±full range, with
 *   tickmarks every `tickInterval` units.
 * - **Readout** (`hasReadout`): A centered readout below the strip (label
 *   `ROT`, unit `DEG/min` by default); shows a dash while
 *   `rateOfTurnDegreesPerMinute` is unset.
 * - **Coloring**: `rotPortStarboard` colors the bar and needle by turn
 *   direction; otherwise `priority` selects the regular or enhanced palette.
 *
 * ## Usage Guidelines
 *
 * - Set `rateOfTurnDegreesPerMinute` to the measured value in degrees per
 *   minute (positive = starboard).
 * - Use `<obc-rate-of-turn>` for the circular presentation of the same
 *   indication.
 *
 * @ignition-base-height: 170px
 * @ignition-base-width: 512px
 * @stable
 */
@customElement('obc-rot-linear')
export class ObcRotLinear extends LitElement {
  /**
   * Measured rate of turn in degrees per minute (positive = starboard).
   * When unset, no bar is shown and the readout shows a dash.
   */
  @property({type: Number}) rateOfTurnDegreesPerMinute: number | undefined;
  /** Scale range in **degrees per minute** per direction. Default `90`. */
  @property({type: Number}) rotMaxValue: number = 90;
  /** Interval for tickmarks in scale units. Default `5`. */
  @property({type: Number}) tickInterval = 5;
  /** Colors the bar and needle by turn direction (starboard/port palette). */
  @property({type: Boolean}) rotPortStarboard: boolean = false;
  @property({type: String}) priority: Priority = Priority.regular;
  /**
   * When `true`, shows a centered `<obc-readout>` below the strip with the
   * measured rate of turn.
   */
  @property({type: Boolean}) hasReadout: boolean = false;
  /**
   * Readout label. Default `ROT`.
   * @availableWhen hasReadout==true
   */
  @property({type: String}) label = 'ROT';
  /**
   * Readout unit. Default `DEG/min`.
   * @availableWhen hasReadout==true
   */
  @property({type: String}) unit = 'DEG/min';
  /**
   * Number of fraction digits shown in the readout. Default `0`.
   * @availableWhen hasReadout==true
   */
  @property({type: Number}) fractionDigits = 0;

  private get pxPerUnit(): number {
    const max = this.rotMaxValue || 1;
    return STRIP_WIDTH / 2 / max;
  }

  private get barEndX(): number {
    const max = this.rotMaxValue || 1;
    const rot = this.rateOfTurnDegreesPerMinute ?? 0;
    const ratio = Math.max(-1, Math.min(1, rot / max));
    return ratio * (STRIP_WIDTH / 2);
  }

  private get barColor(): string {
    if (this.rotPortStarboard) {
      const rot = this.rateOfTurnDegreesPerMinute ?? 0;
      if (rot > 0) {
        return 'var(--instrument-starboard-secondary-color)';
      }
      if (rot < 0) {
        return 'var(--instrument-port-secondary-color)';
      }
    }
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
  }

  private get needleColor(): string {
    if (this.rotPortStarboard) {
      const rot = this.rateOfTurnDegreesPerMinute ?? 0;
      if (rot > 0) {
        return 'var(--instrument-starboard-primary-color)';
      }
      if (rot < 0) {
        return 'var(--instrument-port-primary-color)';
      }
      return 'var(--instrument-regular-secondary-color)';
    }
    return this.priority === Priority.enhanced
      ? 'var(--instrument-enhanced-secondary-color)'
      : 'var(--instrument-regular-secondary-color)';
  }

  private get scaleLabels(): Label[] {
    const max = this.rotMaxValue;
    const values = [-max, -max / 2, 0, max / 2, max];
    return values.map((value) => ({
      x: value * this.pxPerUnit,
      y: LabelPosition.top,
      text: `${Math.round(value)}`,
    }));
  }

  private get scaleTickmarks(): Tickmark[] {
    const tickmarks: Tickmark[] = [];
    const labelXs = new Set(this.scaleLabels.map((l) => Math.round(l.x)));

    for (const label of this.scaleLabels) {
      tickmarks.push({angle: label.x, type: TickmarkType.main});
    }

    if (
      !this.tickInterval ||
      this.tickInterval <= 0 ||
      !Number.isFinite(this.tickInterval)
    ) {
      return tickmarks;
    }

    for (
      let value = -this.rotMaxValue;
      value <= this.rotMaxValue;
      value += this.tickInterval
    ) {
      const x = value * this.pxPerUnit;
      if (labelXs.has(Math.round(x))) {
        continue;
      }
      tickmarks.push({angle: x, type: TickmarkType.secondary});
    }

    return tickmarks;
  }

  override render() {
    const hasValue = this.rateOfTurnDegreesPerMinute !== undefined;
    const strip = html`
      <div class="container">
        <obc-watch-flat
          .labels=${this.scaleLabels}
          .tickmarks=${this.scaleTickmarks}
          .barAreas=${hasValue
            ? [{startX: 0, endX: this.barEndX, fillColor: this.barColor}]
            : []}
          .needles=${hasValue
            ? [
                {
                  x: this.barEndX,
                  fillColor: this.needleColor,
                  strokeColor: 'var(--border-silhouette-color)',
                },
              ]
            : []}
        ></obc-watch-flat>
      </div>
    `;

    if (!this.hasReadout) {
      return strip;
    }
    return html`
      <div class="with-readout">
        ${strip}
        <div class="flat-readout">
          ${renderCenterReadouts([
            {
              value: this.rateOfTurnDegreesPerMinute ?? null,
              label: this.label,
              unit: this.unit,
              fractionDigits: this.fractionDigits,
              size: ReadoutSize.large,
              priority: this.priority,
              centerValue: true,
              centerMeta: true,
            },
          ])}
        </div>
      </div>
    `;
  }

  static override styles = [
    unsafeCSS(instrumentReadoutStyle),
    centerReadoutStyles,
    unsafeCSS(componentStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rot-linear': ObcRotLinear;
  }
}
