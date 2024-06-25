import type { Meta, StoryObj } from '@storybook/web-components';
import { ObcWatch } from './watch';
import './watch';
import { widthDecorator } from '../../storybook-util';

const meta: Meta<typeof ObcWatch> = {
  title: 'Building blocks/Watch',
  tags: ['autodocs'],
  component: 'obc-watch',
  argTypes: {
    width: { control: { type: 'range', min: 32, max: 800, step: 10 } },
    cutAngleStart: { control: { type: 'range', min: 0, max: 360, step: 1 } },
    cutAngleEnd: { control: { type: 'range', min: 0, max: 360, step: 1 } },
  },
  args: {
    width: 400,
  },
  decorators: [
    widthDecorator
  ]
} satisfies Meta<ObcWatch>;

export default meta;
type Story = StoryObj<ObcWatch>;

export const Primary: Story = {
  args: {},
};

export const CutRounded: Story = {
  args: {
    roundInsideCut: true,
    roundOutsideCut: true,
    cutAngleStart: 90,
    cutAngleEnd: 270,
  },
};

export const Cut: Story = {
  args: {
    roundInsideCut: false,
    roundOutsideCut: false,
    cutAngleStart: 90,
    cutAngleEnd: 270,
  },
};