import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationAppBar} from './integration-app-bar.js';
import './integration-app-bar.js';
import '../../components/app-button/app-button.js';
import '../../icons/icon-ship.js';
import {html} from 'lit';

const meta: Meta<typeof ObcIntegrationAppBar> = {
  title: 'Integration Systems/App Bar',
  tags: ['6.0'],
  component: 'obc-integration-app-bar',
  args: {},
  render: () => html`
    <obc-integration-app-bar>
      <obc-app-button slot="apps" size="small" .showLabel=${false} integration>
        <obi-ship slot="icon"></obi-ship>
      </obc-app-button>
      <obc-app-button slot="apps" size="small" .showLabel=${false} integration>
        <obi-ship slot="icon"></obi-ship>
      </obc-app-button>
      <obc-app-button
        slot="apps"
        size="small"
        .showLabel=${false}
        integration
        checked
      >
        <obi-ship slot="icon"></obi-ship>
      </obc-app-button>
    </obc-integration-app-bar>
  `,
} satisfies Meta<ObcIntegrationAppBar>;

export default meta;
type Story = StoryObj<ObcIntegrationAppBar>;

export const Primary: Story = {};

export const WithLabels: Story = {
  render: () => html`
    <obc-integration-app-bar>
      <obc-app-button slot="apps" size="small" label="Vessel 1" integration>
        <obi-ship slot="icon"></obi-ship>
      </obc-app-button>
      <obc-app-button slot="apps" size="small" label="Vessel 2" integration>
        <obi-ship slot="icon"></obi-ship>
      </obc-app-button>
      <obc-app-button
        slot="apps"
        size="small"
        label="Vessel 3"
        integration
        checked
      >
        <obi-ship slot="icon"></obi-ship>
      </obc-app-button>
    </obc-integration-app-bar>
  `,
};
