import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js';
import "../Button/IconButton"

@customElement('ob-toggle-switch')
export class ToggleSwitch extends LitElement {

    @property({ type: String }) label = 'Label'
    @property({ type: Boolean }) checked = false

    render() {
        return html`
      <label>
        <span>${this.label}</span>
        <div class="switch">
            <div class="presenter ${classMap({ checked: this.checked })}">
                <div class="knob"></div>
                <input type="checkbox" ?checked=${this.checked} @click=${this._tryChange}/>
            </div>
        </div>
        
      </label>
    `
    }

    _tryChange() {
        this.checked = !this.checked
    }

    static styles = css`
    label {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        height: 48px;

        color: var(--element-active-color, #1A1A1A);

        /* UI/Body */
        font-family: Noto Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 370;
        line-height: 24px; /* 150% */
        
    }

    input {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 1;
        margin: 0;
        opacity: 0;
    }

    .presenter {
        box-sizing: border-box;
        width: 48px;
        height: 24px;

        background: var(--indent-enabled-background-color, rgba(0, 0, 0, 0.05));
        border: solid 1px var(--element-inactive-color, rgba(0, 0, 0, 0.42));;
        border-radius: 12px;

        display: flex;
        position: relative;
        align-items: center;

        padding: 6px;

        &:hover {
            background: var(--indent-hover-background-color, rgba(0, 0, 0, 0.10));
        }

        &:active {
            background: var(--indent-pressed-background-color, rgba(0, 0, 0, 0.16));
        }

        &:focus-within {
            border-width: 0;
            outline-color:  var(--indent-focused-border-color, rgba(0, 110, 225, 0.30));
            outline-width: 4px;
            outline-style: solid;
        }

        &.checked {
            justify-content: flex-end;

            background: var(--selected-enabled-background-color, #325B9A);
            border-color: var(--selected-enabled-border-color, rgba(0, 0, 0, 0.00));

            &:hover {
                background: var(--selected-hover-background-color, #264573);
                border-color: var(--selected-hover-border-color, rgba(0, 0, 0, 0.00));
            }

            &:active {
                background: var(--selected-pressed-background-color, #1C3254);
                border-color: var(--selected-pressed-border-color, rgba(0, 0, 0, 0.00));
            }
        }
    }

    

    .knob {
        width: 12px;
        height: 12px;
        border-radius: 50%;

        background: var(--element-neutral-color, rgba(0, 0, 0, 0.59));

        .checked & {
            background: var(--on-selected-active-color, #FFF);
        }
    }

  `
}

declare global {
    interface HTMLElementTagNameMap {
        'ob-toggle-switch': ToggleSwitch;
    }
}
