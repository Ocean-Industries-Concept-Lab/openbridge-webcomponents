import {LitElement, css, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './alert-menu-item.css?inline';
import {renderTime} from '../../time';
import '../button/button';
/**
 *
 * @fires ack-click - Fired when the ack button is clicked
 */
@customElement('obc-alert-menu-item')
export class ObcAlertMenuItem extends LitElement {
  @property({type: String}) message = 'Message';
  @property({type: String}) time = '2021-01-01T00:00:00Z';
  @property({type: String, attribute: 'time-since'}) timeSince = '1h';
  @property({type: Boolean}) acknowledgeble = false;
  @property({type: Boolean}) acknowledged = false;
  @property({type: Number, attribute: 'narrow-breakpoint-px'})
  narrowBreakpointPx = 400;

  override render() {
    const style = css`
      @media (max-width: ${this.narrowBreakpointPx}px) {
        .alert .time-wrapper {
          grid-column-start: 3;
          grid-column-end: -2;
          display: flex !important;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          flex-shrink: 0;
        }
      }
    `;

    const time = renderTime(new Date(this.time));
    return html`
      <style>
        ${style}
      </style>
      <div class="alert">
        <div class="icon">
          <slot name="icon"> </slot>
        </div>
        <div class="message">${this.message}</div>
        <div class="time-wrapper">
          <div class="time">${time}</div>
          <div class="time-since">${this.timeSince}</div>
        </div>
        <div class="acknowledge">
          ${this.acknowledgeble && !this.acknowledged
            ? html`
                <obc-button
                  class="acknowledge-button"
                  full-width
                  @click=${() =>
                    this.dispatchEvent(new CustomEvent('ack-click'))}
                  >ACK</obc-button
                >
              `
            : ''}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-alert-menu-item': ObcAlertMenuItem;
  }
}
