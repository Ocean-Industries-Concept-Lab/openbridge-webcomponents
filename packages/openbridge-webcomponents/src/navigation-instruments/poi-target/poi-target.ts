import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-target.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../poi-line/poi-line';
import '../../components/poi-target-button/poi-target-button';
import {POIStyle} from '../poi-graphic-line/poi-config';
import {pointerArrow} from './arrow';

function valueToStyle(value: string): POIStyle {
  let style = POIStyle.Normal;
  switch (value) {
    case 'enabled':
      style = POIStyle.Normal;
      break;
    case 'checked':
      style = POIStyle.Enhanced;
      break;
    default:
      throw new Error(`Value has no style: ${style}`);
  }
  return style;
}

export enum Pointer {
  Line = 'line',
  ArrowLeft = 'arrow-left',
  ArrowRight = 'arrow-right',
  None = 'null',
}

@customElement('obc-poi-target')
export class ObcPoiTarget extends LitElement {
  @property({type: Number}) height: number = 188;
  @property({type: String}) value: string = 'enabled';
  @property({type: String}) pointerType: Pointer = Pointer.Line;

  override render() {
    const style = valueToStyle(this.value);

    let pointer = null;
    let hasArrowPointer = false;
    switch (this.pointerType) {
      case Pointer.Line:
        pointer = html`<obc-poi-line
          height=${this.height}
          lineStyle=${style}
        ></obc-poi-line>`;
        break;
      case Pointer.ArrowLeft:
        pointer = pointerArrow(this.pointerType, this.value);
        hasArrowPointer = true;
        break;
      case Pointer.ArrowRight:
        pointer = pointerArrow(this.pointerType, this.value);
        hasArrowPointer = true;
        break;
      case Pointer.None:
        pointer = null;
        break;
      default:
        throw new Error(`Pointer type ${this.pointerType} not supported`);
    }

    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['type-' + this.pointerType]: true,
          ['value-' + this.value]: true,
        })}
      >
        <obc-poi-target-button
          value=${this.value}
          .hasPointer=${hasArrowPointer}
        ></obc-poi-target-button>
        ${pointer}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-target': ObcPoiTarget;
  }
}
