import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-truemotion-reset')
export class Obi07TruemotionReset extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.32154 10.4389C5.43226 8.84264 6.08275 7.27869 7.3053 6.05613C9.45054 3.91089 12.6615 3.49569 15.2312 4.79206L14.5022 6.24067C12.5461 5.2534 10.0964 5.57172 8.45866 7.20949C7.55904 8.1091 7.07002 9.26246 6.96391 10.4389L10.304 10.4389L6.15195 14.591L1.99988 10.4389H5.32154Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.67379 15.1544L8.68918 15.139L8.69052 15.1377L8.6932 15.135L8.71 15.1182L8.71092 15.1173C9.54166 14.3005 10.5436 13.7588 11.5561 13.5432L13.0631 13.2224L12.7424 14.7295C12.5269 15.7418 11.9853 16.7436 11.1687 17.5742L11.1462 17.5968L11.1405 17.6025L11.1391 17.6039L11.129 17.6141L11.1209 17.6221L6.54323 22.1998L4.08582 19.7424L8.65709 15.1711L8.67379 15.1544ZM9.3642 15.8782L5.50004 19.7424L6.54323 20.7856L10.4138 16.915L10.4227 16.9061L10.4316 16.8972L10.4412 16.8877L10.4552 16.8736C10.8086 16.5142 11.0971 16.121 11.3178 15.7141C11.5298 15.3234 11.6794 14.9199 11.7643 14.5213C11.3657 14.6062 10.9622 14.7558 10.5715 14.9678C10.1646 15.1885 9.77145 15.477 9.41205 15.8304L9.40217 15.8402L9.39488 15.8475L9.37949 15.8629L9.3642 15.8782Z" fill="currentColor"/>
<path d="M17.6032 6.14506L17.5878 6.16039L17.5711 6.17716L12.9998 10.7484L15.4572 13.2058L20.0349 8.62813L20.043 8.62008L20.0531 8.60993L20.0545 8.60856L20.0602 8.60283L20.0827 8.58026C20.8993 7.7496 21.4409 6.7478 21.6563 5.73554L21.9771 4.22847L20.4701 4.54927C19.4576 4.76478 18.4556 5.30652 17.6249 6.12337L17.624 6.12427L17.6072 6.14104L17.6045 6.14373L17.6032 6.14506Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.32154 10.4389C5.43226 8.84264 6.08275 7.27869 7.3053 6.05613C9.45054 3.91089 12.6615 3.49569 15.2312 4.79206L14.5022 6.24067C12.5461 5.2534 10.0964 5.57172 8.45866 7.20949C7.55904 8.1091 7.07002 9.26246 6.96391 10.4389L10.304 10.4389L6.15195 14.591L1.99988 10.4389H5.32154Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.67379 15.1544L8.68918 15.139L8.69052 15.1377L8.6932 15.135L8.71 15.1182L8.71092 15.1173C9.54166 14.3005 10.5436 13.7588 11.5561 13.5432L13.0631 13.2224L12.7424 14.7295C12.5269 15.7418 11.9853 16.7436 11.1687 17.5742L11.1462 17.5968L11.1405 17.6025L11.1391 17.6039L11.129 17.6141L11.1209 17.6221L6.54323 22.1998L4.08582 19.7424L8.65709 15.1711L8.67379 15.1544ZM9.3642 15.8782L5.50004 19.7424L6.54323 20.7856L10.4138 16.915L10.4227 16.9061L10.4316 16.8972L10.4412 16.8877L10.4552 16.8736C10.8086 16.5142 11.0971 16.121 11.3178 15.7141C11.5298 15.3234 11.6794 14.9199 11.7643 14.5213C11.3657 14.6062 10.9622 14.7558 10.5715 14.9678C10.1646 15.1885 9.77145 15.477 9.41205 15.8304L9.40217 15.8402L9.39488 15.8475L9.37949 15.8629L9.3642 15.8782Z" style="fill: var(--element-active-color)"/>
<path d="M17.6032 6.14506L17.5878 6.16039L17.5711 6.17716L12.9998 10.7484L15.4572 13.2058L20.0349 8.62813L20.043 8.62008L20.0531 8.60993L20.0545 8.60856L20.0602 8.60283L20.0827 8.58026C20.8993 7.7496 21.4409 6.7478 21.6563 5.73554L21.9771 4.22847L20.4701 4.54927C19.4576 4.76478 18.4556 5.30652 17.6249 6.12337L17.624 6.12427L17.6072 6.14104L17.6045 6.14373L17.6032 6.14506Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-truemotion-reset': Obi07TruemotionReset;
  }
}
