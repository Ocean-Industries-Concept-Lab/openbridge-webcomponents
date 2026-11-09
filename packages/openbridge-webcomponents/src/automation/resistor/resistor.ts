import {property} from 'lit/decorators.js';
import '../../icons/icon-resistor-1-on.js';
import '../../icons/icon-resistor-1-off.js';
import '../../icons/icon-resistor-1.js';
import '../../icons/icon-resistor-2-on.js';
import '../../icons/icon-resistor-2-off.js';
import '../../icons/icon-resistor-2.js';
import '../../icons/icon-resistor-3-on.js';
import '../../icons/icon-resistor-3-off.js';
import '../../icons/icon-resistor-3.js';
import '../../icons/icon-resistor-4-on.js';
import '../../icons/icon-resistor-4-off.js';
import '../../icons/icon-resistor-4.js';
import '../../icons/icon-resistor-5-on.js';
import '../../icons/icon-resistor-5-off.js';
import '../../icons/icon-resistor-5.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum ResistorAlternativeIcon {
  resistor1 = 'resistor1',
  resistor2 = 'resistor2',
  resistor3 = 'resistor3',
  resistor4 = 'resistor4',
  resistor5 = 'resistor5',
}

const icons: Record<ResistorAlternativeIcon, SquaredDeviceIcons> = {
  [ResistorAlternativeIcon.resistor1]: {
    on: 'resistor-1-on',
    off: 'resistor-1-off',
    static: 'resistor-1',
  },
  [ResistorAlternativeIcon.resistor2]: {
    on: 'resistor-2-on',
    off: 'resistor-2-off',
    static: 'resistor-2',
  },
  [ResistorAlternativeIcon.resistor3]: {
    on: 'resistor-3-on',
    off: 'resistor-3-off',
    static: 'resistor-3',
  },
  [ResistorAlternativeIcon.resistor4]: {
    on: 'resistor-4-on',
    off: 'resistor-4-off',
    static: 'resistor-4',
  },
  [ResistorAlternativeIcon.resistor5]: {
    on: 'resistor-5-on',
    off: 'resistor-5-off',
    static: 'resistor-5',
  },
};

/**
 * @stable
 */
@customElement('obc-resistor')
export class ObcResistor extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: ResistorAlternativeIcon =
    ResistorAlternativeIcon.resistor1;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[ResistorAlternativeIcon.resistor1]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-resistor': ObcResistor;
  }
}
