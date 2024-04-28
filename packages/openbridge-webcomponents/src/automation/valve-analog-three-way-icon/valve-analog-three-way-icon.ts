import { LitElement, html, svg, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./valve-analog-three-way-icon.css?inline";

@customElement('obc-valve-analog-three-way-icon')
export class ObcValveAnalogThreeWayIcon extends LitElement {
  @property({ type: Number }) value: number = 0;
  @property({ type: Boolean }) closed: boolean = false;

  override render() {
    if (this.closed) {
      return html`
      <div class="wrapper">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.72361 6.3618C2.39116 6.19558 2 6.43733 2 6.80902V17.191C2 17.5627 2.39116 17.8044 2.72361 17.6382L9 14.5V9.5L2.72361 6.3618ZM9.5 9H14.5L17.6382 2.72361C17.8044 2.39116 17.5627 2 17.191 2H6.80902C6.43733 2 6.19558 2.39116 6.3618 2.72361L9.5 9ZM13.882 8L16.382 3H7.61803L10.118 8H13.882ZM15 14.5L21.2764 17.6382C21.6088 17.8044 22 17.5627 22 17.191V6.80902C22 6.43733 21.6088 6.19558 21.2764 6.3618L15 9.5V14.5ZM16 10.118V13.882L21 16.382V7.61803L16 10.118ZM8 10.118L3 7.61803V16.382L8 13.882V10.118ZM12 11C11.4477 11 11 11.4477 11 12V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V12C13 11.4477 12.5523 11 12 11Z" fill="var(--automation-device-tertiary-inverted-color)"/>
        <path d="M16.382 3L13.882 8H10.118L7.61803 3H16.382Z" fill="var(--automation-device-primary-inverted-color"/>
        <path d="M16 13.882V10.118L21 7.61803V16.382L16 13.882Z" fill="var(--automation-device-primary-inverted-color"/>
        <path d="M3 7.61803L8 10.118V13.882L3 16.382V7.61803Z" fill="var(--automation-device-primary-inverted-color"/>
        </svg>
      </div>`
    }

    const handleRotation = -(1 -this.value / 100) * 90;
    const handle = svg`
      <g transform="rotate(${handleRotation} 12 18.5)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.49942 20.1303H14.4994C15.3278 20.1303 15.9994 19.4587 15.9994 18.6303C15.9994 17.8019 15.3278 17.1303 14.4994 17.1303H9.49942C8.67099 17.1303 7.99942 17.8019 7.99942 18.6303C7.99942 19.4587 8.67099 20.1303 9.49942 20.1303ZM9.49942 19.1303L14.4994 19.1303C14.7756 19.1303 14.9994 18.9064 14.9994 18.6303C14.9994 18.3542 14.7756 18.1303 14.4994 18.1303L9.49942 18.1303C9.22328 18.1303 8.99942 18.3542 8.99942 18.6303C8.99942 18.9064 9.22328 19.1303 9.49942 19.1303Z" fill="var(--automation-device-tertiary-color)"/>
        <path d="M14.4994 19.1303L9.49942 19.1303C9.22328 19.1303 8.99942 18.9064 8.99942 18.6303C8.99942 18.3542 9.22328 18.1303 9.49942 18.1303L14.4994 18.1303C14.7756 18.1303 14.9994 18.3542 14.9994 18.6303C14.9994 18.9064 14.7756 19.1303 14.4994 19.1303Z" fill="var(--automation-device-primary-color)"/>
      </g>
    `

    const xmin = 10.5;
    const xmax = 2.5;

    const x = xmin + (xmax - xmin) * this.value / 100;

    const ymin = 2.5;
    const ymax = 10.5;

    const y = ymin + (ymax - ymin) * (this.value) / 100;

    return html`
      <div class="wrapper">
      <div class="wrapper">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.80902 2H17.191C17.5627 2 17.8044 2.39116 17.6382 2.72361L14 10L21.2764 6.3618C21.6088 6.19558 22 6.43733 22 6.80902V17.191C22 17.5627 21.6088 17.8044 21.2764 17.6382L17.6382 15.8191L14 14H10L2.72361 17.6382C2.39116 17.8044 2 17.5627 2 17.191V6.80902C2 6.43733 2.39116 6.19558 2.72361 6.3618L10 10L6.3618 2.72361C6.19558 2.39116 6.43733 2 6.80902 2Z" fill="black"/>
        <path d="M13 9.76224L16.3811 3H7.61719L11 9.76562V11H9.76416L3 7.61792V16.3819L9.7637 13H14.2363L21 16.3819V7.61792L14.2358 11H13V9.76224Z" fill="var(--automation-device-primary-color)"/>
        ${handle}
        <g clip-path="url(#clip0)">
          <rect x=${24-x} y="0" width=${x - xmax} height="24" fill="var(--automation-device-secondary-color)"/>
          <line x1=${24-x} y1="0" x2=${24-x} y2="24" stroke="var(--automation-device-tertiary-color)" stroke-width="1"/>    
        </g>
        <g clip-path="url(#clip1)">
          <rect x="0" y=${ymin} width="24" height=${y - ymin} fill="var(--automation-device-secondary-color)"/>
          <line x1="0" y1=${y} x2="24" y2=${y} stroke="var(--automation-device-tertiary-color)" stroke-width="1"/>
        <defs>
          <clipPath id="clip0">
            <path d="M 13 11 L 13 13 H 14.2363 L 21 16.3819 V 7.6179 L 14.2358 11 Z"/>
          </clipPath>
          <clipPath id="clip1">
            <path d="M 13 9.7622 L 16.3811 3 H 7.6172 L 11 9.7656 L 11 13 H 13 V 9.7622 Z"/>
          </clipPath>
        </defs>
      </svg>
      </div>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-valve-analog-three-way-icon': ObcValveAnalogThreeWayIcon
  }
}
