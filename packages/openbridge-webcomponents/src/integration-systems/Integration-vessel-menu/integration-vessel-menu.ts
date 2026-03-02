import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './integration-vessel-menu.css?inline';

import '../../components/button/button.js';
import '../../components/icon-button/icon-button.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';
import '../../building-blocks/alert-list/alert-list.js';

@customElement('obc-integration-vessel-menu')
export class ObcIntegrationVesselMenu extends LitElement {
  @property({type: Boolean}) hideHeader = false;
  @property({type: Number}) numberOfButtons = 3;

  private onButton1Click = () =>
    this.dispatchEvent(new CustomEvent('button-1-click'));
  private onButton2Click = () =>
    this.dispatchEvent(new CustomEvent('button-2-click'));
  private onButton3Click = () =>
    this.dispatchEvent(new CustomEvent('button-3-click'));

  private renderButtons() {
    let but = null;
    if (this.numberOfButtons >= 1) {
      but = html`<obc-button @click=${this.onButton1Click}
        >Button 1</obc-button
      >`;
    }
    if (this.numberOfButtons >= 2) {
      but = html`${but}<obc-button @click=${this.onButton2Click}
          >Button 2</obc-button
        >`;
    }
    if (this.numberOfButtons >= 3) {
      but = html`${but}<obc-button @click=${this.onButton3Click}
          >Button 3</obc-button
        >`;
    }
    return but;
  }

  protected override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
        })}
      >
        <div class="header-container">
          <div class="title-container">
            ${!this.hideHeader
              ? html`<div class="leading-icon">
                    <slot name="leading-icon"
                      ><obi-placeholder></obi-placeholder
                    ></slot>
                  </div>
                  <div class="container-title">
                    <slot name="title">Title</slot>
                  </div>`
              : null}
          </div>
        </div>
        <div class="footer-container">${this.renderButtons()}</div>
        <div class="content-area">
          <slot name="content"></slot>
        </div>
        <div class="content-container">
          <obc-alert-list class="alert-list"
            ><slot name="alarms"> </slot>
          </obc-alert-list>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-vessel-menu': ObcIntegrationVesselMenu;
  }
}
