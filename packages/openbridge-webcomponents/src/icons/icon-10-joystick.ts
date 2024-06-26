import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-joystick')
export class Obi10Joystick extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 9.87398C14.7252 9.42994 16 7.86384 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 7.86384 9.27477 9.42994 11 9.87398V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V9.87398Z" fill="currentColor"/>
<path d="M10 15.0867V17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17V15.0867C18.008 15.4404 21 16.8343 21 18.5C21 20.433 16.9706 22 12 22C7.02944 22 3 20.433 3 18.5C3 16.8343 5.99202 15.4404 10 15.0867Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 9.87398C14.7252 9.42994 16 7.86384 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 7.86384 9.27477 9.42994 11 9.87398V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V9.87398Z" style="fill: var(--element-active-color)"/>
<path d="M10 15.0867V17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17V15.0867C18.008 15.4404 21 16.8343 21 18.5C21 20.433 16.9706 22 12 22C7.02944 22 3 20.433 3 18.5C3 16.8343 5.99202 15.4404 10 15.0867Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-joystick': Obi10Joystick;
  }
}
