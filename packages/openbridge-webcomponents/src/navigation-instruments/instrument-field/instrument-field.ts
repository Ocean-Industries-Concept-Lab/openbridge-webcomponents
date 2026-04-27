import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './instrument-field.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../components/button/button.js';
import '../../icons/icon-drop-down-google.js';
import '../../components/navigation-item/navigation-item.js';
import {customElement} from '../../decorator.js';
import {computeAtSetpoint} from '../../svghelpers/setpoint.js';

/**
 * Enum for instrument field sizes.
 * - `regular`: Standard size for navigation instrument data fields.
 * - `enhanced`: Larger size with increased visual prominence.
 */
export enum InstrumentFieldSize {
  regular = 'regular',
  enhanced = 'enhanced',
}

/**
 * `<obc-instrument-field>` – A component for displaying navigation instrument data.
 *
 * This component is used to show a primary value, an optional setpoint, units, and a source (e.g., GPS, Gyro).
 * It supports different sizes, horizontal/vertical layouts, and configurable numeric formatting.
 *
 * ### Features
 * - **Sizes:** Supports `regular` and `enhanced` sizes.
 * - **Setpoint:** Optional setpoint display with an arrow indicator.
 * - **Source Picker:** Optional source selection with a dropdown and context menu.
 * - **Formatting:** Customizable integer and fraction digits, with optional zero padding.
 * - **Status Indicators:** Supports an "OFF" state and neutral color mode.
 * - **Layouts:** Can be oriented horizontally or vertically, with various alignment options.
 *
 * ### Slots
 * | Slot Name           | Purpose                                                                 |
 * |---------------------|-------------------------------------------------------------------------|
 * | off-value           | Content to display when the `off` property is true (defaults to "OFF"). |
 *
 * @slot off-value - Content to display when the `off` property is true (defaults to "OFF").
 *
 * @csspart label - The container for the tag and unit.
 * @csspart tag - The tag text element.
 */
@customElement('obc-instrument-field')
export class ObcInstrumentField extends LitElement {
  /** The size of the instrument field. */
  @property({type: String}) size: InstrumentFieldSize =
    InstrumentFieldSize.regular;

  /** The setpoint value to display. */
  @property({type: Number}) setpoint: number | undefined;

  /** Whether to show the setpoint. */
  @property({type: Boolean}) hasSetpoint = false;

  /** Whether to show the source (src) field. */
  @property({type: Boolean}) hasSrc = false;

  /** The primary value to display. */
  @property({type: Number}) value: number | undefined;

  /** The maximum number of integer digits to show (for zero padding). */
  @property({type: Number}) maxDigits = 1;

  /** Whether to show leading zeros up to `maxDigits`. */
  @property({type: Boolean}) showZeroPadding = false;

  /** The number of decimal places to display. */
  @property({type: Number}) fractionDigits = 0;

  /** The tag or label for the data (e.g., "HDG", "SPD"). */
  @property({type: String}) tag = '';

  /** The unit of measurement (e.g., "DEG", "KN"). */
  @property({type: String}) unit = '';

  /** The current source name (e.g., "GPS 1"). */
  @property({type: String}) src = '';

  /** If true, uses a neutral color scheme instead of the default instrument color. */
  @property({type: Boolean}) neutralColor = false;

  /** If true, uses a horizontal layout. */
  @property({type: Boolean}) horizontal = false;

  /** If true, centers the content. */
  @property({type: Boolean}) center = false;

  /** If true, only the label (tag and unit) is displayed. */
  @property({type: Boolean}) labelOnly = false;

  /** If true, displays the "off" state (e.g., showing "OFF" instead of value). */
  @property({type: Boolean}) off = false;

  /** If true, automatically hides the setpoint when the value is close to it. */
  @property({type: Boolean}) autoHideSetpoint = false;

  /** The deadband within which the setpoint is hidden if `autoHideSetpoint` is true. */
  @property({type: Number}) autoHideDeadband = 0;

  /**
   * Generates a dashed string representation for undefined values.
   * @returns A string of dashes formatted according to the current numeric settings.
   */
  dashedGenerator(): string {
    const n = this.showZeroPadding ? Math.max(this.maxDigits, 1) : 1;
    if (this.fractionDigits < 1) {
      return '-'.repeat(n);
    } else {
      const diff = n - this.fractionDigits;
      return (
        '-'.repeat(Math.max(diff, 1)) + '.' + '-'.repeat(this.fractionDigits)
      );
    }
  }

  override render() {
    const hideSetpoint =
      this.hasSetpoint &&
      this.autoHideSetpoint &&
      computeAtSetpoint({
        value: this.value,
        setpoint: this.setpoint,
        touching: false,
        auto: true,
        deadband: this.autoHideDeadband,
        atSetpointManual: false,
      });

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [this.size]: true,
          'neutral-color': this.neutralColor,
          off: this.off,
          horizontal: this.horizontal,
          center: this.center,
          'left-aligned':
            this.labelOnly || (this.horizontal && !this.hasSetpoint),
          'hide-setpoint': hideSetpoint,
          'show-zero-padding': this.showZeroPadding,
        })}
      >
        ${this.horizontal && this.size === InstrumentFieldSize.regular
          ? html`<div class="label">
              <div class="tag" part="tag">${this.tag}</div>
            </div>`
          : nothing}
        ${this.hasSetpoint
          ? html`<div class="setpoint">
              <svg
                class="setpoint-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="var(--instrument-enhanced-secondary-color)"
                  d="M4.66797 4.80263C4.66797 4.14363 5.45194 3.76746 6.0013 4.16286L10.4456 7.17243C11.0312 7.56899 11.0314 8.43154 10.4459 8.82828L6.0013 11.8401C5.45194 12.2355 4.66797 11.8593 4.66797 11.2003L4.66797 4.80263Z"
                  fill="var(--instrument-enhanced-primary-color)"
                />
              </svg>
              <div class="setpoint-value">${this.setpointValueBlueNumbers}</div>
            </div>`
          : nothing}
        ${this.horizontal && !this.labelOnly && this.hasSetpoint
          ? html`<div class="divider"></div>`
          : nothing}
        ${!this.labelOnly
          ? html` <div class="value">
              ${this.off
                ? html`<div class="value-blue">
                    <slot name="off-value">OFF</slot>
                  </div>`
                : html` <div class="value-hint-zero">${this.hintZeros}</div>
                    <div class="value-blue">${this.valueBlueNumbers}</div>`}
            </div>`
          : nothing}
        <div class="label" part="label">
          ${this.horizontal && this.size === InstrumentFieldSize.regular
            ? nothing
            : html`<div class="tag" part="tag">${this.tag}</div>`}
          <div class="unit">${this.unit}</div>
        </div>
        ${this.hasSrc && this.horizontal
          ? html`<div class="divider src-divider"></div>`
          : nothing}
        ${this.hasSrc ? html`<div class="src">${this.src}</div>` : nothing}
      </div>
    `;
  }

  /**
   * Returns the formatted setpoint value as a string.
   * If the setpoint is undefined, it returns a dashed string.
   */
  get setpointValueBlueNumbers(): string {
    if (this.setpoint === undefined) {
      return this.dashedGenerator();
    }

    return this.setpoint.toFixed(this.fractionDigits);
  }

  /**
   * Returns the formatted primary value as a string.
   * If the value is undefined, it returns a dashed string.
   */
  get valueBlueNumbers(): string {
    if (this.value === undefined) {
      return this.dashedGenerator();
    }

    return this.value.toFixed(this.fractionDigits);
  }

  /**
   * Generates a string of hint zeros for alignment when `showZeroPadding` is false.
   * These zeros are typically displayed with lower opacity.
   */
  get hintZeros(): string {
    if (this.value === undefined || this.value < 0) {
      return '';
    }
    const nBlues = this.valueBlueNumbers.length;
    const nHints = this.maxDigits - nBlues;
    if (nHints > 0) {
      return '0'.repeat(nHints);
    }
    return '';
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-instrument-field': ObcInstrumentField;
  }
}
