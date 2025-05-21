import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './command-button.css?inline';
import '../../icons/icon-command-no.js';
import '../../icons/icon-command-in.js';
import '../icon-button/icon-button.js';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-command-button')
export class ObcCommandButton extends LitElement {
  @property({type: Boolean}) inCommand = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'in-command': this.inCommand,
        })}
      >
        <div class="visible-wrapper" part="visible-wrapper">
          <div class="icon" part="icon">
            ${this.inCommand
              ? html`<obi-command-in></obi-command-in>`
              : html`<obi-command-no></obi-command-no>`}
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-command-button': ObcCommandButton;
  }
}
