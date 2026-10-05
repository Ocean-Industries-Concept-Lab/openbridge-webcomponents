import {PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcAlertListBase} from './alert-list-base.js';

/**
 * `<obc-alert-list>` – Scrolling list of alert items with an empty state.
 *
 * `filter` decides which items count: the empty state shows when none does,
 * and `getVisibleElements()` returns only those. Hiding the other items is
 * left to the consumer's CSS.
 *
 * @property filter - Predicate that picks the items the list counts as shown.
 * @slot - Default slot for the alert list items.
 * @slot empty-icon - Icon shown when the list is empty.
 * @slot empty-title - Title shown when the list is empty.
 * @slot empty-description - Description shown when the list is empty.
 * @stable
 */
@customElement('obc-alert-list')
export class ObcAlertList extends ObcAlertListBase {
  @property({attribute: false}) filter: (item: HTMLElement) => boolean = () =>
    true;

  protected override matchesFilter(item: HTMLElement): boolean {
    return this.filter(item);
  }

  protected override filterChanged(changed: PropertyValues): boolean {
    return changed.has('filter');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list': ObcAlertList;
  }
}
