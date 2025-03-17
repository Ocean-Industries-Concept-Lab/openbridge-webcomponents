import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-frame.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-alarm-badge';
import '../../icons/icon-warning-badge';
import '../../icons/icon-caution-badge';

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

export enum ObcAlertFrameStatus {
  Alarm = 'alarm',
  Warning = 'warning',
  Caution = 'caution',
}

@customElement('obc-alert-frame')
export class ObcAlertFrame extends LitElement {
  @property({type: String}) type: ObcAlertFrameType =
    ObcAlertFrameType.SmallSideFlip;
  @property({type: String}) thickness: ObcAlertFrameThickness =
    ObcAlertFrameThickness.Small;
  @property({type: String}) status: ObcAlertFrameStatus =
    ObcAlertFrameStatus.Alarm;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['thickness-' + this.thickness]: true,
          [this.type]: true,
          [this.status]: true,
        })}
      >
        <slot></slot>
        ${this.flap()}
      </div>
    `;
  }

  private flap() {
    if (this.type === ObcAlertFrameType.Regular) {
      return nothing;
    }

    let icon = html`<obi-alarm-badge class="icon badge"></obi-alarm-badge>`;
    if (this.status === ObcAlertFrameStatus.Warning) {
      icon = html`<obi-warning-badge class="icon badge"></obi-warning-badge>`;
    } else if (this.status === ObcAlertFrameStatus.Caution) {
      icon = html`<obi-caution-badge class="icon badge"></obi-caution-badge>`;
    }

    if (this.type === ObcAlertFrameType.SmallSideFlip) {
      return html`<div class="flap small">
        ${icon}
        <div class="mask up"></div>
      </div>`;
    }
    if (this.type === ObcAlertFrameType.LargeSideFlip) {
      return html`<div class="flap large">
        ${icon}
        <div class="icon"><slot name="icon"></slot></div>
        <div class="mask up"></div>
        <div class="mask down"></div>
      </div>`;
    }
    if (this.type === ObcAlertFrameType.BottomFlip) {
      return html`<div class="flap bottom">
        ${icon}
        <div class="icon"><slot name="icon"></slot></div>
        <div class="label"><slot name="label"></slot></div>
        <div class="spacer"></div>
        <div class="timer"><slot name="timer"></slot></div>
        <div class="mask right"></div>
        <div class="mask left"></div>
      </div>`;
    }
    console.error('Unknown type of alert frame:', this.type);
    return nothing;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-frame': ObcAlertFrame;
  }
}
