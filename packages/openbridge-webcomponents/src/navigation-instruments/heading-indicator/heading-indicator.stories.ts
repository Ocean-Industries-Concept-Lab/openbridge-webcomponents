import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  HeadingIndicatorType,
  ObcHeadingIndicator,
} from './heading-indicator.js';
import './heading-indicator.js';

const meta: Meta<typeof ObcHeadingIndicator> = {
  title: 'Indicators/Conning Heading Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-heading-indicator',
  parameters: {
    layout: 'centered',
  },
  args: {
    type: HeadingIndicatorType.HDG,
    angle: 0,
    xtd: 0,
  },
  argTypes: {
    angle: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    xtd: {
      control: {type: 'range', min: -1, max: 1, step: 0.01},
    },
    type: {
      control: 'select',
      options: Object.values(HeadingIndicatorType),
    },
  },
} satisfies Meta<ObcHeadingIndicator>;

export default meta;
type Story = StoryObj<ObcHeadingIndicator>;

export const Hdg: Story = {
  args: {
    type: HeadingIndicatorType.HDG,
    angle: 0,
  },
};

export const Xtd: Story = {
  args: {
    type: HeadingIndicatorType.XTD,
    angle: 0,
  },
};
