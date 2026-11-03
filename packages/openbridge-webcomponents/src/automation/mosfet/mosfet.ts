import {property} from 'lit/decorators.js';
import '../../icons/icon-mosfet-ntype-1-on.js';
import '../../icons/icon-mosfet-ntype-1-off.js';
import '../../icons/icon-mosfet-ntype-1.js';
import '../../icons/icon-mosfet-ntype-2-on.js';
import '../../icons/icon-mosfet-ntype-2-off.js';
import '../../icons/icon-mosfet-ntype-2.js';
import '../../icons/icon-mosfet-ntype-3-on.js';
import '../../icons/icon-mosfet-ntype-3-off.js';
import '../../icons/icon-mosfet-ntype-3.js';
import '../../icons/icon-mosfet-ntype-4-on.js';
import '../../icons/icon-mosfet-ntype-4-off.js';
import '../../icons/icon-mosfet-ntype-4.js';
import '../../icons/icon-mosfet-ptype-1-on.js';
import '../../icons/icon-mosfet-ptype-1-off.js';
import '../../icons/icon-mosfet-ptype-1.js';
import '../../icons/icon-mosfet-ptype-2-on.js';
import '../../icons/icon-mosfet-ptype-2-off.js';
import '../../icons/icon-mosfet-ptype-2.js';
import '../../icons/icon-mosfet-ptype-3-on.js';
import '../../icons/icon-mosfet-ptype-3-off.js';
import '../../icons/icon-mosfet-ptype-3.js';
import '../../icons/icon-mosfet-ptype-4-on.js';
import '../../icons/icon-mosfet-ptype-4-off.js';
import '../../icons/icon-mosfet-ptype-4.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum MosfetAlternativeIcon {
  mosfetNtype1 = 'mosfetNtype1',
  mosfetNtype2 = 'mosfetNtype2',
  mosfetNtype3 = 'mosfetNtype3', // Figma label: 01-mosfet-ntype-3
  mosfetNtype4 = 'mosfetNtype4',
  mosfetPtype1 = 'mosfetPtype1',
  mosfetPtype2 = 'mosfetPtype2',
  mosfetPtype3 = 'mosfetPtype3',
  mosfetPtype4 = 'mosfetPtype4',
}

const icons: Record<MosfetAlternativeIcon, SquaredDeviceIcons> = {
  [MosfetAlternativeIcon.mosfetNtype1]: {
    on: 'mosfet-ntype-1-on',
    off: 'mosfet-ntype-1-off',
    static: 'mosfet-ntype-1',
  },
  [MosfetAlternativeIcon.mosfetNtype2]: {
    on: 'mosfet-ntype-2-on',
    off: 'mosfet-ntype-2-off',
    static: 'mosfet-ntype-2',
  },
  [MosfetAlternativeIcon.mosfetNtype3]: {
    on: 'mosfet-ntype-3-on',
    off: 'mosfet-ntype-3-off',
    static: 'mosfet-ntype-3',
  },
  [MosfetAlternativeIcon.mosfetNtype4]: {
    on: 'mosfet-ntype-4-on',
    off: 'mosfet-ntype-4-off',
    static: 'mosfet-ntype-4',
  },
  [MosfetAlternativeIcon.mosfetPtype1]: {
    on: 'mosfet-ptype-1-on',
    off: 'mosfet-ptype-1-off',
    static: 'mosfet-ptype-1',
  },
  [MosfetAlternativeIcon.mosfetPtype2]: {
    on: 'mosfet-ptype-2-on',
    off: 'mosfet-ptype-2-off',
    static: 'mosfet-ptype-2',
  },
  [MosfetAlternativeIcon.mosfetPtype3]: {
    on: 'mosfet-ptype-3-on',
    off: 'mosfet-ptype-3-off',
    static: 'mosfet-ptype-3',
  },
  [MosfetAlternativeIcon.mosfetPtype4]: {
    on: 'mosfet-ptype-4-on',
    off: 'mosfet-ptype-4-off',
    static: 'mosfet-ptype-4',
  },
};

/**
 * @stable
 */
@customElement('obc-mosfet')
export class ObcMosfet extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: MosfetAlternativeIcon =
    MosfetAlternativeIcon.mosfetNtype1;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[MosfetAlternativeIcon.mosfetNtype1]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-mosfet': ObcMosfet;
  }
}
