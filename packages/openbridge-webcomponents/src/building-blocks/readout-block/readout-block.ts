import {LitElement, html, nothing, unsafeCSS, type TemplateResult} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-block.css?inline';
import {customElement} from '../../decorator.js';
import '../../components/textbox/textbox.js';
import {
  ObcTextboxSize,
  ObcTextboxFontWeight,
  ObcTextboxAlignment,
} from '../../components/textbox/textbox.js';
import '../../icons/icon-input-right.js';
import '../../icons/icon-notification-advice.js';
import {
  formatNumericValue,
  readoutFormattedInteger,
  type ReadoutNumericFormatOptions,
} from '../../navigation-instruments/readout/readout-formatters.js';
import {
  type AlertFrameConfig,
  wrapWithAlertFrame,
} from '../../components/alert-frame/alert-frame.js';

// Re-exported so consumers can configure typography without a second import path.
export {
  ObcTextboxSize,
  ObcTextboxFontWeight,
  ObcTextboxAlignment,
} from '../../components/textbox/textbox.js';

/**
 * Semantic variant of the block. Drives the default marker icon and the
 * colour token; the layout is identical across variants.
 * - `value`: the primary reading (no default marker icon).
 * - `setpoint`: a setpoint reference (default `input-right` marker).
 * - `advice`: an advisory reference (default `notification-advice` marker).
 */
export enum ReadoutBlockVariant {
  value = 'value',
  setpoint = 'setpoint',
  advice = 'advice',
}

/**
 * Density tier of the block — drives icon size, the icon↔number gap, and the
 * degree-column width tier. The number typography size is controlled
 * independently via {@link ObcReadoutBlock.valueSize} so a parent can de-emphasise
 * one block relative to another within the same tier.
 */
export enum ReadoutBlockSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

/**
 * Per-block measurement quality, rendered as a non-shifting outline chip.
 * - `low-integrity`: the value is suspect.
 * - `invalid`: the value is invalid.
 */
export enum ReadoutBlockDataQuality {
  lowIntegrity = 'low-integrity',
  invalid = 'invalid',
}

/**
 * Pop-up fade phase for a setpoint block. Driven by the parent's setpoint
 * interaction state machine; only meaningful for `role="setpoint"`.
 */
export enum ReadoutBlockHidePhase {
  none = 'none',
  hiding = 'hiding',
  hidden = 'hidden',
}

/**
 * `<obc-readout-block>` – the most atomic readout primitive: a single
 * cap-height-aligned, width-reservable numeric segment (value / setpoint /
 * advice).
 *
 * It renders one `obc-textbox` number with optional hinted leading zeros, a
 * reservable width, an optional leading marker icon (via the `icon` slot or the
 * role default), an optional trailing degree glyph, an `off`/unavailable text
 * state, per-block data-quality and an optional per-block alert frame.
 *
 * This is a building block used inside `obc-readout-list-item` (and, in a future
 * refactor, inside `obc-readout`); it is not normally used on its own. Colour is
 * inherited from the host context (the parent sets the role colour), so the
 * block stays neutral until placed.
 *
 * @experimental Pilot for the new primitives + per-block options Readout API; the
 * API may change in a future release.
 *
 * @slot icon - Replaces the role's default marker icon.
 *
 * @csspart block - The block container (carries role / tone / data-quality).
 * @csspart block-content - The number + degree group.
 * @csspart block-text - The `obc-textbox` rendering the number.
 * @csspart block-icon - The leading marker-icon container.
 * @csspart degree - The trailing degree-glyph column.
 */
@customElement('obc-readout-block')
export class ObcReadoutBlock extends LitElement {
  /** Semantic variant (value / setpoint / advice). */
  @property({type: String}) variant: ReadoutBlockVariant =
    ReadoutBlockVariant.value;

  /** The numeric value; `null`/`undefined` renders a dash. */
  @property({type: Number}) value: number | null = null;

  /** Density tier — icon size, gap, degree tier. */
  @property({type: String}) size: ReadoutBlockSize = ReadoutBlockSize.small;

  /**
   * Resolved number-typography size. When unset it is derived from `size`
   * (small→s, medium→m, large→l), so a parent that de-emphasises a block (e.g.
   * a secondary setpoint) can pass a smaller size without changing the tier.
   */
  @property({type: String}) valueSize?: ObcTextboxSize;

  /** Accent (in-command) colour tone. */
  @property({type: Boolean}) enhanced = false;

  /** Number font weight (regular / semibold / bold); colour is independent. */
  @property({type: String}) weight: ObcTextboxFontWeight =
    ObcTextboxFontWeight.regular;

  /** Render the trailing cap-height degree glyph (`°`). */
  @property({type: Boolean}) hasDegree = false;

  /** Show the leading marker-icon container (always on for setpoint/advice). */
  @property({type: Boolean}) hasIcon = false;

  /** Number of fraction digits. */
  @property({type: Number}) fractionDigits = 0;

  /** Integer digits to reserve / hint (independent of `fractionDigits`). */
  @property({type: Number}) maxDigits = 0;

  /** Render muted leading zeros filling the integer part to `maxDigits`. */
  @property({type: Boolean}) hintedZeros = false;

  /** Explicit longest string to reserve width for (e.g. `"0000.0"`). */
  @property({type: String}) spaceReserver?: string;

  /** Render `offText` instead of a number (e.g. equipment powered down). */
  @property({type: Boolean}) off = false;

  /** Text shown when `off` is true. */
  @property({type: String}) offText = 'OFF';

  /** Text alignment of the number within its reserved width. */
  @property({type: String}) alignment: ObcTextboxAlignment =
    ObcTextboxAlignment.Right;

  /** Per-block measurement quality (outline chip). */
  @property({type: String}) dataQuality?: ReadoutBlockDataQuality;

  // `boolean | …` (not `false | …`): the generated Angular wrapper widens a
  // literal-`false` union to `boolean`. `wrapWithAlertFrame` treats any
  // non-object as "no frame", so accepting `boolean` is harmless.
  /** Per-block alert frame; nests inside any parent alert frame. */
  @property({type: Object}) alert: boolean | AlertFrameConfig = false;

  /** Setpoint focus (touch) state — only meaningful for `role="setpoint"`. */
  @property({type: Boolean}) touching = false;

  /** Setpoint pop-up fade phase — only meaningful for `role="setpoint"`. */
  @property({type: String}) hidePhase: ReadoutBlockHidePhase =
    ReadoutBlockHidePhase.none;

  @state() private hasAssignedIcon = false;

  private get resolvedValueSize(): ObcTextboxSize {
    if (this.valueSize) {
      return this.valueSize;
    }
    switch (this.size) {
      case ReadoutBlockSize.large:
        return ObcTextboxSize.l;
      case ReadoutBlockSize.medium:
        return ObcTextboxSize.m;
      default:
        return ObcTextboxSize.s;
    }
  }

  private get numericFormatOptions(): ReadoutNumericFormatOptions {
    return {
      showZeroPadding: false,
      minValueLength: this.maxDigits,
      fractionDigits: this.fractionDigits,
    };
  }

  /** Widest possible value string for width reservation (e.g. `"000.0"`). */
  private get reserverText(): string {
    const maxDigits = this.maxDigits;
    if (maxDigits <= 0) {
      return '';
    }
    const integer = '0'.repeat(Math.max(maxDigits, 1));
    return this.fractionDigits > 0
      ? `${integer}.${'0'.repeat(this.fractionDigits)}`
      : integer;
  }

  /**
   * Effective width reserver: the wider of the explicit `spaceReserver` and the
   * `maxDigits`/`fractionDigits`-derived reserve, so an explicit reserver can
   * never reserve *less* than the formatted value needs. Under tabular-nums the
   * rendered width is proportional to character count, so "wider" compares length.
   */
  private widerReserver(explicit: string | undefined, derived: string): string {
    if (!explicit) {
      return derived;
    }
    if (!derived) {
      return explicit;
    }
    return explicit.length >= derived.length ? explicit : derived;
  }

  private dataQualityClasses(): Record<string, boolean> {
    return {
      'data-low-integrity':
        this.dataQuality === ReadoutBlockDataQuality.lowIntegrity,
      'data-invalid': this.dataQuality === ReadoutBlockDataQuality.invalid,
    };
  }

  private onIconSlotChange = (event: Event): void => {
    // `slotchange` fires after the first render once content is (re)assigned,
    // so it covers the initial state without a firstUpdated re-render.
    this.hasAssignedIcon =
      (event.target as HTMLSlotElement).assignedElements({flatten: true})
        .length > 0;
  };

  private renderIcon(): TemplateResult | typeof nothing {
    // Value blocks only show an icon when asked; setpoint/advice always reserve
    // their marker. The role default is rendered as a direct child (so it sizes
    // via `.block-icon obi-*`) and hidden once an icon is assigned to the slot —
    // `{flatten: true}` sees through a forwarded-but-empty parent slot, so the
    // default still shows when the consumer overrides nothing.
    const showIcon = this.variant !== ReadoutBlockVariant.value || this.hasIcon;
    if (!showIcon) {
      return nothing;
    }
    let fallback: TemplateResult | typeof nothing = nothing;
    if (this.variant === ReadoutBlockVariant.setpoint) {
      fallback = html`<obi-input-right></obi-input-right>`;
    } else if (this.variant === ReadoutBlockVariant.advice) {
      fallback = html`<obi-notification-advice></obi-notification-advice>`;
    }
    return html`<span class="block-icon" part="block-icon" aria-hidden="true">
      <slot name="icon" @slotchange=${this.onIconSlotChange}></slot>
      ${this.hasAssignedIcon ? nothing : fallback}
    </span>`;
  }

  /**
   * A cap-height `°` column whose width scales with the number size. Inherits the
   * block's colour.
   */
  private renderDegreeGlyph(size: ObcTextboxSize): TemplateResult {
    return html`
      <span
        class=${classMap({
          'degree-column': true,
          [`degree-${size}`]: true,
          'degree-inherit': true,
        })}
        part="degree"
      >
        <obc-textbox class="degree-glyph" .size=${size} alignment="center"
          >°</obc-textbox
        >
      </span>
    `;
  }

  override render() {
    const valueSize = this.resolvedValueSize;
    const formatOptions = this.numericFormatOptions;
    const valueForFormat = this.value ?? undefined;
    const text = this.off
      ? this.offText
      : formatNumericValue(valueForFormat, formatOptions);
    // Hinted zeros pad the INTEGER part up to `maxDigits`, independent of
    // `fractionDigits` (the decimal point and fraction digits never count toward
    // `maxDigits`). Negative / dashed values are not padded. Example: value 1.2,
    // maxDigits 3, fractionDigits 1 → "001.2".
    const hintCount =
      this.off ||
      !this.hintedZeros ||
      valueForFormat === undefined ||
      valueForFormat < 0
        ? 0
        : Math.max(this.maxDigits - readoutFormattedInteger(text), 0);
    const hinted = hintCount > 0 ? '0'.repeat(hintCount) : '';
    // Hinted zeros own the width — they already fill to `maxDigits` — so when
    // `hintedZeros` is enabled an explicit `spaceReserver` is ignored (it has
    // higher priority). Otherwise the wider of the explicit reserver and the
    // `maxDigits`-derived reserve wins.
    const reserver = this.hintedZeros
      ? this.reserverText
      : this.widerReserver(this.spaceReserver, this.reserverText);

    const block = html`
      <div
        class=${classMap({
          block: true,
          [`block-${this.variant}`]: true,
          [`size-${this.size}`]: true,
          'tone-enhanced': this.enhanced,
          touching: this.touching,
          'is-hiding': this.hidePhase === ReadoutBlockHidePhase.hiding,
          'is-hidden': this.hidePhase === ReadoutBlockHidePhase.hidden,
          ...this.dataQualityClasses(),
        })}
        part="block block-${this.variant}"
      >
        ${this.renderIcon()}
        <span class="block-content" part="block-content">
          <obc-textbox
            class="block-text"
            part="block-text"
            .size=${valueSize}
            .fontWeight=${this.weight}
            .alignment=${this.alignment}
            .tabularNums=${true}
          >
            ${hinted
              ? html`<span class="hinted-zero" aria-hidden="true"
                  >${hinted}</span
                >`
              : nothing}${text}
            ${reserver ? html`<span slot="length">${reserver}</span>` : nothing}
          </obc-textbox>
          ${this.hasDegree ? this.renderDegreeGlyph(valueSize) : nothing}
        </span>
      </div>
    `;
    return wrapWithAlertFrame(this.alert ?? false, block);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-block': ObcReadoutBlock;
  }
}
