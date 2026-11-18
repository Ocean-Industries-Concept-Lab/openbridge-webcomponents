import {property} from 'lit/decorators.js';
import '../../icons/icon-router-on.js';
import '../../icons/icon-router-off.js';
import '../../icons/icon-router.js';
import '../../icons/icon-router-2-on.js';
import '../../icons/icon-router-2-off.js';
import '../../icons/icon-router-2.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum RouterAlternativeIcon {
  router = 'router',
  router2 = 'router2',
}

const icons: Record<RouterAlternativeIcon, SquaredDeviceIcons> = {
  [RouterAlternativeIcon.router]: {
    on: 'router-on',
    off: 'router-off',
    static: 'router',
  },
  [RouterAlternativeIcon.router2]: {
    on: 'router-2-on',
    off: 'router-2-off',
    static: 'router-2',
  },
};

/**
 * @stable
 */
@customElement('obc-router')
export class ObcRouter extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: RouterAlternativeIcon =
    RouterAlternativeIcon.router;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[RouterAlternativeIcon.router]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-router': ObcRouter;
  }
}
