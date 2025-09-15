import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-collision-avoidance-overtaking')
export class ObiCollisionAvoidanceOvertaking extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00006 8.5C8.00006 9.05228 7.55234 9.5 7.00006 9.5C6.44777 9.5 6.00006 9.05228 6.00006 8.5C6.00006 7.94772 6.44777 7.5 7.00006 7.5C7.55234 7.5 8.00006 7.94772 8.00006 8.5Z" fill="currentColor"/>
<path d="M8.00006 12.5C8.00006 13.0523 7.55234 13.5 7.00006 13.5C6.44777 13.5 6.00006 13.0523 6.00006 12.5C6.00006 11.9477 6.44777 11.5 7.00006 11.5C7.55234 11.5 8.00006 11.9477 8.00006 12.5Z" fill="currentColor"/>
<path d="M14.0001 6L18.0001 2L22.0001 6H19.0001V9.59348C19.0001 10.3096 18.7439 11.0021 18.2778 11.5459L13.2408 17.4224C13.0854 17.6036 13.0001 17.8345 13.0001 18.0732V22H11.0001V18.0732C11.0001 17.357 11.2562 16.6645 11.7223 16.1208L16.7593 10.2443C16.9147 10.063 17.0001 9.8322 17.0001 9.59348V6H14.0001Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00006 2.43934L3.46973 5.96967L4.53039 7.03033L7.00006 4.56066L9.46973 7.03033L10.5304 5.96967L7.00006 2.43934Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00006 8.5C8.00006 9.05228 7.55234 9.5 7.00006 9.5C6.44777 9.5 6.00006 9.05228 6.00006 8.5C6.00006 7.94772 6.44777 7.5 7.00006 7.5C7.55234 7.5 8.00006 7.94772 8.00006 8.5Z" style="fill: var(--element-active-color)"/>
<path d="M8.00006 12.5C8.00006 13.0523 7.55234 13.5 7.00006 13.5C6.44777 13.5 6.00006 13.0523 6.00006 12.5C6.00006 11.9477 6.44777 11.5 7.00006 11.5C7.55234 11.5 8.00006 11.9477 8.00006 12.5Z" style="fill: var(--element-active-color)"/>
<path d="M14.0001 6L18.0001 2L22.0001 6H19.0001V9.59348C19.0001 10.3096 18.7439 11.0021 18.2778 11.5459L13.2408 17.4224C13.0854 17.6036 13.0001 17.8345 13.0001 18.0732V22H11.0001V18.0732C11.0001 17.357 11.2562 16.6645 11.7223 16.1208L16.7593 10.2443C16.9147 10.063 17.0001 9.8322 17.0001 9.59348V6H14.0001Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00006 2.43934L3.46973 5.96967L4.53039 7.03033L7.00006 4.56066L9.46973 7.03033L10.5304 5.96967L7.00006 2.43934Z" style="fill: var(--element-active-color)"/>
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
    'obi-collision-avoidance-overtaking': ObiCollisionAvoidanceOvertaking;
  }
}
