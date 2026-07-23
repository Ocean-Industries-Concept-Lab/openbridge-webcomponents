import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  CogArrowStyle,
  CompassDirection,
  CompassPriorityElement,
  CompassReadoutSource,
  HdgArrowStyle,
  ObcCompass,
  RotType,
} from './compass.js';
import './compass.js';
import {ReadoutSize} from '../readout/readout.js';
import {html} from 'lit';
import {
  playgroundColumn,
  resizableStoryBox,
  storyHint,
  widthDecorator,
} from '../../storybook-util.js';
import {AdviceType} from '../watch/advice.js';
import {VesselImage} from '../watch/watch.js';
import {topVessels} from '../watch/vessels/storybook-helper.js';
import {InstrumentState, Priority} from '../types.js';
import {RotPosition} from '../rate-of-turn/rot-renderer.js';

const meta: Meta<typeof ObcCompass> = {
  title: 'Instruments/Compass',
  tags: ['autodocs', '6.0'],
  component: 'obc-compass',
  args: {
    width: 512,
    heading: 311,
    courseOverGround: 338,
    headingAdvices: [
      {
        minAngle: 20,
        maxAngle: 50,
        type: AdviceType.advice,
        hinted: false,
      },
    ],
    headingSetpoint: 311,
    currentWindSpeedKnots: 20,
    windFromDirection: 45,
    currentSpeed: 3,
    currentFromDirection: 60,
    rotationsPerMinute: 1,
    rotType: RotType.dots,
    rotPosition: RotPosition.innerCircle,
    rotMaxValue: 10,
    vesselImage: VesselImage.psvTop,
    direction: CompassDirection.NorthUp,
    touching: false,
    priority: Priority.enhanced,
    showLabels: true,
    tickmarksInside: false,
    priorityElements: [CompassPriorityElement.hdg],
  },
  argTypes: {
    width: {control: {type: 'range', min: 32, max: 1028, step: 1}},
    faceDiameter: {
      control: {type: 'range', min: 100, max: 600, step: 10},
      description:
        'Pins the outer-ring diameter in px (fixed intrinsic size, equal circumference across instruments). Clear to return to fill-the-container sizing.',
    },
    heading: {control: {type: 'range', min: 0, max: 360, step: 1}},
    courseOverGround: {control: {type: 'range', min: 0, max: 360, step: 1}},
    headingSetpoint: {control: {type: 'range', min: 0, max: 360, step: 1}},
    currentWindSpeedKnots: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      description: 'Wind speed in knots.',
    },
    windFromDirection: {control: {type: 'range', min: 0, max: 360, step: 1}},
    currentSpeed: {control: {type: 'range', min: 0, max: 4, step: 1}},
    currentFromDirection: {control: {type: 'range', min: 0, max: 360, step: 1}},
    rotationsPerMinute: {
      control: {type: 'range', min: -10, max: 10, step: 0.1},
      description:
        '**Deprecated.** Use `rateOfTurnDegreesPerMinute` instead. NB: storybook recreates the component on change, which resets the animation.',
    },
    rateOfTurnDegreesPerMinute: {
      control: {type: 'range', min: -180, max: 180, step: 1},
      description:
        'Measured rate of turn in degrees per minute (positive = starboard). Drives both the bar extent and (after multiplication by `rotDotAnimationFactor`) the dot animation.',
    },
    rotDotAnimationFactor: {
      control: {type: 'range', min: 1, max: 60, step: 1},
      description:
        'Visual amplification applied only to the spinning dot animation (not bar extent). Default `18` (≈1 rpm at 20°/min).',
    },
    rotType: {
      control: 'select',
      options: Object.values(RotType),
      description:
        'Rate-of-turn display mode: rotating dots or banana-shaped bar (HDG→COG).',
    },
    rotPosition: {
      control: 'select',
      options: Object.values(RotPosition),
      description:
        'Rate-of-turn track position: on the outer scale ring or inner circle.',
    },
    vesselImage: {
      control: 'select',
      options: topVessels,
    },
    hdgArrowStyle: {
      control: 'select',
      options: Object.values(HdgArrowStyle),
    },
    cogArrowStyle: {
      control: 'select',
      options: Object.values(CogArrowStyle),
    },
    centerReadouts: {control: 'object'},
    direction: {
      control: {type: 'select'},
      options: Object.values(CompassDirection),
    },
    touching: {control: 'boolean'},
    showLabels: {control: 'boolean'},
    tickmarksInside: {control: 'boolean'},
    state: {control: 'select', options: Object.values(InstrumentState)},
    priority: {control: 'select', options: Object.values(Priority)},
    priorityElements: {
      control: 'multi-select',
      options: Object.values(CompassPriorityElement),
    },
  },
  decorators: [widthDecorator],
} satisfies Meta<ObcCompass>;

export default meta;
type Story = StoryObj<ObcCompass>;

export const NorthUpInCommand: Story = {
  args: {},
};

export const NorthUpNotInCommand: Story = {
  args: {
    state: InstrumentState.active,
    priority: Priority.regular,
  },
};

export const HeadingUpInCommand: Story = {
  args: {
    direction: CompassDirection.HeadingUp,
  },
};

export const CourseUpInCommand: Story = {
  args: {
    direction: CompassDirection.CourseUp,
  },
};

export const WithLabelsOutside: Story = {
  args: {
    showLabels: true,
    tickmarksInside: false,
  },
};

export const WithLabelsInside: Story = {
  args: {
    showLabels: true,
    tickmarksInside: true,
  },
};

export const WithRotBar: Story = {
  args: {
    rotType: RotType.bar,
    rotationsPerMinute: 5,
  },
};

export const WithRotBarEnhanced: Story = {
  args: {
    rotType: RotType.bar,
    rotationsPerMinute: 5,
    priorityElements: [CompassPriorityElement.hdg, CompassPriorityElement.rot],
  },
};

export const WithRateOfTurnDegreesPerMinute: Story = {
  tags: ['skip-test'],
  args: {
    rotType: RotType.bar,
    rateOfTurnDegreesPerMinute: 20,
    rotDotAnimationFactor: 18,
    rotMaxValue: 60,
    priorityElements: [CompassPriorityElement.hdg, CompassPriorityElement.rot],
  },
};

export const WithCenterReadout: Story = {
  args: {
    centerReadouts: [{source: CompassReadoutSource.hdg}],
  },
};

export const WithTwoPrimaryReadouts: Story = {
  args: {
    centerReadouts: [
      {source: CompassReadoutSource.hdg},
      {source: CompassReadoutSource.cog, size: ReadoutSize.large},
    ],
  },
};

export const WithPrimarySecondaryReadouts: Story = {
  args: {
    centerReadouts: [
      {source: CompassReadoutSource.hdg},
      {source: CompassReadoutSource.cog},
    ],
  },
};

export const WithThreeReadouts: Story = {
  args: {
    rateOfTurnDegreesPerMinute: 12,
    centerReadouts: [
      {source: CompassReadoutSource.hdg},
      {source: CompassReadoutSource.cog},
      {source: CompassReadoutSource.rot},
    ],
  },
};

/**
 * The "map graphics" recipe: CCRP vessel, HDG vector with beam crossbar and
 * astern line, COG arrow head, the rate-of-turn bar, and outside NSWE labels.
 */
export const MapGraphics: Story = {
  args: {
    vesselImage: VesselImage.psvTop,
    hdgArrowStyle: HdgArrowStyle.vector,
    cogArrowStyle: CogArrowStyle.arrowHead,
    rotType: RotType.bar,
    rotPosition: RotPosition.innerCircle,
    rateOfTurnDegreesPerMinute: 20,
    rotMaxValue: 60,
    showLabels: true,
    tickmarksInside: false,
    priorityElements: [CompassPriorityElement.hdg, CompassPriorityElement.rot],
  },
};

export const WithHdgArrowStyles: Story = {
  name: 'With HDG Arrow Styles',
  parameters: {widthDecorator: false},
  render: () => html`
    <div style="display: flex; gap: 16px;">
      ${Object.values(HdgArrowStyle).map(
        (style) => html`
          <div style="width: 240px;">
            <div style="width: 240px; height: 240px;">
              <obc-compass
                .heading=${311}
                .courseOverGround=${338}
                .vesselImage=${VesselImage.psvTop}
                .hdgArrowStyle=${style}
                .cogArrowStyle=${CogArrowStyle.arrowHead}
              ></obc-compass>
            </div>
            <div style="text-align: center; font-family: sans-serif;">
              ${style}
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const WithCogArrowStyles: Story = {
  name: 'With COG Arrow Styles',
  parameters: {widthDecorator: false},
  render: () => html`
    <div style="display: flex; gap: 16px;">
      ${Object.values(CogArrowStyle).map(
        (style) => html`
          <div style="width: 240px;">
            <div style="width: 240px; height: 240px;">
              <obc-compass
                .heading=${311}
                .courseOverGround=${338}
                .vesselImage=${VesselImage.psvTop}
                .hdgArrowStyle=${HdgArrowStyle.vector}
                .cogArrowStyle=${style}
              ></obc-compass>
            </div>
            <div style="text-align: center; font-family: sans-serif;">
              ${style}
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const SmallContainer: Story = {
  name: 'Small Container (250px, Labels + Decor Reserve)',
  args: {
    width: 250,
  },
};

type SizingPlaygroundArgs = Partial<ObcCompass> & {
  lockFaceDiameter?: boolean;
};

/**
 * Interactive sizing playground: drag the dashed box's bottom-right corner to
 * resize it. The first compass is pinned to a fixed intrinsic size by the
 * `faceDiameter` control, while the second adapts to the remaining flex
 * space, reserving room for the NSWE labels, north arrow and wind symbols
 * adaptively (issue #1021). Enable `lockFaceDiameter` to pin both to the same
 * circumference. Related: *Sizing Playground* stories under Building
 * Blocks/Watch, Building Blocks/Instrument Radial and Instruments/Gauge
 * Radial.
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
      {label: 'compass A', heading: 311},
      {label: 'compass B', heading: 45},
    ];
    const fd = (index: number) =>
      index === 0 || args.lockFaceDiameter ? args.faceDiameter : undefined;
    const caption = (index: number, label: string) =>
      fd(index) !== undefined
        ? `${label} — pinned ${fd(index)}px`
        : `${label} — adaptive (flex)`;
    return html`
      ${storyHint(
        'Drag the bottom-right corner of the dashed box to resize it. The first compass is pinned by the faceDiameter control; the second adapts to the remaining flex space. Enable lockFaceDiameter to pin both to the same circumference.'
      )}
      ${resizableStoryBox(
        html`
          ${instances.map((g, index) =>
            playgroundColumn(
              caption(index, g.label),
              html`
                <obc-compass
                  .heading=${g.heading}
                  .courseOverGround=${g.heading + 27}
                  .currentWindSpeedKnots=${20}
                  .windFromDirection=${45}
                  .showLabels=${true}
                  .faceDiameter=${fd(index)}
                ></obc-compass>
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
