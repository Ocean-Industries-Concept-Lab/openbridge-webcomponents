import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './title-container.css?inline';
import '../icon-button/icon-button.js';

/**
 * Visual state for `<obc-title-container>`.
 *
 * - `enabled` — Active colors for title and label.
 * - `inactive` — Dimmed colors for title and label.
 */
export enum TitleContainerState {
  Enabled = 'enabled',
  Inactive = 'inactive',
}

/**
 * `<obc-title-container>` — A horizontal title bar with optional icon and action buttons.
 *
 * Used at the top of form containers and other card-like surfaces. Displays a
 * bold title, an optional label, an optional leading icon, and up to two
 * trailing action buttons (flat `obc-icon-button`).
 *
 * ### Slots and Properties — dual API
 * - **`title` slot / `title` property:** Bold title text. Use the slot for
 *   rich text (e.g. `<span slot="title">CO<sub>2</sub></span>`); the string
 *   property serves as fallback.
 * - **`label` slot / `label` property:** Regular-weight label text next to the
 *   title. Same dual pattern.
 * - **`icon` slot:** Leading icon (shown when `hasIcon` is true).
 * - **`action-1` / `action-2` slots:** Icons placed inside flat
 *   `obc-icon-button` instances (shown when `hasAction1` / `hasAction2`
 *   are true).
 *
 * ### Example
 * ```html
 * <obc-title-container title="Settings" label="General" hasIcon hasAction1>
 *   <obi-settings slot="icon"></obi-settings>
 *   <obi-edit slot="action-1"></obi-edit>
 * </obc-title-container>
 * ```
 *
 * @slot icon - Leading icon before the title (shown when `hasIcon` is true).
 * @slot title - Rich text title (falls back to `title` property).
 * @slot label - Rich text label (falls back to `label` property).
 * @slot action-1 - Icon for the first action button (shown when `hasAction1` is true).
 * @slot action-2 - Icon for the second action button (shown when `hasAction2` is true).
 * @keywords title container, title bar, header, heading, icon, action button, form header, section header, label
 */
@customElement('obc-title-container')
export class ObcTitleContainer extends LitElement {
  /** Controls enabled / inactive styling. */
  @property({type: String}) state: TitleContainerState =
    TitleContainerState.Enabled;

  /** Title text (slot fallback). */
  @property({type: String}) override title = '';

  /** Label text next to the title (slot fallback). */
  @property({type: String}) label = '';

  /** Show the leading icon slot. */
  @property({type: Boolean}) hasIcon = false;

  /** Show the first action icon-button. */
  @property({type: Boolean}) hasAction1 = false;

  /** Show the second action icon-button. */
  @property({type: Boolean}) hasAction2 = false;

  override render() {
    const showActions = this.hasAction1 || this.hasAction2;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          [`state-${this.state}`]: true,
        })}
      >
        <div class="divider"></div>
        <div class="title-area">
          ${this.hasIcon
            ? html`<div class="icon">
                <slot name="icon"></slot>
              </div>`
            : nothing}
          <div class="title-text">
            <slot name="title">${this.title}</slot>
          </div>
          <div class="label-text">
            <slot name="label">${this.label}</slot>
          </div>
        </div>
        ${showActions
          ? html`<div class="actions">
              ${this.hasAction1
                ? html`<obc-icon-button variant="flat">
                    <slot name="action-1"></slot>
                  </obc-icon-button>`
                : nothing}
              ${this.hasAction2
                ? html`<obc-icon-button variant="flat">
                    <slot name="action-2"></slot>
                  </obc-icon-button>`
                : nothing}
            </div>`
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-title-container': ObcTitleContainer;
  }
}
