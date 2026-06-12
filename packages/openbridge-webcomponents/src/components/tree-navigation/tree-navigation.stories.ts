import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcTreeNavigation} from './tree-navigation.js';
import './tree-navigation.js';
import '../tree-navigation-group/tree-navigation-group.js';
import '../tree-navigation-item/tree-navigation-item.js';
import {TreeTerminalType} from '../tree-navigation-item/tree-navigation-item.js';
import type {TreeNavigationItemAlerts} from '../tree-navigation-item/tree-navigation-item.js';
import {iconIdToIconHtml} from '../../storybook-util.js';
import {LitElement, html, type TemplateResult} from 'lit';
import {state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-tree-navigation>` builds the guide lines automatically from the nested
 * markup. Write groups and items as real nested elements; the container assigns
 * each row's `branches` from its position. Click a group header to expand or
 * collapse — the guides recompute to match.
 */
const meta: Meta<typeof ObcTreeNavigation> = {
  title: 'UI Components/Menus and Navigation/Tree Navigation',
  tags: ['autodocs', '6.0'],
  component: 'obc-tree-navigation',
  render: () => html`
    <obc-tree-navigation>
      <obc-tree-navigation-group
        label="Vessel"
        .alerts=${{aggregate: true, countLevelHigh: 3}}
        expanded
      >
        ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
        <obc-tree-navigation-group
          label="Engine room"
          expanded
          .alerts=${{aggregate: true, countLevelHigh: 3}}
          .terminalType=${TreeTerminalType.aggregatedHeader}
        >
          ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          <obc-tree-navigation-item
            label="Main engine"
            checked
            .alerts=${{countLevelHigh: 1}}
          >
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          </obc-tree-navigation-item>
          <obc-tree-navigation-group
            label="Auxiliary engine"
            expanded
            .alerts=${{aggregate: true, countLevelHigh: 1}}
          >
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            <obc-tree-navigation-item label="Fuel pump">
              ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            </obc-tree-navigation-item>
            <obc-tree-navigation-item
              label="Starter"
              .alerts=${{countLevelHigh: 1}}
            >
              ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            </obc-tree-navigation-item>
            <obc-tree-navigation-item label="Oil filter">
              ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            </obc-tree-navigation-item>
          </obc-tree-navigation-group>
          <obc-tree-navigation-group
            label="Cooling system"
            expanded
            .alerts=${{aggregate: true, countLevelHigh: 1}}
          >
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            <obc-tree-navigation-item
              label="Seawater pump"
              .alerts=${{countLevelHigh: 1}}
            >
              ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            </obc-tree-navigation-item>
          </obc-tree-navigation-group>
        </obc-tree-navigation-group>
        <obc-tree-navigation-group label="Bridge" expanded>
          ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          <obc-tree-navigation-item label="Radar">
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          </obc-tree-navigation-item>
          <obc-tree-navigation-item label="Autopilot" disabled>
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          </obc-tree-navigation-item>
          <obc-tree-navigation-item label="ECDIS">
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          </obc-tree-navigation-item>
        </obc-tree-navigation-group>
        <obc-tree-navigation-item label="Deck">
          ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
        </obc-tree-navigation-item>
      </obc-tree-navigation-group>
      <obc-tree-navigation-item label="Shore power">
        ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
      </obc-tree-navigation-item>
    </obc-tree-navigation>
  `,
} satisfies Meta<ObcTreeNavigation>;

export default meta;
type Story = StoryObj<ObcTreeNavigation>;

/**
 * A fully expanded tree. The guide lines — pass-through verticals, intersections,
 * and last-child corners — are all computed by the container from the nested
 * markup. The header rows are groups; the leaves are items.
 */
export const Default: Story = {};

/**
 * `<tree-navigation-selection-demo>` – Wraps the tree to track which leaf is
 * selected. Selection is purely consumer state: it sets `checked` on the chosen
 * item; the container still owns all guide-line logic.
 *
 * Not exported: Storybook treats every module export as a story, so the demo
 * element is kept file-local and registered only via the `@customElement` side
 * effect.
 */
@customElement('tree-navigation-selection-demo')
class TreeNavigationSelectionDemo extends LitElement {
  @state() private selectedLabel = 'Main engine';

  override createRenderRoot() {
    return this;
  }

  private select(label: string) {
    this.selectedLabel = label;
  }

  private leaf(label: string) {
    return html`<obc-tree-navigation-item
      label=${label}
      ?checked=${this.selectedLabel === label}
      @click=${() => this.select(label)}
    >
      ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
    </obc-tree-navigation-item>`;
  }

  override render() {
    return html`
      <obc-tree-navigation>
        <obc-tree-navigation-group label="Vessel" expanded>
          ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          <obc-tree-navigation-group label="Engine room" expanded>
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            ${this.leaf('Main engine')} ${this.leaf('Auxiliary engine')}
            ${this.leaf('Cooling system')}
          </obc-tree-navigation-group>
          <obc-tree-navigation-group label="Bridge" expanded>
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            ${this.leaf('Radar')} ${this.leaf('Autopilot')}
          </obc-tree-navigation-group>
          ${this.leaf('Deck')}
        </obc-tree-navigation-group>
      </obc-tree-navigation>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tree-navigation-selection-demo': TreeNavigationSelectionDemo;
  }
}

/**
 * Click a leaf to select it; click a group chevron to expand or collapse. The
 * container keeps the guide lines correct through every change — the consumer
 * only tracks the selected item.
 */
export const Interactive: Story = {
  render: () =>
    html`<tree-navigation-selection-demo></tree-navigation-selection-demo>`,
};

/** The `alerts` count fields summed across a subtree, most to least severe. */
const COUNT_KEYS = [
  'countLevelCritical',
  'countLevelHigh',
  'countLevelMedium',
  'countLevelLow',
  'countLevelDiagnostic',
] as const satisfies ReadonlyArray<keyof TreeNavigationItemAlerts>;

/** A node in the alert-demo tree: a leaf carries its own counts; a group has children. */
interface AlertNode {
  label: string;
  /** Per-severity counts for a leaf row. */
  alerts?: TreeNavigationItemAlerts;
  /** Child rows; presence makes this node a group. */
  children?: AlertNode[];
}

/**
 * Level severities spread across leaves at several depths. The whole tree totals
 * 1 critical, 3 high, 10 medium, 5 low, and 0 diagnostic, so the rolled-up group
 * totals are easy to verify by eye.
 */
const ALERT_TREE: AlertNode = {
  label: 'Vessel',
  children: [
    {
      label: 'Engine room',
      children: [
        {label: 'Main engine', alerts: {countLevelHigh: 1}},
        {
          label: 'Auxiliary engine',
          children: [
            {label: 'Fuel pump', alerts: {countLevelMedium: 4}},
            {
              label: 'Starter',
              alerts: {countLevelCritical: 1, countLevelLow: 2},
            },
            {label: 'Oil filter', alerts: {countLevelMedium: 2}},
          ],
        },
        {
          label: 'Cooling system',
          children: [
            {
              label: 'Seawater pump',
              alerts: {countLevelHigh: 1, countLevelMedium: 3},
            },
          ],
        },
      ],
    },
    {
      label: 'Bridge',
      children: [
        {label: 'Radar', alerts: {countLevelHigh: 1, countLevelLow: 3}},
        {label: 'Autopilot'},
      ],
    },
    {label: 'Deck', alerts: {countLevelMedium: 1}},
  ],
};

/** Sum every descendant leaf's counts, per severity, for a group header. */
function sumAlerts(node: AlertNode): TreeNavigationItemAlerts {
  if (!node.children) return node.alerts ?? {};
  const total: TreeNavigationItemAlerts = {};
  for (const child of node.children) {
    const childTotal = sumAlerts(child);
    for (const key of COUNT_KEYS) {
      const value = childTotal[key];
      if (value) total[key] = (total[key] ?? 0) + value;
    }
  }
  return total;
}

/**
 * Render a node with every row using the given `aggregate` setting. Group rows
 * carry the summed counts of their whole subtree; leaf rows carry their own
 * counts. With `aggregate` true each row collapses to a single total badge;
 * with it false each row shows one badge per non-zero severity.
 */
function renderAlertNode(node: AlertNode, aggregate: boolean): TemplateResult {
  if (node.children) {
    const alerts: TreeNavigationItemAlerts = {aggregate, ...sumAlerts(node)};
    return html`<obc-tree-navigation-group
      label=${node.label}
      expanded
      .alerts=${alerts}
    >
      ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
      ${node.children.map((child) => renderAlertNode(child, aggregate))}
    </obc-tree-navigation-group>`;
  }
  const alerts = node.alerts ? {aggregate, ...node.alerts} : undefined;
  return html`<obc-tree-navigation-item label=${node.label} .alerts=${alerts}>
    ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
  </obc-tree-navigation-item>`;
}

/**
 * Alerts spread across leaves at several depths, every row with
 * `aggregate: true`. Each group header carries a single badge whose number is
 * the sum of all alerts beneath it (child groups roll up into their parent in
 * turn), styled as the most severe category present — e.g. "Auxiliary engine"
 * totals 9 (1 critical + 6 medium + 2 low) and shows as critical, and "Vessel"
 * totals 19 (1 critical + 3 high + 10 medium + 5 low) and also shows as critical.
 */
export const AggregatedAlertCounts: Story = {
  render: () =>
    html`<obc-tree-navigation>
      ${renderAlertNode(ALERT_TREE, true)}
    </obc-tree-navigation>`,
};

/**
 * The same tree and the same rolled-up totals, but every row with
 * `aggregate: false`: each row renders one badge per non-zero severity instead
 * of a single combined badge. Group headers still sum their whole subtree —
 * e.g. "Auxiliary engine" shows separate critical (1), medium (6), and
 * low (2) badges.
 */
export const PerSeverityAlertCounts: Story = {
  render: () =>
    html`<obc-tree-navigation>
      ${renderAlertNode(ALERT_TREE, false)}
    </obc-tree-navigation>`,
};
