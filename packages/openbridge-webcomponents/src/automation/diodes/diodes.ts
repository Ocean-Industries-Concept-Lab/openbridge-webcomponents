import {property} from 'lit/decorators.js';
import '../../icons/icon-diodes-01-on.js';
import '../../icons/icon-diodes-01-off.js';
import '../../icons/icon-diodes-01.js';
import '../../icons/icon-diodes-02-on.js';
import '../../icons/icon-diodes-02-off.js';
import '../../icons/icon-diodes-02.js';
import '../../icons/icon-diodes-03-on.js';
import '../../icons/icon-diodes-03-off.js';
import '../../icons/icon-diodes-03.js';
import '../../icons/icon-diodes-04-on.js';
import '../../icons/icon-diodes-04-off.js';
import '../../icons/icon-diodes-04.js';
import '../../icons/icon-diodes-05-on.js';
import '../../icons/icon-diodes-05-off.js';
import '../../icons/icon-diodes-05.js';
import '../../icons/icon-diodes-06-on.js';
import '../../icons/icon-diodes-06-off.js';
import '../../icons/icon-diodes-06.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum DiodesAlternativeIcon {
  diodes01 = 'diodes01',
  diodes02 = 'diodes02',
  diodes03 = 'diodes03',
  diodes04 = 'diodes04',
  diodes05 = 'diodes05',
  diodes06 = 'diodes06',
}

const icons: Record<DiodesAlternativeIcon, SquaredDeviceIcons> = {
  [DiodesAlternativeIcon.diodes01]: {
    on: 'diodes-01-on',
    off: 'diodes-01-off',
    static: 'diodes-01',
  },
  [DiodesAlternativeIcon.diodes02]: {
    on: 'diodes-02-on',
    off: 'diodes-02-off',
    static: 'diodes-02',
  },
  [DiodesAlternativeIcon.diodes03]: {
    on: 'diodes-03-on',
    off: 'diodes-03-off',
    static: 'diodes-03',
  },
  [DiodesAlternativeIcon.diodes04]: {
    on: 'diodes-04-on',
    off: 'diodes-04-off',
    static: 'diodes-04',
  },
  [DiodesAlternativeIcon.diodes05]: {
    on: 'diodes-05-on',
    off: 'diodes-05-off',
    static: 'diodes-05',
  },
  [DiodesAlternativeIcon.diodes06]: {
    on: 'diodes-06-on',
    off: 'diodes-06-off',
    static: 'diodes-06',
  },
};

/**
 * @stable
 */
@customElement('obc-diodes')
export class ObcDiodes extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: DiodesAlternativeIcon =
    DiodesAlternativeIcon.diodes01;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[DiodesAlternativeIcon.diodes01]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-diodes': ObcDiodes;
  }
}
