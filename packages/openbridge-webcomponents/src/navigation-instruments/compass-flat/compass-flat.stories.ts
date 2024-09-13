import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCompassFlat} from './compass-flat';
import './compass-flat';
import {beta6Decorator, widthDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcCompassFlat> = {
  title: 'Navigation Instruments/Compass flat',
  tags: ['autodocs'],
  component: 'obc-compass-flat',
  args: {
    width: 512,
    heading: 24,
    courseOverGround: 0,
    labels: [
      {angle: 0, text: 'N'},
      {angle: 45, text: 'NE'},
      {angle: 90, text: 'E'},
      {angle: 135, text: 'SE'},
      {angle: 180, text: 'S'},
      {angle: 225, text: 'SW'},
      {angle: 270, text: 'W'},
      {angle: 315, text: 'NW'},
    ],
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
  },
  decorators: [widthDecorator, beta6Decorator],
} satisfies Meta<ObcCompassFlat>;

export default meta;
type Story = StoryObj<ObcCompassFlat>;

export const Primary: Story = {
  args: {},
};
