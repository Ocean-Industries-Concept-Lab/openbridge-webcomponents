import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
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
            <ob-icon-button icon="menu"></ob-icon-button>
          </div>
          <div class="title">${this.title}</div>
          <div class="page-name">${this.pageName}</div>
        </div>
        <div class="right group">
          <ob-clock></ob-clock>
          <ob-icon-button icon="alerts"></ob-icon-button>
          <ob-icon-button icon="dimming"></ob-icon-button>
          <ob-icon-button icon="apps"></ob-icon-button>
        </div>
      </nav>
    `
  }

  static styles = css`
    :host {
      
    }
    
    .wrapper {
      height: 48px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      background: var(--container-global-color, #FCFCFC);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.20);

      font-family: Noto Sans;
    }

    .group {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 8px;
    }

    .menu-button {
      margin-left: 8px;
      margin-right: 8px;
    }

    .title {
      color: var(--element-active-color, #1A1A1A);

      /* UI/Body */
      font-family: Noto Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 370;
      line-height: 24px; /* 150% */
    }

    .page-name {
      color: var(--element-active-color, #1A1A1A);
      /* UI/Body-Active */
      font-family: Noto Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 650;
      line-height: 24px; /* 150% */
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-top-bar': TopBar
  }
}
