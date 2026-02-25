import {LitElement, html, nothing, unsafeCSS, type TemplateResult} from 'lit';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './form-item.css?inline';
import {
  CheckButtonCheckboxAppearance,
  CheckButtonType,
} from '../check-button/check-button.js';
import '../check-button/check-button.js';
import '../../icons/icon-check-google.js';
import '../../icons/icon-check-mixed.js';
import {
  CheckboxStatus,
  type ObcCheckboxChangeEvent,
} from '../checkbox/checkbox.js';

export enum ObcFormItemType {
  View = 'view',
  EnabledActionFirst = 'enabled-action-first',
  FilledStatusFirst = 'filled-status-first',
  EnabledActionLast = 'enabled-action-last',
  FilledStatusLast = 'filled-status-last',
  Inactive = 'inactive',
}

export enum ObcFormItemBasicState {
  Enabled = 'enabled',
  Disabled = 'disabled',
  Amplified = 'amplified',
}

export enum ObcFormItemStatusIcon {
  Check = 'check',
  Dash = 'dash',
}

export type ObcFormItemActionChangeEvent = CustomEvent<{
  itemId: string | null;
  status: ObcCheckboxChangeEvent['detail']['status'];
  disabled: boolean;
}>;

type ObcCheckButtonClickEvent = CustomEvent<{
  checked: boolean;
}>;

/**
 * `<obc-form-item>` renders one interactive form row for grouped list content.
 *
 * **Overview**
 * Use this component as an item row, line item, list entry, tile, or cell
 * inside `obc-form-group` and related form layouts.
 *
 * **Features / Variants**
 * - Supports layout variants through `type`:
 *   `view`, `enabled-action-first`, `enabled-action-last`,
 *   `filled-status-first`, `filled-status-last`, `inactive`.
 * - Supports non-interactive base states through `basicState`:
 *   `enabled`, `disabled`, `amplified`.
 * - Optional leading icon through `hasIcon` + `icon` slot.
 * - Optional shader for view/inactive variants through `hasShader`.
 * - Optional action error rendering through `hasError` and `errorText` for
 *   action variants.
 * - Filled status icon variant via `statusIcon` (`check` or `dash`).
 * - Optional stable event identity via `itemId`.
 *
 * **Usage Guidelines**
 * - Use action variants when checkbox interaction is needed.
 * - Use filled-status variants for read-only completion status.
 * - Keep text content in the default slot to support multi-line wrapping.
 * - Pair group and item variants consistently in the same section.
 *
 * **Slots / Content**
 * - `icon`: optional leading icon content.
 * - default slot: main row text/content.
 *
 * **Events**
 * - Emits `action-change` when the internal checkbox changes.
 * - Event detail includes `itemId`, checkbox `status`, and `disabled` state.
 *
 * **Best Practices**
 * - Prefer semantic `itemId` values when rendering dynamic lists.
 * - Avoid mixing unrelated item variants in the same visual group.
 * - Use `basicState` for logical state previews and rely on CSS pseudo-classes
 *   for real interaction states.
 *
 * **Example**
 * ```html
 * <obc-form-item
 *   type="enabled-action-first"
 *   item-id="engine-room-1"
 *   has-icon
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 *   Engine room checklist item
 * </obc-form-item>
 * ```
 *
 * @slot icon - Optional leading icon content.
 * @slot - Main row text or content.
 * @fires action-change {ObcFormItemActionChangeEvent} Fired when the internal checkbox state changes.
 */
@customElement('obc-form-item')
export class ObcFormItem extends LitElement {
  @property({type: String}) type: ObcFormItemType = ObcFormItemType.View;

  @property({type: String, attribute: 'item-id'}) itemId = '';

  @property({type: Boolean, reflect: true, attribute: 'has-error'})
  hasError = false;

  @property({type: String, attribute: 'error-text'}) errorText = '';

  @property({type: Boolean, attribute: 'has-icon'}) hasIcon = false;

  @property({type: String, attribute: 'basic-state'})
  basicState: ObcFormItemBasicState = ObcFormItemBasicState.Enabled;

  @property({type: Boolean, reflect: true, attribute: 'has-shader'})
  hasShader = false;

  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: String, attribute: 'status-icon'})
  statusIcon: ObcFormItemStatusIcon = ObcFormItemStatusIcon.Check;

  @state() private actionChecked = false;

  static override styles = unsafeCSS(componentStyle);

  private get isActionType(): boolean {
    return (
      this.type === ObcFormItemType.EnabledActionFirst ||
      this.type === ObcFormItemType.EnabledActionLast
    );
  }

  private get hasBuiltInShader(): boolean {
    return (
      this.type === ObcFormItemType.EnabledActionFirst ||
      this.type === ObcFormItemType.FilledStatusFirst ||
      this.type === ObcFormItemType.EnabledActionLast ||
      this.type === ObcFormItemType.FilledStatusLast
    );
  }

  private get supportsShaderToggle(): boolean {
    return (
      this.type === ObcFormItemType.View ||
      this.type === ObcFormItemType.Inactive
    );
  }

  private get resolvedBasicState(): ObcFormItemBasicState {
    switch (this.basicState) {
      case ObcFormItemBasicState.Disabled:
        return ObcFormItemBasicState.Disabled;
      case ObcFormItemBasicState.Amplified:
        return ObcFormItemBasicState.Amplified;
      case ObcFormItemBasicState.Enabled:
      default:
        return ObcFormItemBasicState.Enabled;
    }
  }

  private get actionDisabled(): boolean {
    return (
      this.disabled ||
      this.type === ObcFormItemType.Inactive ||
      this.resolvedBasicState === ObcFormItemBasicState.Disabled
    );
  }

  private renderIcon(): TemplateResult | typeof nothing {
    if (!this.hasIcon) return nothing;
    return html`
      <div class="icon" part="icon">
        <slot name="icon"></slot>
      </div>
    `;
  }

  private renderAction(): TemplateResult {
    return html`
      <div class="action" part="action">
        <obc-check-button
          .type=${CheckButtonType.checkbox}
          .checkboxAppearance=${CheckButtonCheckboxAppearance.updated}
          .checked=${this.actionChecked}
          .disabled=${this.actionDisabled}
          @check-button-click=${this.handleActionChange}
        ></obc-check-button>
      </div>
    `;
  }

  private handleActionChange = (event: ObcCheckButtonClickEvent): void => {
    this.actionChecked = event.detail.checked;

    const status: ObcCheckboxChangeEvent['detail']['status'] = event.detail
      .checked
      ? CheckboxStatus.checked
      : CheckboxStatus.unchecked;

    const resolvedItemId = this.itemId.trim() || this.id.trim() || null;
    this.dispatchEvent(
      new CustomEvent('action-change', {
        detail: {
          itemId: resolvedItemId,
          status,
          disabled: this.actionDisabled,
        },
        bubbles: true,
        composed: true,
      }) as ObcFormItemActionChangeEvent
    );
  };

  private renderStatus(): TemplateResult {
    const icon =
      this.statusIcon === ObcFormItemStatusIcon.Dash
        ? html`<obi-check-mixed></obi-check-mixed>`
        : html`<obi-check-google></obi-check-google>`;

    return html` <div class="status" part="status">${icon}</div> `;
  }

  private renderLeading(): TemplateResult | typeof nothing {
    const items: Array<TemplateResult | typeof nothing> = [];

    if (this.type === ObcFormItemType.EnabledActionFirst) {
      items.push(this.renderAction());
    }

    if (this.type === ObcFormItemType.FilledStatusFirst) {
      items.push(this.renderStatus());
    }

    items.push(this.renderIcon());

    const content = items.filter((item) => item !== nothing);
    if (content.length === 0) return nothing;

    return html` <div class="leading" part="leading">${content}</div> `;
  }

  private renderTrailing(): TemplateResult | typeof nothing {
    if (this.type === ObcFormItemType.EnabledActionLast) {
      return html`
        <div class="trailing" part="trailing">${this.renderAction()}</div>
      `;
    }

    if (this.type === ObcFormItemType.FilledStatusLast) {
      return html`
        <div class="trailing" part="trailing">${this.renderStatus()}</div>
      `;
    }

    return nothing;
  }

  override render() {
    const resolvedHasShader =
      this.hasBuiltInShader || (this.supportsShaderToggle && this.hasShader);
    const wrapperClassMap = {
      wrapper: true,
      [`basic-state-${this.resolvedBasicState}`]: true,
      [`type-${this.type}`]: true,
      'has-error': this.isActionType && this.hasError,
      'has-icon': this.hasIcon,
      'has-shader': resolvedHasShader,
    };

    return html`
      <div class=${classMap(wrapperClassMap)} part="wrapper">
        <div class="content-container" part="content-container">
          ${resolvedHasShader
            ? html`
                <div class="shader-container" part="shader-container">
                  <div class="shader" part="shader"></div>
                  <div class="divider" part="divider"></div>
                </div>
              `
            : nothing}
          ${this.renderLeading()}
          <div class="text" part="text">
            <slot></slot>
          </div>
          ${this.renderTrailing()}
        </div>
        ${this.isActionType && this.hasError && this.errorText.trim() !== ''
          ? html`<div class="error-text" part="error-text">
              ${this.errorText.trim()}
            </div>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-form-item': ObcFormItem;
  }
}
