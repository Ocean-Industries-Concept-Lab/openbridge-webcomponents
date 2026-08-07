import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  IntegrationButtonType,
  IntegrationButtonVariant,
  ObcIntegrationButton,
} from './integration-button.js';
import './integration-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const LONG_STATUS =
  'Very long status for a vessel at sea doing something important';

const renderButton = (args: ObcIntegrationButton, statusText: string) => html`
  <obc-integration-button
    style="width: 320px; display: block;"
    .hasLeadingIcon=${args.hasLeadingIcon}
    .hasTrailingIcon=${args.hasTrailingIcon}
    .hasTrailingIcon2=${args.hasTrailingIcon2}
    .hasStatus=${args.hasStatus}
    .readouts=${args.readouts}
    .selected=${args.selected}
    .disabled=${args.disabled}
    .variant=${args.variant}
    .type=${args.type}
  >
    <obi-placeholder slot="leading-icon"></obi-placeholder>
    <obi-placeholder slot="trailing-icon"></obi-placeholder>
    <obi-placeholder slot="trailing-icon2"></obi-placeholder>
    <div slot="label">Label</div>
    <div slot="status">${statusText}</div>
    <div slot="info-label">Info Label</div>
    <div slot="info-status">Info Status</div>
  </obc-integration-button>
`;

const meta: Meta<ObcIntegrationButton> = {
  title: 'Integration Systems/Integration Button',
  tags: ['alpha'],
  component: 'obc-integration-button',
  args: {
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    hasTrailingIcon2: true,
    hasStatus: false,
    readouts: [
      {label: 'Readout 1', value: 'Value 1', unit: 'Unit 1'},
      {label: 'Readout 2', value: 'Value 2', unit: 'Unit 2'},
    ],
    variant: IntegrationButtonVariant.normal,
    type: IntegrationButtonType.regular,
  },

  globals: {
    backgrounds: {
      value: 'integration-container-global-color',
    },
  },
  render: (args) => renderButton(args, 'Status'),
} satisfies Meta<ObcIntegrationButton>;
export default meta;

export const Primary: StoryObj<ObcIntegrationButton> = {};

export const WithStatus: StoryObj<ObcIntegrationButton> = {
  args: {
    hasStatus: true,
  },
};

export const Selected: StoryObj<ObcIntegrationButton> = {
  args: {
    selected: true,
  },
};

export const Flat: StoryObj<ObcIntegrationButton> = {
  args: {
    variant: IntegrationButtonVariant.flat,
    hasTrailingIcon: false,
  },
};

export const Hug: StoryObj<ObcIntegrationButton> = {
  args: {
    type: IntegrationButtonType.hug,
    hasTrailingIcon: false,
  },
};

export const Rich: StoryObj<ObcIntegrationButton> = {
  args: {
    type: IntegrationButtonType.rich,
  },
};

export const RichWithStatus: StoryObj<ObcIntegrationButton> = {
  args: {
    type: IntegrationButtonType.rich,
    hasStatus: true,
  },
};

export const Disabled: StoryObj<ObcIntegrationButton> = {
  args: {
    type: IntegrationButtonType.rich,
    disabled: true,
  },
};

export const WithLongStatus: StoryObj<ObcIntegrationButton> = {
  args: {
    hasStatus: true,
  },
  render: (args) => renderButton(args, LONG_STATUS),
};

export const HugWithLongStatus: StoryObj<ObcIntegrationButton> = {
  args: {
    type: IntegrationButtonType.hug,
    hasStatus: true,
    hasTrailingIcon: false,
  },
  render: (args) => renderButton(args, LONG_STATUS),
};

export const RichWithLongStatus: StoryObj<ObcIntegrationButton> = {
  args: {
    type: IntegrationButtonType.rich,
    hasStatus: true,
  },
  render: (args) => renderButton(args, LONG_STATUS),
};

export const RichWithLongReadoutLabel: StoryObj<ObcIntegrationButton> = {
  args: {
    type: IntegrationButtonType.rich,
    hasStatus: true,
    readouts: [{label: 'Estimated Time of Arrival', value: '12', unit: 'h'}],
  },
  render: (args) => renderButton(args, 'Status'),
};
