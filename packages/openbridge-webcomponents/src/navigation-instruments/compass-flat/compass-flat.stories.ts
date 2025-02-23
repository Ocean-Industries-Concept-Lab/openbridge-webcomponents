import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCompassFlat} from './compass-flat';
import './compass-flat';
import {widthDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcCompassFlat> = {
  title: 'Navigation Instruments/Compass flat',
  tags: ['autodocs', '6.0'],
  component: 'obc-compass-flat',
  args: {
    width: 512,
    height: 512,
    heading: 45,
    courseOverGround: 50,
    FOVIndicator: false,
    minFOV: 90,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    height: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcCompassFlat>;

export default meta;
type Story = StoryObj<ObcCompassFlat>;

export const Primary: Story = {};

export const WithFOVIndicator: Story = {
  args: {
    FOVIndicator: true,
  },
};
