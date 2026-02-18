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
 * `<obc-form-group>` – Container for a labeled group of form items.
 *
 * Structure:
 * - title-container (subtitle + text)
 * - content-container (one or more form items)
 *
 * @slot subtitle - Subtitle text (title container)
 * @slot text - Description text (title container)
 * @slot - Form items (one or more)
 * @fires action-change {ObcFormItemActionChangeEvent} - Fired when a nested form item action checkbox changes.
 */
@customElement('obc-form-group')
export class ObcFormGroup extends LitElement {
  /**
   * Visual type of the group (mirrors form item types).
   */
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

    const focusedItem = this.querySelector<HTMLElement>(
      'obc-form-item:focus-within'
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
