import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-heave')
export class Obi12Heave extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.4006 2H9.60119V4.31818H7.20148C6.32159 4.31818 5.60167 5.01364 5.60167 5.86364V9.43364L4.5698 9.75818C4.36182 9.82 4.18584 9.95909 4.08985 10.1445C3.99386 10.33 3.96987 10.5464 4.04186 10.7473L5.06168 14.9091H6.677L6.69684 14.8893L5.77759 11.0023L7.69736 10.3918L12.0008 9.03955L16.3043 10.4073L18.2161 11.01L17.3047 14.8905L17.3233 14.9091H18.9401L19.952 10.7473C20.0159 10.5464 20 10.33 19.904 10.1445C19.808 9.95909 19.632 9.82 19.424 9.75818L18.4001 9.43364V5.86364C18.4001 5.01364 17.6802 4.31818 16.8003 4.31818H14.4006V2ZM12.8009 3.54545V4.31818H11.2011V3.54545H12.8009ZM7.20153 8.93136V5.86364H16.8004V8.93136L12.001 7.40909L7.20153 8.93136Z" fill="currentColor"/>
<path d="M8.45717 15.1693C8.54042 15.1121 8.62284 15.0556 8.70437 15.0002H8.89845L9.06974 15.1166C9.36995 15.3209 9.68131 15.5329 10.0002 15.7251V17.3644C9.82482 17.2745 9.65096 17.1811 9.47897 17.0887C9.24945 16.9654 9.02326 16.8439 8.80134 16.735C8.56986 16.8486 8.33417 16.9767 8.09503 17.1067C7.29301 17.5428 6.45196 18 5.60172 18H4.00191V16.4545H5.60172C6.58487 16.4545 7.56803 15.7796 8.45717 15.1693Z" fill="currentColor"/>
<path d="M13 16.2254V14H15L12 11L9 14H11V20H9L12 23L15 20H13V17.8045C12.9999 17.8046 13.0001 17.8045 13 17.8045V16.2254C13.0001 16.2254 12.9999 16.2254 13 16.2254Z" fill="currentColor"/>
<path d="M14.0002 17.3686V15.7261C14.3196 15.5336 14.6315 15.3213 14.9322 15.1166L15.1035 15.0002H15.2975C15.3791 15.0556 15.4615 15.1121 15.5447 15.1693C16.4339 15.7796 17.417 16.4545 18.4002 16.4545H20V18H18.4002C17.5385 18 16.6866 17.5352 15.8748 17.0924C15.6467 16.9679 15.4217 16.8452 15.2006 16.735C14.9898 16.84 14.7753 16.9557 14.5576 17.0731C14.3739 17.1722 14.1878 17.2726 14.0002 17.3686Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.4006 2H9.60119V4.31818H7.20148C6.32159 4.31818 5.60167 5.01364 5.60167 5.86364V9.43364L4.5698 9.75818C4.36182 9.82 4.18584 9.95909 4.08985 10.1445C3.99386 10.33 3.96987 10.5464 4.04186 10.7473L5.06168 14.9091H6.677L6.69684 14.8893L5.77759 11.0023L7.69736 10.3918L12.0008 9.03955L16.3043 10.4073L18.2161 11.01L17.3047 14.8905L17.3233 14.9091H18.9401L19.952 10.7473C20.0159 10.5464 20 10.33 19.904 10.1445C19.808 9.95909 19.632 9.82 19.424 9.75818L18.4001 9.43364V5.86364C18.4001 5.01364 17.6802 4.31818 16.8003 4.31818H14.4006V2ZM12.8009 3.54545V4.31818H11.2011V3.54545H12.8009ZM7.20153 8.93136V5.86364H16.8004V8.93136L12.001 7.40909L7.20153 8.93136Z" style="fill: var(--element-active-color)"/>
<path d="M8.45717 15.1693C8.54042 15.1121 8.62284 15.0556 8.70437 15.0002H8.89845L9.06974 15.1166C9.36995 15.3209 9.68131 15.5329 10.0002 15.7251V17.3644C9.82482 17.2745 9.65096 17.1811 9.47897 17.0887C9.24945 16.9654 9.02326 16.8439 8.80134 16.735C8.56986 16.8486 8.33417 16.9767 8.09503 17.1067C7.29301 17.5428 6.45196 18 5.60172 18H4.00191V16.4545H5.60172C6.58487 16.4545 7.56803 15.7796 8.45717 15.1693Z" style="fill: var(--element-active-color)"/>
<path d="M13 16.2254V14H15L12 11L9 14H11V20H9L12 23L15 20H13V17.8045C12.9999 17.8046 13.0001 17.8045 13 17.8045V16.2254C13.0001 16.2254 12.9999 16.2254 13 16.2254Z" style="fill: var(--element-active-color)"/>
<path d="M14.0002 17.3686V15.7261C14.3196 15.5336 14.6315 15.3213 14.9322 15.1166L15.1035 15.0002H15.2975C15.3791 15.0556 15.4615 15.1121 15.5447 15.1693C16.4339 15.7796 17.417 16.4545 18.4002 16.4545H20V18H18.4002C17.5385 18 16.6866 17.5352 15.8748 17.0924C15.6467 16.9679 15.4217 16.8452 15.2006 16.735C14.9898 16.84 14.7753 16.9557 14.5576 17.0731C14.3739 17.1722 14.1878 17.2726 14.0002 17.3686Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-12-heave': Obi12Heave;
  }
}
