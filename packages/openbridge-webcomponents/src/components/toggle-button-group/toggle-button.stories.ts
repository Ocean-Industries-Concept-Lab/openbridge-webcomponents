import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcToggleButtonGroup} from './toggle-button-group.js';
import './toggle-button-group.js';
import '../toggle-button-option/toggle-button-option.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import {
  ObcToggleButtonOptionType,
  ObcToggleButtonOptionVariant,
} from '../toggle-button-option/toggle-button-option.js';

const meta: Meta<typeof ObcToggleButtonGroup> = {
  title: 'UI Components/Buttons/Toggle button - Horizontal',
  tags: ['autodocs'],
  args: {
    value: '1',
    hugText: false,
    variant: ObcToggleButtonOptionVariant.regular,
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
    variant: {
      options: Object.values(ObcToggleButtonOptionVariant),
      control: {type: 'select'},
    },
    type: {
      options: Object.values(ObcToggleButtonOptionType),
      control: {type: 'select'},
    },
    hugText: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html` <div
      style="width: ${args.type === ObcToggleButtonOptionType.iconText
        ? '400px'
        : '300px'}"
    >
      <obc-toggle-button-group
        value="${args.value}"
        variant="${args.variant}"
        type="${args.type}"
        .hugText="${args.hugText}"
      >
        <obc-toggle-button-option
          value="1"
          variant="${args.variant}"
          type="${args.type}"
          .hugText="${args.hugText}"
          >Option 1
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="2"
          variant="${args.variant}"
          type="${args.type}"
          >Option 2
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="3"
          variant="${args.variant}"
          type="${args.type}"
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
    type: ObcToggleButtonOptionType.iconTextUnder,
  },
};

export const IconText: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconText,
  },
};

export const Icon: Story = {
  args: {
    type: ObcToggleButtonOptionType.icon,
  },
};

export const Text: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
  },
};

export const IconTextUnderFlat: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconTextUnder,
    variant: ObcToggleButtonOptionVariant.flat,
  },
};

export const IconTextFlat: Story = {
  args: {
    type: ObcToggleButtonOptionType.iconText,
    variant: ObcToggleButtonOptionVariant.flat,
  },
};

export const IconFlat: Story = {
  args: {
    type: ObcToggleButtonOptionType.icon,
    variant: ObcToggleButtonOptionVariant.flat,
  },
};

export const TextFlat: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.flat,
  },
};

export const DifferentTextLength: Story = {
  args: {
    type: ObcToggleButtonOptionType.text,
    variant: ObcToggleButtonOptionVariant.regular,
  },
  render: (args) =>
    html` <div
      style="width: ${args.type === ObcToggleButtonOptionType.iconText
        ? '600px'
        : '500px'}"
    >
      <obc-toggle-button-group
        value="${args.value}"
        type="${args.type}"
        variant="${args.variant}"
        .hugText="${args.hugText}"
      >
        <obc-toggle-button-option
          value="1"
          type="${args.type}"
          variant="${args.variant}"
          .hugText="${args.hugText}"
          >Option 1 with a long text
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="2"
          type="${args.type}"
          variant="${args.variant}"
          >Short
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option
          value="3"
          type="${args.type}"
          variant="${args.variant}"
          >Longer text
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>`,
};
