import {LitElement, html, unsafeCSS, type TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './form-group.css?inline';
import type {ObcFormItemActionChangeEvent} from '../form-item/form-item.js';

export enum ObcFormGroupType {
  View = 'view',
  EnabledActionFirst = 'enabled-action-first',
  FilledStatusFirst = 'filled-status-first',
  EnabledActionLast = 'enabled-action-last',
  FilledStatusLast = 'filled-status-last',
  Inactive = 'inactive',
}

/**
 * `<obc-form-group>` groups related form items into one labeled section.
 *
 * **Overview**
 * Use this component as a form section, block, cluster, or fieldset-like list
 * container where multiple `obc-form-item` rows belong together.
 *
 * **Features / Variants**
 * - Supports title metadata (`subtitle` and `text`) above grouped items.
 * - Uses `type` to coordinate visuals with nested form items:
 *   `view`, `enabled-action-first`, `enabled-action-last`,
 *   `filled-status-first`, `filled-status-last`, `inactive`.
 * - Marks first/last/focused slotted items to keep borders and radii correct in
 *   stacked layouts.
 *
 * **Usage Guidelines**
 * - Slot only `obc-form-item` elements in the default slot for predictable
 *   layout and state behavior.
 * - Keep `type` aligned with item type patterns in the same section.
 * - Use `action-change` from this container as the integration event at form
 *   level instead of wiring each item independently.
 *
 * **Slots / Content**
 * - `subtitle`: secondary heading text for the group.
 * - `text`: supporting description text for the group.
 * - default slot: one or more `obc-form-item` rows.
 *
 * **Events**
 * - Re-emits `action-change` from nested items with the original detail.
 *
 * **Best Practices**
 * - Prefer one semantic concern per group.
 * - Keep item order stable so focus and edge markers map consistently.
 * - Use the group as the styling boundary, while item-level behavior remains in
 *   `obc-form-item`.
 *
 * **Example**
 * ```html
 * <obc-form-group type="enabled-action-first">
 *   <span slot="subtitle">Subtitle</span>
 *   <span slot="text">Description</span>
 *   <obc-form-item type="enabled-action-first">Item 1</obc-form-item>
 *   <obc-form-item type="enabled-action-first">Item 2</obc-form-item>
 * </obc-form-group>
 * ```
 *
 * @slot subtitle - Subtitle text rendered in the title area.
 * @slot text - Description text rendered in the title area.
 * @slot - One or more `obc-form-item` elements.
 * @fires action-change {ObcFormItemActionChangeEvent} Fired when a nested form item checkbox state changes.
 */
@customElement('obc-form-group')
export class ObcFormGroup extends LitElement {
  @property({type: String}) type: ObcFormGroupType = ObcFormGroupType.View;

  static override styles = unsafeCSS(componentStyle);

  private handleSlotChange = (): void => {
    this.syncLastItemMarker();
  };

  private handleFocusIn = (): void => {
    this.syncFocusedItemMarker();
  };

  private handleFocusOut = (): void => {
    requestAnimationFrame(() => {
      this.syncFocusedItemMarker();
    });
  };

  override firstUpdated(): void {
    this.syncLastItemMarker();
  }

  private getSlottedItems(): HTMLElement[] {
    return Array.from(
      this.renderRoot.querySelectorAll<HTMLSlotElement>('slot')
    ).flatMap((slot) =>
      slot
        .assignedElements({flatten: true})
        .filter(
          (el): el is HTMLElement =>
            el instanceof HTMLElement && el.tagName === 'OBC-FORM-ITEM'
        )
    );
  }

  private syncLastItemMarker(): void {
    this.querySelectorAll<HTMLElement>('obc-form-item').forEach((item) => {
      item.removeAttribute('data-last-group-item');
      item.removeAttribute('data-group-item-first');
      item.removeAttribute('data-group-item-not-first');
      item.removeAttribute('data-group-item-focused');
      item.removeAttribute('data-group-item-before-focused');
    });

    const slottedItems = this.getSlottedItems();

    slottedItems.forEach((item, index) => {
      if (index === 0) {
        item.setAttribute('data-group-item-first', '');
      } else {
        item.setAttribute('data-group-item-not-first', '');
      }
    });

    const lastItem =
      slottedItems.length > 0
        ? slottedItems[slottedItems.length - 1]
        : undefined;
    if (lastItem) {
      lastItem.setAttribute('data-last-group-item', '');
    }

    this.syncFocusedItemMarker(slottedItems);
  }

  private syncFocusedItemMarker(slottedItems = this.getSlottedItems()): void {
    slottedItems.forEach((item) => {
      item.removeAttribute('data-group-item-focused');
      item.removeAttribute('data-group-item-before-focused');
    });

    const focusedItem = slottedItems.find((item) =>
      item.matches(':focus-within')
    );
    if (!focusedItem) return;

    focusedItem.setAttribute('data-group-item-focused', '');
    const focusedIndex = slottedItems.indexOf(focusedItem);
    if (focusedIndex > 0) {
      slottedItems[focusedIndex - 1].setAttribute(
        'data-group-item-before-focused',
        ''
      );
    }
  }

  private handleItemActionChange = (
    event: ObcFormItemActionChangeEvent
  ): void => {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('action-change', {
        detail: event.detail,
        bubbles: true,
        composed: true,
      }) as ObcFormItemActionChangeEvent
    );
  };

  private renderTitleContainer(): TemplateResult {
    return html`
      <div class="title-container" part="title-container">
        <div class="subtitle" part="subtitle">
          <slot name="subtitle"></slot>
        </div>
        <div class="text" part="text">
          <slot name="text"></slot>
        </div>
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
        ${this.renderTitleContainer()}
        <div
          class="content-container"
          part="content-container"
          @action-change=${this.handleItemActionChange}
          @focusin=${this.handleFocusIn}
          @focusout=${this.handleFocusOut}
        >
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-form-group': ObcFormGroup;
  }
}
