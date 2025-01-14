import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-target-acquisition-state-auto-iec')
export class ObiRadarTargetAcquisitionStateAutoIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 5.99988C11.0532 5.99988 10.1198 6.22397 9.27617 6.65384L8.36819 4.87182C9.49307 4.29867 10.7376 3.99988 12.0001 3.99988C13.2626 3.99988 14.5072 4.29867 15.632 4.87183L14.7241 6.65384C13.8804 6.22397 12.947 5.99988 12.0001 5.99988Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7063 10.146C17.4137 9.24545 16.9121 8.42697 16.2426 7.75743L17.6568 6.34322C18.5495 7.23593 19.2183 8.32725 19.6084 9.52794C19.9986 10.7286 20.099 12.0046 19.9015 13.2515L17.9261 12.9387C18.0742 12.0035 17.9989 11.0465 17.7063 10.146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.29366 10.1459C6.00107 11.0464 5.92575 12.0034 6.07387 12.9386L4.09849 13.2515C3.901 12.0045 4.00142 10.7285 4.39155 9.52785C4.78168 8.32716 5.45044 7.23584 6.34315 6.34313L7.75736 7.75735C7.08783 8.42688 6.58626 9.24536 6.29366 10.1459Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5267 16.8541C16.2927 16.2975 16.9162 15.5676 17.346 14.7239L19.1281 15.6319C18.5549 16.7568 17.7237 17.7301 16.7023 18.4721C15.6809 19.2142 14.4984 19.704 13.2515 19.9015L12.9386 17.9261C13.8738 17.778 14.7607 17.4106 15.5267 16.8541Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.47327 16.854C9.2393 17.4105 10.1262 17.7779 11.0614 17.926L10.7485 19.9014C9.50157 19.7039 8.31907 19.2141 7.2977 18.472C6.27633 17.73 5.44509 16.7567 4.87193 15.6318L6.65395 14.7238C7.08381 15.5675 7.70724 16.2974 8.47327 16.854Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 5.99988C11.0532 5.99988 10.1198 6.22397 9.27617 6.65384L8.36819 4.87182C9.49307 4.29867 10.7376 3.99988 12.0001 3.99988C13.2626 3.99988 14.5072 4.29867 15.632 4.87183L14.7241 6.65384C13.8804 6.22397 12.947 5.99988 12.0001 5.99988Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7063 10.146C17.4137 9.24545 16.9121 8.42697 16.2426 7.75743L17.6568 6.34322C18.5495 7.23593 19.2183 8.32725 19.6084 9.52794C19.9986 10.7286 20.099 12.0046 19.9015 13.2515L17.9261 12.9387C18.0742 12.0035 17.9989 11.0465 17.7063 10.146Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.29366 10.1459C6.00107 11.0464 5.92575 12.0034 6.07387 12.9386L4.09849 13.2515C3.901 12.0045 4.00142 10.7285 4.39155 9.52785C4.78168 8.32716 5.45044 7.23584 6.34315 6.34313L7.75736 7.75735C7.08783 8.42688 6.58626 9.24536 6.29366 10.1459Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5267 16.8541C16.2927 16.2975 16.9162 15.5676 17.346 14.7239L19.1281 15.6319C18.5549 16.7568 17.7237 17.7301 16.7023 18.4721C15.6809 19.2142 14.4984 19.704 13.2515 19.9015L12.9386 17.9261C13.8738 17.778 14.7607 17.4106 15.5267 16.8541Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.47327 16.854C9.2393 17.4105 10.1262 17.7779 11.0614 17.926L10.7485 19.9014C9.50157 19.7039 8.31907 19.2141 7.2977 18.472C6.27633 17.73 5.44509 16.7567 4.87193 15.6318L6.65395 14.7238C7.08381 15.5675 7.70724 16.2974 8.47327 16.854Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-radar-target-acquisition-state-auto-iec': ObiRadarTargetAcquisitionStateAutoIec;
  }
}