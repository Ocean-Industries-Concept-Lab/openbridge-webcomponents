import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-menu.style';
import '../button/button';
import '../card-list-button/card-list-button';
import '../../icons/icon-02-chevron-right';
import '../../icons/icon-14-alert-list';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-alert-menu')
export class AlertMenu extends LitElement {
  @property({type: Boolean}) narrow: boolean = false;

  override render() {
    return html`
      <div class=${classMap({wrapper: true, narrow: this.narrow})}>
        <div class="header">
          <div class="title">Active alerts</div>
          <obc-button variant="raised" class="ack-all-btn">ACK ALL</obc-button>
        </div>
        <div class="divider"></div>
        <slot></slot>
        <div class="divider"></div>
        <obc-card-list-button class="alert-list-btn">
          <obi-14-alert-list slot="leading-icon" size="24"></obi-14-alert-list>
          Alert list
          <obi-02-chevron-right
            slot="trailing-icon"
            size="24"
          ></obi-02-chevron-right>
        </obc-card-list-button>
      </div>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu': AlertMenu;
  }
}
