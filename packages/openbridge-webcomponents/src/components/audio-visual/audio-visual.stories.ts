import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAudioVisual} from './audio-visual.js';
import './audio-visual.js';

const meta: Meta<typeof ObcAudioVisual> = {
  title: 'Application Components/Audio Visual',
  tags: ['6.0'],
  component: 'obc-audio-visual',
  args: {},
  argTypes: {
    volume: {
      control: {
        type: 'range',
        min: 0,
        max: 8,
        step: 1,
      },
      description: 'Volume level from 0 to 8',
    },
  },
} satisfies Meta<ObcAudioVisual>;

export default meta;
type Story = StoryObj<ObcAudioVisual>;

export const FullVolume: Story = {
  args: {
    volume: 8,
  },
};

export const HalfVolume: Story = {
  args: {
    volume: 4,
  },
};
export const NoVolume: Story = {
  args: {
    volume: 0,
  },
};
export const Disabled: Story = {
  args: {
    volume: 0,
    disabled: true,
  },
};
