import {property} from 'lit/decorators.js';
import '../../icons/icon-bipolar-transistor-on.js';
import '../../icons/icon-bipolar-transistor-off.js';
import '../../icons/icon-bipolar-transistor-01.js';
import '../../icons/icon-bipolar-transistor-02-on.js';
import '../../icons/icon-bipolar-transistor-02-off.js';
import '../../icons/icon-bipolar-transistor-02.js';
import '../../icons/icon-bipolar-transistor-03-on.js';
import '../../icons/icon-bipolar-transistor-03-off.js';
import '../../icons/icon-bipolar-transistor-03.js';
import '../../icons/icon-bipolar-transistor-04-on.js';
import '../../icons/icon-bipolar-transistor-04-off.js';
import '../../icons/icon-bipolar-transistor-04.js';
import '../../icons/icon-bipolar-transistor-03-flat.js';
import '../../icons/icon-bipolar-transistor-04-flat.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum BipolarTransistorAlternativeIcon {
  bipolarTransistor01 = 'bipolarTransistor01',
  bipolarTransistor02 = 'bipolarTransistor02',
  bipolarTransistor03 = 'bipolarTransistor03',
  bipolarTransistor04 = 'bipolarTransistor04',
  bipolarTransistor03Flat = 'bipolarTransistor03Flat',
  bipolarTransistor04Flat = 'bipolarTransistor04Flat',
}

const icons: Record<BipolarTransistorAlternativeIcon, SquaredDeviceIcons> = {
  [BipolarTransistorAlternativeIcon.bipolarTransistor01]: {
    on: 'bipolar-transistor-on',
    off: 'bipolar-transistor-off',
    static: 'bipolar-transistor-01',
  },
  [BipolarTransistorAlternativeIcon.bipolarTransistor02]: {
    on: 'bipolar-transistor-02-on',
    off: 'bipolar-transistor-02-off',
    static: 'bipolar-transistor-02',
  },
  [BipolarTransistorAlternativeIcon.bipolarTransistor03]: {
    on: 'bipolar-transistor-03-on',
    off: 'bipolar-transistor-03-off',
    static: 'bipolar-transistor-03',
  },
  [BipolarTransistorAlternativeIcon.bipolarTransistor04]: {
    on: 'bipolar-transistor-04-on',
    off: 'bipolar-transistor-04-off',
    static: 'bipolar-transistor-04',
  },
  [BipolarTransistorAlternativeIcon.bipolarTransistor03Flat]: {
    on: 'bipolar-transistor-03-flat',
    off: 'bipolar-transistor-03-flat',
  },
  [BipolarTransistorAlternativeIcon.bipolarTransistor04Flat]: {
    on: 'bipolar-transistor-04-flat',
    off: 'bipolar-transistor-04-flat',
  },
};

/**
 * @stable
 */
@customElement('obc-bipolar-transistor')
export class ObcBipolarTransistor extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: BipolarTransistorAlternativeIcon =
    BipolarTransistorAlternativeIcon.bipolarTransistor01;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ??
        icons[BipolarTransistorAlternativeIcon.bipolarTransistor01]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bipolar-transistor': ObcBipolarTransistor;
  }
}
