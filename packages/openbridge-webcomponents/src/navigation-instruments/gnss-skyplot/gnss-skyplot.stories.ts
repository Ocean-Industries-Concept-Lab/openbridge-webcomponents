import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcGnssSkyplot,
  SatelliteConstellation,
  type Satellite,
} from './gnss-skyplot.js';
import './gnss-skyplot.js';
import {widthDecorator} from '../../storybook-util.js';
import {Priority} from '../types.js';

/** The constellation the BETA design plots (Figma 38647-109359). */
const satellites: Satellite[] = [
  {
    id: '124',
    azimuth: 68,
    elevation: 41,
    constellation: SatelliteConstellation.gps,
    tracked: true,
  },
  {
    id: '23',
    azimuth: 75,
    elevation: 33,
    constellation: SatelliteConstellation.beidou,
    tracked: true,
  },
  {
    id: '1',
    azimuth: 155,
    elevation: 68,
    constellation: SatelliteConstellation.glonass,
    tracked: true,
  },
  {
    id: '129',
    azimuth: 99,
    elevation: 54,
    constellation: SatelliteConstellation.gps,
    tracked: true,
  },
  {
    id: '2',
    azimuth: 109,
    elevation: 63,
    constellation: SatelliteConstellation.gps,
    tracked: true,
  },
  {
    id: '3',
    azimuth: 152,
    elevation: 43,
    constellation: SatelliteConstellation.glonass,
    tracked: true,
  },
  {
    id: '4',
    azimuth: 345,
    elevation: 36,
    constellation: SatelliteConstellation.beidou,
    tracked: true,
  },
  {
    id: '5',
    azimuth: 57,
    elevation: 40,
    constellation: SatelliteConstellation.beidou,
    tracked: true,
  },
  {
    id: '6',
    azimuth: 97,
    elevation: 35,
    constellation: SatelliteConstellation.glonass,
    tracked: true,
  },
  {
    id: '2',
    azimuth: 186,
    elevation: 51,
    constellation: SatelliteConstellation.gps,
    tracked: true,
  },
  {id: '2', azimuth: 263, elevation: 72},
];

/** Every constellation, spread around the compass and up the elevation scale. */
const allConstellations: Satellite[] = [
  ...satellites,
  {
    id: '31',
    azimuth: 20,
    elevation: 8,
    constellation: SatelliteConstellation.galileo,
    tracked: true,
  },
  {
    id: '7',
    azimuth: 290,
    elevation: 22,
    constellation: SatelliteConstellation.galileo,
  },
];

const meta: Meta<typeof ObcGnssSkyplot> = {
  title: 'Instruments/GNSS Skyplot',
  tags: ['autodocs', '6.1', 'experimental'],
  component: 'obc-gnss-skyplot',
  args: {
    // The design draws the face at 512; the marker is sized against that.
    width: 512,
    satellites,
    priority: Priority.regular,
    colorByConstellation: false,
    showLegend: false,
    showLabels: true,
  },
  argTypes: {
    width: {control: {type: 'range', min: 100, max: 1000, step: 1}},
    priority: {control: 'select', options: Object.values(Priority)},
    colorByConstellation: {control: 'boolean'},
    showLegend: {control: 'boolean'},
    showLabels: {control: 'boolean'},
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcGnssSkyplot>;

export default meta;
type Story = StoryObj<ObcGnssSkyplot>;

export const Regular: Story = {
  args: {},
};

export const Enhanced: Story = {
  args: {
    priority: Priority.enhanced,
  },
};

export const Categorical: Story = {
  args: {
    colorByConstellation: true,
    showLegend: true,
  },
};

export const EveryConstellation: Story = {
  args: {
    satellites: allConstellations,
    colorByConstellation: true,
    showLegend: true,
  },
};

export const WithoutLabels: Story = {
  args: {
    showLabels: false,
  },
};

/** An empty sky still reads as an instrument, not as a missing component. */
export const NoSatellites: Story = {
  args: {
    satellites: [],
  },
};

/** The horizon and the zenith, the two ends of the elevation scale. */
export const ElevationExtremes: Story = {
  args: {
    colorByConstellation: true,
    satellites: [
      {
        id: '01',
        azimuth: 0,
        elevation: 90,
        constellation: SatelliteConstellation.gps,
        tracked: true,
      },
      {
        id: '02',
        azimuth: 90,
        elevation: 0,
        constellation: SatelliteConstellation.glonass,
        tracked: true,
      },
      {
        id: '03',
        azimuth: 180,
        elevation: 45,
        constellation: SatelliteConstellation.beidou,
        tracked: true,
      },
      {id: '04', azimuth: 270, elevation: 45},
    ],
  },
};

/** A pinned face renders at a fixed ring circumference, whatever the container. */
export const FaceDiameter: Story = {
  args: {
    width: 600,
    faceDiameter: 256,
    colorByConstellation: true,
  },
};
