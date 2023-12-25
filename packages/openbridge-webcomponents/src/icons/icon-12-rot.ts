import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-rot')
export class Obi12Rot extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0002 5C14.0002 6.10457 13.1048 7 12.0002 7C10.8957 7 10.0002 6.10457 10.0002 5C10.0002 3.89543 10.8957 3 12.0002 3C13.1048 3 14.0002 3.89543 14.0002 5Z" fill="currentColor"/>
<path d="M5.96086 7.93477C7.01137 8.2761 7.58627 9.40441 7.24494 10.4549C6.90361 11.5054 5.7753 12.0803 4.72479 11.739C3.67428 11.3977 3.09938 10.2694 3.44071 9.21885C3.78204 8.16834 4.91035 7.59344 5.96086 7.93477Z" fill="currentColor"/>
<path d="M19.2758 11.7391C18.2253 12.0804 17.097 11.5055 16.7557 10.455C16.4144 9.40448 16.9893 8.27617 18.0398 7.93484C19.0903 7.59351 20.2186 8.16841 20.5599 9.21892C20.9012 10.2694 20.3263 11.3977 19.2758 11.7391Z" fill="currentColor"/>
<path d="M6.26787 16.4876C6.91712 15.594 8.16786 15.3959 9.06148 16.0452C9.95509 16.6944 10.1532 17.9451 9.50394 18.8388C8.85469 19.7324 7.60395 19.9305 6.71033 19.2812C5.81672 18.632 5.61862 17.3812 6.26787 16.4876Z" fill="currentColor"/>
<path d="M14.4967 18.8388C13.8475 17.9452 14.0456 16.6945 14.9392 16.0452C15.8328 15.396 17.0836 15.5941 17.7328 16.4877C18.3821 17.3813 18.184 18.632 17.2903 19.2813C16.3967 19.9305 15.146 19.7324 14.4967 18.8388Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0002 5C14.0002 6.10457 13.1048 7 12.0002 7C10.8957 7 10.0002 6.10457 10.0002 5C10.0002 3.89543 10.8957 3 12.0002 3C13.1048 3 14.0002 3.89543 14.0002 5Z" style="fill: var(--element-active-color)"/>
<path d="M5.96086 7.93477C7.01137 8.2761 7.58627 9.40441 7.24494 10.4549C6.90361 11.5054 5.7753 12.0803 4.72479 11.739C3.67428 11.3977 3.09938 10.2694 3.44071 9.21885C3.78204 8.16834 4.91035 7.59344 5.96086 7.93477Z" style="fill: var(--element-active-color)"/>
<path d="M19.2758 11.7391C18.2253 12.0804 17.097 11.5055 16.7557 10.455C16.4144 9.40448 16.9893 8.27617 18.0398 7.93484C19.0903 7.59351 20.2186 8.16841 20.5599 9.21892C20.9012 10.2694 20.3263 11.3977 19.2758 11.7391Z" style="fill: var(--element-active-color)"/>
<path d="M6.26787 16.4876C6.91712 15.594 8.16786 15.3959 9.06148 16.0452C9.95509 16.6944 10.1532 17.9451 9.50394 18.8388C8.85469 19.7324 7.60395 19.9305 6.71033 19.2812C5.81672 18.632 5.61862 17.3812 6.26787 16.4876Z" style="fill: var(--element-active-color)"/>
<path d="M14.4967 18.8388C13.8475 17.9452 14.0456 16.6945 14.9392 16.0452C15.8328 15.396 17.0836 15.5941 17.7328 16.4877C18.3821 17.3813 18.184 18.632 17.2903 19.2813C16.3967 19.9305 15.146 19.7324 14.4967 18.8388Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-12-rot': Obi12Rot;
  }
}
