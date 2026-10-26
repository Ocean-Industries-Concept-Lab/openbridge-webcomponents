import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {widthDecorator} from '../../storybook-util.js';
import {Vessel, VesselTypes, ViewType, SensorType} from './vessel.js';
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
        VesselTypes.CARGO_WIND,
        VesselTypes.SOV,
        VesselTypes.PSV,
        VesselTypes.CRUISE,
      ],
      control: {type: 'select'},
    },
    sensorType: {
      options: [
        SensorType.EML,
        SensorType.ECHO,
        SensorType.SATLOG,
        SensorType.DOPPLER,
      ],
      control: {type: 'select'},
    },
    viewMode: {
      options: [ViewType.SIDE, ViewType.TOP, ViewType.BOTH],
      control: {type: 'select'},
    },
    vesselDraftLevel: {
      control: {
        type: 'number',
        step: 0.1,
      },
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
    vesselDraftLevel: 3.1,
    bowToCCRP: 24,
    sternToCCRP: 25,
    sensorToCCRP: 11,
    sensorHeightOverKeel: 2,
    portToCCRP: 15,
    starboardToCCRP: 16,
    sensorPortStarboardOffset: 0,
    vesselType: 'TANKER',
    sensorType: 'ECHO',
    viewMode: 'BOTH',
    toggleSensorA: true,
    toggleSLAndDLSensor: false,
  },
};

export const Vessel_cruiser: Story = {
  args: {
    width: 512,
  },
};
