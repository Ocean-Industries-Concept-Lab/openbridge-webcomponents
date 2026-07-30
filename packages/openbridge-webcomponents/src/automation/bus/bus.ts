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
 * `<obc-bus>` – A bus bar (busbar, power rail) for electrical schematic views.
 *
 * Renders a horizontal rounded rectangle with an optional centered label,
 * representing the node that circuit branches connect to in a distribution
 * schematic.
 *
 * ### Features / Variants
 * - **Sizes** (`size`): `small` (16px tall, instrument label font, 4px corner
 *   radius, default) or `medium` (24px tall, button font, 6px corner radius).
 * - **Color variants** (`variant`): `regular` (gray, default), `enhanced`
 *   (blue) or `medium` (teal).
 * - **Tint** (`tint`): switches to the light (tinted) color pairing of the
 *   selected variant. **TODO(designer):** document when the tinted style
 *   should be used instead of the solid one.
 * - **Label** (`label`): centered text that clips without wrapping when the
 *   bar is too narrow; leave it empty for a plain bar. Content is provided
 *   via this property — the component has no slots.
 * - **Orientation** (`vertical`): renders the bar vertically with the label
 *   rotated 90° clockwise (read top to bottom).
 * - **Length**: the bar fills the host element's width (default 200px), so
 *   set the length by styling the host. When `vertical`, it fills the host
 *   height instead (default 200px).
 *
 * ### Usage Guidelines
 * Use to represent a power distribution bus that circuit branches connect
 * to. For the conductors that run between the bus and devices, use the line
 * components (e.g. `obc-horizontal-line` with the `electric` line type)
 * instead — the bus is the labeled connection node, not a conductor run.
 *
 * The bus is display-only: it has no button behavior, readouts or badges.
 * For an operable or stateful device symbol, use one of the
 * `obc-automation-button`-based device components.
 *
 * @ignition-base-width: 200px
 * @ignition-base-height: 16px
 * @beta
 */
@customElement('obc-bus')
export class ObcBus extends LitElement {
  /** Centered label text; the bar renders empty when omitted. */
  @property({type: String}) label = '';

  /** Bar height and typography preset. */
  @property({type: String}) size: BusSize = BusSize.Small;

  /** Color family of the bar. */
  @property({type: String}) variant: BusVariant = BusVariant.Regular;

  /** Use the light (tinted) color pairing of the selected variant. */
  @property({type: Boolean}) tint = false;

  /** Render the bar vertically with the label rotated 90° clockwise. */
  @property({type: Boolean, reflect: true}) vertical = false;

  override render() {
    return html`
      <div
        class=${classMap({
          bus: true,
          [`size-${this.size}`]: true,
          [`variant-${this.variant}`]: true,
          tint: this.tint,
          vertical: this.vertical,
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
