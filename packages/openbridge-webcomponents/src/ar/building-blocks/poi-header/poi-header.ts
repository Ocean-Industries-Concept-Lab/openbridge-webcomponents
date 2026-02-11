import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../../decorator.js';
import componentStyle from './poi-header.css?inline';

export enum ObcPoiHeaderSize {
  Regular = 'regular',
}

export enum ObcPoiHeaderState {
  Enabled = 'enabled',
  Selected = 'selected',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

export enum ObcPoiHeaderType {
  Data = 'data',
  Id = 'id',
}

/**
 * `<obc-poi-header>` -- Compact header chip for Point-of-Interest (POI) targets on the AR overlay.
 *
 * @remarks
 * **Overview**
 * Renders a small, labelled chip attached to a POI target. It conveys an
 * identifier, an optional data label, and an optional indicator icon while
 * reflecting the current interactive/alert state through colour and shape.
 *
 * **Features / Variants**
 * - *ID-only* (`type="id"`) -- shows only the `content` text (e.g. "1").
 * - *Data* (`type="data"`) -- shows a two-pill layout: an ID pill (`content`)
 *   and a label pill (`label`, e.g. "Data").
 * - States: `enabled` (default neutral), `selected` (active highlight),
 *   `caution`, `warning`, `alarm` (progressive alert severity).
 * - When `hasIndicator` is true an indicator region is appended. In `data` +
 *   `enabled` mode the indicator is wrapped in a frame; otherwise it renders
 *   inline.
 *
 * **Usage Guidelines**
 * Use `<obc-poi-header>` exclusively inside POI target compositions on the AR
 * map. For general-purpose status tags or toggleable labels, prefer the
 * design-system chip, pill, or badge components instead.
 *
 * **Slots / Content**
 * - `indicator` -- Replaces the default three-bar indicator with a custom icon.
 *   When nothing is slotted the component falls back to built-in bar elements.
 *   Use an OpenBridge icon tag (e.g. `<obi-01-alert-alarm-unack>`) for
 *   domain-specific indicators.
 *
 * **Events**
 * This component does not emit any custom events.
 *
 * **Best Practices**
 * - Keep `content` short (1-3 characters) to preserve the compact chip layout.
 * - Set `state` via the `ObcPoiHeaderState` enum rather than raw strings.
 * - Only enable the indicator slot when the POI genuinely carries status
 *   iconography; avoid empty indicators.
 *
 * **Example**
 * ```html
 * <obc-poi-header
 *   type="data"
 *   state="selected"
 *   content="3"
 *   label="SOG"
 *   has-indicator
 * >
 *   <obi-01-alert-alarm-unack slot="indicator"></obi-01-alert-alarm-unack>
 * </obc-poi-header>
 * ```
 *
 * @keywords chip, pill, badge, POI, header, target, AR, identifier
 *
 * @property {string} content - Short identifier text displayed in the chip.
 *   Defaults to `"1"`. Single-character values receive tighter sizing.
 * @property {string} label - Secondary label shown in the Data variant.
 *   Defaults to `"Data"`. Ignored when `type` is `"id"`.
 * @property {ObcPoiHeaderSize} size - Visual size preset. Currently only
 *   `"regular"` (default). Reflected as an attribute for CSS hooks.
 * @property {ObcPoiHeaderState} state - Interactive/alert state. One of
 *   `"enabled"` (default), `"selected"`, `"caution"`, `"warning"`, `"alarm"`.
 *   Drives colour theming via CSS class and is reflected as an attribute.
 * @property {ObcPoiHeaderType} type - Layout variant. `"id"` (default) renders
 *   ID-only; `"data"` renders the two-pill ID + label layout. Reflected as an
 *   attribute.
 * @property {boolean} hasIndicator - When `true`, appends the indicator region
 *   (slot or fallback bars). Defaults to `false`. Set via the `has-indicator`
 *   HTML attribute.
 *
 * @slot indicator - Optional custom indicator icon. Falls back to built-in bars.
 */
@customElement('obc-poi-header')
export class ObcPoiHeader extends LitElement {
  @property({type: String}) content = '1';
  @property({type: String}) label = 'Data';

  @property({type: String, reflect: true})
  size: ObcPoiHeaderSize = ObcPoiHeaderSize.Regular;

  @property({type: String, reflect: true})
  state: ObcPoiHeaderState = ObcPoiHeaderState.Enabled;

  @property({type: String, reflect: true})
  type: ObcPoiHeaderType = ObcPoiHeaderType.Id;

  @property({type: Boolean, attribute: 'has-indicator'})
  hasIndicator = false;

  private get isDataType(): boolean {
    return this.type === ObcPoiHeaderType.Data;
  }

  private get isEnabled(): boolean {
    return this.state === ObcPoiHeaderState.Enabled;
  }

  private get hasSingleCharacterContent(): boolean {
    return this.content.trim().length === 1;
  }

  private renderIndicator() {
    const withFrame = this.isDataType && this.isEnabled;
    const defaultIndicator = html`
      <span class="indicator" aria-hidden="true" data-node-id="10534:68353">
        <span class="bar left" data-node-id="10534:68366"></span>
        <span class="bar middle" data-node-id="10534:68365"></span>
        <span class="bar right" data-node-id="10534:68367"></span>
      </span>
    `;
    const indicator = html`<slot name="indicator">${defaultIndicator}</slot>`;

    if (!withFrame) {
      return indicator;
    }

    return html`<span class="indicator-frame">${indicator}</span>`;
  }

  private renderIdOnly() {
    return html`<span class="id-only-text">${this.content}</span>`;
  }

  private renderData() {
    return html`
      <div class="id-pill">
        <span class="id-text">${this.content}</span>
      </div>
      <div class="label-pill">
        <span class="label-text">${this.label}</span>
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`size-${this.size}`]: true,
          [`state-${this.state}`]: true,
          [`type-${this.type}`]: true,
          'single-char-content': this.hasSingleCharacterContent,
          'has-indicator': this.hasIndicator,
        })}
        data-node-id="10389:51689"
      >
        ${this.isDataType ? this.renderData() : this.renderIdOnly()}
        ${this.hasIndicator ? this.renderIndicator() : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-header': ObcPoiHeader;
  }
}
