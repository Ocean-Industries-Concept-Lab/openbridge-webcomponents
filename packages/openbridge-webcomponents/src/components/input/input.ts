import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./input.css?inline";
import '../icon/icon';

@customElement('obc-input')
export class Input extends LitElement {
    @property({ type: String }) value: string = "";
    @property({ type: String }) placeholder: string = "";
    @property({ type: String }) type: string = "text";
    @property({ type: String }) icon: String = "";

    onInput(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
    }

    onChange(e: Event) {
        this.value = (e.target as HTMLInputElement).value;
    }

    render() {
        const hasIcon = this.icon !== "";
        return html`
        <label class="wrapper">
            <input type=${this.type} class="input" value=${this.value} placeholder=${this.placeholder} @input=${this.onInput} @change=${this.onChange}/>
            ${hasIcon ? html`<div class="icon"><obc-icon icon=${this.icon} size="24"></obc-icon></div>` : ""}
        </label>
    `
    }

    static styles = unsafeCSS(compentStyle);
}

declare global {
    interface HTMLElementTagNameMap {
        'obc-input': Input
    }
}
