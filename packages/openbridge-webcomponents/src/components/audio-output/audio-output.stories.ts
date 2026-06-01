import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAudioOutput} from './audio-output.js';
import './audio-output.js';

const meta: Meta<ObcAudioOutput> = {
  title: 'UI Components/Media/Audio Output',
  tags: ['6.0'],
  component: 'obc-audio-output',
  args: {},
  argTypes: {
    volume: {
      control: {type: 'range', min: 0, max: 8, step: 1},
      description: 'Volume level from 0 to 8',
    },
    disabled: {
      control: {type: 'boolean'},
      description: 'Whether the component is disabled',
    },
  },
} satisfies Meta<ObcAudioOutput>;

export default meta;
type Story = StoryObj<ObcAudioOutput>;

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
