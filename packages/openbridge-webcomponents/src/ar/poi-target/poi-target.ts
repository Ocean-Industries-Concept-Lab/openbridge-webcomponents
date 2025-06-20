import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './poi-target.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../poi-line/poi-line.js';
import '../poi-target-button/poi-target-button.js';
import {POIStyle} from '../poi-graphic-line/poi-config.js';
import '../../icons/icon-ais-target-activated-iec.js';
import {ObcArAlertType} from '../types.js';
import {ObcPoiTargetButtonType} from '../poi-target-button/poi-target-button.js';
import {customElement} from '../../decorator.js';

export enum TargetValue {
  enabled = 'enabled',
  checked = 'checked',
}

function valueToPointerStyle(value: TargetValue): POIStyle {
  let style = null;
  switch (value) {
    case TargetValue.enabled:
      style = POIStyle.Normal;
      break;
    case TargetValue.checked:
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

/**
 *
 * @prop {number} height - y-coordinate of pointer (centre) if pointerType 'line' is selected.
 */

@customElement('obc-poi-target')
export class ObcPoiTarget extends LitElement {
  @property({type: Number}) height: number = 192;
  @property({type: Boolean}) selected = false;
  @property({type: String}) selectedId: string | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: Boolean}) overlap = false;
  @property({type: String}) type = ObcPoiTargetButtonType.Button;
  @property({type: String}) value: TargetValue = TargetValue.enabled;
  @property({type: String}) pointerType: Pointer = Pointer.Line;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Number}) offset = 0;
  override render() {
    let pointer = null;
    let verticalOffset = 0;

    if (this.selected) {
      // get the offset from the css variable
      const offset = getComputedStyle(this).getPropertyValue(
        '--obc-poi-target-selected-vertical-offset'
      );
      verticalOffset = parseInt(offset);
    }

    switch (this.pointerType) {
      case Pointer.Line:
        pointer = html`
          <obc-poi-line
            height=${this.height + verticalOffset}
            poiStyle=${valueToPointerStyle(this.value)}
            .offset=${this.offset}
          ></obc-poi-line>
        `;
        break;
      case Pointer.ArrowLeft:
        pointer = Pointer.ArrowLeft;
        break;
      case Pointer.ArrowRight:
        pointer = Pointer.ArrowRight;
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
          selected: this.selected,
        })}
      >
        <obc-poi-target-button
          .relativeDirection=${this.relativeDirection}
          .selected=${this.selected}
          .selectedId=${this.selectedId}
          .alertType=${this.alertType}
          .overlap=${this.overlap}
          .type=${this.type}
        >
          <obi-ais-target-activated-iec></obi-ais-target-activated-iec>
        </obc-poi-target-button>
        ${this.pointerType === Pointer.Line ? pointer : null}
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
