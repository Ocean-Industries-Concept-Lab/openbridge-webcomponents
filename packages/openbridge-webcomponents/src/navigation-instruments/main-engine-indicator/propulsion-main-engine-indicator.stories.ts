import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import './propulsion-main-engine-indicator.js';
import {InstrumentState, Priority} from '../types.js';

const STORY_BOX_PX = 48;

enum MainEngineStoryState {
  inCommand = 'In command',
  notInCommand = 'Not in command',
  off = 'Off',
}

type MainEngineStoryArgs = {
  storyState: MainEngineStoryState;
  rpmValue: number;
  pitchValue: number;
  hasSilhouette: boolean;
};

function storyStateToProps(storyState: MainEngineStoryState): {
  state: InstrumentState;
  priority: Priority;
} {
  if (storyState === MainEngineStoryState.off) {
    return {state: InstrumentState.off, priority: Priority.regular};
  }

  if (storyState === MainEngineStoryState.notInCommand) {
    return {state: InstrumentState.active, priority: Priority.regular};
  }

  return {state: InstrumentState.active, priority: Priority.enhanced};
}

function mainEngineIndicatorDecorator(
  story: () => unknown
): HTMLTemplateResult {
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

function renderMainEngine(args: MainEngineStoryArgs) {
  const {state, priority} = storyStateToProps(args.storyState);
  return html`<obc-propulsion-main-engine-indicator
    .state=${state}
    .priority=${priority}
    .rpmValue=${args.rpmValue}
    .pitchValue=${args.pitchValue}
    .hasSilhouette=${args.hasSilhouette}
  ></obc-propulsion-main-engine-indicator>`;
}

const meta = {
  title: 'Indicators/Propulsion Main Engine Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-propulsion-main-engine-indicator',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.34,
    pitchValue: 0.46,
    hasSilhouette: false,
  },
  argTypes: {
    storyState: {
      name: 'State',
      control: {type: 'select'},
      options: Object.values(MainEngineStoryState),
      table: {category: 'Attributes'},
    },
    rpmValue: {
      control: {type: 'range', min: 0, max: 1, step: 0.05},
      table: {category: 'Attributes'},
    },
    pitchValue: {
      control: {type: 'range', min: -1, max: 1, step: 0.05},
      table: {category: 'Attributes'},
    },
    hasSilhouette: {
      control: 'boolean',
      table: {category: 'Attributes'},
    },
  },
  render: renderMainEngine,
  decorators: [mainEngineIndicatorDecorator],
} satisfies Meta<MainEngineStoryArgs>;

export default meta;
type Story = StoryObj<MainEngineStoryArgs>;

export const Default = {
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.34,
    pitchValue: 0.46,
    hasSilhouette: false,
  },
} satisfies Story;

export const InCommandWithSilhouette = {
  name: 'In command + Silhouette',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.34,
    pitchValue: 0.46,
    hasSilhouette: true,
  },
} satisfies Story;

export const NotInCommand = {
  name: 'Not In Command',
  args: {
    storyState: MainEngineStoryState.notInCommand,
    rpmValue: 0.34,
    pitchValue: 0.46,
    hasSilhouette: false,
  },
} satisfies Story;

export const NotInCommandWithSilhouette = {
  name: 'Not in command + Silhouette',
  args: {
    storyState: MainEngineStoryState.notInCommand,
    rpmValue: 0.34,
    pitchValue: 0.46,
    hasSilhouette: true,
  },
} satisfies Story;

export const ReverseThrust = {
  name: 'Reverse Thrust',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.42,
    pitchValue: -0.38,
    hasSilhouette: false,
  },
} satisfies Story;

export const LowAhead = {
  name: 'Low Ahead',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.34,
    pitchValue: 0.1,
    hasSilhouette: false,
  },
} satisfies Story;

export const LowAstern = {
  name: 'Low Astern',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.34,
    pitchValue: -0.1,
    hasSilhouette: false,
  },
} satisfies Story;

export const Off = {
  args: {
    storyState: MainEngineStoryState.off,
    rpmValue: 0.34,
    pitchValue: 0.46,
    hasSilhouette: false,
  },
} satisfies Story;

export const RpmMin = {
  name: 'RPM 0',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0,
    pitchValue: 0.46,
    hasSilhouette: false,
  },
} satisfies Story;

export const RpmMid = {
  name: 'RPM 0.5',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.5,
    pitchValue: 0.46,
    hasSilhouette: false,
  },
} satisfies Story;

export const RpmMax = {
  name: 'RPM 1',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 1,
    pitchValue: 0.46,
    hasSilhouette: false,
  },
} satisfies Story;

export const PitchMin = {
  name: 'Pitch -1',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.34,
    pitchValue: -1,
    hasSilhouette: false,
  },
} satisfies Story;

export const PitchZero = {
  name: 'Pitch 0',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.34,
    pitchValue: 0,
    hasSilhouette: false,
  },
} satisfies Story;

export const PitchMax = {
  name: 'Pitch 1',
  args: {
    storyState: MainEngineStoryState.inCommand,
    rpmValue: 0.34,
    pitchValue: 1,
    hasSilhouette: false,
  },
} satisfies Story;
