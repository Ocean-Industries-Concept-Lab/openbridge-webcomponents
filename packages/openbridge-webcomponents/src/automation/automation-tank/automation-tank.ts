import {
  HTMLTemplateResult,
  LitElement,
  html,
  nothing,
  svg,
  unsafeCSS,
} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './automation-tank.css?inline';
import {LineMedium} from '../index.js';
import '../automation-badge/automation-badge.js';
import {ObcAutomationBadgeType} from '../automation-badge/automation-badge.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';

import '../../icons/icon-chevron-double-up-google.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-double-down-google.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-arrow-right-google.js';
import '../../icons/icon-off.js';
import '../../icons/icon-tank.js';
import '../../icons/icon-energy-battery.js';
import '../../navigation-instruments/gauge-trend/gauge-trend.js';
import '../../building-blocks/bar-vertical/bar-vertical.js';
import '../../components/alert-frame/alert-frame.js';
import {Priority} from '../../navigation-instruments/types.js';
import {
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';
import {AlertType} from '../../types.js';
import type {ChartLineDataItem} from '../../building-blocks/chart-line/chart-line-base.js';
import type {LinearAdvice} from '../../building-blocks/instrument-linear/advice.js';
import {
  AdvicePosition,
  ExternalScaleSide,
  FillMode,
  computeSetpointBandThickness,
} from '../../building-blocks/external-scale/external-scale.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {TankPositioning} from './tank-positioning.js';

export enum TankTrend {
  fastRising = 'fast-rising',
  rising = 'rising',
  stable = 'stable',
  falling = 'falling',
  fastFalling = 'fast-falling',
  closed = 'closed',
}

export enum TankType {
  generic = 'generic',
  atmospheric = 'atmospheric',
  pressurized = 'pressurized',
  battery = 'battery',
}

export enum TankOrientation {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export {TankPositioning};

export enum TankChartMode {
  /** Static fill bar driven by `value` / `max` (default, backward compatible). */
  bar = 'bar',
  /** Embedded `obc-gauge-trend` line/area chart, no side bar. */
  graph = 'graph',
  /** Embedded `obc-gauge-trend` line/area chart with a side bar. */
  graphAndBar = 'graph-and-bar',
}

/**
 *
 *
 * Setpoint properties are inherited from {@link SetpointMixin}
 * (`setpoint`, `newSetpoint`, `touching`, `atSetpoint`, `autoAtSetpoint`,
 * `autoAtSetpointDeadband`, `setpointAtZeroDeadband`, `setpointOverride`,
 * `animateSetpoint`) and are forwarded to the embedded chart: the SVG bar in
 * `bar` mode, or `obc-gauge-trend` in the graph modes (where the marker
 * renders on the side bar, i.e. `graph-and-bar`). Values share the tank's
 * `value` / `max` scale.
 *
 * @property positioning - Host positioning model — see `TankPositioning` for details. Defaults to
 *   `button` (host fills parent container, 100% × 100%, falling back to the
 *   design aspect ratio on any axis the parent leaves indefinite, no anchor
 *   offset). Set to `point` for the legacy P&ID canvas mode (fixed default
 *   dimensions + top-center anchor offset).
 * @property activated - Enables the activated background color, used to indicate that the tank is
 *   activated/selected. Requires an interactive tank — the `noClick` mixin
 *   variant used when `clickable` is `false` only paints the enabled state, so
 *   a non-clickable tank ignores this (matching `obc-elevated-card`).
 * @availableWhen activated clickable==true
 * @property chartData - Time-series data points for the embedded gauge-trend (graph modes only).
 * @property priority - Priority hint forwarded to child charts (regular | enhanced).
 * @property advice - Advice overlays. Forwarded to the embedded `obc-gauge-trend` in
 *   `graph` / `graph-and-bar` modes, or rendered as pills over the static
 *   bar in `bar` mode.
 * @property hasAdvice - Show advice overlays (works in all `chartMode` variants).
 * @property alert - Show an `<obc-alert-frame>` overlay around the bordered tank area (the
 *   `.halo` wrapper). Mirrors the API of `obc-automation-button`: same six
 *   properties, same three slots (`alert-icon`, `alert-label`, `alert-timer`).
 *   The ring overlays `.halo` only, so the tag and readout that sit outside
 *   the halo in compact / static layouts remain unaffected.
 * @property showTrendSymbol - Show the trend chevron / off icon next to the percent readout. Default
 *   `true` preserves existing behavior. Set to `false` to hide the trend
 *   indicator in both compact and non-compact readouts — useful when the
 *   trend is not meaningful for a given tank, or when the consumer wants
 *   to keep the readout compact. Has no effect in `static` mode, which
 *   renders the tank's capacity (`max` + `unit`) instead of a percent and
 *   intentionally omits the trend indicator (a static tank represents
 *   "device present, current state unknown"). `attribute: false` per the
 *   repo's positive-default-true boolean convention.
 * @property percentFractionDigits - Number of fraction digits used to format the percent readout in the
 *   non-compact (regular) layout. Defaults to `0` (integer percent). The
 *   compact layout always renders integer percent to keep its fixed-width
 *   footprint stable. The static layout renders capacity (`max` + `unit`)
 *   rather than percent, so this property has no effect there — pass a
 *   pre-formatted value through the `max-value` slot if fractional
 *   precision is needed (see the `WithFractionDigits` story).
 * @property static - Display-only variant for a device whose current state is unknown: the
 *   chart cell is hidden, the bordered area is filled with
 *   `--container-section-color` and the readout is centred inside it. Always
 *   compact-sized, so it overrides `compact`, and it renders as a
 *   `<div role="img">` — outside the tab order and not announced as a control.
 * @property clickable - Whether the tank is interactive. `true` renders the root as a `<button>`
 *   with the flat-mixin interaction surface; `false` renders a `<div>` that
 *   keeps the resting appearance (the mixin's `noClick` variant) but loses
 *   hover, pressed and focus-visible and leaves the tab order. Everything
 *   else — chart, badges, readout, tag and the alert frame — still renders,
 *   so use it for a display-only tank that shows live data. No effect on a
 *   `static` tank, which is already non-interactive.
 * @property chartMode - Chart cell rendering mode: `bar` (default) is a static fill bar driven by
 *   `value` and `max`, `graph` embeds an `obc-gauge-trend` line/area chart,
 *   and `graphAndBar` embeds one with an integrated side bar.
 * @property hasGraphIcon - Overlays a decorative icon centred on the chart cell — the energy-battery
 *   icon for a battery tank, the generic tank icon otherwise. Works in every
 *   `chartMode` and both orientations; the icon sits in a fixed CSS layer
 *   above the bar or graph and is silhouetted so it stays legible on any
 *   fill, and its size follows the ambient `obc-component-size-*` class.
 * @property badgeControl - Control badge rendered in the `badges` cell. A non-`None` value renders an
 *   `<obc-automation-badge>` as fallback content for the `badges` slot, so any
 *   slotted content wins. The cell orders the four badges control, alert,
 *   interlock, commandLocked, left to right.
 * @slot badges - Custom badges to be displayed in the badge area.
 * @slot tag - Text or element for the tank's tag/label.
 * @slot readout - Replaces the entire readout content block.
 * @slot max-value - Content for the capacity value.
 * @slot unit - Content for the unit of measurement.
 * @slot current-value - Content for the current level value.
 * @slot rich - Detail rows below the main readout, shown in the regular
 *   (non-compact, non-static) layout. Slot an `<obc-readout-list>` of
 *   `<obc-readout-list-item>` rows — it owns the row typography and cross-row
 *   column alignment; the tank renders a divider above it automatically when
 *   the slot is filled.
 * @slot alert-icon - Custom icon for the alert frame.
 * @slot alert-label - Label for the alert frame.
 * @slot alert-timer - Timer for the alert frame.
 * @fires click - Fired when the tank is clicked. When `clickable` is `false` the tank renders a plain `<div>`, and in `static` mode a `<div role="img">`, instead of a `<button>` — in both cases it is not focusable or keyboard-activatable; pointer clicks still reach the host.
 * @beta
 */
@customElement('obc-automation-tank')
export class ObcAutomationTank extends SetpointMixin(LitElement) {
  @property({type: String}) medium: LineMedium = LineMedium.water;
  @property({type: Number}) value: number = 0;
  @property({type: Number}) max: number = 100;
  @property({type: String}) trend: TankTrend = TankTrend.stable;
  @property({type: String, reflect: true}) type: TankType = TankType.generic;
  @property({type: String, reflect: true}) orientation: TankOrientation =
    TankOrientation.vertical;
  @property({type: Boolean, reflect: true}) compact: boolean = false;
  @property({type: String, reflect: true}) positioning: TankPositioning =
    TankPositioning.button;
  @property({type: Boolean, reflect: true}) static: boolean = false;
  @property({type: Boolean, attribute: false}) clickable: boolean = true;
  @property({type: Boolean}) activated: boolean = false;
  @property({type: String}) tag: string = '';

  @property({type: String, reflect: true, attribute: 'chart-mode'})
  chartMode: TankChartMode = TankChartMode.bar;

  @property({type: Array, attribute: false})
  chartData: ChartLineDataItem[] = [];

  @property({type: String}) priority: Priority = Priority.regular;

  @property({type: Array, attribute: false})
  advice: LinearAdvice[] = [];

  @property({type: Boolean}) hasAdvice = false;

  @property({type: Boolean, attribute: false}) hasGraphIcon = false;

  @property({type: Boolean}) alert: boolean = false;
  @property({type: String}) alertFrameType: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  @property({type: String}) alertFrameThickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({type: String}) alertFrameStatus: AlertType = AlertType.Alarm;
  @property({type: Boolean, attribute: false}) showAlertCategoryIcon: boolean =
    true;
  @property({type: Boolean}) showAlertIcon: boolean = false;

  @property({type: Boolean, attribute: false}) showTrendSymbol: boolean = true;

  @property({type: Number}) percentFractionDigits: number = 0;

  @property({type: String}) badgeControl: AutomationButtonBadgeControl =
    AutomationButtonBadgeControl.None;
  @property({type: String}) badgeAlert: AutomationButtonBadgeAlert =
    AutomationButtonBadgeAlert.None;
  @property({type: String}) badgeInterlock: AutomationButtonBadgeInterlock =
    AutomationButtonBadgeInterlock.None;
  @property({type: String})
  badgeCommandLocked: AutomationButtonBadgeCommandLocked =
    AutomationButtonBadgeCommandLocked.None;

  @state() private _cellWidth = 0;
  @state() private _cellHeight = 0;
  /**
   * Tracks whether the `badges` and `tag` slots have assigned content. Used
   * in compact/static mode to collapse empty cells to 0px so the tank-frame
   * can absorb the freed space (per spec: "if there are no badges it would
   * grow upward; if there are no readout or tags it would grow downward").
   * Non-compact (regular) layout keeps its grid-based reserved rows.
   */
  @state() private _hasBadges = false;
  @state() private _hasTagSlot = false;
  /**
   * Tracks whether the `rich` slot has assigned content, so the regular
   * (non-compact) layout only draws the rich divider when a consumer has
   * slotted detail rows (canonically an `<obc-readout-list>`). Mirrors
   * `_hasBadges` / `_hasTagSlot`.
   */
  @state() private _hasRichSlot = false;
  private _chartResizeObserver?: ResizeObserver;
  private _observedCell?: Element;

  private get isCompact(): boolean {
    return this.compact || this.static;
  }

  private _badgeAlertType(): ObcAutomationBadgeType | null {
    switch (this.badgeAlert) {
      case AutomationButtonBadgeAlert.Silence:
        return ObcAutomationBadgeType.AlertSilenced;
      case AutomationButtonBadgeAlert.Caution:
        return ObcAutomationBadgeType.Caution;
      case AutomationButtonBadgeAlert.Warning:
        return ObcAutomationBadgeType.Warning;
      case AutomationButtonBadgeAlert.Alarm:
        return ObcAutomationBadgeType.Alarm;
      case AutomationButtonBadgeAlert.LevelCritical:
        return ObcAutomationBadgeType.LevelCritical;
      case AutomationButtonBadgeAlert.LevelHigh:
        return ObcAutomationBadgeType.LevelHigh;
      case AutomationButtonBadgeAlert.LevelMedium:
        return ObcAutomationBadgeType.LevelMedium;
      case AutomationButtonBadgeAlert.LevelLow:
        return ObcAutomationBadgeType.LevelLow;
      case AutomationButtonBadgeAlert.LevelDiagnostic:
        return ObcAutomationBadgeType.LevelDiagnostic;
      default:
        return null;
    }
  }

  private _badgeControlType(): ObcAutomationBadgeType | null {
    switch (this.badgeControl) {
      case AutomationButtonBadgeControl.Local:
        return ObcAutomationBadgeType.Local;
      case AutomationButtonBadgeControl.LocalOnly:
        return ObcAutomationBadgeType.LocalOnly;
      case AutomationButtonBadgeControl.Manual:
        return ObcAutomationBadgeType.Manual;
      case AutomationButtonBadgeControl.ManualOnly:
        return ObcAutomationBadgeType.ManualOnly;
      case AutomationButtonBadgeControl.Auto:
        return ObcAutomationBadgeType.Auto;
      default:
        return null;
    }
  }

  private _badgeInterlockType(): ObcAutomationBadgeType | null {
    switch (this.badgeInterlock) {
      case AutomationButtonBadgeInterlock.Interlock:
        return ObcAutomationBadgeType.Interlock;
      case AutomationButtonBadgeInterlock.InterlockInhibit:
        return ObcAutomationBadgeType.InterlockInhibit;
      default:
        return null;
    }
  }

  private _badgeCommandLockedType(): ObcAutomationBadgeType | null {
    if (
      this.badgeCommandLocked ===
      AutomationButtonBadgeCommandLocked.CommandLocked
    ) {
      return ObcAutomationBadgeType.CommandLocked;
    }
    return null;
  }

  private get _usesGaugeTrend(): boolean {
    return (
      this.chartMode === TankChartMode.graph ||
      this.chartMode === TankChartMode.graphAndBar
    );
  }

  private _onBadgesSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasBadges = slot
      .assignedNodes({flatten: true})
      .some(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim())
      );
  }

  private _onTagSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasTagSlot = slot
      .assignedNodes({flatten: true})
      .some(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim())
      );
  }

  private _onRichSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasRichSlot = slot
      .assignedNodes({flatten: true})
      .some(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE ||
          (n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim())
      );
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._chartResizeObserver?.disconnect();
    this._chartResizeObserver = undefined;
    this._observedCell = undefined;
  }

  protected override updated(
    changed: Map<string | number | symbol, unknown>
  ): void {
    super.updated(changed);
    // The chart cell element is recreated when `chartMode` moves between bar
    // and graph, and appears or disappears with `static` and `compact`, so the
    // observer is re-attached to the current `.bar-container`. `priority`
    // needs no forwarding — children take it through template bindings.
    this._syncChartResizeObserver();
  }

  private _syncChartResizeObserver(): void {
    // Observe the bar-container in BOTH bar mode and graph modes — the bar
    // mode now renders an SVG `obc-bar-vertical` / `-horizontal` that needs
    // measured pixel dimensions for its viewBox and barThickness.
    const cell = this.renderRoot.querySelector('.bar-container');
    if (!cell) {
      if (this._chartResizeObserver) {
        this._chartResizeObserver.disconnect();
        this._observedCell = undefined;
      }
      return;
    }
    if (cell === this._observedCell) return;

    if (!this._chartResizeObserver) {
      this._chartResizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const w = Math.round(entry.contentRect.width);
        const h = Math.round(entry.contentRect.height);
        if (w !== this._cellWidth) this._cellWidth = w;
        if (h !== this._cellHeight) this._cellHeight = h;
      });
    } else {
      this._chartResizeObserver.disconnect();
    }
    this._chartResizeObserver.observe(cell);
    this._observedCell = cell;
  }

  trendIcon(): HTMLTemplateResult | typeof nothing {
    if (this.trend === TankTrend.fastRising) {
      return html`<obi-chevron-double-up-google
        class="trend-icon"
      ></obi-chevron-double-up-google>`;
    } else if (this.trend === TankTrend.rising) {
      return html`<obi-chevron-up-google
        class="trend-icon"
      ></obi-chevron-up-google>`;
    } else if (this.trend === TankTrend.fastFalling) {
      return html`<obi-chevron-double-down-google
        class="trend-icon"
      ></obi-chevron-double-down-google>`;
    } else if (this.trend === TankTrend.falling) {
      return html`<obi-chevron-down-google
        class="trend-icon"
      ></obi-chevron-down-google>`;
    } else if (this.trend === TankTrend.closed) {
      return html`<obi-off class="trend-icon"></obi-off>`;
    } else {
      return html`<obi-arrow-right-google
        class="trend-icon"
      ></obi-arrow-right-google>`;
    }
  }

  /**
   * Atmospheric cap, 3-piece (corner-start / stretchable middle arc / corner-end).
   * Each piece draws its own fill (closed) and stroke (open) so adjacent pieces
   * abut without a visible vertical seam line. Coordinates are derived from the
   * Figma 248x14 path; corners stay 12px wide while the middle arc stretches.
   * Position (start vs end) and orientation flipping are handled in CSS.
   *
   * Horizontal orientation reuses the same path data but rotates each piece
   * via an inner `<g transform="translate(0 H) rotate(-90)">`, mapping the
   * source coord (x, y) to (y, H - x). The viewBox is swapped accordingly:
   *  corner: 12x14 -> 14x12      (H=12)
   *  middle: 224x14 -> 14x224    (H=224)
   * Cap-end (right side in horizontal) is mirrored via CSS scaleX(-1).
   */
  private renderAtmosphericCap(side: 'start' | 'end'): HTMLTemplateResult {
    const isHorizontal = this.orientation === TankOrientation.horizontal;

    // Curve Y-values are scaled proportionally from the 18/12-tall Figma
    // reference, so the corners stay continuous at both thicknesses
    // (automation-components.md § Tank rendering).
    let cornerStartFill: string;
    let cornerStartStroke: string;
    let midFill: string;
    let midStroke: string;
    let cornerEndFill: string;
    let cornerEndStroke: string;
    let cornerW: number;
    let capH: number;
    let midW: number;

    if (this.isCompact) {
      cornerW = 7;
      capH = 10;
      midW = 149;
      cornerStartFill =
        'M 6.374 4.8214 C 6.138 4.8429, 6.005 4.8543, 5.83 4.8771 C 2.937 5.2557, 0.669 7.0957, 0.51 9.1936 C 0.5 9.3214, 0.5 9.4357, 0.5 9.6429 L 0.5 10 L 6.374 10 Z';
      cornerStartStroke =
        'M 6.374 4.8214 C 6.138 4.8429, 6.005 4.8543, 5.83 4.8771 C 2.937 5.2557, 0.669 7.0957, 0.51 9.1936 C 0.5 9.3214, 0.5 9.4357, 0.5 9.6429 L 0.5 10';
      midFill =
        'M 0 4.8214 C 10.97 3.8214, 37.83 1.7857, 74.626 1.7857 C 111.42 1.7857, 138.28 3.8214, 149.252 4.8214 L 149.252 10 L 0 10 Z';
      midStroke =
        'M 0 4.8214 C 10.97 3.8214, 37.83 1.7857, 74.626 1.7857 C 111.42 1.7857, 138.28 3.8214, 149.252 4.8214';
      cornerEndFill =
        'M 0 4.8214 C 0.236 4.8429, 0.369 4.8543, 0.544 4.8771 C 3.437 5.2557, 5.705 7.0957, 5.864 9.1936 C 5.874 9.3214, 5.874 9.4357, 5.874 9.6429 L 5.874 10 L 0 10 Z';
      cornerEndStroke =
        'M 0 4.8214 C 0.236 4.8429, 0.369 4.8543, 0.544 4.8771 C 3.437 5.2557, 5.705 7.0957, 5.864 9.1936 C 5.874 9.3214, 5.874 9.4357, 5.874 9.6429 L 5.874 10';
    } else {
      cornerW = 12;
      capH = 14;
      midW = 224;
      cornerStartFill =
        'M 12 6.5837 C 6.346 6.7737, 5.176 6.8744, 4.168 7.2537 C 2.6445 7.8272, 1.418 8.8983, 0.8613 10.1415 C 0.493 10.9641, 0.5 11.9099, 0.5 13.6111 L 0.5 14 L 12 14 Z';
      // Curve and outer edge only: the seam with `.middle` is a 1px CSS
      // `border-top` so it pixel-snaps like the pressurized cap's border,
      // where an SVG stroke renders thinner and blurrier.
      cornerStartStroke =
        'M 12 6.5837 C 6.346 6.7737, 5.176 6.8744, 4.168 7.2537 C 2.6445 7.8272, 1.418 8.8983, 0.8613 10.1415 C 0.493 10.9641, 0.5 11.9099, 0.5 13.6111 L 0.5 14';
      midFill =
        'M 0 6.5837 C 16 5.1124, 56 1.9444, 112 1.9444 C 168 1.9444, 208 5.1124, 224 6.5837 L 224 14 L 0 14 Z';
      midStroke =
        'M 0 6.5837 C 16 5.1124, 56 1.9444, 112 1.9444 C 168 1.9444, 208 5.1124, 224 6.5837';
      cornerEndFill =
        'M 0 6.5837 C 5.654 6.7737, 6.824 6.8744, 7.832 7.2537 C 9.3555 7.8272, 10.582 8.8983, 11.1387 10.1415 C 11.507 10.9641, 11.5 11.9099, 11.5 13.6111 L 11.5 14 L 0 14 Z';
      cornerEndStroke =
        'M 0 6.5837 C 5.654 6.7737, 6.824 6.8744, 7.832 7.2537 C 9.3555 7.8272, 10.582 8.8983, 11.1387 10.1415 C 11.507 10.9641, 11.5 11.9099, 11.5 13.6111 L 11.5 14';
    }

    if (isHorizontal) {
      // Rotate vertical paths -90deg into a `capH`-wide column. Source coord
      // (x, y) maps to (y, cornerW - x) for corners and (y, midW - x) for mid.
      return html`
        <div class="cap cap-atmospheric cap-${side}">
          <svg
            class="cap-corner cap-corner-start"
            viewBox="0 0 ${capH} ${cornerW}"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 ${cornerW}) rotate(-90)">
                <path class="cap-fill" d="${cornerStartFill}" />
                <path class="cap-stroke" fill="none" d="${cornerStartStroke}" />
              </g>
            `}
          </svg>
          <svg
            class="cap-mid"
            viewBox="0 0 ${capH} ${midW}"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 ${midW}) rotate(-90)">
                <path class="cap-fill" d="${midFill}" />
                <path class="cap-stroke" fill="none" vector-effect="non-scaling-stroke" d="${midStroke}" />
              </g>
            `}
          </svg>
          <svg
            class="cap-corner cap-corner-end"
            viewBox="0 0 ${capH} ${cornerW}"
            preserveAspectRatio="xMidYMin meet"
            aria-hidden="true"
          >
            ${svg`
              <g transform="translate(0 ${cornerW}) rotate(-90)">
                <path class="cap-fill" d="${cornerEndFill}" />
                <path class="cap-stroke" fill="none" d="${cornerEndStroke}" />
              </g>
            `}
          </svg>
        </div>
      `;
    }

    return html`
      <div class="cap cap-atmospheric cap-${side}">
        <svg
          class="cap-corner cap-corner-start"
          viewBox="0 0 ${cornerW} ${capH}"
          preserveAspectRatio="xMaxYMid meet"
          aria-hidden="true"
        >
          ${svg`
            <path class="cap-fill" d="${cornerStartFill}" />
            <path class="cap-stroke" fill="none" d="${cornerStartStroke}" />
          `}
        </svg>
        <svg
          class="cap-mid"
          viewBox="0 0 ${midW} ${capH}"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          ${svg`
            <path class="cap-fill" d="${midFill}" />
            <path class="cap-stroke" fill="none" vector-effect="non-scaling-stroke" d="${midStroke}" />
          `}
        </svg>
        <svg
          class="cap-corner cap-corner-end"
          viewBox="0 0 ${cornerW} ${capH}"
          preserveAspectRatio="xMinYMid meet"
          aria-hidden="true"
        >
          ${svg`
            <path class="cap-fill" d="${cornerEndFill}" />
            <path class="cap-stroke" fill="none" d="${cornerEndStroke}" />
          `}
        </svg>
      </div>
    `;
  }

  private renderCap(side: 'start' | 'end'): HTMLTemplateResult | null {
    if (this.type === TankType.generic) return null;
    if (this.type === TankType.battery && side === 'end') return null;
    if (this.type === TankType.atmospheric) {
      return this.renderAtmosphericCap(side);
    }
    if (this.type === TankType.pressurized) {
      return html`<div class="cap cap-pressurized cap-${side}"></div>`;
    }
    // battery, start only
    return html`<div class="cap cap-battery cap-${side}"></div>`;
  }

  override render() {
    const safeMax = this.max > 0 ? this.max : 1;
    const percent = Math.max(0, Math.min(100, (this.value / safeMax) * 100));
    const isCompact = this.isCompact;

    // Compact and static collapse their empty cells so the tank frame absorbs
    // the space; non-compact cells sit in the inner `.grid` and always reserve
    // their min-content rows (automation-components.md § Tank rendering).
    const controlBadge = this._badgeControlType();
    const alertBadge = this._badgeAlertType();
    const interlockBadge = this._badgeInterlockType();
    const commandLockedBadge = this._badgeCommandLockedType();
    const hasEnumBadges =
      controlBadge !== null ||
      alertBadge !== null ||
      interlockBadge !== null ||
      commandLockedBadge !== null;

    const badgesHidden = isCompact && !this._hasBadges && !hasEnumBadges;
    const tagHidden = isCompact && !this._hasTagSlot && !this.tag;

    const badgesCell = html`
      <div class="badges" ?hidden=${badgesHidden}>
        <slot name="badges" @slotchange=${this._onBadgesSlotChange}>
          ${controlBadge
            ? html`<obc-automation-badge
                .type=${controlBadge}
              ></obc-automation-badge>`
            : nothing}
          ${alertBadge
            ? html`<obc-automation-badge
                .type=${alertBadge}
              ></obc-automation-badge>`
            : nothing}
          ${interlockBadge
            ? html`<obc-automation-badge
                .type=${interlockBadge}
              ></obc-automation-badge>`
            : nothing}
          ${commandLockedBadge
            ? html`<obc-automation-badge
                .type=${commandLockedBadge}
              ></obc-automation-badge>`
            : nothing}
        </slot>
      </div>
    `;
    const tagCell = html`
      <div class="tag" ?hidden=${tagHidden}>
        <slot name="tag" @slotchange=${this._onTagSlotChange}>${this.tag}</slot>
      </div>
    `;
    // Static shows capacity rather than a percent: the state is unknown, so a
    // reading would be a claim the tank cannot make, and the trend icon goes
    // for the same reason (automation-components.md § Tank rendering).
    const readoutCell = this.static
      ? html`
          <div class="readout readout-compact readout-static">
            <slot name="readout">
              <slot name="max-value">${this.max.toFixed(0)}</slot>
              <slot name="unit">m<sup>3</sup></slot>
            </slot>
          </div>
        `
      : isCompact
        ? html`
            <div class="readout readout-compact">
              <slot name="readout">
                ${this.showTrendSymbol ? this.trendIcon() : null}
                <span class="percent"
                  >${percent.toFixed(0)}<span class="percent-symbol"
                    >%</span
                  ></span
                >
              </slot>
            </div>
          `
        : html`
            <div class="readout">
              <slot name="readout">
                <div class="header">
                  ${this.showTrendSymbol ? this.trendIcon() : null}
                  <div class="percent">
                    ${percent.toFixed(this.percentFractionDigits)}<span
                      class="percent-symbol"
                      >%</span
                    >
                  </div>
                </div>
                <div class="value">
                  <div class="current">
                    <slot name="current-value" class="current-value"
                      >${this.value.toFixed(0)}</slot
                    ><span class="divider">/</span>
                  </div>
                  <div class="max">
                    <slot class="max-value" name="max-value"
                      >${this.max.toFixed(0)}</slot
                    >
                    <slot class="unit" name="unit">m<sup>3</sup></slot>
                  </div>
                </div>
                <div class="rich-divider" ?hidden=${!this._hasRichSlot}></div>
                <slot name="rich" @slotchange=${this._onRichSlotChange}></slot>
              </slot>
            </div>
          `;
    // Two stacked icons form the silhouette `obc-automation-button` uses: the
    // back layer paints the inherited SVG `stroke` halo, the front layer the
    // fill through `color` (automation-components.md § Tank rendering).
    const graphIconClasses = classMap({
      'graph-icon': true,
      'priority-enhanced': this.priority === Priority.enhanced,
    });
    const graphIconOverlay =
      this.type === TankType.battery
        ? html`
            <div class=${graphIconClasses} aria-hidden="true">
              <obi-energy-battery
                class="graph-icon-stroke"
              ></obi-energy-battery>
              <obi-energy-battery class="graph-icon-fill"></obi-energy-battery>
            </div>
          `
        : html`
            <div class=${graphIconClasses} aria-hidden="true">
              <obi-tank class="graph-icon-stroke"></obi-tank>
              <obi-tank class="graph-icon-fill"></obi-tank>
            </div>
          `;
    // Alert-frame overlay. Mirrors the `obc-automation-button` pattern
    // exactly so consumer API is identical. Placed inside `.halo` so the
    // ring hugs only the bordered tank area; `belowHalo` (tag / readout) is
    // unaffected. `.halo` is `position: relative` (see CSS) to anchor the
    // absolutely-positioned alert-frame.
    const alertFrameOverlay = this.alert
      ? html`<obc-alert-frame
          class="alert-frame"
          .type=${this.alertFrameType}
          .thickness=${this.alertFrameThickness}
          .status=${this.alertFrameStatus}
          .showAlertCategoryIcon=${this.showAlertCategoryIcon}
          .showIcon=${this.showAlertIcon}
        >
          <span slot="icon"><slot name="alert-icon"></slot></span>
          <span slot="label"><slot name="alert-label"></slot></span>
          <span slot="timer"><slot name="alert-timer"></slot></span>
        </obc-alert-frame>`
      : null;
    let chartCell: HTMLTemplateResult;
    if (this._usesGaugeTrend) {
      // gauge-trend reads these as an aspect-ratio reference and derives its
      // own height from its wrapper. Rendering waits for both measurements —
      // a zero divides in that maths on first paint.
      const hasSize = this._cellWidth > 0 && this._cellHeight > 0;
      chartCell = html`
        <div class="bar-container chart-cell">
          ${hasSize
            ? html`<obc-gauge-trend
                .data=${this.chartData}
                .minValue=${0}
                .maxValue=${safeMax}
                .value=${this.value}
                .hasBar=${this.chartMode === TankChartMode.graphAndBar}
                .hasScale=${false}
                .hasLabelPadding=${false}
                .chartFill=${true}
                .hasAdvice=${this.hasAdvice}
                .advice=${this.advice}
                .width=${this._cellWidth}
                .height=${this._cellHeight}
                .setpoint=${this.setpoint}
                .newSetpoint=${this.newSetpoint}
                .touching=${this.touching}
                .atSetpoint=${this.atSetpoint}
                .autoAtSetpoint=${this.autoAtSetpoint}
                .autoAtSetpointDeadband=${this.autoAtSetpointDeadband}
                .setpointAtZeroDeadband=${this.setpointAtZeroDeadband}
                .setpointOverride=${this.setpointOverride}
                .animateSetpoint=${this.animateSetpoint}
                style="width: 100%; height: 100%;"
                .priority=${this.priority}
              ></obc-gauge-trend>`
            : null}
          ${this.hasGraphIcon ? graphIconOverlay : null}
        </div>
      `;
    } else {
      // The shared SVG bar, the renderer gauge-trend uses for its side bar, so
      // advice overlays behave the same in all three chart modes; its fill
      // follows the instrument palette, not the tank's `medium` colour.
      // TODO(#1284): carry the medium colour through, and fold this branch
      // into gauge-trend once it offers a bar-only layout at this size.
      const hasSize = this._cellWidth > 0 && this._cellHeight > 0;
      // The inner bar is always portrait and mirrors gauge-trend's
      // `fixedAspectRatio` sizing, so fixed-pixel SVG primitives keep one
      // on-screen size; `barThickness` and the cross-axis size are therefore
      // in viewBox units (automation-components.md § Tank rendering).
      const SCALE_REFERENCE_SIZE = 384;
      // The bar's viewBox cross-axis includes an outside-bar band for advice
      // pills and/or the setpoint marker (see computeExternalScaleLayout).
      // Subtract the same band the bar will reserve so total viewBox width
      // still equals viewBoxCross and the meet-scale fills the cell exactly.
      const hasSetpointMarker =
        this.setpoint !== undefined ||
        this.newSetpoint !== undefined ||
        this.departingNewSetpoint !== undefined;
      const outsideBarReserveVb = Math.max(
        this.hasAdvice ? 16 : 0,
        computeSetpointBandThickness({hasSetpoint: hasSetpointMarker})
      );
      const safeCellHeight = Math.max(1, this._cellHeight);
      const viewBoxCross =
        (this._cellWidth * SCALE_REFERENCE_SIZE) / safeCellHeight;
      const barThickness = Math.max(0, viewBoxCross - outsideBarReserveVb);
      // `tint` is locked in for tank bar mode: it draws a fill from 0 to
      // value plus a small marker at the value position, which mirrors the
      // legacy CSS bar's "fill + top border at value" visual idiom.
      const barWrapper = html`<obc-bar-vertical
        .minValue=${0}
        .maxValue=${safeMax}
        .value=${this.value}
        .height=${this._cellHeight}
        .fixedAspectRatio=${true}
        .scaleReferenceSize=${SCALE_REFERENCE_SIZE}
        .paddingTop=${0}
        .paddingBottom=${0}
        .side=${ExternalScaleSide.right}
        .hasBar=${true}
        .hasScale=${false}
        .showLabels=${false}
        .barThickness=${barThickness}
        .fillMode=${FillMode.tint}
        .instrumentMode=${true}
        .borderRadius=${2}
        .advices=${this.hasAdvice ? this.advice : []}
        .advicePosition=${AdvicePosition.inner}
        .setpoint=${this.setpoint}
        .newSetpoint=${this.newSetpoint}
        .touching=${this.touching}
        .atSetpoint=${this.atSetpoint}
        .autoAtSetpoint=${this.autoAtSetpoint}
        .autoAtSetpointDeadband=${this.autoAtSetpointDeadband}
        .setpointAtZeroDeadband=${this.setpointAtZeroDeadband}
        .setpointOverride=${this.setpointOverride}
        .animateSetpoint=${this.animateSetpoint}
        style="width: 100%; height: 100%;"
        .priority=${this.priority}
      ></obc-bar-vertical>`;
      chartCell = html`
        <div class="bar-container bar-cell">
          ${hasSize ? barWrapper : null}
          ${this.hasGraphIcon ? graphIconOverlay : null}
        </div>
      `;
    }

    const frameClasses = classMap({
      'tank-frame': true,
      [`type-${this.type}`]: true,
      [`orientation-${this.orientation}`]: true,
      [this.medium]: true,
      compact: isCompact,
      static: this.static,
    });

    let middleContents: HTMLTemplateResult;
    if (this.static) {
      middleContents = html`<div class="static-readout">${readoutCell}</div>`;
    } else if (this.compact) {
      middleContents = chartCell;
    } else {
      middleContents = html`<div class="grid">
        ${tagCell}${badgesCell}${readoutCell}${chartCell}
      </div>`;
    }

    const tankFrame = html`
      <div class=${frameClasses}>
        ${this.renderCap('start')}
        <div class="middle">${middleContents}</div>
        ${this.renderCap('end')}
      </div>
    `;

    // One interactive element: the flat mixin paints `.halo` through
    // `visibleWrapperClass` so the surround hugs the bordered area only, and
    // the alert-frame overlay is its last child so the ring covers every cell
    // (automation-components.md § Tank rendering).
    let haloContents: HTMLTemplateResult;
    if (this.static) {
      haloContents = html`${badgesCell}${tankFrame}${tagCell}`;
    } else if (this.compact) {
      haloContents = html`${badgesCell}${tankFrame}${readoutCell}${tagCell}`;
    } else {
      haloContents = tankFrame;
    }
    const halo = html`
      <div class="halo">${haloContents}${alertFrameOverlay}</div>
    `;

    // Both classes sit on `.root` so the mixin paints `.halo`: `activated`
    // like its hover and pressed states, `clickable` choosing between the
    // six-state variant and the resting-only `noClick` one
    // (automation-components.md § Tank rendering).
    const isClickable = this.clickable && !this.static;
    const rootClasses = classMap({
      root: true,
      activated: this.activated,
      clickable: isClickable,
    });

    // The live region stays on all three root shapes, so an `alert` label is
    // announced whatever the interactivity (automation-components.md § Tank
    // rendering).
    // TODO(a11y): the rest of the automation family lacks the live region;
    // consolidate when alert support moves into a shared mixin.
    if (this.static) {
      return html`<div
        class=${rootClasses}
        role="img"
        aria-label=${this.tag || 'Tank'}
        aria-live="polite"
        aria-atomic="true"
      >
        ${halo}
      </div>`;
    }
    if (!isClickable) {
      return html`<div
        class=${rootClasses}
        aria-live="polite"
        aria-atomic="true"
      >
        ${halo}
      </div>`;
    }
    return html`<button
      class=${rootClasses}
      type="button"
      aria-label=${this.tag || 'Tank'}
      aria-live="polite"
      aria-atomic="true"
    >
      ${halo}
    </button>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-tank': ObcAutomationTank;
  }
}
