import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './form-footer-container.css?inline';

export type ObcFormFooterActionClickEvent = CustomEvent<{
  action: number;
}>;

/**
 * `<obc-form-footer-container>` – Footer container for form actions.
 *
 * Structure:
 * - actions row (slotted action elements)
 *
 * @slot - Action elements (typically `obc-icon-button`) rendered in the footer row.
 * @fires action-click {ObcFormFooterActionClickEvent} Fired when a slotted action element is clicked.
 */
@customElement('obc-form-footer-container')
export class ObcFormFooterContainer extends LitElement {
  /**
   * Shows the action buttons when true.
   */
  @property({type: Boolean, attribute: 'has-actions'}) hasActions = false;

  static override styles = unsafeCSS(componentStyle);

  private boundActionElements = new Set<HTMLElement>();

  private get resolvedActionElements(): HTMLElement[] {
    const slot = this.renderRoot.querySelector('slot');
    if (!slot) return [];
    return slot
      .assignedElements({flatten: true})
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
  }

  private dispatchAction(action: number): void {
    this.dispatchEvent(
      new CustomEvent('action-click', {
        detail: {action},
        bubbles: true,
        composed: true,
      }) as ObcFormFooterActionClickEvent
    );
  }

  private syncActionElementListeners = (): void => {
    for (const action of this.boundActionElements) {
      action.removeEventListener('click', this.handleAssignedActionClick);
    }
    this.boundActionElements.clear();

    if (!this.hasActions) return;

    for (const action of this.resolvedActionElements) {
      action.addEventListener('click', this.handleAssignedActionClick);
      this.boundActionElements.add(action);
    }
  };

  private handleAssignedActionClick = (event: Event): void => {
    const actionElement = event.currentTarget;
    if (!(actionElement instanceof HTMLElement)) return;
    const actions = this.resolvedActionElements;
    const actionIndex = actions.indexOf(actionElement);
    if (actionIndex === -1) return;
    this.dispatchAction(actionIndex + 1);
  };

  override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('hasActions')) {
      this.syncActionElementListeners();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const action of this.boundActionElements) {
      action.removeEventListener('click', this.handleAssignedActionClick);
    }
    this.boundActionElements.clear();
  }

  override render() {
    return html`
      <div class="wrapper" part="wrapper">
        ${this.hasActions
          ? html`
              <div class="actions" part="actions">
                <slot @slotchange=${this.syncActionElementListeners}></slot>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-form-footer-container': ObcFormFooterContainer;
  }
}
