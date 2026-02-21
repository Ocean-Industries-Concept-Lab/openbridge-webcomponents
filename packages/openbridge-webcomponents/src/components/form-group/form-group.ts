import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './form-group.css?inline';

/**
 * Visual type for `<obc-form-group>` container.
 *
 * - `view` — Border only, no background fill.
 * - `enabled` — Border with a light global-color background.
 * - `filled` — Border with a section-color background.
 * - `inactive` — No border, no background fill.
 */
export enum FormGroupType {
  View = 'view',
  Enabled = 'enabled',
  Filled = 'filled',
  Inactive = 'inactive',
}

/**
 * `<obc-form-group>` — A titled container that wraps multiple `<obc-form-item>` children.
 *
 * Provides a subtitle, an optional description, and a rounded bordered container
 * for grouping related form items. The container styling (background, border)
 * is controlled by the `type` property.
 *
 * ### Slots and Properties — dual API
 * - **`subtitle` slot / `subtitle` property:** Bold title text. Use the slot for
 *   rich text (e.g. `<span slot="subtitle">CO<sub>2</sub> Settings</span>`);
 *   the string property serves as fallback.
 * - **`description` slot / `description` property:** Description text below the
 *   subtitle. Same dual pattern.
 * - **Default slot:** For `<obc-form-item>` children.
 *
 * ### Example
 * ```html
 * <obc-form-group type="enabled" subtitle="Checklist" description="Complete all items">
 *   <obc-form-item type="enabled-action-first" label="Task one" showDivider></obc-form-item>
 *   <obc-form-item type="enabled-action-first" label="Task two"></obc-form-item>
 * </obc-form-group>
 * ```
 *
 * @slot - Form item children.
 * @slot subtitle - Rich text subtitle (falls back to `subtitle` property).
 * @slot description - Rich text description (falls back to `description` property).
 */
@customElement('obc-form-group')
export class ObcFormGroup extends LitElement {
  /** Container styling type. */
  @property({type: String}) type: FormGroupType = FormGroupType.View;

  /** Bold title text (slot fallback). */
  @property({type: String}) subtitle = '';

  /** Description text below the subtitle (slot fallback). */
  @property({type: String}) description = '';

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`type-${this.type}`]: true,
        })}
      >
        <div class="title-area">
          <div class="subtitle">
            <slot name="subtitle">${this.subtitle}</slot>
          </div>
          <div class="description">
            <slot name="description">${this.description}</slot>
          </div>
        </div>
        <div class="content-container">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-form-group': ObcFormGroup;
  }
}
