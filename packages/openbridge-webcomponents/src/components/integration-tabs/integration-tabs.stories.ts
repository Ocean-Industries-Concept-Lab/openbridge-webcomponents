import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcIntegrationTabs } from './integration-tabs.js';
import './integration-tabs.js';
import { html } from 'lit';

const meta: Meta<typeof ObcIntegrationTabs> = {
  title: 'Integration/Building blocks/Integration Tabs',
  tags: ['6.0'],
  component: "obc-integration-tabs",
  args: {
  },
  globals: {
    backgrounds: {
      value: 'integration-container-background-color',
    },
  },
  render: (args) => html`<obc-integration-tabs>Vessel name</obc-integration-tabs>`,
} satisfies Meta<ObcIntegrationTabs>;

export default meta;
type Story = StoryObj<ObcIntegrationTabs>;

export const Primary: Story = {
  args: {
  },
}