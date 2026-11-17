import {property} from 'lit/decorators.js';
import '../../icons/icon-ground-1-on.js';
import '../../icons/icon-ground-1-off.js';
import '../../icons/icon-ground-1.js';
import '../../icons/icon-ground-2-on.js';
import '../../icons/icon-ground-2-off.js';
import '../../icons/icon-ground-2.js';
import '../../icons/icon-ground-3-on.js';
import '../../icons/icon-ground-3-off.js';
import '../../icons/icon-ground-3.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum GroundAlternativeIcon {
  ground1 = 'ground1',
  ground2 = 'ground2',
  ground3 = 'ground3',
}

const icons: Record<GroundAlternativeIcon, SquaredDeviceIcons> = {
  [GroundAlternativeIcon.ground1]: {
    on: 'ground-1-on',
    off: 'ground-1-off',
    static: 'ground-1',
  },
  [GroundAlternativeIcon.ground2]: {
    on: 'ground-2-on',
    off: 'ground-2-off',
    static: 'ground-2',
  },
  [GroundAlternativeIcon.ground3]: {
    on: 'ground-3-on',
    off: 'ground-3-off',
    static: 'ground-3',
  },
};

/**
 * @stable
 */
@customElement('obc-ground')
export class ObcGround extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: GroundAlternativeIcon =
    GroundAlternativeIcon.ground1;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[GroundAlternativeIcon.ground1]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-ground': ObcGround;
  }
}
