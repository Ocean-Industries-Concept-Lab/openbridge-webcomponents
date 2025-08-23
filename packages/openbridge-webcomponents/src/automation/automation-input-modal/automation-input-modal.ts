import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
import compentStyle from './automation-input-modal.css?inline';

@customElement('obc-automation-input-modal')
export class ObcAutomationInputModal extends LitElement {
  override render() {
    return html`
      <div class="wrapper">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="preview">
          <slot name="preview"></slot>
        </div>
        <div class="actions">
          <slot name="action-primary"></slot>
          <slot name="action-secondary"></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-input-modal': ObcAutomationInputModal;
  }
}
