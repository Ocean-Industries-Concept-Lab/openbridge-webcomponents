import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./tooltip.css?inline";
import "../icon-button/icon-button";
import { classMap } from 'lit/directives/class-map.js';

export enum TooltipVariant {
    neutral = 'neutral',
    notification = 'notification',
    caution = 'caution',
    warning = 'warning',
    alarm = 'alarm',
    }

@customElement('ob-tooltip')
export class Tooltip extends LitElement {
    @property({ type: String }) variant = 'neutral' as TooltipVariant;
    @property({ type: String }) title = 'Title';
    @property({ type: String }) text = 'Tooltip text';
    @property({ type: Boolean, attribute: "right-arrow"}) rightArrow = false

  render() {
    return html`
        <div class=${classMap({
            wrapper: true,
            [this.variant]: true,
            "right-arrow": this.rightArrow
        })}>
            <div class="icon">
                <slot name="icon"></slot>
            </div>
            <div class="content">
                <div class="header">
                    <div class="title">${this.title}</div>
                    <div class="btn">
                        <ob-icon-button active-color variant="flat" @click="${() => this.dispatchEvent(new CustomEvent("click:more"))}" icon="01-application-open"></ob-icon-button>
                    </div>
                </div>
                
                <div class="divider"></div>
                <div class="text">${this.text}</div>
            </div>
        </div>
    `
  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-tooltip': Tooltip
  }
}
