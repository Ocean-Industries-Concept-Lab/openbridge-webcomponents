import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcAzimuthThruster} from './azimuth-thruster.js';
import './azimuth-thruster.js';
import {InstrumentState, Priority, Size} from '../types.js';
import {html} from 'lit';
import {
  playgroundColumn,
  resizableStoryBox,
  storyHint,
  widthDecorator,
} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {TickmarkStyle} from '../watch/tickmark.js';
import {PropellerType} from '../thruster/propeller.js';
import '../rate-of-turn/rate-of-turn.js';
import {
  PORT_STARBOARD_DEFAULT_ELEMENTS,
  PortStarboardElement,
  PortStarboardSides,
} from '../../svghelpers/port-starboard.js';

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

export const PortStarboardAheadStarboard: Story = {
  args: {
    angle: 30,
    thrust: 60,
    angleSetpoint: 30,
    thrustSetpoint: 60,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    portStarboard: true,
  },
};

export const PortStarboardAheadPort: Story = {
  args: {
    angle: 330,
    thrust: 60,
    angleSetpoint: 330,
    thrustSetpoint: 60,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    portStarboard: true,
  },
};

export const PortStarboardAstern: Story = {
  args: {
    angle: 200,
    thrust: -60,
    angleSetpoint: 200,
    thrustSetpoint: -60,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    portStarboard: true,
  },
};

/**
 * Centre tint on the active side only — the port half stays untinted while the
 * unit thrusts to starboard.
 */
export const PortStarboardFaceActiveSide: Story = {
  args: {
    angle: 30,
    thrust: 60,
    angleSetpoint: 45,
    thrustSetpoint: 80,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    portStarboard: true,
    portStarboardSides: PortStarboardSides.active,
  },
};

/**
 * Track tint: the outer scale band split red/green, centre left untinted.
 * The band already exists on the watch face — this colours it for the first
 * time, inserted under the band's own outline strokes.
 */
export const PortStarboardOuterBand: Story = {
  args: {
    angle: 30,
    thrust: 60,
    angleSetpoint: 45,
    thrustSetpoint: 80,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    portStarboard: true,
    portStarboardElements: [
      PortStarboardElement.outerBand,
      PortStarboardElement.bar,
      PortStarboardElement.arrow,
      PortStarboardElement.zeroLine,
    ],
  },
};

/** Track tint on the active side only. */
export const PortStarboardOuterBandActiveSide: Story = {
  args: {
    angle: 30,
    thrust: 60,
    angleSetpoint: 45,
    thrustSetpoint: 80,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    portStarboard: true,
    portStarboardSides: PortStarboardSides.active,
    portStarboardElements: [
      PortStarboardElement.outerBand,
      PortStarboardElement.bar,
      PortStarboardElement.arrow,
      PortStarboardElement.zeroLine,
    ],
  },
};

/** Track tint at neutral: both halves, regular priority, grey value elements. */
export const PortStarboardOuterBandNeutral: Story = {
  args: {
    angle: 0,
    thrust: 0,
    angleSetpoint: 0,
    priority: Priority.regular,
    state: InstrumentState.active,
    portStarboard: true,
    portStarboardElements: [PortStarboardElement.outerBand],
  },
};

export const PortStarboardWithSetpoint: Story = {
  args: {
    angle: 30,
    thrust: 60,
    angleSetpoint: 45,
    thrustSetpoint: 80,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    portStarboard: true,
    portStarboardElements: [
      PortStarboardElement.face,
      PortStarboardElement.bar,
      PortStarboardElement.arrow,
      PortStarboardElement.zeroLine,
      PortStarboardElement.setpoint,
    ],
  },
};

export const PortStarboardBarsOnly: Story = {
  args: {
    angle: 30,
    thrust: 60,
    angleSetpoint: 45,
    thrustSetpoint: 80,
    priority: Priority.enhanced,
    state: InstrumentState.active,
    portStarboard: true,
    portStarboardElements: [
      PortStarboardElement.bar,
      PortStarboardElement.arrow,
    ],
  },
};

/**
 * A/B grid for the open design question "should the setpoint follow the
 * PORT/STBD colors?". Columns: default elements (setpoint stays blue), with
 * the setpoint opted in, and face-only. Rows: regular and enhanced priority.
 */
export const PortStarboardComparison: Story = {
  parameters: {widthDecorator: false},
  render: () => {
    const columns: {label: string; elements: PortStarboardElement[]}[] = [
      {
        label: 'default (setpoint blue)',
        elements: PORT_STARBOARD_DEFAULT_ELEMENTS,
      },
      {
        label: '+ setpoint',
        elements: [
          ...PORT_STARBOARD_DEFAULT_ELEMENTS,
          PortStarboardElement.setpoint,
        ],
      },
      {label: 'face only', elements: [PortStarboardElement.face]},
    ];
    return html`
      <div
        style="display: grid; grid-template-columns: 90px repeat(3, 1fr); gap: 8px; align-items: center; justify-items: center;"
      >
        <div></div>
        ${columns.map(
          (column) =>
            html`<div style="font-size: 12px; color: #888;">
              ${column.label}
            </div>`
        )}
        ${[Priority.regular, Priority.enhanced].map(
          (priority) => html`
            <div style="font-size: 12px; color: #888;">${priority}</div>
            ${columns.map(
              (column) => html`
                <div style="width: 180px; height: 180px;">
                  <obc-azimuth-thruster
                    .angle=${30}
                    .thrust=${60}
                    .angleSetpoint=${45}
                    .thrustSetpoint=${80}
                    .priority=${priority}
                    .state=${InstrumentState.active}
                    .portStarboard=${true}
                    .portStarboardElements=${column.elements}
                  ></obc-azimuth-thruster>
                </div>
              `
            )}
          `
        )}
      </div>
    `;
  },
};

/**
 * Consistency check: the new mode next to an existing `rotPortStarboard`
 * instrument. Both resolve to the same two token pairs.
 */
export const PortStarboardConsistencyWithRot: Story = {
  parameters: {widthDecorator: false},
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="width: 200px; height: 200px;">
        <obc-azimuth-thruster
          .angle=${30}
          .thrust=${60}
          .priority=${Priority.enhanced}
          .state=${InstrumentState.active}
          .portStarboard=${true}
        ></obc-azimuth-thruster>
      </div>
      <div style="width: 200px; height: 200px;">
        <obc-rate-of-turn
          .rateOfTurnDegreesPerMinute=${40}
          .rotPortStarboard=${true}
          .hasTrackBar=${true}
          .priority=${Priority.enhanced}
        ></obc-rate-of-turn>
      </div>
    </div>
  `,
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

type SizingPlaygroundArgs = Partial<ObcAzimuthThruster> & {
  lockFaceDiameter?: boolean;
};

/**
 * Interactive sizing playground: drag the dashed box's bottom-right corner to
 * resize it. The first thruster is pinned to a fixed intrinsic size by the
 * `faceDiameter` control, while the second adapts to the remaining flex
 * space, reserving room for its degree labels adaptively (issue #1021).
 * Enable `lockFaceDiameter` to pin both to the same circumference. Related:
 * *Sizing Playground* stories under Building Blocks/Watch, Building
 * Blocks/Instrument Radial and Instruments/Gauge Radial.
 */
export const SizingPlayground: StoryObj<SizingPlaygroundArgs> = {
  name: 'Sizing Playground — FaceDiameter + Resizable (Manual)',
  tags: ['skip-test'],
  parameters: {widthDecorator: false},
  args: {
    faceDiameter: 240,
    lockFaceDiameter: false,
  },
  argTypes: {
    lockFaceDiameter: {
      control: 'boolean',
      description:
        'Apply faceDiameter to every instance (equal circumference) instead of only the first.',
    },
  },
  render: (args) => {
    const instances = [
      {label: 'thruster A', angle: 45, thrust: 60},
      {label: 'thruster B', angle: -120, thrust: 35},
    ];
    const fd = (index: number) =>
      index === 0 || args.lockFaceDiameter ? args.faceDiameter : undefined;
    const caption = (index: number, label: string) =>
      fd(index) !== undefined
        ? `${label} — pinned ${fd(index)}px`
        : `${label} — adaptive (flex)`;
    return html`
      ${storyHint(
        'Drag the bottom-right corner of the dashed box to resize it. The first thruster is pinned by the faceDiameter control; the second adapts to the remaining flex space. Enable lockFaceDiameter to pin both to the same circumference.'
      )}
      ${resizableStoryBox(
        html`
          ${instances.map((g, index) =>
            playgroundColumn(
              caption(index, g.label),
              html`
                <obc-azimuth-thruster
                  .angle=${g.angle}
                  .thrust=${g.thrust}
                  .showLabels=${true}
                  .faceDiameter=${fd(index)}
                ></obc-azimuth-thruster>
              `,
              {pinned: fd(index) !== undefined}
            )
          )}
        `,
        {width: 680, height: 400}
      )}
    `;
  },
};
