import {LitElement, html, nothing, unsafeCSS, type TemplateResult} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './readout.css?inline';
import {customElement} from '../../decorator.js';
import '../../components/textbox/textbox.js';
import {
  ObcTextboxSize,
  ObcTextboxFontWeight,
} from '../../components/textbox/textbox.js';
import '../../building-blocks/readout-block/readout-block.js';
import {
  ReadoutBlockVariant,
  ReadoutBlockSize,
  ReadoutBlockDataQuality,
  ReadoutBlockHidePhase,
} from '../../building-blocks/readout-block/readout-block.js';
import {
  ReadoutListItemSetpointInteraction,
  type ReadoutBlockState,
  type ReadoutValueOptions,
  type ReadoutSetpointOptions,
  type ReadoutAdviceOptions,
  type ReadoutReserverOptions,
  type ReadoutSrcOptions,
} from '../readout-list-item/readout-list-item.js';
import {Priority} from '../types.js';
import {type ReadoutNumericFormatOptions} from './readout-formatters.js';
import {
  isDisplayedAtSetpoint,
  readoutNumericFormatOptions,
  readoutPrimarySize,
  readoutSecondarySize,
  readoutSetpointWeight,
  readoutDataQualityClasses,
  resolveSetpointHidePhase,
} from './readout-shared.js';
import {
  type AlertFrameConfig,
  wrapWithAlertFrame,
  ObcAlertFrameType,
  ObcAlertFrameThickness,
  ObcAlertFrameMode,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';
import '../../components/button/button.js';
import '../../components/context-menu-input/context-menu-input.js';
import {
  ContextMenuType,
  type ContextMenuOption,
  type ObcContextMenuInputItemClickEvent,
} from '../../components/context-menu-input/context-menu-input.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-drop-down-google.js';

// Re-exported so consumers configure the readout without a second import path.
// The option interfaces and enums are shared with `obc-readout-list-item` on
// purpose: the two components are layout variants of the same primitives +
// per-block options API and may merge in a future release.
export {ObcTextboxFontWeight} from '../../components/textbox/textbox.js';
export type {
  ReadoutBlockState,
  ReadoutValueOptions,
  ReadoutSetpointOptions,
  ReadoutAdviceOptions,
  ReadoutReserverOptions,
  ReadoutSrcOptions,
} from '../readout-list-item/readout-list-item.js';

/**
 * Density/size scale of the readout (an alias of `ReadoutBlockSize`).
 * - `small`: regular value typography (smallest, densest).
 * - `medium`: medium value typography.
 * - `large`: large value typography.
 */
export const ReadoutSize = ReadoutBlockSize;
export type ReadoutSize = ReadoutBlockSize;

/**
 * Colour emphasis of the value (an alias of the shared instrument `Priority`;
 * same values as `ReadoutListItemPriority`).
 * - `regular`: neutral.
 * - `enhanced`: accented (in-command) colour.
 */
export const ReadoutPriority = Priority;
export type ReadoutPriority = Priority;

/**
 * Measurement quality of the value (an alias of `ReadoutBlockDataQuality`).
 * Orthogonal to the readout-level `alert` – a low-integrity or invalid value
 * can also sit inside an alert frame.
 */
export const ReadoutDataQuality = ReadoutBlockDataQuality;
export type ReadoutDataQuality = ReadoutBlockDataQuality;

/**
 * How the setpoint segment behaves relative to the value (an alias of
 * `ReadoutListItemSetpointInteraction`).
 * - `always-visible` (default): the setpoint is always shown.
 * - `flip-flop`: value and setpoint swap emphasis (size) as the value reaches
 *   the setpoint.
 * - `pop-up`: the setpoint is shown only while the value has not reached it,
 *   then fades out (100ms) once value === setpoint.
 */
export const ReadoutSetpointInteraction = ReadoutListItemSetpointInteraction;
export type ReadoutSetpointInteraction = ReadoutListItemSetpointInteraction;

/**
 * Flow direction of the readout.
 * - `vertical` (default): advice / setpoint / value stack on top of the
 *   label+unit meta zone and the source row (Figma "Readout Group / Vertical"
 *   and "Readout Stack").
 * - `horizontal`: all segments flow on one cap-height-aligned row, with the
 *   label stacked over the unit beside the value (Figma "Readout Group /
 *   Horizontal").
 */
export enum ReadoutDirection {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

/**
 * Arrangement of the label/unit meta zone in a vertical readout.
 * - `inline` (default): label and unit share one row below the value (Figma
 *   "Readout Group / Vertical").
 * - `stacked`: label and unit render on separate rows (Figma "Readout Stack"),
 *   arranged by `alignment`.
 */
export enum ReadoutStacking {
  inline = 'inline',
  stacked = 'stacked',
}

/**
 * Cross-axis alignment of a stacked vertical readout (Figma "Readout Stack"
 * Alignment axis).
 * - `vertical` (default): right-aligned column.
 * - `left`: left-aligned column.
 * - `center`: centered column.
 */
export enum ReadoutAlignment {
  vertical = 'vertical',
  left = 'left',
  center = 'center',
}

/**
 * Interactivity of the source row.
 * - `none` (default): plain source text (same rendering as
 *   `obc-readout-list-item`).
 * - `picker`: a flat button with a drop-down icon that opens a context menu
 *   built from the `src-picker-content` slot; selecting an option fires
 *   `source-change`.
 * - `flyout`: a flat button with a chevron icon that fires
 *   `source-flyout-click`.
 */
export enum ReadoutSourceInteraction {
  none = 'none',
  picker = 'picker',
  flyout = 'flyout',
}

/**
 * Per-source options. Extends the shared per-block state (data quality, alert,
 * space reserver) with the readout's source interactivity.
 */
export interface ReadoutSourceOptions extends ReadoutSrcOptions {
  /** Interactivity of the source row (default `none`). */
  interaction?: ReadoutSourceInteraction;
}

/**
 * `<obc-readout>` – An instrument readout: a value with optional setpoint,
 * advice, label, unit, and source, arranged vertically or horizontally.
 *
 * A layout sibling of `<obc-readout-list-item>` built from the same
 * cap-height "readout building blocks" (`obc-readout-block`): dynamic data is
 * passed as top-level primitives (`value`, `setpoint`, `advice`, `label`,
 * `unit`, `src`), global layout/format via top-level props (`size`,
 * `priority`, `direction`, `stacking`, `alignment`, `hasDegree`,
 * `dataQuality`, `alert`, …) and per-block tweaks via one object per block
 * (`valueOptions`, `setpointOptions`, `adviceOptions`, `unitOptions`,
 * `srcOptions`).
 *
 * ### Features
 * - **Building blocks:** value, optional setpoint, and optional advice
 *   segments, each cap-height-aligned and able to reserve a stable width.
 * - **Sizes:** `small`, `medium`, `large` density scales.
 * - **Direction:** `vertical` (blocks above a label+unit meta zone and source
 *   row) or `horizontal` (all segments on one row).
 * - **Stacking & alignment:** vertical readouts arrange label/unit `inline`
 *   or `stacked`; stacked readouts align `vertical` (right), `left`, or
 *   `center`.
 * - **Priority:** `regular`/`enhanced` colour emphasis; per-value `weight`
 *   is independent of colour.
 * - **Setpoint interactions:** `always-visible`, `flip-flop` (emphasis swap),
 *   and `pop-up` (fade-out at setpoint), plus the `touching` focus state.
 * - **Data quality:** `low-integrity`/`invalid` styling, per block or for the
 *   whole readout, combinable with `alert`.
 * - **Alert frame:** optional `alert` wrapper (caution/warning/alarm/level).
 * - **Source:** plain text by default; opt-in `picker` (context menu) or
 *   `flyout` interactivity via `srcOptions.interaction`.
 * - **Formatting:** shared `fractionDigits`, width reservation via
 *   `maxDigits` and per-segment `hintedZeros`; a `null` value renders a dash.
 *
 * ### Usage Guidelines
 * Use for stand-alone instrument readouts and readouts embedded in
 * instruments. Prefer `<obc-readout-list-item>` for dense rows in
 * lists/tables (label left, value right) and `<obc-readout-list>` for
 * auto-aligned groups of rows.
 *
 * @experimental Part of the primitives + per-block options Readout API pilot;
 * the API may change in a future release.
 *
 * ### Slots
 * | Slot Name          | Renders When                          | Purpose                              |
 * |--------------------|---------------------------------------|--------------------------------------|
 * | value-icon         | `valueOptions.hasIcon`                | Icon before the value.               |
 * | setpoint-icon      | `hasSetpoint`                         | Overrides the default setpoint icon. |
 * | advice-icon        | `hasAdvice`                           | Overrides the default advice icon.   |
 * | src-picker-content | `srcOptions.interaction == 'picker'`  | Source picker context-menu content.  |
 *
 * @fires source-change {CustomEvent<{value: string, label?: string}>} Fired when a source picker option is selected.
 * @fires source-flyout-click {CustomEvent<{src: string}>} Fired when the source row is clicked while `srcOptions.interaction == 'flyout'`.
 *
 * @slot value-icon - Icon before the value.
 * @slot setpoint-icon - Overrides the default setpoint icon.
 * @slot advice-icon - Overrides the default advice icon.
 * @slot src-picker-content - Provides the source picker context menu content.
 */
@customElement('obc-readout')
export class ObcReadout extends LitElement {
  // Primitives (dynamic data)
  @property({type: String}) label?: string;
  @property({type: String}) unit?: string;
  @property({type: String}) src?: string;

  /**
   * Layout switch: `false` renders a deliberately value-less (label-only)
   * readout that hugs its remaining parts. For a temporarily missing value
   * keep `hasValue` and set `value` to `null` instead — the dash keeps the
   * value block at full size, so the layout does not shift when data arrives.
   */
  @property({type: Boolean, attribute: false}) hasValue = true;
  @property({type: Number}) value: number | null = null;
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
  @property({type: String}) size?: ReadoutSize;
  @property({type: String}) priority?: ReadoutPriority;
  @property({type: String}) direction?: ReadoutDirection;
  /** @availableWhen direction==vertical */
  @property({type: String}) stacking?: ReadoutStacking;
  /** @availableWhen direction==vertical && stacking==stacked */
  @property({type: String}) alignment?: ReadoutAlignment;
  @property({type: Boolean}) hasDegree = false;
  /** @availableWhen hasDegree==false */
  @property({type: Boolean}) hasDegreeSpacer = false;
  @property({type: Number}) fractionDigits = 0;
  @property({type: Number}) maxDigits = 0;
  @property({type: String}) dataQuality?: ReadoutDataQuality;
  // `boolean | …` (not `false | …`): the generated Angular wrapper widens a
  // literal-`false` union to `boolean`, which then won't assign back to a
  // `false`-typed element property. `wrapWithAlertFrame` treats any non-object
  // (incl. `true`) as "no frame", so accepting `boolean` is harmless.
  @property({type: Object}) alert: boolean | AlertFrameConfig = false;

  // Per-block configuration — one object per block (see the Readout*Options types).
  /** @availableWhen hasValue==true */
  @property({type: Object}) valueOptions?: ReadoutValueOptions;
  /** @availableWhen hasSetpoint==true */
  @property({type: Object}) setpointOptions?: ReadoutSetpointOptions;
  /** @availableWhen hasAdvice==true */
  @property({type: Object}) adviceOptions?: ReadoutAdviceOptions;
  /** @availableWhen unit!='' */
  @property({type: Object}) unitOptions?: ReadoutReserverOptions;
  /** @availableWhen src!='' */
  @property({type: Object}) srcOptions?: ReadoutSourceOptions;

  /**
   * Development aid: outline the readout building blocks (red), the degree
   * columns (blue) and the degree spacer (green) so reserver widths / alignment
   * are visible. Off by default.
   */
  @property({type: Boolean, reflect: true}) showDebugOverlay = false;

  /** Pop-up deferred-hide phase for the setpoint (see {@link updated}). */
  @state() private deferredSetpointHidePhase: ReadoutBlockHidePhase =
    ReadoutBlockHidePhase.none;
  private deferredSetpointHideTimer?: number;
  private hasCompletedFirstUpdate = false;

  @state() private sourcePickerContentVisible = false;
  @state() private sourcePickerOptions: ContextMenuOption[] = [];

  @query('slot[name="src-picker-content"]')
  private sourcePickerSlot?: HTMLSlotElement;

  private readonly onWindowPointerDown = (event: PointerEvent) => {
    if (!this.sourcePickerContentVisible) {
      return;
    }
    if (event.composedPath().includes(this)) {
      return;
    }
    this.sourcePickerContentVisible = false;
  };

  private get resolvedSize(): ReadoutSize {
    return this.size ?? ReadoutSize.small;
  }

  private get resolvedPriority(): ReadoutPriority {
    return this.priority ?? ReadoutPriority.regular;
  }

  private get resolvedDirection(): ReadoutDirection {
    return this.direction ?? ReadoutDirection.vertical;
  }

  private get resolvedStacking(): ReadoutStacking {
    return this.stacking ?? ReadoutStacking.inline;
  }

  private get resolvedAlignment(): ReadoutAlignment {
    return this.alignment ?? ReadoutAlignment.vertical;
  }

  private get isHorizontal(): boolean {
    return this.resolvedDirection === ReadoutDirection.horizontal;
  }

  private get resolvedFractionDigits(): number {
    return this.fractionDigits ?? 0;
  }

  private get resolvedMaxDigits(): number {
    return this.maxDigits ?? 0;
  }

  private get hasSrc(): boolean {
    return this.src !== undefined && this.src.trim() !== '';
  }

  private get resolvedSourceInteraction(): ReadoutSourceInteraction {
    return this.srcOptions?.interaction ?? ReadoutSourceInteraction.none;
  }

  private get isAtSetpoint(): boolean {
    if (!this.hasSetpoint) {
      return false;
    }
    return isDisplayedAtSetpoint(
      this.value,
      this.setpoint,
      this.numericFormatOptions(this.resolvedMaxDigits)
    );
  }

  private get resolvedSetpointInteraction(): ReadoutSetpointInteraction {
    return (
      this.setpointOptions?.interaction ??
      ReadoutSetpointInteraction.alwaysVisible
    );
  }

  private get isFlipFlop(): boolean {
    return (
      this.resolvedSetpointInteraction === ReadoutSetpointInteraction.flipFlop
    );
  }

  private get isPopUp(): boolean {
    return (
      this.resolvedSetpointInteraction === ReadoutSetpointInteraction.popUp
    );
  }

  private get setpointTouching(): boolean {
    return this.setpointOptions?.touching ?? false;
  }

  /**
   * Whether the setpoint interaction re-sizes or hides blocks at runtime —
   * flip-flop (emphasis swap) and pop-up (touch swap + fade-out) — the modes
   * that need the width/height reservation so the readout never shifts (see
   * {@link renderSetpointWidthReserve}).
   */
  private get hasDynamicSetpoint(): boolean {
    return this.hasSetpoint && (this.isFlipFlop || this.isPopUp);
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
   * The readout's enhanced (in-command) colour state, applied uniformly to BOTH
   * the value and the setpoint — they are always either both neutral or both
   * enhanced (never a blue setpoint next to a grey value). Driven by `priority`
   * only; `valueOptions.weight` changes weight, not colour.
   */
  private get rowEnhanced(): boolean {
    return this.resolvedPriority === ReadoutPriority.enhanced;
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
    // the value away from the setpoint — mirroring the flip-flop convention.
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
    return readoutSetpointWeight(this.isSetpointEmphasized);
  }

  private numericFormatOptions(maxDigits: number): ReadoutNumericFormatOptions {
    return readoutNumericFormatOptions(maxDigits, this.resolvedFractionDigits);
  }

  /** classMap fragment for a block / source carrying per-block data quality. */
  private dataQualityClasses(
    dataQuality: ReadoutDataQuality | undefined
  ): Record<string, boolean> {
    return readoutDataQualityClasses(dataQuality);
  }

  /**
   * Forward the matching readout icon slot into the block's single `icon`
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
    value: number | null | undefined;
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
    /**
     * Invisible width-reserving duplicate (see
     * {@link renderSetpointWidthReserve}): skips the forwarded icon slot so
     * the visible block keeps the slotted content — the block's default
     * marker has the same fixed tier width.
     */
    ghost?: boolean;
  }): TemplateResult {
    // The block owns the formatting, hinted zeros, reserver, degree and icon; the
    // readout keeps the density tier (`size`) and the resolved per-block number
    // size (`valueSize`) so flip-flop/pop-up emphasis stays a readout decision.
    return html`
      <obc-readout-block
        exportparts="block, block-content, block-text, block-icon, degree"
        .variant=${config.variant}
        .value=${config.value ?? null}
        .size=${this.resolvedSize}
        .valueSize=${config.valueSize}
        .enhanced=${config.enhanced}
        .weight=${config.weight}
        .hasDegree=${config.hasDegree ?? false}
        .hasIcon=${config.hasIcon ?? false}
        .fractionDigits=${this.resolvedFractionDigits}
        .maxDigits=${this.resolvedMaxDigits}
        .hintedZeros=${config.hintedZeros}
        .spaceReserver=${config.spaceReserver}
        .off=${config.off ?? false}
        .offText=${this.offText}
        .touching=${config.touching ?? false}
        .hidePhase=${config.hidePhase ?? ReadoutBlockHidePhase.none}
        .dataQuality=${config.dataQuality}
        .alert=${config.alert ?? false}
      >
        ${config.ghost ? nothing : this.renderForwardedIcon(config.variant)}
      </obc-readout-block>
    `;
  }

  /**
   * A cap-height `°` column whose width scales with the value size, rendered
   * after the value block. Setpoint / advice blocks render their own degree via
   * `obc-readout-block`.
   */
  private renderDegreeGlyph(size: ObcTextboxSize): TemplateResult {
    return html`
      <span
        class=${classMap({
          'degree-column': true,
          [`degree-${size}`]: true,
          'tone-enhanced': this.rowEnhanced,
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
   * The column rendered after the value digits:
   *
   * - `hasDegree`: a cap-height `°` column whose width scales with the value size.
   * - `hasDegreeSpacer` (non-degree readouts): an invisible reserve of the same
   *   width, so this readout's value digits stay aligned with degree readouts
   *   in the same column.
   */
  private renderDegreeColumn(
    size: ObcTextboxSize = this.valueSize
  ): TemplateResult | typeof nothing {
    if ((this.hasDegree ?? false) && !this.off) {
      return this.renderDegreeGlyph(size);
    }
    if (this.hasDegreeSpacer ?? false) {
      return html`<span
        class="degree-spacer"
        part="degree-spacer"
        aria-hidden="true"
      ></span>`;
    }
    return nothing;
  }

  private renderTextbox(
    role: 'label' | 'unit' | 'source',
    text: string,
    reserver?: string,
    blockState?: ReadoutBlockState
  ): TemplateResult {
    const weight =
      role === 'label'
        ? ObcTextboxFontWeight.semibold
        : ObcTextboxFontWeight.regular;
    const box = html`
      <obc-textbox
        class=${classMap({
          [role]: true,
          ...this.dataQualityClasses(blockState?.dataQuality),
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
    return wrapWithAlertFrame(blockState?.alert ?? false, box);
  }

  private get setpointHidePhase(): ReadoutBlockHidePhase {
    const popUpAtSetpoint =
      this.isPopUp && this.isAtSetpoint && !this.setpointTouching;
    return resolveSetpointHidePhase(
      popUpAtSetpoint,
      this.deferredSetpointHidePhase
    );
  }

  private renderAdviceBlock(): TemplateResult {
    return this.renderBlock({
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
    });
  }

  private renderSetpointBlock(): TemplateResult {
    return this.renderBlock({
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
      hidePhase: this.setpointHidePhase,
      dataQuality: this.setpointOptions?.dataQuality,
      alert: this.setpointOptions?.alert,
    });
  }

  /**
   * The value reading: the value block and its degree column (or spacer)
   * grouped in one relatively-positioned wrapper so the value alert frame AND
   * the value data-quality chip can wrap both together. Unlike
   * `obc-readout-list-item` the unit is not part of the reading — it lives in
   * the label/unit meta zone.
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
        ${this.renderBlock({
          variant: ReadoutBlockVariant.value,
          value: this.value,
          valueSize: this.valueSize,
          enhanced: this.rowEnhanced,
          weight: this.valueWeight,
          hintedZeros: this.valueOptions?.hintedZeros ?? false,
          spaceReserver: this.valueOptions?.spaceReserver,
          off: this.off,
          hasIcon: this.valueOptions?.hasIcon ?? false,
        })}
        ${this.renderDegreeColumn()} ${this.renderValueAlertOverlay()}
      </div>
    `;
  }

  /**
   * The value alert frame, drawn as a pure overlay around the value reading
   * (value + degree). It reserves no space — the `obc-alert-frame` sits in an
   * absolutely-positioned box offset outward (see `.value-alert-overlay` in the
   * CSS) so its stroke is centred on the 4px/2px padding line and toggling it
   * never shifts content. Renders only when `valueOptions.alert` is a config
   * object.
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

  /** The label/unit meta zone; `stacking` picks the inline or stacked arrangement. */
  private renderMetaZone(): TemplateResult | typeof nothing {
    if (!this.label && !this.unit) {
      return nothing;
    }
    // Horizontal readouts always stack the label over the unit beside the value.
    const stacked =
      this.isHorizontal || this.resolvedStacking === ReadoutStacking.stacked;
    return html`
      <div
        class=${classMap({
          meta: true,
          'meta-inline': !stacked,
          'meta-stacked': stacked,
        })}
        part="meta-wrapper"
      >
        ${this.label ? this.renderTextbox('label', this.label) : nothing}
        ${this.unit
          ? this.renderTextbox(
              'unit',
              this.unit,
              this.unitOptions?.spaceReserver
            )
          : nothing}
      </div>
    `;
  }

  private renderSourceContent(): TemplateResult {
    const interaction = this.resolvedSourceInteraction;
    const src = this.src ?? '';

    // The interactive variants keep the source's per-block state: the
    // data-quality chip moves onto the button and the alert frame wraps it,
    // matching the plain-text branch (renderTextbox) below.
    const buttonClasses = classMap({
      'source-button': true,
      ...this.dataQualityClasses(this.srcOptions?.dataQuality),
    });

    if (interaction === ReadoutSourceInteraction.picker) {
      const button = html`
        <obc-button
          class=${buttonClasses}
          variant="flat"
          .fullWidth=${false}
          showTrailingIcon
          @click=${() => {
            this.sourcePickerContentVisible = !this.sourcePickerContentVisible;
          }}
        >
          <obi-drop-down-google slot="trailing-icon"></obi-drop-down-google>
          ${src}
        </obc-button>
      `;
      return wrapWithAlertFrame(this.srcOptions?.alert ?? false, button);
    }

    if (interaction === ReadoutSourceInteraction.flyout) {
      const button = html`
        <obc-button
          class=${buttonClasses}
          variant="flat"
          .fullWidth=${false}
          showTrailingIcon
          @click=${() => {
            this.dispatchEvent(
              new CustomEvent('source-flyout-click', {
                bubbles: true,
                composed: true,
                detail: {src},
              })
            );
          }}
        >
          <obi-chevron-right-google
            slot="trailing-icon"
          ></obi-chevron-right-google>
          ${src}
        </obc-button>
      `;
      return wrapWithAlertFrame(this.srcOptions?.alert ?? false, button);
    }

    return this.renderTextbox(
      'source',
      src,
      this.srcOptions?.spaceReserver,
      this.srcOptions
    );
  }

  /** The source row (vertical) / segment (horizontal), with its auto divider. */
  private renderSource(): TemplateResult | typeof nothing {
    if (!this.hasSrc) {
      return nothing;
    }
    return html`
      <div
        class=${classMap({
          divider: true,
          'divider-horizontal': !this.isHorizontal,
          'divider-vertical': this.isHorizontal,
        })}
        part="divider"
        aria-hidden="true"
      ></div>
      <div class="source-row" part="source-wrapper">
        ${this.renderSourceContent()}
      </div>
    `;
  }

  // ---------- Source picker (context menu built from src-picker-content) ----------

  private getSourcePickerNavigationItems(): HTMLElement[] {
    const assignedElements =
      this.sourcePickerSlot?.assignedElements({flatten: true}) ?? [];

    return assignedElements.flatMap((element) => {
      if (!(element instanceof HTMLElement)) {
        return [];
      }
      if (element.localName === 'obc-navigation-item') {
        return [element];
      }
      return Array.from(
        element.querySelectorAll<HTMLElement>('obc-navigation-item')
      );
    });
  }

  private createSourcePickerOptionIcon(element: HTMLElement) {
    const iconElement = element.querySelector('[slot="icon"]');
    if (!(iconElement instanceof HTMLElement)) {
      return undefined;
    }
    return html`${iconElement.cloneNode(true)}`;
  }

  private getSourcePickerItemInfo(item: HTMLElement, index: number) {
    const itemWithValues = item as HTMLElement & {
      label?: string;
      value?: string;
    };
    const itemLabel = itemWithValues.label || item.getAttribute('label') || '';
    const itemValue =
      item.getAttribute('data-value') ||
      itemWithValues.value ||
      item.getAttribute('value') ||
      itemLabel ||
      `source-option-${index}`;

    return {itemLabel, itemValue};
  }

  private findSourcePickerOptionElement(value: string) {
    const navigationItems = this.getSourcePickerNavigationItems();
    for (const [index, item] of navigationItems.entries()) {
      const {itemValue} = this.getSourcePickerItemInfo(item, index);
      if (itemValue === value) {
        return item;
      }
    }
    return undefined;
  }

  private syncSourcePickerOptions = () => {
    this.sourcePickerOptions = this.getSourcePickerNavigationItems().map(
      (item, index) => {
        const {itemLabel, itemValue} = this.getSourcePickerItemInfo(
          item,
          index
        );
        return {
          value: itemValue,
          label: itemLabel,
          icon: this.createSourcePickerOptionIcon(item),
        };
      }
    );
  };

  private handleSourcePickerItemClick(
    event: ObcContextMenuInputItemClickEvent
  ) {
    this.dispatchEvent(
      new CustomEvent('source-change', {
        bubbles: true,
        composed: true,
        detail: {
          value: event.detail.value,
          label: event.detail.option?.label,
        },
      })
    );
    this.findSourcePickerOptionElement(event.detail.value)?.click();
    this.sourcePickerContentVisible = false;
  }

  /**
   * The context menu highlights options by their VALUE, while `src` holds the
   * displayed source text — which may be an option's label when the two
   * differ (e.g. `data-value="gps-1"` with label "GPS 1"). Resolve the current
   * source to the matching option's value (by value or label) so the open
   * picker always highlights the active source.
   */
  private get selectedSourceValues(): string[] {
    if (!this.src) {
      return [];
    }
    const match = this.sourcePickerOptions.find(
      (option) => option.value === this.src || option.label === this.src
    );
    return [match?.value ?? this.src];
  }

  private renderSourcePickerContent(): TemplateResult | typeof nothing {
    if (
      this.resolvedSourceInteraction !== ReadoutSourceInteraction.picker ||
      !this.sourcePickerContentVisible
    ) {
      return nothing;
    }
    return html`
      <obc-context-menu-input
        .type=${ContextMenuType.Regular}
        .options=${this.sourcePickerOptions}
        .selectedValues=${this.selectedSourceValues}
        class="source-picker-content"
        @item-click=${this.handleSourcePickerItemClick}
        @close=${() => {
          this.sourcePickerContentVisible = false;
        }}
      ></obc-context-menu-input>
    `;
  }

  private renderSourcePickerSlot(): TemplateResult {
    return html`
      <slot
        name="src-picker-content"
        hidden
        @slotchange=${this.syncSourcePickerOptions}
      ></slot>
    `;
  }

  // ---------- Layouts ----------

  /**
   * An invisible primary-size duplicate of a dynamic setpoint row's content,
   * stacked under the visible block in the same grid cell purely to reserve
   * width. With both rows permanently holding their emphasised width, the
   * widest row — and therefore the readout's total width — stays constant
   * while a flip-flop swaps the value/setpoint sizes, while a touch swap
   * runs, and while a pop-up setpoint fades out, so the meta zone and source
   * never shift. This is the vertical analogue of the horizontal arrangement,
   * where the swapped pair sits on one row and its summed width is constant
   * by construction (the designer's flip-flop invariant). Only the vertical
   * direction needs it; `always-visible` layouts are untouched.
   */
  private renderSetpointWidthReserve(
    kind: 'setpoint' | 'value'
  ): TemplateResult | typeof nothing {
    if (!this.hasDynamicSetpoint || this.isHorizontal) {
      return nothing;
    }
    const content =
      kind === 'setpoint'
        ? this.renderBlock({
            variant: ReadoutBlockVariant.setpoint,
            value: this.setpoint,
            valueSize: this.primarySize,
            enhanced: false,
            // The emphasised setpoint is SemiBold — reserve its widest form.
            weight: ObcTextboxFontWeight.semibold,
            hintedZeros: this.setpointOptions?.hintedZeros ?? false,
            spaceReserver: this.setpointOptions?.spaceReserver,
            hasDegree: this.hasDegree ?? false,
            alert: this.setpointOptions?.alert,
            ghost: true,
          })
        : html`${this.renderBlock({
            variant: ReadoutBlockVariant.value,
            value: this.value,
            valueSize: this.primarySize,
            enhanced: false,
            weight: this.valueWeight,
            hintedZeros: this.valueOptions?.hintedZeros ?? false,
            spaceReserver: this.valueOptions?.spaceReserver,
            off: this.off,
            hasIcon: this.valueOptions?.hasIcon ?? false,
            ghost: true,
          })}${this.renderDegreeColumn(this.primarySize)}`;
    return html`<div class="setpoint-width-reserve" aria-hidden="true">
      ${content}
    </div>`;
  }

  /**
   * Vertical: advice / setpoint / value rows right-aligned in a cluster, the
   * label+unit meta zone below, then the source row under an auto divider.
   * `alignment` re-aligns the whole column for stacked readouts.
   */
  private renderVerticalLayout(): TemplateResult {
    return html`
      <div class="value-cluster" part="value-cluster">
        ${this.hasAdvice
          ? html`<div class="advice-row" part="advice-wrapper">
              ${this.renderAdviceBlock()}
            </div>`
          : nothing}
        ${this.hasSetpoint
          ? html`<div class="setpoint-row" part="setpoint-wrapper">
              ${this.renderSetpointBlock()}
              ${this.renderSetpointWidthReserve('setpoint')}
            </div>`
          : nothing}
        ${this.hasValue
          ? html`<div class="value-row" part="value-wrapper">
              ${this.renderValueReading()}
              ${this.renderSetpointWidthReserve('value')}
            </div>`
          : nothing}
      </div>
      ${this.renderMetaZone()} ${this.renderSource()}
    `;
  }

  /**
   * Horizontal: advice, setpoint, value and the stacked label/unit meta flow on
   * one cap-height-aligned row, with the source at the end after an auto
   * divider.
   */
  private renderHorizontalLayout(): TemplateResult {
    return html`
      <div class="inline-row" part="value-cluster">
        ${this.hasAdvice
          ? html`<div class="advice-row" part="advice-wrapper">
              ${this.renderAdviceBlock()}
            </div>`
          : nothing}
        ${this.hasSetpoint
          ? html`<div class="setpoint-row" part="setpoint-wrapper">
              ${this.renderSetpointBlock()}
            </div>`
          : nothing}
        ${this.hasValue
          ? html`<div class="value-row" part="value-wrapper">
              ${this.renderValueReading()}
            </div>`
          : nothing}
        ${this.renderMetaZone()} ${this.renderSource()}
      </div>
    `;
  }

  override updated(changed: Map<string, unknown>): void {
    super.updated(changed);

    if (changed.has('sourcePickerContentVisible')) {
      if (this.sourcePickerContentVisible) {
        window.addEventListener('pointerdown', this.onWindowPointerDown, true);
      } else {
        window.removeEventListener(
          'pointerdown',
          this.onWindowPointerDown,
          true
        );
      }
    }

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
    window.removeEventListener('pointerdown', this.onWindowPointerDown, true);
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
    const dataQuality = this.dataQuality;
    const classes = classMap({
      readout: true,
      [`size-${this.resolvedSize}`]: true,
      [`direction-${this.resolvedDirection}`]: true,
      [`stacking-${this.resolvedStacking}`]: true,
      [`alignment-${this.resolvedAlignment}`]: true,
      [`priority-${this.resolvedPriority}`]: true,
      'data-low-integrity': dataQuality === ReadoutDataQuality.lowIntegrity,
      'data-invalid': dataQuality === ReadoutDataQuality.invalid,
      'flip-flop': this.isFlipFlop,
      'setpoint-dynamic': this.hasDynamicSetpoint,
    });

    const root = html`
      <div class=${classes} part="root">
        ${this.isHorizontal
          ? this.renderHorizontalLayout()
          : this.renderVerticalLayout()}
        ${this.renderSourcePickerSlot()}
      </div>
      ${this.renderSourcePickerContent()}
    `;

    // `alert` accepts `boolean` (so the generated Angular wrapper's widened
    // `boolean` type assigns cleanly), but `wrapWithAlertFrame` ignores
    // non-object truthy values. Normalise `true` → a default frame `{}` so it
    // isn't a silent no-op; `false`/object pass through. The frame hugs the
    // readout (no fullWidth), matching the previous behaviour.
    const alert = this.alert === true ? {} : this.alert;
    return wrapWithAlertFrame(alert, root);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout': ObcReadout;
  }
}
