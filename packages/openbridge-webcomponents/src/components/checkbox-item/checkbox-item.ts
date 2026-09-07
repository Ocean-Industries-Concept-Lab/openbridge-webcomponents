import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {styleMap} from 'lit/directives/style-map.js';
import {msg, localized} from '@lit/localize';
import {customElement} from '../../decorator.js';
import componentStyle from './checkbox-item.css?inline';
import '../checkbox/checkbox.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-chevron-down-google.js';
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

export type ObcCheckboxItemExpandToggleEvent = CustomEvent<boolean>;

/**
 * `<obc-checkbox-item>` – A list row that pairs `<obc-checkbox>` with a label,
 * an optional description, and hierarchy affordances for nested lists.
 *
 * ### Overview
 * The row is the touch target: clicking anywhere on it toggles the checkbox,
 * except on the chevron button, which only asks to expand or collapse. Depth
 * is a number (`level`); the row indents itself so a flat sequence of rows
 * reads as a tree. `<obc-checkbox-list>` builds on this to hide the rows
 * under a collapsed parent.
 *
 * ### Features
 * - Three statuses: `unchecked`, `checked`, `mixed`.
 * - `touch-target` or `visual-target` hover treatment.
 * - `level` indentation: level 1 reserves the chevron slot, each further
 *   level adds a spacer.
 * - `expandable` rows show a chevron button that fires `expand-toggle`; the
 *   host owns `expanded`.
 * - Optional `description` line under the label.
 * - Forwards `aria-describedby` to the inner checkbox.
 *
 * ### Usage Guidelines
 * - Keep `status` as the source of truth; update it from the `change` event.
 * - Set `expanded` in response to `expand-toggle` — the row never flips it
 *   itself, so a parent (or `<obc-checkbox-list>`) can veto or persist it.
 * - Use `level` 0 for a plain list; start at 1 when any row in the list is
 *   expandable so chevrons and checkboxes line up.
 * - Prefer `hoverStyle="touch-target"` for standard list behaviour.
 *
 * ### Accessibility
 * The checkbox and the chevron are separate controls in the natural tab
 * order. The chevron is a native button with `aria-expanded` and a name
 * built from the label, following the WAI-ARIA checkbox and disclosure
 * button patterns.
 *
 * ### Example
 * ```html
 * <obc-checkbox-item
 *   level="1"
 *   expandable
 *   expanded
 *   status="mixed"
 *   label="Reports"
 * ></obc-checkbox-item>
 * <obc-checkbox-item
 *   level="2"
 *   status="checked"
 *   label="Monthly"
 *   description="Sent on the 1st"
 * ></obc-checkbox-item>
 * ```
 *
 * @property status - Checkbox status: `unchecked`, `checked` or `mixed`.
 * @property state - Item state: `enabled` or `disabled`.
 * @property disabled - Disables the row and the inner checkbox.
 * @property label - Text label; also the checkbox's accessible name.
 * @property description - Secondary line under the label; hidden when empty.
 * @property level - Depth in a nested list. 0 is a plain row; 1 reserves the chevron slot; each level above 1 adds a spacer.
 * @property expandable - Shows the chevron button that fires `expand-toggle`.
 * @property expanded - Whether the row's children are shown; drives the chevron direction and `aria-expanded`.
 * @availableWhen expanded expandable==true
 * @property hoverStyle - Which box shows hover and focus: the whole row (`touch-target`) or the checkbox (`visual-target`).
 * @property ariaDescribedBy - Forwarded to the inner checkbox as `aria-describedby`.
 * @fires {ObcCheckboxChangeEvent} change - Emitted when status changes.
 * @fires {ObcCheckboxItemExpandToggleEvent} expand-toggle - Emitted when the chevron is activated; detail is the next `expanded` value. Bubbles and is composed.
 * @stable
 */
@customElement('obc-checkbox-item')
@localized()
export class ObcCheckboxItem extends LitElement {
  @property({type: String}) status: CheckboxStatus = CheckboxStatus.unchecked;

  @property({type: String}) state: ObcCheckboxItemState =
    ObcCheckboxItemState.enabled;

  @property({type: Boolean}) disabled = false;

  @property({type: String}) label = '';

  @property({type: String}) description = '';

  @property({type: Number, reflect: true}) level = 0;

  @property({type: Boolean}) expandable = false;

  @property({type: Boolean, reflect: true}) expanded = false;

  @property({type: String}) hoverStyle: ObcCheckboxItemHoverStyle =
    ObcCheckboxItemHoverStyle.touchTarget;

  @property({type: String, attribute: 'aria-describedby', reflect: true})
  ariaDescribedBy = '';

  @query('obc-checkbox') private checkboxElement?: HTMLElement;

  @query('.chevron-button') private chevronButton?: HTMLElement;

  private get isDisabled(): boolean {
    return this.disabled || this.state === ObcCheckboxItemState.disabled;
  }

  private toggleStatusFromItem() {
    if (this.status === CheckboxStatus.checked) {
      this.status = CheckboxStatus.unchecked;
    } else {
      this.status = CheckboxStatus.checked;
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          status: this.status,
          disabled: this.isDisabled,
        },
      })
    );
  }

  private handleItemClick(event: MouseEvent) {
    if (this.isDisabled) return;

    const path = event.composedPath();
    if (this.checkboxElement && path.includes(this.checkboxElement)) return;
    if (this.chevronButton && path.includes(this.chevronButton)) return;

    this.toggleStatusFromItem();
  }

  private handleChevronClick(event: MouseEvent) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent<boolean>('expand-toggle', {
        detail: !this.expanded,
        bubbles: true,
        composed: true,
      })
    );
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

  public override focus(options?: FocusOptions): void {
    this.checkboxElement?.focus(options);
  }

  private renderChevron() {
    if (!this.expandable) return nothing;
    const action = this.expanded ? msg('Collapse') : msg('Expand');
    return html`<button
      type="button"
      class="chevron-button"
      aria-expanded=${this.expanded ? 'true' : 'false'}
      aria-label=${`${action} ${this.label}`.trim()}
      ?disabled=${this.isDisabled}
      @click=${this.handleChevronClick}
    >
      <span class="chevron-visible">
        ${this.expanded
          ? html`<obi-chevron-down-google
              class="chevron-icon"
            ></obi-chevron-down-google>`
          : html`<obi-chevron-right-google
              class="chevron-icon"
            ></obi-chevron-right-google>`}
      </span>
    </button>`;
  }

  override render() {
    const isDisabled = this.isDisabled;
    const hasCheckboxHoverEffects = !(
      this.hoverStyle === ObcCheckboxItemHoverStyle.touchTarget && !isDisabled
    );
    const depth = Math.max(0, Math.floor(this.level) - 1);
    const hasChevronSlot = this.level >= 1 || this.expandable;
    const checkboxAriaLabel =
      this.label.trim().length > 0 ? this.label : undefined;

    return html`
      <div
        class=${classMap({
          'checkbox-item-container': true,
          [`status-${this.status}`]: true,
          [`hover-style-${this.hoverStyle}`]: true,
          'is-nested': hasChevronSlot,
          'has-description': this.description !== '',
          disabled: isDisabled,
        })}
        @click=${this.handleItemClick}
      >
        ${depth > 0
          ? html`<div
              class="nested-spacer"
              aria-hidden="true"
              style=${styleMap({'--checkbox-item-depth': String(depth)})}
            ></div>`
          : nothing}
        ${hasChevronSlot
          ? html`<div class="chevron-container">${this.renderChevron()}</div>`
          : nothing}
        <div class="content-container">
          <obc-checkbox
            .status=${this.status}
            .state=${CheckboxState.enabled}
            .disabled=${isDisabled}
            .hasHoverEffects=${hasCheckboxHoverEffects}
            aria-label=${ifDefined(checkboxAriaLabel)}
            aria-describedby=${ifDefined(this.ariaDescribedBy || undefined)}
            @change=${this.handleCheckboxChange}
          ></obc-checkbox>
          <div class="checkbox-label-container">
            <span class="checkbox-label">${this.label}</span>
            ${this.description
              ? html`<span class="checkbox-description"
                  >${this.description}</span
                >`
              : nothing}
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
