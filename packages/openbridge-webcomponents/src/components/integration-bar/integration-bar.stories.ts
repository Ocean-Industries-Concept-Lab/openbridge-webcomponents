import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ObcIntegrationBar } from './integration-bar.js';
import './integration-bar.js';
import { html } from 'lit';
import '../dropdown-button/dropdown-button.js';

const meta: Meta<typeof ObcIntegrationBar> = {
  title: 'Integration/Integration bar',
  tags: ['6.0'],
  component: "obc-integration-bar",
  args: {
  },
  render: (args) => html`<obc-integration-bar>

      <obc-dropdown-button slot="vessel-selector" integration value="Vessel 1" .options=${[
        {value: 'Vessel 1', label: 'Vessel Name 1'},
        {value: 'Vessel 2', label: 'Vessel Name 2'},
        {value: 'Vessel 3', label: 'Vessel Name 3'},
      ]}>
      </obc-dropdown-button>
  </obc-integration-bar>`,
} satisfies Meta<ObcIntegrationBar>;

export default meta;
type Story = StoryObj<ObcIntegrationBar>;

export const Primary: Story = {
  args: {
  },
}