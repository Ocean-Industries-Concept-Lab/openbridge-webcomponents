import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poi-target-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-iec-02-ais-target-activated';

function getIcon(id: String) {
  switch (id) {
    case 'vessel':
      return html`<obi-iec-02-ais-target-activated></obi-iec-02-ais-target-activated>`;
    default:
      throw new Error(`Unknown icon id: ${id}`);
  }
}

@customElement('obc-poi-target-button')
export class ObcPoiTargetButton extends LitElement {
  @property({type: String}) size = 'regular';
  @property({type: String}) type = 'vessel';
  @property({type: String}) variant = 'normal'; // style
  @property({type: String}) value = 'checked';
  @property({type: Boolean}) selected = false;
  @property({attribute: false}) hasPointer = false;
  @property({type: Number}) relativeDirection = 0;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['size-' + this.size]: true,
          ['variant-' + this.variant]: true,
          ['value-' + this.value]: true,
          ['selected-' + this.selected]: false,
          ['pointer-' + this.hasPointer]: true,
        })}
      >
        <div class="visible-wrapper">
          <div
            class="icon"
            style="transform: rotate(${this.relativeDirection}deg);"
          >
            ${getIcon(this.type)}
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
