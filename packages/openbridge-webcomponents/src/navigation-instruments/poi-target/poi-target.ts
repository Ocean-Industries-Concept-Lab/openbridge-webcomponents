import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-target.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../poi-line/poi-line';
import '../../components/poi-target-button/poi-target-button';
import {POIStyle} from '../poi-graphic-line/poi-config';
import {pointerArrow} from './arrow';

function valueToPointerStyle(value: string): POIStyle {
  let style = null;
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

function valueToButtonStyle(value: string): string {
  let style = null;
  switch (value) {
    case 'enabled':
      style = 'unchecked';
      break;
    case 'checked':
      style = 'checked';
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
  @property({type: Number}) relativeDirection = 0;

  override render() {
    let pointer = null;
    let hasArrowPointer = false;
    switch (this.pointerType) {
      case Pointer.Line:
        pointer = html`<obc-poi-line
          height=${this.height}
          lineStyle=${valueToPointerStyle(this.value)}
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
        })}
      >
        <obc-poi-target-button
          .value=${valueToButtonStyle(this.value)}
          .hasPointer=${hasArrowPointer}
          .relativeDirection=${this.relativeDirection}
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
