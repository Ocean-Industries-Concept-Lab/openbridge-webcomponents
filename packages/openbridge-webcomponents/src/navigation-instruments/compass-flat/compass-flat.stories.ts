import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCompassFlat} from './compass-flat';
import './compass-flat';
import {beta6Decorator, widthDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcCompassFlat> = {
  title: 'Navigation Instruments/Compass flat',
  tags: ['autodocs'],
  component: 'obc-compass-flat',
  args: {
    width: 200,
    heading: 0,
    courseOverGround: 180,
    FOVIndicator: true,
    labels: [
      {x: -180, text: 'S'},
      {x: -135, text: 'SW'},
      {x: -90, text: 'W'},
      {x: -45, text: 'NW'},
      {x: 0, text: 'N'},
      {x: 45, text: 'NE'},
      {x: 90, text: 'E'},
      {x: 135, text: 'SE'},
      {x: 180, text: 'S'},
      {x: 225, text: 'SW'},
      {x: 270, text: 'W'},
      {x: 315, text: 'NW'},
      {x: 360, text: 'N'},
      {x: 405, text: 'NE'},
      {x: 450, text: 'E'},
      {x: 495, text: 'SE'},
      {x: 540, text: 'S'},
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
