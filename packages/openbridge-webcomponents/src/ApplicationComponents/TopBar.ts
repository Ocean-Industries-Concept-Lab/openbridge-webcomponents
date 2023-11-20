import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from "./TopBar.css?inline";
import "../Button/IconButton"
import "./Clock"

@customElement('ob-top-bar')
export class TopBar extends LitElement {

  @property({ type: String }) title = 'App'
  @property({ type: String }) pageName = 'Page'
  @property({ type: String }) date = "2021-01-01T11:11:11.111Z"
  @property({ type: Boolean }) wideMenuButton = false;
  @property({ type: Boolean }) showAppsButton = false;
  @property({ type: Boolean }) showDimmingButton = false;
  @property({ type: Boolean }) showAlertsButton = false;
  @property({ type: Boolean }) showClock = false;
  @property({ type: Boolean}) inactive = false;
  @property({ type: Boolean}) sizeSmall = false;

  private menuButtonClicked() {
    this.dispatchEvent(new CustomEvent('menu-button-clicked'));
  }

  private alertsButtonClicked() {
    this.dispatchEvent(new CustomEvent('alerts-button-clicked'));
  }

  private dimmingButtonClicked() {
    this.dispatchEvent(new CustomEvent('dimming-button-clicked'));
  }

  private appsButtonClicked() {
    this.dispatchEvent(new CustomEvent('apps-button-clicked'));
  }

  private leftMoreButtonClicked() {
    this.dispatchEvent(new CustomEvent('left-more-button-clicked'));
  }

  render() {
    return html`
      <nav class=${classMap({
        wrapper: true,
        inactive: this.inactive,
        small: this.sizeSmall,
      })}
      >
        <div class="left group">
          ${!this.inactive ? html`<div class="menu-button ${this.wideMenuButton ? 'wide' : null}">
          <ob-icon-button icon="01-menu" variant="flat" @click=${this.menuButtonClicked}></ob-icon-button>
        </div>`: null}
          ${!this.sizeSmall ? html`<div class="title">${this.title}</div>` : null}
          <div class="page-name">${this.pageName}</div>
        </div>
        <div class="right group">
          ${this.showClock ? html`<ob-clock date="${this.date}" ?showDate=${!this.sizeSmall}></ob-clock>` : null}
          <ob-icon-button icon="14-alerts" variant="flat" @click=${this.alertsButtonClicked}></ob-icon-button>
          ${this.showDimmingButton && !this.inactive && !this.sizeSmall ? html`<ob-icon-button icon="04-dimming" variant="flat" @click=${this.dimmingButtonClicked}></ob-icon-button>` : null}
          ${this.showAppsButton && !this.inactive && !this.sizeSmall ? html`<ob-icon-button icon="01-apps" variant="flat" @click=${this.appsButtonClicked}></ob-icon-button>` : null}
          ${this.sizeSmall ? html`<ob-icon-button icon="01-more-vertical" variant="flat" @click=${this.leftMoreButtonClicked}></ob-icon-button>` : null}
        </div>
      </nav>
    `

    

    
  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-top-bar': TopBar
  }
}
