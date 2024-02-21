import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcTooltip, TooltipVariant} from './tooltip';
import './tooltip';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';
import {html} from 'lit';

const meta: Meta<typeof ObcTooltip> = {
  title: 'Alerts & Notifications/Tooltip',
  tags: ['autodocs'],
  component: 'obc-tooltip',
  args: {
    variant: TooltipVariant.neutral,
    label: 'Title',
    text: 'Short text to tell what the note is about',
    icon: '01-placeholder',
  },
  render: (args) =>
    html`<obc-tooltip
      variant="${args.variant}"
      title="${args.label}"
      text="${args.text}"
      ?right-arrow=${args.rightArrow}
    >
      ${iconIdToIconHtml(args.icon as unknown as string, {slot: 'icon'})}
    </obc-tooltip>`,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: Object.values(TooltipVariant),
    },
    label: {
      control: 'text',
    },
    rightArrow: {
      control: 'boolean',
    },
    text: {
      control: 'text',
    },
    icon: {
      control: {
        type: 'select',
      },
      options: iconIds,
    },
  },
} satisfies Meta<ObcTooltip>;

export default meta;
type Story = StoryObj<ObcTooltip>;

export const Neutral: Story = {
  args: {
    variant: TooltipVariant.neutral,
  },
};

export const NeutralRight: Story = {
  args: {
    variant: TooltipVariant.neutral,
    rightArrow: true,
  },
};

export const Notification: Story = {
  args: {
    variant: TooltipVariant.notification,
  },
};

export const Caution: Story = {
  args: {
    variant: TooltipVariant.caution,
  },
};

export const Warning: Story = {
  args: {
    variant: TooltipVariant.warning,
  },
};

export const Alarm: Story = {
  args: {
    variant: TooltipVariant.alarm,
  },
};
