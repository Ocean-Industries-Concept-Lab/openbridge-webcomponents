import {PropertyValues, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {localized, msg} from '@lit/localize';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list-experimental.css?inline';
import {
  ObcAlertListBase,
  type AlertListEmptyFallback,
} from '../alert-list/alert-list-base.js';
import {ownEntryOf} from '../../alert-system/alert-standard.js';
import {
  AlertStandardController,
  getDefaultAlertStandardId,
} from '../../alert-system/alert-standard-registry.js';
import {isAlertIncludedInFilter} from '../../alert-system/read-standard-alert.js';
import type {AlertStandardCriticalityAndState} from '../../alert-system/standard-alert.js';

function standardCriticalityAndStateOfItem(
  item: HTMLElement
): AlertStandardCriticalityAndState {
  const properties = item as Partial<AlertStandardCriticalityAndState>;
  return {
    standard:
      properties.standard ??
      item.getAttribute('standard') ??
      getDefaultAlertStandardId(),
    criticality:
      properties.criticality ?? item.getAttribute('criticality') ?? '',
    state: properties.state ?? item.getAttribute('state') ?? '',
  };
}

/**
 * `<obc-alert-list-experimental>` – Scrolling list of alert items that shows
 * the ones a filter of their alert standard includes and hides the rest.
 *
 * ### Features
 * - **Filter:** `filterId` names a filter, such as `active` or `unacked`. An
 *   item shows when the state its `standard`, `criticality` and `state`
 *   name is included in that filter (`alert-system/`). Every item shows
 *   without a `filterId`.
 * - **Custom filter:** `customFilter` narrows what shows further.
 * - **Hiding:** the list sets the `hidden` attribute of every item it leaves
 *   out, and clears it on the others.
 * - **Empty state:** the icon and title the standard gives the filter show
 *   when no item matches, unless the `empty-*` slots are filled.
 * - **Motion:** items slide to their new place, and new items play their
 *   intro animation once the list has been seen.
 *
 * ### Usage Guidelines
 * `obc-alert-menu-experimental` renders one for its selected tab; use it on
 * its own for `obc-alert-menu-item-experimental` elements outside the menu.
 * The list owns the `hidden` attribute of its items, so do not bind `hidden`
 * on them.
 *
 * @property filterId - The filter whose alerts show; every item shows when unset.
 * @property customFilter - Predicate an item must also pass to show.
 * @property standard - The standard whose filter supplies the empty state; the default standard when unset.
 * @slot - The alert items, as `obc-alert-menu-item-experimental` elements.
 * @slot empty-icon - Icon shown when no item matches; the filter's icon when left empty.
 * @slot empty-title - Title shown when no item matches; the filter's title when left empty.
 * @slot empty-description - Description shown when no item matches.
 * @experimental
 */
@customElement('obc-alert-list-experimental')
@localized()
export class ObcAlertListExperimental extends ObcAlertListBase {
  @property({type: String}) filterId?: string;
  @property({attribute: false}) customFilter?: (item: HTMLElement) => boolean;
  @property({type: String}) standard?: string;

  private readonly standardController = new AlertStandardController(this);

  protected override get observedItemAttributes(): string[] {
    return ['standard', 'criticality', 'state'];
  }

  protected override matchesFilter(item: HTMLElement): boolean {
    return (
      isAlertIncludedInFilter(
        standardCriticalityAndStateOfItem(item),
        this.filterId
      ) &&
      (this.customFilter?.(item) ?? true)
    );
  }

  protected override filterChanged(changed: PropertyValues): boolean {
    return changed.has('filterId') || changed.has('customFilter');
  }

  protected override applyFilter() {
    for (const item of this.alertItems) {
      item.hidden = !this.matchesFilter(item);
    }
    super.applyFilter();
  }

  protected override get emptyFallback(): AlertListEmptyFallback {
    const filter = ownEntryOf(
      this.standardController.standard?.filters,
      this.filterId
    );
    return {
      icon: filter?.iconWhenNoAlertIsIncluded,
      title: filter?.titleWhenNoAlertIsIncluded() ?? msg('No alerts'),
    };
  }

  static override styles = [ObcAlertListBase.styles, unsafeCSS(compentStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-experimental': ObcAlertListExperimental;
  }
}
