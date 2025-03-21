import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-badge-outline')
export class ObiAlarmBadgeOutline extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9947 5.05318L4.19618 19.0333H19.7886L11.9947 5.05318ZM2.11772 18.6539L10.5975 3.45245C11.0541 2.63399 11.2824 2.22476 11.5829 2.08884C11.845 1.97035 12.1453 1.97039 12.4073 2.08895C12.7078 2.22495 12.936 2.63423 13.3923 3.45281L21.8671 18.6542C22.3033 19.4367 22.5215 19.828 22.4844 20.1483C22.452 20.4277 22.3035 20.6806 22.0752 20.845C21.8134 21.0333 21.3655 21.0333 20.4696 21.0333H3.51502C2.61888 21.0333 2.17081 21.0333 1.90908 20.8449C1.68073 20.6806 1.53219 20.4276 1.49989 20.1481C1.46287 19.8278 1.68115 19.4365 2.11772 18.6539Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9947 5.05318L4.19618 19.0333H19.7886L11.9947 5.05318ZM2.11772 18.6539L10.5975 3.45245C11.0541 2.63399 11.2824 2.22476 11.5829 2.08884C11.845 1.97035 12.1453 1.97039 12.4073 2.08895C12.7078 2.22495 12.936 2.63423 13.3923 3.45281L21.8671 18.6542C22.3033 19.4367 22.5215 19.828 22.4844 20.1483C22.452 20.4277 22.3035 20.6806 22.0752 20.845C21.8134 21.0333 21.3655 21.0333 20.4696 21.0333H3.51502C2.61888 21.0333 2.17081 21.0333 1.90908 20.8449C1.68073 20.6806 1.53219 20.4276 1.49989 20.1481C1.46287 19.8278 1.68115 19.4365 2.11772 18.6539Z" style="fill: var(--element-active-color)"/>
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
    'obi-alarm-badge-outline': ObiAlarmBadgeOutline;
  }
}
