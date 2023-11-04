import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import "../Button/IconButton"

@customElement('ob-clock')
export class Clock extends LitElement {


  render() {
    return html`
      <div class="clock">14:30</div>
      <div class="date">16 Nov</div>
    `
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 12px;
    }

    .clock {
      color: var(--element-active-color, #1A1A1A);
      text-align: center;

      /* UI/Button */
      font-family: Noto Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 550;
      line-height: 24px; /* 150% */
    }

    .date {
      color: var(--element-active-color, #1A1A1A);
      text-align: center;
      font-feature-settings: 'ss02' on, 'clig' off, 'liga' off;
      /* UI/Body */
      font-family: Noto Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 370;
      line-height: 24px; /* 150% */
    }
    
   
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-clock': Clock
  }
}
