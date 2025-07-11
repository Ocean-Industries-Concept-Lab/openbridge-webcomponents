import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPivotItem, ObcPivotItemDirection} from './pivot-item.js';
import './pivot-item.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {html} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcPivotItem> = {
  title: 'UI Components/Buttons/Pivot item',
  tags: ['autodocs', '6.0'],
  component: 'obc-pivot-item',
  args: {
    icon: 'placeholder',
    label: 'Label',
    direction: ObcPivotItemDirection.horizontal,
    hasLeadingIcon: true,
    hasLabel: true,
    hasDivider: false,
    selected: false,
    disabled: false,
    value: 'item-1',
  },
  argTypes: {
    icon: {
      options: iconIds,
      control: {type: 'select'},
    },
    direction: {
      control: {type: 'select'},
      options: Object.values(ObcPivotItemDirection),
    },
    label: {
      control: {type: 'text'},
    },
    hasLeadingIcon: {
      control: {type: 'boolean'},
    },
    hasLabel: {
      control: {type: 'boolean'},
    },
    hasDivider: {
      control: {type: 'boolean'},
    },
    selected: {
      control: {type: 'boolean'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
    value: {
      control: {type: 'text'},
    },
  },
  render: (args) => {
    return html`<obc-pivot-item
      .value=${args.value}
      .label=${args.label}
      .direction=${args.direction}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasLabel=${args.hasLabel}
      .hasDivider=${args.hasDivider}
      .selected=${args.selected}
      .disabled=${args.disabled}
    >
      ${args.hasLeadingIcon && args.icon
        ? iconIdToIconHtml(args.icon as unknown as string, {slot: 'icon'})
        : ''}
    </obc-pivot-item>`;
  },
} satisfies Meta<ObcPivotItem>;

export default meta;
type Story = StoryObj<ObcPivotItem>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Primary: Story = {
  args: {},
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const SelectedDisabled: Story = {
  args: {
    selected: true,
    disabled: true,
  },
};

export const Vertical: Story = {
  args: {
    direction: ObcPivotItemDirection.vertical,
  },
};

export const VerticalSelected: Story = {
  args: {
    direction: ObcPivotItemDirection.vertical,
    selected: true,
  },
};

export const IconOnly: Story = {
  args: {
    hasLabel: false,
    hasLeadingIcon: true,
  },
};

export const IconOnlyVertical: Story = {
  args: {
    direction: ObcPivotItemDirection.vertical,
    hasLabel: false,
    hasLeadingIcon: true,
  },
};

export const LabelOnly: Story = {
  args: {
    hasLeadingIcon: false,
    hasLabel: true,
  },
};

export const LabelOnlyVertical: Story = {
  args: {
    direction: ObcPivotItemDirection.vertical,
    hasLeadingIcon: false,
    hasLabel: true,
  },
};

export const WithDivider: Story = {
  args: {
    hasDivider: true,
  },
};

export const WithDividerSelected: Story = {
  args: {
    hasDivider: true,
    selected: true,
  },
};

export const HorizontalGroup: Story = {
  render: () => {
    return html`
      <div style="display: flex; gap: 8px; align-items: center;">
        <obc-pivot-item
          .value=${'home'}
          .label=${'Home'}
          .direction=${ObcPivotItemDirection.horizontal}
          .hasLeadingIcon=${true}
          .hasLabel=${true}
          .selected=${true}
        >
          ${iconIdToIconHtml('home', {slot: 'icon'})}
        </obc-pivot-item>
        <obc-pivot-item
          .value=${'settings'}
          .label=${'Settings'}
          .direction=${ObcPivotItemDirection.horizontal}
          .hasLeadingIcon=${true}
          .hasLabel=${true}
        >
          ${iconIdToIconHtml('settings', {slot: 'icon'})}
        </obc-pivot-item>
        <obc-pivot-item
          .value=${'profile'}
          .label=${'Profile'}
          .direction=${ObcPivotItemDirection.horizontal}
          .hasLeadingIcon=${true}
          .hasLabel=${true}
        >
          ${iconIdToIconHtml('person', {slot: 'icon'})}
        </obc-pivot-item>
      </div>
    `;
  },
};

export const VerticalGroup: Story = {
  render: () => {
    return html`
      <div style="display: flex; gap: 8px; align-items: center;">
        <obc-pivot-item
          .value=${'home'}
          .label=${'Home'}
          .direction=${ObcPivotItemDirection.vertical}
          .hasLeadingIcon=${true}
          .hasLabel=${true}
          .selected=${true}
        >
          ${iconIdToIconHtml('home', {slot: 'icon'})}
        </obc-pivot-item>
        <obc-pivot-item
          .value=${'settings'}
          .label=${'Settings'}
          .direction=${ObcPivotItemDirection.vertical}
          .hasLeadingIcon=${true}
          .hasLabel=${true}
        >
          ${iconIdToIconHtml('settings', {slot: 'icon'})}
        </obc-pivot-item>
        <obc-pivot-item
          .value=${'profile'}
          .label=${'Profile'}
          .direction=${ObcPivotItemDirection.vertical}
          .hasLeadingIcon=${true}
          .hasLabel=${true}
        >
          ${iconIdToIconHtml('person', {slot: 'icon'})}
        </obc-pivot-item>
      </div>
    `;
  },
};