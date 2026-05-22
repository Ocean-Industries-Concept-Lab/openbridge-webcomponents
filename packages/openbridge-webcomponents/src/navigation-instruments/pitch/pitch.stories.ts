import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPitch} from './pitch.js';
import './pitch.js';
import {widthDecorator} from '../../storybook-util.js';
import {sideVessels} from '../watch/vessels/storybook-helper.js';

const meta: Meta<typeof ObcPitch> = {
  title: 'Instruments/Pitch',
  tags: ['autodocs', '6.0'],
  component: 'obc-pitch',
  args: {
    width: 400,
    pitch: 3,
    minAvgPitch: -6,
    maxAvgPitch: 6,
    maxPitchAdvice: 5,
    triggerPitchAdvice: true,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    pitch: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    vesselImageSide: {
      control: 'select',
      options: sideVessels,
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcPitch>;

export default meta;
type Story = StoryObj<ObcPitch>;

export const Primary: Story = {
  args: {},
};

export const ZoomedIn: Story = {
  args: {
    zoomToFitArc: true,
  },
};

export const ZoomedInNarrow: Story = {
  args: {
    zoomToFitArc: true,
    arcAngle: 15,
    pitch: 6,
    minAvgPitch: -4,
    maxAvgPitch: 8,
    maxPitchAdvice: 10,
  },
};
