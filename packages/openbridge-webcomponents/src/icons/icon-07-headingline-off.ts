import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-headingline-off')
export class Obi07HeadinglineOff extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22 6.33275C20.6868 4.9591 19.1278 3.86946 17.412 3.12605C15.6962 2.38263 13.8572 2 12 2C10.1428 2 8.30384 2.38263 6.58804 3.12605C4.87224 3.86946 3.31322 4.9591 2 6.33275L3.00489 7.38388C4.18614 6.14827 5.5885 5.16813 7.13188 4.49942C8.572 3.87545 10.1086 3.53403 11.6649 3.49114V9.48348L9.09227 7.46519C8.88635 7.30364 8.59579 7.34511 8.44328 7.55781C8.29077 7.77052 8.33407 8.0739 8.53999 8.23545L11.3697 10.4554L8.3907 12.2545C8.16557 12.3905 8.08609 12.6874 8.21318 12.9176C8.34027 13.1479 8.6258 13.2243 8.85094 13.0883L11.6649 11.3889L11.6649 18.2094C10.8709 18.4232 10.2842 19.1771 10.2842 20.0744C10.2842 21.1379 11.1084 22.0001 12.1252 22.0001C13.1419 22.0001 13.9661 21.1379 13.9661 20.0744C13.9661 19.1771 13.3794 18.4232 12.5854 18.2094L12.5854 11.4091L15.158 13.4274C15.364 13.589 15.6545 13.5475 15.807 13.3348C15.9595 13.1221 15.9163 12.8187 15.7103 12.6571L13.0373 10.5601L16.0072 8.76656C16.2323 8.6306 16.3118 8.33372 16.1847 8.10346C16.0576 7.8732 15.7721 7.79676 15.5469 7.93272L12.5854 9.72125V3.50062C14.056 3.57148 15.5053 3.90893 16.8681 4.49941C18.4115 5.16812 19.8139 6.14827 20.9951 7.38388L22 6.33275Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 6.33275C20.6868 4.9591 19.1278 3.86946 17.412 3.12605C15.6962 2.38263 13.8572 2 12 2C10.1428 2 8.30384 2.38263 6.58804 3.12605C4.87224 3.86946 3.31322 4.9591 2 6.33275L3.00489 7.38388C4.18614 6.14827 5.5885 5.16813 7.13188 4.49942C8.572 3.87545 10.1086 3.53403 11.6649 3.49114V9.48348L9.09227 7.46519C8.88635 7.30364 8.59579 7.34511 8.44328 7.55781C8.29077 7.77052 8.33407 8.0739 8.53999 8.23545L11.3697 10.4554L8.3907 12.2545C8.16557 12.3905 8.08609 12.6874 8.21318 12.9176C8.34027 13.1479 8.6258 13.2243 8.85094 13.0883L11.6649 11.3889L11.6649 18.2094C10.8709 18.4232 10.2842 19.1771 10.2842 20.0744C10.2842 21.1379 11.1084 22.0001 12.1252 22.0001C13.1419 22.0001 13.9661 21.1379 13.9661 20.0744C13.9661 19.1771 13.3794 18.4232 12.5854 18.2094L12.5854 11.4091L15.158 13.4274C15.364 13.589 15.6545 13.5475 15.807 13.3348C15.9595 13.1221 15.9163 12.8187 15.7103 12.6571L13.0373 10.5601L16.0072 8.76656C16.2323 8.6306 16.3118 8.33372 16.1847 8.10346C16.0576 7.8732 15.7721 7.79676 15.5469 7.93272L12.5854 9.72125V3.50062C14.056 3.57148 15.5053 3.90893 16.8681 4.49941C18.4115 5.16812 19.8139 6.14827 20.9951 7.38388L22 6.33275Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-headingline-off': Obi07HeadinglineOff;
  }
}
