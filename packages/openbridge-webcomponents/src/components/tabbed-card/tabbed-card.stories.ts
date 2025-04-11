import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcTabbedCard} from './tabbed-card.js';
import './tabbed-card.js';
import {html} from 'lit';

const meta = {
  title: 'Navigation/Tabbed Card',
  tags: ['autodocs'],
  component: 'obc-tabbed-card',
} satisfies Meta<ObcTabbedCard>;

export default meta;
type Story = StoryObj<ObcTabbedCard>;

export const Primary: Story = {
  render: () => html`
    <style>
      obc-tabbed-card {
        width: 500px;
        height: 500px;
      }
    </style>
    <obc-tabbed-card nTabs="3">
      <!-- Tab Titles -->
      <span slot="tab-title-0">Overview</span>
      <span slot="tab-title-1">Details</span>
      <span slot="tab-title-2">Settings</span>

      <!-- Tab Contents -->
      <div slot="tab-content-0" class="tab-content">
        <div class="content-box">
          <h3>Overview Content</h3>
          <p>
            This is the overview tab content. The component follows WAI-ARIA
            Tabs Pattern for accessibility.
          </p>
        </div>
      </div>
      <div slot="tab-content-1" class="tab-content">
        <div class="content-box">
          <h3>Details Content</h3>
          <p>
            This tab shows more detailed information. Try using keyboard
            navigation:
          </p>
          <ul>
            <li>Left/Right Arrow: Navigate between tabs</li>
            <li>Home/End: Jump to first/last tab</li>
          </ul>
        </div>
      </div>
      <div slot="tab-content-2" class="tab-content">
        <div class="content-box">
          <h3>Settings Content</h3>
          <p>
            This tab contains settings. The component automatically activates
            tabs on focus.
          </p>
        </div>
      </div>
    </obc-tabbed-card>
  `,
};

export const WithFiveTabs: Story = {
  render: () => html`
    <style>
      obc-tabbed-card {
        width: 500px;
        height: 500px;
      }
    </style>
    <obc-tabbed-card nTabs="5">
      <!-- Tab Titles -->
      <span slot="tab-title-0">Route</span>
      <span slot="tab-title-1">Weather</span>
      <span slot="tab-title-2">Radar</span>
      <span slot="tab-title-3">AIS</span>
      <span slot="tab-title-4">Charts</span>

      <!-- Tab Contents -->
      <div slot="tab-content-0" class="tab-content">
        <div class="content-box navigation-content">
          <h3>Route Planning</h3>
          <p>Active route: New York to Rotterdam</p>
          <p>Distance: 3,461 nautical miles</p>
          <p>ETA: 2024-03-15 14:30 UTC</p>
        </div>
      </div>
      <div slot="tab-content-1" class="tab-content">
        <div class="content-box navigation-content">
          <h3>Weather Conditions</h3>
          <p>Wind: 15 knots NE</p>
          <p>Wave height: 2.5m</p>
          <p>Visibility: Good</p>
        </div>
      </div>
      <div slot="tab-content-2" class="tab-content">
        <div class="content-box navigation-content">
          <h3>Radar Overview</h3>
          <p>Range: 12nm</p>
          <p>Contacts: 3 vessels</p>
          <p>Precipitation: Light rain</p>
        </div>
      </div>
      <div slot="tab-content-3" class="tab-content">
        <div class="content-box navigation-content">
          <h3>AIS Information</h3>
          <p>Vessels in range: 8</p>
          <p>Closest approach: 2.1nm</p>
          <p>CPA Time: 45 minutes</p>
        </div>
      </div>
      <div slot="tab-content-4" class="tab-content">
        <div class="content-box navigation-content">
          <h3>Chart Display</h3>
          <p>Current scale: 1:50,000</p>
          <p>Chart type: ENC</p>
          <p>Updates available: Yes</p>
        </div>
      </div>
    </obc-tabbed-card>
  `,
};
