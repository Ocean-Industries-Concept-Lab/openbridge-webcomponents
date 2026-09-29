import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import {PropulsionAzimuthIndicatorType} from './propulsion-azimuth-indicator.js';
import './propulsion-azimuth-indicator.js';
import {InstrumentState} from '../types.js';

const STORY_BOX_PX = 48;
enum VisualState {
  InCommand = 'In Command',
  NotInCommand = 'Not In Command',
  Off = 'Off',
}

interface PropulsionAzimuthIndicatorStoryArgs {
  visualState: VisualState;
  azimuth: number;
  value: number;
  hasSilhouette: boolean;
}

function toComponentArgs(visualState: VisualState) {
  if (visualState === VisualState.Off) {
    return {
      type: PropulsionAzimuthIndicatorType.enhanced,
      state: InstrumentState.off,
    };
  }

  return {
    type:
      visualState === VisualState.NotInCommand
        ? PropulsionAzimuthIndicatorType.regular
        : PropulsionAzimuthIndicatorType.enhanced,
    state: InstrumentState.active,
  };
}

function propulsionAzimuthDecorator(story: () => unknown): HTMLTemplateResult {
  return html`<div
    style="display: flex; align-items: center; justify-content: center; box-sizing: border-box; width: 100%; min-height: 280px; padding: 24px"
  >
    <div
      style="width: ${STORY_BOX_PX}px; height: ${STORY_BOX_PX}px; box-sizing: border-box; flex-shrink: 0"
    >
      ${story()}
    </div>
  </div>`;
}

const meta = {
  title: 'Indicators/Propulsion Azimuth Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-propulsion-azimuth-indicator',
  parameters: {
    controls: {
      exclude: ['type', 'state'],
    },
  },
  render: (args) => {
    const componentArgs = toComponentArgs(args.visualState);

    return html`<obc-propulsion-azimuth-indicator
      .type=${componentArgs.type}
      .state=${componentArgs.state}
      .azimuth=${args.azimuth}
      .value=${args.value}
      .hasSilhouette=${args.hasSilhouette}
    ></obc-propulsion-azimuth-indicator>`;
  },
  args: {
    visualState: VisualState.InCommand,
    azimuth: 0,
    value: -0.35,
    hasSilhouette: false,
  },
  argTypes: {
    visualState: {
      name: 'State',
      control: {type: 'select'},
      options: Object.values(VisualState),
      table: {category: 'Attributes'},
    },
    hasSilhouette: {
      name: 'Has Silhouette',
      control: {type: 'boolean'},
      table: {category: 'Attributes'},
    },
    azimuth: {
      control: {type: 'range', min: 0, max: 360, step: 1},
      table: {category: 'Attributes'},
    },
    value: {
      control: {type: 'range', min: -1, max: 1, step: 0.05},
      table: {category: 'Attributes'},
    },
  },
  decorators: [propulsionAzimuthDecorator],
} satisfies Meta<PropulsionAzimuthIndicatorStoryArgs>;

export default meta;
type Story = StoryObj<PropulsionAzimuthIndicatorStoryArgs>;

export const Default = {
  name: 'In Command',
  args: {
    visualState: VisualState.InCommand,
    azimuth: 0,
    value: -0.35,
    hasSilhouette: false,
  },
} satisfies Story;

export const WithSilhouette = {
  name: 'With Silhouette',
  args: {
    visualState: VisualState.InCommand,
    azimuth: 0,
    value: -0.35,
    hasSilhouette: true,
  },
} satisfies Story;

export const Azimuth0 = {
  name: 'Azimuth 0°',
  args: {
    visualState: VisualState.InCommand,
    azimuth: 0,
    value: -0.35,
    hasSilhouette: false,
  },
} satisfies Story;

export const Azimuth90 = {
  name: 'Azimuth 90°',
  args: {
    visualState: VisualState.InCommand,
    azimuth: 90,
    value: -0.35,
    hasSilhouette: false,
  },
} satisfies Story;

export const Azimuth180 = {
  name: 'Azimuth 180°',
  args: {
    visualState: VisualState.InCommand,
    azimuth: 180,
    value: -0.35,
    hasSilhouette: false,
  },
} satisfies Story;

export const Azimuth270 = {
  name: 'Azimuth 270°',
  args: {
    visualState: VisualState.InCommand,
    azimuth: 270,
    value: -0.35,
    hasSilhouette: false,
  },
} satisfies Story;

export const Regular = {
  name: 'Not In Command',
  args: {
    visualState: VisualState.NotInCommand,
    azimuth: 0,
    value: -0.35,
    hasSilhouette: false,
  },
} satisfies Story;

export const Off = {
  args: {
    visualState: VisualState.Off,
    azimuth: 0,
    value: 0,
    hasSilhouette: false,
  },
} satisfies Story;
