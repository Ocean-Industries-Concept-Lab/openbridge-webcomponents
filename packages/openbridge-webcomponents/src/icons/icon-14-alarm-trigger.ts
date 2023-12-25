import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-trigger')
export class Obi14AlarmTrigger extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.67412 9.80152C4.01499 9.29137 4.46865 8.86648 5 8.5597L4.5 7.69368C3.83581 8.07715 3.26874 8.60827 2.84265 9.24595C2.41656 9.88364 2.14288 10.6108 2.04278 11.3712C1.94267 12.1315 2.01883 12.9048 2.26535 13.631C2.51187 14.3572 2.92216 15.017 3.46447 15.5593L4.17157 14.8522C3.73773 14.4184 3.4095 13.8906 3.21228 13.3096C3.01506 12.7286 2.95414 12.11 3.03422 11.5017C3.11431 10.8934 3.33325 10.3117 3.67412 9.80152ZM20.3259 9.80152C19.985 9.29137 19.5313 8.86648 19 8.5597L19.5 7.69368C20.1642 8.07715 20.7313 8.60827 21.1573 9.24595C21.5834 9.88364 21.8571 10.6108 21.9572 11.3712C22.0573 12.1315 21.9812 12.9048 21.7347 13.631C21.4881 14.3572 21.0778 15.017 20.5355 15.5593L19.8284 14.8522C20.2623 14.4184 20.5905 13.8906 20.7877 13.3096C20.9849 12.7286 21.0459 12.11 20.9658 11.5017C20.8857 10.8934 20.6667 10.3117 20.3259 9.80152ZM6 10.2918C5.73433 10.4451 5.5075 10.6576 5.33706 10.9127C5.16663 11.1677 5.05715 11.4586 5.01711 11.7628C4.97707 12.0669 5.00753 12.3762 5.10614 12.6667C5.20475 12.9572 5.36886 13.2211 5.58579 13.438L4.87868 14.1451C4.5533 13.8197 4.30712 13.4239 4.15921 12.9881C4.0113 12.5524 3.9656 12.0885 4.02567 11.6322C4.08573 11.176 4.24994 10.7397 4.50559 10.3571C4.76124 9.97448 5.10149 9.65581 5.5 9.42573L6 10.2918ZM18.6629 10.9127C18.4925 10.6576 18.2657 10.4451 18 10.2918L18.5 9.42573C18.8985 9.65581 19.2388 9.97448 19.4944 10.3571C19.7501 10.7397 19.9143 11.176 19.9743 11.6322C20.0344 12.0885 19.9887 12.5524 19.8408 12.9881C19.6929 13.4239 19.4467 13.8197 19.1213 14.1451L18.4142 13.438C18.6311 13.2211 18.7952 12.9572 18.8939 12.6667C18.9925 12.3762 19.0229 12.0669 18.9829 11.7628C18.9428 11.4586 18.8334 11.1677 18.6629 10.9127Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.4287 17.7143V17L17.0001 15.5714V11.2857C17.0001 8.89286 15.3144 6.89286 13.0715 6.40714V5.57143C13.0715 4.97857 12.593 4.5 12.0001 4.5C11.4072 4.5 10.9287 4.97857 10.9287 5.57143V6.40714C8.68582 6.89286 7.0001 8.89286 7.0001 11.2857V15.5714L5.57153 17V17.7143H18.4287Z" fill="currentColor"/>
<path d="M13.4214 18.5786C13.4214 18.9687 13.2647 19.3219 13.0107 19.5786C12.7531 19.8389 12.3956 20 12 20C11.6044 20 11.2469 19.8389 10.9893 19.5786C10.7353 19.3219 10.5786 18.9687 10.5786 18.5786H13.4214Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.67412 9.80152C4.01499 9.29137 4.46865 8.86648 5 8.5597L4.5 7.69368C3.83581 8.07715 3.26874 8.60827 2.84265 9.24595C2.41656 9.88364 2.14288 10.6108 2.04278 11.3712C1.94267 12.1315 2.01883 12.9048 2.26535 13.631C2.51187 14.3572 2.92216 15.017 3.46447 15.5593L4.17157 14.8522C3.73773 14.4184 3.4095 13.8906 3.21228 13.3096C3.01506 12.7286 2.95414 12.11 3.03422 11.5017C3.11431 10.8934 3.33325 10.3117 3.67412 9.80152ZM20.3259 9.80152C19.985 9.29137 19.5313 8.86648 19 8.5597L19.5 7.69368C20.1642 8.07715 20.7313 8.60827 21.1573 9.24595C21.5834 9.88364 21.8571 10.6108 21.9572 11.3712C22.0573 12.1315 21.9812 12.9048 21.7347 13.631C21.4881 14.3572 21.0778 15.017 20.5355 15.5593L19.8284 14.8522C20.2623 14.4184 20.5905 13.8906 20.7877 13.3096C20.9849 12.7286 21.0459 12.11 20.9658 11.5017C20.8857 10.8934 20.6667 10.3117 20.3259 9.80152ZM6 10.2918C5.73433 10.4451 5.5075 10.6576 5.33706 10.9127C5.16663 11.1677 5.05715 11.4586 5.01711 11.7628C4.97707 12.0669 5.00753 12.3762 5.10614 12.6667C5.20475 12.9572 5.36886 13.2211 5.58579 13.438L4.87868 14.1451C4.5533 13.8197 4.30712 13.4239 4.15921 12.9881C4.0113 12.5524 3.9656 12.0885 4.02567 11.6322C4.08573 11.176 4.24994 10.7397 4.50559 10.3571C4.76124 9.97448 5.10149 9.65581 5.5 9.42573L6 10.2918ZM18.6629 10.9127C18.4925 10.6576 18.2657 10.4451 18 10.2918L18.5 9.42573C18.8985 9.65581 19.2388 9.97448 19.4944 10.3571C19.7501 10.7397 19.9143 11.176 19.9743 11.6322C20.0344 12.0885 19.9887 12.5524 19.8408 12.9881C19.6929 13.4239 19.4467 13.8197 19.1213 14.1451L18.4142 13.438C18.6311 13.2211 18.7952 12.9572 18.8939 12.6667C18.9925 12.3762 19.0229 12.0669 18.9829 11.7628C18.9428 11.4586 18.8334 11.1677 18.6629 10.9127Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.4287 17.7143V17L17.0001 15.5714V11.2857C17.0001 8.89286 15.3144 6.89286 13.0715 6.40714V5.57143C13.0715 4.97857 12.593 4.5 12.0001 4.5C11.4072 4.5 10.9287 4.97857 10.9287 5.57143V6.40714C8.68582 6.89286 7.0001 8.89286 7.0001 11.2857V15.5714L5.57153 17V17.7143H18.4287Z" style="fill: var(--element-active-color)"/>
<path d="M13.4214 18.5786C13.4214 18.9687 13.2647 19.3219 13.0107 19.5786C12.7531 19.8389 12.3956 20 12 20C11.6044 20 11.2469 19.8389 10.9893 19.5786C10.7353 19.3219 10.5786 18.9687 10.5786 18.5786H13.4214Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-14-alarm-trigger': Obi14AlarmTrigger;
  }
}
