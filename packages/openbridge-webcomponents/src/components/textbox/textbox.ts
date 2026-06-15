import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './textbox.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcTextboxAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum ObcTextboxSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
}

type sizeType = ObcTextboxSize | keyof typeof ObcTextboxSize;
type fontWeightType = ObcTextboxFontWeight | keyof typeof ObcTextboxFontWeight;
type alignmentType = ObcTextboxAlignment | keyof typeof ObcTextboxAlignment;

export enum ObcTextboxFontWeight {
  regular = 'regular',
  semibold = 'semibold',
  bold = 'bold',
}

@customElement('obc-textbox')
export class ObcTextbox extends LitElement {
  @property({type: String}) alignment: alignmentType =
    ObcTextboxAlignment.Right;
  @property({type: String}) size: sizeType = ObcTextboxSize.m;
  @property({type: String}) fontWeight: fontWeightType =
    ObcTextboxFontWeight.regular;
  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`alignment-${this.alignment}`]: true,
          [`size-${this.size}`]: true,
          [`font-weight-${this.fontWeight}`]: true,
        })}
      >
        <div class="content">
          <slot></slot>
        </div>
        <div class="spacer" aria-hidden="true">
          <slot name="spacer"></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-textbox': ObcTextbox;
  }
}
