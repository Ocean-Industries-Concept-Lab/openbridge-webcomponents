import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcHeave} from './heave.js';
import './heave.js';
import {widthDecorator} from '../../storybook-util.js';
import {VesselImage} from '../watch/watch.js';
import {AdviceType} from '../watch/advice.js';

const meta: Meta<typeof ObcHeave> = {
  title: 'Instruments/Heave',
  tags: ['autodocs', '6.0'],
  component: 'obc-heave',
  args: {
    width: 400,
    heave: 0.5,
    minTrendHeave: -1,
    maxTrendHeave: 1,
    instrumentRange: 10,
    vesselImage: VesselImage.psvFore,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    heave: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    minTrendHeave: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    maxTrendHeave: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    draftOffset: {control: {type: 'range', min: -10, max: 10, step: 0.1}},
    vesselImage: {
      control: {type: 'select'},
      options: Object.values(VesselImage),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcHeave>;

export default meta;
type Story = StoryObj<ObcHeave>;

export const Regular: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    enhanced: true,
  },
};

export const Advice: Story = {
  args: {
    advice: [
      {
        min: -10,
        max: -2,
        type: AdviceType.caution,
        hinted: true,
      },
      {min: 2, max: 10, type: AdviceType.caution, hinted: true},
    ],
  },
};
