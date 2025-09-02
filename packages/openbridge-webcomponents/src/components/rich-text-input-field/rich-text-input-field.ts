import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './rich-text-input-field.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-placeholder.js';
import "../icon-button/icon-button";
import "../../icons/icon-up-iec.js";
import "../../icons/icon-screen-shot.js";

@customElement('obc-rich-text-input-field')
export class ObcRichTextInputField extends LitElement {
  @property({type: Boolean}) isDisabled = false;

  @property({type: Boolean}) hasError = false;

  @property({type: String}) placeholder = 'Type your text here...';

  @property({type: Boolean}) hasHelperText = false;

  @property({type: Boolean}) hasLeadingIcon = false;

  @property({type: Boolean}) hasToolbar = false;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          disabled: this.isDisabled,
          error: this.hasError,
          'has-leading-icon': this.hasLeadingIcon,
        })}
      >
        <div class="content-container">
          ${this.hasLeadingIcon
            ? html` <div class="leading-icon">
                <slot name="leading-icon">
                  <obi-placeholder></obi-placeholder>
                </slot>
              </div>`
            : nothing}
          <textarea 
            class="input-field" 
            .placeholder=${this.placeholder}
          ></textarea>
          <div class="tool-bar-container">
            <div class="tool-container">
              <div class="divider"></div>
              <obc-icon-button class="up-icon-button" variant="flat">
                <obi-up-iec></obi-up-iec>
              </obc-icon-button>
              <obc-icon-button variant="flat">
                <obi-screen-shot></obi-screen-shot>
              </obc-icon-button>
              <obc-icon-button variant="flat">
                <obi-placeholder></obi-placeholder>
              </obc-icon-button>
              <obc-icon-button variant="flat">
                <obi-placeholder></obi-placeholder>
              </obc-icon-button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rich-text-input-field': ObcRichTextInputField;
  }
}