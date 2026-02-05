import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './poi-data-base.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../ar/building-blocks/poi-line/poi-line.js';
import '../../ar/poi-button-data/poi-button-data.js';
import {POIStyle} from '../../ar/building-blocks/poi-graphic-line/poi-config.js';
import {ObcArAlertType} from '../../ar/types.js';
import {
  ObcPoiButtonType,
  ObcPoiButtonDataItem,
  ObcPoiButtonHeader,
  PoiButtonVisualState,
} from '../../ar/building-blocks/poi-button/poi-button.js';

export enum TargetState {
  Enabled = 'enabled',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

function stateToPointerStyle(state: TargetState): POIStyle {
  let style = null;
  switch (state) {
    case TargetState.Enabled:
      style = POIStyle.Normal;
      break;
    case TargetState.Caution:
    case TargetState.Warning:
    case TargetState.Alarm:
      style = POIStyle.Enhanced;
      break;
    default:
      throw new Error(`State has no style: ${style}`);
  }
  return style;
}

export enum Pointer {
  Line = 'line',
  ArrowLeft = 'arrow-left',
  ArrowRight = 'arrow-right',
  None = 'null',
}

export {PoiButtonVisualState as PoiDataValue};

/**
 * Abstract base class for POI data components.
 *
 * @ignore This is an abstract base class. Use concrete implementations like ObcPoiData instead.
 */
export class ObcPoiDataBase extends LitElement {
  @property({type: Number}) x = 0;
  @property({type: Number}) height: number | null = null;
  @property({type: Number}) y = 192;
  @property({type: Boolean}) selected = false;
  @property({type: Object}) header: ObcPoiButtonHeader | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String, reflect: true})
  value: PoiButtonVisualState = PoiButtonVisualState.Unchecked;
  @property({type: String}) type = ObcPoiButtonType.Button;
  @property({type: String}) state: TargetState = TargetState.Enabled;
  @property({type: String}) pointerType: Pointer = Pointer.Line;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Number}) offset = 0;
  @property({type: Number, attribute: 'top-offset'}) topOffset = 0;
  @property({type: Number}) buttonOffsetX = 0;
  @property({type: Boolean, attribute: 'allow-button-transition'})
  allowButtonTransition = false;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('x')) {
      this.style.left = `${this.x}px`;
    }
    if (
      changedProperties.has('height') ||
      changedProperties.has('y') ||
      changedProperties.has('fixedTarget')
    ) {
      this.updatePosition();
    }
  }

  private updatePosition() {
    if (this.fixedTarget) {
      // Fixed target mode: target position (height) is fixed, button position = height - y
      if (typeof this.height === 'number' && Number.isFinite(this.height)) {
        const lineLength = Number.isFinite(this.y) ? this.y : 0;
        this.style.top = `${this.height - lineLength}px`;
      } else {
        this.style.removeProperty('top');
      }
    } else {
      // Fixed button mode: button position is fixed
      // If height is set, use it as the button position
      // Otherwise, let CSS handle positioning (e.g., in layers with bottom: 0)
      if (typeof this.height === 'number' && Number.isFinite(this.height)) {
        this.style.top = `${this.height}px`;
      } else {
        this.style.removeProperty('top');
      }
    }
  }

  @property({
    type: Array,
    converter: {
      fromAttribute(value) {
        if (!value) return [];
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      },
      toAttribute(value) {
        if (!value || !Array.isArray(value) || value.length === 0) return null;
        try {
          return JSON.stringify(value);
        } catch {
          return null;
        }
      },
    },
  })
  data: ObcPoiButtonDataItem[] = [];

  override render() {
    let pointer = null;
    let verticalOffset = 0;
    const lineOffset = this.offset - this.topOffset;
    const lineLength = Number.isFinite(this.y) ? this.y : 0;
    const lineBottom = lineLength;

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
            class="line"
            height=${lineLength + verticalOffset}
            poiStyle=${stateToPointerStyle(this.state)}
            .offset=${lineOffset}
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
        ?data-no-transition=${!this.allowButtonTransition &&
        (this.buttonOffsetX !== 0 || this.offset !== 0 || this.topOffset !== 0)}
        style=${[
          `--obc-poi-target-line-height: ${lineLength}px; --obc-poi-target-line-bottom: ${lineBottom}px;`,
          this.buttonOffsetX !== 0
            ? `--obc-poi-target-button-offset-x: ${this.buttonOffsetX}px; --poi-offset: ${this.buttonOffsetX}px;`
            : '',
          this.topOffset !== 0
            ? `--obc-poi-target-top-offset-x: ${this.topOffset}px;`
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <obc-poi-button-data
          .relativeDirection=${this.relativeDirection}
          .selected=${this.selected}
          .header=${this.header}
          .alertType=${this.alertType}
          .value=${this.value}
          .type=${this.type}
          .data=${this.data}
        >
        </obc-poi-button-data>
        ${this.pointerType === Pointer.Line ? pointer : null}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}
