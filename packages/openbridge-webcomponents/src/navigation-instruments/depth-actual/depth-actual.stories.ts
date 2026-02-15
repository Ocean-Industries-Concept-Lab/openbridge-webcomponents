import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDepthActual} from './depth-actual.js';
import './depth-actual.js';
import {widthDecorator} from '../../storybook-util.js';
import {VesselImage} from '../watch/watch.js';
import {AdviceType} from '../watch/advice.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcDepthActual> = {
  title: 'Instruments/Depth Actual',
  tags: ['autodocs', '6.0'],
  component: 'obc-depth-actual',
  args: {
    width: 400,
    depth: 15,
    draft: 2,
    vesselScale: 1,
    instrumentRange: 50,
    primaryTickbarsInterval: 25,
    secondaryTickbarsInterval: 5,
    vesselImage: VesselImage.psvFore,
    priority: Priority.regular,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    depth: {control: {type: 'range', min: 0, max: 10, step: 0.1}},
    draft: {control: {type: 'range', min: 0, max: 10, step: 0.1}},
    vesselScale: {control: {type: 'range', min: 0.5, max: 2, step: 0.1}},
    vesselImage: {
      control: {type: 'select'},
      options: Object.values(VesselImage),
    },
    priority: {
      control: 'select',
      options: Object.values(Priority),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcDepthActual>;

export default meta;
type Story = StoryObj<ObcDepthActual>;

export const Regular: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const Advice: Story = {
  args: {
    advice: [{min: 0, max: 10, type: AdviceType.caution, hinted: true}],
  },
};
