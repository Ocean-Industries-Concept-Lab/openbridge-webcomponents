import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-propulsion')
export class Obi10Propulsion extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.475 3.16117C14.2797 2.96591 14.2797 2.64933 14.475 2.45406C14.6702 2.2588 14.9868 2.2588 15.1821 2.45406C15.3774 2.64933 15.3774 2.96591 15.1821 3.16117C14.9868 3.35643 14.6702 3.35643 14.475 3.16117Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.99147 18.3014C5.33088 17.9808 5.65772 17.6477 5.98456 17.3146C6.14798 17.148 6.3114 16.9814 6.47639 16.8165C6.75924 16.5336 7.04286 16.2516 7.32649 15.9695C7.89375 15.4054 8.46101 14.8413 9.02198 14.2709C9.31189 13.9668 9.52402 13.8961 9.92 14.2638C10.2028 14.5325 10.3018 14.7588 10.2594 15.1548C10.1039 16.7104 10.3018 18.2377 11.0655 19.6237C11.8221 20.9742 13.4838 21.8016 15.1314 21.4692C16.3547 21.2217 17.3163 20.5146 18.278 19.7934C18.3487 19.7509 18.4194 19.7085 18.4831 19.659L18.5114 19.6307C18.7376 19.3055 18.5255 19.0933 18.3134 18.8812C17.8794 18.4472 17.4454 18.0148 17.0116 17.5826L17.0109 17.5819C16.1446 16.7187 15.2793 15.8566 14.4172 14.985C14.3788 14.9435 14.3323 14.9047 14.2854 14.8654C14.1162 14.724 13.9401 14.5768 14.1061 14.2779C14.4031 13.7264 14.5657 13.6345 15.089 13.691C16.4112 13.8395 17.7194 13.7052 18.9568 13.2173C21.2691 12.3051 22.1459 9.8161 21.064 7.65942C20.6822 6.89575 20.2296 6.1745 19.671 5.53103C19.4589 5.29061 19.2185 5.30476 18.9215 5.60174C18.5824 5.93138 18.2465 6.27043 17.9095 6.61053L17.9088 6.61126C17.7401 6.78156 17.571 6.95225 17.4012 7.12202L17.4004 7.12286C16.5733 7.94989 15.7463 8.77693 14.9192 9.58982C14.8856 9.62345 14.8528 9.66295 14.8193 9.70324C14.6766 9.87473 14.5223 10.0603 14.2475 9.86559C14.2 9.83136 14.1503 9.79867 14.1005 9.76595C13.8315 9.5892 13.5607 9.41125 13.6323 8.98171C13.8091 7.81499 13.7101 6.65533 13.3636 5.53103C12.8828 3.98954 11.9635 2.90059 10.316 2.53997C9.34018 2.32784 8.42801 2.47633 7.57948 2.92888C6.90066 3.28243 6.22183 3.65013 5.66322 4.1946C5.26985 4.58797 5.37891 4.70221 5.67152 5.00872L5.67736 5.01484C6.03767 5.39634 6.40989 5.76594 6.78509 6.13849C6.9105 6.26302 7.03654 6.38817 7.16229 6.51391C7.37424 6.72587 7.58532 6.93782 7.79617 7.14956L7.79724 7.15063C8.4301 7.78614 9.06109 8.41978 9.70787 9.04535C10.0049 9.34234 10.0756 9.55447 9.71494 9.94338C9.45331 10.2333 9.21997 10.3394 8.81692 10.2899C7.5512 10.1414 6.30669 10.3111 5.09046 10.7495C2.93379 11.5202 1.84484 13.8678 2.74994 16.0033C3.11056 16.8447 3.55604 17.6296 4.17123 18.3155C4.54599 18.7186 4.68034 18.5984 4.99147 18.3014ZM10.8039 10.806C11.4615 10.1484 12.5363 10.1484 13.1939 10.806C13.8515 11.4637 13.8515 12.5385 13.1939 13.1961C12.5363 13.8537 11.4615 13.8537 10.8039 13.1961C10.1463 12.5385 10.1463 11.4637 10.8039 10.806Z" fill="currentColor"/>
<path d="M3.51482 7.75731C3.90534 8.14783 4.53851 8.14783 4.92903 7.75731C5.31955 7.36678 5.31955 6.73362 4.92903 6.34309C4.53851 5.95257 3.90534 5.95257 3.51482 6.34309C3.12429 6.73362 3.12429 7.36678 3.51482 7.75731Z" fill="currentColor"/>
<path d="M3.16117 9.52514C2.96591 9.7204 2.64933 9.7204 2.45406 9.52514C2.2588 9.32988 2.2588 9.01329 2.45406 8.81803C2.64933 8.62277 2.96591 8.62277 3.16117 8.81803C3.35643 9.01329 3.35643 9.32988 3.16117 9.52514Z" fill="currentColor"/>
<path d="M7.75731 20.4853C8.14783 20.0948 8.14783 19.4616 7.75731 19.0711C7.36678 18.6806 6.73362 18.6806 6.34309 19.0711C5.95257 19.4616 5.95257 20.0948 6.34309 20.4853C6.73362 20.8758 7.36678 20.8758 7.75731 20.4853Z" fill="currentColor"/>
<path d="M9.52502 20.8388C9.72028 21.0341 9.72028 21.3507 9.52502 21.5459C9.32975 21.7412 9.01317 21.7412 8.81791 21.5459C8.62265 21.3507 8.62265 21.0341 8.81791 20.8388C9.01317 20.6436 9.32975 20.6436 9.52502 20.8388Z" fill="currentColor"/>
<path d="M20.4852 16.2427C20.0947 15.8522 19.4615 15.8522 19.071 16.2427C18.6804 16.6332 18.6804 17.2664 19.071 17.6569C19.4615 18.0474 20.0947 18.0474 20.4852 17.6569C20.8757 17.2664 20.8757 16.6332 20.4852 16.2427Z" fill="currentColor"/>
<path d="M20.8388 14.4749C21.0341 14.2796 21.3507 14.2796 21.5459 14.4749C21.7412 14.6701 21.7412 14.9867 21.5459 15.182C21.3507 15.3772 21.0341 15.3772 20.8388 15.182C20.6436 14.9867 20.6436 14.6701 20.8388 14.4749Z" fill="currentColor"/>
<path d="M16.2427 3.51469C15.8522 3.90522 15.8522 4.53838 16.2427 4.92891C16.6332 5.31943 17.2664 5.31943 17.6569 4.92891C18.0474 4.53838 18.0474 3.90522 17.6569 3.51469C17.2664 3.12417 16.6332 3.12417 16.2427 3.51469Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.475 3.16117C14.2797 2.96591 14.2797 2.64933 14.475 2.45406C14.6702 2.2588 14.9868 2.2588 15.1821 2.45406C15.3774 2.64933 15.3774 2.96591 15.1821 3.16117C14.9868 3.35643 14.6702 3.35643 14.475 3.16117Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.99147 18.3014C5.33088 17.9808 5.65772 17.6477 5.98456 17.3146C6.14798 17.148 6.3114 16.9814 6.47639 16.8165C6.75924 16.5336 7.04286 16.2516 7.32649 15.9695C7.89375 15.4054 8.46101 14.8413 9.02198 14.2709C9.31189 13.9668 9.52402 13.8961 9.92 14.2638C10.2028 14.5325 10.3018 14.7588 10.2594 15.1548C10.1039 16.7104 10.3018 18.2377 11.0655 19.6237C11.8221 20.9742 13.4838 21.8016 15.1314 21.4692C16.3547 21.2217 17.3163 20.5146 18.278 19.7934C18.3487 19.7509 18.4194 19.7085 18.4831 19.659L18.5114 19.6307C18.7376 19.3055 18.5255 19.0933 18.3134 18.8812C17.8794 18.4472 17.4454 18.0148 17.0116 17.5826L17.0109 17.5819C16.1446 16.7187 15.2793 15.8566 14.4172 14.985C14.3788 14.9435 14.3323 14.9047 14.2854 14.8654C14.1162 14.724 13.9401 14.5768 14.1061 14.2779C14.4031 13.7264 14.5657 13.6345 15.089 13.691C16.4112 13.8395 17.7194 13.7052 18.9568 13.2173C21.2691 12.3051 22.1459 9.8161 21.064 7.65942C20.6822 6.89575 20.2296 6.1745 19.671 5.53103C19.4589 5.29061 19.2185 5.30476 18.9215 5.60174C18.5824 5.93138 18.2465 6.27043 17.9095 6.61053L17.9088 6.61126C17.7401 6.78156 17.571 6.95225 17.4012 7.12202L17.4004 7.12286C16.5733 7.94989 15.7463 8.77693 14.9192 9.58982C14.8856 9.62345 14.8528 9.66295 14.8193 9.70324C14.6766 9.87473 14.5223 10.0603 14.2475 9.86559C14.2 9.83136 14.1503 9.79867 14.1005 9.76595C13.8315 9.5892 13.5607 9.41125 13.6323 8.98171C13.8091 7.81499 13.7101 6.65533 13.3636 5.53103C12.8828 3.98954 11.9635 2.90059 10.316 2.53997C9.34018 2.32784 8.42801 2.47633 7.57948 2.92888C6.90066 3.28243 6.22183 3.65013 5.66322 4.1946C5.26985 4.58797 5.37891 4.70221 5.67152 5.00872L5.67736 5.01484C6.03767 5.39634 6.40989 5.76594 6.78509 6.13849C6.9105 6.26302 7.03654 6.38817 7.16229 6.51391C7.37424 6.72587 7.58532 6.93782 7.79617 7.14956L7.79724 7.15063C8.4301 7.78614 9.06109 8.41978 9.70787 9.04535C10.0049 9.34234 10.0756 9.55447 9.71494 9.94338C9.45331 10.2333 9.21997 10.3394 8.81692 10.2899C7.5512 10.1414 6.30669 10.3111 5.09046 10.7495C2.93379 11.5202 1.84484 13.8678 2.74994 16.0033C3.11056 16.8447 3.55604 17.6296 4.17123 18.3155C4.54599 18.7186 4.68034 18.5984 4.99147 18.3014ZM10.8039 10.806C11.4615 10.1484 12.5363 10.1484 13.1939 10.806C13.8515 11.4637 13.8515 12.5385 13.1939 13.1961C12.5363 13.8537 11.4615 13.8537 10.8039 13.1961C10.1463 12.5385 10.1463 11.4637 10.8039 10.806Z" style="fill: var(--element-active-color)"/>
<path d="M3.51482 7.75731C3.90534 8.14783 4.53851 8.14783 4.92903 7.75731C5.31955 7.36678 5.31955 6.73362 4.92903 6.34309C4.53851 5.95257 3.90534 5.95257 3.51482 6.34309C3.12429 6.73362 3.12429 7.36678 3.51482 7.75731Z" style="fill: var(--element-active-color)"/>
<path d="M3.16117 9.52514C2.96591 9.7204 2.64933 9.7204 2.45406 9.52514C2.2588 9.32988 2.2588 9.01329 2.45406 8.81803C2.64933 8.62277 2.96591 8.62277 3.16117 8.81803C3.35643 9.01329 3.35643 9.32988 3.16117 9.52514Z" style="fill: var(--element-active-color)"/>
<path d="M7.75731 20.4853C8.14783 20.0948 8.14783 19.4616 7.75731 19.0711C7.36678 18.6806 6.73362 18.6806 6.34309 19.0711C5.95257 19.4616 5.95257 20.0948 6.34309 20.4853C6.73362 20.8758 7.36678 20.8758 7.75731 20.4853Z" style="fill: var(--element-active-color)"/>
<path d="M9.52502 20.8388C9.72028 21.0341 9.72028 21.3507 9.52502 21.5459C9.32975 21.7412 9.01317 21.7412 8.81791 21.5459C8.62265 21.3507 8.62265 21.0341 8.81791 20.8388C9.01317 20.6436 9.32975 20.6436 9.52502 20.8388Z" style="fill: var(--element-active-color)"/>
<path d="M20.4852 16.2427C20.0947 15.8522 19.4615 15.8522 19.071 16.2427C18.6804 16.6332 18.6804 17.2664 19.071 17.6569C19.4615 18.0474 20.0947 18.0474 20.4852 17.6569C20.8757 17.2664 20.8757 16.6332 20.4852 16.2427Z" style="fill: var(--element-active-color)"/>
<path d="M20.8388 14.4749C21.0341 14.2796 21.3507 14.2796 21.5459 14.4749C21.7412 14.6701 21.7412 14.9867 21.5459 15.182C21.3507 15.3772 21.0341 15.3772 20.8388 15.182C20.6436 14.9867 20.6436 14.6701 20.8388 14.4749Z" style="fill: var(--element-active-color)"/>
<path d="M16.2427 3.51469C15.8522 3.90522 15.8522 4.53838 16.2427 4.92891C16.6332 5.31943 17.2664 5.31943 17.6569 4.92891C18.0474 4.53838 18.0474 3.90522 17.6569 3.51469C17.2664 3.12417 16.6332 3.12417 16.2427 3.51469Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-propulsion': Obi10Propulsion;
  }
}
