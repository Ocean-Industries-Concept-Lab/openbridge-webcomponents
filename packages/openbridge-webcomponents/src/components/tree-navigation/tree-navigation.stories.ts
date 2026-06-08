import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcTreeNavigation} from './tree-navigation.js';
import './tree-navigation.js';
import '../tree-navigation-group/tree-navigation-group.js';
import '../tree-navigation-item/tree-navigation-item.js';
import {TreeTerminalType} from '../tree-navigation-item/tree-navigation-item.js';
import {iconIdToIconHtml} from '../../storybook-util.js';
import {LitElement, html} from 'lit';
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
      <obc-tree-navigation-group label="Vessel" expanded>
        ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
        <obc-tree-navigation-group
          label="Engine room"
          expanded
          .terminalType=${TreeTerminalType.aggregatedHeader}
        >
          ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          <obc-tree-navigation-item label="Main engine" checked>
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
          </obc-tree-navigation-item>
          <obc-tree-navigation-group
            label="Auxiliary engine"
            expanded
            hasAlertBadge
            .alertCount=${3}
          >
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            <obc-tree-navigation-item label="Fuel pump">
              ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            </obc-tree-navigation-item>
            <obc-tree-navigation-item
              label="Starter"
              hasAlertBadge
              .alertCount=${1}
            >
              ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            </obc-tree-navigation-item>
            <obc-tree-navigation-item label="Oil filter">
              ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            </obc-tree-navigation-item>
          </obc-tree-navigation-group>
          <obc-tree-navigation-group label="Cooling system" expanded>
            ${iconIdToIconHtml('placeholder', {slot: 'icon'})}
            <obc-tree-navigation-item label="Seawater pump">
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
 */
@customElement('tree-navigation-selection-demo')
export class TreeNavigationSelectionDemo extends LitElement {
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
