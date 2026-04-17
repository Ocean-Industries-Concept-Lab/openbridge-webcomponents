import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcChartObjectVesselButton,
  SpeedIndicator,
  State,
  Type,
} from './chart-object-vessel-button.js';
import {VesselImage} from '../../navigation-instruments/watch/vessel.js';
import {topVessels} from '../../navigation-instruments/watch/vessels/storybook-helper.js';
import './chart-object-vessel-button.js';
import '../../icons/icon-vessel-type-cargo-filled.js';
import '../../icons/icon-placeholder.js';
import '../../icons/icon-own-ship-alternative-filled.js';
import {html} from 'lit';

const meta: Meta<ObcChartObjectVesselButton> = {
  title: 'AR/Chart Object Vessel Button',
  tags: ['skip-test', '6.0'],
  component: 'obc-chart-object-vessel-button',
  args: {
    number: 2,
    name: 'Name',
    heading: 0,
    course: 10,
    ownShipIndicator: false,
    vesselImageSize: 80,
  },
  argTypes: {
    speedIndicator: {
      control: {
        type: 'select',
      },
      options: Object.values(SpeedIndicator),
    },
    state: {
      control: {
        type: 'select',
      },
      options: Object.values(State),
    },
    type: {
      control: {type: 'select'},
      options: Object.values(Type),
    },
    selected: {
      control: {type: 'boolean'},
    },
    vesselImageSize: {
      control: {type: 'range', min: 28, max: 224, step: 1},
    },
    vesselImage: {
      control: 'select',
      options: topVessels,
    },
  },
  render: (args) => html`
    <obc-chart-object-vessel-button
      .heading=${args.heading}
      .course=${args.course}
      .speedIndicator=${args.speedIndicator}
      .turnRate=${args.turnRate}
      .number=${args.number}
      .name=${args.name}
      .state=${args.state}
      .type=${args.type}
      .selected=${args.selected}
      .courseArrowPx=${args.courseArrowPx}
      .ownShipIndicator=${args.ownShipIndicator}
    >
      <obi-vessel-type-cargo-filled
        slot="silhouette"
        useCssColor
      ></obi-vessel-type-cargo-filled>
      <obi-vessel-type-cargo-filled useCssColor></obi-vessel-type-cargo-filled>
    </obc-chart-object-vessel-button>
  `,
} satisfies Meta<ObcChartObjectVesselButton>;

export default meta;
type Story = StoryObj<ObcChartObjectVesselButton>;

export const Flat: Story = {
  args: {
    number: 2,
    name: 'TS Sola',
    heading: 45,
  },
};

export const FlatPlaceholder: Story = {
  args: {
    number: 2,
    name: 'Name',
  },
  render: (args) => html`
    <obc-chart-object-vessel-button
      .heading=${args.heading}
      .course=${args.course}
      .speedIndicator=${args.speedIndicator}
      .turnRate=${args.turnRate}
      .number=${args.number}
      .name=${args.name}
    >
      <obi-placeholder useCssColor></obi-placeholder>
      <obi-placeholder useCssColor slot="silhouette"></obi-placeholder>
    </obc-chart-object-vessel-button>
  `,
};

export const FlatActive: Story = {
  args: {
    number: 2,
    name: 'TS Sola',
    heading: 45,
    state: State.Active,
    type: Type.Flat,
  },
};

export const FlatSelected: Story = {
  args: {
    state: State.Active,
    selected: true,
    type: Type.Flat,
  },
};

export const FlatAlarm: Story = {
  args: {
    type: Type.Flat,
    state: State.Alarm,
  },
};

export const Button: Story = {
  args: {
    type: Type.Button,
    state: State.Active,
  },
};

export const ButtonSelected: Story = {
  args: {
    type: Type.Button,
    state: State.Active,
    selected: true,
  },
};

export const ButtonAlarm: Story = {
  args: {
    type: Type.Button,
    state: State.Alarm,
  },
};

export const FlatLarge: Story = {
  args: {
    type: Type.FlatLarge,
    state: State.Active,
    selected: true,
  },
};

export const FlatLargeAlarm: Story = {
  args: {
    type: Type.FlatLarge,
    state: State.Alarm,
  },
};

export const Large: Story = {
  args: {
    type: Type.Large,
    state: State.Active,
    selected: true,
  },
};

export const LargeAlarm: Story = {
  args: {
    type: Type.Large,
    state: State.Alarm,
  },
};

export const FlatSpeedRot: Story = {
  args: {
    type: Type.FlatSpeedRot,
    state: State.Alarm,
    speedIndicator: SpeedIndicator.Three,
    turnRate: 100,
  },
};

export const ButtonSpeedRot: Story = {
  args: {
    type: Type.ButtonSpeedRot,
    state: State.Active,
    speedIndicator: SpeedIndicator.Three,
    turnRate: 100,
  },
};

export const SpeedRotCog: Story = {
  args: {
    type: Type.ButtonSpeedRot,
    state: State.Active,
    speedIndicator: SpeedIndicator.Three,
    heading: 45,
    course: 50,
    courseArrowPx: 50,
  },
};

export const CrossLine: Story = {
  args: {
    type: Type.Flat,
    heading: 120,
    course: 130,
    courseArrowPx: 80,
    ownShipIndicator: true,
    name: undefined,
    number: undefined,
    vesselImage: VesselImage.genericTop,
  },
  render: (args) =>
    html` <obc-chart-object-vessel-button
      .heading=${args.heading}
      .course=${args.course}
      .courseArrowPx=${args.courseArrowPx}
      .speedIndicator=${args.speedIndicator}
      .turnRate=${args.turnRate}
      .number=${args.number}
      .name=${args.name}
      .ownShipIndicator=${args.ownShipIndicator}
      .vesselImageSize=${args.vesselImageSize}
      .vesselImage=${args.vesselImage}
      .state=${args.state}
      .selected=${args.selected}
    >
      <obi-own-ship-alternative-filled
        useCssColor
      ></obi-own-ship-alternative-filled>
      <obi-own-ship-alternative-filled
        useCssColor
        slot="silhouette"
      ></obi-own-ship-alternative-filled>
    </obc-chart-object-vessel-button>`,
};

export const ButtonAnimated: Story = {
  args: {
    type: Type.Button,
    state: State.Active,
  },
  tags: ['skip-test'],
  play: async ({canvasElement}) => {
    const canvas = canvasElement.querySelector(
      'obc-chart-object-vessel-button'
    ) as ObcChartObjectVesselButton;
    if (!canvas) return;
    for (let i = 0; i < 2; i++) {
      canvas.state = State.Active;
      canvas.selected = false;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      canvas.state = State.Active;
      canvas.selected = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      canvas.state = State.Warning;
      canvas.selected = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      canvas.state = State.Active;
      canvas.selected = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  },
};
