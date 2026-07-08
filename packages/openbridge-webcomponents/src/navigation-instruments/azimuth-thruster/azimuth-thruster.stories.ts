import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAzimuthThruster} from './azimuth-thruster.js';
import './azimuth-thruster.js';
import {InstrumentState, Priority, Size} from '../types.js';
import {html} from 'lit';
import {resizableStoryBox, widthDecorator} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {PropellerType} from '../thruster/propeller.js';

const meta: Meta<typeof ObcAzimuthThruster> = {
  title: 'Instruments/Azimuth Thruster',
  tags: ['autodocs', '6.0'],
  component: 'obc-azimuth-thruster',
  argTypes: {
    faceDiameter: {
      control: {type: 'range', min: 100, max: 600, step: 10},
      description:
        'Pins the outer-ring diameter in px (fixed intrinsic size, equal circumference across instruments). Clear to return to fill-the-container sizing.',
    },
    thrust: {control: {type: 'range', min: -100, max: 100, step: 1}},
    thrustSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    angle: {control: {type: 'range', min: -180, max: 180, step: 1}},
    angleSetpoint: {control: {type: 'range', min: -180, max: 180, step: 1}},
    state: {
      options: Object.values(InstrumentState),
    },
    topPropeller: {
      options: Object.values(PropellerType),
    },
    bottomPropeller: {
      options: Object.values(PropellerType),
    },
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    primaryTickmarkInterval: {
      control: {type: 'number'},
      description:
        'Interval in degrees for primary tickmarks. undefined = none.',
    },
    secondaryTickmarkInterval: {
      control: {type: 'number'},
      description:
        'Interval in degrees for secondary tickmarks. undefined = none.',
    },
    tertiaryTickmarkInterval: {
      control: {type: 'number'},
      description:
        'Interval in degrees for tertiary tickmarks. undefined = none.',
    },
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    tickmarkStyle: {
      control: 'select',
      options: Object.values(TickmarkStyle),
    },
    touching: {control: 'boolean'},
    priority: {control: 'select', options: Object.values(Priority)},
  },
  args: {
    width: 512,
    autoAtThrustSetpointDeadband: 1,
    autoAtAngleSetpointDeadband: 2,
    thrustSetpointAtZeroDeadband: 0.1,
    touching: false,
    tickmarkStyle: TickmarkStyle.regular,
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcAzimuthThruster>;

export default meta;
type Story = StoryObj<ObcAzimuthThruster>;

export const InCommand: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 70,
    angle: 30,
    angleSetpoint: 40,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    angleAdvices: [
      {minAngle: 20, maxAngle: 50, type: AdviceType.advice, hinted: true},
      {minAngle: 60, maxAngle: 100, type: AdviceType.caution, hinted: true},
    ],
    thrustAdvices: [
      {min: 20, max: 50, type: AdviceType.advice, hinted: true},
      {min: 75, max: 100, type: AdviceType.caution, hinted: true},
      {min: -100, max: -75, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const InCommandDetailedTickmarks: Story = {
  args: {
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    primaryTickmarkInterval: 45,
    secondaryTickmarkInterval: 5,
    tertiaryTickmarkInterval: 1,
    showLabels: true,
  },
};

export const InCommandDetailedTickmarksInside: Story = {
  args: {
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    primaryTickmarkInterval: 45,
    secondaryTickmarkInterval: 5,
    tertiaryTickmarkInterval: 1,
    showLabels: true,
    tickmarksInside: true,
  },
};

export const InCommandAtSetpoint: Story = {
  args: {
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
  },
};

export const Pod: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    topPropeller: PropellerType.single,
    bottomPropeller: PropellerType.cap,
  },
};

export const InCommandAtSetpointManualMode: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 65,
    atThrustSetpoint: true,
    autoAtThrustSetpoint: false,
    angle: 30,
    angleSetpoint: 35,
    atAngleSetpoint: true,
    autoAtAngleSetpoint: false,
    state: InstrumentState.active,
    priority: Priority.enhanced,
  },
};

export const SingleDirection: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    singleDirection: true,
  },
};

export const SingleDirectionWithPropeller: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.active,
    priority: Priority.enhanced,
    singleDirection: true,
    bottomPropeller: PropellerType.single,
  },
};

export const NotInCommand: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 70,
    angle: 30,
    angleSetpoint: 40,
    state: InstrumentState.active,
    priority: Priority.regular,
  },
};

export const NotInCommandAtSetpoint: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: 60,
    angle: 30,
    angleSetpoint: 30,
    state: InstrumentState.active,
    priority: Priority.regular,
  },
};

export const NotInCommandNoSetpoint: Story = {
  args: {
    size: Size.large,
    thrust: 60,
    thrustSetpoint: undefined,
    angle: 30,
    angleSetpoint: undefined,
    state: InstrumentState.active,
    priority: Priority.regular,
  },
};

export const Loading: Story = {
  args: {
    size: Size.large,
    thrust: 0,
    thrustSetpoint: 0,
    angle: 0,
    angleSetpoint: 0,
    state: InstrumentState.loading,
    loading: 60,
  },
};

export const Off: Story = {
  args: {
    size: Size.large,
    thrust: 0,
    thrustSetpoint: 0,
    angle: 0,
    angleSetpoint: 0,
    state: InstrumentState.off,
  },
};

export const OffWithAngleSetpointOverride: Story = {
  args: {
    size: Size.large,
    thrust: 0,
    thrustSetpoint: 0,
    angle: 0,
    angleSetpoint: 0,
    state: InstrumentState.off,
    angleSetpointOverride: true,
    thrustSetpointOverride: false,
    priority: Priority.enhanced,
  },
};

/**
 * Interactive sizing playground: drag the container's bottom-right corner and
 * tweak the `faceDiameter` control. With `faceDiameter` set the thruster
 * keeps a fixed intrinsic size (equal circumference with any other radial
 * instrument sharing the value); clear it and it fills the container,
 * reserving room for the degree labels adaptively (issue #1021). Related:
 * *Sizing Playground* stories under Building Blocks/Watch, Building
 * Blocks/Instrument Radial and Instruments/Gauge Radial.
 */
export const SizingPlayground: Story = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    faceDiameter: 260,
  },
  render: (args) =>
    resizableStoryBox(
      html`
        <div style="flex: 1; min-width: 0; height: 100%;">
          <obc-azimuth-thruster
            .angle=${45}
            .thrust=${60}
            .showLabels=${true}
            .faceDiameter=${args.faceDiameter}
          ></obc-azimuth-thruster>
        </div>
      `,
      {width: 480, height: 400}
    ),
};
