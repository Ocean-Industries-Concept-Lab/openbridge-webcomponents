import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './automation-badge.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-alert-off-filled.js';
import '../../icons/icon-auto.js';
import '../../icons/icon-manual.js';
import '../../icons/icon-manual-only.js';
import '../../icons/icon-local.js';
import '../../icons/icon-local-only.js';
import '../../icons/icon-duty.js';
import '../../icons/icon-standby.js';
import '../../icons/icon-command-locked-f.js';

export enum ObcAutomationBadgeMode {
  Flat = 'flat',
  Regular = 'regular',
  Enhanced = 'enhanced',
}

export enum ObcAutomationBadgeType {
  Auto = 'auto',
  Manual = 'manual',
  ManualOnly = 'manual-only',
  Local = 'local',
  LocalOnly = 'local-only',
  CommandLocked = 'command-locked',
  Interlock = 'interlock',
  InterlockInhibit = 'interlock-inhibit',
  AlertSilenced = 'alert-silenced',
  Caution = 'caution',
  Warning = 'warning',
  Alarm = 'alarm',
}

@customElement('obc-automation-badge')
export class ObcAutomationBadge extends LitElement {
  @property({type: String}) mode: ObcAutomationBadgeMode =
    ObcAutomationBadgeMode.Flat;

  @property({type: String}) type?: ObcAutomationBadgeType = undefined;

  private get effectiveMode() {
    if (
      this.type &&
      [
        ObcAutomationBadgeType.Caution,
        ObcAutomationBadgeType.Warning,
        ObcAutomationBadgeType.Alarm,
      ].includes(this.type)
    ) {
      return ObcAutomationBadgeMode.Flat;
    } else {
      return this.mode;
    }
  }

  // TODO: replace the typo 'siluette' with 'silhouette', probably in Figma as well
  private getIcon() {
    if (this.type === ObcAutomationBadgeType.Auto) {
      return html`<obi-auto class="icon siluette"></obi-auto
        ><obi-auto class="icon"></obi-auto>`;
    } else if (this.type === ObcAutomationBadgeType.Manual) {
      return html`<obi-manual class="icon siluette"></obi-manual
        ><obi-manual class="icon"></obi-manual>`;
    } else if (this.type === ObcAutomationBadgeType.ManualOnly) {
      return html`<obi-manual-only class="icon siluette"></obi-manual-only
        ><obi-manual-only class="icon"></obi-manual-only>`;
    } else if (this.type === ObcAutomationBadgeType.Local) {
      return html`<obi-local class="icon siluette"></obi-local
        ><obi-local class="icon"></obi-local>`;
    } else if (this.type === ObcAutomationBadgeType.LocalOnly) {
      return html`<obi-local-only class="icon siluette"></obi-local-only
        ><obi-local-only class="icon"></obi-local-only>`;
    } else if (this.type === ObcAutomationBadgeType.CommandLocked) {
      return html`<obi-command-locked-f
          class="icon siluette"
        ></obi-command-locked-f
        ><obi-command-locked-f class="icon"></obi-command-locked-f>`;
    } else if (this.type === ObcAutomationBadgeType.InterlockInhibit) {
      return html`<obi-standby class="icon siluette"></obi-standby
        ><obi-standby class="icon"></obi-standby>`;
    } else if (this.type === ObcAutomationBadgeType.Interlock) {
      return html`<obi-duty class="icon siluette"></obi-duty
        ><obi-duty class="icon"></obi-duty>`;
    } else if (this.type === ObcAutomationBadgeType.AlertSilenced) {
      return html`<obi-alert-off-filled
          class="icon siluette"
        ></obi-alert-off-filled
        ><obi-alert-off-filled class="icon"></obi-alert-off-filled>`;
    } else if (
      this.type === ObcAutomationBadgeType.Caution &&
      this.mode === ObcAutomationBadgeMode.Flat
    ) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="path-2-outside-1_37206_122649"
          maskUnits="userSpaceOnUse"
          x="0.333008"
          y="0.333008"
          width="16"
          height="16"
          fill="black"
        >
          <rect fill="white" x="0.333008" y="0.333008" width="16" height="16" />
          <path
            d="M13.333 1.33301C14.0694 1.33301 14.667 1.93061 14.667 2.66699V13.333C14.667 14.0694 14.0694 14.667 13.333 14.667H2.66699C1.93061 14.667 1.33301 14.0694 1.33301 13.333V2.66699C1.33301 1.93061 1.93061 1.33301 2.66699 1.33301H13.333Z"
          />
        </mask>
        <path
          d="M13.333 1.33301V2.33301C13.5171 2.33301 13.667 2.4829 13.667 2.66699H14.667H15.667C15.667 1.37833 14.6217 0.333008 13.333 0.333008V1.33301ZM14.667 2.66699H13.667V13.333H14.667H15.667V2.66699H14.667ZM14.667 13.333H13.667C13.667 13.5171 13.5171 13.667 13.333 13.667V14.667V15.667C14.6217 15.667 15.667 14.6217 15.667 13.333H14.667ZM13.333 14.667V13.667H2.66699V14.667V15.667H13.333V14.667ZM2.66699 14.667V13.667C2.4829 13.667 2.33301 13.5171 2.33301 13.333H1.33301H0.333008C0.333008 14.6217 1.37833 15.667 2.66699 15.667V14.667ZM1.33301 13.333H2.33301V2.66699H1.33301H0.333008V13.333H1.33301ZM1.33301 2.66699H2.33301C2.33301 2.4829 2.4829 2.33301 2.66699 2.33301V1.33301V0.333008C1.37833 0.333008 0.333008 1.37833 0.333008 2.66699H1.33301ZM2.66699 1.33301V2.33301H13.333V1.33301V0.333008H2.66699V1.33301Z"
          fill="var(--border-silhouette-color)"
          mask="url(#path-2-outside-1_37206_122649)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.66665 1.33301C1.93027 1.33301 1.33331 1.92996 1.33331 2.66634V13.333C1.33331 14.0694 1.93027 14.6663 2.66665 14.6663H13.3333C14.0697 14.6663 14.6666 14.0694 14.6666 13.333V2.66634C14.6666 1.92996 14.0697 1.33301 13.3333 1.33301H2.66665Z"
          fill="var(--alert-caution-color)"
        />
        <path
          d="M2.66632 1.83301H13.3333C13.7934 1.83301 14.1661 2.20593 14.1663 2.66602V13.333C14.1663 13.7932 13.7936 14.166 13.3333 14.166H2.66632C2.20623 14.1658 1.83331 13.7931 1.83331 13.333V2.66602C1.83348 2.2347 2.16127 1.8796 2.58136 1.83691L2.66632 1.83301Z"
          stroke="var(--alert-caution-outline-color)"
        />
        <path
          d="M7.33331 9.33333V4H8.66665V9.33333H7.33331Z"
          fill="var(--on-caution-active-color)"
        />
        <path
          d="M8.66665 10.6667H7.33331V12H8.66665V10.6667Z"
          fill="var(--on-caution-active-color)"
        />
      </svg>`;
    } else if (this.type === ObcAutomationBadgeType.Caution) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 0.5H14C14.8284 0.5 15.5 1.17157 15.5 2V14C15.5 14.8284 14.8284 15.5 14 15.5H2C1.17157 15.5 0.5 14.8284 0.5 14V2C0.5 1.17157 1.17157 0.5 2 0.5Z"
          fill="var(--alert-caution-color)"
        />
        <path
          d="M2 0.5H14C14.8284 0.5 15.5 1.17157 15.5 2V14C15.5 14.8284 14.8284 15.5 14 15.5H2C1.17157 15.5 0.5 14.8284 0.5 14V2C0.5 1.17157 1.17157 0.5 2 0.5Z"
          stroke="var(--alert-caution-outline-color)"
        />
        <path
          d="M3.5 4.3C3.5 4.01997 3.5 3.87996 3.5545 3.773C3.60243 3.67892 3.67892 3.60243 3.773 3.5545C3.87996 3.5 4.01997 3.5 4.3 3.5H11.7C11.98 3.5 12.12 3.5 12.227 3.5545C12.3211 3.60243 12.3976 3.67892 12.4455 3.773C12.5 3.87996 12.5 4.01997 12.5 4.3V11.7C12.5 11.98 12.5 12.12 12.4455 12.227C12.3976 12.3211 12.3211 12.3976 12.227 12.4455C12.12 12.5 11.98 12.5 11.7 12.5H4.3C4.01997 12.5 3.87996 12.5 3.773 12.4455C3.67892 12.3976 3.60243 12.3211 3.5545 12.227C3.5 12.12 3.5 11.98 3.5 11.7V4.3Z"
          fill="var(--on-caution-active-color)"
        />
      </svg> `;
    } else if (
      this.type === ObcAutomationBadgeType.Warning &&
      this.mode === ObcAutomationBadgeMode.Flat
    ) {
      return html`
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="path-2-outside-1_37206_122675"
            maskUnits="userSpaceOnUse"
            x="0.333008"
            y="0.333008"
            width="16"
            height="16"
            fill="black"
          >
            <rect
              fill="white"
              x="0.333008"
              y="0.333008"
              width="16"
              height="16"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 1.33301C11.6819 1.33301 14.667 4.3181 14.667 8C14.667 11.6819 11.6819 14.667 8 14.667C4.3181 14.667 1.33301 11.6819 1.33301 8C1.33301 4.3181 4.3181 1.33301 8 1.33301Z"
            />
          </mask>
          <path
            d="M8 1.33301V0.333008V0.333008V1.33301ZM14.667 8H15.667V8H14.667ZM8 14.667V15.667V15.667V14.667ZM1.33301 8H0.333008V8H1.33301ZM8 1.33301V2.33301C11.1296 2.33301 13.667 4.87039 13.667 8H14.667H15.667C15.667 3.76582 12.2342 0.333008 8 0.333008V1.33301ZM14.667 8H13.667C13.667 11.1296 11.1296 13.667 8 13.667V14.667V15.667C12.2342 15.667 15.667 12.2342 15.667 8H14.667ZM8 14.667V13.667C4.87039 13.667 2.33301 11.1296 2.33301 8H1.33301H0.333008C0.333008 12.2342 3.76582 15.667 8 15.667V14.667ZM1.33301 8H2.33301C2.33301 4.87039 4.87039 2.33301 8 2.33301V1.33301V0.333008C3.76582 0.333008 0.333008 3.76582 0.333008 8H1.33301Z"
            fill="var(--border-silhouette-color)"
            mask="url(#path-2-outside-1_37206_122675)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.6666 7.99967C14.6666 11.6816 11.6819 14.6663 7.99998 14.6663C4.31808 14.6663 1.33331 11.6816 1.33331 7.99967C1.33331 4.31778 4.31808 1.33301 7.99998 1.33301C11.6819 1.33301 14.6666 4.31778 14.6666 7.99967Z"
            fill="var(--alert-warning-color)"
          />
          <path
            d="M8.00031 1.83301C11.4059 1.83318 14.1663 4.59435 14.1663 8C14.1661 11.4055 11.4058 14.1658 8.00031 14.166C4.59466 14.166 1.83349 11.4056 1.83331 8C1.83331 4.59424 4.59455 1.83301 8.00031 1.83301Z"
            stroke="var(--alert-warning-outline-color)"
          />
          <path
            d="M8.66665 8.66699V4.66699H7.33331V8.66699H8.66665Z"
            fill="var(--on-warning-active-color)"
          />
          <path
            d="M8.66665 11.3337V10.0003H7.33331V11.3337H8.66665Z"
            fill="var(--on-warning-active-color)"
          />
        </svg>
      `;
    } else if (this.type === ObcAutomationBadgeType.Warning) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 0.5H14C14.8284 0.5 15.5 1.17157 15.5 2V14C15.5 14.8284 14.8284 15.5 14 15.5H2C1.17157 15.5 0.5 14.8284 0.5 14V2C0.5 1.17157 1.17157 0.5 2 0.5Z"
          fill="var(--alert-warning-color)"
        />
        <path
          d="M2 0.5H14C14.8284 0.5 15.5 1.17157 15.5 2V14C15.5 14.8284 14.8284 15.5 14 15.5H2C1.17157 15.5 0.5 14.8284 0.5 14V2C0.5 1.17157 1.17157 0.5 2 0.5Z"
          stroke="var(--alert-warning-outline-color)"
        />
        <circle cx="8" cy="8" r="5" fill="var(--on-warning-active-color)" />
      </svg> `;
    } else if (
      this.type === ObcAutomationBadgeType.Alarm &&
      this.mode === ObcAutomationBadgeMode.Flat
    ) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0.5 0.5 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="path-2-outside-1_37206_122701"
          maskUnits="userSpaceOnUse"
          x="-0.998657"
          y="0"
          width="18"
          height="17"
          fill="black"
        >
          <rect fill="white" x="-0.998657" width="18" height="17" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.74502 1.35587C7.99509 0.881431 8.67474 0.881322 8.9247 1.35587L15.5897 14.0229C15.8233 14.4669 15.5015 15.0004 14.9999 15.0004H1.66884C1.16718 15.0004 0.845307 14.4669 1.079 14.0229L7.74502 1.35587Z"
          />
        </mask>
        <path
          d="M7.74502 1.35587L6.86038 0.889586L6.86007 0.89017L7.74502 1.35587ZM8.9247 1.35587L9.80967 0.890223L9.80947 0.889831L8.9247 1.35587ZM15.5897 14.0229L16.4748 13.5573L16.4747 13.5572L15.5897 14.0229ZM1.079 14.0229L1.96393 14.4886L1.96394 14.4886L1.079 14.0229ZM7.74502 1.35587L8.62965 1.82216C8.50484 2.05895 8.16519 2.0597 8.03994 1.82191L8.9247 1.35587L9.80947 0.889831C9.18429 -0.297052 7.48534 -0.296087 6.86038 0.889586L7.74502 1.35587ZM8.9247 1.35587L8.03973 1.82152L14.7048 14.4885L15.5897 14.0229L16.4747 13.5572L9.80967 0.890223L8.9247 1.35587ZM15.5897 14.0229L14.7047 14.4884C14.5885 14.2675 14.7481 14.0004 14.9999 14.0004V15.0004V16.0004C16.255 16.0004 17.0582 14.6663 16.4748 13.5573L15.5897 14.0229ZM14.9999 15.0004V14.0004H1.66884V15.0004V16.0004H14.9999V15.0004ZM1.66884 15.0004V14.0004C1.92039 14.0004 2.08037 14.2673 1.96393 14.4886L1.079 14.0229L0.194074 13.5571C-0.389754 14.6665 0.413976 16.0004 1.66884 16.0004V15.0004ZM1.079 14.0229L1.96394 14.4886L8.62996 1.82157L7.74502 1.35587L6.86007 0.89017L0.194059 13.5572L1.079 14.0229Z"
          fill="var(--border-silhouette-color)"
          mask="url(#path-2-outside-1_37206_122701)"
        />
        <path
          d="M1.07857 14.0235L7.74479 1.35716C7.99473 0.882236 8.6746 0.882252 8.92453 1.35719L15.5899 14.0236C15.8236 14.4676 15.5017 15.001 15.0001 15.001L1.66843 15.001C1.16677 15.001 0.844878 14.4676 1.07857 14.0235Z"
          fill="var(--alert-alarm-color)"
        />
        <path
          d="M8.18744 1.58984C8.25002 1.47134 8.41991 1.4712 8.48236 1.58984L15.1474 14.2568C15.2057 14.3681 15.125 14.501 14.9999 14.501H1.66888C1.54379 14.501 1.46302 14.3681 1.52142 14.2568L8.18744 1.58984Z"
          stroke="var(--alert-alarm-outline-color)"
        />
        <path
          d="M7.66754 10.3343V5.00098H9.00087V10.3343H7.66754Z"
          fill="var(--on-alarm-active-color)"
        />
        <path
          d="M9.00087 11.6676H7.66754V13.001H9.00087V11.6676Z"
          fill="var(--on-alarm-active-color)"
        />
      </svg> `;
    } else if (this.type === ObcAutomationBadgeType.Alarm) {
      return html`
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 0.5H14C14.8284 0.5 15.5 1.17157 15.5 2V14C15.5 14.8284 14.8284 15.5 14 15.5H2C1.17157 15.5 0.5 14.8284 0.5 14V2C0.5 1.17157 1.17157 0.5 2 0.5Z"
            fill="var(--alert-alarm-color)"
          />
          <path
            d="M2 0.5H14C14.8284 0.5 15.5 1.17157 15.5 2V14C15.5 14.8284 14.8284 15.5 14 15.5H2C1.17157 15.5 0.5 14.8284 0.5 14V2C0.5 1.17157 1.17157 0.5 2 0.5Z"
            stroke="var(--alert-alarm-outline-color)"
          />
          <path
            d="M7.29883 3.72622L3.05891 11.3269C2.84063 11.7182 2.73149 11.9139 2.75 12.0741C2.76615 12.2138 2.84042 12.3403 2.9546 12.4225C3.08546 12.5167 3.30949 12.5167 3.75756 12.5167H12.2348C12.6828 12.5167 12.9068 12.5167 13.0376 12.4225C13.1518 12.3403 13.2261 12.2139 13.2422 12.0741C13.2608 11.914 13.1517 11.7184 12.9336 11.3271L8.69623 3.7264C8.46805 3.31712 8.35396 3.11247 8.2037 3.04447C8.07271 2.98519 7.92254 2.98517 7.79153 3.04442C7.64125 3.11238 7.52711 3.317 7.29883 3.72622Z"
            fill="var(--on-alarm-active-color)"
          />
        </svg>
      `;
    } else {
      return html`<slot name="icon-silhouette"></slot><slot></slot>`;
    }
  }

  override render() {
    return html`
      <div class=${classMap({wrapper: true, [this.effectiveMode]: true})}>
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
