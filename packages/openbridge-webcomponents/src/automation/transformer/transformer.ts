import {property} from 'lit/decorators.js';
import '../../icons/icon-transformer-01-on.js';
import '../../icons/icon-transformer-01-off.js';
import '../../icons/icon-transformer-01.js';
import '../../icons/icon-transformer-02-on.js';
import '../../icons/icon-transformer-02-off.js';
import '../../icons/icon-transformer-02.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum TransformerAlternativeIcon {
  transformer01 = 'transformer01',
  transformer02 = 'transformer02',
}

const icons: Record<TransformerAlternativeIcon, SquaredDeviceIcons> = {
  [TransformerAlternativeIcon.transformer01]: {
    on: 'transformer-01-on',
    off: 'transformer-01-off',
    static: 'transformer-01',
  },
  [TransformerAlternativeIcon.transformer02]: {
    on: 'transformer-02-on',
    off: 'transformer-02-off',
    static: 'transformer-02',
  },
};

/**
 * @stable
 */
@customElement('obc-transformer')
export class ObcTransformer extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: TransformerAlternativeIcon =
    TransformerAlternativeIcon.transformer01;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ??
        icons[TransformerAlternativeIcon.transformer01]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-transformer': ObcTransformer;
  }
}
