import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {widthDecorator} from '../../storybook-util.js';
import {Vessel, VesselTypes, ViewType} from './vessel.js';
import './vessel.js';

const meta: Meta<typeof Vessel> = {
  title: 'INSTRUMENT/Vessel',
  tags: ['autodocs', '6.0'],
  component: 'ob-vessel-view',

  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  args: {
    width: 512,
    height: 264,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    vesselType: {
      options: [
        VesselTypes.CARGO,
        VesselTypes.TANKER,
        VesselTypes.FISHING,
        VesselTypes.CAR_FERRY,
      ],
      control: {type: 'select'},
    },
    viewMode: {
      options: [ViewType.SIDE, ViewType.TOP, ViewType.BOTH],
      control: {type: 'select'},
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<Vessel>;

export default meta;
type Story = StoryObj<Vessel>;

export const Vessel_tanker: Story = {
  args: {
    // width: 512,
    vesselHeight: 40,

    bowToCCRP: 50,
    sternToCCRP: 50,
    sensorToCCRP: 0,
    sensorHeightOverKeel: 50,
    portToCCRP: 15,
    starboardToCCRP: 15,
    sensorPortStarboardOffset: 0,
    vesselType: VesselTypes.CARGO,
    viewMode: ViewType.SIDE,
    toggleSLAndDLSensor: true,
  },
};

export const Vessel_cruiser: Story = {
  args: {
    width: 512,
  },
};
