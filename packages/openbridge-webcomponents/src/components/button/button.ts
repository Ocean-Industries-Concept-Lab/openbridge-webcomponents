import {LitElement, unsafeCSS} from 'lit';
import {html, literal} from 'lit/static-html.js';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import iconStyle from './button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

export enum ButtonVariant {
  normal = 'normal',
  raised = 'raised',
  flat = 'flat',
  check = 'check',
}

@customElement('obc-button')
export class ObcButton extends LitElement {
  @property({type: String}) icon = 'placeholder';
  @property({type: String}) variant: ButtonVariant = ButtonVariant.normal;
  @property({type: Boolean}) fullWidth = false;
  @property({type: Boolean}) checked = false;
  @property({type: Boolean}) disabled = false;
  @property({type: String}) href?: string = undefined;
  @property({type: String}) target?: string = undefined;

  @queryAssignedElements({slot: 'leading-icon'})
  leadingIcon!: NodeListOf<HTMLElement>;
  @queryAssignedElements({slot: 'trailing-icon'})
  trailingIcon!: NodeListOf<HTMLElement>;
  @state() hasIconLeading = false;
  @state() hasIconTrailing = false;

  override firstUpdated() {
    this.hasIconLeading = this.leadingIcon.length > 0;
    this.hasIconTrailing = this.trailingIcon.length > 0;
  }

  override render() {
    const tag = this.href ? literal`a` : literal`button`;
    return html`
      <${tag}
        class=${classMap({
          wrapper: true,
          ['variant-' + this.variant]: true,
          hasIconLeading: this.hasIconLeading,
          hasIconTrailing: this.hasIconTrailing,
          'full-width': this.fullWidth,
          checked: this.checked,
        })}
        ?disabled=${this.disabled}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
      >
        <div class="visible-wrapper">
          <span class="icon leading"><slot name="leading-icon"></slot></span>
          <span class="label"><slot></slot></span>
          <span class="icon trailing"><slot name="trailing-icon"></slot></span>
        </div>
      </${tag}>
    `;
  }

  static override styles = unsafeCSS(iconStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-button': ObcButton;
  }
}
