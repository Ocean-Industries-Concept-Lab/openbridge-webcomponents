import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './rich-button.css?inline';

export enum RichButtonDirection {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

@customElement('obc-rich-button')
export class ObcRichButton extends LitElement {
  @property({type: String}) label = '';
  @property({type: String}) description = '';
  @property({type: String}) direction: RichButtonDirection =
    RichButtonDirection.Vertical;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: Boolean}) hasTrailingIcon = false;
  @property({type: Boolean}) disabled = false;

  private handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('rich-button-click', {
        detail: {
          label: this.label,
          description: this.description,
        },
      })
    );
  }

  private renderContent() {
    return html`
      ${this.hasLeadingIcon
        ? html`
            <div class="icon-container leading-icon">
              <slot name="leading-icon"></slot>
            </div>
          `
        : ''}

      <div class="content-container">
        <div class="label">${this.label}</div>
        ${this.description
          ? html`<div class="description">${this.description}</div>`
          : ''}
      </div>

      ${this.hasTrailingIcon
        ? html`
            <div class="icon-container trailing-icon">
              <slot name="trailing-icon"></slot>
            </div>
          `
        : ''}
    `;
  }

  override render() {
    return html`
      <button
        class=${classMap({
          'rich-button': true,
          'direction-vertical': this.direction === RichButtonDirection.Vertical,
          'direction-horizontal':
            this.direction === RichButtonDirection.Horizontal,
          'has-leading-icon': this.hasLeadingIcon,
          'has-trailing-icon': this.hasTrailingIcon,
          disabled: this.disabled,
        })}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
      >
        ${this.renderContent()}
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rich-button': ObcRichButton;
  }
}
