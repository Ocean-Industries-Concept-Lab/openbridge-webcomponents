import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-valve-reduction-open')
export class ObiValveReductionOpen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_15319_2587" fill="currentColor"/>
<mask id="stroke1_15319_2587" maskUnits="userSpaceOnUse" x="1" y="0.470703" width="22" height="23" fill="black">
<rect fill="white" x="1" y="0.470703" width="22" height="23"/>
<use xlink:href="#stroke0_15319_2587"/>
</mask>
<path d="M2 2.97186C2.00007 2.56523 2.46011 2.32827 2.79102 2.56463L13.6386 10.3139C13.8082 10.435 14.0115 10.5002 14.2199 10.5002H15.6667C15.8831 10.5002 16.0936 10.43 16.2666 10.3002L21.2002 6.60077C21.5297 6.3536 21.9998 6.58831 22 7.00018V17.0002C22 17.4121 21.5298 17.6475 21.2002 17.4006L16.2667 13.7002C16.0936 13.5704 15.883 13.5002 15.6666 13.5002H14.2199C14.0115 13.5002 13.8082 13.5653 13.6386 13.6865L2.79102 21.4357C2.46008 21.6721 2 21.4352 2 21.0285V2.97186Z" stroke-width="2" stroke="currentColor" mask="url(#stroke1_15319_2587)"/>
<defs>
<path id="stroke0_15319_2587" d="M2 2.97186C2.00007 2.56523 2.46011 2.32827 2.79102 2.56463L13.6386 10.3139C13.8082 10.435 14.0115 10.5002 14.2199 10.5002H15.6667C15.8831 10.5002 16.0936 10.43 16.2666 10.3002L21.2002 6.60077C21.5297 6.3536 21.9998 6.58831 22 7.00018V17.0002C22 17.4121 21.5298 17.6475 21.2002 17.4006L16.2667 13.7002C16.0936 13.5704 15.883 13.5002 15.6666 13.5002H14.2199C14.0115 13.5002 13.8082 13.5653 13.6386 13.6865L2.79102 21.4357C2.46008 21.6721 2 21.4352 2 21.0285V2.97186Z"/>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_15319_2587" style="fill: var(--automation-symbol-on-background-color)"/>
<mask id="stroke1_15319_2587" maskUnits="userSpaceOnUse" x="1" y="0.470703" width="22" height="23" fill="black">
<rect fill="white" x="1" y="0.470703" width="22" height="23"/>
<use xlink:href="#stroke0_15319_2587"/>
</mask>
<path d="M2 2.97186C2.00007 2.56523 2.46011 2.32827 2.79102 2.56463L13.6386 10.3139C13.8082 10.435 14.0115 10.5002 14.2199 10.5002H15.6667C15.8831 10.5002 16.0936 10.43 16.2666 10.3002L21.2002 6.60077C21.5297 6.3536 21.9998 6.58831 22 7.00018V17.0002C22 17.4121 21.5298 17.6475 21.2002 17.4006L16.2667 13.7002C16.0936 13.5704 15.883 13.5002 15.6666 13.5002H14.2199C14.0115 13.5002 13.8082 13.5653 13.6386 13.6865L2.79102 21.4357C2.46008 21.6721 2 21.4352 2 21.0285V2.97186Z" stroke-width="2" style="stroke: var(--automation-symbol-on-border-color)" mask="url(#stroke1_15319_2587)"/>
<defs>
<path id="stroke0_15319_2587" d="M2 2.97186C2.00007 2.56523 2.46011 2.32827 2.79102 2.56463L13.6386 10.3139C13.8082 10.435 14.0115 10.5002 14.2199 10.5002H15.6667C15.8831 10.5002 16.0936 10.43 16.2666 10.3002L21.2002 6.60077C21.5297 6.3536 21.9998 6.58831 22 7.00018V17.0002C22 17.4121 21.5298 17.6475 21.2002 17.4006L16.2667 13.7002C16.0936 13.5704 15.883 13.5002 15.6666 13.5002H14.2199C14.0115 13.5002 13.8082 13.5653 13.6386 13.6865L2.79102 21.4357C2.46008 21.6721 2 21.4352 2 21.0285V2.97186Z"/>
</defs>
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
    'obi-valve-reduction-open': ObiValveReductionOpen;
  }
}
