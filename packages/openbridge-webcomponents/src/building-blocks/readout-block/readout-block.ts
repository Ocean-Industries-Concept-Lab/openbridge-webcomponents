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
import '../../icons/icon-notification-advice-active.js';
import '../../icons/icon-caution-google.js';
import '../../icons/icon-caution-color-iec.js';
import '../../icons/icon-warning-unacknowledged-outlined.js';
import '../../icons/icon-warning-unacknowledged-iec.js';
import '../../icons/icon-alarm.js';
import '../../icons/icon-alarm-unacknowledged-iec.js';
import '../../icons/icon-running.js';
import '../../icons/icon-running-color-iec.js';
import {
  formatNumericValue,
  readoutFormattedInteger,
  assertReadoutValueType,
  assertReadoutFractionDigits,
  isReadoutDigitCountMissing,
  resolveReadoutDigitCount,
  resolveReadoutNumericValue,
  resolveReadoutTextValue,
  READOUT_UNAVAILABLE_DASH,
  ReadoutValueType,
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
export {ReadoutValueType} from '../../navigation-instruments/readout/readout-formatters.js';

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
 * Semantic category of an advice block (Figma 6.1 "Readout-block-advice"
 * Value axis). Drives the default marker icon and — while {@link
 * ObcReadoutBlock.active} — the triggered styling:
 * - `regular` / `optimal` / `eco`: the advice diamond; triggered renders the
 *   filled diamond (tinted enhanced-blue / mint for optimal / eco) and a
 *   SemiBold number.
 * - `caution` / `warning` / `alarm` / `running`: the matching neutral outline
 *   icon; triggered swaps in the filled IEC status icon and the active text
 *   colour.
 *
 * TODO(designer): the optimal / eco triggered tint covers the whole diamond
 * glyph — the Figma icon tints only the inner plus, which needs a two-tone
 * icon asset; and the advice "Enhanced" state (indent background chip) is not
 * implemented yet. Both flagged as "may change" in the 6.1 review.
 */
export enum ReadoutAdviceCategory {
  regular = 'regular',
  optimal = 'optimal',
  eco = 'eco',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
  running = 'running',
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
 * Setting `valueType` to `text` renders `value` verbatim (e.g.
 * `"Auto"`) instead of a formatted number.
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

  /**
   * The value; `null`/`undefined` renders a dash. A number by default, or text
   * when {@link valueType} is `text`.
   */
  @property({type: String}) value: number | string | null = null;

  /**
   * How {@link value} is interpreted. `number` (default) formats it via
   * `fractionDigits`; `text` renders it verbatim and ignores the numeric
   * format options. Passing text while this is `number` throws.
   */
  @property({type: String}) valueType: ReadoutValueType =
    ReadoutValueType.number;

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

  /**
   * Number of fraction digits. Must be between 0 and 100 — the range
   * `Number.prototype.toFixed` accepts; outside it throws a `RangeError`.
   * A fractional count truncates (`2.7` → `2`). A count that never arrived
   * (`NaN`, `null` or unset) renders the reading as the unavailable dash —
   * formatting with a precision the author never chose would let a critical
   * `0.4` pass for a healthy `0`.
   * @availableWhen valueType==number
   */
  @property({type: Number}) fractionDigits = 0;

  /**
   * Integer digits to reserve / hint (independent of `fractionDigits`).
   * Bounded before use: a fractional count
   * truncates (`2.7` → `2`), anything above 100 — including `Infinity` —
   * caps at 100, and a negative count reserves nothing. A count that never
   * arrived (`NaN`, `null` or unset) renders the reading as the unavailable
   * dash, consistent with `fractionDigits`.
   * @availableWhen valueType==number
   */
  @property({type: Number}) maxDigits = 0;

  /**
   * Render muted leading zeros filling the integer part to `maxDigits`.
   * @availableWhen valueType==number
   */
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

  /**
   * Semantic category of an advice block — picks the default marker icon and
   * the {@link active} styling. Only meaningful for `variant="advice"`.
   * @availableWhen variant==advice
   */
  @property({type: String}) category: ReadoutAdviceCategory =
    ReadoutAdviceCategory.regular;

  /**
   * The advice is triggered: the marker swaps to its filled/status icon and
   * the number takes the category's triggered styling (SemiBold for
   * regular/optimal/eco, active text colour for the alert categories). Only
   * meaningful for `variant="advice"`.
   * @availableWhen variant==advice
   */
  @property({type: Boolean}) active = false;

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

  /**
   * `maxDigits` bounded to a usable count. Every width calculation below goes
   * through this rather than the raw property, so an `Infinity` (or absurdly
   * large) value cannot reach `String.prototype.repeat`.
   */
  private get resolvedMaxDigits(): number {
    return resolveReadoutDigitCount(this.maxDigits);
  }

  /**
   * Whether a digit knob failed to arrive (`NaN` / `null` / `undefined`).
   * The reading then renders as the unavailable dash rather than silently
   * formatting with a default the author never chose — a critical `0.4`
   * formatted with a failed `fractionDigits` would otherwise print as a
   * plausible-looking `0`. A missing `maxDigits` dashes too, for consistency:
   * either knob arriving broken means the row's configuration cannot be
   * trusted.
   */
  private get digitCountsMissing(): boolean {
    return (
      isReadoutDigitCountMissing(this.fractionDigits) ||
      isReadoutDigitCountMissing(this.maxDigits)
    );
  }

  private get numericFormatOptions(): ReadoutNumericFormatOptions {
    return {
      // The unavailable placeholder stays short (`\u2012.\u2012\u2012`) rather than
      // spelling out every reserved digit position — `maxDigits` already
      // reserves the width, so it simply sits at the right edge of it.
      showZeroPadding: false,
      minValueLength: this.resolvedMaxDigits,
      // A missing precision shapes the placeholder as zero fraction digits (a
      // single dash) — and keeps a runtime `undefined`/`null` out of the
      // options object, which is typed `number` throughout the formatters.
      fractionDigits: isReadoutDigitCountMissing(this.fractionDigits)
        ? 0
        : this.fractionDigits,
    };
  }

  /** Widest possible value string for width reservation (e.g. `"000.0"`). */
  private get reserverText(): string {
    const maxDigits = this.resolvedMaxDigits;
    if (maxDigits <= 0) {
      return '';
    }
    const integer = '0'.repeat(maxDigits);
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
      fallback = this.adviceFallbackIcon();
    }
    return html`<span class="block-icon" part="block-icon" aria-hidden="true">
      <slot name="icon" @slotchange=${this.onIconSlotChange}></slot>
      ${this.hasAssignedIcon ? nothing : fallback}
    </span>`;
  }

  /**
   * The advice marker for the current category / triggered state. Resting
   * categories carry a neutral outline glyph (tinted via `currentColor`);
   * triggered alert categories swap to the filled IEC status icon, whose
   * colours are fixed fills and ignore `currentColor` by design.
   */
  private adviceFallbackIcon(): TemplateResult {
    const active = this.active;
    switch (this.category) {
      case ReadoutAdviceCategory.caution:
        return active
          ? html`<obi-caution-color-iec></obi-caution-color-iec>`
          : html`<obi-caution-google></obi-caution-google>`;
      case ReadoutAdviceCategory.warning:
        return active
          ? html`<obi-warning-unacknowledged-iec></obi-warning-unacknowledged-iec>`
          : html`<obi-warning-unacknowledged-outlined></obi-warning-unacknowledged-outlined>`;
      case ReadoutAdviceCategory.alarm:
        return active
          ? html`<obi-alarm-unacknowledged-iec></obi-alarm-unacknowledged-iec>`
          : html`<obi-alarm></obi-alarm>`;
      case ReadoutAdviceCategory.running:
        return active
          ? html`<obi-running-color-iec></obi-running-color-iec>`
          : html`<obi-running></obi-running>`;
      default:
        // regular / optimal / eco share the advice diamond; the triggered tint
        // is applied via CSS on `.block-icon` (see `advice-*` classes).
        return active
          ? html`<obi-notification-advice-active></obi-notification-advice-active>`
          : html`<obi-notification-advice></obi-notification-advice>`;
    }
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

  protected override willUpdate(changed: Map<string, unknown>): void {
    super.willUpdate(changed);
    // Validated on EVERY update, deliberately NOT gated on `value`/`valueType`
    // appearing in `changed`. When this assertion throws, Lit's `performUpdate`
    // catch calls `__markUpdated()`, which clears the changed-properties map. A
    // later update driven by any OTHER property — inside `obc-readout-list`,
    // `align()` writing the shared reservers — would then see no `value` in
    // `changed`, skip the check, and render the invalid value as a plain dash:
    // exactly the silent failure this assertion exists to prevent.
    assertReadoutValueType('obc-readout-block', this.value, this.valueType);
    assertReadoutFractionDigits('obc-readout-block', this.fractionDigits);
  }

  override render() {
    const valueSize = this.resolvedValueSize;
    const isAdvice = this.variant === ReadoutBlockVariant.advice;
    // Triggered regular/optimal/eco advice renders SemiBold (Figma 6.1); the
    // alert categories keep the caller's weight and change colour instead.
    const adviceSemibold =
      isAdvice &&
      this.active &&
      (this.category === ReadoutAdviceCategory.regular ||
        this.category === ReadoutAdviceCategory.optimal ||
        this.category === ReadoutAdviceCategory.eco);
    const weight = adviceSemibold ? ObcTextboxFontWeight.semibold : this.weight;
    const formatOptions = this.numericFormatOptions;
    const isTextMode = this.valueType === ReadoutValueType.text;
    // A missing digit knob makes the reading untrustworthy, so it resolves to
    // "no reading" and renders the dash (see `digitCountsMissing`). Text mode
    // is unaffected — it ignores the numeric knobs entirely.
    const valueForFormat = this.digitCountsMissing
      ? undefined
      : resolveReadoutNumericValue(this.value, this.valueType);
    const textValue = resolveReadoutTextValue(this.value, this.valueType);
    // Text mode renders verbatim and ignores the numeric format options; a
    // blank / missing text value still falls back to the unavailable dash.
    const text = this.off
      ? this.offText
      : isTextMode
        ? (textValue ?? READOUT_UNAVAILABLE_DASH)
        : formatNumericValue(valueForFormat, formatOptions);
    // Hinted zeros pad the INTEGER part up to `maxDigits`, independent of
    // `fractionDigits` (the decimal point and fraction digits never count toward
    // `maxDigits`). Negative / dashed values are not padded. Example: value 1.2,
    // maxDigits 3, fractionDigits 1 → "001.2".
    const hintCount =
      this.off ||
      isTextMode ||
      !this.hintedZeros ||
      valueForFormat === undefined ||
      valueForFormat < 0
        ? 0
        : Math.max(this.resolvedMaxDigits - readoutFormattedInteger(text), 0);
    const hinted = hintCount > 0 ? '0'.repeat(hintCount) : '';
    // Hinted zeros own the width — they already fill to `maxDigits` — so when
    // `hintedZeros` is enabled an explicit `spaceReserver` is ignored (it has
    // higher priority). Otherwise the wider of the explicit reserver and the
    // `maxDigits`-derived reserve wins.
    // Text mode ignores the `maxDigits`-derived numeric reserve — only an
    // explicit `spaceReserver` still applies.
    const reserver = isTextMode
      ? (this.spaceReserver ?? '')
      : this.hintedZeros
        ? this.reserverText
        : this.widerReserver(this.spaceReserver, this.reserverText);

    const block = html`
      <div
        class=${classMap({
          block: true,
          [`block-${this.variant}`]: true,
          [`size-${this.size}`]: true,
          [`value-size-${valueSize}`]: true,
          [`advice-${this.category}`]: isAdvice,
          'advice-active': isAdvice && this.active,
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
            .fontWeight=${weight}
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
