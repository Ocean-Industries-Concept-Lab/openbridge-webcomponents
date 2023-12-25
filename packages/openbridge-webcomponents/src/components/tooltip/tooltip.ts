import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './tooltip.style';
import '../icon-button/icon-button';
import '../../icons/icon-01-application-open';
import {classMap} from 'lit/directives/class-map.js';

export enum TooltipVariant {
  neutral = 'neutral',
  notification = 'notification',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
}

@customElement('obc-tooltip')
export class Tooltip extends LitElement {
  @property({type: String}) variant = 'neutral' as TooltipVariant;
  @property({type: String}) appTitle = 'Title';
  @property({type: String}) text = 'Tooltip text';
  @property({type: Boolean, attribute: 'right-arrow'}) rightArrow = false;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [this.variant]: true,
          'right-arrow': this.rightArrow,
        })}
      >
        <div class="icon">
          <slot name="icon"></slot>
        </div>
        <div class="content">
          <div class="header">
            <div class="title">${this.appTitle}</div>
            <div class="btn">
              <obc-icon-button
                active-color
                variant="flat"
                @click="${() =>
                  this.dispatchEvent(new CustomEvent('click:more'))}"
              >
                <obi-01-application-open></obi-01-application-open>
              </obc-icon-button>
            </div>
          </div>

          <div class="divider"></div>
          <div class="text">${this.text}</div>
        </div>
      </div>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tooltip': Tooltip;
  }
}
