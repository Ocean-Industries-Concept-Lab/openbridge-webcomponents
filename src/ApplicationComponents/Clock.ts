import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import "../Button/IconButton"

@customElement('ob-clock')
export class Clock extends LitElement {
  @property({ type: String }) date = "2021-01-01T11:11:11.111Z"

  monthNames = ["Jan", "Feb", "Mar", "Apr",
                        "May", "Jun", "Jul", "Aug",
                        "Sep", "Oct", "Nov", "Dec"];

  render() {
    const date = new Date(this.date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const timeString = `${hoursString}:${minutesString}`;

    const day = date.getDate();
    const month = this.monthNames[date.getMonth()];
    const dateString = `${day} ${month}`;

    return html`
      <div class="clock">${timeString}</div>
      <div class="date">${dateString}</div>
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
