import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './accordion-item.css?inline';
import {property} from 'lit/decorators.js';
import '../../icons/icon-chevron-down-google.js';

@customElement('obc-accordion-item')
export class ObcAccordionItem extends LitElement {
  @property({type: String}) override title = '';
  @property({type: Boolean}) open = false;
  @property({type: Boolean}) disabled = false;
  @property({type: Boolean}) showContent = true;
  @property({type: Boolean}) showDivider = false;

  private handleToggle() {
    if (this.disabled) return;

    this.open = !this.open;

    this.dispatchEvent(
      new CustomEvent('accordion-item-toggle', {
        detail: {
          open: this.open,
          title: this.title,
        },
      })
    );
  }

  private renderContent() {
    return html`
      <div class="content">
        <div class="leading-content-container">
          <div class="label-frame">
            <div class="title">${this.title}</div>
          </div>
        </div>
        <div class="trailing-icon">
          <obi-chevron-down-google></obi-chevron-down-google>
        </div>
      </div>
    `;
  }

  private renderExpandedContent() {
    if (!this.open || !this.showContent) return '';

    return html`
      <div class="content-container">
        <slot name="expanded-content"></slot>
      </div>
    `;
  }

  private renderDivider() {
    if (!this.showDivider) return '';

    return html`<div class="divider"></div>`;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'state-disabled': this.disabled,
          'open-true': this.open,
          'open-false': !this.open,
        })}
      >
        <button
          class="content-button"
          @click=${this.handleToggle}
          ?disabled=${this.disabled}
          aria-expanded=${this.open}
          aria-controls="accordion-content"
        >
          ${this.renderContent()}
        </button>

        ${this.renderExpandedContent()} ${this.renderDivider()}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-accordion-item': ObcAccordionItem;
  }
}
