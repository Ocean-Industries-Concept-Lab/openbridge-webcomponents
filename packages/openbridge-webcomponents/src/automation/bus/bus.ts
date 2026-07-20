import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './bus.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum BusSize {
  Small = 'small',
  Medium = 'medium',
}

export enum BusVariant {
  Regular = 'regular',
  Enhanced = 'enhanced',
  Medium = 'medium',
}

/**
 * ## Bus
 *
 * Horizontal bus bar for electrical schematic views. Renders a rounded
 * rectangle with an optional centered label, filling the width of the host
 * element.
 *
 * ### Features / Variants
 * - `size` sets the bar height and typography: `small` (16px, instrument
 *   label font) or `medium` (24px, button font).
 * - `variant` selects the color family: `regular` (gray), `enhanced` (blue)
 *   or `medium` (teal).
 * - `tint` switches to the light (tinted) color pairing of the variant.
 * - `label` is the centered text; leave it empty for a plain bar.
 *
 * ### Usage Guidelines
 * Use to represent a power distribution bus that circuit branches connect
 * to. Set the length by styling the host element's width; the default width
 * is 200px.
 *
 * @ignition-base-width: 200px
 * @ignition-base-height: 16px
 * @beta
 */
@customElement('obc-bus')
export class ObcBus extends LitElement {
  @property({type: String}) label = '';
  @property({type: String}) size: BusSize = BusSize.Small;
  @property({type: String}) variant: BusVariant = BusVariant.Regular;
  @property({type: Boolean}) tint = false;

  override render() {
    return html`
      <div
        class=${classMap({
          bus: true,
          [`size-${this.size}`]: true,
          [`variant-${this.variant}`]: true,
          tint: this.tint,
        })}
      >
        ${this.label ? html`<span class="label">${this.label}</span>` : null}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bus': ObcBus;
  }
}
