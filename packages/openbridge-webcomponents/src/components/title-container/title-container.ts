import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './title-container.css?inline';

export enum ObcTitleContainerState {
  Enabled = 'enabled',
  Inactive = 'inactive',
}

/**
 * `<obc-title-container>` – Form title row with optional actions.
 *
 * Layout:
 * - leading icon
 * - title + label
 * - optional action buttons
 *
 * @slot icon - (Deprecated) Leading icon.
 * @slot title - Title text (falls back to `titleValue`).
 * @slot label - Label text (falls back to `label`).
 * @slot actions - Action elements (typically `obc-icon-button`) rendered in the right section.
 * @fires action-click {CustomEvent<{action: number}>} Fired when an action button is clicked.
 */
@customElement('obc-title-container')
export class ObcTitleContainer extends LitElement {
  /**
   * Visual state of the title container.
   */
  @property({type: String}) state: ObcTitleContainerState =
    ObcTitleContainerState.Enabled;

  /**
   * Title text (used when the `title` slot is empty).
   */
  @property({type: String, attribute: 'title-value'}) titleValue = '';

  /**
   * Label text (used when the `label` slot is empty).
   */
  @property({type: String}) label = '';

  static override styles = unsafeCSS(componentStyle);

  private boundActionElements = new Set<HTMLElement>();

  private get isInactive(): boolean {
    return this.state.toLowerCase() === ObcTitleContainerState.Inactive;
  }

  private get resolvedActionElements(): HTMLElement[] {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>(
      'slot[name="actions"]'
    );
    if (!slot) return [];
    return slot
      .assignedElements({flatten: true})
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
  }

  private syncActionElementListeners = (): void => {
    for (const action of this.boundActionElements) {
      action.removeEventListener('click', this.handleAssignedActionClick);
    }
    this.boundActionElements.clear();

    for (const action of this.resolvedActionElements) {
      action.addEventListener('click', this.handleAssignedActionClick);
      this.boundActionElements.add(action);
    }
  };

  private dispatchAction(action: number): void {
    this.dispatchEvent(
      new CustomEvent('action-click', {
        detail: {action},
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleAssignedActionClick = (event: Event): void => {
    if (this.isInactive) return;
    const actionElement = event.currentTarget;
    if (!(actionElement instanceof HTMLElement)) return;
    const actions = this.resolvedActionElements;
    const actionIndex = actions.indexOf(actionElement);
    if (actionIndex === -1) return;
    this.dispatchAction(actionIndex + 1);
  };

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const action of this.boundActionElements) {
      action.removeEventListener('click', this.handleAssignedActionClick);
    }
    this.boundActionElements.clear();
  }

  override render() {
    const wrapperClassMap = {
      wrapper: true,
      [`state-${this.state}`]: true,
    };

    return html`
      <div class=${classMap(wrapperClassMap)} part="wrapper">
        <div class="left" part="left">
          <div class="icon" part="icon">
            <slot name="icon"></slot>
          </div>
          <div class="text" part="text">
            <span class="title" part="title">
              <slot name="title">${this.titleValue}</slot>
            </span>
            <span class="label" part="label">
              <slot name="label">${this.label}</slot>
            </span>
          </div>
        </div>
        <div class="actions" part="actions">
          <slot
            name="actions"
            @slotchange=${this.syncActionElementListeners}
          ></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-title-container': ObcTitleContainer;
  }
}
