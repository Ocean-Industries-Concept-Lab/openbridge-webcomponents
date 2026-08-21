import type {Meta, StoryObj} from '@storybook/web-components';
import {widthDecorator} from '../../storybook-util.js';
import { GnssSkyplotLegend } from './gnss-skyplot-legend.js';
import './gnss-skyplot-legend.js';

const meta: Meta<typeof GnssSkyplotLegend> = {
  title: 'INSTRUMENT/Gnss-Skyplot-Legend',
  tags: ['alpha'],
  component: 'ob-gnss-skyplot-legend',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  args: {
    width: 512
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<GnssSkyplotLegend>;

export default meta;
type Story = StoryObj<GnssSkyplotLegend>;

export const Skyplot: Story = {
  args: {
    width: 512,
  },
};