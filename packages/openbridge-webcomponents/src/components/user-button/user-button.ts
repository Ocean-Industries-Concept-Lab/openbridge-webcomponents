import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import compentStyle from "./user-button.css?inline";
import '../../icons/icon-user.js';

export enum StyleType {
  flat = 'flat',
  normal = 'normal',
  selected = 'selected'
}

export enum Variant {
  icon = 'icon',
  initials = 'initials'
}

@customElement('obc-user-button')
export class ObcUserButton extends LitElement {
  @property({ type: Variant }) variant: Variant = Variant.icon;
  @property({ type: StyleType }) styleType: StyleType = StyleType.flat;
  @property({ type: Boolean }) static: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) initials: string = '';
  private get formattedInitials() {
    if (!this.initials) return '';
    
    // Remove whitespace and convert to uppercase
    const clean = this.initials.replace(/\s+/g, '').toUpperCase();
    
    // Must be exactly 2 letters
    return clean.length === 2 ? clean : '';
  }

  private get shouldShowIcon() {
    // Show icon if useIcon is true OR if initials aren't exactly 2 letters
    return this.variant === Variant.icon || this.formattedInitials === '';
  }

  private get isClickable() {
    // Not clickable if static, disabled, or when showing icon
    return !this.static && !this.disabled && !this.shouldShowIcon;
  }

  private get shouldUseButton() {
    // Use button element when clickable, div when static
    return !this.static;
  }

  private renderContent() {
    return html`
      <div class="content-container">
        <div class="user-button-circle">
          ${this.shouldShowIcon ? html`<obi-user></obi-user>` : this.renderInitials()}
        </div>
      </div>
    `;
  }

  private renderInitials() {
    return html`
      <span class="user-initials">${this.formattedInitials}</span>
    `;
  }

  override render() {
    const wrapperClasses = {
      'wrapper': true,
      'wrapper-static': this.static,
      'wrapper-clickable': this.isClickable,
      'style-flat': this.styleType === StyleType.flat,
      'style-normal': this.styleType === StyleType.normal,
      'style-selected': this.styleType === StyleType.selected,
      'mode-icon': this.shouldShowIcon,
      'mode-initials': !this.shouldShowIcon,
      'state-static': this.static
    };

    if (this.shouldUseButton) {
      return html`
        <button 
          class=${classMap(wrapperClasses)}
          ?disabled=${this.disabled}
          aria-label=${this.initials}>
          ${this.renderContent()}
        </button>
      `;
    } else {
      return html`
        <div class=${classMap(wrapperClasses)} ?disabled=${this.disabled}>
          ${this.renderContent()}
        </div>
      `;
    }
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-user-button': ObcUserButton
  }
}