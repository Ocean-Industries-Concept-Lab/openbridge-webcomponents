import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./alert-frame.css?inline";

export enum ObcAlertFrameType {
  Regular = 'regular',
  SmallSideFlip = 'small-side-flip',
  LargeSideFlip = 'large-side-flip',
  BottomFlip = 'bottom-flip',
}

export enum ObcAlertFrameThickness {
  Small = 'small',
  Large = 'large',
}

export enum ObcAlertFrameAlertType {
  Alarm = 'alarm',
  Warning = 'warning',
  Caution = 'caution',
}

@customElement('obc-alert-frame')
export class ObcAlertFrame extends LitElement {
  @property({ type: String}) type: ObcAlertFrameType = ObcAlertFrameType.SmallSideFlip;
  @property({ type: String}) thickness: ObcAlertFrameThickness = ObcAlertFrameThickness.Small;
  @property({ type: String}) alertType: ObcAlertFrameAlertType = ObcAlertFrameAlertType.Alarm;

  override render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-frame': ObcAlertFrame
  }
}
