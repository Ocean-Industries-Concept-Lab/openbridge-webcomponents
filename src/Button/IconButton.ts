import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconsUrl } from '../icons'

@customElement('ob-icon-button')
export class IconButton extends LitElement {
  @property({ type: String }) icon = 'placeholder'

  render() {
    const icon = iconsUrl[this.icon];
    if (icon == null) {
      throw new Error(`Icon ${this.icon} not found`)
    }

    return html`
      <button class="wrapper">
        <div class="icon">${icon}</div>
      </button>
    `
  }

  static styles = css`
    :host {
      
    }
    
    .wrapper {
      height: 32px;
      width: 32px;
      padding: 0;
      display: flex;
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

  `
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-icon-button': IconButton
  }
}
