import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './automation-badge.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcAutomationBadgeMode {
  Flat = 'flat',
  Regular = 'regular',
  Enhanced = 'enhanced',
}

@customElement('obc-automation-badge')
export class ObcAutomationBadge extends LitElement {
  @property({type: Boolean}) deviceOn = false;
  @property({type: String}) mode: ObcAutomationBadgeMode =
    ObcAutomationBadgeMode.Flat;

  override render() {
    return html`
      <div class="wrapper">
        <div
          class=${classMap({badge: true, [this.mode]: true, on: this.deviceOn})}
        >
          <div class="icon">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-badge': ObcAutomationBadge;
  }
}
