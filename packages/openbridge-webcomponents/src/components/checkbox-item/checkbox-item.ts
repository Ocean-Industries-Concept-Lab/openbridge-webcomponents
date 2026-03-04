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
          state: CheckboxState.enabled,
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
    if (!container?.matches(':focus-visible')) {
      this.setCheckboxFocusProxyEnabled(false);
      return;
    }

    this.setCheckboxFocusProxyEnabled(true);
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
