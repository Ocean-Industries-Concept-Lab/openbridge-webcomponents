import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcIntegrationButton} from './integration-button.js';
import './integration-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcIntegrationButton> = {
  title: 'Integration Systems/Integration Button',
  tags: ['6.0'],
  component: 'obc-integration-button',
  args: {
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasTrailingIcon2: true,
    readouts: [
      {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
      {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
    ],
  },
  globals: {
    background: 'integration-container-global-color',
  },
  render: (args) => html`
    <obc-integration-button
      style="width: 320px; display: block;"
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .hasTrailingIcon2=${args.hasTrailingIcon2}
      .readouts=${args.readouts}
      .selected=${args.selected}
      .disabled=${args.disabled}
    >
      <obi-placeholder slot="leading-icon"></obi-placeholder>
      <obi-placeholder slot="trailing-icon"></obi-placeholder>
      <obi-placeholder slot="trailing-icon2"></obi-placeholder>
      <div slot="label">Label</div>
      <div slot="status">Status</div>
      <div slot="info-label">Info Label</div>
      <div slot="info-status">Info Status</div>
    </obc-integration-button>
  `,
} satisfies Meta<ObcIntegrationButton>;
export default meta;

export const Primary: StoryObj<typeof ObcIntegrationButton> = {};

export const Selected: StoryObj<typeof ObcIntegrationButton> = {
  args: {
    selected: true,
  },
};
