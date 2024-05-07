import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from 'lit/decorators.js';
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
        <slot class="actions" name="actions"></slot>
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
