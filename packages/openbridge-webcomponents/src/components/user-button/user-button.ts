import {LitElement, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './user-button.css?inline';
import '../../icons/icon-user.js';
import {html, literal} from 'lit/static-html.js';

export enum StyleType {
  flat = 'flat',
  normal = 'normal',
  selected = 'selected',
}

export enum Variant {
  icon = 'icon',
  initials = 'initials',
}

@customElement('obc-user-button')
export class ObcUserButton extends LitElement {
  @property({type: Variant}) variant: Variant = Variant.icon;
  @property({type: StyleType}) styleType: StyleType = StyleType.flat;
  @property({type: Boolean}) static: boolean = false;
  @property({type: Boolean}) disabled: boolean = false;
  @property({type: String}) initials: string = '';
  @property({type: String}) label?: string;

  private get formattedInitials() {
    if (!this.initials) return '';

    // Remove whitespace and convert to uppercase
    const clean = this.initials.replace(/\s+/g, '').toUpperCase();

    // If longer than 2 characters, truncate to first 2
    if (clean.length > 2) {
      console.warn(`Initials "${this.initials}" are longer than 2 characters.`);
      return clean.slice(0, 2);
    }

    return clean;
  }

  private get shouldShowIcon() {
    // Show icon if useIcon is true OR if initials aren't exactly 2 letters
    return this.variant === Variant.icon || this.formattedInitials === '';
  }

  private get isClickable() {
    // Not clickable if static or disabled
    return !this.static && !this.disabled;
  }

   override render() {
    const wrapperClasses = {
      wrapper: true,
      'wrapper-static': this.static,
      'wrapper-clickable': this.isClickable,
      'style-flat': this.styleType === StyleType.flat,
      'style-normal': this.styleType === StyleType.normal,
      'style-selected': this.styleType === StyleType.selected,
      'mode-icon': this.shouldShowIcon,
      'mode-initials': !this.shouldShowIcon,
      'state-static': this.static,
    };

    // Use button element when clickable, div when static
    const tag = this.static ? literal`div` : literal`button`;

    const label = this.label
      ? html`<span class="user-label">${this.label}</span>`
      : nothing;

    return html`
        <${tag}
          class=${classMap(wrapperClasses)}
          ?disabled=${this.disabled}
          aria-label=${this.initials || 'User button'}
        >
        <div class="content-container">
          <div class="user-button-circle">
            ${this.shouldShowIcon
              ? html`
                  <div class="icon-container">
                    <slot name="icon">
                      <!-- Fallback to default icon if no slot content -->
                      <obi-user></obi-user>
                    </slot>
                  </div>
                `
              : html`
                  <span class="user-initials">
                    ${this.formattedInitials}
                  </span>
                `
            }
          </div>
          ${label}
        </div>
        </${tag}>
      `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-user-button': ObcUserButton;
  }
}
