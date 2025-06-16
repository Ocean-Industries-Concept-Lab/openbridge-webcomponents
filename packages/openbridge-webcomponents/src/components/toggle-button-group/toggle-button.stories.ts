import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcToggleButtonGroup} from './toggle-button-group.js';
import './toggle-button-group.js';
import '../toggle-button-option/toggle-button-option.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';
import {ObcToggleButtonOptionType} from '../toggle-button-option/toggle-button-option.js';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcToggleButtonGroup> = {
  title: 'Button/Toggle button',
  tags: ['autodocs'],
  args: {
    value: '1',
    inlineLabel: false,
  },
  parameters: {
    actions: {
      handles: ['value'],
    },
    inlineLabel: {
      control: {type: 'boolean'},
    },
  },
  argTypes: {
    value: {
      options: ['1', '2', '3'],
      control: {type: 'select'},
    },
  },
  render: (args) =>
    html` <div
      style="width: ${args.type === ObcToggleButtonOptionType.iconText
        ? '400px'
        : '300px'}"
    >
      <obc-toggle-button-group value="${args.value}" type="${args.type}">
        <obc-toggle-button-option value="1" type="${args.type}"
          >Option 1
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option value="2" type="${args.type}"
          >Option 2
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
        <obc-toggle-button-option value="3" type="${args.type}"
          >Option 3
          <obi-placeholder slot="icon"></obi-placeholder>
        </obc-toggle-button-option>
      </obc-toggle-button-group>
    </div>`,
} satisfies Meta<ObcToggleButtonGroup>;

export default meta;
type Story = StoryObj<ObcToggleButtonGroup>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
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
