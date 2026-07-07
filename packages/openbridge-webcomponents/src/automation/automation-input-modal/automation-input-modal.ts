import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
import compentStyle from './automation-input-modal.css?inline';

/**
 * @slot header - Header content shown at the top of the modal.
 * @slot preview - Preview content shown in the body of the modal.
 * @slot action-primary - Primary action control shown in the actions row.
 * @slot action-secondary - Secondary action control shown in the actions row.
 * @experimental
 */
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
