import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './accordion-card.css?inline';
import {property} from 'lit/decorators.js';
import '../../icons/icon-chevron-up-google.js';
import '../../icons/icon-chevron-down-google.js';

export enum AccordionSize {
  SingleLine = 'single-line',
  Large = 'large',
}

export enum Position {
  top = 'top',
  bottom = 'bottom',
  center = 'center',
  regular = 'regular',
}

@customElement('obc-accordion-card')
export class ObcAccordionCard extends LitElement {
  @property({type: String}) cardTitle = '';
  @property({type: String}) description = '';
  @property({type: String}) statusLabel = '';
  @property({type: Boolean}) expanded = false;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) hasAlert = false;
  @property({type: Boolean}) hasDescription = false;
  @property({type: Boolean}) hasStatusLabel = false;
  @property({type: Boolean}) hasLeadingIcon = false;
  @property({type: String}) position: Position = Position.regular;
  @property({type: String}) size: AccordionSize =
    AccordionSize.SingleLine;
  

  private get shouldShowDescription() {
    return (
      this.size === AccordionSize.Large &&
      this.hasDescription &&
      this.description.trim() !== ''
    );
  }

  private handleToggle() {
    if (this.disabled) return;

    this.expanded = !this.expanded;

    this.dispatchEvent(
      new CustomEvent('accordion-toggle', {
        detail: {
          expanded: this.expanded,
          cardTitle: this.cardTitle,
        },
      })
    );
  }

  private renderContentMain() {
    return html`
        <div class="header-container">
          <div class="content-container">
            ${this.hasLeadingIcon
              ? html`
                  <div class="container-icon">
                    <slot name="leading-icon"></slot>
                  </div>
                `
              : ''}
            <div class="container-labels">
              <div class="label-title">${this.cardTitle}</div>
              ${this.shouldShowDescription
                ? html`
                    <div class="label-description">${this.description}</div>
                  `
                : ''}
            </div>
          ${this.hasStatusLabel
            ? html`
                <div class="container-status">
                  <div class="status">${this.statusLabel}</div>
                </div>
              `
            : ''}
            <div class="trailing-icon">
              ${this.expanded
                ? html`<obi-chevron-up-google></obi-chevron-up-google>`
                : html`<obi-chevron-down-google></obi-chevron-down-google>`}
            </div>
          </div>
        </div>
    `;
  }

  private renderContentAdditional() {
  if (!this.expanded) return '';

  return html`
    <div class="container-content-additional">
      <slot name="expanded-content"></slot>
    </div>
  `;
}

  private renderAlertFrame() {
    if (!this.hasAlert) return '';

    return html`
      <div class="alert-frame">
        <slot name="alert"></slot>
      </div>
    `;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'state-expanded': this.expanded,
          'state-collapsed': !this.expanded,
          'state-disabled': this.disabled,
          'style-single-line': this.size === AccordionSize.SingleLine,
          'style-large': this.size === AccordionSize.Large,
          'position-top': this.position === Position.top,
          'position-bottom': this.position === Position.bottom,
          'position-center': this.position === Position.center,
        })}
      >
        <div class="card-container">
          <button
            class="content-button"
            @click=${this.handleToggle}
            ?disabled=${this.disabled}
            aria-expanded=${this.expanded}
            aria-controls="accordion-content"
          >
            ${this.renderContentMain()}
          </button>

            ${this.renderContentAdditional()}
        </div>

        ${this.renderAlertFrame()}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-accordion-card': ObcAccordionCard;
  }
}
