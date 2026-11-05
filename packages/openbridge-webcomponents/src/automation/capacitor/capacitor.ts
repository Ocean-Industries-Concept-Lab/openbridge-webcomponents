import {property} from 'lit/decorators.js';
import '../../icons/icon-capacitor-01-on.js';
import '../../icons/icon-capacitor-01-off.js';
import '../../icons/icon-capacitor-01.js';
import '../../icons/icon-capacitor-02-on.js';
import '../../icons/icon-capacitor-02-off.js';
import '../../icons/icon-capacitor-02.js';
import '../../icons/icon-capacitor-03-on.js';
import '../../icons/icon-capacitor-03-off.js';
import '../../icons/icon-capacitor-03.js';
import '../../icons/icon-capacitor-04-on.js';
import '../../icons/icon-capacitor-04-off.js';
import '../../icons/icon-capacitor-04.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum CapacitorAlternativeIcon {
  capacitor01 = 'capacitor01',
  capacitor02 = 'capacitor02',
  capacitor03 = 'capacitor03',
  capacitor04 = 'capacitor04',
}

const icons: Record<CapacitorAlternativeIcon, SquaredDeviceIcons> = {
  [CapacitorAlternativeIcon.capacitor01]: {
    on: 'capacitor-01-on',
    off: 'capacitor-01-off',
    static: 'capacitor-01',
  },
  [CapacitorAlternativeIcon.capacitor02]: {
    on: 'capacitor-02-on',
    off: 'capacitor-02-off',
    static: 'capacitor-02',
  },
  [CapacitorAlternativeIcon.capacitor03]: {
    on: 'capacitor-03-on',
    off: 'capacitor-03-off',
    static: 'capacitor-03',
  },
  [CapacitorAlternativeIcon.capacitor04]: {
    on: 'capacitor-04-on',
    off: 'capacitor-04-off',
    static: 'capacitor-04',
  },
};

/**
 * @stable
 */
@customElement('obc-capacitor')
export class ObcCapacitor extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: CapacitorAlternativeIcon =
    CapacitorAlternativeIcon.capacitor01;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[CapacitorAlternativeIcon.capacitor01]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-capacitor': ObcCapacitor;
  }
}
