import {LitElement, html, nothing, unsafeCSS, type TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './form-container.css?inline';
import '../scrollbar/scrollbar.js';

export enum ObcFormContainerType {
  View = 'view',
  Enabled = 'enabled',
  Inactive = 'inactive',
  Completed = 'completed',
}

/**
 * `<obc-form-container>` – Container for form sections with header, content, and footer.
 *
 * Structure:
 * - title-section (title container)
 * - content-section (body content)
 * - footer-section (footer actions)
 *
 * @slot title - Header content (e.g., <obc-title-container>).
 * @slot content-title - Optional content title shown above the main content.
 * @slot - Main content.
 * @slot footer - Footer content (e.g., <obc-form-footer-container>).
 */
@customElement('obc-form-container')
export class ObcFormContainer extends LitElement {
  /**
   * Visual type of the container.
   */
  @property({type: String}) type: ObcFormContainerType =
    ObcFormContainerType.View;

  /**
   * Optional content title text (used when the `content-title` slot is empty).
   */
  @property({type: String, attribute: 'content-title'}) contentTitle = '';

  static override styles = unsafeCSS(componentStyle);

  private renderTitle(): TemplateResult | typeof nothing {
    return html`
      <div class="title-section" part="title-section">
        <slot name="title"></slot>
      </div>
    `;
  }

  private renderFooter(): TemplateResult | typeof nothing {
    return html`
      <div class="footer-section" part="footer-section">
        <slot name="footer"></slot>
      </div>
    `;
  }

  private renderContentBody(): TemplateResult {
    return html`
      <div class="content-body" part="content-body">
        ${this.contentTitle.trim() !== ''
          ? html`
              <div class="content-title" part="content-title">
                <slot name="content-title">${this.contentTitle}</slot>
              </div>
            `
          : html`<slot name="content-title"></slot>`}
        <slot></slot>
      </div>
    `;
  }

  private renderMainSection(): TemplateResult {
    return html`
      <div class="main-section" part="main-section">
        <div class="content-section" part="content-section">
          ${this.renderContentBody()}
        </div>
        ${this.renderFooter()}
      </div>
    `;
  }

  override render() {
    const wrapperClassMap = {
      wrapper: true,
      [`type-${this.type}`]: true,
    };

    return html`
      <div class=${classMap(wrapperClassMap)} part="wrapper">
        ${this.renderTitle()}
        ${this.type === ObcFormContainerType.Completed
          ? html`
              <obc-scrollbar class="content-scrollbar" part="content-scrollbar">
                ${this.renderMainSection()}
              </obc-scrollbar>
            `
          : this.renderMainSection()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-form-container': ObcFormContainer;
  }
}
