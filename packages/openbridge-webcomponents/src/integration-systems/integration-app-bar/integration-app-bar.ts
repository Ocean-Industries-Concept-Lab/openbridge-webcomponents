import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-app-bar.css?inline';

@customElement('obc-integration-app-bar')
export class ObcIntegrationAppBar extends LitElement {
  override render() {
    return html`
      <div class="wrapper">
        <div class="left-side"></div>
        <div class="center">
          <slot name="apps" @slotchange=${this.handleAppsSlotChange}></slot>
        </div>
        <div class="right-side"></div>
      </div>
    `;
  }

  private handleAppsSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const buttons = slot.assignedElements() as HTMLElement[];

    if (buttons.length === 0) {
      return;
    }

    for (const btn of buttons) {
      btn.style.width = '';
    }

    requestAnimationFrame(() => {
      const maxWidth = Math.max(
        ...buttons.map((btn) => btn.getBoundingClientRect().width)
      );

      if (maxWidth > 0) {
        for (const btn of buttons) {
          btn.style.width = `${maxWidth}px`;
        }
      }
    });
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-app-bar': ObcIntegrationAppBar;
  }
}
