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
 * `<obc-title-container>` renders the header row for form sections.
 *
 * **Overview**
 * Use this component as a title bar, header row, heading strip, or toolbar-like
 * top section in form containers.
 *
 * **Features / Variants**
 * - Visual state via `state`: `enabled` or `inactive`.
 * - Title fallback via `titleValue` when the `title` slot is empty.
 * - Label fallback via `label` when the `label` slot is empty.
 * - Arbitrary slotted actions in `actions` slot with indexed click events.
 *
 * **Usage Guidelines**
 * - Provide text through slots when possible for maximum composition control.
 * - Use `state="inactive"` to visually mute text and actions.
 * - Pass one or more `obc-icon-button` elements in `actions` for custom
 *   command sets.
 *
 * **Slots / Content**
 * - `icon`: leading icon content.
 * - `title`: main heading text.
 * - `label`: secondary heading label text.
 * - `actions`: one or more action elements (typically `obc-icon-button`).
 *
 * **Events**
 * - Emits `action-click` with 1-based `action` index based on the slotted
 *   action order.
 *
 * **Best Practices**
 * - Keep actions deterministic in order to preserve stable event indexing.
 * - Keep title and label concise to avoid truncation in narrow layouts.
 * - Use this component as a header boundary and keep business logic in parent
 *   containers.
 *
 * **Example**
 * ```html
 * <obc-title-container state="enabled" title-value="Title" label="Label">
 *   <obi-placeholder slot="icon"></obi-placeholder>
 *   <obc-icon-button slot="actions" variant="flat" aria-label="Action 1">
 *     <obi-placeholder></obi-placeholder>
 *   </obc-icon-button>
 *   <obc-icon-button slot="actions" variant="flat" aria-label="Action 2">
 *     <obi-placeholder></obi-placeholder>
 *   </obc-icon-button>
 * </obc-title-container>
 * ```
 *
 * @slot icon - Leading icon content.
 * @slot title - Title text (overrides `titleValue` fallback).
 * @slot label - Label text (overrides `label` fallback).
 * @slot actions - Action elements rendered in the right section.
 * @fires action-click {CustomEvent<{action: number}>} Fired when a slotted action element is clicked.
 */
@customElement('obc-title-container')
export class ObcTitleContainer extends LitElement {
  @property({type: String}) state: ObcTitleContainerState =
    ObcTitleContainerState.Enabled;

  @property({type: String, attribute: 'title-value'}) titleValue = '';

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
