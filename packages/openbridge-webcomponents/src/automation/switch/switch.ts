import '../../icons/icon-switch-horizontal-on.js';
import '../../icons/icon-switch-horizontal-off.js';
import '../../icons/icon-switch-01-on.js';
import '../../icons/icon-switch-01-off.js';
import '../../icons/icon-switch-02-on.js';
import '../../icons/icon-switch-02-off.js';
import '../../icons/icon-switch-03-on.js';
import '../../icons/icon-switch-03-off.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';
import {property} from 'lit/decorators.js';

export enum SwitchAlternativeIcon {
  regular = 'regular',
  s1 = 's1',
  s2 = 's2',
  s3 = 's3',
}

const icons: Record<SwitchAlternativeIcon, SquaredDeviceIcons> = {
  [SwitchAlternativeIcon.regular]: {
    on: 'switch-horizontal-on',
    off: 'switch-horizontal-off',
  },
  [SwitchAlternativeIcon.s1]: {on: 'switch-01-on', off: 'switch-01-off'},
  [SwitchAlternativeIcon.s2]: {on: 'switch-02-on', off: 'switch-02-off'},
  [SwitchAlternativeIcon.s3]: {on: 'switch-03-on', off: 'switch-03-off'},
};

/**
 * **TODO(designer):** the icons file has no static switch symbols, so a
 * `static` switch keeps its on or off icon.
 *
 * @stable
 */
@customElement('obc-switch')
export class ObcSwitch extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: SwitchAlternativeIcon =
    SwitchAlternativeIcon.regular;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[SwitchAlternativeIcon.regular]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-switch': ObcSwitch;
  }
}
