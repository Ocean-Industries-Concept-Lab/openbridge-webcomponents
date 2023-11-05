import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./TopBar.css?inline";
import "../Button/IconButton"
import "./Clock"

@customElement('ob-top-bar')
export class TopBar extends LitElement {

  @property({ type: String }) title = 'App'
  @property({ type: String }) pageName = 'Page'

  render() {
    return html`
      <nav class="wrapper">
        <div class="left group">
          <div class="menu-button">
            <ob-icon-button icon="menu" variant="flat"></ob-icon-button>
          </div>
          <div class="title">${this.title}</div>
          <div class="page-name">${this.pageName}</div>
        </div>
        <div class="right group">
          <ob-clock></ob-clock>
          <ob-icon-button icon="alerts" variant="flat"></ob-icon-button>
          <ob-icon-button icon="dimming" variant="flat"></ob-icon-button>
          <ob-icon-button icon="apps" variant="flat"></ob-icon-button>
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
