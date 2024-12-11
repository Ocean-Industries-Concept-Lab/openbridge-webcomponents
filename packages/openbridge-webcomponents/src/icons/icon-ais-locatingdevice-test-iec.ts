import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-locatingdevice-test-iec')
export class ObiAisLocatingdeviceTestIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM18.7088 19.4158C16.9347 21.0218 14.5816 22 12 22C9.41849 22 7.06545 21.0218 5.29131 19.4159L12.0001 12.7071L18.7088 19.4158ZM19.4159 18.7086L12.7072 12L19.4159 5.29131C21.0218 7.06545 22 9.41849 22 12C22 14.5815 21.0218 16.9345 19.4159 18.7086ZM18.7088 4.5842L12.0001 11.2928L5.29136 4.58409C7.06549 2.97817 9.41851 2 12 2C14.5815 2 16.9346 2.97822 18.7088 4.5842ZM4.94684 4.91107C4.93489 4.92296 4.92296 4.93489 4.91107 4.94684L4.94684 4.91107ZM4.58425 5.29119C2.97824 7.06534 2 9.41843 2 12C2 14.5815 2.97822 16.9346 4.5842 18.7088L11.293 12L4.58425 5.29119ZM4.91052 19.0526C4.92278 19.0649 4.93507 19.0772 4.94739 19.0895L4.91052 19.0526Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM18.7088 19.4158C16.9347 21.0218 14.5816 22 12 22C9.41849 22 7.06545 21.0218 5.29131 19.4159L12.0001 12.7071L18.7088 19.4158ZM19.4159 18.7086L12.7072 12L19.4159 5.29131C21.0218 7.06545 22 9.41849 22 12C22 14.5815 21.0218 16.9345 19.4159 18.7086ZM18.7088 4.5842L12.0001 11.2928L5.29136 4.58409C7.06549 2.97817 9.41851 2 12 2C14.5815 2 16.9346 2.97822 18.7088 4.5842ZM4.94684 4.91107C4.93489 4.92296 4.92296 4.93489 4.91107 4.94684L4.94684 4.91107ZM4.58425 5.29119C2.97824 7.06534 2 9.41843 2 12C2 14.5815 2.97822 16.9346 4.5842 18.7088L11.293 12L4.58425 5.29119ZM4.91052 19.0526C4.92278 19.0649 4.93507 19.0772 4.94739 19.0895L4.91052 19.0526Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-locatingdevice-test-iec': ObiAisLocatingdeviceTestIec;
  }
}
