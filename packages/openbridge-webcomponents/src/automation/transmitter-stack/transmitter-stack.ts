import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './transmitter-stack.css?inline';
import {customElement} from '../../decorator.js';
import {LineType} from '../index.js';
import {
  TransmitterOrientation,
  transmitterLeaderOffset,
} from '../transmitter/transmitter-shared.js';
import {TransmitterButtonVariant} from '../transmitter-button/transmitter-button.js';
import '../transmitter-button/transmitter-button.js';

/** One reading of a transmitter stack. */
export interface TransmitterStackValue {
  /** The reading; `null` or `NaN` renders the unavailable dash. */
  value: number | null;
  unit?: string;
  /** Identifier shown under the segment (above it for `top`) and read as part of its name. */
  idTag?: string;
  /** Decimal precision; `1` when the key is omitted. */
  fractionDigits?: number;
  /** Integer digits to reserve; `0` when the key is omitted. */
  maxDigits?: number;
  hintedZeros?: boolean;
  hasSignSpacer?: boolean;
  /**
   * Name of the light-DOM slot projected as this segment's icon. Unique within
   * the stack: an element is projected once, so a repeated name leaves later
   * segments with an empty icon.
   */
  iconSlotName?: string;
}

export interface TransmitterStackValueClickDetail {
  index: number;
  value: TransmitterStackValue;
}

/**
 * `<obc-transmitter-stack>` – Several transmitter readings side by side in one
 * joined chip, attached to a line on a process diagram by a single leader line.
 *
 * Each entry of `values` renders an `<obc-transmitter-button>` segment with its
 * own icon, value, unit and id tag. The segments take equal widths, set by the
 * widest reading, and share their borders. Positioning and the leader line
 * follow `<obc-transmitter>`.
 *
 * ### Features / Variants
 * - **`orientation`** – `top`, `right`, `bottom`, `left`; the edge the leader
 *   line attaches to. `top` places the id tags above the chip.
 * - **Values** – `value` and `unit` per segment. `idTag` adds a label row under
 *   every segment once any value has one, so the chip stays aligned.
 * - **Formatting** – per value `fractionDigits` (default `1`), `maxDigits`
 *   (default `0`), `hintedZeros` and `hasSignSpacer`, formatted like
 *   `<obc-transmitter-button>`. An omitted key takes its default; a key set to
 *   `null`, `undefined` or `NaN` renders the reading as the unavailable dash.
 * - **Icons** – `iconSlotName` projects the light-DOM element with that slot
 *   name as the segment's icon; names must be unique within the stack. The
 *   name is chosen per value, so it carries no `@slot` tag (the wrapper
 *   generator needs literal names).
 * - **Accessible name** – each segment is a native button named by its
 *   reading, unit and `idTag`; the visible tag is hidden from assistive
 *   technology so it is not read twice.
 * - **Empty** – with no `values` nothing renders, leader line included.
 *
 * ### Usage Guidelines
 * Use when one measuring point reports several quantities that belong to one
 * tag on the diagram. For a single reading, a tag pill or a trend graph, use
 * `<obc-transmitter>`. Each segment's hit area is `<obc-transmitter-button>`'s
 * chip (26 px high), below the 48 px touch-target token; see its design note.
 *
 * ### Slots
 * | Slot Name        | Conditions                      | Purpose                       |
 * |------------------|---------------------------------|-------------------------------|
 * | `<iconSlotName>` | a value declares `iconSlotName` | Icon in that value's segment. |
 *
 * @property orientation - Edge of the chip the leader line attaches to.
 * @property lineType - Line the transmitter sits on; offsets the leader line by half its stroke.
 * @property values - One segment per entry, in order.
 * @fires {CustomEvent<TransmitterStackValueClickDetail>} value-click - Fired when a segment is activated, with its value and index.
 * @fires click - Fired when any segment is clicked; `value-click` tells which.
 * @experimental
 */
@customElement('obc-transmitter-stack')
export class ObcTransmitterStack extends LitElement {
  @property({type: String}) orientation: TransmitterOrientation =
    TransmitterOrientation.bottom;
  @property({type: String}) lineType: LineType | undefined = undefined;
  @property({type: Array}) values: TransmitterStackValue[] = [];

  private handleValueClick(index: number, value: TransmitterStackValue): void {
    this.dispatchEvent(
      new CustomEvent<TransmitterStackValueClickDetail>('value-click', {
        detail: {index, value},
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderValue(
    entry: TransmitterStackValue,
    index: number,
    hasIdTags: boolean
  ) {
    // `in`, not `??` alone: a key that is present but empty is a failed
    // runtime write and must reach the block as missing (NaN renders the dash,
    // readout-components.md § 2).
    return html`
      <div class="cell" part="cell">
        <obc-transmitter-button
          class="segment"
          .variant=${TransmitterButtonVariant.value}
          .value=${entry.value}
          .unit=${entry.unit ?? ''}
          .fractionDigits=${'fractionDigits' in entry
            ? (entry.fractionDigits ?? NaN)
            : 1}
          .maxDigits=${'maxDigits' in entry ? (entry.maxDigits ?? NaN) : 0}
          .hintedZeros=${entry.hintedZeros ?? false}
          .hasSignSpacer=${entry.hasSignSpacer ?? false}
          .hasIcon=${Boolean(entry.iconSlotName)}
          .idTag=${entry.idTag ?? ''}
          @click=${() => this.handleValueClick(index, entry)}
        >
          ${entry.iconSlotName
            ? html`<slot name=${entry.iconSlotName} slot="icon"></slot>`
            : nothing}
        </obc-transmitter-button>
        ${hasIdTags
          ? html`<div class="id-tag" aria-hidden="true">
              ${entry.idTag ?? ''}
            </div>`
          : nothing}
      </div>
    `;
  }

  override render() {
    if (this.values.length === 0) {
      return nothing;
    }
    const hasIdTags = this.values.some((entry) => Boolean(entry.idTag));
    return html`
      <div
        class=${classMap({
          transmitter: true,
          [`orientation-${this.orientation}`]: true,
        })}
        style="--offset: ${transmitterLeaderOffset(this.lineType)}px;"
      >
        <div class="values" part="values">
          ${this.values.map((entry, index) =>
            this.renderValue(entry, index, hasIdTags)
          )}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-transmitter-stack': ObcTransmitterStack;
  }
}
