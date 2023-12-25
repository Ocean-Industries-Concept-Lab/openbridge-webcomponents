import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-rectified')
export class Obi14AlarmRectified extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 17.0338L16.0972 11L17.375 12.3002L10.125 19.625L6.5 15.9626L7.77781 14.6716L10.125 17.0338Z" fill="currentColor"/>
<path d="M16.0972 11L10.125 17.0338L7.77781 14.6716L6.5 15.9626L10.125 19.625L17.375 12.3002L16.0972 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1409 1.51681C11.5032 0.82773 12.4968 0.827732 12.8591 1.51681L22.8888 20.5936C23.2254 21.2338 22.7573 22 22.0297 22H1.97033C1.24266 22 0.774615 21.2338 1.11121 20.5936L11.1409 1.51681Z" style="fill: var(--alert-alarm-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.125 17.0338L16.0972 11L17.375 12.3002L10.125 19.625L6.5 15.9626L7.77781 14.6716L10.125 17.0338Z" style="fill: var(--alarm-enabled-background-color)"/>
<path d="M16.0972 11L10.125 17.0338L7.77781 14.6716L6.5 15.9626L10.125 19.625L17.375 12.3002L16.0972 11Z" style="fill: var(--on-alarm-active-color)"/>
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
    'obi-14-alarm-rectified': Obi14AlarmRectified;
  }
}
