import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pipe-cross')
export class ObiPipeCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 0H15V5.67363C16.4557 6.36516 17.6348 7.54431 18.3264 9H24V15H18.3264C17.6348 16.4557 16.4557 17.6348 15 18.3264V24H9V18.3264C7.54431 17.6348 6.36516 16.4557 5.67363 15H0V9H5.67363C6.36516 7.54431 7.54431 6.36516 9 5.67363V0Z" fill="currentColor"/>
<path d="M9 5.67363C7.54431 6.36516 6.36516 7.54431 5.67363 9H0V10H6.30568L6.57689 9.42909C7.16964 8.18132 8.18132 7.16964 9.42909 6.57689L10 6.30568V0H9V5.67363Z" fill="currentColor"/>
<path d="M5.67363 15C6.36516 16.4557 7.54431 17.6348 9 18.3264V24H10V17.6943L9.42909 17.4231C8.18132 16.8304 7.16964 15.8187 6.57689 14.5709L6.30568 14H0V15H5.67363Z" fill="currentColor"/>
<path d="M15 18.3264C16.4557 17.6348 17.6348 16.4557 18.3264 15H24V14H17.6943L17.4231 14.5709C16.8304 15.8187 15.8187 16.8304 14.5709 17.4231L14 17.6943V24H15V18.3264Z" fill="currentColor"/>
<path d="M18.3264 9C17.6348 7.54431 16.4557 6.36516 15 5.67363V0H14V6.30568L14.5709 6.57689C15.8187 7.16964 16.8304 8.18132 17.4231 9.42909L17.6943 10H24V9H18.3264Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 0H15V5.67363C16.4557 6.36516 17.6348 7.54431 18.3264 9H24V15H18.3264C17.6348 16.4557 16.4557 17.6348 15 18.3264V24H9V18.3264C7.54431 17.6348 6.36516 16.4557 5.67363 15H0V9H5.67363C6.36516 7.54431 7.54431 6.36516 9 5.67363V0Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M9 5.67363C7.54431 6.36516 6.36516 7.54431 5.67363 9H0V10H6.30568L6.57689 9.42909C7.16964 8.18132 8.18132 7.16964 9.42909 6.57689L10 6.30568V0H9V5.67363Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M5.67363 15C6.36516 16.4557 7.54431 17.6348 9 18.3264V24H10V17.6943L9.42909 17.4231C8.18132 16.8304 7.16964 15.8187 6.57689 14.5709L6.30568 14H0V15H5.67363Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M15 18.3264C16.4557 17.6348 17.6348 16.4557 18.3264 15H24V14H17.6943L17.4231 14.5709C16.8304 15.8187 15.8187 16.8304 14.5709 17.4231L14 17.6943V24H15V18.3264Z" style="fill: var(--automation-pipes-tertiary-color)"/>
<path d="M18.3264 9C17.6348 7.54431 16.4557 6.36516 15 5.67363V0H14V6.30568L14.5709 6.57689C15.8187 7.16964 16.8304 8.18132 17.4231 9.42909L17.6943 10H24V9H18.3264Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-pipe-cross': ObiPipeCross;
  }
}
