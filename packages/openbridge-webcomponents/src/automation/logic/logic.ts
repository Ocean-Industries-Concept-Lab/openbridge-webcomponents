import {property} from 'lit/decorators.js';
import '../../icons/icon-logic-01-on.js';
import '../../icons/icon-logic-01-off.js';
import '../../icons/icon-logic-01.js';
import '../../icons/icon-logic-02-on.js';
import '../../icons/icon-logic-02-off.js';
import '../../icons/icon-logic-02.js';
import '../../icons/icon-logic-03-on.js';
import '../../icons/icon-logic-03-off.js';
import '../../icons/icon-logic-03.js';
import '../../icons/icon-logic-04-on.js';
import '../../icons/icon-logic-04-off.js';
import '../../icons/icon-logic-04.js';
import '../../icons/icon-logic-05-on.js';
import '../../icons/icon-logic-05-off.js';
import '../../icons/icon-logic-05.js';
import '../../icons/icon-logic-06-on.js';
import '../../icons/icon-logic-06-off.js';
import '../../icons/icon-logic-06.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum LogicAlternativeIcon {
  logic01 = 'logic01',
  logic02 = 'logic02',
  logic03 = 'logic03',
  logic04 = 'logic04',
  logic05 = 'logic05',
  logic06 = 'logic06',
}

const icons: Record<LogicAlternativeIcon, SquaredDeviceIcons> = {
  [LogicAlternativeIcon.logic01]: {
    on: 'logic-01-on',
    off: 'logic-01-off',
    static: 'logic-01',
  },
  [LogicAlternativeIcon.logic02]: {
    on: 'logic-02-on',
    off: 'logic-02-off',
    static: 'logic-02',
  },
  [LogicAlternativeIcon.logic03]: {
    on: 'logic-03-on',
    off: 'logic-03-off',
    static: 'logic-03',
  },
  [LogicAlternativeIcon.logic04]: {
    on: 'logic-04-on',
    off: 'logic-04-off',
    static: 'logic-04',
  },
  [LogicAlternativeIcon.logic05]: {
    on: 'logic-05-on',
    off: 'logic-05-off',
    static: 'logic-05',
  },
  [LogicAlternativeIcon.logic06]: {
    on: 'logic-06-on',
    off: 'logic-06-off',
    static: 'logic-06',
  },
};

/**
 * @stable
 */
@customElement('obc-logic')
export class ObcLogic extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: LogicAlternativeIcon =
    LogicAlternativeIcon.logic01;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[LogicAlternativeIcon.logic01]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-logic': ObcLogic;
  }
}
