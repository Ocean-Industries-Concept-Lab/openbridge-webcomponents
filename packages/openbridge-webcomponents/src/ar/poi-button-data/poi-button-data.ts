import '../building-blocks/poi-button/poi-button.js';
import '../../icons/icon-vessel-generic-default-filled.js';
import {ObcPoiButtonBase} from '../building-blocks/poi-button/poi-button.js';
import {customElement} from '../../decorator.js';

@customElement('obc-poi-button-data')
export class ObcPoiButtonData extends ObcPoiButtonBase {
  override connectedCallback() {
    super.connectedCallback();
    this.ensureDefaultIcon();
  }

  private ensureDefaultIcon() {
    if (this.querySelector('obi-vessel-generic-default-filled:not([slot])')) {
      return;
    }

    const hasDefaultContent = Array.from(this.childNodes).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.trim();
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        return !(node as Element).hasAttribute('slot');
      }
      return false;
    });

    if (!hasDefaultContent) {
      this.appendChild(
        document.createElement('obi-vessel-generic-default-filled')
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-button-data': ObcPoiButtonData;
  }
}
