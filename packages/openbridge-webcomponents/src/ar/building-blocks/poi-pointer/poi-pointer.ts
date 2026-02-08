import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-pointer.css?inline';
import {customElement} from '../../../decorator.js';
import {selectionFrame} from '../poi-button/selection-frame.js';
import {ObcArAlertType} from '../../types.js';
import {ObcPoiButtonType} from '../poi-button/poi-button.js';

export enum ObcPoiPointerType {
  Point = 'point',
  Button = 'button',
  Camera = 'camera',
}

export enum ObcPoiPointerState {
  Regular = 'regular',
  Selected = 'selected',
  Active = 'active',
  Uncertain = 'uncertain',
}

/**
 * `<obc-poi-pointer>` renders a compact targeting pointer primitive.
 *
 * Variants mirror the Figma Target Pointer building block:
 * - `type`: `point`, `button`, `camera`
 * - `state`: `regular`, `selected`, `active`, `uncertain`
 *
 * This component is intentionally visual-only and does not emit events.
 */
@customElement('obc-poi-pointer')
export class ObcPoiPointer extends LitElement {
  @property({type: String, reflect: true})
  type: ObcPoiPointerType = ObcPoiPointerType.Point;

  @property({type: String, reflect: true})
  state: ObcPoiPointerState = ObcPoiPointerState.Regular;

  private get isPoint(): boolean {
    return this.type === ObcPoiPointerType.Point;
  }

  private get isButton(): boolean {
    return this.type === ObcPoiPointerType.Button;
  }

  private get isCamera(): boolean {
    return this.type === ObcPoiPointerType.Camera;
  }

  private get isSelected(): boolean {
    return this.state === ObcPoiPointerState.Selected;
  }

  private renderPointRegularGuideFrame() {
    if (!(this.isPoint && this.state === ObcPoiPointerState.Regular)) {
      return nothing;
    }

    return html`
      <div class="point-guide-frame" aria-hidden="true">
        <span class="corner tl"></span>
        <span class="corner tr"></span>
        <span class="corner bl"></span>
        <span class="corner br"></span>
      </div>
    `;
  }

  private renderSquareSelectionFrame() {
    const show =
      (this.isPoint &&
        (this.isSelected || this.state === ObcPoiPointerState.Active)) ||
      (this.isButton && this.isSelected);
    if (!show) {
      return nothing;
    }

    return html`
      <div class="square-frame" aria-hidden="true">
        ${selectionFrame(true, ObcArAlertType.None, ObcPoiButtonType.Button)}
      </div>
    `;
  }

  private renderCameraSelectionFrame() {
    if (!(this.isCamera && this.isSelected)) {
      return nothing;
    }

    return html`
      <div class="camera-frame" aria-hidden="true">
        <span class="corner tl"></span>
        <span class="corner tr"></span>
        <span class="corner bl"></span>
        <span class="corner br"></span>
      </div>
    `;
  }

  private renderPoint() {
    if (!this.isPoint || this.isSelected) {
      return nothing;
    }

    return html`
      <div
        class=${classMap({
          point: true,
          regular: this.state === ObcPoiPointerState.Regular,
          active: this.state === ObcPoiPointerState.Active,
          uncertain: this.state === ObcPoiPointerState.Uncertain,
        })}
      ></div>
    `;
  }

  private renderButton() {
    if (!this.isButton) {
      return nothing;
    }

    return html`
      <div
        class=${classMap({
          button: true,
          regular: this.state === ObcPoiPointerState.Regular,
          active: this.state === ObcPoiPointerState.Active,
          selected: this.state === ObcPoiPointerState.Selected,
          uncertain: this.state === ObcPoiPointerState.Uncertain,
        })}
      ></div>
    `;
  }

  private renderCamera() {
    if (!this.isCamera) {
      return nothing;
    }

    return html`
      <div
        class=${classMap({
          camera: true,
          regular: this.state === ObcPoiPointerState.Regular,
          active: this.state === ObcPoiPointerState.Active,
          selected: this.state === ObcPoiPointerState.Selected,
          uncertain: this.state === ObcPoiPointerState.Uncertain,
        })}
      ></div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          point: this.isPoint,
          button: this.isButton,
          camera: this.isCamera,
        })}
      >
        ${this.renderPointRegularGuideFrame()}
        ${this.renderSquareSelectionFrame()}
        ${this.renderCameraSelectionFrame()} ${this.renderPoint()}
        ${this.renderButton()} ${this.renderCamera()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-pointer': ObcPoiPointer;
  }
}
