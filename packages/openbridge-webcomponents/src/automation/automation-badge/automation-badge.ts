import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './automation-badge.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-alert-off-filled.js';
import '../../icons/icon-auto.js';
import '../../icons/icon-duty.js';
import '../../icons/icon-command-locked-f.js';

export enum ObcAutomationBadgeMode {
  Flat = 'flat',
  Regular = 'regular',
  Enhanced = 'enhanced',
}

export enum ObcAutomationBadgeType {
  Auto = 'auto',
  CommandLocked = 'command-locked',
  Duty = 'duty',
  AlertOff = 'alert-off',
}

@customElement('obc-automation-badge')
export class ObcAutomationBadge extends LitElement {
  @property({type: String}) mode: ObcAutomationBadgeMode =
    ObcAutomationBadgeMode.Flat;

  @property({type: String}) type?: ObcAutomationBadgeType = undefined;

  // TODO: replace the typo 'siluette' with 'silhouette', probably in Figma as well
  private getIcon() {
    if (this.type === ObcAutomationBadgeType.Auto) {
      return html`<obi-auto class="icon siluette"></obi-auto
        ><obi-auto class="icon"></obi-auto>`;
    } else if (this.type === ObcAutomationBadgeType.CommandLocked) {
      return html`<obi-command-locked-f
          class="icon siluette"
        ></obi-command-locked-f
        ><obi-command-locked-f class="icon"></obi-command-locked-f>`;
    } else if (this.type === ObcAutomationBadgeType.Duty) {
      return html`<obi-duty class="icon siluette"></obi-duty
        ><obi-duty class="icon"></obi-duty>`;
    } else if (this.type === ObcAutomationBadgeType.AlertOff) {
      return html`<obi-alert-off-filled
          class="icon siluette"
        ></obi-alert-off-filled
        ><obi-alert-off-filled class="icon"></obi-alert-off-filled>`;
    } else {
      return html`<slot name="icon-silhouette"></slot><slot></slot>`;
    }
  }

  override render() {
    return html`
      <div class=${classMap({wrapper: true, [this.mode]: true})}>
        <div class="badge">${this.getIcon()}</div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-automation-badge': ObcAutomationBadge;
  }
}
