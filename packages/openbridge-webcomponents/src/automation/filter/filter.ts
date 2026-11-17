import {property} from 'lit/decorators.js';
import '../../icons/icon-filter-1-on.js';
import '../../icons/icon-filter-1-off.js';
import '../../icons/icon-filter-1.js';
import '../../icons/icon-filter-2-on.js';
import '../../icons/icon-filter-2-off.js';
import '../../icons/icon-filter-2.js';
import '../../icons/icon-filter-3-on.js';
import '../../icons/icon-filter-3-off.js';
import '../../icons/icon-filter-3.js';
import '../../icons/icon-filter-4-on.js';
import '../../icons/icon-filter-4-off.js';
import '../../icons/icon-filter-4.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum FilterAlternativeIcon {
  filter1 = 'filter1',
  filter2 = 'filter2',
  filter3 = 'filter3',
  filter4 = 'filter4',
}

const icons: Record<FilterAlternativeIcon, SquaredDeviceIcons> = {
  [FilterAlternativeIcon.filter1]: {
    on: 'filter-1-on',
    off: 'filter-1-off',
    static: 'filter-1',
  },
  [FilterAlternativeIcon.filter2]: {
    on: 'filter-2-on',
    off: 'filter-2-off',
    static: 'filter-2',
  },
  [FilterAlternativeIcon.filter3]: {
    on: 'filter-3-on',
    off: 'filter-3-off',
    static: 'filter-3',
  },
  [FilterAlternativeIcon.filter4]: {
    on: 'filter-4-on',
    off: 'filter-4-off',
    static: 'filter-4',
  },
};

/**
 * @stable
 */
@customElement('obc-filter')
export class ObcFilter extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: FilterAlternativeIcon =
    FilterAlternativeIcon.filter1;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[FilterAlternativeIcon.filter1]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-filter': ObcFilter;
  }
}
