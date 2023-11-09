import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconsUrl } from "../icons"

@customElement('ob-icon')
export class Icon extends LitElement {
    @property({ type: String }) icon = '01-placeholder'
    @property({ type: Number }) size = 24;


    render() {
        const iconSvg = iconsUrl[this.icon];
        return html`
        <div class="wrapper" style="--size:${this.size}px">
            ${iconSvg}
        </div>
    `
    }

    static styles = css`
     .wrapper {
        height: var(--size);
        width: var(--size);

        & > * {
            height: 100%;
            width: 100%;
        }
     }`
        ;
}

declare global {
    interface HTMLElementTagNameMap {
        'ob-icon': Icon
    }
}
