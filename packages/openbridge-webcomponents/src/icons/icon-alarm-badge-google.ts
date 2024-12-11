import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-badge-google')
export class ObiAlarmBadgeGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.31719 18.3064L11.2984 4.21515C11.5265 3.8125 11.6405 3.61117 11.7902 3.54397C11.9207 3.48538 12.0701 3.48534 12.2006 3.54388C12.3503 3.61101 12.4644 3.81228 12.6927 4.21484L20.6824 18.3061C20.9048 18.6984 21.016 18.8945 20.9981 19.0553C20.9825 19.1955 20.9083 19.3226 20.7938 19.4053C20.6625 19.5 20.4368 19.5 19.9853 19.5H4.01439C3.56312 19.5 3.33749 19.5 3.20624 19.4053C3.09173 19.3227 3.01751 19.1956 3.00187 19.0554C2.98395 18.8947 3.09503 18.6986 3.31719 18.3064Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.31719 18.3064L11.2984 4.21515C11.5265 3.8125 11.6405 3.61117 11.7902 3.54397C11.9207 3.48538 12.0701 3.48534 12.2006 3.54388C12.3503 3.61101 12.4644 3.81228 12.6927 4.21484L20.6824 18.3061C20.9048 18.6984 21.016 18.8945 20.9981 19.0553C20.9825 19.1955 20.9083 19.3226 20.7938 19.4053C20.6625 19.5 20.4368 19.5 19.9853 19.5H4.01439C3.56312 19.5 3.33749 19.5 3.20624 19.4053C3.09173 19.3227 3.01751 19.1956 3.00187 19.0554C2.98395 18.8947 3.09503 18.6986 3.31719 18.3064Z" style="fill: var(--element-active-color)"/>
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
    'obi-alarm-badge-google': ObiAlarmBadgeGoogle;
  }
}