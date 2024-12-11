import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-radar-rain-iec')
export class ObiRadarRainIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.45918 8.0377L8.28761 5.20927L7.22694 4.14861L4.39852 6.97704L5.45918 8.0377Z" fill="currentColor"/>
<path d="M15.7122 18.2907L16.7729 19.3514L19.6013 16.523L18.5407 15.4623L15.7122 18.2907Z" fill="currentColor"/>
<path d="M6.33464 12.8191L9.02838 10.1253L7.96772 9.06469L5.27398 11.7584L6.33464 12.8191Z" fill="currentColor"/>
<path d="M10.3753 8.77847L13.069 6.08473L12.0083 5.02407L9.3146 7.71781L10.3753 8.77847Z" fill="currentColor"/>
<path d="M14.6852 15.7822L11.9915 18.4759L10.9308 17.4153L13.6246 14.7215L14.6852 15.7822Z" fill="currentColor"/>
<path d="M18.7258 11.7416L16.0321 14.4353L14.9714 13.3747L17.6652 10.6809L18.7258 11.7416Z" fill="currentColor"/>
<path d="M6.87339 17.9372L9.70182 15.1088L8.64116 14.0481L5.81273 16.8765L6.87339 17.9372Z" fill="currentColor"/>
<path d="M11.116 13.6946L13.9445 10.8661L12.8838 9.80546L10.0554 12.6339L11.116 13.6946Z" fill="currentColor"/>
<path d="M16.5643 6.12493L15.9697 5.53033L17.0304 4.46967L19.5304 6.96967L18.4697 8.03033L17.625 7.18559L15.3587 9.45191L14.298 8.39125L16.5643 6.12493Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.15729 22.3102C9.33464 22.7491 10.6074 22.9923 11.936 22.9998L12 23C12.3797 23 12.7549 22.9808 13.1247 22.9432L13.1877 22.9366C18.3141 22.3863 22.3863 18.3141 22.9366 13.1877C22.9785 12.7975 23 12.4013 23 12C23 11.8102 22.9952 11.6214 22.9857 11.4339L22.985 11.4214C22.9258 10.2785 22.6922 9.18178 22.3102 8.15729C22.1297 7.6734 21.9162 7.20564 21.6724 6.75675C21.2563 5.99088 20.752 5.27995 20.173 4.63762C19.8388 4.26686 19.4797 3.91895 19.0984 3.59653C18.449 3.04745 17.7351 2.57228 16.9697 2.184C16.507 1.94928 16.0255 1.74631 15.528 1.57796L15.4729 1.55948C14.5278 1.24526 13.5258 1.05578 12.4863 1.01056C12.3251 1.00354 12.163 1 12 1C11.4305 1 10.871 1.04328 10.3248 1.12674C10.2947 1.13134 10.2647 1.13606 10.2347 1.1409C5.57352 1.89282 1.89282 5.57352 1.1409 10.2347C1.04819 10.8094 1 11.3991 1 12C1 13.2136 1.19652 14.3812 1.55948 15.4729C1.67916 15.8329 1.81692 16.1846 1.9717 16.5269C2.39342 17.4596 2.94143 18.323 3.59395 19.0953C3.90729 19.4662 4.24473 19.816 4.60385 20.1424L4.63762 20.173C5.4709 20.9241 6.41961 21.5496 7.45396 22.0196C7.68344 22.1239 7.91715 22.2205 8.15474 22.3092L8.15729 22.3102ZM12 21.5C12.1734 21.5 12.3457 21.4954 12.5168 21.4862L14.298 19.705L15.3587 20.7656L15.1639 20.9604C17.8926 19.9969 20.0496 17.8222 20.9889 15.0821L19.9549 14.0481L21.4862 12.5168C21.4954 12.3457 21.5 12.1734 21.5 12C21.5 11.078 21.3687 10.1867 21.1237 9.34377L20.0727 10.3947L19.0121 9.33406L20.531 7.81514C19.5489 5.81701 17.8856 4.21422 15.8439 3.30981L14.4159 4.73786L13.3552 3.6772L14.2616 2.77084C13.5368 2.59384 12.7793 2.5 12 2.5C11.6411 2.5 11.2868 2.51991 10.9382 2.55867L9.70182 3.79506L8.91789 3.01113C6.27361 3.91759 4.15587 5.95802 3.14507 8.55201L4.04496 9.45191L2.55867 10.9382C2.51991 11.2868 2.5 11.6411 2.5 12C2.5 12.7793 2.59384 13.5368 2.77084 14.2616L3.92711 13.1053L4.98777 14.166L3.30981 15.8439C4.21422 17.8856 5.81701 19.5489 7.81514 20.531L9.58397 18.7621L10.6446 19.8228L9.34377 21.1237C10.1867 21.3687 11.078 21.5 12 21.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.45918 8.0377L8.28761 5.20927L7.22694 4.14861L4.39852 6.97704L5.45918 8.0377Z" style="fill: var(--element-active-color)"/>
<path d="M15.7122 18.2907L16.7729 19.3514L19.6013 16.523L18.5407 15.4623L15.7122 18.2907Z" style="fill: var(--element-active-color)"/>
<path d="M6.33464 12.8191L9.02838 10.1253L7.96772 9.06469L5.27398 11.7584L6.33464 12.8191Z" style="fill: var(--element-active-color)"/>
<path d="M10.3753 8.77847L13.069 6.08473L12.0083 5.02407L9.3146 7.71781L10.3753 8.77847Z" style="fill: var(--element-active-color)"/>
<path d="M14.6852 15.7822L11.9915 18.4759L10.9308 17.4153L13.6246 14.7215L14.6852 15.7822Z" style="fill: var(--element-active-color)"/>
<path d="M18.7258 11.7416L16.0321 14.4353L14.9714 13.3747L17.6652 10.6809L18.7258 11.7416Z" style="fill: var(--element-active-color)"/>
<path d="M6.87339 17.9372L9.70182 15.1088L8.64116 14.0481L5.81273 16.8765L6.87339 17.9372Z" style="fill: var(--element-active-color)"/>
<path d="M11.116 13.6946L13.9445 10.8661L12.8838 9.80546L10.0554 12.6339L11.116 13.6946Z" style="fill: var(--element-active-color)"/>
<path d="M16.5643 6.12493L15.9697 5.53033L17.0304 4.46967L19.5304 6.96967L18.4697 8.03033L17.625 7.18559L15.3587 9.45191L14.298 8.39125L16.5643 6.12493Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.15729 22.3102C9.33464 22.7491 10.6074 22.9923 11.936 22.9998L12 23C12.3797 23 12.7549 22.9808 13.1247 22.9432L13.1877 22.9366C18.3141 22.3863 22.3863 18.3141 22.9366 13.1877C22.9785 12.7975 23 12.4013 23 12C23 11.8102 22.9952 11.6214 22.9857 11.4339L22.985 11.4214C22.9258 10.2785 22.6922 9.18178 22.3102 8.15729C22.1297 7.6734 21.9162 7.20564 21.6724 6.75675C21.2563 5.99088 20.752 5.27995 20.173 4.63762C19.8388 4.26686 19.4797 3.91895 19.0984 3.59653C18.449 3.04745 17.7351 2.57228 16.9697 2.184C16.507 1.94928 16.0255 1.74631 15.528 1.57796L15.4729 1.55948C14.5278 1.24526 13.5258 1.05578 12.4863 1.01056C12.3251 1.00354 12.163 1 12 1C11.4305 1 10.871 1.04328 10.3248 1.12674C10.2947 1.13134 10.2647 1.13606 10.2347 1.1409C5.57352 1.89282 1.89282 5.57352 1.1409 10.2347C1.04819 10.8094 1 11.3991 1 12C1 13.2136 1.19652 14.3812 1.55948 15.4729C1.67916 15.8329 1.81692 16.1846 1.9717 16.5269C2.39342 17.4596 2.94143 18.323 3.59395 19.0953C3.90729 19.4662 4.24473 19.816 4.60385 20.1424L4.63762 20.173C5.4709 20.9241 6.41961 21.5496 7.45396 22.0196C7.68344 22.1239 7.91715 22.2205 8.15474 22.3092L8.15729 22.3102ZM12 21.5C12.1734 21.5 12.3457 21.4954 12.5168 21.4862L14.298 19.705L15.3587 20.7656L15.1639 20.9604C17.8926 19.9969 20.0496 17.8222 20.9889 15.0821L19.9549 14.0481L21.4862 12.5168C21.4954 12.3457 21.5 12.1734 21.5 12C21.5 11.078 21.3687 10.1867 21.1237 9.34377L20.0727 10.3947L19.0121 9.33406L20.531 7.81514C19.5489 5.81701 17.8856 4.21422 15.8439 3.30981L14.4159 4.73786L13.3552 3.6772L14.2616 2.77084C13.5368 2.59384 12.7793 2.5 12 2.5C11.6411 2.5 11.2868 2.51991 10.9382 2.55867L9.70182 3.79506L8.91789 3.01113C6.27361 3.91759 4.15587 5.95802 3.14507 8.55201L4.04496 9.45191L2.55867 10.9382C2.51991 11.2868 2.5 11.6411 2.5 12C2.5 12.7793 2.59384 13.5368 2.77084 14.2616L3.92711 13.1053L4.98777 14.166L3.30981 15.8439C4.21422 17.8856 5.81701 19.5489 7.81514 20.531L9.58397 18.7621L10.6446 19.8228L9.34377 21.1237C10.1867 21.3687 11.078 21.5 12 21.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-radar-rain-iec': ObiRadarRainIec;
  }
}
