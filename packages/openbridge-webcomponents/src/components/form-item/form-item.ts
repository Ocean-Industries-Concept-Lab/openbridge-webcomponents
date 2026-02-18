import {LitElement, html, nothing, unsafeCSS, type TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './form-item.css?inline';
import '../checkbox/checkbox.js';
import '../../icons/icon-check-google.js';
import type {ObcCheckboxChangeEvent} from '../checkbox/checkbox.js';

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

export type ObcFormItemActionChangeEvent = CustomEvent<{
  itemId: string | null;
  status: ObcCheckboxChangeEvent['detail']['status'];
  disabled: boolean;
}>;

/**
 * `<obc-form-item>` – A form list item with optional action/status controls,
 * icon support, and multi-line text content.
 *
 * Uses `<obc-checkbox>` for action variants and `<obi-check-google>` for status
 * variants. The main text content is provided through the default slot and
 * supports multi-line text.
 *
 * @slot icon - Optional leading icon (shown when `hasIcon` is true).
 * @slot - Main text content (multi-line).
 * @fires action-change {ObcFormItemActionChangeEvent} - Fired when the internal action checkbox changes.
 */
@customElement('obc-form-item')
export class ObcFormItem extends LitElement {
  /**
   * Visual layout variant of the form item.
   */
  @property({type: String}) type: ObcFormItemType = ObcFormItemType.View;

  /**
   * Optional identifier forwarded in `action-change` detail.
   * Use it to map checkbox changes back to a specific data item in lists.
   */
  @property({type: String, attribute: 'item-id'}) itemId = '';

  /**
   * Shows an error outline around the item.
   * Only applied for action variants.
   */
  @property({type: Boolean, reflect: true, attribute: 'has-error'})
  hasError = false;

  /**
   * Error text shown under the item when `hasError` is true.
   */
  @property({type: String, attribute: 'error-text'}) errorText = '';

  /**
   * Shows a leading icon slot when true.
   * Type-specific layouts can place icon and status together.
   */
  @property({type: Boolean, attribute: 'has-icon'}) hasIcon = false;

  /**
   * Logical state override for non-interactive states.
   * Interactive states (hover/active/focus) are handled via CSS pseudo-classes.
   */
  @property({type: String, attribute: 'basic-state'})
  basicState: ObcFormItemBasicState = ObcFormItemBasicState.Enabled;

  /**
   * Shows the divider shader for view/inactive types only.
   */
  @property({type: Boolean, reflect: true, attribute: 'has-shader'})
  hasShader = false;

  /**
   * Disables the item interactions.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

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
        <obc-checkbox
          label=""
          .disabled=${this.actionDisabled}
          @change=${this.handleActionChange}
        ></obc-checkbox>
      </div>
    `;
  }

  private handleActionChange = (event: ObcCheckboxChangeEvent): void => {
    const resolvedItemId = this.itemId.trim() || this.id.trim() || null;
    this.dispatchEvent(
      new CustomEvent('action-change', {
        detail: {
          itemId: resolvedItemId,
          status: event.detail.status,
          disabled: event.detail.disabled,
        },
        bubbles: true,
        composed: true,
      }) as ObcFormItemActionChangeEvent
    );
  };

  private renderStatus(): TemplateResult {
    return html`
      <div class="status" part="status">
        <obi-check-google></obi-check-google>
      </div>
    `;
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
