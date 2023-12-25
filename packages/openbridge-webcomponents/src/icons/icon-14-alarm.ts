import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm')
export class Obi14Alarm extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2656 20.5C22.0359 20.5 22.5169 19.6656 22.131 18.999L12.8654 2.99482C12.4803 2.32954 11.5197 2.32954 11.1346 2.99483L1.86902 18.999C1.48306 19.6656 1.96411 20.5 2.73445 20.5H21.2656ZM13 13.5H11V8.5H13V13.5ZM11 15.5V17.5H13V15.5H11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2656 20.5C22.0359 20.5 22.5169 19.6656 22.131 18.999L12.8654 2.99482C12.4803 2.32954 11.5197 2.32954 11.1346 2.99483L1.86902 18.999C1.48306 19.6656 1.96411 20.5 2.73445 20.5H21.2656ZM13 13.5H11V8.5H13V13.5ZM11 15.5V17.5H13V15.5H11Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alarm': Obi14Alarm;
  }
}
