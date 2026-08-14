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
import '../../building-blocks/readout-block/readout-block.js';
import '../../icons/icon-delta.js';
import {
  ReadoutBlockVariant,
  ReadoutBlockSize,
  ReadoutBlockDataQuality,
  ReadoutBlockHidePhase,
  ReadoutAdviceCategory,
} from '../../building-blocks/readout-block/readout-block.js';
import {
  assertReadoutValueType,
  assertReadoutFractionDigits,
  isReadoutDigitCountMissing,
  resolveReadoutDigitCount,
  resolveReadoutNumericValue,
  ReadoutValueType,
  type ReadoutNumericFormatOptions,
} from '../readout/readout-formatters.js';
import {
  isDisplayedAtSetpoint,
  readoutNumericFormatOptions,
  readoutPrimarySize,
  readoutSecondarySize,
  readoutSetpointSize,
  readoutValueSize,
  readoutSetpointWeight,
  readoutDataQualityClasses,
  resolveSetpointHidePhase,
} from '../readout/readout-shared.js';
import {
  type AlertFrameConfig,
  wrapWithAlertFrame,
  ObcAlertFrameType,
  ObcAlertFrameThickness,
  ObcAlertFrameMode,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';

// The value weight maps straight to obc-textbox's font weights (regular /
// semibold / bold). Re-exported so consumers can set `valueOptions.weight`
// without a second import path.
export {ObcTextboxFontWeight} from '../../components/textbox/textbox.js';

// Re-exported so consumers can type `valueType` without a second import path.
export {ReadoutValueType} from '../readout/readout-formatters.js';

// Re-exported so consumers can set `adviceOptions.category` without a second
// import path.
export {ReadoutAdviceCategory} from '../../building-blocks/readout-block/readout-block.js';

/**
 * Density/size scale of the readout row (an alias of `ReadoutBlockSize`).
 * - `small`: regular value typography (smallest, densest).
 * - `medium`: medium value typography.
 * - `large`: large value typography.
 */
export const ReadoutListItemSize = ReadoutBlockSize;
export type ReadoutListItemSize = ReadoutBlockSize;

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
 * Measurement quality of the value (an alias of `ReadoutBlockDataQuality`).
 * Orthogonal to the row-level `alert` – a low-integrity or invalid value can
 * also sit inside an alert frame.
 */
export const ReadoutListItemDataQuality = ReadoutBlockDataQuality;
export type ReadoutListItemDataQuality = ReadoutBlockDataQuality;

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

/**
 * Per-value options. Unlike setpoint/advice, the value's `alert` frame AND
 * `dataQuality` chip wrap the whole reading — value (+ value-icon) + degree +
 * trailing unit — rather than the value alone. The alert frame is a pure overlay
 * (4px/2px padding, stroke centred on that line); the data-quality chip reuses
 * the block chip's `outline` styling with no extra padding. Neither shifts
 * content or changes the row height / column alignment (Figma 58:10120).
 */
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
 * - `equal-size`: value and setpoint are always shown at the same (primary)
 *   size (Figma 6.1 "Equal size") — the value does not demote while
 *   `touching`, unlike the other modes.
 * - `pop-up`: the setpoint is shown only while the value has not reached it,
 *   then fades out (100ms) once value === setpoint.
 *
 * TODO(designer): in pop-up mode the designer is considering keeping the
 * setpoint arrow visible while the setpoint itself is hidden, so an
 * at-setpoint reading still reads as "a value you are in control of". Until
 * that is decided, the `value-icon` slot already covers it — slot an
 * `<obi-input-right>` into the value block (see the
 * `SetpointPopUpWithValueArrow` story).
 */
export enum ReadoutListItemSetpointInteraction {
  alwaysVisible = 'always-visible',
  equalSize = 'equal-size',
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
  /**
   * Semantic category (Figma 6.1) — picks the default marker icon and the
   * `active` styling; `regular` when unset.
   */
  category?: ReadoutAdviceCategory;
  /** The advice is triggered — filled/status icon + triggered text styling. */
  active?: boolean;
  /** Longest value string to reserve width for; see {@link ReadoutValueOptions.spaceReserver}. */
  spaceReserver?: string;
}

export interface ReadoutReserverOptions {
  /** Longest expected string to reserve width for (aligns multiple rows), e.g. `"miles"`. */
  spaceReserver?: string;
}

/**
 * Per-label ("readout-block-title") options.
 *
 * The label size follows the designer's Figma 6.1 title block, which carries an
 * `xs`/`s` primary-size axis: `s` is the default for stand-alone readouts (a
 * scannable label should not sit at the smallest permitted size), `xs` the
 * default for dense list rows. Values outside `xs`/`s` are not part of the
 * design and are not rejected, but their metrics are unspecified.
 */
export interface ReadoutLabelOptions {
  /** Label typography size — `xs` (dense rows) or `s` (stand-alone readouts). */
  size?: ObcTextboxSize;
  /** Longest expected label to reserve width for (aligns stacked readouts). */
  spaceReserver?: string;
}

/**
 * Emphasis / alert state of the source chip (Figma 6.1 "Readout-block-source"
 * State axis; `static`/`enabled` map to `regular`).
 * TODO(designer): the sheet also carries a `Tag` type (xs chip) and an alarm
 * state is absent by design; both left out here.
 */
export enum ReadoutSourceState {
  regular = 'regular',
  enhanced = 'enhanced',
  caution = 'caution',
  warning = 'warning',
}

export interface ReadoutSrcOptions extends ReadoutBlockState {
  /** Longest expected source string to reserve width for; see {@link ReadoutReserverOptions.spaceReserver}. */
  spaceReserver?: string;
  /**
   * Emphasis / alert state of the source: `enhanced` renders the amplified
   * chip, `caution` / `warning` the matching alert chip. Like the
   * data-quality chip it uses `outline`, so toggling it never shifts the row.
   */
  state?: ReadoutSourceState;
  /**
   * Source deviation (Figma "Source-deviation"): renders a Δ + value line
   * under the source name. A non-finite value renders no line.
   */
  deviation?: number;
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
 * - **Text values:** `valueType="text"` renders `value` verbatim (e.g.
 *   `"Thermo On"`) instead of formatting it as a number.
 *
 * ### Usage Guidelines
 * Use for dense readout rows in lists/tables. Prefer `<obc-readout>` for rich
 * multi-segment instrument layouts, source pickers, or flyout behaviour.
 *
 * @experimental This component is the pilot for the new primitives + per-block
 * options Readout API; its API may change in a future release.
 *
 * ### Slots
 * | Slot Name        | Renders When                  | Purpose                                    |
 * |------------------|-------------------------------|--------------------------------------------|
 * | leading-content  | always                        | Free content column before the label.      |
 * | leading-icon     | `hasLeadingIcon`              | Icon before the label.                     |
 * | value-icon       | `valueOptions.hasIcon`        | Icon before the value.                     |
 * | setpoint-icon    | `hasSetpoint`                 | Overrides the default setpoint icon.       |
 * | advice-icon      | `hasAdvice`                   | Overrides the default advice icon.         |
 * | trailing-content | always                        | Free content column after the source.      |
 *
 * ### Free content columns
 * `leading-content` / `trailing-content` take arbitrary content — an indicator,
 * a mini chart, anything — in a fixed-width column at either end of the row.
 * Width comes from `--obc-readout-list-item-leading-content-width` /
 * `--obc-readout-list-item-trailing-content-width` (both default to the minimum
 * touch target, 48px), NOT from the content's own size, so the column stays
 * predictable across rows.
 *
 * Slotted content is display only: the row renders it and reserves its column,
 * but pushes no state into it. A slotted indicator's `value` (and its state /
 * priority / data quality) is a separate binding the consumer owns, so keep it
 * in step with the row's own `value` — nothing here does that for you.
 *
 * An empty slot generates no box and therefore no gap, so rows that slot
 * nothing are laid out exactly as before. Rows that leave a column empty while
 * their neighbours fill it must reserve the same width to stay aligned — see
 * {@link hasLeadingContentSpacer}. Inside `obc-readout-list` that is automatic.
 *
 * @slot leading-content - Free content column before the label (e.g. an indicator).
 * @slot leading-icon - Icon before the label.
 * @slot value-icon - Icon before the value.
 * @slot setpoint-icon - Overrides the default setpoint icon.
 * @slot advice-icon - Overrides the default advice icon.
 * @slot trailing-content - Free content column after the source (e.g. a mini chart).
 * @fires click - Fired when the item is activated. Only fired when `clickable` is set; otherwise the item renders as a non-interactive `<div>`.
 */
@customElement('obc-readout-list-item')
export class ObcReadoutListItem extends LitElement {
  // Primitives (dynamic data)
  @property({type: String}) label?: string;
  @property({type: String}) unit?: string;
  @property({type: String}) src?: string;

  /**
   * Layout switch: `false` renders a deliberately value-less (label-only)
   * row that hugs its remaining parts. For a temporarily missing value keep
   * `hasValue` and set `value` to `null` instead — the dash keeps the value
   * block at full size, so the row does not shift when data arrives.
   */
  @property({type: Boolean, attribute: false}) hasValue = true;
  /**
   * The value; `null` renders a dash. A number by default, or text when
   * {@link valueType} is `text`.
   */
  @property({type: String}) value: number | string | null = null;
  /**
   * How {@link value} is interpreted. `number` (default) formats it via
   * `fractionDigits`; `text` renders it verbatim and ignores the numeric
   * format options. Passing text while this is `number` throws.
   */
  @property({type: String}) valueType: ReadoutValueType =
    ReadoutValueType.number;
  /** Render the value as `offText` (e.g. equipment powered down). Affects the value only. */
  @property({type: Boolean}) off = false;
  /** Text shown in place of the value when `off` is true. @availableWhen off==true */
  @property({type: String}) offText = 'OFF';

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
  /**
   * Reserve the `leading-content` column on a row that slots nothing into it, so
   * its label and value stay aligned with the rows that do. The reserve is the
   * same width the column would have, and is ignored while the row has its own
   * leading content. `obc-readout-list` sets this for you; set it by hand for a
   * stand-alone group of rows.
   */
  @property({type: Boolean}) hasLeadingContentSpacer = false;
  /** Reserve the `trailing-content` column; see {@link hasLeadingContentSpacer}. */
  @property({type: Boolean}) hasTrailingContentSpacer = false;
  /**
   * Also formats the numeric setpoint / advice blocks, which stay numeric
   * even when the value is text. Must be between 0 and 100 — the range
   * `Number.prototype.toFixed` accepts; outside it throws a `RangeError`.
   * A fractional count truncates (`2.7` → `2`). A count that never arrived
   * (`NaN`, `null` or unset) renders the reading as the unavailable dash —
   * formatting with a precision the author never chose would let a critical
   * `0.4` pass for a healthy `0`.
   * @availableWhen valueType==number || hasSetpoint==true || hasAdvice==true
   */
  @property({type: Number}) fractionDigits = 0;
  /**
   * Also formats the numeric setpoint / advice blocks, which stay numeric
   * even when the value is text. Bounded before use: a fractional count
   * truncates (`2.7` → `2`), anything above 100 — including `Infinity` —
   * caps at 100, and a negative count reserves nothing. A count that never
   * arrived (`NaN`, `null` or unset) renders the reading as the unavailable
   * dash, consistent with `fractionDigits`.
   * @availableWhen valueType==number || hasSetpoint==true || hasAdvice==true
   */
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
  @property({type: Object}) labelOptions?: ReadoutLabelOptions;
  @property({type: Object}) unitOptions?: ReadoutReserverOptions;
  @property({type: Object}) srcOptions?: ReadoutSrcOptions;

  /**
   * Development aid: outline the readout building blocks (red), the degree
   * columns (blue) and the degree spacer (green) so reserver widths / alignment
   * are visible. Off by default.
   */
  @property({type: Boolean, reflect: true}) showDebugOverlay = false;

  /**
   * Whether either free content column currently has slotted content. Tracked
   * only to suppress the matching spacer — a row that fills the column must not
   * also reserve a second one when a stale `has*ContentSpacer` is left set.
   */
  @state() private hasSlottedLeadingContent = false;
  @state() private hasSlottedTrailingContent = false;

  /** Pop-up deferred-hide phase for the setpoint (see {@link updated}). */
  @state() private deferredSetpointHidePhase: ReadoutBlockHidePhase =
    ReadoutBlockHidePhase.none;
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
    return resolveReadoutDigitCount(this.maxDigits);
  }

  /**
   * Whether a digit knob failed to arrive (`NaN` / `null` / `undefined`).
   * The raw knobs are forwarded to the blocks, which render the reading as
   * the unavailable dash (see `obc-readout-block.digitCountsMissing`); this
   * getter only keeps the setpoint comparison in agreement with what is
   * displayed.
   */
  private get digitCountsMissing(): boolean {
    return (
      isReadoutDigitCountMissing(this.fractionDigits) ||
      isReadoutDigitCountMissing(this.maxDigits)
    );
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
    if (!this.hasSetpoint) {
      return false;
    }
    // A missing digit knob renders every numeric block as the dash; two
    // dashes must not read as "at the setpoint", so the comparison stays off
    // entirely while the configuration is untrustworthy.
    if (this.digitCountsMissing) {
      return false;
    }
    // A text value never compares equal to a setpoint, so flip-flop / pop-up
    // stay dormant for `valueType="text"`.
    return isDisplayedAtSetpoint(
      resolveReadoutNumericValue(this.value, this.valueType) ?? null,
      this.setpoint,
      this.numericFormatOptions(this.resolvedMaxDigits)
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

  private get isEqualSize(): boolean {
    return (
      this.resolvedSetpointInteraction ===
      ReadoutListItemSetpointInteraction.equalSize
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
    return readoutPrimarySize(this.resolvedSize);
  }

  /** Secondary (de-emphasised) value-typography size for the current density tier. */
  private get secondarySize(): ObcTextboxSize {
    return readoutSecondarySize(this.resolvedSize);
  }

  private get valueSize(): ObcTextboxSize {
    // The value de-emphasises (secondary size) whenever the setpoint is the
    // focus — while actively adjusting (`touching`) or while a flip-flop holds
    // the value away from the setpoint. So "grab the setpoint" shrinks the value for
    // the whole adjustment (initiate + move read the same: setpoint big, value
    // small), mirroring the flip-flop convention. `equal-size` opts out: both
    // blocks always hold the primary size, even while touching.
    return readoutValueSize({
      primary: this.primarySize,
      secondary: this.secondarySize,
      setpointEmphasized: this.isSetpointEmphasized,
      equalSize: this.isEqualSize,
    });
  }

  private get setpointSize(): ObcTextboxSize {
    return readoutSetpointSize({
      primary: this.primarySize,
      secondary: this.secondarySize,
      emphasized: this.isSetpointEmphasized,
      equalSize: this.isEqualSize,
    });
  }

  /** Value font weight passes straight to obc-textbox; regular when unset. Colour is separate. */
  private get valueWeight(): ObcTextboxFontWeight {
    return this.valueOptions?.weight ?? ObcTextboxFontWeight.regular;
  }

  /** Label size: `xs` for dense list rows unless overridden (see {@link ReadoutLabelOptions}). */
  private get labelSize(): ObcTextboxSize {
    return this.labelOptions?.size ?? ObcTextboxSize.xs;
  }

  /**
   * Label weight: SemiBold only for enhanced (in-command) rows, regular
   * otherwise — the designer reduced the amount of semibold in the interface
   * (Figma 6.1 review).
   */
  private get labelWeight(): ObcTextboxFontWeight {
    return this.rowEnhanced
      ? ObcTextboxFontWeight.semibold
      : ObcTextboxFontWeight.regular;
  }

  /** Setpoint is SemiBold only while emphasised, otherwise regular weight. */
  private get setpointWeight(): ObcTextboxFontWeight {
    return readoutSetpointWeight(this.isSetpointEmphasized);
  }

  private numericFormatOptions(maxDigits: number): ReadoutNumericFormatOptions {
    return readoutNumericFormatOptions(maxDigits, this.resolvedFractionDigits);
  }

  /** classMap fragment for a block / source carrying per-block data quality. */
  private dataQualityClasses(
    dataQuality: ReadoutListItemDataQuality | undefined
  ): Record<string, boolean> {
    return readoutDataQualityClasses(dataQuality);
  }

  /**
   * Forward the matching list-item icon slot into the block's single `icon`
   * slot. The variant's default marker lives in `obc-readout-block` and shows
   * when nothing is assigned here (an empty forwarded slot flattens to nothing).
   */
  private renderForwardedIcon(variant: ReadoutBlockVariant): TemplateResult {
    if (variant === ReadoutBlockVariant.setpoint) {
      return html`<slot name="setpoint-icon" slot="icon"></slot>`;
    }
    if (variant === ReadoutBlockVariant.advice) {
      return html`<slot name="advice-icon" slot="icon"></slot>`;
    }
    return html`<slot name="value-icon" slot="icon"></slot>`;
  }

  private renderBlock(config: {
    variant: ReadoutBlockVariant;
    value: number | string | null | undefined;
    /** Only the value block is ever text; setpoint / advice stay numeric. */
    valueType?: ReadoutValueType;
    valueSize: ObcTextboxSize;
    enhanced: boolean;
    weight: ObcTextboxFontWeight;
    hintedZeros: boolean;
    spaceReserver?: string;
    off?: boolean;
    hasDegree?: boolean;
    hasIcon?: boolean;
    touching?: boolean;
    hidePhase?: ReadoutBlockHidePhase;
    dataQuality?: ReadoutBlockDataQuality;
    alert?: false | AlertFrameConfig;
    /** Advice-only: semantic category + triggered state. */
    category?: ReadoutAdviceCategory;
    active?: boolean;
  }): TemplateResult {
    // The block owns the formatting, hinted zeros, reserver, degree and icon; the
    // row keeps the density tier (`size`) and the resolved per-block number size
    // (`valueSize`) so flip-flop/pop-up emphasis stays a row decision.
    return html`
      <obc-readout-block
        exportparts="block, block-content, block-text, block-icon, degree"
        .variant=${config.variant}
        .value=${config.value ?? null}
        .valueType=${config.valueType ?? ReadoutValueType.number}
        .size=${this.resolvedSize}
        .valueSize=${config.valueSize}
        .enhanced=${config.enhanced}
        .weight=${config.weight}
        .hasDegree=${config.hasDegree ?? false}
        .hasIcon=${config.hasIcon ?? false}
        .fractionDigits=${this.fractionDigits}
        .maxDigits=${this.maxDigits}
        .hintedZeros=${config.hintedZeros}
        .spaceReserver=${config.spaceReserver}
        .off=${config.off ?? false}
        .offText=${this.offText}
        .touching=${config.touching ?? false}
        .hidePhase=${config.hidePhase ?? ReadoutBlockHidePhase.none}
        .dataQuality=${config.dataQuality}
        .alert=${config.alert ?? false}
        .category=${config.category ?? ReadoutAdviceCategory.regular}
        .active=${config.active ?? false}
      >
        ${this.renderForwardedIcon(config.variant)}
      </obc-readout-block>
    `;
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
    // The label carries its own size (labelOptions) and priority-driven weight;
    // unit and source stay xs / regular.
    const weight =
      role === 'label' ? this.labelWeight : ObcTextboxFontWeight.regular;
    const size = role === 'label' ? this.labelSize : ObcTextboxSize.xs;
    const box = html`
      <obc-textbox
        class=${classMap({
          [role]: true,
          ...this.dataQualityClasses(state?.dataQuality),
        })}
        part=${role}
        .size=${size}
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
    const setpointHidePhase = resolveSetpointHidePhase(
      popUpAtSetpoint,
      this.deferredSetpointHidePhase
    );
    return html`
      <div class="value-cluster" part="value-cluster">
        ${this.hasAdvice
          ? this.renderBlock({
              variant: ReadoutBlockVariant.advice,
              value: this.advice,
              valueSize: this.secondarySize,
              enhanced: false,
              weight: ObcTextboxFontWeight.regular,
              hintedZeros: this.adviceOptions?.hintedZeros ?? false,
              spaceReserver: this.adviceOptions?.spaceReserver,
              hasDegree: this.hasDegree ?? false,
              dataQuality: this.adviceOptions?.dataQuality,
              alert: this.adviceOptions?.alert,
              category: this.adviceOptions?.category,
              active: this.adviceOptions?.active,
            })
          : nothing}
        ${this.hasSetpoint
          ? this.renderBlock({
              variant: ReadoutBlockVariant.setpoint,
              value: this.setpoint,
              valueSize: this.setpointSize,
              // Value and setpoint share the enhanced colour state (both neutral
              // or both enhanced); the setpoint is bold only while emphasised.
              enhanced: this.rowEnhanced,
              weight: this.setpointWeight,
              hintedZeros: this.setpointOptions?.hintedZeros ?? false,
              spaceReserver: this.setpointOptions?.spaceReserver,
              hasDegree: this.hasDegree ?? false,
              touching: this.setpointTouching,
              hidePhase: setpointHidePhase,
              dataQuality: this.setpointOptions?.dataQuality,
              alert: this.setpointOptions?.alert,
            })
          : nothing}
        ${this.renderValueReading()}
      </div>
    `;
  }

  /**
   * The value reading: the value block, its degree column and the trailing unit
   * grouped in one relatively-positioned wrapper so the value alert frame AND the
   * value data-quality chip can wrap value + degree + unit together (Figma
   * 58:10120).
   *
   * Moving the degree / unit into this wrapper (the new last child of
   * `.value-cluster`) preserves every existing gap, so the underlying content
   * stays column-aligned with or without the frame / chip. Both the value alert
   * (overlay) and the value data-quality chip are applied here — NOT inside
   * `obc-readout-block` — so they extend over the unit; setpoint/advice keep their
   * own block-level frame and chip. The chip uses `outline` (not `border`), so it
   * never shifts the value's width / column alignment.
   */
  private renderValueReading(): TemplateResult {
    return html`
      <div
        class=${classMap({
          'value-reading': true,
          ...this.dataQualityClasses(this.valueOptions?.dataQuality),
        })}
        part="value-reading"
      >
        ${this.hasValue
          ? this.renderBlock({
              variant: ReadoutBlockVariant.value,
              value: this.value,
              valueType: this.valueType,
              valueSize: this.valueSize,
              enhanced: this.rowEnhanced,
              weight: this.valueWeight,
              hintedZeros: this.valueOptions?.hintedZeros ?? false,
              spaceReserver: this.valueOptions?.spaceReserver,
              off: this.off,
              hasIcon: this.valueOptions?.hasIcon ?? false,
            })
          : nothing}
        ${this.renderValueUnitGap()}
        <div class="unit-area" part="unit-area">
          ${this.renderTrailingUnit()} ${this.renderDegreeSpacer()}
        </div>
        ${this.renderValueAlertOverlay()}
      </div>
    `;
  }

  /**
   * The value alert frame, drawn as a pure overlay around the value reading
   * (value + degree + unit). It reserves no space — the `obc-alert-frame` sits in
   * an absolutely-positioned box offset outward (see `.value-alert-overlay` in
   * the CSS) so its stroke is centred on the 4px/2px padding line and toggling it
   * never shifts content or row height. Renders only when `valueOptions.alert` is
   * a config object.
   */
  private renderValueAlertOverlay(): TemplateResult | typeof nothing {
    const alert = this.valueOptions?.alert;
    if (typeof alert !== 'object' || alert === null) {
      return nothing;
    }
    const thickness = alert.thickness ?? ObcAlertFrameThickness.Small;
    return html`
      <div
        class=${classMap({
          'value-alert-overlay': true,
          // The outward offset is thickness-dependent (see the CSS): large frames
          // draw a wider outline, so the box must sit further out to stay centred.
          'thickness-large': thickness === ObcAlertFrameThickness.Large,
        })}
        aria-hidden="true"
      >
        <obc-alert-frame
          part="value-alert-frame"
          .type=${alert.type ?? ObcAlertFrameType.Regular}
          .thickness=${thickness}
          .status=${alert.status ?? AlertType.Alarm}
          .mode=${alert.mode ?? ObcAlertFrameMode.ackedActive}
          .showIcon=${alert.showIcon ?? false}
          .showAlertCategoryIcon=${alert.showAlertCategoryIcon ?? true}
          .wrapContent=${false}
          .fullWidth=${false}
        ></obc-alert-frame>
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
          ${this.label
            ? this.renderTextbox(
                'label',
                this.label,
                this.labelOptions?.spaceReserver
              )
            : nothing}
          ${showLeadingUnit
            ? this.renderTextbox(
                'unit',
                this.unit ?? '',
                this.unitOptions?.spaceReserver
              )
            : nothing}
          ${showLeadingSrc ? this.renderSourceBlock() : nothing}
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

  /**
   * The source text plus its optional state chip and deviation line. The
   * plain (regular, no-deviation) case renders the bare textbox — byte-for-
   * byte the pre-6.1 output; a state or a deviation wraps it in the
   * `.source-block` stack.
   */
  private renderSourceBlock(): TemplateResult {
    const state = this.srcOptions?.state ?? ReadoutSourceState.regular;
    const deviation = this.srcOptions?.deviation;
    const hasDeviation = deviation !== undefined && Number.isFinite(deviation);
    const box = this.renderTextbox(
      'source',
      this.src ?? '',
      this.srcOptions?.spaceReserver,
      this.srcOptions
    );
    if (state === ReadoutSourceState.regular && !hasDeviation) {
      return box;
    }
    return html`
      <div
        class=${classMap({
          'source-block': true,
          [`source-state-${state}`]: state !== ReadoutSourceState.regular,
        })}
        part="source-block"
      >
        ${box}
        ${hasDeviation
          ? html`<span class="source-deviation">
              <obi-delta aria-hidden="true"></obi-delta>
              <obc-textbox
                class="source-deviation-value"
                .size=${ObcTextboxSize.xs}
                .tabularNums=${true}
                alignment="left"
                >${deviation}</obc-textbox
              >
            </span>`
          : nothing}
      </div>
    `;
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
      ${this.renderSourceBlock()}
    `;
  }

  /**
   * A free content column at either end of the row.
   *
   * The `<slot>` is rendered unconditionally: an unfilled slot is
   * `display: contents`, so it generates no box and — crucially — no
   * `.content` gap, leaving a row that slots nothing laid out exactly as it was
   * before these columns existed. When content IS assigned, the slotted element
   * becomes the flex item itself and the CSS gives it the column width, so the
   * row never has to measure it.
   *
   * The spacer is a separate empty box of the same width, rendered only for a
   * row that reserves the column without filling it (see
   * {@link hasLeadingContentSpacer}) — the same trick as
   * {@link renderDegreeSpacer}, one column further out.
   */
  private renderSlottedColumn(
    position: 'leading' | 'trailing'
  ): TemplateResult {
    const isLeading = position === 'leading';
    const hasContent = isLeading
      ? this.hasSlottedLeadingContent
      : this.hasSlottedTrailingContent;
    const reserve = isLeading
      ? this.hasLeadingContentSpacer
      : this.hasTrailingContentSpacer;
    const spacer =
      reserve && !hasContent
        ? html`<span
            class="content-spacer ${position}-content-spacer"
            part="${position}-content-spacer"
            aria-hidden="true"
          ></span>`
        : nothing;
    const slot = html`<slot
      name="${position}-content"
      @slotchange=${this.handleContentSlotChange}
    ></slot>`;
    // The spacer stands in for the column, so it sits on the same side of the
    // row the column itself would occupy.
    return isLeading ? html`${spacer}${slot}` : html`${slot}${spacer}`;
  }

  private handleContentSlotChange = (event: Event): void => {
    const slot = event.target as HTMLSlotElement;
    const filled = slot
      .assignedNodes({flatten: true})
      .some(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE ||
          (node.textContent ?? '').trim() !== ''
      );
    if (slot.name === 'leading-content') {
      this.hasSlottedLeadingContent = filled;
    } else {
      this.hasSlottedTrailingContent = filled;
    }
  };

  private renderContent(): TemplateResult {
    return html`
      <div class="content" part="content">
        ${this.renderSlottedColumn('leading')} ${this.renderLabelContainer()}
        <div class="value-area" part="value-area">
          ${this.renderValueCluster()}
        </div>
        ${this.renderTrailingSource()} ${this.renderSlottedColumn('trailing')}
      </div>
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
    assertReadoutValueType('obc-readout-list-item', this.value, this.valueType);
    assertReadoutFractionDigits('obc-readout-list-item', this.fractionDigits);
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
      this.deferredSetpointHidePhase = shouldHide
        ? ReadoutBlockHidePhase.hidden
        : ReadoutBlockHidePhase.none;
      return;
    }

    if (!shouldHide) {
      this.clearDeferredSetpointHide();
      return;
    }

    if (this.deferredSetpointHidePhase !== ReadoutBlockHidePhase.none) {
      return;
    }

    this.deferredSetpointHidePhase = ReadoutBlockHidePhase.hiding;
    window.clearTimeout(this.deferredSetpointHideTimer);
    this.deferredSetpointHideTimer = window.setTimeout(() => {
      this.deferredSetpointHidePhase = ReadoutBlockHidePhase.hidden;
      this.deferredSetpointHideTimer = undefined;
    }, 100);
  }

  private clearDeferredSetpointHide(): void {
    if (this.deferredSetpointHidePhase !== ReadoutBlockHidePhase.none) {
      this.deferredSetpointHidePhase = ReadoutBlockHidePhase.none;
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
    if (this.deferredSetpointHidePhase === ReadoutBlockHidePhase.hiding) {
      this.deferredSetpointHidePhase = ReadoutBlockHidePhase.hidden;
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
