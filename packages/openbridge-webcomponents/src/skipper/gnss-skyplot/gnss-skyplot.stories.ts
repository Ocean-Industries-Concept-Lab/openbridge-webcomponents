import type {Meta, StoryObj} from '@storybook/web-components';
import {widthDecorator} from '../../storybook-util.js';
import { GnssSkyplot } from './gnss-skyplot.js';
import './gnss-skyplot.js';

const meta: Meta<typeof GnssSkyplot> = {
  title: 'INSTRUMENT/Gnss-Skyplot',
  tags: ['autodocs', '6.0'],
  component: 'ob-gnss-skyplot',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  args: {
    width: 512,
    showGpsSatellites: true,
    showGlonassSatellites: true,
    showGalileioSatellites: true,
    showBeiDouSatellites: true
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<GnssSkyplot>;

export default meta;
type Story = StoryObj<GnssSkyplot>;

export const Skyplot: Story = {
  args: {
    width: 512,
  },
};