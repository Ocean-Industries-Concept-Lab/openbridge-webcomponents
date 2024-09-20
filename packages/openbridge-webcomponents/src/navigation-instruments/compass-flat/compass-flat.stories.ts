import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcCompassFlat} from './compass-flat';
import './compass-flat';
import {beta6Decorator, widthDecorator} from '../../storybook-util';
import {LabelPosition} from './compass-flat';

const meta: Meta<typeof ObcCompassFlat> = {
  title: 'Navigation Instruments/Compass flat',
  tags: ['autodocs'],
  component: 'obc-compass-flat',
  args: {
    width: 512,
    heading: 0,
    courseOverGround: 0,
    FOVIndicator: true,
    labels: [
      {x: -180, y: LabelPosition.top, text: 'S'},
      {x: -135, y: LabelPosition.top, text: 'SW'},
      {x: -90, y: LabelPosition.top, text: 'W'},
      {x: -45, y: LabelPosition.top, text: 'NW'},
      {x: 0, y: LabelPosition.top, text: 'N'},
      {x: 45, y: LabelPosition.top, text: 'NE'},
      {x: 90, y: LabelPosition.top, text: 'E'},
      {x: 135, y: LabelPosition.top, text: 'SE'},
      {x: 180, y: LabelPosition.top, text: 'S'},
      {x: 225, y: LabelPosition.top, text: 'SW'},
      {x: 270, y: LabelPosition.top, text: 'W'},
      {x: 315, y: LabelPosition.top, text: 'NW'},
      {x: 360, y: LabelPosition.top, text: 'N'},
      {x: 405, y: LabelPosition.top, text: 'NE'},
      {x: 450, y: LabelPosition.top, text: 'E'},
      {x: 495, y: LabelPosition.top, text: 'SE'},
      {x: 540, y: LabelPosition.top, text: 'S'},
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
