import {LitElement, html, nothing, unsafeCSS, type TemplateResult} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout-list-item.css?inline';
import {customElement} from '../../decorator.js';
import '../../components/textbox/textbox.js';
import {
  ObcTextboxSize,
  ObcTextboxFontWeight,
} from '../../components/textbox/textbox.js';
import '../../icons/icon-input-right.js';
import '../../icons/icon-notification-advice.js';
import {
  formatNumericValue,
  getHintZeros,
  type ReadoutNumericFormatOptions,
} from '../readout/readout-formatters.js';
import {
  type AlertFrameConfig,
  wrapWithAlertFrame,
} from '../../components/alert-frame/alert-frame.js';

// The value weight maps straight to obc-textbox's font weights (regular /
// semibold / bold). Re-exported so consumers can set `valueOptions.weight`
// without a second import path.
export {ObcTextboxFontWeight} from '../../components/textbox/textbox.js';

/**
 * Density/size scale of the readout row.
 * - `small`: regular value typography (smallest, densest).
 * - `medium`: medium value typography.
 * - `large`: large value typography.
 */
export enum ReadoutListItemSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

/**
 * Placement of the unit/source relative to the label and value.
 * - `trailing-unit`: unit after the value, source after a trailing divider.
 * - `leading-unit`: unit beside/under the label.
 * - `leading-src`: source beside/under the label (no trailing source).
 */
export enum ReadoutListItemStacking {
  trailingUnit = 'trailing-unit',
  leadingUnit = 'leading-unit',
  leadingSrc = 'leading-src',
}

/**
 * Colour emphasis of the value.
 * - `regular`: neutral.
 * - `enhanced`: accented (in-command) colour.
 */
export enum ReadoutListItemPriority {
  regular = 'regular',
  enhanced = 'enhanced',
}

/**
 * Measurement quality of the value. Orthogonal to the row-level `alert`
 * – a low-integrity or invalid value can also sit inside an alert frame.
 */
export enum ReadoutListItemDataQuality {
  lowIntegrity = 'low-integrity',
  invalid = 'invalid',
}

/**
 * Corner style of the interactive (clickable) surface.
 * - `squared` (default): no rounding (true rectangle).
 * - `round-corners`: larger rounded corners.
 * - `round`: fully rounded (pill).
 */
export enum ReadoutListItemBorder {
  squared = 'squared',
  round = 'round',
  roundCorners = 'round-corners',
}

export interface ReadoutListItemClickable {
  border?: ReadoutListItemBorder;
}

/**
 * Per-block state shared by value / setpoint / advice / src. Each is independent
 * of (and nests inside) the row-level `dataQuality` / `alert` props. All
 * combinations are allowed.
 */
export interface ReadoutBlockState {
  /** Per-block measurement quality (low-integrity / invalid). */
  dataQuality?: ReadoutListItemDataQuality;
  /** Per-block alert frame; nests inside any row-level alert frame. */
  alert?: false | AlertFrameConfig;
}

export interface ReadoutValueOptions extends ReadoutBlockState {
  /** Render the unfilled leading positions as muted zeroes (requires `maxDigits`). */
  hintedZeros?: boolean;
  /**
   * Value font weight — `regular` (default), `semibold`, or `bold` (the
   * obc-textbox weights). Affects weight only; it does NOT change the colour
   * (colour is driven by `priority`).
   */
  weight?: ObcTextboxFontWeight;
  /** Show the `value-icon` slot before the value. */
  hasIcon?: boolean;
  /**
   * Longest value string to reserve width for (e.g. `"0000.0"`), so rows align
   * across different value lengths / `fractionDigits` — set the same value on
   * every row. Combined with the `maxDigits`/`fractionDigits`-derived reserve by
   * taking whichever is **wider**, so it never reserves less than the formatted
   * value needs.
   */
  spaceReserver?: string;
}

/**
 * How the setpoint segment behaves relative to the value.
 * - `always-visible` (default): the setpoint is always shown.
 * - `flip-flop`: value and setpoint swap emphasis (size) as the value reaches
 *   the setpoint.
 * - `pop-up`: the setpoint is shown only while the value has not reached it,
 *   then fades out (100ms) once value === setpoint.
 */
export enum ReadoutListItemSetpointInteraction {
  alwaysVisible = 'always-visible',
  flipFlop = 'flip-flop',
  popUp = 'pop-up',
}

export interface ReadoutSetpointOptions extends ReadoutBlockState {
  hintedZeros?: boolean;
  /** How the setpoint behaves relative to the value (default `always-visible`). */
  interaction?: ReadoutListItemSetpointInteraction;
  /**
   * The user is physically interacting with (adjusting) the setpoint — the
   * "focus" visual state. Same convention as `touching` on the instrument
   * setpoint marker (`SetpointMixin` / `svghelpers/setpoint.ts`): keeps the
   * setpoint visible and shows the lighter-blue focus triangle.
   */
  touching?: boolean;
  /** Longest value string to reserve width for; see {@link ReadoutValueOptions.spaceReserver}. */
  spaceReserver?: string;
}

export interface ReadoutAdviceOptions extends ReadoutBlockState {
  hintedZeros?: boolean;
  /** Longest value string to reserve width for; see {@link ReadoutValueOptions.spaceReserver}. */
  spaceReserver?: string;
}

export interface ReadoutReserverOptions {
  /** Longest expected string to reserve width for (aligns multiple rows), e.g. `"miles"`. */
  spaceReserver?: string;
}

export interface ReadoutSrcOptions extends ReadoutBlockState {
  /** Longest expected source string to reserve width for; see {@link ReadoutReserverOptions.spaceReserver}. */
  spaceReserver?: string;
}

enum BlockRole {
  value = 'value',
  setpoint = 'setpoint',
  advice = 'advice',
}

/**
 * `<obc-readout-list-item>` – A compact, dense readout row for lists and tables.
 *
 * Renders a label, an optional source, an optional unit, and up to three
 * cap-height "readout building blocks" – advice, setpoint, and value – each a
 * fixed-width-reservable numeric segment. Dynamic data is passed as top-level
 * primitives (`value`, `setpoint`, `advice`, `label`, `unit`, `src`). Global
 * layout/format is configured via top-level props (`size`, `priority`,
 * `stacking`, `hasDegree`, `dataQuality`, `alert`, …) and per-block tweaks via one
 * object per block (`valueOptions`, `setpointOptions`, `adviceOptions`,
 * `unitOptions`, `srcOptions`).
 *
 * ### Features
 * - **Building blocks:** value, optional setpoint, and optional advice segments,
 *   each cap-height-aligned and able to reserve a stable width.
 * - **Sizes:** `small`, `medium`, `large` density scales.
 * - **Stacking:** `trailing-unit`, `leading-unit`, `leading-src` placement.
 * - **Priority:** `regular`/`enhanced` colour emphasis; per-value `weight`
 *   (`regular`/`semibold`/`bold`) is independent of colour.
 * - **Setpoint flip-flop:** swaps emphasis between value and setpoint as the
 *   value reaches the setpoint.
 * - **Data quality:** `low-integrity`/`invalid` styling, combinable with `alert`.
 * - **Alert frame:** optional `alert` wrapper (caution/warning/alarm/level).
 * - **Clickable:** optionally rendered as a focusable button with `squared`,
 *   `round-corners`, or `round` corners.
 * - **Formatting:** shared `fractionDigits`, width reservation via `maxDigits`
 *   and per-segment `hintedZeros`; a `null` value renders a dash (`-`).
 *
 * ### Usage Guidelines
 * Use for dense readout rows in lists/tables. Prefer `<obc-readout>` for rich
 * multi-segment instrument layouts, source pickers, or flyout behaviour.
 *
 * @experimental This component is the pilot for the new primitives + per-block
 * options Readout API; its API may change in a future release.
 *
 * ### Slots
 * | Slot Name     | Renders When                  | Purpose                                  |
 * |---------------|-------------------------------|------------------------------------------|
 * | leading-icon  | `hasLeadingIcon`              | Icon before the label.                   |
 * | value-icon    | `valueOptions.hasIcon`        | Icon before the value.                   |
 * | setpoint-icon | `hasSetpoint`                 | Overrides the default setpoint icon.     |
 * | advice-icon   | `hasAdvice`                   | Overrides the default advice icon.       |
 *
 * @slot leading-icon - Icon before the label.
 * @slot value-icon - Icon before the value.
 * @slot setpoint-icon - Overrides the default setpoint icon.
 * @slot advice-icon - Overrides the default advice icon.
 */
@customElement('obc-readout-list-item')
export class ObcReadoutListItem extends LitElement {
  // Primitives (dynamic data)
  @property({type: String}) label?: string;
  @property({type: String}) unit?: string;
  @property({type: String}) src?: string;

  @property({type: Boolean, attribute: false}) hasValue = true;
  @property({type: Number}) value: number | null = null;
  /** Render the value as the literal "OFF" (e.g. equipment powered down). Affects the value only. */
  @property({type: Boolean}) off = false;

  @property({type: Boolean}) hasSetpoint = false;
  /** @availableWhen hasSetpoint==true */
  @property({type: Number}) setpoint?: number;

  @property({type: Boolean}) hasAdvice = false;
  /** @availableWhen hasAdvice==true */
  @property({type: Number}) advice?: number;

  // Global layout/format (each defaults via its `resolved*` getter where useful).
  @property({type: String}) size?: ReadoutListItemSize;
  @property({type: String}) priority?: ReadoutListItemPriority;
  @property({type: String}) stacking?: ReadoutListItemStacking;
  @property({type: Object}) clickable: boolean | ReadoutListItemClickable =
    false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasDegree = false;
  @property({type: Boolean}) hasDegreeSpacer = false;
  @property({type: Number}) fractionDigits = 0;
  @property({type: Number}) maxDigits = 0;
  @property({type: String}) dataQuality?: ReadoutListItemDataQuality;
  // `boolean | …` (not `false | …`): the generated Angular wrapper widens a
  // literal-`false` union to `boolean`, which then won't assign back to a
  // `false`-typed element property. `wrapWithAlertFrame` treats any non-object
  // (incl. `true`) as "no frame", so accepting `boolean` is harmless.
  @property({type: Object}) alert: boolean | AlertFrameConfig = false;

  // Per-block configuration — one object per block (see the Readout*Options types).
  @property({type: Object}) valueOptions?: ReadoutValueOptions;
  @property({type: Object}) setpointOptions?: ReadoutSetpointOptions;
  @property({type: Object}) adviceOptions?: ReadoutAdviceOptions;
  @property({type: Object}) unitOptions?: ReadoutReserverOptions;
  @property({type: Object}) srcOptions?: ReadoutSrcOptions;

  /** Pop-up deferred-hide phase for the setpoint (see {@link updated}). */
  @state() private deferredSetpointHidePhase: 'none' | 'hiding' | 'hidden' =
    'none';
  private deferredSetpointHideTimer?: number;
  private hasCompletedFirstUpdate = false;

  private get resolvedSize(): ReadoutListItemSize {
    return this.size ?? ReadoutListItemSize.small;
  }

  private get resolvedStacking(): ReadoutListItemStacking {
    return this.stacking ?? ReadoutListItemStacking.trailingUnit;
  }

  private get resolvedPriority(): ReadoutListItemPriority {
    return this.priority ?? ReadoutListItemPriority.regular;
  }

  private get resolvedFractionDigits(): number {
    return this.fractionDigits ?? 0;
  }

  private get resolvedMaxDigits(): number {
    return this.maxDigits ?? 0;
  }

  private get resolvedClickable(): false | Required<ReadoutListItemClickable> {
    const clickable = this.clickable;
    if (!clickable) {
      return false;
    }
    if (clickable === true) {
      return {border: ReadoutListItemBorder.squared};
    }
    return {border: clickable.border ?? ReadoutListItemBorder.squared};
  }

  private get isAtSetpoint(): boolean {
    if (
      !this.hasSetpoint ||
      this.value === null ||
      this.setpoint === undefined
    ) {
      return false;
    }
    // Compare what is DISPLAYED (rounded to fractionDigits), not the raw values,
    // so e.g. 29.999 and 30 at fractionDigits=0 both read "30" → at setpoint.
    const formatOptions = this.numericFormatOptions(this.resolvedMaxDigits);
    return (
      formatNumericValue(this.value, formatOptions) ===
      formatNumericValue(this.setpoint, formatOptions)
    );
  }

  private get resolvedSetpointInteraction(): ReadoutListItemSetpointInteraction {
    return (
      this.setpointOptions?.interaction ??
      ReadoutListItemSetpointInteraction.alwaysVisible
    );
  }

  private get isFlipFlop(): boolean {
    return (
      this.resolvedSetpointInteraction ===
      ReadoutListItemSetpointInteraction.flipFlop
    );
  }

  private get isPopUp(): boolean {
    return (
      this.resolvedSetpointInteraction ===
      ReadoutListItemSetpointInteraction.popUp
    );
  }

  private get setpointTouching(): boolean {
    return this.setpointOptions?.touching ?? false;
  }

  /**
   * The setpoint is rendered "emphasised" (primary size + SemiBold weight) when
   * it is the focus of attention: while actively adjusting (`touching`), or while
   * a flip-flop has the value away from the setpoint. Otherwise it is a secondary
   * (smaller, regular-weight) reference next to the value.
   */
  private get isSetpointEmphasized(): boolean {
    if (!this.hasSetpoint) {
      return false;
    }
    if (this.setpointTouching) {
      return true;
    }
    return this.isFlipFlop && !this.isAtSetpoint;
  }

  /**
   * The row's enhanced (in-command) colour state, applied uniformly to BOTH the
   * value and the setpoint — they are always either both neutral or both enhanced
   * (never a blue setpoint next to a grey value). Driven by `priority` only;
   * `valueOptions.weight` changes weight, not colour.
   */
  private get rowEnhanced(): boolean {
    return this.resolvedPriority === ReadoutListItemPriority.enhanced;
  }

  /** Primary value-typography size for the current density tier. */
  private get primarySize(): ObcTextboxSize {
    switch (this.resolvedSize) {
      case ReadoutListItemSize.large:
        return ObcTextboxSize.l;
      case ReadoutListItemSize.medium:
        return ObcTextboxSize.m;
      default:
        return ObcTextboxSize.s;
    }
  }

  /** Secondary (de-emphasised) value-typography size for the current density tier. */
  private get secondarySize(): ObcTextboxSize {
    switch (this.resolvedSize) {
      case ReadoutListItemSize.large:
        return ObcTextboxSize.s;
      case ReadoutListItemSize.medium:
        return ObcTextboxSize.s;
      default:
        return ObcTextboxSize.xs;
    }
  }

  private get valueSize(): ObcTextboxSize {
    // The value de-emphasises (secondary size) whenever the setpoint is the
    // focus — while actively adjusting (`touching`) or while a flip-flop holds
    // the value away from the setpoint. So "grab the setpoint" shrinks the value for
    // the whole adjustment (initiate + move read the same: setpoint big, value
    // small), mirroring the flip-flop convention.
    if (this.isSetpointEmphasized) {
      return this.secondarySize;
    }
    return this.primarySize;
  }

  private get setpointSize(): ObcTextboxSize {
    return this.isSetpointEmphasized ? this.primarySize : this.secondarySize;
  }

  /** Value font weight passes straight to obc-textbox; regular when unset. Colour is separate. */
  private get valueWeight(): ObcTextboxFontWeight {
    return this.valueOptions?.weight ?? ObcTextboxFontWeight.regular;
  }

  /** Setpoint is SemiBold only while emphasised, otherwise regular weight. */
  private get setpointWeight(): ObcTextboxFontWeight {
    return this.isSetpointEmphasized
      ? ObcTextboxFontWeight.semibold
      : ObcTextboxFontWeight.regular;
  }

  private numericFormatOptions(maxDigits: number): ReadoutNumericFormatOptions {
    return {
      showZeroPadding: false,
      minValueLength: maxDigits,
      fractionDigits: this.resolvedFractionDigits,
    };
  }

  /** Widest possible value string for width reservation (e.g. `"000.0"`). */
  private get reserverText(): string {
    const maxDigits = this.resolvedMaxDigits;
    if (maxDigits <= 0) {
      return '';
    }
    const fractionDigits = this.resolvedFractionDigits;
    const integer = '0'.repeat(Math.max(maxDigits, 1));
    return fractionDigits > 0
      ? `${integer}.${'0'.repeat(fractionDigits)}`
      : integer;
  }

  /**
   * Effective width reserver for a numeric block: the wider of the explicit
   * `spaceReserver` and the `maxDigits`/`fractionDigits`-derived reserve, so an
   * explicit reserver can never reserve *less* than the formatted value needs.
   * Under tabular-nums the rendered width is proportional to character count, so
   * "wider" compares string length.
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

  /** classMap fragment for a block / source carrying per-block data quality. */
  private dataQualityClasses(
    dataQuality: ReadoutListItemDataQuality | undefined
  ): Record<string, boolean> {
    return {
      'data-low-integrity':
        dataQuality === ReadoutListItemDataQuality.lowIntegrity,
      'data-invalid': dataQuality === ReadoutListItemDataQuality.invalid,
    };
  }

  private renderIcon(role: BlockRole): TemplateResult | typeof nothing {
    if (role === BlockRole.value) {
      if (!this.valueOptions?.hasIcon) {
        return nothing;
      }
      return html`<span class="block-icon" aria-hidden="true"
        ><slot name="value-icon"></slot
      ></span>`;
    }
    if (role === BlockRole.setpoint) {
      return html`<span class="block-icon" aria-hidden="true">
        <slot name="setpoint-icon"><obi-input-right></obi-input-right></slot>
      </span>`;
    }
    return html`<span class="block-icon" aria-hidden="true">
      <slot name="advice-icon"
        ><obi-notification-advice></obi-notification-advice
      ></slot>
    </span>`;
  }

  private renderBlock(config: {
    role: BlockRole;
    value: number | null | undefined;
    size: ObcTextboxSize;
    enhanced: boolean;
    weight: ObcTextboxFontWeight;
    hintedZeros: boolean;
    spaceReserver?: string;
    off?: boolean;
    hasDegree?: boolean;
    extraClasses?: Record<string, boolean>;
    dataQuality?: ReadoutListItemDataQuality;
    alert?: false | AlertFrameConfig;
  }): TemplateResult {
    const formatOptions = this.numericFormatOptions(this.resolvedMaxDigits);
    const valueForFormat = config.value ?? undefined;
    const text = config.off
      ? 'OFF'
      : formatNumericValue(valueForFormat, formatOptions);
    // `maxDigits` reserves INTEGER digits only (see `reserverText`), but
    // getHintZeros measures total digits (it subtracts just the decimal point),
    // so pad its target by `fractionDigits` to hint the right number of integer
    // zeros (e.g. value 1.2, maxDigits 3, fractionDigits 1 → "001.2", not "01.2").
    const hinted =
      config.off || !config.hintedZeros
        ? ''
        : getHintZeros(valueForFormat, {
            ...formatOptions,
            minValueLength:
              formatOptions.minValueLength + formatOptions.fractionDigits,
          });
    const reserver = this.widerReserver(
      config.spaceReserver,
      this.reserverText
    );

    const block = html`
      <div
        class=${classMap({
          block: true,
          [`block-${config.role}`]: true,
          'tone-enhanced': config.enhanced,
          ...this.dataQualityClasses(config.dataQuality),
          ...(config.extraClasses ?? {}),
        })}
        part="block block-${config.role}"
      >
        ${this.renderIcon(config.role)}
        <span class="block-content">
          <obc-textbox
            class="block-text"
            .size=${config.size}
            .fontWeight=${config.weight}
            .tabularNums=${true}
          >
            ${hinted
              ? html`<span class="hinted-zero" aria-hidden="true"
                  >${hinted}</span
                >`
              : nothing}${text}
            ${reserver ? html`<span slot="length">${reserver}</span>` : nothing}
          </obc-textbox>
          ${config.hasDegree
            ? this.renderDegreeGlyph(config.size, {inherit: true})
            : nothing}
        </span>
      </div>
    `;
    return wrapWithAlertFrame(config.alert ?? false, block);
  }

  /**
   * A cap-height `°` column whose width scales with the value size. Used after
   * the value (as the value↔unit boundary, via {@link renderValueUnitGap}) and
   * inside the setpoint / advice blocks. `inherit` makes the glyph take the
   * surrounding block's colour (setpoint/advice); otherwise it uses the value
   * colour, optionally `enhanced`.
   */
  private renderDegreeGlyph(
    size: ObcTextboxSize,
    opts: {enhanced?: boolean; inherit?: boolean} = {}
  ): TemplateResult {
    return html`
      <span
        class=${classMap({
          'degree-column': true,
          [`degree-${size}`]: true,
          'tone-enhanced': !opts.inherit && Boolean(opts.enhanced),
          'degree-inherit': Boolean(opts.inherit),
        })}
        part="degree"
      >
        <obc-textbox class="degree-glyph" .size=${size} alignment="center"
          >°</obc-textbox
        >
      </span>
    `;
  }

  /**
   * The gap rendered between the value digits and the unit.
   *
   * - `hasDegree`: a cap-height `°` column whose width scales with the value
   *   size (the `°` replaces the default gap).
   * - otherwise: the default 2px gap (only when a trailing unit follows).
   *
   * `hasDegreeSpacer` deliberately does NOT add anything here — it keeps the 2px
   * gap and instead widens the unit column via {@link renderDegreeSpacer} (a
   * spacer AFTER the unit). That way a non-degree row's value digits stay
   * aligned with degree rows (degree column width = spacer width + 2px gap)
   * while its unit shifts left. Mirrors Figma `1:2920` (spacer) / `1:2970`
   * (degree).
   *
   * TODO(designer): cross-size alignment is deferred. Degree rows of different
   * value sizes have different `°` column widths (6/8/12px), so their value digit
   * edges stagger by `degree-width`. For degree rows of mixed sizes you cannot
   * align the value digit edges AND keep the unit column aligned — resolving it
   * needs a design decision (a constant degree reserve, which widens the smaller
   * rows' `°`, OR pinning the value edge and letting the unit column stagger).
   */
  private renderValueUnitGap(): TemplateResult | typeof nothing {
    if (!this.hasValue) {
      return nothing;
    }
    const hasTrailingUnit =
      Boolean(this.unit) &&
      this.resolvedStacking !== ReadoutListItemStacking.leadingUnit;

    if ((this.hasDegree ?? false) && !this.off) {
      return this.renderDegreeGlyph(this.valueSize, {
        enhanced: this.rowEnhanced,
      });
    }
    if (hasTrailingUnit) {
      return html`<span class="value-unit-gap" aria-hidden="true"></span>`;
    }
    return nothing;
  }

  /**
   * A spacer rendered AFTER the unit when `hasDegreeSpacer` is set on a
   * non-degree row. Its width (`degree-compensation-padding`) = the degree
   * column width minus the 2px gap, so the row's value digits align with degree
   * rows in the same column while its unit shifts left. See
   * {@link renderValueUnitGap}.
   */
  private renderDegreeSpacer(): TemplateResult | typeof nothing {
    const hasDegree = this.hasDegree ?? false;
    const hasDegreeSpacer = this.hasDegreeSpacer ?? false;
    if (hasDegree || !hasDegreeSpacer) {
      return nothing;
    }
    return html`<span
      class="degree-spacer"
      part="degree-spacer"
      aria-hidden="true"
    ></span>`;
  }

  private renderTextbox(
    role: 'label' | 'unit' | 'source',
    text: string,
    reserver?: string,
    state?: ReadoutBlockState
  ): TemplateResult {
    const weight =
      role === 'label'
        ? ObcTextboxFontWeight.semibold
        : ObcTextboxFontWeight.regular;
    const box = html`
      <obc-textbox
        class=${classMap({
          [role]: true,
          ...this.dataQualityClasses(state?.dataQuality),
        })}
        part=${role}
        .size=${ObcTextboxSize.xs}
        .fontWeight=${weight}
        alignment="left"
      >
        ${text}
        ${reserver ? html`<span slot="length">${reserver}</span>` : nothing}
      </obc-textbox>
    `;
    return wrapWithAlertFrame(state?.alert ?? false, box);
  }

  private renderValueCluster(): TemplateResult {
    const popUpAtSetpoint =
      this.isPopUp && this.isAtSetpoint && !this.setpointTouching;
    const setpointExtraClasses = {
      'is-hiding':
        popUpAtSetpoint && this.deferredSetpointHidePhase === 'hiding',
      'is-hidden':
        popUpAtSetpoint && this.deferredSetpointHidePhase === 'hidden',
      touching: this.setpointTouching,
    };
    return html`
      <div class="value-cluster" part="value-cluster">
        ${this.hasAdvice
          ? this.renderBlock({
              role: BlockRole.advice,
              value: this.advice,
              size: this.secondarySize,
              enhanced: false,
              weight: ObcTextboxFontWeight.regular,
              hintedZeros: this.adviceOptions?.hintedZeros ?? false,
              spaceReserver: this.adviceOptions?.spaceReserver,
              hasDegree: this.hasDegree ?? false,
              dataQuality: this.adviceOptions?.dataQuality,
              alert: this.adviceOptions?.alert,
            })
          : nothing}
        ${this.hasSetpoint
          ? this.renderBlock({
              role: BlockRole.setpoint,
              value: this.setpoint,
              size: this.setpointSize,
              // Value and setpoint share the enhanced colour state (both neutral
              // or both enhanced); the setpoint is bold only while emphasised.
              enhanced: this.rowEnhanced,
              weight: this.setpointWeight,
              hintedZeros: this.setpointOptions?.hintedZeros ?? false,
              spaceReserver: this.setpointOptions?.spaceReserver,
              hasDegree: this.hasDegree ?? false,
              extraClasses: setpointExtraClasses,
              dataQuality: this.setpointOptions?.dataQuality,
              alert: this.setpointOptions?.alert,
            })
          : nothing}
        ${this.hasValue
          ? this.renderBlock({
              role: BlockRole.value,
              value: this.value,
              size: this.valueSize,
              enhanced: this.rowEnhanced,
              weight: this.valueWeight,
              hintedZeros: this.valueOptions?.hintedZeros ?? false,
              spaceReserver: this.valueOptions?.spaceReserver,
              off: this.off,
              dataQuality: this.valueOptions?.dataQuality,
              alert: this.valueOptions?.alert,
            })
          : nothing}
      </div>
    `;
  }

  private renderLabelContainer(): TemplateResult {
    const stacking = this.resolvedStacking;
    const showLeadingUnit =
      stacking === ReadoutListItemStacking.leadingUnit && Boolean(this.unit);
    const showLeadingSrc =
      stacking === ReadoutListItemStacking.leadingSrc && Boolean(this.src);

    return html`
      <div class="label-container" part="label-container">
        ${this.hasLeadingIcon
          ? html`<span class="leading-icon" aria-hidden="true"
              ><slot name="leading-icon"></slot
            ></span>`
          : nothing}
        <div class="label-stack" part="label-stack">
          ${this.label ? this.renderTextbox('label', this.label) : nothing}
          ${showLeadingUnit
            ? this.renderTextbox(
                'unit',
                this.unit ?? '',
                this.unitOptions?.spaceReserver
              )
            : nothing}
          ${showLeadingSrc
            ? this.renderTextbox(
                'source',
                this.src ?? '',
                this.srcOptions?.spaceReserver,
                this.srcOptions
              )
            : nothing}
        </div>
      </div>
    `;
  }

  private renderTrailingUnit(): TemplateResult | typeof nothing {
    if (
      this.resolvedStacking === ReadoutListItemStacking.leadingUnit ||
      !this.unit
    ) {
      return nothing;
    }
    return this.renderTextbox(
      'unit',
      this.unit,
      this.unitOptions?.spaceReserver
    );
  }

  private renderTrailingSource(): TemplateResult | typeof nothing {
    if (
      this.resolvedStacking === ReadoutListItemStacking.leadingSrc ||
      !this.src
    ) {
      return nothing;
    }
    return html`
      <div class="divider" part="divider" aria-hidden="true"></div>
      ${this.renderTextbox(
        'source',
        this.src,
        this.srcOptions?.spaceReserver,
        this.srcOptions
      )}
    `;
  }

  private renderContent(): TemplateResult {
    return html`
      <div class="content" part="content">
        ${this.renderLabelContainer()}
        <div class="value-area" part="value-area">
          ${this.renderValueCluster()} ${this.renderValueUnitGap()}
          <div class="unit-area" part="unit-area">
            ${this.renderTrailingUnit()} ${this.renderDegreeSpacer()}
          </div>
        </div>
        ${this.renderTrailingSource()}
      </div>
    `;
  }

  override updated(changed: Map<string, unknown>): void {
    super.updated(changed);

    const firstUpdate = !this.hasCompletedFirstUpdate;
    this.hasCompletedFirstUpdate = true;

    // Pop-up: hide the setpoint shortly after the value reaches it. `touching`
    // and the non-pop-up modes keep the setpoint visible.
    if (!this.isPopUp || this.setpointTouching) {
      this.clearDeferredSetpointHide();
      return;
    }

    const shouldHide = this.hasSetpoint && this.isAtSetpoint;

    if (firstUpdate) {
      // Settle to the resting state on mount without animating.
      this.deferredSetpointHidePhase = shouldHide ? 'hidden' : 'none';
      return;
    }

    if (!shouldHide) {
      this.clearDeferredSetpointHide();
      return;
    }

    if (this.deferredSetpointHidePhase !== 'none') {
      return;
    }

    this.deferredSetpointHidePhase = 'hiding';
    window.clearTimeout(this.deferredSetpointHideTimer);
    this.deferredSetpointHideTimer = window.setTimeout(() => {
      this.deferredSetpointHidePhase = 'hidden';
      this.deferredSetpointHideTimer = undefined;
    }, 100);
  }

  private clearDeferredSetpointHide(): void {
    if (this.deferredSetpointHidePhase !== 'none') {
      this.deferredSetpointHidePhase = 'none';
    }
    window.clearTimeout(this.deferredSetpointHideTimer);
    this.deferredSetpointHideTimer = undefined;
  }

  override disconnectedCallback(): void {
    window.clearTimeout(this.deferredSetpointHideTimer);
    this.deferredSetpointHideTimer = undefined;
    // Settle a mid-flight hide to its end state. Without this, disconnecting
    // during the 100ms window leaves the phase stuck at 'hiding' (the timer that
    // would advance it to 'hidden' is gone), so a later reconnect never resolves.
    if (this.deferredSetpointHidePhase === 'hiding') {
      this.deferredSetpointHidePhase = 'hidden';
    }
    super.disconnectedCallback();
  }

  override render() {
    const clickable = this.resolvedClickable;
    const dataQuality = this.dataQuality;
    const classes = classMap({
      root: true,
      [`size-${this.resolvedSize}`]: true,
      [`stacking-${this.resolvedStacking}`]: true,
      [`priority-${this.resolvedPriority}`]: true,
      'data-low-integrity':
        dataQuality === ReadoutListItemDataQuality.lowIntegrity,
      'data-invalid': dataQuality === ReadoutListItemDataQuality.invalid,
      'flip-flop': this.isFlipFlop,
      clickable: Boolean(clickable),
      [`border-${clickable ? clickable.border : ReadoutListItemBorder.squared}`]:
        Boolean(clickable),
    });

    const surface = html`<div class="surface" part="surface">
      ${this.renderContent()}
    </div>`;

    // No `aria-label` here: it would override the button's accessible name and
    // hide the dynamic readout text (value / unit / source) from screen readers.
    // The visible content (label + value + unit + source) already forms a
    // complete accessible name; icons/reservers are aria-hidden / visibility-clipped.
    const root = clickable
      ? html`<button class=${classes} part="root" type="button">
          ${surface}
        </button>`
      : html`<div class=${classes} part="root">${surface}</div>`;

    // `alert` accepts `boolean` (so the generated Angular wrapper's widened
    // `boolean` type assigns cleanly), but `wrapWithAlertFrame` ignores non-object
    // truthy values. Normalise `true` → a default frame `{}` (like `clickable:
    // true`) so it isn't a silent no-op; `false`/object pass through.
    // fullWidth=true: the row-level alert frame stretches to the readout's full
    // width (PR #1001) rather than hugging it. Per-block / src alert frames keep
    // the default (hug) so they stay inline.
    const alert = this.alert === true ? {} : this.alert;
    return wrapWithAlertFrame(alert, root, true);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-list-item': ObcReadoutListItem;
  }
}
