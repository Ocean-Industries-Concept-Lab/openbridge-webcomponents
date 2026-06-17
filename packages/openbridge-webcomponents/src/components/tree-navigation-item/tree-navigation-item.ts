import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import componentStyle from './tree-navigation-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-chevron-right-google.js';
import '../../icons/icon-alert-header-aggregated-iec.js';
import '../../icons/icon-alert-header-group-iec.js';
import '../badge/badge.js';
import {AlertType, ALERT_SEVERITY_PRIORITY} from '../../types.js';

/**
 * Guide line drawn for one indentation column. Normally computed by
 * `obc-tree-navigation`; rarely set by hand.
 *
 * - `straight`: vertical pass-through (`│`)
 * - `intersection`: vertical + stub for a non-last child (`├`)
 * - `corner`: half vertical + stub for the last child (`└`)
 * - `blank`: empty spacer
 */
export enum TreeBranchType {
  straight = 'straight',
  intersection = 'intersection',
  corner = 'corner',
  blank = 'blank',
}

/**
 * Terminal type for a tree item, controlling the alert-header marker shown in
 * the terminal (top-right, by the chevron).
 *
 * - `regular`: No marker — a plain expand/collapse terminal.
 * - `aggregatedHeader`: Shows the aggregated alert-header marker, indicating the
 *   node aggregates alerts from its descendants.
 * - `groupHeader`: Shows the group alert-header marker, indicating a grouped set
 *   of alerts beneath the node.
 */
export enum TreeTerminalType {
  regular = 'regular',
  aggregatedHeader = 'aggregated-header',
  groupHeader = 'group-header',
}

/**
 * Per-severity alert counts for a tree row's trailing badge(s). Each `count*`
 * is the number of active alerts of that severity at or beneath the row — the
 * level severities `level-critical`, `level-high`, `level-medium`, `level-low`,
 * and `level-diagnostic`, plus the IEC severities `alarm`, `warning`, and
 * `caution`. Badges are ordered and aggregated by the shared
 * `ALERT_SEVERITY_PRIORITY` ranking, most to least severe.
 *
 * Set `aggregate` to collapse the counts into a single badge showing the total,
 * styled as the highest category present; otherwise one badge is rendered per
 * non-zero count.
 */
export interface TreeNavigationItemAlerts {
  /** Collapse all counts into one badge: total count, highest-severity style. */
  aggregate?: boolean;
  /** Number of level-critical alerts. */
  countLevelCritical?: number;
  /** Number of alarm alerts. */
  countAlarm?: number;
  /** Number of level-high alerts. */
  countLevelHigh?: number;
  /** Number of warning alerts. */
  countWarning?: number;
  /** Number of level-medium alerts. */
  countLevelMedium?: number;
  /** Number of caution alerts. */
  countCaution?: number;
  /** Number of level-low alerts. */
  countLevelLow?: number;
  /** Number of level-diagnostic alerts. */
  countLevelDiagnostic?: number;
}

/**
 * `<obc-tree-navigation-item>` – A single row in a tree- or file-explorer-style
 * navigation list, with indentation guide lines, an optional expand/collapse
 * chevron, a leading icon, a label, and an optional alert badge.
 *
 * Each row represents one node in a hierarchy. Depth is expressed through the
 * `branches` array: one entry per ancestor level, each describing the guide line
 * to draw for that level. The expand chevron lets a node disclose its children,
 * emitting `expand-toggle` so a parent can manage the open/closed state.
 *
 * ## Features
 * - **Indentation guides:** Render one 32px guide column per `branches` entry —
 *   pass-through vertical lines for ancestors that continue, and an elbow
 *   (`intersection`) connecting the row to its parent.
 * - **Expand/collapse:** Set `expandable` to show a chevron that rotates when
 *   `expanded`. The chevron is a visual indicator only — activating the row
 *   fires `expand-toggle` with the next state; manage `expanded` in response.
 *   When `expanded`, a vertical guide descends from the chevron to connect to
 *   the revealed child rows below.
 * - **Terminal type:** `terminalType` adds an alert-header marker in the terminal
 *   (`aggregatedHeader` or `groupHeader`), indicating the node heads a set of
 *   aggregated or grouped alerts.
 * - **Leading icon:** Provide an icon via the `icon` slot (shown when
 *   `hasLeadingIcon`).
 * - **Alert badges:** Trailing counter badges driven by the `alerts` object — a
 *   per-severity count map with one field per level severity (critical, high,
 *   medium, low, diagnostic). By default each non-zero count renders its own
 *   badge, ordered most to least severe by `ALERT_SEVERITY_PRIORITY`; set
 *   `alerts.aggregate` to instead show a single badge with the combined total,
 *   styled as the highest category present.
 * - **Checked state:** `checked` highlights the current selection using the
 *   amplified elevation style. A checked row is the current item and is not
 *   re-selectable — it shows no hover/pressed feedback and fires no `click` or
 *   navigation. An expandable checked row still toggles (fires `expand-toggle`),
 *   so a group that is the current selection can be opened and closed. It stays
 *   keyboard-focusable.
 * - **Link or button:** Set `href` to render the row as a link; otherwise it acts
 *   as a button.
 *
 * ## Usage Guidelines
 * - Use for hierarchical navigation such as file trees, layer panels, or nested
 *   menus. For flat navigation lists, use `obc-navigation-item` instead.
 * - Build `branches` from the row's ancestry: `intersection` for the level that
 *   owns this row, `straight` for ancestors with siblings still to come, and
 *   `blank` for ancestors whose subtrees have ended. When placed inside
 *   `obc-tree-navigation`, the container computes `branches` automatically.
 * - Keep one row `checked` at a time within a tree to mark the current location.
 * - Leaf nodes should leave `expandable` as `false` so no chevron is shown.
 *
 * ## Slots
 *
 * | Slot Name      | Renders When...                 | Purpose                                                                 |
 * |----------------|---------------------------------|-------------------------------------------------------------------------|
 * | icon           | `hasLeadingIcon` is true        | Leading icon for the row, e.g. `<obi-placeholder slot="icon">`.         |
 *
 * @slot icon - Leading icon slot (shown when `hasLeadingIcon` is true).
 * @fires expand-toggle {CustomEvent<boolean>} Fired when an expandable row is activated; detail is the next `expanded` value.
 * @fires click {CustomEvent<void>} Fired when the row is activated.
 */
@customElement('obc-tree-navigation-item')
export class ObcTreeNavigationItem extends LitElement {
  /** The text label displayed for the row. */
  @property({type: String}) label = 'List item';

  /**
   * Guide line for each ancestor level, outermost first; one 32px column per
   * entry. Computed by `obc-tree-navigation` — rarely set by hand.
   */
  @property({type: Array}) branches: TreeBranchType[] = [];

  /** Whether the row shows an expand/collapse chevron. Leave false for leaf nodes. */
  @property({type: Boolean}) expandable = false;

  /** Whether the node is expanded. Rotates the chevron and sets `aria-expanded`. */
  @property({type: Boolean, reflect: true}) expanded = false;

  /**
   * Whether the row is the current selection. Applies the amplified style and
   * makes the row inert to re-selection (no hover/pressed feedback, no `click`
   * or navigation); it remains keyboard-focusable. An expandable checked row
   * still fires `expand-toggle` so a selected group can open and close.
   */
  @property({type: Boolean, reflect: true}) checked = false;

  /** Disables the row, removing it from the tab order and dimming its appearance. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * Whether the row is in the tab order. A tree container manages this as a
   * roving tabindex (one row focusable at a time); standalone rows stay tabbable.
   */
  @property({type: Boolean, attribute: false}) focusable = true;

  /**
   * Whether the row shows a leading icon (provided via the `icon` slot).
   */
  @property({type: Boolean, attribute: false}) hasLeadingIcon = true;

  /**
   * Terminal type, controlling the alert-header marker shown in the terminal.
   * One of `regular` (default), `aggregated-header`, or `group-header`.
   */
  @property({type: String}) terminalType: string = TreeTerminalType.regular;

  /**
   * Per-severity alert counts for the row's trailing badge(s). Omit (or leave
   * every count at 0) for a row with no alerts. See {@link TreeNavigationItemAlerts}.
   *
   * - When `aggregate` is true, a single badge is shown: its number is the sum
   *   of all counts and its severity is the highest category present
   *   (critical → alarm → warning → caution).
   * - Otherwise one badge is shown per count greater than 0, ordered most to
   *   least severe and spaced by the alert-counter spacing token.
   */
  @property({type: Object}) alerts?: TreeNavigationItemAlerts;

  /**
   * The URL to navigate to when the row is activated. If set, the row renders as
   * a link; otherwise it acts as a button.
   */
  @property({type: String}) href: string | undefined;

  @query('.wrapper') private wrapperElement?: HTMLElement;

  /** Focuses the row's interactive wrapper (the host itself is not focusable). */
  public override focus(options?: FocusOptions): void {
    this.wrapperElement?.focus(options);
  }

  /**
   * The badge(s) to render from `alerts`, as `{type, count}` pairs already in
   * severity order, ranked by `ALERT_SEVERITY_PRIORITY`.
   *
   * - No `alerts`, or every count 0 → no badges.
   * - `aggregate` → a single pair: the summed count typed as the highest
   *   category that has any alerts.
   * - Otherwise → one pair per count greater than 0.
   */
  private get alertBadges(): {type: AlertType; count: number}[] {
    const alerts = this.alerts;
    if (!alerts) return [];
    const countByType: Partial<Record<AlertType, number>> = {
      [AlertType.LevelCritical]: alerts.countLevelCritical ?? 0,
      [AlertType.Alarm]: alerts.countAlarm ?? 0,
      [AlertType.LevelHigh]: alerts.countLevelHigh ?? 0,
      [AlertType.Warning]: alerts.countWarning ?? 0,
      [AlertType.LevelMedium]: alerts.countLevelMedium ?? 0,
      [AlertType.Caution]: alerts.countCaution ?? 0,
      [AlertType.LevelLow]: alerts.countLevelLow ?? 0,
      [AlertType.LevelDiagnostic]: alerts.countLevelDiagnostic ?? 0,
    };
    // Order (and, when aggregating, rank) by the shared severity priority,
    // keeping only the severities this component exposes.
    const ranked = ALERT_SEVERITY_PRIORITY.filter(
      (type) => type in countByType
    ).map((type) => ({type, count: countByType[type] ?? 0}));
    if (alerts.aggregate) {
      const total = ranked.reduce((sum, b) => sum + b.count, 0);
      const highest = ranked.find((b) => b.count > 0);
      if (!highest) return [];
      return [{type: highest.type, count: total}];
    }
    return ranked.filter((b) => b.count > 0);
  }

  /** A root-level row has no ancestor columns, so it draws no connector lines. */
  private get isRoot(): boolean {
    return this.branches.length === 0;
  }

  /**
   * All ancestor columns are blank spacers — the row is indented but draws no
   * guide lines, so the terminal connector and dropdown are suppressed too.
   */
  private get isBlankAncestry(): boolean {
    return (
      this.branches.length > 0 &&
      this.branches.every((b) => b === TreeBranchType.blank)
    );
  }

  private activate() {
    if (this.disabled) return;
    // An expandable row always toggles, even when checked — a group that is the
    // current selection must still open and close. A checked leaf, however, is
    // the current selection and is inert (no re-selection click or navigation).
    if (this.expandable) {
      this.dispatchEvent(
        new CustomEvent<boolean>('expand-toggle', {detail: !this.expanded})
      );
    }
    if (this.checked) return;
    this.dispatchEvent(new CustomEvent('click'));
    if (this.href !== undefined) {
      window.location.href = this.href;
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (this.disabled) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this.activate();
  }

  private renderBranch(type: TreeBranchType) {
    const hasVertical =
      type === TreeBranchType.straight ||
      type === TreeBranchType.intersection ||
      type === TreeBranchType.corner;
    const hasHorizontal =
      type === TreeBranchType.intersection || type === TreeBranchType.corner;
    return html`<div
      class=${classMap({branch: true, ['branch-' + type]: true})}
    >
      ${hasVertical ? html`<div class="branch-vertical"></div>` : nothing}
      ${hasHorizontal ? html`<div class="branch-horizontal"></div>` : nothing}
      ${type === TreeBranchType.corner
        ? html`<div class="branch-elbow"></div>`
        : nothing}
    </div>`;
  }

  private renderTerminalHeader() {
    if (this.terminalType === TreeTerminalType.aggregatedHeader) {
      return html`<div class="terminal-header" aria-hidden="true">
        <obi-alert-header-aggregated-iec></obi-alert-header-aggregated-iec>
      </div>`;
    }
    if (this.terminalType === TreeTerminalType.groupHeader) {
      return html`<div class="terminal-header" aria-hidden="true">
        <obi-alert-header-group-iec></obi-alert-header-group-iec>
      </div>`;
    }
    return nothing;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          checked: this.checked,
          disabled: this.disabled,
          'has-icon': this.hasLeadingIcon,
        })}
        role="treeitem"
        aria-expanded=${ifDefined(this.expandable ? this.expanded : undefined)}
        aria-current=${ifDefined(this.checked ? 'page' : undefined)}
        aria-selected=${ifDefined(this.checked ? 'true' : undefined)}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        tabindex=${this.disabled ? -1 : this.focusable ? 0 : -1}
        @click=${this.activate}
        @keydown=${this.handleKeydown}
      >
        <div class="visible-wrapper">
          <div class="tree-node-row">
            ${this.branches.map((branch) => this.renderBranch(branch))}
            <div class="terminal">
              ${this.isRoot || this.isBlankAncestry
                ? nothing
                : html`<div class="terminal-connector"></div>`}
              ${!this.isRoot &&
              !this.isBlankAncestry &&
              this.expandable &&
              this.expanded
                ? html`<div class="terminal-dropdown"></div>`
                : nothing}
              ${this.expandable
                ? html`<div class="chevron" aria-hidden="true">
                    <obi-chevron-right-google></obi-chevron-right-google>
                  </div>`
                : nothing}
              ${this.renderTerminalHeader()}
            </div>
          </div>
          <div class="label-container">
            ${this.hasLeadingIcon
              ? html`<div class="leading-icon">
                  <slot name="icon"></slot>
                </div>`
              : nothing}
            <span part="label" class="label">${this.label}</span>
          </div>
          ${this.alertBadges.length > 0
            ? html`<div class="alert-badges">
                ${this.alertBadges.map(
                  (badge) =>
                    html`<obc-badge
                      class="alert-badge"
                      .type=${badge.type}
                      .number=${badge.count}
                    ></obc-badge>`
                )}
              </div>`
            : nothing}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

export type ObcTreeNavigationItemExpandToggleEvent = CustomEvent<boolean>;

declare global {
  interface HTMLElementTagNameMap {
    'obc-tree-navigation-item': ObcTreeNavigationItem;
  }
}
