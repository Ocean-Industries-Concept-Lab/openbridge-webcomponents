import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './tooltip.css?inline';
import '../icon-button/icon-button';
import '../../icons/icon-application-open-google';
import {classMap} from 'lit/directives/class-map.js';

export enum TooltipVariant {
  neutral = 'neutral',
  notification = 'notification',
  caution = 'caution',
  warning = 'warning',
  alarm = 'alarm',
}

@customElement('obc-tooltip')
export class ObcTooltip extends LitElement {
  @property({type: String}) variant = 'neutral' as TooltipVariant;
  @property({type: String}) label = 'Title';
  @property({type: String}) text = 'Tooltip text';
  @property({type: Boolean}) rightArrow = false;

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
            <div class="title">${this.label}</div>
            <div class="btn">
              <obc-icon-button
                activecolor
                variant="flat"
                @click="${() =>
                  this.dispatchEvent(new CustomEvent('click:more'))}"
              >
                <obi-application-open-google></obi-application-open-google>
              </obc-icon-button>
            </div>
          </div>

          <div class="divider"></div>
          <div class="text">${this.text}</div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tooltip': ObcTooltip;
  }
}
