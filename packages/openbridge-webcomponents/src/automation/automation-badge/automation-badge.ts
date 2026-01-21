import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './automation-badge.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

export enum ObcAutomationBadgeMode {
  Flat = 'flat',
  Regular = 'regular',
  Enhanced = 'enhanced',
}

@customElement('obc-automation-badge')
export class ObcAutomationBadge extends LitElement {
  @property({type: String}) mode: ObcAutomationBadgeMode =
    ObcAutomationBadgeMode.Flat;

  override render() {
    return html`
      <div class=${classMap({wrapper: true, [this.mode]: true})}>
        <div class="badge">
          <slot name="icon-siluette"></slot>
          <slot></slot>
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
