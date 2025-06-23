import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {CheckButtonType, ObcCheckButton} from './check-button.js';
import './check-button.js';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {html} from 'lit';
import '../../icons/icon-checkbox-checked-filled.js';
import '../../icons/icon-checkbox-uncheck-google.js';
import '../../icons/icon-com-microphone.js';
import '../../icons/icon-com-mic-muted-google.js';

const meta: Meta<typeof ObcCheckButton> = {
  title: 'Button/Check Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-check-button',
  args: {
    label: 'Button',
    icon: 'placeholder',
    type: CheckButtonType.checkbox,
    checked: false,
    hugText: false,
    width: '',
    showIcon: true,
    disabled: false,
  },
  argTypes: {
    type: {
      options: Object.values(CheckButtonType),
      control: {type: 'select'},
    },
    checked: {
      control: {type: 'boolean'},
    },
    hugText: {
      control: {type: 'boolean'},
      description:
        'When true, button width adjusts to content. When false, uses width property or width: 100%',
    },
    width: {
      control: {type: 'text'},
      description:
        'Specific width for the button (e.g., "200px", "10rem"). Only applies when hugText=false',
    },
    showIcon: {
      control: {type: 'boolean'},
      description: 'Whether to show the icon for regular type buttons',
    },
    icon: {
      options: iconIds,
      control: {type: 'select'},
      description: 'Which icon to show for regular type buttons',
    },
    disabled: {
      control: {type: 'boolean'},
    },
    label: {
      control: {type: 'text'},
    },
  },
  render: (args) =>
    html`<obc-check-button
      .type=${args.type}
      .checked=${args.checked}
      .hugText=${args.hugText}
      .width=${args.width}
      .showIcon=${args.showIcon}
      .disabled=${args.disabled}
    >
      ${args.type === CheckButtonType.regular && args.showIcon
        ? iconIdToIconHtml(args.icon as unknown as string, {
            size: '24',
            slot: 'icon',
          })
        : ''}
      ${args.type === CheckButtonType.checkbox
        ? html`
            <obi-checkbox-checked-filled
              slot="checked-icon"
            ></obi-checkbox-checked-filled>
            <obi-checkbox-uncheck-google
              slot="unchecked-icon"
            ></obi-checkbox-uncheck-google>
          `
        : ''}
      ${args.label}
    </obc-check-button>`,
} satisfies Meta<ObcCheckButton>;

export default meta;
type Story = StoryObj<ObcCheckButton>;

// Basic type examples
export const Checkbox: Story = {
  args: {
    type: CheckButtonType.checkbox,
    checked: true,
  },
};

export const Regular: Story = {
  args: {
    type: CheckButtonType.regular,
    checked: true,
  },
};

// Icon control for regular type
export const RegularNoIcon: Story = {
  name: 'Regular (No Icon)',
  args: {
    type: CheckButtonType.regular,
    checked: true,
    showIcon: false,
  },
};

// Width behavior examples
export const HugText: Story = {
  name: 'Hug Text Width',
  args: {
    type: CheckButtonType.checkbox,
    hugText: true,
    checked: true,
  },
};

export const CustomWidth: Story = {
  name: 'Custom Width',
  args: {
    type: CheckButtonType.checkbox,
    hugText: false,
    width: '300px',
    checked: true,
  },
};

export const CustomCheckedIcon: Story = {
  name: 'Custom Checked Icon',
  args: {
    type: CheckButtonType.checkbox,
    checked: true,
  },
  render: (args) =>
    html`<obc-check-button
      .type=${args.type}
      .checked=${args.checked}
      .hugText=${args.hugText}
      .width=${args.width}
    >
      Muted
      <obi-com-microphone slot="checked-icon"></obi-com-microphone>
      <obi-com-mic-muted-google
        slot="unchecked-icon"
      ></obi-com-mic-muted-google>
    </obc-check-button>`,
};

// Disabled state
export const Disabled: Story = {
  args: {
    type: CheckButtonType.checkbox,
    disabled: true,
    checked: true,
  },
};
