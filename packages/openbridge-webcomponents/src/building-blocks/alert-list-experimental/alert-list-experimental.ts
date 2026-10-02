import {PropertyValues, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list-experimental.css?inline';
import {
  ObcAlertListBase,
  type AlertListEmptyFallback,
} from '../alert-list/alert-list-base.js';
import {alertMenuItemState} from './alert-menu-item-state.js';
import {
  AlertFilterMode,
  alertFilterModeData,
  matchesAlertFilter,
} from '../../alert-filter.js';

/**
 * `<obc-alert-list-experimental>` – Scrolling list of alert items that shows
 * the ones its filter mode lists and hides the rest.
 *
 * ### Features
 * - **Filter modes:** `filterMode` shows every item, the active or the unacked
 *   ones, the shelved or the blocked ones, or the ones `customFilter` accepts.
 *   The modes mean the same as in `obc-alert-list-details-experimental`
 *   (`AlertFilterMode` in `alert-filter.ts`); an item's state is read from its
 *   `status`, `shelved` and `blocked` properties.
 * - **Hiding:** the list sets the `hidden` attribute of every item the filter
 *   mode leaves out, and clears it on the others.
 * - **Empty state:** the filter mode's icon and title show when no item
 *   matches, unless the `empty-*` slots are filled.
 * - **Motion:** items slide to their new place, and new items play their intro
 *   animation once the list has been seen.
 *
 * ### Usage Guidelines
 * `obc-alert-menu-experimental` renders one for its selected tab; use it on its
 * own for `obc-alert-menu-item` elements outside the menu. The list owns the
 * `hidden` attribute of its items, so do not bind `hidden` on them.
 * `obc-alert-list` counts items by a predicate instead and leaves hiding them
 * to the consumer's CSS.
 *
 * @property filterMode - Which items to show: `all`, `active` or `unacked` (both without shelved and blocked items), `shelved`, `blocked`, or `custom`.
 * @property customFilter - Predicate that picks the items to show in `custom` mode. Every item shows without one.
 * @availableWhen customFilter filterMode==custom
 * @slot - The alert items, as `obc-alert-menu-item` elements.
 * @slot empty-icon - Icon shown when no item matches; the filter mode's icon when left empty.
 * @slot empty-title - Title shown when no item matches; the filter mode's title when left empty.
 * @slot empty-description - Description shown when no item matches.
 * @experimental
 */
@customElement('obc-alert-list-experimental')
export class ObcAlertListExperimental extends ObcAlertListBase {
  @property({type: String}) filterMode: AlertFilterMode = AlertFilterMode.All;
  @property({attribute: false}) customFilter?: (item: HTMLElement) => boolean;

  protected override get observedItemAttributes(): string[] {
    return ['status', 'shelved', 'blocked'];
  }

  protected override matchesFilter(item: HTMLElement): boolean {
    if (this.filterMode === AlertFilterMode.Custom) {
      return this.customFilter?.(item) ?? true;
    }
    return matchesAlertFilter(alertMenuItemState(item), this.filterMode);
  }

  protected override filterChanged(changed: PropertyValues): boolean {
    return changed.has('filterMode') || changed.has('customFilter');
  }

  protected override applyFilter() {
    for (const item of this.alertItems) {
      item.hidden = !this.matchesFilter(item);
    }
    super.applyFilter();
  }

  protected override get emptyFallback(): AlertListEmptyFallback {
    const {emptyIcon, emptyTitle} = alertFilterModeData(this.filterMode);
    return {icon: emptyIcon, title: emptyTitle};
  }

  static override styles = [ObcAlertListBase.styles, unsafeCSS(compentStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-experimental': ObcAlertListExperimental;
  }
}
