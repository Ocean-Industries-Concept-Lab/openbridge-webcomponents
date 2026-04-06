import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {CompassFlatPriorityElement, ObcCompassFlat} from './compass-flat.js';
import './compass-flat.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';

const meta: Meta<typeof ObcCompassFlat> = {
  title: 'Instruments/Compass Flat',
  tags: ['autodocs', '6.0'],
  component: 'obc-compass-flat',
  args: {
    width: 512,
    height: 512,
    heading: 45,
    courseOverGround: 50,
    FOVIndicator: false,
    minFOV: 90,
    priority: Priority.enhanced,
    priorityElements: [CompassFlatPriorityElement.hdg],
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    height: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(CompassFlatPriorityElement),
    },
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
