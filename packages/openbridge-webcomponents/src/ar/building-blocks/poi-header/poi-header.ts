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
 * ## Overview
 * Renders a compact POI chip that can show identifier text, optional label text,
 * and optional indicator iconography for AR target context. Keywords and search
 * synonyms: chip, pill, badge, POI, header, target, AR, identifier. Configuration:
 * `content` (default `"1"`) sets the main identifier text, `label` (default
 * `"Data"`) sets the secondary text in data mode, `size` uses `ObcPoiHeaderSize`
 * (default `regular`), `state` uses `ObcPoiHeaderState` (default `enabled`),
 * `type` uses `ObcPoiHeaderType` (default `id`), and `hasIndicator` (default
 * `false`) controls rendering of indicator slot/fallback visuals.
 *
 * ## Features/Variants
 * - `type="id"` renders ID-only content from `content`.
 * - `type="data"` renders two pills: ID (`content`) and label (`label`).
 * - `state` variants (`enabled`, `selected`, `caution`, `warning`, `alarm`)
 *   drive visual theming.
 * - When `hasIndicator` is true, an indicator region is appended; in `data` +
 *   `enabled`, the indicator is wrapped in an indicator frame.
 *
 * ## Usage Guidelines
 * - Use `<obc-poi-header>` in POI/AR marker compositions where compact stateful
 *   identification is needed.
 * - Use `type="id"` for minimal markers and `type="data"` when a label is required.
 * - Drive `state` using `ObcPoiHeaderState` values to keep alert/selection
 *   semantics consistent.
 *
 * ## Slots/Content
 * - `indicator`: Optional custom indicator icon/content.
 * - Fallback behavior: if no `indicator` slot content is provided, built-in
 *   three-bar indicator markup is rendered.
 *
 * ## Events
 * This component does not emit custom events.
 *
 * ## Best Practices
 * - Keep `content` short (typically 1-3 characters) to preserve compact layout.
 * - Use enum-backed values for `size`, `state`, and `type` rather than arbitrary strings.
 * - Enable `hasIndicator` only when indicator semantics are meaningful.
 *
 * ## Example
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
    return this.content?.trim().length === 1;
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
