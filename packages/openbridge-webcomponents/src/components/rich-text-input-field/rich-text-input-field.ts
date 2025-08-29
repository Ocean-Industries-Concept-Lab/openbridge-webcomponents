import { LitElement, html, nothing, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import compentStyle from "./rich-text-input-field.css?inline";
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

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
      <div class=${classMap({wrapper:true, disabled:this.isDisabled, error:this.hasError})}>
        <div class="content-container">
          <div class="input-container">
            ${this.hasLeadingIcon ? html`
              <div class="leading-icon">
                <slot name="leading-icon">
                  <obi-placeholder></obi-placeholder>
                </slot>
              </div>`
            : nothing}
          </div>
        </div>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rich-text-input-field': ObcRichTextInputField
  }
}
