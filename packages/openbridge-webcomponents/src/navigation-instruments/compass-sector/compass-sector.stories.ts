import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  CompassSectorPriorityElement,
  ObcCompassSector,
  RotType,
} from './compass-sector.js';
import './compass-sector.js';
import {widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {InstrumentState, Priority} from '../types.js';
import {RotPosition} from '../rate-of-turn/rot-renderer.js';

const meta: Meta<typeof ObcCompassSector> = {
  title: 'Instruments/Compass Sector',
  tags: ['autodocs', '6.0'],
  component: 'obc-compass-sector',
  args: {
    width: 512,
    heading: 311,
    courseOverGround: 338,
    headingAdvices: [],
    headingSetpoint: null,
    rotationsPerMinute: 1,
    rotType: undefined,
    rotPosition: RotPosition.innerCircle,
    rotMaxValue: 10,
    touching: false,
    priority: Priority.enhanced,
    tickmarksInside: false,
    priorityElements: [CompassSectorPriorityElement.hdg],
    minFOV: 30,
    zoomToFitArc: true,
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
    headingSetpoint: {control: {type: 'number'}},
    minFOV: {control: {type: 'range', min: 5, max: 180, step: 5}},
    rotationsPerMinute: {
      control: {type: 'range', min: -10, max: 10, step: 0.1},
    },
    rotMaxValue: {control: {type: 'range', min: 1, max: 60, step: 1}},
    rotType: {
      control: 'select',
      options: [undefined, ...Object.values(RotType)],
    },
    rotPosition: {
      control: 'select',
      options: Object.values(RotPosition),
    },
    touching: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    zoomToFitArc: {control: 'boolean'},
    state: {control: 'select', options: Object.values(InstrumentState)},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(CompassSectorPriorityElement),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcCompassSector>;

export default meta;
type Story = StoryObj<ObcCompassSector>;

export const Default: Story = {
  args: {
    headingSetpoint: 311,
  },
};

export const WideAngle: Story = {
  args: {
    heading: 0,
    courseOverGround: 120,
  },
};

export const NarrowAngle: Story = {
  args: {
    heading: 180,
    courseOverGround: 182,
  },
};

export const WithRotBar: Story = {
  args: {
    headingSetpoint: 311,
    rotType: RotType.bar,
    rotationsPerMinute: 5,
  },
};

export const WithRotDots: Story = {
  args: {
    headingSetpoint: 311,
    rotType: RotType.dots,
    rotationsPerMinute: 3,
  },
};

export const WithAdvices: Story = {
  args: {
    headingSetpoint: 311,
    headingAdvices: [
      {
        minAngle: 300,
        maxAngle: 330,
        type: AdviceType.advice,
        hinted: false,
      },
    ],
  },
};

export const WithSetpoint: Story = {
  args: {
    headingSetpoint: 320,
    animateSetpoint: true,
  },
};

export const TickmarksInside: Story = {
  args: {
    headingSetpoint: 311,
    tickmarksInside: true,
  },
};

export const NotZoomed: Story = {
  args: {
    headingSetpoint: 311,
    zoomToFitArc: false,
  },
};

export const ZoomedInWithRotBar: Story = {
  args: {
    heading: 180,
    courseOverGround: 185,
    rotType: RotType.bar,
    rotationsPerMinute: 3,
    headingSetpoint: 182,
    priorityElements: [
      CompassSectorPriorityElement.hdg,
      CompassSectorPriorityElement.rot,
    ],
  },
};

export const WithRotBarEnhanced: Story = {
  args: {
    headingSetpoint: 311,
    rotType: RotType.bar,
    rotationsPerMinute: 5,
    priorityElements: [
      CompassSectorPriorityElement.hdg,
      CompassSectorPriorityElement.rot,
    ],
  },
};
