import {LitElement, html, unsafeCSS, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './checkbox-list.css?inline';
import {
  ObcCheckboxItem,
  ObcCheckboxItemHoverStyle,
  type ObcCheckboxItemExpandToggleEvent,
} from '../checkbox-item/checkbox-item.js';
import '../checkbox-item/checkbox-item.js';
import {computeHiddenRows} from './checkbox-list-visibility.js';

/**
 * `<obc-checkbox-list>` – A vertical list of `<obc-checkbox-item>` rows that
 * collapses the rows under a closed parent.
 *
 * ### Overview
 * Rows are slotted flat, in document order; the tree is read from each row's
 * `level`. When an expandable row is collapsed, the list sets `hidden` on
 * every following row with a greater level until a row of equal or smaller
 * level. The list also applies its `hoverStyle` to every row so a list reads
 * as one surface.
 *
 * ### Features
 * - Flat markup, level-driven hierarchy — no nesting of elements required.
 * - Handles `expand-toggle`: sets the row's `expanded` and recomputes.
 * - Reacts to `expanded` and `level` attribute changes made from outside.
 * - `hoverStyle` forwarded to slotted rows, including rows added later.
 *
 * ### Usage Guidelines
 * - Start levels at 1 when any row is expandable so chevrons and checkboxes
 *   align; use level 0 for a plain list.
 * - The list owns the `hidden` attribute of its rows; do not bind it yourself.
 * - Selection stays per row: listen to each row's `change`.
 *
 * ### Accessibility
 * Rows are ordinary checkboxes and buttons in the natural tab order inside a
 * `role="group"`; hidden rows leave the tab order. This is a group of
 * checkboxes with disclosure buttons, not a tree widget, so there is no
 * roving tabindex. Name the group with `aria-label` or `aria-labelledby` on
 * the host.
 *
 * ### Example
 * ```html
 * <obc-checkbox-list aria-label="Report types">
 *   <obc-checkbox-item level="1" expandable expanded status="mixed" label="Reports"></obc-checkbox-item>
 *   <obc-checkbox-item level="2" status="checked" label="Monthly"></obc-checkbox-item>
 *   <obc-checkbox-item level="2" label="Quarterly"></obc-checkbox-item>
 *   <obc-checkbox-item level="1" expandable label="Archive"></obc-checkbox-item>
 * </obc-checkbox-list>
 * ```
 *
 * @property hoverStyle - Hover treatment applied to every slotted row: `touch-target` or `visual-target`.
 * @slot - `obc-checkbox-item` rows in document order; hierarchy comes from each row's `level`.
 * @beta
 */
@customElement('obc-checkbox-list')
export class ObcCheckboxList extends LitElement {
  @property({type: String}) hoverStyle: ObcCheckboxItemHoverStyle =
    ObcCheckboxItemHoverStyle.touchTarget;

  private mutationObserver?: MutationObserver;

  override connectedCallback(): void {
    super.connectedCallback();
    // Rows are light-DOM children owned by the consumer, so `expanded` and
    // `level` can change without any event reaching the list.
    this.mutationObserver = new MutationObserver(() => this.sync());
    this.mutationObserver.observe(this, {
      childList: true,
      attributes: true,
      attributeFilter: ['expanded', 'level'],
      subtree: true,
    });
    this.addEventListener('expand-toggle', this.onExpandToggle);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
    this.removeEventListener('expand-toggle', this.onExpandToggle);
  }

  override firstUpdated(): void {
    this.sync();
  }

  override updated(changed: PropertyValues<this>): void {
    if (changed.has('hoverStyle')) this.sync();
  }

  private onExpandToggle = (event: Event): void => {
    const row = event.target;
    if (!(row instanceof ObcCheckboxItem)) return;
    row.expanded = (event as ObcCheckboxItemExpandToggleEvent).detail;
    this.sync();
  };

  private rows(): ObcCheckboxItem[] {
    return Array.from(this.children).filter(
      (el): el is ObcCheckboxItem => el instanceof ObcCheckboxItem
    );
  }

  private sync(): void {
    const rows = this.rows();
    const hidden = computeHiddenRows(rows);
    rows.forEach((row, i) => {
      row.hoverStyle = this.hoverStyle;
      row.hidden = hidden[i];
    });
  }

  override render() {
    return html`<div class="list" role="group">
      <slot @slotchange=${() => this.sync()}></slot>
    </div>`;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-checkbox-list': ObcCheckboxList;
  }
}
