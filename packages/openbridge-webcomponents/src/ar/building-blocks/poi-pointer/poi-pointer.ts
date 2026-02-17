import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './poi-pointer.css?inline';
import {customElement} from '../../../decorator.js';
import {
  ObcPoiSelectionFrameState,
  ObcPoiSelectionFrameType,
} from '../poi-selection-frame/poi-selection-frame.js';
import '../poi-selection-frame/poi-selection-frame.js';

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

  @property({type: Number, attribute: 'box-width'})
  boxWidth: number | null = null;

  @property({type: Number, attribute: 'box-height'})
  boxHeight: number | null = null;

  private get shouldUseBoxDimensions(): boolean {
    if (this.type === ObcPoiPointerType.Point) {
      return (
        this.state === ObcPoiPointerState.Selected ||
        this.state === ObcPoiPointerState.Active
      );
    }

    if (this.type === ObcPoiPointerType.Camera) {
      return this.state === ObcPoiPointerState.Active;
    }

    return false;
  }

  private get resolvedBoxWidth(): number | null {
    if (
      !this.shouldUseBoxDimensions ||
      this.boxWidth === null ||
      this.boxWidth < 0
    ) {
      return null;
    }
    return this.boxWidth;
  }

  private get resolvedBoxHeight(): number | null {
    if (
      !this.shouldUseBoxDimensions ||
      this.boxHeight === null ||
      this.boxHeight < 0
    ) {
      return null;
    }
    return this.boxHeight;
  }

  private get wrapperStyle(): string | null {
    const width = this.resolvedBoxWidth;
    const height = this.resolvedBoxHeight;
    const styles: string[] = [];

    if (width !== null) {
      styles.push(`--obc-poi-pointer-box-width-extra: ${width}px;`);
    }

    if (height !== null) {
      styles.push(`--obc-poi-pointer-box-height-extra: ${height}px;`);
    }

    if (styles.length === 0) {
      return null;
    }

    return styles.join(' ');
  }

  private renderSquareSelectionFrame() {
    if (this.state !== ObcPoiPointerState.Selected) {
      return nothing;
    }
    if (
      this.type !== ObcPoiPointerType.Point &&
      this.type !== ObcPoiPointerType.Button
    ) {
      return nothing;
    }

    const useCustomMode = this.type === ObcPoiPointerType.Point;

    return html`
      <div class="square-frame" aria-hidden="true">
        <obc-poi-selection-frame
          class="selection-frame"
          .type=${ObcPoiSelectionFrameType.Button}
          .state=${ObcPoiSelectionFrameState.Regular}
          .customMode=${useCustomMode}
          .boxWidth=${useCustomMode ? this.resolvedBoxWidth : null}
          .boxHeight=${useCustomMode ? this.resolvedBoxHeight : null}
        ></obc-poi-selection-frame>
      </div>
    `;
  }

  private renderCameraSelectionFrame() {
    if (
      !(
        this.type === ObcPoiPointerType.Camera &&
        this.state === ObcPoiPointerState.Selected
      )
    ) {
      return nothing;
    }

    return html`
      <div class="square-frame camera-selection-frame" aria-hidden="true">
        <obc-poi-selection-frame
          class="selection-frame"
          .type=${ObcPoiSelectionFrameType.Button}
          .state=${ObcPoiSelectionFrameState.Regular}
          .customMode=${true}
          .boxWidth=${25}
          .boxHeight=${17}
        ></obc-poi-selection-frame>
      </div>
    `;
  }

  private renderPoint() {
    if (
      this.type !== ObcPoiPointerType.Point ||
      this.state === ObcPoiPointerState.Selected
    ) {
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
    if (this.type !== ObcPoiPointerType.Button) {
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
    if (this.type !== ObcPoiPointerType.Camera) {
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
          point: this.type === ObcPoiPointerType.Point,
          button: this.type === ObcPoiPointerType.Button,
          camera: this.type === ObcPoiPointerType.Camera,
        })}
        style=${this.wrapperStyle ?? nothing}
      >
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
