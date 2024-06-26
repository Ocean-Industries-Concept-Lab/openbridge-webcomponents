import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-event-record')
export class Obi07EventRecord extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8149 19H4.75V5H15.75V7.93506L17.75 5.93506V3.9C17.75 3.4 17.25 3 16.85 3H3.65C3.15 3 2.75 3.4 2.75 3.9V20.1C2.75 20.5 3.15 21 3.65 21H16.85C17.25 21 17.75 20.5 17.75 20.1V14.4203L15.75 16.4203V19H13.1703L12.9926 19.1777L12.8149 19Z" fill="currentColor"/>
<path d="M12.6851 11H10.75V12.9351L12.6851 11Z" fill="currentColor"/>
<path d="M6.75 7H8.75V9H6.75V7Z" fill="currentColor"/>
<path d="M10.75 7H13.75V9H10.75V7Z" fill="currentColor"/>
<path d="M8.75 11H6.75V13H8.75V11Z" fill="currentColor"/>
<path d="M6.75 15H8.75V17H6.75V15Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.522 6C19.3553 6 19.182 6.06667 19.0554 6.19333L17.8355 7.41333L20.3352 9.91333L21.555 8.69333C21.815 8.43333 21.815 8.01333 21.555 7.75333L19.9952 6.19333C19.8619 6.06 19.6953 6 19.522 6ZM9.75 15.5L17.1223 8.12667L19.622 10.6267L12.2497 18H9.75V15.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8149 19H4.75V5H15.75V7.93506L17.75 5.93506V3.9C17.75 3.4 17.25 3 16.85 3H3.65C3.15 3 2.75 3.4 2.75 3.9V20.1C2.75 20.5 3.15 21 3.65 21H16.85C17.25 21 17.75 20.5 17.75 20.1V14.4203L15.75 16.4203V19H13.1703L12.9926 19.1777L12.8149 19Z" style="fill: var(--element-active-color)"/>
<path d="M12.6851 11H10.75V12.9351L12.6851 11Z" style="fill: var(--element-active-color)"/>
<path d="M6.75 7H8.75V9H6.75V7Z" style="fill: var(--element-active-color)"/>
<path d="M10.75 7H13.75V9H10.75V7Z" style="fill: var(--element-active-color)"/>
<path d="M8.75 11H6.75V13H8.75V11Z" style="fill: var(--element-active-color)"/>
<path d="M6.75 15H8.75V17H6.75V15Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.522 6C19.3553 6 19.182 6.06667 19.0554 6.19333L17.8355 7.41333L20.3352 9.91333L21.555 8.69333C21.815 8.43333 21.815 8.01333 21.555 7.75333L19.9952 6.19333C19.8619 6.06 19.6953 6 19.522 6ZM9.75 15.5L17.1223 8.12667L19.622 10.6267L12.2497 18H9.75V15.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-event-record': Obi07EventRecord;
  }
}
