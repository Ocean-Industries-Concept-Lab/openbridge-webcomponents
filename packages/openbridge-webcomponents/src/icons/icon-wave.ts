import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wave')
export class ObiWave extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.1812 8.44549C18.3528 8.15968 17.5978 8.1842 16.9171 8.52132C15.9867 8.98211 15.3892 9.9498 14.9294 10.7997C14.7853 11.0661 14.6498 11.3305 14.5188 11.5862L14.5182 11.5874C14.1943 12.2197 13.8989 12.795 13.5438 13.2793C13.0648 13.9327 12.5965 14.2489 12 14.2489C10.5147 14.2489 9.55017 13.2405 9.24434 12.1997C9.09023 11.6752 9.12905 11.2246 9.2712 10.9384C9.29791 10.8847 9.32889 10.8351 9.36453 10.79L9.36975 10.7834L9.37452 10.7765C9.58307 10.4728 9.8439 10.2977 10.0537 10.198C10.1586 10.1482 10.2498 10.1178 10.3132 10.1001C10.3448 10.0912 10.3693 10.0856 10.3849 10.0824C10.3927 10.0808 10.3982 10.0798 10.4012 10.0792L10.4039 10.0788L10.7358 10.0294L10.5914 9.72401C10.5914 9.72401 10.5351 9.61901 10.5084 9.57596C10.4551 9.48997 10.3748 9.37284 10.2641 9.24289C10.0428 8.98323 9.69691 8.66888 9.19931 8.45255L9.19038 8.44867L9.18118 8.44549C8.35282 8.15968 7.59779 8.1842 6.91712 8.52132C5.98674 8.98211 5.38919 9.9498 4.92942 10.7997C4.78524 11.0662 4.64984 11.3305 4.51878 11.5863L4.51823 11.5874C4.19429 12.2197 3.89893 12.795 3.54384 13.2793C3.06483 13.9327 2.59655 14.2489 2 14.2489L1.75 14.2489L1.75001 15.7489L2.00001 15.7489C3.27918 15.7489 4.14009 15.003 4.75358 14.1662C5.18498 13.5777 5.55432 12.8568 5.88646 12.2085L5.8915 12.1987C6.01475 11.9581 6.13287 11.7276 6.24874 11.5134C6.71998 10.6423 7.12638 10.0916 7.58285 9.86549C7.75578 9.77985 7.97459 9.72423 8.27053 9.76088C8.13483 9.91375 8.02026 10.085 7.92778 10.2712C7.57278 10.9859 7.57684 11.8455 7.80518 12.6226C8.26416 14.1846 9.73435 15.7489 12 15.7489C13.2792 15.7489 14.1401 15.003 14.7536 14.1662C15.185 13.5777 15.5543 12.8568 15.8865 12.2085L15.8915 12.1987C16.0148 11.9581 16.1329 11.7276 16.2487 11.5134C16.72 10.6423 17.1264 10.0916 17.5828 9.86549C17.7558 9.77985 17.9746 9.72423 18.2705 9.76088C18.1348 9.91375 18.0203 10.085 17.9278 10.2712C17.5728 10.9859 17.5768 11.8455 17.8052 12.6226C18.2642 14.1846 19.7344 15.7489 22 15.7489L22.25 15.7489L22.25 14.2489L22 14.2489C20.5147 14.2489 19.5502 13.2405 19.2443 12.1997C19.0902 11.6752 19.129 11.2246 19.2712 10.9384C19.2979 10.8847 19.3289 10.8351 19.3645 10.79L19.3697 10.7834L19.3745 10.7765C19.5831 10.4728 19.8439 10.2977 20.0537 10.198C20.1586 10.1482 20.2498 10.1178 20.3132 10.1001C20.3448 10.0912 20.3693 10.0856 20.3849 10.0824C20.3927 10.0808 20.3982 10.0798 20.4012 10.0792L20.4028 10.0789L20.4039 10.0788L20.7358 10.0294L20.5914 9.72401C20.5914 9.72401 20.5351 9.61901 20.5084 9.57596C20.4551 9.48997 20.3748 9.37284 20.2641 9.24289C20.0428 8.98323 19.6969 8.66888 19.1993 8.45255L19.1904 8.44867L19.1812 8.44549Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.1812 8.44549C18.3528 8.15968 17.5978 8.1842 16.9171 8.52132C15.9867 8.98211 15.3892 9.9498 14.9294 10.7997C14.7853 11.0661 14.6498 11.3305 14.5188 11.5862L14.5182 11.5874C14.1943 12.2197 13.8989 12.795 13.5438 13.2793C13.0648 13.9327 12.5965 14.2489 12 14.2489C10.5147 14.2489 9.55017 13.2405 9.24434 12.1997C9.09023 11.6752 9.12905 11.2246 9.2712 10.9384C9.29791 10.8847 9.32889 10.8351 9.36453 10.79L9.36975 10.7834L9.37452 10.7765C9.58307 10.4728 9.8439 10.2977 10.0537 10.198C10.1586 10.1482 10.2498 10.1178 10.3132 10.1001C10.3448 10.0912 10.3693 10.0856 10.3849 10.0824C10.3927 10.0808 10.3982 10.0798 10.4012 10.0792L10.4039 10.0788L10.7358 10.0294L10.5914 9.72401C10.5914 9.72401 10.5351 9.61901 10.5084 9.57596C10.4551 9.48997 10.3748 9.37284 10.2641 9.24289C10.0428 8.98323 9.69691 8.66888 9.19931 8.45255L9.19038 8.44867L9.18118 8.44549C8.35282 8.15968 7.59779 8.1842 6.91712 8.52132C5.98674 8.98211 5.38919 9.9498 4.92942 10.7997C4.78524 11.0662 4.64984 11.3305 4.51878 11.5863L4.51823 11.5874C4.19429 12.2197 3.89893 12.795 3.54384 13.2793C3.06483 13.9327 2.59655 14.2489 2 14.2489L1.75 14.2489L1.75001 15.7489L2.00001 15.7489C3.27918 15.7489 4.14009 15.003 4.75358 14.1662C5.18498 13.5777 5.55432 12.8568 5.88646 12.2085L5.8915 12.1987C6.01475 11.9581 6.13287 11.7276 6.24874 11.5134C6.71998 10.6423 7.12638 10.0916 7.58285 9.86549C7.75578 9.77985 7.97459 9.72423 8.27053 9.76088C8.13483 9.91375 8.02026 10.085 7.92778 10.2712C7.57278 10.9859 7.57684 11.8455 7.80518 12.6226C8.26416 14.1846 9.73435 15.7489 12 15.7489C13.2792 15.7489 14.1401 15.003 14.7536 14.1662C15.185 13.5777 15.5543 12.8568 15.8865 12.2085L15.8915 12.1987C16.0148 11.9581 16.1329 11.7276 16.2487 11.5134C16.72 10.6423 17.1264 10.0916 17.5828 9.86549C17.7558 9.77985 17.9746 9.72423 18.2705 9.76088C18.1348 9.91375 18.0203 10.085 17.9278 10.2712C17.5728 10.9859 17.5768 11.8455 17.8052 12.6226C18.2642 14.1846 19.7344 15.7489 22 15.7489L22.25 15.7489L22.25 14.2489L22 14.2489C20.5147 14.2489 19.5502 13.2405 19.2443 12.1997C19.0902 11.6752 19.129 11.2246 19.2712 10.9384C19.2979 10.8847 19.3289 10.8351 19.3645 10.79L19.3697 10.7834L19.3745 10.7765C19.5831 10.4728 19.8439 10.2977 20.0537 10.198C20.1586 10.1482 20.2498 10.1178 20.3132 10.1001C20.3448 10.0912 20.3693 10.0856 20.3849 10.0824C20.3927 10.0808 20.3982 10.0798 20.4012 10.0792L20.4028 10.0789L20.4039 10.0788L20.7358 10.0294L20.5914 9.72401C20.5914 9.72401 20.5351 9.61901 20.5084 9.57596C20.4551 9.48997 20.3748 9.37284 20.2641 9.24289C20.0428 8.98323 19.6969 8.66888 19.1993 8.45255L19.1904 8.44867L19.1812 8.44549Z" style="fill: var(--element-active-color)"/>
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
    'obi-wave': ObiWave;
  }
}