import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './breadcrumb.css?inline';
import '../../icons/icon-chevron-right-google.js';
import {customElement} from '../../decorator.js';

export interface BreadcrumbItem {
  label: string;
}

/**
 * `<obc-breadcrumb>` – A horizontal breadcrumb navigation component for displaying the user's current location within a hierarchy.
 *
 * Provides a visual trail of links or steps, helping users understand their position and navigate back to previous levels. Commonly used for multi-level navigation paths in applications or websites.
 *
 * ### Features
 * - **Dynamic Items:** Renders a sequence of breadcrumb items based on the provided `items` array.
 * - **Custom Divider Icon:** Uses a chevron icon (`<obi-chevron-right-google>`) as a separator between breadcrumb items.
 * - **Accessible Markup:** Uses semantic `<nav aria-label="Breadcrumb">` and ordered list for improved accessibility.
 * - **Flexible Labels:** Each breadcrumb displays a text label; supports any number of items.
 *
 * ### Usage Guidelines
 * - Use `obc-breadcrumb` to show users their current location in a multi-level navigation structure and to provide easy access to previous steps or parent pages.
 * - Ideal for scenarios where users may need to backtrack or understand the hierarchy of the current view.
 * - Avoid using breadcrumbs for single-level navigation or when the navigation path is always flat.
 * - **TODO(designer):** Clarify if breadcrumb items should be interactive (links) or always static labels, and if there are recommended maximum numbers of items for optimal usability.
 *
 * ### Example:
 * ```
 * <obc-breadcrumb
 *   .items=${[
 *     {label: 'Home'},
 *     {label: 'Section'},
 *     {label: 'Subsection'}
 *   ]}
 * ></obc-breadcrumb>
 * ```
 * This will render: Home › Section › Subsection
 *
 * @slot - (none) This component does not use slots; all content is provided via the `items` property.
 */
@customElement('obc-breadcrumb')
export class ObcBreadcrumb extends LitElement {
  /**
   * The list of breadcrumb items to display, in order from root to current location.
   *
   * Each item should be an object with a `label` property (string). The component renders each label in sequence, separated by a chevron icon.
   *
   * Example: `[ {label: 'Home'}, {label: 'Section'}, {label: 'Page'} ]`
   */
  @property({attribute: false}) items = [] as BreadcrumbItem[];

  override render() {
    return html`
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <ol>
          ${this.items.map(
            (item, i) => html`
              <li>
                ${i > 0
                  ? html`<span class="icon">
                      <obi-chevron-right-google class="divider">
                      </obi-chevron-right-google>
                    </span>`
                  : ''}
                <span class="label">${item.label}</span>
              </li>
            `
          )}
        </ol>
      </nav>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-breadcrumb': ObcBreadcrumb;
  }
}
