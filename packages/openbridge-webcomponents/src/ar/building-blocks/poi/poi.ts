import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';
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
import {PoiArrowDirection, pointerArrow} from '../../poi-data/arrow.js';
import '../poi-line/poi-line.js';
import '../poi-pointer/poi-pointer.js';
import {
  ObcPoiPointerState,
  ObcPoiPointerType,
} from '../poi-pointer/poi-pointer.js';
import {customElement} from '../../../decorator.js';

export enum ObcPoiType {
  Line = 'line',
  Offset = 'offset',
  Point = 'point',
  Outside = 'outside',
}

export enum ObcPoiValue {
  Unchecked = 'unchecked',
  Checked = 'checked',
  Activated = 'activated',
  Overlapped = 'overlapped',
}

export enum ObcPoiState {
  Enabled = 'enabled',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

const DEFAULT_LINE_LENGTH_PX = 96;
const POINTER_BOX_BASE_SIZE_PX = 32;
const POINT_POINTER_OFFSET_PX = 12;

@customElement('obc-poi')
export class ObcPoi extends LitElement {
  @property({type: String}) type: ObcPoiType = ObcPoiType.Line;
  @property({type: String}) value: ObcPoiValue = ObcPoiValue.Unchecked;
  @property({type: String}) state: ObcPoiState = ObcPoiState.Enabled;
  @property({type: Number}) x = 0;
  @property({type: Number}) y = DEFAULT_LINE_LENGTH_PX;
  @property({type: Number, attribute: 'button-y'}) buttonY: number | null =
    null;
  @property({type: Boolean, attribute: 'fixed-target'}) fixedTarget = false;
  @property({type: Number, attribute: 'outside-angle'}) outsideAngle = 315;
  @property({type: Boolean}) hasPointer = false;
  @property({type: Boolean, attribute: 'animate-position'})
  animatePosition = false;
  @property({type: Number}) relativeDirection = 0;
  @property({type: Object}) header: ObcPoiButtonHeader | null = null;
  @property({type: String}) buttonType = ObcPoiButtonType.Button;
  @property({type: String, attribute: 'pointer-type'})
  pointerType: ObcPoiPointerType | null = null;
  @property({type: String, attribute: 'pointer-state'})
  pointerState: ObcPoiPointerState | null = null;
  @property({type: Boolean}) selected = false;
  @property({type: Array, attribute: false}) data: ObcPoiButtonDataItem[] = [];
  @property({type: Boolean}) hasRelation = false;
  @property({type: Number, attribute: 'button-offset-x'}) buttonOffsetX = 0;
  @property({type: Number, attribute: 'target-offset-x'}) targetOffsetX = 0;
  @property({type: Number, attribute: 'box-width'}) boxWidth: number | null =
    null;
  @property({type: Number, attribute: 'box-height'}) boxHeight: number | null =
    null;

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('x')) {
      this.style.removeProperty('left');
      this.style.setProperty('--obc-poi-x', `${this.x}px`);
    }
    if (
      changedProperties.has('buttonY') ||
      changedProperties.has('y') ||
      changedProperties.has('fixedTarget')
    ) {
      this.updatePosition();
    }
  }

  private updatePosition() {
    this.style.removeProperty('top');
    if (this.fixedTarget) {
      if (typeof this.buttonY === 'number' && Number.isFinite(this.buttonY)) {
        const lineLength = Number.isFinite(this.y) ? this.y : 0;
        this.style.setProperty('--obc-poi-y', `${this.buttonY - lineLength}px`);
      } else {
        this.style.removeProperty('--obc-poi-y');
      }
    } else if (
      typeof this.buttonY === 'number' &&
      Number.isFinite(this.buttonY)
    ) {
      this.style.setProperty('--obc-poi-y', `${this.buttonY}px`);
    } else {
      this.style.removeProperty('--obc-poi-y');
    }
  }

  private get isCheckedLike(): boolean {
    return (
      this.value === ObcPoiValue.Checked || this.value === ObcPoiValue.Activated
    );
  }

  protected get buttonVisualState(): PoiButtonVisualState {
    switch (this.value) {
      case ObcPoiValue.Unchecked:
        return PoiButtonVisualState.Unchecked;
      case ObcPoiValue.Checked:
      case ObcPoiValue.Activated:
        return PoiButtonVisualState.Checked;
      case ObcPoiValue.Overlapped:
        return PoiButtonVisualState.Overlapped;
      default:
        return PoiButtonVisualState.Unchecked;
    }
  }

  protected get buttonAlertType(): ObcArAlertType {
    switch (this.state) {
      case ObcPoiState.Caution:
        return ObcArAlertType.Caution;
      case ObcPoiState.Warning:
        return ObcArAlertType.Warning;
      case ObcPoiState.Alarm:
        return ObcArAlertType.Alarm;
      case ObcPoiState.Enabled:
      default:
        return ObcArAlertType.None;
    }
  }

  private get lineStyle(): POIStyle {
    if (this.state === ObcPoiState.Alarm) {
      return POIStyle.Alarm;
    }
    if (this.state === ObcPoiState.Warning) {
      return POIStyle.Warning;
    }
    if (this.state === ObcPoiState.Caution) {
      return POIStyle.Caution;
    }
    if (this.selected) {
      return POIStyle.Selected;
    }
    return POIStyle.Regular;
  }

  private get pointerSelected(): boolean {
    return this.isCheckedLike;
  }

  private get lineOffset(): number {
    if (this.type === ObcPoiType.Point || this.type === ObcPoiType.Outside) {
      return 0;
    }

    return this.targetOffsetX - this.buttonOffsetX;
  }

  private get hasInlinePointer(): boolean {
    if (this.isCheckedLike && this.type !== ObcPoiType.Outside) {
      return true;
    }

    if (!this.hasPointer) return false;
    return (
      this.type === ObcPoiType.Line ||
      this.type === ObcPoiType.Offset ||
      this.type === ObcPoiType.Point
    );
  }

  private get resolvedPointerType(): ObcPoiPointerType {
    if (this.isCheckedLike || this.state === ObcPoiState.Enabled) {
      return ObcPoiPointerType.Point;
    }

    return this.pointerType ?? ObcPoiPointerType.Point;
  }

  private get resolvedPointerState(): ObcPoiPointerState {
    if (this.isCheckedLike && this.type !== ObcPoiType.Outside) {
      return ObcPoiPointerState.Selected;
    }

    if (this.pointerState) {
      return this.pointerState;
    }

    return ObcPoiPointerState.Regular;
  }

  private get pointerBoxWidthExtra(): number | null {
    if (this.boxWidth === null) {
      return null;
    }

    const width = Number(this.boxWidth);
    if (!Number.isFinite(width)) {
      return null;
    }

    return Math.max(0, width - POINTER_BOX_BASE_SIZE_PX);
  }

  private get pointerBoxHeightExtra(): number | null {
    if (this.boxHeight === null) {
      return null;
    }

    const height = Number(this.boxHeight);
    if (!Number.isFinite(height)) {
      return null;
    }

    return Math.max(0, height - POINTER_BOX_BASE_SIZE_PX);
  }

  private renderLine() {
    if (this.type === ObcPoiType.Outside) {
      return nothing;
    }

    if (
      this.type === ObcPoiType.Point &&
      (this.isCheckedLike || this.state === ObcPoiState.Alarm)
    ) {
      return nothing;
    }

    const height =
      this.type === ObcPoiType.Point ? 0 : Number.isFinite(this.y) ? this.y : 0;

    return html`
      <obc-poi-line
        class="line"
        .poiStyle=${this.lineStyle}
        .height=${height}
        .offset=${this.lineOffset}
        .hasPointer=${false}
        .animatePosition=${this.animatePosition}
      ></obc-poi-line>
    `;
  }

  private renderInlinePointer() {
    if (!this.hasInlinePointer) {
      return nothing;
    }

    const lineLength =
      this.type === ObcPoiType.Point
        ? POINT_POINTER_OFFSET_PX
        : Number.isFinite(this.y)
          ? this.y
          : 0;

    return html`
      <obc-poi-pointer
        class="pointer"
        style="--obc-poi-pointer-x: ${this
          .lineOffset}px; --obc-poi-pointer-y: ${lineLength}px;"
        .type=${this.resolvedPointerType}
        .state=${this.resolvedPointerState}
        .boxWidth=${this.pointerBoxWidthExtra}
        .boxHeight=${this.pointerBoxHeightExtra}
      ></obc-poi-pointer>
    `;
  }

  private renderOutsideArrow() {
    if (this.type !== ObcPoiType.Outside || !this.hasPointer) {
      return nothing;
    }

    const touchTarget = this.buttonType === ObcPoiButtonType.Enhanced ? 64 : 48;
    const radius = touchTarget / Math.SQRT2;
    const baseCenterYOffset = -touchTarget / 2;
    const angle = (this.outsideAngle * Math.PI) / 180;
    const xOffset = Math.cos(angle) * radius;
    const yOffset = baseCenterYOffset + Math.sin(angle) * radius;
    const value = this.pointerSelected ? 'checked' : 'unchecked';
    return html`<div
      class="outside-arrow"
      style="--obc-poi-outside-arrow-x: ${xOffset}px; --obc-poi-outside-arrow-y: ${yOffset}px; --obc-poi-outside-arrow-angle: ${this
        .outsideAngle}deg;"
    >
      ${pointerArrow(PoiArrowDirection.Right, value)}
    </div>`;
  }

  protected renderPoiButton() {
    return html`
      <obc-poi-button
        layout="inline"
        class=${classMap({
          'poi-button': true,
          overlapped: this.value === ObcPoiValue.Overlapped,
        })}
        .relativeDirection=${this.relativeDirection}
        .selected=${this.selected}
        .header=${this.header}
        .alertType=${this.buttonAlertType}
        .value=${this.buttonVisualState}
        .type=${this.buttonType}
        .data=${this.data}
        .hasRelation=${this.hasRelation}
      >
        <slot></slot>
        <slot name="id-label" slot="id-label"></slot>
        <slot name="relation" slot="relation"></slot>
      </obc-poi-button>
    `;
  }

  override render() {
    const classes = {
      wrapper: true,
      [`type-${this.type}`]: true,
      [`button-${this.buttonType}`]: true,
      [`value-${this.value}`]: true,
      [`state-${this.state}`]: true,
      'has-data': this.data.length > 0,
      'no-motion': !this.animatePosition,
    };

    const wrapperStyle =
      this.buttonOffsetX !== 0
        ? {'--obc-poi-target-top-offset-x': `${this.buttonOffsetX}px`}
        : {};

    return html`
      <div class=${classMap(classes)} style=${styleMap(wrapperStyle)}>
        ${this.renderPoiButton()} ${this.renderLine()}
        ${this.renderInlinePointer()} ${this.renderOutsideArrow()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi': ObcPoi;
  }
}
