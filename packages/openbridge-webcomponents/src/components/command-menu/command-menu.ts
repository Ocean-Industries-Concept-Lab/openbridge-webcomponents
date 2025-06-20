import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './command-menu.css?inline';
import '../start-stop-switch/start-stop-switch.js';
import '../../icons/icon-command-in.js';
import {classMap} from 'lit/directives/class-map.js';
import {ObcStartStopSwitchChangeEvent} from '../start-stop-switch/start-stop-switch.js';
import {customElement} from '../../decorator.js';

export type ObcCommandMenuChangeEvent = CustomEvent<{inCommand: boolean}>;

/**
 * @summary Command menu component
 * @description Command menu component
 * @property {boolean} inCommand - Whether the command is in command
 * @property {boolean} hasLocation - Whether the command has location
 *
 * @fires {ObcCommandMenuChangeEvent} change - The change event
 *
 * @slot command-icon - The icon of the command
 * @slot command-status - The name of the command status
 * @slot command-description - The description of the command status
 * @slot command-location - The location of the station with the command
 * @slot toogle-action-to-in-command-label - The label on the button to toggle the command to in
 * @slot toogle-action-to-no-command-label - The label on the button to toggle the command to no
 * @slot toogle-state-in-command-label - The status label on toggle when in command
 * @slot toogle-state-no-command-label - The status label on toggle when no command
 */
@customElement('obc-command-menu')
export class ObcCommandMenu extends LitElement {
  @property({type: Boolean}) inCommand = false;
  @property({type: Boolean}) hasLocation = true;

  override render() {
    return html`
      <div
        class=${classMap({
          card: true,
          'in-command': this.inCommand,
          'no-command': !this.inCommand,
          'has-location': this.hasLocation,
        })}
      >
        <div class="title-container">Command</div>
        <div class="command-container">
          <div class="value-container">
            <div class="icon command">
              <slot name="command-icon"></slot>
            </div>
            <div class="value">
              <div class="status">
                <slot name="command-status"></slot>
              </div>
              <div class="description">
                <div class="command-description">
                  <slot name="command-description"></slot>
                </div>
                ${this.hasLocation
                  ? html` <div class="divider"></div>
                      <div class="command-location">
                        <slot name="command-location"></slot>
                      </div>`
                  : nothing}
              </div>
            </div>
          </div>
          <div class="action-container">
            <obc-start-stop-switch
              @change=${this.onChange}
              .checked=${this.inCommand}
            >
              <div slot="to-checked-action-label">
                <slot name="toogle-action-to-in-command-label"></slot>
              </div>
              <div slot="to-unchecked-action-label">
                <slot name="toogle-action-to-no-command-label"></slot>
              </div>
              <div slot="checked-state-label">
                <slot name="toogle-state-in-command-label"></slot>
              </div>
              <div slot="checked-state-icon">
                <slot name="toogle-state-in-command-icon">
                  <obi-command-in></obi-command-in>
                </slot>
              </div>
              <div slot="unchecked-state-label">
                <slot name="toogle-state-no-command-label"></slot>
              </div>
            </obc-start-stop-switch>
          </div>
        </div>
      </div>
    `;
  }

  private onChange(event: ObcStartStopSwitchChangeEvent) {
    this.dispatchEvent(
      new CustomEvent<{inCommand: boolean}>('change', {
        detail: {inCommand: event.detail.checked},
      })
    );
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-command-menu': ObcCommandMenu;
  }
}
