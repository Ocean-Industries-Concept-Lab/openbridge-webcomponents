import {property} from 'lit/decorators.js';
import '../../icons/icon-converter-dcdc-on.js';
import '../../icons/icon-converter-dcdc-off.js';
import '../../icons/icon-converter-dcdc.js';
import '../../icons/icon-converter-dcac-on.js';
import '../../icons/icon-converter-dcac-off.js';
import '../../icons/icon-converter-dcac-static.js';
import '../../icons/icon-converter-acdc-on.js';
import '../../icons/icon-converter-acdc-off.js';
import '../../icons/icon-converter-acdc-static.js';
import '../../icons/icon-converter-acac-on.js';
import '../../icons/icon-converter-acac-off.js';
import '../../icons/icon-converter-acac-static.js';
import '../../icons/icon-converter-acvac-on.js';
import '../../icons/icon-converter-acvac-off.js';
import '../../icons/icon-converter-acvac-static.js';
import '../../icons/icon-converter-vacac-on.js';
import '../../icons/icon-converter-vacac-off.js';
import '../../icons/icon-converter-vacac-static.js';
import '../../icons/icon-converter-vacvac-on.js';
import '../../icons/icon-converter-vacvac-off.js';
import '../../icons/icon-converter-vacvac-static.js';
import '../../icons/icon-converter-filter-1-on.js';
import '../../icons/icon-converter-filter-1-off.js';
import '../../icons/icon-converter-filter-1.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum ConverterAlternativeIcon {
  converterDcdc = 'converterDcdc',
  converterDcac = 'converterDcac',
  converterAcdc = 'converterAcdc',
  converterAcac = 'converterAcac',
  converterAcvac = 'converterAcvac',
  converterVacac = 'converterVacac',
  converterVacvac = 'converterVacvac',
  converterFilter1 = 'converterFilter1',
}

const icons: Record<ConverterAlternativeIcon, SquaredDeviceIcons> = {
  [ConverterAlternativeIcon.converterDcdc]: {
    on: 'converter-dcdc-on',
    off: 'converter-dcdc-off',
    static: 'converter-dcdc',
  },
  [ConverterAlternativeIcon.converterDcac]: {
    on: 'converter-dcac-on',
    off: 'converter-dcac-off',
    static: 'converter-dcac-static',
  },
  [ConverterAlternativeIcon.converterAcdc]: {
    on: 'converter-acdc-on',
    off: 'converter-acdc-off',
    static: 'converter-acdc-static',
  },
  [ConverterAlternativeIcon.converterAcac]: {
    on: 'converter-acac-on',
    off: 'converter-acac-off',
    static: 'converter-acac-static',
  },
  [ConverterAlternativeIcon.converterAcvac]: {
    on: 'converter-acvac-on',
    off: 'converter-acvac-off',
    static: 'converter-acvac-static',
  },
  [ConverterAlternativeIcon.converterVacac]: {
    on: 'converter-vacac-on',
    off: 'converter-vacac-off',
    static: 'converter-vacac-static',
  },
  [ConverterAlternativeIcon.converterVacvac]: {
    on: 'converter-vacvac-on',
    off: 'converter-vacvac-off',
    static: 'converter-vacvac-static',
  },
  [ConverterAlternativeIcon.converterFilter1]: {
    on: 'converter-filter-1-on',
    off: 'converter-filter-1-off',
    static: 'converter-filter-1',
  },
};

/**
 * @stable
 */
@customElement('obc-converter')
export class ObcConverter extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: ConverterAlternativeIcon =
    ConverterAlternativeIcon.converterDcdc;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ??
        icons[ConverterAlternativeIcon.converterDcdc]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-converter': ObcConverter;
  }
}
