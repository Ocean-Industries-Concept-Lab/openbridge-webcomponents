import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import componentStyle from './tree-navigation-group.css?inline';
import {customElement} from '../../decorator.js';
import {
  ObcTreeNavigationItem,
  TreeBranchType,
  TreeTerminalType,
} from '../tree-navigation-item/tree-navigation-item.js';
import '../tree-navigation-item/tree-navigation-item.js';
import {BadgeType} from '../badge/badge.js';

/**
 * `<obc-tree-navigation-group>` – An expandable parent row in a tree-navigation
 * structure: a header row with an expand/collapse chevron, plus a slot for the
 * child rows it discloses.
 *
 * A group renders an `<obc-tree-navigation-item>` header (carrying its own label,
 * icon, terminal type, and alert badge) followed by its slotted children. When
 * placed inside `<obc-tree-navigation>`, the container computes and assigns the
 * `branches` guide lines for every row automatically from each row's position —
 * a group does not need its depth configured by hand.
 *
 * The group manages only its own open/closed state and forwards header presentation
 * to its internal header item. It does not draw guide lines itself; that is the
 * container's responsibility (see `<obc-tree-navigation>`).
 *
 * ## Features
 * - **Disclosure:** A chevron in the header toggles the slotted children. The open
 *   state is held in `expanded` and reflected so the container and CSS can react.
 * - **Header presentation:** `label`, the `icon` slot, `terminalType`, and the
 *   alert badge (`hasAlertBadge`, `alertCount`, `alertType`) are forwarded to the
 *   header row.
 * - **Selection:** `checked` marks the group's header as the current item.
 * - **Automatic guides:** Inside `<obc-tree-navigation>`, the header's `branches`
 *   are assigned by the container; nested groups continue the guide columns down.
 *
 * ## Usage Guidelines
 * - Nest `<obc-tree-navigation-item>` (leaves) and further `<obc-tree-navigation-group>`
 *   elements as children to build the hierarchy.
 * - Always place groups and items inside an `<obc-tree-navigation>` container so the
 *   guide lines are computed; using a group standalone draws a header with no guides.
 * - Provide a header icon via the `icon` slot (forwarded to the header row).
 *
 * ## Slots
 *
 * | Slot Name | Renders When...          | Purpose                                                      |
 * |-----------|--------------------------|--------------------------------------------------------------|
 * | icon      | `hasIcon` is true        | Leading icon for the group header row.                       |
 * | (default) | Always                   | Child rows (`obc-tree-navigation-item` / `-group`).          |
 *
 * @slot icon - Leading icon for the group header (shown when `hasIcon` is true).
 * @slot - Child rows disclosed when the group is expanded.
 * @fires expand-toggle {CustomEvent<boolean>} Fired when the header is activated; detail is the next `expanded` value.
 */
@customElement('obc-tree-navigation-group')
export class ObcTreeNavigationGroup extends LitElement {
  /** The text label displayed for the group header row. */
  @property({type: String}) label = 'Group';

  /**
   * Guide line to draw for each ancestor level of the header row. Normally set by
   * the parent `<obc-tree-navigation>` container from the group's position; only
   * set it manually when using a group outside the container.
   */
  @property({type: Array}) branches: TreeBranchType[] = [];

  /** Whether the group is expanded, disclosing its children. Rotates the chevron. */
  @property({type: Boolean, reflect: true}) expanded = false;

  /** Whether the group header is the current selection. */
  @property({type: Boolean, reflect: true}) checked = false;

  /** Disables the group header, removing it from the tab order and dimming it. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Whether the group header shows a leading icon (provided via the `icon` slot). */
  @property({type: Boolean, attribute: false}) hasIcon = true;

  /**
   * Terminal type for the header row, controlling the alert-header marker shown in
   * the terminal. One of `regular` (default), `aggregated-header`, or `group-header`.
   */
  @property({type: String}) terminalType: string = TreeTerminalType.regular;

  /** Whether a trailing alert counter badge is shown on the header row. */
  @property({type: Boolean}) hasAlertBadge = false;

  /** The number shown in the header's alert badge when `hasAlertBadge` is true. */
  @property({type: Number}) alertCount = 0;

  /** The severity/type of the header's alert badge. One of the `obc-badge` types (default `alarm`). */
  @property({type: String}) alertType: string = BadgeType.alarm;

  /**
   * The URL to navigate to when the header is activated. If set, the header row
   * renders as a link; otherwise it acts as a button.
   */
  @property({type: String}) href: string | undefined;

  @query('obc-tree-navigation-item') private headerItem?: ObcTreeNavigationItem;

  private onHeaderToggle(event: CustomEvent<boolean>) {
    this.expanded = event.detail;
    this.dispatchEvent(
      new CustomEvent<boolean>('expand-toggle', {detail: this.expanded})
    );
  }

  /** Closes the group (and, recursively, any nested groups inside it). */
  close() {
    this.expanded = false;
    this.querySelectorAll('obc-tree-navigation-group').forEach((group) =>
      group.close()
    );
  }

  public override focus(options?: FocusOptions): void {
    this.headerItem?.focus(options);
  }

  override render() {
    return html`
      <obc-tree-navigation-item
        part="header"
        .label=${this.label}
        .branches=${this.branches}
        expandable
        ?expanded=${this.expanded}
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        .hasLeadingIcon=${this.hasIcon}
        .terminalType=${this.terminalType}
        ?hasAlertBadge=${this.hasAlertBadge}
        .alertCount=${this.alertCount}
        .alertType=${this.alertType}
        .href=${this.href}
        @expand-toggle=${this.onHeaderToggle}
      >
        ${this.hasIcon ? html`<slot name="icon" slot="icon"></slot>` : nothing}
      </obc-tree-navigation-item>
      <div part="children" role="group" ?hidden=${!this.expanded}>
        <slot></slot>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

export type ObcTreeNavigationGroupExpandToggleEvent = CustomEvent<boolean>;

declare global {
  interface HTMLElementTagNameMap {
    'obc-tree-navigation-group': ObcTreeNavigationGroup;
  }
}
