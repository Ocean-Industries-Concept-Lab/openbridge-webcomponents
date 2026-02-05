import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi.css?inline';
import '../poi-button/poi-button.js';
import {
  ObcPoiButtonType,
  ObcPoiButtonHeader,
  ObcPoiButtonDataItem,
  PoiButtonVisualState,
} from '../poi-button/poi-button.js';
import {ObcArAlertType} from '../../types.js';
import {POIStyle} from '../poi-graphic-line/poi-config.js';
import {pointerArrow} from '../../poi-data/arrow.js';
import {Pointer} from '../../poi-data/poi-data.js';
import '../poi-line/poi-line.js';
import {customElement} from '../../../decorator.js';

export enum ObcPoiType {
  Line = 'line',
  OffsetLeft = 'offset-left',
  OffsetRight = 'offset-right',
  Point = 'point',
  OutsideLeft = 'outside-left',
  OutsideRight = 'outside-right',
}

export enum ObcPoiValue {
  Enabled = 'enabled',
  Checked = 'checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
}

const DEFAULT_OFFSET_PX = 24;
const DEFAULT_LINE_HEIGHT_PX = 96;

export abstract class ObcPoiBase extends LitElement {
  @property({type: String}) type: ObcPoiType = ObcPoiType.Line;
  @property({type: String}) value: ObcPoiValue = ObcPoiValue.Enabled;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Object}) header: ObcPoiButtonHeader | null = null;
  @property({type: String}) alertType = ObcArAlertType.None;
  @property({type: String}) buttonType = ObcPoiButtonType.Button;
  @property({type: Boolean}) selected = false;
  @property({type: Array, attribute: false}) data: ObcPoiButtonDataItem[] = [];
  @property({type: Boolean}) hasRelation = false;
  @property({type: Boolean, attribute: false}) hasPointer = true;
  @property({type: String}) lineStyle: POIStyle = POIStyle.Normal;
  @property({type: Number}) lineHeight = DEFAULT_LINE_HEIGHT_PX;
  @property({type: Number}) offset = 0;

  private get buttonValue(): PoiButtonVisualState {
    switch (this.value) {
      case ObcPoiValue.Checked:
        return PoiButtonVisualState.Checked;
      case ObcPoiValue.Activated:
        return PoiButtonVisualState.Activated;
      case ObcPoiValue.Overlapped:
        return PoiButtonVisualState.Overlapped;
      case ObcPoiValue.Enabled:
      default:
        return PoiButtonVisualState.Unchecked;
    }
  }

  private get pointerSelected(): boolean {
    return (
      this.value === ObcPoiValue.Checked || this.value === ObcPoiValue.Activated
    );
  }

  private get lineOffset(): number {
    if (this.type === ObcPoiType.OffsetLeft) {
      return this.offset || -DEFAULT_OFFSET_PX;
    }
    if (this.type === ObcPoiType.OffsetRight) {
      return this.offset || DEFAULT_OFFSET_PX;
    }
    return this.offset;
  }

  private renderLine() {
    if (
      this.type === ObcPoiType.OutsideLeft ||
      this.type === ObcPoiType.OutsideRight
    ) {
      return nothing;
    }

    const height = this.type === ObcPoiType.Point ? 0 : this.lineHeight;

    return html`
      <obc-poi-line
        class="line"
        .poiStyle=${this.lineStyle}
        .height=${height}
        .offset=${this.lineOffset}
        .hasPointer=${this.hasPointer}
        .selected=${this.pointerSelected}
        .faded=${this.value !== ObcPoiValue.Activated}
      ></obc-poi-line>
    `;
  }

  private renderOutsideArrow(
    type: ObcPoiType.OutsideLeft | ObcPoiType.OutsideRight
  ) {
    const pointerType =
      type === ObcPoiType.OutsideLeft ? Pointer.ArrowLeft : Pointer.ArrowRight;
    const value = this.pointerSelected ? 'checked' : 'unchecked';
    return html`<div class="outside-arrow">
      ${pointerArrow(pointerType, value)}
    </div>`;
  }

  override render() {
    const outsideTouchTarget =
      this.buttonType === ObcPoiButtonType.Enhanced
        ? 'var(--maneuvering-components-poi-button-large-touch-target)'
        : 'var(--maneuvering-components-poi-button-touch-target)';

    const classes = {
      wrapper: true,
      [`type-${this.type}`]: true,
      [`value-${this.value}`]: true,
    };

    return html`
      <div
        class=${classMap(classes)}
        style="--obc-poi-outside-touch-target: ${outsideTouchTarget};"
      >
        ${this.type === ObcPoiType.OutsideLeft
          ? this.renderOutsideArrow(ObcPoiType.OutsideLeft)
          : nothing}
        <obc-poi-button
          layout="inline"
          class=${classMap({
            'poi-button': true,
            overlapped: this.value === ObcPoiValue.Overlapped,
          })}
          .relativeDirection=${this.relativeDirection}
          .selected=${this.selected}
          .header=${this.header}
          .alertType=${this.alertType}
          .value=${this.buttonValue}
          .type=${this.buttonType}
          .data=${this.data}
          .hasRelation=${this.hasRelation}
        >
          <slot></slot>
          <slot name="id-label" slot="id-label"></slot>
          <slot name="relation" slot="relation"></slot>
        </obc-poi-button>
        ${this.renderLine()}
        ${this.type === ObcPoiType.OutsideRight
          ? this.renderOutsideArrow(ObcPoiType.OutsideRight)
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

@customElement('obc-poi')
export class ObcPoi extends ObcPoiBase {}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi': ObcPoi;
  }
}
