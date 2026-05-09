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
 * `<obc-poi-header>` - Compact header chip for marker identifiers, labels, and optional indicator content.
 *
 * ## Overview
 * Use this component to display compact marker metadata above or near a marker button.
 * Keywords/synonyms: chip, pill, badge, header chip, identifier badge.
 *
 * ## Features/Variants
 * - `type` (default `id`):
 *   - `id`: shows identifier content only.
 *   - `data`: shows identifier plus secondary label.
 * - `state` (default `enabled`): `enabled`, `selected`, `caution`, `warning`, `alarm`.
 * - `content` (default `"1"`): primary identifier text.
 * - `label` (default `"Data"`): secondary text used by `type="data"`.
 * - `hasIndicator` (default `false`): appends indicator area.
 * - `indicator` slot fallback: renders built-in bar indicator markup when slot content is empty.
 * - `size` (default `regular`): currently only `regular`.
 *
 * ## Usage Guidelines
 * - Use `type="id"` for compact identifier-only labels.
 * - Use `type="data"` when both an ID and short label are required.
 * - Keep `content` and `label` brief to prevent overflow.
 *
 * ## Slots/Content
 * - `indicator`: Optional indicator icon/content; built-in indicator is used as fallback.
 *
 * ## Events
 * This component does not emit custom events.
 *
 * ## Best Practices
 * - Keep indicator usage consistent across similar marker states.
 * - Prefer enum values for `type`, `state`, and `size`.
 *
 * ## Example
 * ```html
 * <obc-poi-header type="data" state="selected" content="3" label="SOG" has-indicator>
 *   <obi-placeholder slot="indicator"></obi-placeholder>
 * </obc-poi-header>
 * ```
 *
 * @slot indicator - Optional indicator icon/content.
 */
@customElement('obc-poi-header')
export class ObcPoiHeader extends LitElement {
  @property({type: String}) content = '1';
  @property({type: String}) label = 'Data';

  @property({type: String})
  size: ObcPoiHeaderSize = ObcPoiHeaderSize.Regular;

  @property({type: String})
  state: ObcPoiHeaderState = ObcPoiHeaderState.Enabled;

  @property({type: String})
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
