import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationTabs} from './integration-tabs.js';
import './integration-tabs.js';
import {html} from 'lit';

const meta: Meta<typeof ObcIntegrationTabs> = {
  title: 'Integration Systems/Building Blocks/Integration Tabs',
  tags: ['6.0'],
  component: 'obc-integration-tabs',
  args: {},
  globals: {
    backgrounds: {
      value: 'integration-container-global-color',
    },
  },
  render: (args) =>
    html`<obc-integration-tabs .selected=${args.selected}
      >Vessel name</obc-integration-tabs
    >`,
} satisfies Meta<ObcIntegrationTabs>;

export default meta;
type Story = StoryObj<ObcIntegrationTabs>;

export const Primary: Story = {
  args: {},
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
