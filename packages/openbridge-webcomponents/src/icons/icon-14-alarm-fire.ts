import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-fire')
export class Obi14AlarmFire extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2V4.43158C12 4.84912 12.147 5.19912 12.441 5.48158C12.7345 5.76404 13.0937 5.90526 13.5187 5.90526C13.7437 5.90526 13.9532 5.85933 14.1473 5.76747C14.3407 5.67512 14.5125 5.53684 14.6625 5.35263L15 4.94737C15.925 5.46316 16.6562 6.18158 17.1937 7.10263C17.7312 8.02368 18 9.02456 18 10.1053C18 11.7509 17.4187 13.1447 16.2562 14.2868C16.1568 14.3846 16.0554 14.4781 15.9522 14.5675C15.984 14.358 16 14.1437 16 13.9255C16 13.402 15.9066 12.8757 15.6958 12.3704L15.695 12.3684C15.4995 11.9012 15.2241 11.4831 14.8823 11.1195L14.8762 11.113L12 8.10693L9.1238 11.113L9.11774 11.1195C8.76433 11.4955 8.48772 11.9282 8.29488 12.4068C8.0998 12.8911 8 13.4018 8 13.9255C8 14.1437 8.01607 14.3581 8.04789 14.5676C7.94463 14.4782 7.84325 14.3846 7.74375 14.2868C6.58125 13.1447 6 11.7509 6 10.1053C6 8.52105 6.54075 7.01667 7.62225 5.5921C8.70325 4.16754 10.1625 2.97018 12 2Z" fill="currentColor"/>
<path d="M14 13.9255C14 13.8545 13.9969 13.785 13.9906 13.7168C13.9719 13.5123 13.925 13.3202 13.85 13.1404C13.75 12.9014 13.6083 12.6843 13.425 12.4893L12 10.9999L10.575 12.4893C10.3917 12.6843 10.25 12.906 10.15 13.1542C10.0822 13.3224 10.0374 13.4946 10.0156 13.671C10.0052 13.7549 10 13.8398 10 13.9255C10 13.9964 10.0031 14.0661 10.0092 14.1345C10.0521 14.6135 10.245 15.0315 10.588 15.3883C10.9793 15.7961 11.45 16 12 16C12.55 16 13.021 15.7961 13.413 15.3883C13.7392 15.0484 13.9294 14.6531 13.9837 14.2023C13.9905 14.1461 13.9952 14.0889 13.9977 14.0309C13.9992 13.9961 14 13.9609 14 13.9255Z" fill="currentColor"/>
<path d="M6.70357 16.5268L12.0003 18.4546L17.2963 16.527L17.9803 18.4064L14.9241 19.5188L17.9799 20.631L17.2958 22.5104L12.0003 20.583L6.70402 22.5107L6.01998 20.6313L9.07647 19.5188L6.01953 18.4062L6.70357 16.5268Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2V4.43158C12 4.84912 12.147 5.19912 12.441 5.48158C12.7345 5.76404 13.0937 5.90526 13.5187 5.90526C13.7437 5.90526 13.9532 5.85933 14.1473 5.76747C14.3407 5.67512 14.5125 5.53684 14.6625 5.35263L15 4.94737C15.925 5.46316 16.6562 6.18158 17.1937 7.10263C17.7312 8.02368 18 9.02456 18 10.1053C18 11.7509 17.4187 13.1447 16.2562 14.2868C16.1568 14.3846 16.0554 14.4781 15.9522 14.5675C15.984 14.358 16 14.1437 16 13.9255C16 13.402 15.9066 12.8757 15.6958 12.3704L15.695 12.3684C15.4995 11.9012 15.2241 11.4831 14.8823 11.1195L14.8762 11.113L12 8.10693L9.1238 11.113L9.11774 11.1195C8.76433 11.4955 8.48772 11.9282 8.29488 12.4068C8.0998 12.8911 8 13.4018 8 13.9255C8 14.1437 8.01607 14.3581 8.04789 14.5676C7.94463 14.4782 7.84325 14.3846 7.74375 14.2868C6.58125 13.1447 6 11.7509 6 10.1053C6 8.52105 6.54075 7.01667 7.62225 5.5921C8.70325 4.16754 10.1625 2.97018 12 2Z" fill="currentColor"/>
<path d="M14 13.9255C14 13.8545 13.9969 13.785 13.9906 13.7168C13.9719 13.5123 13.925 13.3202 13.85 13.1404C13.75 12.9014 13.6083 12.6843 13.425 12.4893L12 10.9999L10.575 12.4893C10.3917 12.6843 10.25 12.906 10.15 13.1542C10.0822 13.3224 10.0374 13.4946 10.0156 13.671C10.0052 13.7549 10 13.8398 10 13.9255C10 13.9964 10.0031 14.0661 10.0092 14.1345C10.0521 14.6135 10.245 15.0315 10.588 15.3883C10.9793 15.7961 11.45 16 12 16C12.55 16 13.021 15.7961 13.413 15.3883C13.7392 15.0484 13.9294 14.6531 13.9837 14.2023C13.9905 14.1461 13.9952 14.0889 13.9977 14.0309C13.9992 13.9961 14 13.9609 14 13.9255Z" fill="currentColor"/>
<path d="M6.70357 16.5268L12.0003 18.4546L17.2963 16.527L17.9803 18.4064L14.9241 19.5188L17.9799 20.631L17.2958 22.5104L12.0003 20.583L6.70402 22.5107L6.01998 20.6313L9.07647 19.5188L6.01953 18.4062L6.70357 16.5268Z" fill="currentColor"/>
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
    'obi-14-alarm-fire': Obi14AlarmFire;
  }
}
