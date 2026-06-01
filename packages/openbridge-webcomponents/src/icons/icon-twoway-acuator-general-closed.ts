import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-acuator-general-closed')
export class ObiTwowayAcuatorGeneralClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.51467L3 5.94324V18.0569L8 14.4854V9.51467Z" fill="currentColor"/>
<path d="M16 14.4854V9.51467L21 5.94324L21 18.0569L16 14.4854Z" fill="currentColor"/>
<path d="M12 1.5C14.3317 1.5 16.3228 2.95168 17.123 5H13V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V5H6.87695C7.6772 2.95168 9.66828 1.5 12 1.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 5.12939C2.91937 4.65662 2 5.12975 2 5.94312V18.0567C2 18.8701 2.91937 19.3432 3.58124 18.8705L9 14.9999V8.99993L3.58124 5.12939ZM8 9.51455L3 5.94312V18.0567L8 14.4853V9.51455Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 5.94312V18.0567C22 18.8701 21.0806 19.3432 20.4188 18.8705L15 14.9999V8.99993L20.4188 5.12939C21.0806 4.65662 22 5.12975 22 5.94312ZM16 9.51455V14.4853L21 18.0567L21 5.94312L16 9.51455Z" fill="currentColor"/>
<path d="M13 5H17.123C16.3228 2.95168 14.3317 1.5 12 1.5C9.66828 1.5 7.6772 2.95168 6.87695 5H11V13L11.0049 13.1025C11.0562 13.6067 11.4823 14 12 14C12.5523 14 13 13.5523 13 13V5ZM14 13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13V6H6.87661C6.17279 6 5.68951 5.29143 5.94531 4.63574C6.89023 2.2174 9.24227 0.5 12 0.5C14.7577 0.5 17.1098 2.2174 18.0547 4.63574C18.3105 5.29143 17.8272 6 17.1234 6H14V13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.51467L3 5.94324V18.0569L8 14.4854V9.51467Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16 14.4854V9.51467L21 5.94324L21 18.0569L16 14.4854Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M12 1.5C14.3317 1.5 16.3228 2.95168 17.123 5H13V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V5H6.87695C7.6772 2.95168 9.66828 1.5 12 1.5Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 5.12939C2.91937 4.65662 2 5.12975 2 5.94312V18.0567C2 18.8701 2.91937 19.3432 3.58124 18.8705L9 14.9999V8.99993L3.58124 5.12939ZM8 9.51455L3 5.94312V18.0567L8 14.4853V9.51455Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 5.94312V18.0567C22 18.8701 21.0806 19.3432 20.4188 18.8705L15 14.9999V8.99993L20.4188 5.12939C21.0806 4.65662 22 5.12975 22 5.94312ZM16 9.51455V14.4853L21 18.0567L21 5.94312L16 9.51455Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M13 5H17.123C16.3228 2.95168 14.3317 1.5 12 1.5C9.66828 1.5 7.6772 2.95168 6.87695 5H11V13L11.0049 13.1025C11.0562 13.6067 11.4823 14 12 14C12.5523 14 13 13.5523 13 13V5ZM14 13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13V6H6.87661C6.17279 6 5.68951 5.29143 5.94531 4.63574C6.89023 2.2174 9.24227 0.5 12 0.5C14.7577 0.5 17.1098 2.2174 18.0547 4.63574C18.3105 5.29143 17.8272 6 17.1234 6H14V13Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      line-height: 0;
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-twoway-acuator-general-closed': ObiTwowayAcuatorGeneralClosed;
  }
}
