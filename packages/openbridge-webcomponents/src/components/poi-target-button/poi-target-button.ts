import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-target-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-iec-02-ais-target-activated';

@customElement('obc-poi-target-button')
export class ObcPoiTargetButton extends LitElement {
  @property({type: String}) value = 'checked';
  @property({attribute: false}) hasPointer = false;
  @property({type: Number}) relativeDirection = 0;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['value-' + this.value]: true,
          ['pointer-' + this.hasPointer]: true,
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
