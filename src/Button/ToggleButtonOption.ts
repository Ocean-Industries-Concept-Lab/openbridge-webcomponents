import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconsUrl } from '../icons'

@customElement('ob-toggle-button-option')
export class ToggleButtonOption extends LitElement {
  @property({ type: String }) icon = 'placeholder'
  @property({ type: String }) value = 'value'
  @property({ type: Boolean }) selected = false

  render() {
    const icon = iconsUrl[this.icon];
    if (icon == null) {
      throw new Error(`Icon ${this.icon} not found`)
    }

    return html`
      <button class="wrapper" ?selected=${this.selected}>
        <div class="icon">${icon}</div>
        <div class="label"><slot></slot></div>
      </button>
    `
  }

  static styles = css`
    :host {
      flex: 1;
    }


      
    
    .wrapper {
      height: 32px;
      width: 100%;
      padding: 0;
      display: flex;
      position: relative;
      margin: -1px;
      align-items: center;
      justify-content: center;
      background: transparent;
      border-radius: 6px;
      border: 1px solid var(--flat-enabled-border-color, rgba(0, 0, 0, 0.00));
      background: var(--flat-enabled-background-color, rgba(0, 0, 0, 0.00));
      color: hsla(0, 0%, 0%, 0.55);

      &:hover {
        border-color: rgba(0, 0, 0, 0.0);
        background-color: rgba(0, 0, 0, 0.06);
      }

      &:active {
        border-color: var(--flat-pressed-border-color, rgba(0, 0, 0, 0.00));
        background-color: var(--flat-pressed-background-color, rgba(0, 0, 0, 0.12));
      }

      &:focus {
        outline-color: hsla(211, 100%, 44%, 0.3);
        outline-width: 4px;
        outline-style: solid;
      }
    }

    .icon {
      width: 24px;
      height: 24px;
      color: var(--on-flat-neutral-color, hsla(0, 0%, 0%, 0.55));      
    }

    .label {
      position: absolute;
      top: 36px;
      left: 0;
      right: 0;

      color: var(--element-active-color, #1A1A1A);
      text-align: center;

      /* UI/Label */
      font-family: Noto Sans;
      font-size: 12px;
      font-style: normal;
      font-weight: 370;
      line-height: 16px; /* 133.333% */
    }

    :host([selected]) .wrapper {
        border: 1px solid var(--flat-enabled-border-color, rgba(0, 0, 0, 0.00));
        background: var(--selected-enabled-background-color, #325B9A);
        
        & .icon {
          color: hsla(0, 0%, 100%, 1);
        }
      }

      :host([selected]) .label {
        /* UI/Label-active */
font-family: Noto Sans;
font-size: 12px;
font-style: normal;
font-weight: 650;
line-height: 16px; /* 133.333% */
      }
  

  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-toggle-button-option': ToggleButtonOption
  }
}
