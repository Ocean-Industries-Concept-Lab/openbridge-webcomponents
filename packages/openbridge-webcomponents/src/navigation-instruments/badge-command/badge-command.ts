import {HTMLTemplateResult, LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export enum CommandStatus {
  InCommand = 'in-command',
  NoCommand = 'no-command',
  PartialCommand = 'partial-command',
  SharedCommand = 'shared-command',
  CommandAvailable = 'command-available',
  Blocked = 'blocked',
}

@customElement('obc-badge-command')
export class ObcBadgeCommand extends LitElement {
  @property({type: String}) status: CommandStatus = CommandStatus.NoCommand;
  @property({type: Boolean}) large: boolean = false;

  get iconLarge(): HTMLTemplateResult {
    if (this.status === CommandStatus.InCommand) {
      return html`<svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="24"
          height="24"
          rx="2"
          fill="var(--instrument-enhanced-primary-color)"
        />
        <path
          d="M11.9997 14.5C13.3804 14.5 14.4997 13.3807 14.4997 12C14.4997 10.6193 13.3804 9.5 11.9997 9.5C10.619 9.5 9.49967 10.6193 9.49967 12C9.49967 13.3807 10.619 14.5 11.9997 14.5Z"
          fill="var(--on-selected-active-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.52165 4.40645C8.31274 4.00338 7.80966 3.85626 7.4165 4.08325C7.02333 4.31024 6.8992 4.81949 7.14381 5.20194L8.51393 7.34412C7.26015 8.27992 6.39526 9.70793 6.20556 11.3419L3.66548 11.2264C3.21196 11.2058 2.83301 11.5679 2.83301 12.0219C2.83301 12.4759 3.21196 12.838 3.66548 12.8174L6.20556 12.7019C6.39526 14.3358 7.26012 15.7638 8.51387 16.6996L7.14381 18.8417C6.8992 19.2241 7.02333 19.7334 7.41649 19.9604C7.80966 20.1874 8.31274 20.0403 8.52165 19.6372L9.69121 17.3806C10.3992 17.686 11.1797 17.8552 11.9997 17.8552C12.8198 17.8552 13.6004 17.686 14.3084 17.3805L15.478 19.6372C15.6869 20.0403 16.19 20.1874 16.5832 19.9604C16.9763 19.7334 17.1005 19.2241 16.8558 18.8417L15.4857 16.6995C16.7393 15.7637 17.6041 14.3357 17.7938 12.7019L20.3339 12.8174C20.7874 12.838 21.1663 12.4759 21.1663 12.0219C21.1663 11.5679 20.7874 11.2058 20.3339 11.2264L17.7938 11.3419C17.6041 9.70802 16.7393 8.28008 15.4856 7.34428L16.8558 5.20194C17.1005 4.81949 16.9763 4.31024 16.5832 4.08325C16.19 3.85626 15.6869 4.00338 15.478 4.40645L14.3083 6.66323C13.6003 6.35779 12.8198 6.18856 11.9997 6.18856C11.1797 6.18856 10.3992 6.35775 9.69127 6.66312L8.52165 4.40645ZM16.1663 12.0218C16.1663 14.323 14.3009 16.1885 11.9997 16.1885C9.69849 16.1885 7.83301 14.323 7.83301 12.0218C7.83301 9.72066 9.69849 7.85518 11.9997 7.85518C14.3009 7.85518 16.1663 9.72066 16.1663 12.0218Z"
          fill="var(--on-selected-active-color)"
        />
      </svg>`;
    } else if (this.status === CommandStatus.NoCommand) {
      return html`<svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="1.5"
          fill="var(--normal-enabled-background-color)"
        />
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="1.5"
          stroke="var(--normal-enabled-border-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.14015 3.66667L4.49972 4.73994L7.24508 8.5007C6.68984 9.28025 6.32153 10.2022 6.20556 11.201L3.66548 11.0856C3.21196 11.065 2.83301 11.4271 2.83301 11.8811C2.83301 12.3351 3.21196 12.6972 3.66548 12.6766L6.20556 12.5611C6.39526 14.195 7.26012 15.623 8.51387 16.5588L7.14381 18.7009C6.8992 19.0833 7.02333 19.5926 7.41649 19.8196C7.80966 20.0466 8.31274 19.8994 8.52165 19.4964L9.69121 17.2398C10.3992 17.5452 11.1797 17.7144 11.9997 17.7144C12.6173 17.7144 13.2125 17.6184 13.7712 17.4406L16.4045 21.0479L18.0443 19.9745L6.14015 3.66667ZM7.83301 11.881C7.83301 11.1853 8.00354 10.5294 8.30508 9.95277L12.7103 15.9873C12.4794 16.027 12.2419 16.0477 11.9997 16.0477C9.69849 16.0477 7.83301 14.1822 7.83301 11.881Z"
          fill="var(--on-normal-neutral-color)"
        />
        <path
          d="M16.7543 15.2614C17.3095 14.4819 17.6778 13.56 17.7938 12.5611L20.3339 12.6766C20.7874 12.6972 21.1663 12.3351 21.1663 11.8811C21.1663 11.4271 20.7874 11.065 20.3339 11.0856L17.7938 11.201C17.6041 9.56721 16.7393 8.13927 15.4856 7.20347L16.8558 5.06114C17.1005 4.67869 16.9763 4.16944 16.5832 3.94245C16.19 3.71545 15.6869 3.86258 15.478 4.26564L14.3083 6.52242C13.6003 6.21698 12.8198 6.04775 11.9997 6.04775C11.3821 6.04775 10.7869 6.14373 10.2282 6.32158L11.289 7.77473C11.52 7.73505 11.7574 7.71437 11.9997 7.71437C14.3009 7.71437 16.1663 9.57985 16.1663 11.881C16.1663 12.5768 15.9958 13.2327 15.6943 13.8093L16.7543 15.2614Z"
          fill="var(--on-normal-neutral-color)"
        />
      </svg> `;
    } else if (this.status === CommandStatus.PartialCommand) {
      return html`<svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="1.5"
          fill="var(--normal-enabled-background-color)"
        />
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="1.5"
          stroke="var(--normal-enabled-border-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.4165 4.19019C7.80966 3.9632 8.31274 4.11032 8.52165 4.51339L9.69127 6.77006C10.3992 6.46469 11.1797 6.2955 11.9997 6.2955C12.8198 6.2955 13.6003 6.46473 14.3083 6.77017L15.478 4.51339C15.6869 4.11032 16.19 3.9632 16.5832 4.19019C16.9763 4.41719 17.1005 4.92643 16.8558 5.30888L15.4856 7.45122C16.7393 8.38702 17.6041 9.81496 17.7938 11.4488L20.3339 11.3333C20.7874 11.3127 21.1663 11.6748 21.1663 12.1288C21.1663 12.5828 20.7874 12.9449 20.3339 12.9243L17.7938 12.8089C17.6041 14.4427 16.7393 15.8706 15.4857 16.8064L16.8558 18.9486C17.1005 19.3311 16.9763 19.8403 16.5832 20.0673C16.19 20.2943 15.6869 20.1472 15.478 19.7441L14.3084 17.4875C13.6004 17.7929 12.8198 17.9622 11.9997 17.9622C11.1797 17.9622 10.3992 17.793 9.69121 17.4876L8.52165 19.7441C8.31274 20.1472 7.80966 20.2943 7.41649 20.0673C7.02333 19.8403 6.8992 19.3311 7.14381 18.9486L8.51387 16.8066C7.26012 15.8708 6.39526 14.4428 6.20556 12.8089L3.66548 12.9243C3.21196 12.9449 2.83301 12.5828 2.83301 12.1288C2.83301 11.6748 3.21196 11.3127 3.66548 11.3333L6.20556 11.4488C6.39526 9.81487 7.26015 8.38686 8.51393 7.45106L7.14381 5.30888C6.8992 4.92643 7.02333 4.41719 7.4165 4.19019ZM11.9997 16.2955C14.3009 16.2955 16.1663 14.43 16.1663 12.1288C16.1663 9.8276 14.3009 7.96212 11.9997 7.96212C9.69849 7.96212 7.83301 9.8276 7.83301 12.1288C7.83301 14.43 9.69849 16.2955 11.9997 16.2955Z"
          fill="var(--instrument-enhanced-primary-color)"
        />
      </svg> `;
    } else if (this.status === CommandStatus.SharedCommand) {
      return html`<svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="24"
          height="24"
          rx="2"
          fill="var(--instrument-enhanced-primary-color)"
        />
        <path
          d="M5.33301 5.33333C5.33301 4.41667 6.08301 3.66667 6.99967 3.66667C7.91634 3.66667 8.66634 4.41667 8.66634 5.33333C8.66634 6.25 7.91634 7 6.99967 7C6.08301 7 5.33301 6.25 5.33301 5.33333Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M9.31634 8.31667C8.60801 8.00833 7.82467 7.83333 6.99967 7.83333C6.17467 7.83333 5.39134 8.00833 4.68301 8.31667C4.06634 8.58333 3.66634 9.18334 3.66634 9.85834V10.3333H10.333V9.85834C10.333 9.18334 9.93301 8.58333 9.31634 8.31667Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M18.6663 5.33333C18.6663 6.25 17.9163 7 16.9997 7C16.083 7 15.333 6.25 15.333 5.33333C15.333 4.41667 16.083 3.66667 16.9997 3.66667C17.9163 3.66667 18.6663 4.41667 18.6663 5.33333Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M19.3163 8.31667C18.608 8.00833 17.8247 7.83333 16.9997 7.83333C16.1747 7.83333 15.3913 8.00833 14.683 8.31667C14.0663 8.58333 13.6663 9.18334 13.6663 9.85834V10.3333H20.333V9.85834C20.333 9.18334 19.933 8.58333 19.3163 8.31667Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M8.52165 12.4301C8.31274 12.027 7.80966 11.8799 7.4165 12.1069C7.02333 12.3339 6.8992 12.8431 7.14381 13.2255L8.51393 15.3677C7.26015 16.3035 6.39526 17.7315 6.20556 19.3655L3.66548 19.25C3.21196 19.2294 2.83301 19.5915 2.83301 20.0455C2.83301 20.1471 2.852 20.2442 2.88657 20.3333H7.8428C7.83631 20.2382 7.83301 20.1422 7.83301 20.0455C7.83301 17.7443 9.69849 15.8788 11.9997 15.8788C14.3009 15.8788 16.1663 17.7443 16.1663 20.0455C16.1663 20.1422 16.163 20.2382 16.1566 20.3333H21.1128C21.1473 20.2442 21.1663 20.1471 21.1663 20.0455C21.1663 19.5915 20.7874 19.2294 20.3339 19.25L17.7938 19.3655C17.6041 17.7316 16.7393 16.3037 15.4856 15.3679L16.8558 13.2255C17.1005 12.8431 16.9763 12.3339 16.5832 12.1069C16.19 11.8799 15.6869 12.027 15.478 12.4301L14.3083 14.6868C13.6003 14.3814 12.8198 14.2122 11.9997 14.2122C11.1797 14.2122 10.3992 14.3814 9.69127 14.6867L8.52165 12.4301Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M9.49967 19.9167C9.49967 20.0586 9.51151 20.1978 9.53424 20.3333H14.4651C14.4878 20.1978 14.4997 20.0586 14.4997 19.9167C14.4997 18.536 13.3804 17.4167 11.9997 17.4167C10.619 17.4167 9.49967 18.536 9.49967 19.9167Z"
          fill="var(--normal-enabled-background-color)"
        />
      </svg> `;
    } else if (this.status === CommandStatus.CommandAvailable) {
      return html`<svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="1.5"
          fill="var(--normal-enabled-background-color)"
        />
        <rect
          x="0.5"
          y="0.5"
          width="23"
          height="23"
          rx="1.5"
          stroke="var(--normal-enabled-border-color)"
        />
        <path
          d="M13.667 16.1667C14.5875 16.1667 15.3337 15.4205 15.3337 14.5C15.3337 13.5795 14.5875 12.8333 13.667 12.8333C12.7465 12.8333 12.0003 13.5795 12.0003 14.5C12.0003 15.4205 12.7465 16.1667 13.667 16.1667Z"
          fill="var(--on-normal-neutral-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.0003 8.66667V7C12.0003 4.7 10.1337 2.83333 7.83366 2.83333C5.53366 2.83333 3.66699 4.7 3.66699 7H5.33366C5.33366 5.61667 6.45033 4.5 7.83366 4.5C9.21699 4.5 10.3337 5.61667 10.3337 7V8.66667H8.66699C7.74652 8.66667 7.00033 9.41286 7.00033 10.3333V18.6667C7.00033 19.5871 7.74652 20.3333 8.66699 20.3333H18.667C19.5875 20.3333 20.3337 19.5871 20.3337 18.6667V10.3333C20.3337 9.41286 19.5875 8.66667 18.667 8.66667H12.0003ZM18.667 10.3333H8.66699V18.6667H18.667V10.3333Z"
          fill="var(--on-normal-neutral-color)"
        />
      </svg>`;
    } else if (this.status === CommandStatus.Blocked) {
      return html`
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="1.5"
            fill="var(--normal-enabled-background-color)"
          />
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="1.5"
            stroke="var(--normal-enabled-border-color)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.9997 8.66667H16.1663V7C16.1663 4.7 14.2997 2.83333 11.9997 2.83333C9.69967 2.83333 7.83301 4.7 7.83301 7V8.66667H6.99967C6.08301 8.66667 5.33301 9.41667 5.33301 10.3333V18.6667C5.33301 19.5833 6.08301 20.3333 6.99967 20.3333H16.9997C17.9163 20.3333 18.6663 19.5833 18.6663 18.6667V10.3333C18.6663 9.41667 17.9163 8.66667 16.9997 8.66667ZM9.49967 7C9.49967 5.61667 10.6163 4.5 11.9997 4.5C13.383 4.5 14.4997 5.61667 14.4997 7V8.66667H9.49967V7ZM13.6663 14.5C13.6663 15.4167 12.9163 16.1667 11.9997 16.1667C11.083 16.1667 10.333 15.4167 10.333 14.5C10.333 13.5833 11.083 12.8333 11.9997 12.8333C12.9163 12.8333 13.6663 13.5833 13.6663 14.5Z"
            fill="var(--on-normal-neutral-color)"
          />
        </svg>
      `;
    }
    throw new Error('Invalid status');
  }

  get iconSmall(): HTMLTemplateResult {
    if (this.status === CommandStatus.InCommand) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="16"
          height="16"
          rx="2"
          fill="var(--instrument-enhanced-primary-color)"
        />
        <path
          d="M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17158 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17158 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.91319 3.44387C5.78784 3.20203 5.48599 3.11376 5.25009 3.24995C5.01419 3.38615 4.93972 3.6917 5.08648 3.92117L5.90855 5.20648C5.15629 5.76796 4.63735 6.62476 4.52353 7.60512L2.99948 7.53584C2.72737 7.52347 2.5 7.74075 2.5 8.01314C2.5 8.28553 2.72737 8.5028 2.99948 8.49043L4.52353 8.42116C4.63735 9.4015 5.15627 10.2583 5.90852 10.8198L5.08648 12.105C4.93972 12.3345 5.01419 12.64 5.25009 12.7762C5.48599 12.9124 5.78784 12.8242 5.91318 12.5823L6.61492 11.2284C7.0397 11.4116 7.50799 11.5131 8 11.5131C8.49206 11.5131 8.96041 11.4116 9.38523 11.2283L10.087 12.5823C10.2123 12.8242 10.5142 12.9124 10.7501 12.7762C10.986 12.64 11.0605 12.3345 10.9137 12.105L10.0916 10.8197C10.8438 10.2582 11.3627 9.40144 11.4765 8.42116L13.0005 8.49043C13.2726 8.5028 13.5 8.28553 13.5 8.01314C13.5 7.74075 13.2726 7.52347 13.0005 7.53584L11.4765 7.60512C11.3627 6.62482 10.8438 5.76805 10.0916 5.20657L10.9137 3.92117C11.0605 3.6917 10.986 3.38615 10.7501 3.24995C10.5142 3.11376 10.2123 3.20203 10.087 3.44387L9.38519 4.79794C8.96038 4.61468 8.49205 4.51314 8 4.51314C7.50801 4.51314 7.03973 4.61465 6.61496 4.79787L5.91319 3.44387ZM10.5 8.01311C10.5 9.39382 9.38071 10.5131 8 10.5131C6.61929 10.5131 5.5 9.39382 5.5 8.01311C5.5 6.6324 6.61929 5.51311 8 5.51311C9.38071 5.51311 10.5 6.6324 10.5 8.01311Z"
          fill="var(--normal-enabled-background-color)"
        />
      </svg> `;
    } else if (this.status === CommandStatus.NoCommand) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="1.5"
          fill="var(--normal-enabled-background-color)"
        />
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="1.5"
          stroke="var(--normal-enabled-border-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.48429 3L3.50003 3.64396L5.14724 5.90042C4.8141 6.36815 4.59311 6.9213 4.52353 7.52063L2.99948 7.45135C2.72737 7.43898 2.5 7.65626 2.5 7.92865C2.5 8.20104 2.72737 8.41831 2.99948 8.40594L4.52353 8.33667C4.63735 9.31701 5.15627 10.1738 5.90852 10.7353L5.08648 12.0205C4.93972 12.25 5.01419 12.5555 5.25009 12.6917C5.48599 12.8279 5.78784 12.7397 5.91318 12.4978L6.61492 11.1439C7.0397 11.3271 7.50799 11.4286 8 11.4286C8.37057 11.4286 8.72769 11.3711 9.0629 11.2643L10.6429 13.4287L11.6268 12.7847L4.48429 3ZM5.5 7.92862C5.5 7.51117 5.60232 7.11761 5.78325 6.77166L8.42639 10.3924C8.28782 10.4162 8.14536 10.4286 8 10.4286C6.61929 10.4286 5.5 9.30933 5.5 7.92862Z"
          fill="var(--on-normal-neutral-color)"
        />
        <path
          d="M10.8528 9.95685C11.1859 9.48912 11.4069 8.93598 11.4765 8.33667L13.0005 8.40594C13.2726 8.41831 13.5 8.20104 13.5 7.92865C13.5 7.65626 13.2726 7.43898 13.0005 7.45135L11.4765 7.52063C11.3627 6.54033 10.8438 5.68356 10.0916 5.12208L10.9137 3.83668C11.0605 3.60721 10.986 3.30166 10.7501 3.16546C10.5142 3.02927 10.2123 3.11754 10.087 3.35938L9.38519 4.71345C8.96038 4.53019 8.49205 4.42865 8 4.42865C7.62944 4.42865 7.27233 4.48623 6.93714 4.59295L7.57361 5.46484C7.71218 5.44103 7.85464 5.42862 8 5.42862C9.38071 5.42862 10.5 6.54791 10.5 7.92862C10.5 8.34607 10.3977 8.73963 10.2168 9.08558L10.8528 9.95685Z"
          fill="var(--on-normal-neutral-color)"
        />
      </svg> `;
    } else if (this.status === CommandStatus.PartialCommand) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="1.5"
          fill="var(--normal-enabled-background-color)"
        />
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="1.5"
          stroke="var(--normal-enabled-border-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.25009 3.31411C5.48599 3.17792 5.78784 3.26619 5.91319 3.50803L6.61496 4.86203C7.03973 4.67881 7.50801 4.5773 8 4.5773C8.49205 4.5773 8.96038 4.67884 9.38519 4.8621L10.087 3.50803C10.2123 3.26619 10.5142 3.17792 10.7501 3.31411C10.986 3.45031 11.0605 3.75586 10.9137 3.98533L10.0916 5.27073C10.8438 5.83221 11.3627 6.68898 11.4765 7.66928L13.0005 7.6C13.2726 7.58763 13.5 7.80491 13.5 8.0773C13.5 8.34969 13.2726 8.56696 13.0005 8.55459L11.4765 8.48532C11.3627 9.4656 10.8438 10.3224 10.0916 10.8838L10.9137 12.1692C11.0605 12.3987 10.986 12.7042 10.7501 12.8404C10.5142 12.9766 10.2123 12.8883 10.087 12.6465L9.38523 11.2925C8.96041 11.4758 8.49206 11.5773 8 11.5773C7.50799 11.5773 7.0397 11.4758 6.61492 11.2925L5.91318 12.6465C5.78784 12.8883 5.48599 12.9766 5.25009 12.8404C5.01419 12.7042 4.93972 12.3986 5.08648 12.1692L5.90852 10.8839C5.15627 10.3225 4.63735 9.46566 4.52353 8.48532L2.99948 8.55459C2.72737 8.56696 2.5 8.34969 2.5 8.0773C2.5 7.80491 2.72737 7.58763 2.99948 7.6L4.52353 7.66928C4.63735 6.68892 5.15629 5.83212 5.90855 5.27064L5.08648 3.98533C4.93972 3.75586 5.01419 3.45031 5.25009 3.31411ZM8 10.5773C9.38071 10.5773 10.5 9.45798 10.5 8.07727C10.5 6.69656 9.38071 5.57727 8 5.57727C6.61929 5.57727 5.5 6.69656 5.5 8.07727C5.5 9.45798 6.61929 10.5773 8 10.5773Z"
          fill="var(--instrument-enhanced-primary-color)"
        />
      </svg> `;
    } else if (this.status === CommandStatus.SharedCommand) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="16"
          height="16"
          rx="2"
          fill="var(--instrument-enhanced-primary-color)"
        />
        <path
          d="M4 4C4 3.45 4.45 3 5 3C5.55 3 6 3.45 6 4C6 4.55 5.55 5 5 5C4.45 5 4 4.55 4 4Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M6.39 5.79C5.965 5.605 5.495 5.5 5 5.5C4.505 5.5 4.035 5.605 3.61 5.79C3.24 5.95 3 6.31 3 6.715V7H7V6.715C7 6.31 6.76 5.95 6.39 5.79Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M12 4C12 4.55 11.55 5 11 5C10.45 5 10 4.55 10 4C10 3.45 10.45 3 11 3C11.55 3 12 3.45 12 4Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M12.39 5.79C11.965 5.605 11.495 5.5 11 5.5C10.505 5.5 10.035 5.605 9.61 5.79C9.24 5.95 9 6.31 9 6.715V7H13V6.715C13 6.31 12.76 5.95 12.39 5.79Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M5.91319 8.25803C5.78784 8.01619 5.48599 7.92792 5.25009 8.06411C5.01419 8.20031 4.93972 8.50586 5.08648 8.73533L5.90855 10.0206C5.15629 10.5821 4.63735 11.4389 4.52353 12.4193L2.99948 12.35C2.72737 12.3376 2.5 12.5549 2.5 12.8273C2.5 12.8883 2.5114 12.9465 2.53214 13H5.50587C5.50198 12.9429 5.5 12.8853 5.5 12.8273C5.5 11.4466 6.61929 10.3273 8 10.3273C9.38071 10.3273 10.5 11.4466 10.5 12.8273C10.5 12.8853 10.498 12.9429 10.4941 13H13.4679C13.4886 12.9465 13.5 12.8883 13.5 12.8273C13.5 12.5549 13.2726 12.3376 13.0005 12.35L11.4765 12.4193C11.3627 11.439 10.8438 10.5822 10.0916 10.0207L10.9137 8.73533C11.0605 8.50586 10.986 8.20031 10.7501 8.06411C10.5142 7.92792 10.2123 8.01619 10.087 8.25803L9.38519 9.6121C8.96038 9.42883 8.49205 9.3273 8 9.3273C7.50801 9.3273 7.03973 9.42881 6.61496 9.61203L5.91319 8.25803Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M6.5 12.75C6.5 12.8352 6.5071 12.9187 6.52074 13H9.47926C9.4929 12.9187 9.5 12.8352 9.5 12.75C9.5 11.9216 8.82843 11.25 8 11.25C7.17157 11.25 6.5 11.9216 6.5 12.75Z"
          fill="var(--normal-enabled-background-color)"
        />
      </svg> `;
    } else if (this.status === CommandStatus.CommandAvailable) {
      return html`<svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="1.5"
          fill="var(--normal-enabled-background-color)"
        />
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="1.5"
          stroke="var(--normal-enabled-border-color)"
        />
        <path
          d="M9 10.5C9.55228 10.5 10 10.0523 10 9.5C10 8.94772 9.55228 8.5 9 8.5C8.44772 8.5 8 8.94772 8 9.5C8 10.0523 8.44772 10.5 9 10.5Z"
          fill="var(--on-normal-neutral-color)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 6V5C8 3.62 6.88 2.5 5.5 2.5C4.12 2.5 3 3.62 3 5H4C4 4.17 4.67 3.5 5.5 3.5C6.33 3.5 7 4.17 7 5V6H6C5.44772 6 5 6.44772 5 7V12C5 12.5523 5.44772 13 6 13H12C12.5523 13 13 12.5523 13 12V7C13 6.44772 12.5523 6 12 6H8ZM12 7H6V12H12V7Z"
          fill="var(--on-normal-neutral-color)"
        />
      </svg> `;
    } else if (this.status === CommandStatus.Blocked) {
      return html`
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="1.5"
            fill="var(--normal-enabled-background-color)"
          />
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="1.5"
            stroke="var(--normal-enabled-border-color)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 6H10.5V5C10.5 3.62 9.38 2.5 8 2.5C6.62 2.5 5.5 3.62 5.5 5V6H5C4.45 6 4 6.45 4 7V12C4 12.55 4.45 13 5 13H11C11.55 13 12 12.55 12 12V7C12 6.45 11.55 6 11 6ZM6.5 5C6.5 4.17 7.17 3.5 8 3.5C8.83 3.5 9.5 4.17 9.5 5V6H6.5V5ZM9 9.5C9 10.05 8.55 10.5 8 10.5C7.45 10.5 7 10.05 7 9.5C7 8.95 7.45 8.5 8 8.5C8.55 8.5 9 8.95 9 9.5Z"
            fill="var(--on-normal-neutral-color)"
          />
        </svg>
      `;
    }

    throw new Error('Invalid status');
  }

  override render() {
    const icon = this.large ? this.iconLarge : this.iconSmall;

    return html`
      <div class=${classMap({wrapper: true, large: this.large})}>${icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 0;
      height: 16px;
      width: 16px;
    }

    .wrapper.large {
      height: 24px;
      width: 24px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-badge-command': ObcBadgeCommand;
  }
}
