import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcMainEngine} from './main-engine.js';
import './main-engine.js';
import {widthDecorator} from '../../storybook-util.js';
import {InstrumentState, Priority} from '../types.js';

const meta: Meta<typeof ObcMainEngine> = {
  title: 'Instruments/Main Engine',
  tags: ['autodocs', '6.0'],
  component: 'obc-main-engine',
  args: {
    width: 352,
    thrust: 50,
    thrustSetpoint: 30,
    speed: 50,
    speedSetpoint: 30,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    thrust: {control: {type: 'range', min: -100, max: 100, step: 1}},
    thrustSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    thrustTouching: {control: 'boolean'},
    speed: {control: {type: 'range', min: 0, max: 100, step: 1}},
    speedSetpoint: {control: {type: 'range', min: 0, max: 100, step: 1}},
    speedTouching: {control: 'boolean'},
    state: {
      options: Object.values(InstrumentState),
    },
    priority: {control: 'select', options: Object.values(Priority)},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcMainEngine>;

export default meta;
type Story = StoryObj<ObcMainEngine>;

export const InCommand: Story = {
  args: {
    state: InstrumentState.active,
    priority: Priority.enhanced,
  },
};

export const NotInCommand: Story = {
  args: {
    state: InstrumentState.active,
    priority: Priority.regular,
  },
};

export const Off: Story = {
  args: {
    state: InstrumentState.off,
    speed: 0,
    thrust: 0,
    speedSetpoint: 0,
    thrustSetpoint: 0,
  },
};
