import {property} from 'lit/decorators.js';
import '../../icons/icon-sources-01-on.js';
import '../../icons/icon-sources-01-off.js';
import '../../icons/icon-sources-01.js';
import '../../icons/icon-sources-02-on.js';
import '../../icons/icon-sources-02-off.js';
import '../../icons/icon-sources-02.js';
import '../../icons/icon-sources-03-on.js';
import '../../icons/icon-sources-03-off.js';
import '../../icons/icon-sources-03.js';
import '../../icons/icon-sources-04-on.js';
import '../../icons/icon-sources-04-off.js';
import '../../icons/icon-sources-04.js';
import '../../icons/icon-sources-05-on.js';
import '../../icons/icon-sources-05-off.js';
import '../../icons/icon-sources-05.js';
import {customElement} from '../../decorator.js';
import {
  ObcAbstractAutomationButtonSquared,
  SquaredDeviceIcons,
} from '../automation-button/abstract-automation-button-squared.js';

export enum SourceAlternativeIcon {
  sources01 = 'sources01',
  sources02 = 'sources02',
  sources03 = 'sources03',
  sources04 = 'sources04',
  sources05 = 'sources05',
}

const icons: Record<SourceAlternativeIcon, SquaredDeviceIcons> = {
  [SourceAlternativeIcon.sources01]: {
    on: 'sources-01-on',
    off: 'sources-01-off',
    static: 'sources-01',
  },
  [SourceAlternativeIcon.sources02]: {
    on: 'sources-02-on',
    off: 'sources-02-off',
    static: 'sources-02',
  },
  [SourceAlternativeIcon.sources03]: {
    on: 'sources-03-on',
    off: 'sources-03-off',
    static: 'sources-03',
  },
  [SourceAlternativeIcon.sources04]: {
    on: 'sources-04-on',
    off: 'sources-04-off',
    static: 'sources-04',
  },
  [SourceAlternativeIcon.sources05]: {
    on: 'sources-05-on',
    off: 'sources-05-off',
    static: 'sources-05',
  },
};

/**
 * @stable
 */
@customElement('obc-source')
export class ObcSource extends ObcAbstractAutomationButtonSquared {
  @property({type: String}) alternativeIcon: SourceAlternativeIcon =
    SourceAlternativeIcon.sources01;

  override get icon() {
    return this.renderDeviceIcon(
      icons[this.alternativeIcon] ?? icons[SourceAlternativeIcon.sources01]
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-source': ObcSource;
  }
}
