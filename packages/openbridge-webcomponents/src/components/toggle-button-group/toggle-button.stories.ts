import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcToggleButtonGroup} from './toggle-button-group.js';
import './toggle-button-group.js';
import '../toggle-button-option/toggle-button-option.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import {ObcToggleButtonOptionType, ObcToggleButtonOptionVariant} from '../toggle-button-option/toggle-button-option.js';

const meta: Meta<typeof ObcToggleButtonGroup> = {
  title: 'Button/Toggle button',
  tags: ['autodocs'],
  args: {
    value: '1',
    hugText: false,
    type: ObcToggleButtonOptionType.regular,
  },
  parameters: {
    actions: {
      handles: ['value'],
    },
  },
  argTypes: {
    value: {
      options: ['1', '2', '3'],
      control: {type: 'select'},
    },
    type: {
      options: Object.values(ObcToggleButtonOptionType),
      control: {type: 'select'},
    },
    variant: {
      options: Object.values(ObcToggleButtonOptionVariant),
      control: {type: 'select'},
    },
    hugText: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html` <div
      style="width: ${args.variant === ObcToggleButtonOptionVariant.iconText
        ? '400px'
        : '300px'}"
    >
      <obc-toggle-button-group value="${args.value}" type="${args.type}" variant="${args.variant}" .hugText="${args.hugText}">
        <obc-toggle-button-option value="1" type="${args.type}" variant="${args.variant}" .hugText="${args.hugText}"
          >Option 1
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option value="2" type="${args.type}" variant="${args.variant}"
          >Option 2
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option value="3" type="${args.type}" variant="${args.variant}"
          >Option 3
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>`,
} satisfies Meta<ObcToggleButtonGroup>;

export default meta;
type Story = StoryObj<ObcToggleButtonGroup>;

export const IconTextUnder: Story = {
  args: {
    variant: ObcToggleButtonOptionVariant.iconTextUnder,
  },
};

export const IconText: Story = {
  args: {
    variant: ObcToggleButtonOptionVariant.iconText,
  },
};

export const Icon: Story = {
  args: {
    variant: ObcToggleButtonOptionVariant.icon,
  },
};

export const Text: Story = {
  args: {
    variant: ObcToggleButtonOptionVariant.text,
  },
};
