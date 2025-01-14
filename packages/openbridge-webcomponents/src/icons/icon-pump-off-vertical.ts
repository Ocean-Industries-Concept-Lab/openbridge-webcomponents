import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-pump-off-vertical')
export class ObiPumpOffVertical extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14ZM14 11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C9 1.44772 8.55228 1 8 1H5C4.44772 1 4 1.44772 4 2V11C4 13.1846 4.87566 15.1647 6.29514 16.6084L3.83151 19.688C3.0458 20.6701 3.74506 22.125 5.00282 22.125H18.7609C20.0187 22.125 20.718 20.6701 19.9322 19.688L17.5733 16.7392C19.07 15.2855 20 13.2514 20 11C20 6.58172 16.4183 3 12 3C11.3094 3 10.6392 3.08751 10 3.25203C9.65724 3.34026 9.32337 3.45062 9 3.58152V2ZM8 5.06513V2H5V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C11.0699 4 10.1845 4.18088 9.37522 4.50845L8 5.06513ZM4.61238 20.3127L7.04045 17.2776C8.40375 18.3561 10.1267 19 12 19C13.8071 19 15.4742 18.4009 16.8136 17.3904L19.1514 20.3127C19.4133 20.64 19.1802 21.125 18.7609 21.125H5.00282C4.58356 21.125 4.35048 20.64 4.61238 20.3127Z" fill="currentColor"/>
<path d="M11.9981 13C13.1027 13 13.9981 12.1046 13.9981 11C13.9981 9.89543 13.1027 9 11.9981 9C10.8936 9 9.99812 9.89543 9.99812 11C9.99812 12.1046 10.8936 13 11.9981 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99812 2V5.06513L9.37334 4.50845C10.1826 4.18088 11.068 4 11.9981 4C15.8641 4 18.9981 7.13401 18.9981 11C18.9981 14.866 15.8641 18 11.9981 18C8.13213 18 4.99812 14.866 4.99812 11V2H7.99812ZM11.9981 14C13.655 14 14.9981 12.6569 14.9981 11C14.9981 9.34315 13.655 8 11.9981 8C10.3413 8 8.99812 9.34315 8.99812 11C8.99812 12.6569 10.3413 14 11.9981 14Z" fill="currentColor"/>
<path d="M7.03857 17.2776L4.6105 20.3127C4.3486 20.64 4.58169 21.125 5.00094 21.125H18.7591C19.1783 21.125 19.4114 20.64 19.1495 20.3127L16.8117 17.3904C15.4723 18.4009 13.8052 19 11.9981 19C10.1248 19 8.40187 18.3561 7.03857 17.2776Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99812 2V5.06513L9.37334 4.50845C10.1826 4.18088 11.068 4 11.9981 4C15.8641 4 18.9981 7.13401 18.9981 11C18.9981 14.866 15.8641 18 11.9981 18C8.13213 18 4.99812 14.866 4.99812 11V2H7.99812ZM7.03857 17.2776L4.6105 20.3127C4.3486 20.64 4.58169 21.125 5.00094 21.125H18.7591C19.1783 21.125 19.4114 20.64 19.1495 20.3127L16.8117 17.3904C15.4723 18.4009 13.8052 19 11.9981 19C10.1248 19 8.40187 18.3561 7.03857 17.2776ZM11.9981 14C13.655 14 14.9981 12.6569 14.9981 11C14.9981 9.34315 13.655 8 11.9981 8C10.3413 8 8.99812 9.34315 8.99812 11C8.99812 12.6569 10.3413 14 11.9981 14ZM11.9981 13C13.1027 13 13.9981 12.1046 13.9981 11C13.9981 9.89543 13.1027 9 11.9981 9C10.8936 9 9.99812 9.89543 9.99812 11C9.99812 12.1046 10.8936 13 11.9981 13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14ZM14 11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C9 1.44772 8.55228 1 8 1H5C4.44772 1 4 1.44772 4 2V11C4 13.1846 4.87566 15.1647 6.29514 16.6084L3.83151 19.688C3.0458 20.6701 3.74506 22.125 5.00282 22.125H18.7609C20.0187 22.125 20.718 20.6701 19.9322 19.688L17.5733 16.7392C19.07 15.2855 20 13.2514 20 11C20 6.58172 16.4183 3 12 3C11.3094 3 10.6392 3.08751 10 3.25203C9.65724 3.34026 9.32337 3.45062 9 3.58152V2ZM8 5.06513V2H5V11C5 14.866 8.13401 18 12 18C15.866 18 19 14.866 19 11C19 7.13401 15.866 4 12 4C11.0699 4 10.1845 4.18088 9.37522 4.50845L8 5.06513ZM4.61238 20.3127L7.04045 17.2776C8.40375 18.3561 10.1267 19 12 19C13.8071 19 15.4742 18.4009 16.8136 17.3904L19.1514 20.3127C19.4133 20.64 19.1802 21.125 18.7609 21.125H5.00282C4.58356 21.125 4.35048 20.64 4.61238 20.3127Z" style="fill: var(--undefined)"/>
<path d="M11.9981 13C13.1027 13 13.9981 12.1046 13.9981 11C13.9981 9.89543 13.1027 9 11.9981 9C10.8936 9 9.99812 9.89543 9.99812 11C9.99812 12.1046 10.8936 13 11.9981 13Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99812 2V5.06513L9.37334 4.50845C10.1826 4.18088 11.068 4 11.9981 4C15.8641 4 18.9981 7.13401 18.9981 11C18.9981 14.866 15.8641 18 11.9981 18C8.13213 18 4.99812 14.866 4.99812 11V2H7.99812ZM11.9981 14C13.655 14 14.9981 12.6569 14.9981 11C14.9981 9.34315 13.655 8 11.9981 8C10.3413 8 8.99812 9.34315 8.99812 11C8.99812 12.6569 10.3413 14 11.9981 14Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M7.03857 17.2776L4.6105 20.3127C4.3486 20.64 4.58169 21.125 5.00094 21.125H18.7591C19.1783 21.125 19.4114 20.64 19.1495 20.3127L16.8117 17.3904C15.4723 18.4009 13.8052 19 11.9981 19C10.1248 19 8.40187 18.3561 7.03857 17.2776Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.99812 2V5.06513L9.37334 4.50845C10.1826 4.18088 11.068 4 11.9981 4C15.8641 4 18.9981 7.13401 18.9981 11C18.9981 14.866 15.8641 18 11.9981 18C8.13213 18 4.99812 14.866 4.99812 11V2H7.99812ZM7.03857 17.2776L4.6105 20.3127C4.3486 20.64 4.58169 21.125 5.00094 21.125H18.7591C19.1783 21.125 19.4114 20.64 19.1495 20.3127L16.8117 17.3904C15.4723 18.4009 13.8052 19 11.9981 19C10.1248 19 8.40187 18.3561 7.03857 17.2776ZM11.9981 14C13.655 14 14.9981 12.6569 14.9981 11C14.9981 9.34315 13.655 8 11.9981 8C10.3413 8 8.99812 9.34315 8.99812 11C8.99812 12.6569 10.3413 14 11.9981 14ZM11.9981 13C13.1027 13 13.9981 12.1046 13.9981 11C13.9981 9.89543 13.1027 9 11.9981 9C10.8936 9 9.99812 9.89543 9.99812 11C9.99812 12.1046 10.8936 13 11.9981 13Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-pump-off-vertical': ObiPumpOffVertical;
  }
}