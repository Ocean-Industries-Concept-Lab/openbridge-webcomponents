import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRudder, ObcRudderVariant} from './rudder.js';
import './rudder.js';
import {widthDecorator} from '../../storybook-util.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {InstrumentState, Priority} from '../types.js';
const meta: Meta<typeof ObcRudder> = {
  title: 'Instruments/Rudder',
  tags: ['autodocs', '6.0'],
  component: 'obc-rudder',
  args: {
    width: 512,
    angle: 30,
    setpoint: 45,
    maxAngle: 90,
    touching: false,
    priority: Priority.enhanced,
    tickmarkStyle: TickmarkStyle.regular,
    zoomToFit: false,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    angle: {control: {type: 'range', min: -90, max: 90, step: 1}},
    maxAngle: {control: {type: 'range', min: 1, max: 90, step: 1}},
    setpoint: {control: {type: 'range', min: -90, max: 90, step: 1}},
    state: {control: {type: 'select'}, options: Object.values(InstrumentState)},
    touching: {control: 'boolean'},
    priority: {control: 'select', options: Object.values(Priority)},
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    tickmarkStyle: {
      control: 'select',
      options: Object.values(TickmarkStyle),
    },
    zoomToFit: {control: 'boolean'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcRudder>;

export default meta;
type Story = StoryObj<ObcRudder>;

export const Primary: Story = {
  args: {},
};

export const Needle: Story = {
  args: {
    variant: ObcRudderVariant.Needle,
  },
};

export const ZoomedIn: Story = {
  args: {
    maxAngle: 45,
    zoomToFit: true,
  },
};

export const ZoomedInNeedle: Story = {
  args: {
    maxAngle: 45,
    variant: ObcRudderVariant.Needle,
    zoomToFit: true,
  },
};

export const ZoomedInNarrow: Story = {
  args: {
    maxAngle: 20,
    zoomToFit: true,
    showLabels: true,
  },
};
