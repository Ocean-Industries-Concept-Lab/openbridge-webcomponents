import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

import styles from './toggle-button-vertical-option.css?inline';

export enum ObcToggleButtonVerticalOptionType {
  flat    = 'flat',
  regular = 'regular',
}

export enum ObcToggleButtonLabelPlacement {
  inline = 'inline',
  under  = 'under',
}

@customElement('obc-toggle-button-vertical-option')
export class ObcToggleButtonVerticalOption extends LitElement {
  @property({type: String})  value = '';
  @property({type: Boolean, reflect: true}) selected  = false;
  @property({type: String})  type     = ObcToggleButtonVerticalOptionType.regular;
  @property({type: Boolean, reflect: true}) noDivider = false;

  @property({type: Boolean}) hasIcon = false;
  @property({type: String})  label   = '';
  @property({type: Boolean}) disabled = false;

  @property({type: String})
  labelPlacement: ObcToggleButtonLabelPlacement =
    ObcToggleButtonLabelPlacement.inline;

  private onClick() {
    if (this.disabled) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('selected', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      }),
    );
  }

  override render() {
  const labelUnder = this.labelPlacement === ObcToggleButtonLabelPlacement.under;
  const hasLabel   = this.label.trim().length > 0;
  const labelText = hasLabel ? this.label : '\u00A0';

  const classes = classMap({
    wrapper: true,
    selected: this.selected,
    'type-flat':    this.type === ObcToggleButtonVerticalOptionType.flat,
    'type-regular': this.type === ObcToggleButtonVerticalOptionType.regular,
    'label-under':  labelUnder,
    'label-inline': !labelUnder,
    'has-icon':     this.hasIcon,
    disabled:       this.disabled,
  });

  return html`
    <button class=${classes} @click=${this.onClick}>
      <div class="visible-wrapper">
        <div class="icon-label-container">
          <div class="icon">
            ${labelUnder && !this.hasIcon
                ? nothing
                : this.hasIcon
                    ? html`<slot name="icon"></slot>`
                    : nothing}
          </div>

            ${labelUnder
              ? html`<div class="label">${labelText}</div>`
             : hasLabel
                 ? html`<div class="label">${this.label}</div>`
                 : nothing}
        </div>

        ${!this.selected ? html`<div class="bottom-divider"></div>` : nothing}
      </div>
    </button>
  `;
}

  static override styles = unsafeCSS(styles);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-vertical-option': ObcToggleButtonVerticalOption;
  }
}
