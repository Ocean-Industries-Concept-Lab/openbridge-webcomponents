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
  // Default args (only used for controls panel, not for actual stories)
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

// --- Shared story function: only pass in initial tabs, let component own state ---
function StorybookTabRow(args: any) {
  const tabRow = document.createElement('obc-tab-row') as ObcTabRow;
  // Only pass props once, let component own state after
  tabRow.tabs = args.tabs ? JSON.parse(JSON.stringify(args.tabs)) : [];
  tabRow.selectedTabId = args.selectedTabId || '';
  tabRow.hasClose = args.hasClose ?? true;
  tabRow.hug = args.hug ?? false;
  tabRow.hasAddNewTab = args.hasAddNewTab ?? true;
  // Optionally listen for events to see in action (uncomment to debug)
  // tabRow.addEventListener('tab-selected', (e) => console.log('Tab selected', e.detail));
  // tabRow.addEventListener('tab-closed', (e) => console.log('Tab closed', e.detail));
  // tabRow.addEventListener('add-new-tab', () => console.log('Add new tab'));
  return html`${tabRow}`;
}

// ----- ALL STORIES use the same render pattern -----

export const Primary: Story = {
  args: {
    tabs: defaultTabs,
    hasClose: true,
    hug: false,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
  render: StorybookTabRow,
};

export const HugMode: Story = {
  args: {
    tabs: defaultTabs,
    hug: true,
    hasClose: true,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
  render: StorybookTabRow,
};

export const NoClose: Story = {
  args: {
    tabs: defaultTabs,
    hasClose: false,
    hug: false,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
  render: StorybookTabRow,
};

export const HugModeNoClose: Story = {
  args: {
    tabs: defaultTabs,
    hug: true,
    hasClose: false,
    hasAddNewTab: true,
    selectedTabId: 'tab2',
  },
  render: StorybookTabRow,
};

export const WithAddNewTab: Story = {
  args: {
    tabs: defaultTabs.slice(0, 3),
    hasAddNewTab: true,
    hasClose: true,
    hug: false,
    selectedTabId: 'tab1',
  },
  render: StorybookTabRow,
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
  render: StorybookTabRow,
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
  render: StorybookTabRow,
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
  render: StorybookTabRow,
};


// You can still keep the Interactive story if you want more custom controls!
export const Interactive: Story = {
  render: () => {
    let tabCounter = 4;
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';

    const tabRowEl = document.createElement('obc-tab-row');
    tabRowEl.tabs = [
      { id: 'tab1', title: 'First Tab' },
      { id: 'tab2', title: 'Second Tab' },
      { id: 'tab3', title: 'Third Tab' },
    ];
    tabRowEl.selectedTabId = 'tab2';
    tabRowEl.hasAddNewTab = true;

    tabRowEl.addEventListener('tab-selected', (e) => {
      tabRowEl.selectedTabId = e.detail.id;
    });

    tabRowEl.addEventListener('tab-closed', (e) => {
      tabRowEl.tabs = tabRowEl.tabs.filter((tab: any) => tab.id !== e.detail.id);
      if (tabRowEl.selectedTabId === e.detail.id && tabRowEl.tabs.length) {
        tabRowEl.selectedTabId = tabRowEl.tabs[0].id;
      }
    });

    tabRowEl.addEventListener('add-new-tab', () => {
      const newTabId = `tab${++tabCounter}`;
      const newTab = { id: newTabId, title: `Tab ${tabCounter}` };
      tabRowEl.tabs = [...tabRowEl.tabs, newTab];
      tabRowEl.selectedTabId = newTabId;
    });

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '8px';

    const toggleHugButton = document.createElement('button');
    toggleHugButton.textContent = 'Toggle Hug Mode';
    toggleHugButton.onclick = () => {
      tabRowEl.hug = !tabRowEl.hug;
    };

    const toggleCloseButton = document.createElement('button');
    toggleCloseButton.textContent = 'Toggle Close Buttons';
    toggleCloseButton.onclick = () => {
      tabRowEl.hasClose = !tabRowEl.hasClose;
    };

    const toggleAddButton = document.createElement('button');
    toggleAddButton.textContent = 'Toggle Add New Tab Button';
    toggleAddButton.onclick = () => {
      tabRowEl.hasAddNewTab = !tabRowEl.hasAddNewTab;
    };

    controls.appendChild(toggleHugButton);
    controls.appendChild(toggleCloseButton);
    controls.appendChild(toggleAddButton);

    container.appendChild(tabRowEl);
    container.appendChild(controls);

    return html`${container}`;
  },
};
