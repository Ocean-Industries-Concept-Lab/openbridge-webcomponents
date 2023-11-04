import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('ob-toggle-button-group')
export class ToggleButtonGroup extends LitElement {

  @property({ type: Boolean, attribute: 'has-labels' }) hasLabels = false

  render() {
    return html`
     <div class="wrapper ${this.hasLabels ? 'has-labels' : ''}">
        <slot></slot>
      </div>
    `
  }

  static styles = css`

    :host {
      box-sizing: border-box;
      display: block;
      padding: 8px 0;
      height: 48px;
    }

    :host([has-labels]) {
      padding-top: 4px;
      height: 64px;
    }

    .wrapper {
      box-sizing: border-box;
      display: flex;
      position: relative;
      height: 32px;
      border-radius: 6px;
      border: 1px solid var(--indent-enabled-border-color, rgba(0, 0, 0, 0.05));
      background: var(--indent-enabled-background-color, rgba(0, 0, 0, 0.05));
      gap: 1px;
    }

    ::slotted(*:not(:first-child))::before {
      box-sizing: border-box;
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      margin-left: -2px;
      display: block;
      height: 16px;
      width: 1px;
      border-radius: 1px;
      background: var(--border-divider-color, rgba(0, 0, 0, 0.08));
    }
    
    `
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-toggle-button-group': ToggleButtonGroup
  }
}
