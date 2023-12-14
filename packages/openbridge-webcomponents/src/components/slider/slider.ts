import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import "../icon-button/icon-button"
import "../icon/icon"

@customElement('ob-slider')
export class Slider extends LitElement {
    @property({ type: Number }) value = 50;
    @property({ type: Number }) min = 0;
    @property({ type: Number }) max = 100;
    @property({ type: Number }) step = 1;

    @property({ type: String }) iconLeft = '01-placeholder'
    @property({ type: String }) iconRight = '01-placeholder'

    render() {
        return html`
        <ob-icon icon=${this.iconLeft}> </ob-icon>
        <input type="range" min="${this.min}" max="${this.max}" step=${this.step} value="${this.value}" class="slider">
        <ob-icon icon=${this.iconRight}> </ob-icon>  

    `
    }




    static styles = css`
    :host {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        height: 48px;

        color: var(--element-neutral-color, #1A1A1A);
    }

    .slider {
        flex: 1;

      -webkit-appearance: none;  
      appearance: none;
      box-sizing: border-box;
      margin: 0;
    }

    .slider::-webkit-slider-container {
        width: 100%; 
        box-sizing: border-box;
        height: 4px; 
        border-radius: 6px;
        border: 0 solid var(--indent-enabled-border-color, rgba(0, 0, 0, 0.05));
        background: var(--selected-enabled-background-color, #325B9A);
    }
    
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      display: flex;
        width: 24px;
        height: 24px;
        border-radius: 100%;
        background: var(--instrument-enhanced-secondary-color, #325B9A);
        cursor: pointer;
    }
  `
}

declare global {
    interface HTMLElementTagNameMap {
        'ob-slider': Slider;
    }
}
