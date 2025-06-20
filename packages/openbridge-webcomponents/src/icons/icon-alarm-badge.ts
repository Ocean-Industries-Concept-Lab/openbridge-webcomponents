import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-alarm-badge')
export class ObiAlarmBadge extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5977 3.45245L2.11783 18.6539C1.68126 19.4365 1.46298 19.8278 1.5 20.1481C1.5323 20.4276 1.68084 20.6806 1.90919 20.8449C2.17092 21.0333 2.61899 21.0333 3.51513 21.0333H20.4697C21.3656 21.0333 21.8136 21.0333 22.0753 20.845C22.3036 20.6806 22.4522 20.4277 22.4845 20.1483C22.5216 19.828 22.3034 19.4367 21.8672 18.6542L13.3925 3.45281C12.9361 2.63423 12.7079 2.22495 12.4074 2.08895C12.1454 1.97039 11.8451 1.97035 11.5831 2.08884C11.2825 2.22476 11.0542 2.63399 10.5977 3.45245Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5977 3.45245L2.11783 18.6539C1.68126 19.4365 1.46298 19.8278 1.5 20.1481C1.5323 20.4276 1.68084 20.6806 1.90919 20.8449C2.17092 21.0333 2.61899 21.0333 3.51513 21.0333H20.4697C21.3656 21.0333 21.8136 21.0333 22.0753 20.845C22.3036 20.6806 22.4522 20.4277 22.4845 20.1483C22.5216 19.828 22.3034 19.4367 21.8672 18.6542L13.3925 3.45281C12.9361 2.63423 12.7079 2.22495 12.4074 2.08895C12.1454 1.97039 11.8451 1.97035 11.5831 2.08884C11.2825 2.22476 11.0542 2.63399 10.5977 3.45245Z" style="fill: var(--element-active-color)"/>
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
    'obi-alarm-badge': ObiAlarmBadge;
  }
}
