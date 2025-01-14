import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-motion-true-iec')
export class ObiMotionTrueIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9141 16.9999L12.7661 10.1959H12.7181C12.7261 10.3559 12.7381 10.5919 12.7541 10.9039C12.7701 11.2079 12.7861 11.5399 12.8021 11.8999C12.8181 12.2519 12.8261 12.5799 12.8261 12.8839V16.9999H11.2781V8.43188H13.6541L15.7421 15.0319H15.7781L17.9981 8.43188H20.3621V16.9999H18.7421V12.8119C18.7421 12.5319 18.7461 12.2239 18.7541 11.8879C18.7701 11.5439 18.7821 11.2199 18.7901 10.9159C18.8061 10.6039 18.8181 10.3679 18.8261 10.2079H18.7781L16.4981 16.9999H14.9141Z" fill="currentColor"/>
<path d="M7.592 16.9999H5.864V9.88388H3.5V8.43188H9.956V9.88388H7.592V16.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9141 16.9999L12.7661 10.1959H12.7181C12.7261 10.3559 12.7381 10.5919 12.7541 10.9039C12.7701 11.2079 12.7861 11.5399 12.8021 11.8999C12.8181 12.2519 12.8261 12.5799 12.8261 12.8839V16.9999H11.2781V8.43188H13.6541L15.7421 15.0319H15.7781L17.9981 8.43188H20.3621V16.9999H18.7421V12.8119C18.7421 12.5319 18.7461 12.2239 18.7541 11.8879C18.7701 11.5439 18.7821 11.2199 18.7901 10.9159C18.8061 10.6039 18.8181 10.3679 18.8261 10.2079H18.7781L16.4981 16.9999H14.9141Z" style="fill: var(--element-active-color)"/>
<path d="M7.592 16.9999H5.864V9.88388H3.5V8.43188H9.956V9.88388H7.592V16.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-motion-true-iec': ObiMotionTrueIec;
  }
}