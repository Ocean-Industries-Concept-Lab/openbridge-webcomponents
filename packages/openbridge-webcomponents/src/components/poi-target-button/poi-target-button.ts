import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-target-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-iec-02-ais-target-activated';
import {pointerArrow} from '../../navigation-instruments/poi-target/arrow';
import {Pointer} from '../../navigation-instruments/poi-target/poi-target';

export enum PoiTargetButtonValue {
  checked = 'checked',
  unchecked = 'unchecked',
}

@customElement('obc-poi-target-button')
export class ObcPoiTargetButton extends LitElement {
  @property({type: String}) value: PoiTargetButtonValue =
    PoiTargetButtonValue.checked;
  @property({type: String}) pointer = Pointer.None;
  @property({type: Number}) relativeDirection = 0;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['value-' + this.value]: true,
          ['pointer-' + this.pointer]: true,
        })}
      >
        <div class="visible-wrapper">
          <div
            class="icon"
            style="transform: rotate(${this.relativeDirection}deg);"
          >
            <obi-iec-02-ais-target-activated></obi-iec-02-ais-target-activated>
          </div>
        </div>
        ${this.pointer === Pointer.None || this.pointer === Pointer.Line
          ? ''
          : pointerArrow(this.pointer, this.value)}
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-target-button': ObcPoiTargetButton;
  }
}
