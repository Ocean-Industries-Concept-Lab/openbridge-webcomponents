import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRichButton, RichButtonDirection} from './rich-button.js';
import './rich-button.js';
import {html} from 'lit';
import '../../icons/icon-placeholder.js';

const meta: Meta<typeof ObcRichButton> = {
  title: 'UI Components/Buttons/Rich Button',
  tags: ['6.0'],
  component: 'obc-rich-button',
  argTypes: {
    direction: {
      control: 'select',
      options: Object.values(RichButtonDirection),
    },
    hasLeadingIcon: {
      control: 'boolean',
    },
    hasTrailingIcon: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
  args: {
    label: 'Label',
    description: 'Description with max two lines',
    direction: RichButtonDirection.Vertical,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    disabled: false,
  },
  render: (args) => html`
    <obc-rich-button
      .label=${args.label}
      .description=${args.description}
      .direction=${args.direction}
      .hasLeadingIcon=${args.hasLeadingIcon}
      .hasTrailingIcon=${args.hasTrailingIcon}
      .disabled=${args.disabled}
      .fullWidth=${args.fullWidth}
      .fullHeight=${args.fullHeight}
    >
      ${args.hasLeadingIcon
        ? html`<div slot="leading-icon">
            <obi-placeholder></obi-placeholder>
          </div>`
        : ''}
      ${args.hasTrailingIcon
        ? html`<div slot="trailing-icon">
            <obi-placeholder></obi-placeholder>
          </div>`
        : ''}
    </obc-rich-button>
  `,
} satisfies Meta<ObcRichButton>;

export default meta;
type Story = StoryObj<ObcRichButton>;

export const Primary: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    direction: RichButtonDirection.Vertical,
    label: 'Label',
    description: 'Description with max two lines',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
};

export const Horizontal: Story = {
  args: {
    direction: RichButtonDirection.Horizontal,
    label: 'Label',
    description: 'Description with max two lines',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    label: 'Label Only',
    description: '',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    label: 'Label',
    description: 'Description with max two lines',
    hasLeadingIcon: false,
    hasTrailingIcon: false,
  },
};

export const LeadingIconOnly: Story = {
  args: {
    label: 'Label',
    description: 'Description with max two lines',
    hasLeadingIcon: true,
    hasTrailingIcon: false,
  },
};

export const TrailingIconOnly: Story = {
  args: {
    label: 'Label',
    description: 'Description with max two lines',
    hasLeadingIcon: false,
    hasTrailingIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    description: 'This button is disabled',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    label: 'Very Long Label That Might Wrap',
    description:
      'This is a very long description that demonstrates how the component handles longer text content and wrapping behavior',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  },
};

export const LongTextVertical: Story = {
  args: {
    label: 'Very Long Label That Might Wrap',
    description:
      'This is a very long description that demonstrates how the component handles longer text content and wrapping behavior',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    direction: RichButtonDirection.Horizontal,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'This is a full width button',
    description:
      'This is a full width button which uses the full width of the container.',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
    direction: RichButtonDirection.Horizontal,
    fullWidth: true,
  },
};
