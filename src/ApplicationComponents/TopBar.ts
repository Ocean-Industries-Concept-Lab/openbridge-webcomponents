import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./TopBar.css?inline";
import "../Button/IconButton"
import "./Clock"

@customElement('ob-top-bar')
export class TopBar extends LitElement {

  @property({ type: String }) title = 'App'
  @property({ type: String }) pageName = 'Page'
  @property({ type: String }) date = "2021-01-01T11:11:11.111Z"

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

  render() {
    return html`
      <nav class="wrapper">
        <div class="left group">
          <div class="menu-button">
            <ob-icon-button icon="01-menu" variant="flat" @click=${this.menuButtonClicked}></ob-icon-button>
          </div>
          <div class="title">${this.title}</div>
          <div class="page-name">${this.pageName}</div>
        </div>
        <div class="right group">
          <ob-clock date="${this.date}"></ob-clock>
          <ob-icon-button icon="14-alerts" variant="flat" @click=${this.alertsButtonClicked}></ob-icon-button>
          <ob-icon-button icon="04-dimming" variant="flat" @click=${this.dimmingButtonClicked}></ob-icon-button>
          <ob-icon-button icon="01-apps" variant="flat" @click=${this.appsButtonClicked}></ob-icon-button>
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
