import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { ObcTabRow, TabData } from './tab-row.js';
import './tab-row.js';
import '../tab-item/tab-item.js';
import '../icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcTabRow> = {
  title: 'UI Components/Navigation/Tab Row',
  component: "obc-tab-row",
  tags: ['6.0'],
  argTypes: {
    tabs: { control: 'object' },
    selectedTabId: { control: 'text' },
    hasClose: { control: 'boolean' },
    hug: { control: 'boolean' },
    hasAddNewTab: { control: 'boolean' },
  },
  args: {
    hasClose: true,
    hug: false,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
};
export default meta;
type Story = StoryObj<ObcTabRow>;

const defaultTabs: TabData[] = [
  { id: 'tab1', title: 'Tab 1' },
  { id: 'tab2', title: 'Tab 2' },
  { id: 'tab3', title: 'Tab 3' },
  { id: 'tab4', title: 'Tab 4' },
  { id: 'tab5', title: 'Tab 5' },
];

function InteractiveTabRow(args: any) {
  let tabCounter = (args.tabs?.length || 0);

  const container = document.createElement('div');
  const tabRow = document.createElement('obc-tab-row');

  let currentTabs = args.tabs ? JSON.parse(JSON.stringify(args.tabs)) : [];
  tabRow.tabs = currentTabs;
  tabRow.selectedTabId = args.selectedTabId || '';
  tabRow.hasClose = args.hasClose ?? true;
  tabRow.hug = args.hug ?? false;
  tabRow.hasAddNewTab = args.hasAddNewTab ?? true;

  tabRow.addEventListener('tab-selected', (e) => {
    tabRow.selectedTabId = e.detail.id;
  });
  tabRow.addEventListener('tab-closed', (e) => {
    currentTabs = currentTabs.filter(tab => tab.id !== e.detail.id);
    tabRow.tabs = currentTabs;
    if (tabRow.selectedTabId === e.detail.id && currentTabs.length) {
      tabRow.selectedTabId = currentTabs[0].id;
    }
  });
  tabRow.addEventListener('add-new-tab', () => {
    tabCounter += 1;
    const newTab = { id: `tab${tabCounter}`, title: `Tab ${tabCounter}` };
    currentTabs = [...currentTabs, newTab];
    tabRow.tabs = currentTabs;
    tabRow.selectedTabId = newTab.id;
  });

  container.appendChild(tabRow);
  return html`${container}`;
}

export const Primary: Story = {
  args: {
    tabs: defaultTabs,
    hasClose: true,
    hug: false,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
  render: InteractiveTabRow,
};

export const HugMode: Story = {
  args: {
    tabs: defaultTabs,
    hug: true,
    hasClose: true,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
  render: InteractiveTabRow,
};

export const NoClose: Story = {
  args: {
    tabs: defaultTabs,
    hasClose: false,
    hug: false,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
  render: InteractiveTabRow,
};

export const HugModeNoClose: Story = {
  args: {
    tabs: defaultTabs,
    hug: true,
    hasClose: false,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
  render: InteractiveTabRow,
};

export const WithAddNewTab: Story = {
  args: {
    tabs: defaultTabs.slice(0, 3),
    hasAddNewTab: true,
    hasClose: true,
    hug: false,
    selectedTabId: 'tab1',
  },
  render: InteractiveTabRow,
};

export const WithBadges: Story = {
  args: {
    tabs: [
      { id: 'tab1', title: 'Inbox', hasBadge: true, badgeCount: 12 },
      { id: 'tab2', title: 'Notifications', hasBadge: true, badgeCount: 3, badgeType: 'alert' },
      { id: 'tab3', title: 'Updates', hasBadge: true, badgeCount: 99 },
      { id: 'tab4', title: 'Messages' },
    ],
    selectedTabId: 'tab1',
    hasAddNewTab: true,
    hasClose: true,
    hug: false,
  },
  render: InteractiveTabRow,
};

export const DisabledTabs: Story = {
  args: {
    tabs: [
      { id: 'tab1', title: 'Active Tab' },
      { id: 'tab2', title: 'Disabled Tab', disabled: true },
      { id: 'tab3', title: 'Another Active' },
      { id: 'tab4', title: 'Also Disabled', disabled: true },
    ],
    selectedTabId: 'tab1',
    hasAddNewTab: true,
    hasClose: true,
    hug: false,
  },
  render: InteractiveTabRow,
};

export const NoLeadingIcons: Story = {
  args: {
    tabs: [
      { id: 'tab1', title: 'No Icon Tab', hasLeadingIcon: false },
      { id: 'tab2', title: 'With Icon Tab' },
      { id: 'tab3', title: 'Another No Icon', hasLeadingIcon: false },
    ],
    selectedTabId: 'tab1',
    hasAddNewTab: true,
    hasClose: true,
    hug: false,
  },
  render: InteractiveTabRow,
};