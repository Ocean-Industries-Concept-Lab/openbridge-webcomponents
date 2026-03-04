import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../decorator.js';
import componentStyle from './checkbox-item.css?inline';
import '../checkbox/checkbox.js';
import '../../icons/icon-chevron-right-google.js';
import {
  CheckboxState,
  CheckboxStatus,
  type ObcCheckboxChangeEvent,
} from '../checkbox/checkbox.js';

export enum ObcCheckboxItemState {
  enabled = 'enabled',
  disabled = 'disabled',
}

export enum ObcCheckboxItemHoverStyle {
  touchTarget = 'touch-target',
  visualTarget = 'visual-target',
}

/**
 * `<obc-checkbox-item>` – A list-item wrapper for `<obc-checkbox>` with label
 * and optional nested indentation affordances.
 *
 * ### Overview
 * Combines checkbox interaction with a row-like container used in menus and
 * hierarchical selection lists. The component proxies checkbox state changes,
 * supports touch-target or visual-target interaction behavior, and can render
 * nested structure indicators.
 *
 * ### Features
 * - Three checkbox statuses: `unchecked`, `checked`, `mixed`.
 * - Item state control: `enabled` or `disabled`.
 * - Two hover/focus interaction modes: `touch-target` and `visual-target`.
 * - Optional nested layout controls via `isNested`, `isLevel1`, `isLevel2`.
 * - Forwards `aria-describedby` to the inner checkbox for assistive context.
 *
 * ### Variants
 * - **Nested level 1:** Chevron icon is shown.
 * - **Nested level 2:** Chevron slot is reserved and nested spacer is shown.
 *
 * ### Usage Guidelines
 * - Use for checkbox rows that require text labels and optional hierarchy.
 * - Keep `status` as the source of truth for checked/mixed/unchecked value.
 * - Use `state="disabled"` or `disabled` to lock interaction.
 * - Prefer `hoverStyle="touch-target"` for standard list behavior.
 *
 * ### Slots / Content
 * - No named slots. Label content is provided through the `label` property.
 *
 * ### Events
 * - `change` – Fired when status changes (from row click or inner checkbox).
 *   **detail:** `{ status, disabled }`
 *
 * ### Best Practices
 * - Provide non-empty `label` for accessible naming.
 * - Use `aria-describedby` when additional contextual text exists outside.
 * - For deep hierarchies, use `isNested` with `isLevel1` / `isLevel2`
 *   consistently to preserve spacing and alignment.
 *
 * ### Example
 * ```html
 * <obc-checkbox-item
 *   status="mixed"
 *   label="Include archived items"
 *   hoverStyle="touch-target"
 * ></obc-checkbox-item>
 * ```
 *
 * @slot - No named slots.
 * @fires change {ObcCheckboxChangeEvent} - Emitted when status changes.
 */
@customElement('obc-checkbox-item')
export class ObcCheckboxItem extends LitElement {
  @property({type: String}) status: CheckboxStatus = CheckboxStatus.unchecked;

  @property({type: String}) state: ObcCheckboxItemState =
    ObcCheckboxItemState.enabled;

  @property({type: Boolean}) disabled = false;

  @property({type: String}) label = '';

  @property({type: Boolean, reflect: true}) isNested = false;

  @property({type: Boolean, reflect: true}) isLevel1 = false;

  @property({type: Boolean, reflect: true}) isLevel2 = false;

  @property({type: String}) hoverStyle: ObcCheckboxItemHoverStyle =
    ObcCheckboxItemHoverStyle.touchTarget;

  @property({type: String, attribute: 'aria-describedby', reflect: true})
  ariaDescribedBy = '';

  @query('obc-checkbox') private checkboxElement?: HTMLElement;

  private setCheckboxFocusProxyEnabled(enabled: boolean) {
    if (!this.checkboxElement) return;
    if (enabled) {
      this.checkboxElement.setAttribute('force-focus-visible', '');
      return;
    }
    this.checkboxElement.removeAttribute('force-focus-visible');
  }

  private toggleStatusFromItem() {
    const isDisabled =
      this.disabled || this.state === ObcCheckboxItemState.disabled;

    if (this.status === CheckboxStatus.checked) {
      this.status = CheckboxStatus.unchecked;
    } else {
      this.status = CheckboxStatus.checked;
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          status: this.status,
          disabled: isDisabled,
        },
      })
    );
  }

  private handleItemClick(event: MouseEvent) {
    if (this.disabled || this.state === ObcCheckboxItemState.disabled) return;

    const path = event.composedPath();
    const checkboxElement = this.checkboxElement;
    if (checkboxElement && path.includes(checkboxElement)) return;

    this.toggleStatusFromItem();
  }

  private handleItemFocus(event: FocusEvent) {
    if (this.disabled || this.state === ObcCheckboxItemState.disabled) return;
    if (this.hoverStyle !== ObcCheckboxItemHoverStyle.visualTarget) return;

    const container = event.currentTarget as HTMLElement | null;
    const isFocusVisible = container?.matches(':focus-visible') ?? false;
    this.setCheckboxFocusProxyEnabled(isFocusVisible);
    this.checkboxElement?.focus();
  }

  private handleItemFocusOut(event: FocusEvent) {
    if (this.hoverStyle !== ObcCheckboxItemHoverStyle.visualTarget) return;

    const container = event.currentTarget as HTMLElement | null;
    if (!container) return;

    queueMicrotask(() => {
      if (!container.matches(':focus-within')) {
        this.setCheckboxFocusProxyEnabled(false);
      }
    });
  }

  private handleCheckboxChange(event: Event) {
    const checkboxEvent = event as ObcCheckboxChangeEvent;
    this.status = checkboxEvent.detail.status;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: checkboxEvent.detail,
      })
    );
  }

  override render() {
    const isDisabled =
      this.disabled || this.state === ObcCheckboxItemState.disabled;
    const shouldRenderNestedSpacer = this.isNested && this.isLevel2;
    const shouldRenderChevronContainer =
      this.isNested && (this.isLevel1 || this.isLevel2);
    const shouldRenderChevronIcon = this.isNested && this.isLevel1;
    const checkboxAriaLabel =
      this.label.trim().length > 0 ? this.label : undefined;

    return html`
      <div
        class=${classMap({
          'checkbox-item-container': true,
          [`status-${this.status}`]: true,
          [`hover-style-${this.hoverStyle}`]: true,
          'is-nested': this.isNested,
          'is-level-1': this.isLevel1,
          'is-level-2': this.isLevel2,
          disabled: isDisabled,
        })}
        tabindex=${isDisabled ||
        this.hoverStyle !== ObcCheckboxItemHoverStyle.visualTarget
          ? '-1'
          : '0'}
        @click=${this.handleItemClick}
        @focus=${this.handleItemFocus}
        @focusout=${this.handleItemFocusOut}
      >
        ${shouldRenderChevronContainer
          ? html`<div class="chevron-container" aria-hidden="true">
              ${shouldRenderChevronIcon
                ? html`<obi-chevron-right-google
                    class="chevron-icon"
                  ></obi-chevron-right-google>`
                : nothing}
            </div>`
          : nothing}
        ${shouldRenderNestedSpacer
          ? html`<div class="nested-spacer" aria-hidden="true"></div>`
          : nothing}
        <div class="content-container">
          <obc-checkbox
            .status=${this.status}
            .state=${CheckboxState.enabled}
            .disabled=${isDisabled}
            .suppressFocusRing=${this.hoverStyle ===
            ObcCheckboxItemHoverStyle.touchTarget}
            aria-label=${ifDefined(checkboxAriaLabel)}
            aria-describedby=${ifDefined(this.ariaDescribedBy || undefined)}
            @change=${this.handleCheckboxChange}
          ></obc-checkbox>
          <div class="checkbox-label-container">
            <span class="checkbox-label">${this.label}</span>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-checkbox-item': ObcCheckboxItem;
  }
}
