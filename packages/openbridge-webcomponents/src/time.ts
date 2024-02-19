import {html} from 'lit';

export function renderTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return html`
    ${hoursString}<span class="time-divider">:</span> ${minutesString}<span
      class="time-divider"
      >:</span
    >
    ${secondsString}
  `;
}
