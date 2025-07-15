import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPivotItem, ObcPivotItemDirection} from './pivot-item.js';
import '../pivot-item-group/pivot-item-group.js';
import './pivot-item.js';
import '../../icons/icon-home.js';
import '../../icons/icon-settings-iec.js';
import '../../icons/icon-user.js';
import {html} from 'lit';

// More on how to set up stories at: https://storybook.js.org/docs/web-components/writing-stories/introduction
const meta: Meta<typeof ObcPivotItem> = {
  title: 'UI Components/Buttons/Pivot item',
  tags: ['autodocs', '6.0'],
  component: 'obc-pivot-item-group',
  args: {
    direction: ObcPivotItemDirection.horizontal,
    selectedValue: 'home',
    width: '700px',
    hasLeadingIcon: true,
    hasLabel: true,
    hasDivider: false,
    disabled: false,
  },
  argTypes: {
    direction: {
      control: {type: 'select'},
      options: Object.values(ObcPivotItemDirection),
    },
    selectedValue: {
      control: {type: 'select'},
      options: ['home', 'settings', 'profile'],
    },
    width: {
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
    disabled: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => {
    return html`
      <div style="width: ${args.width};">
        <obc-pivot-item-group
          direction="${args.direction}"
          selectedValue="${args.selectedValue}"
          @change=${(e: CustomEvent) =>
            console.log('Selected:', e.detail.selectedValue)}
        >
          <obc-pivot-item
            value="home"
            direction="${args.direction}"
            label="Home"
            ?hasLeadingIcon=${args.hasLeadingIcon}
            ?hasLabel=${args.hasLabel}
            ?hasDivider=${args.hasDivider}
            ?disabled=${args.disabled}
          >
            ${args.hasLeadingIcon
              ? html`<obi-home slot="icon"></obi-home>`
              : ''}
          </obc-pivot-item>
          <obc-pivot-item
            value="settings"
            direction="${args.direction}"
            label="Settings"
            ?hasLeadingIcon=${args.hasLeadingIcon}
            ?hasLabel=${args.hasLabel}
            ?hasDivider=${args.hasDivider}
            ?disabled=${args.disabled}
          >
            ${args.hasLeadingIcon
              ? html`<obi-settings-iec slot="icon"></obi-settings-iec>`
              : ''}
          </obc-pivot-item>
          <obc-pivot-item
            value="profile"
            direction="${args.direction}"
            label="Profile"
            ?hasLeadingIcon=${args.hasLeadingIcon}
            ?hasLabel=${args.hasLabel}
            ?hasDivider=${args.hasDivider}
            ?disabled=${args.disabled}
          >
            ${args.hasLeadingIcon
              ? html`<obi-user slot="icon"></obi-user>`
              : ''}
          </obc-pivot-item>
        </obc-pivot-item-group>
      </div>
    `;
  },
} satisfies Meta<typeof ObcPivotItem>;

export default meta;
type Story = StoryObj<typeof ObcPivotItem>;

// More on writing stories with args: https://storybook.js.org/docs/web-components/writing-stories/args
export const Horizontal: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    direction: ObcPivotItemDirection.vertical,
    width: 'fit-content',
  },
};

export const IconOnlyHorizontal: Story = {
  args: {
    hasLabel: false,
    hasLeadingIcon: true,
    width: 'fit-content',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When using icons only, use `width: fit-content` on the container that encapsulates the components.',
      },
    },
  },
};

export const IconOnlyVertical: Story = {
  args: {
    direction: ObcPivotItemDirection.vertical,
    width: 'fit-content',
    hasLabel: false,
    hasLeadingIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When using icons only, use `width: fit-content` on the container that encapsulates the components.',
      },
    },
  },
};

export const LabelOnlyHorizontal: Story = {
  args: {
    hasLeadingIcon: false,
    hasLabel: true,
  },
};

export const LabelOnlyVertical: Story = {
  args: {
    direction: ObcPivotItemDirection.vertical,
    width: 'fit-content',
    hasLeadingIcon: false,
    hasLabel: true,
  },
};

export const WithDividerHorizontal: Story = {
  args: {
    hasDivider: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
