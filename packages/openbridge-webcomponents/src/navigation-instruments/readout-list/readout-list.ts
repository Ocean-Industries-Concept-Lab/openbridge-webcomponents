import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './readout-list.css?inline';
import {customElement} from '../../decorator.js';
import '../readout-list-item/readout-list-item.js';
import {ObcReadoutListItem} from '../readout-list-item/readout-list-item.js';

const ITEM_TAG = 'obc-readout-list-item';

/** Child attributes whose change should re-trigger alignment (HTML-attribute usage). */
const OBSERVED_ATTRIBUTES = [
  'unit',
  'src',
  'value',
  'setpoint',
  'advice',
  'max-digits',
  'fraction-digits',
  'has-degree',
  'has-setpoint',
  'has-advice',
];

/** Integer-digit count of a numeric value (sign and fraction excluded). */
function integerDigitCount(value: number | null | undefined): number {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 0;
  }
  return String(Math.trunc(Math.abs(value))).length;
}

/**
 * `<obc-readout-list>` – A container that groups `<obc-readout-list-item>` rows
 * and **auto-aligns their columns**.
 *
 * Because each row is its own custom element, cross-row column alignment is not
 * automatic. This container inspects its rows and pushes shared width reservers
 * down so the unit column, the value / setpoint / advice columns and the source
 * column all line up — the same effect the `Readout List Item → ColumnAlignment`
 * story achieves by hand, done for you. Alignment is always on.
 *
 * What it equalizes — derived from each row's data and broadcast to every row, so
 * the widest value / unit / source is never clipped:
 * - **Unit:** the longest `unit` becomes every row's unit space-reserver.
 * - **Value / setpoint / advice:** the widest numeric width (max integer digits +
 *   max fraction digits across rows, derived from each row's `maxDigits` /
 *   `fractionDigits` / current values) is reserved on every row's numeric blocks.
 *   Reserving off digit counts keeps it stable as live values update.
 * - **Source:** the longest `src` becomes every row's source space-reserver.
 * - **Degree:** if any row has a degree, non-degree rows reserve the degree column
 *   (`hasDegreeSpacer`) so their digits line up with the degree rows; the spacer is
 *   cleared once no degree rows remain.
 *
 * The list **owns** these reservers: it recomputes them from the rows' data on
 * every pass (and clears stale reservers / spacers when rows change), so a
 * `spaceReserver` set directly on a row inside the list is overwritten. Drive the
 * data (`maxDigits` / `fractionDigits` / `unit` / `src`) rather than setting a
 * manual reserver when a row lives in a list.
 *
 * Alignment runs on `slotchange` and on child mutations (added/removed rows and
 * HTML-attribute changes). When rows are updated via JS **properties** only (no
 * attribute/DOM mutation), call {@link align} to recompute.
 *
 * @experimental Pilot for the new primitives + per-block options Readout API; the
 * API may change in a future release.
 *
 * @slot - The `<obc-readout-list-item>` rows.
 *
 * @csspart list - The vertical stack container.
 */
@customElement('obc-readout-list')
export class ObcReadoutList extends LitElement {
  /**
   * Development aid: outline each row's readout building blocks (red), degree
   * columns (blue) and degree spacer (green) so the reserved column widths are
   * visible. Propagated to every row. Off by default.
   */
  @property({type: Boolean, reflect: true}) showDebugOverlay = false;

  private mutationObserver?: MutationObserver;

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    // A host-property change is not seen by the child MutationObserver, so
    // re-propagate `showDebugOverlay` (and re-align) when it toggles.
    if (changed.has('showDebugOverlay')) {
      this.align();
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
    super.disconnectedCallback();
  }

  /** The `obc-readout-list-item` rows, including those nested in wrapper elements. */
  private get items(): ObcReadoutListItem[] {
    const slot = this.shadowRoot?.querySelector('slot');
    const assigned = slot?.assignedElements({flatten: true}) ?? [];
    return assigned.flatMap((el) =>
      el.tagName.toLowerCase() === ITEM_TAG
        ? [el as ObcReadoutListItem]
        : Array.from(el.querySelectorAll<ObcReadoutListItem>(ITEM_TAG))
    );
  }

  /**
   * Recompute and apply the shared column reservers across all rows. Call this
   * after updating rows via JS properties only (attribute/DOM changes are picked
   * up automatically).
   */
  align(): void {
    const items = this.items;
    if (items.length === 0) {
      return;
    }

    let maxIntegerDigits = 0;
    let maxFractionDigits = 0;
    let longestUnit = '';
    let longestSrc = '';
    let anyDegree = false;

    for (const item of items) {
      maxFractionDigits = Math.max(maxFractionDigits, item.fractionDigits ?? 0);
      maxIntegerDigits = Math.max(
        maxIntegerDigits,
        item.maxDigits ?? 0,
        integerDigitCount(item.value),
        item.hasSetpoint ? integerDigitCount(item.setpoint) : 0,
        item.hasAdvice ? integerDigitCount(item.advice) : 0
      );
      if (item.unit && item.unit.length > longestUnit.length) {
        longestUnit = item.unit;
      }
      if (item.src && item.src.length > longestSrc.length) {
        longestSrc = item.src;
      }
      if (item.hasDegree) {
        anyDegree = true;
      }
    }

    const numericReserver =
      maxIntegerDigits > 0
        ? '0'.repeat(maxIntegerDigits) +
          (maxFractionDigits > 0 ? `.${'0'.repeat(maxFractionDigits)}` : '')
        : undefined;

    // Our writes are properties (no reflected attributes), so they do not trigger
    // the MutationObserver; disconnecting around them is belt-and-suspenders.
    this.mutationObserver?.disconnect();
    for (const item of items) {
      // Recompute every reserver / spacer on every pass (do not gate on a value
      // being present), so stale state clears when rows change — e.g. when the
      // last degree row, the last unit, or the last source is removed.
      item.valueOptions = {
        ...item.valueOptions,
        spaceReserver: numericReserver,
      };
      item.setpointOptions = {
        ...item.setpointOptions,
        spaceReserver: numericReserver,
      };
      item.adviceOptions = {
        ...item.adviceOptions,
        spaceReserver: numericReserver,
      };
      item.unitOptions = {
        ...item.unitOptions,
        spaceReserver: longestUnit || undefined,
      };
      item.srcOptions = {
        ...item.srcOptions,
        spaceReserver: longestSrc || undefined,
      };
      item.hasDegreeSpacer = anyDegree && !item.hasDegree;
      item.showDebugOverlay = this.showDebugOverlay;
    }
    this.observeChildren();
  }

  private observeChildren(): void {
    if (!this.mutationObserver) {
      this.mutationObserver = new MutationObserver(() => this.align());
    }
    this.mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: OBSERVED_ATTRIBUTES,
    });
  }

  private handleSlotChange = (): void => {
    this.align();
    this.observeChildren();
  };

  override render() {
    return html`
      <div class="list" part="list">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-readout-list': ObcReadoutList;
  }
}
