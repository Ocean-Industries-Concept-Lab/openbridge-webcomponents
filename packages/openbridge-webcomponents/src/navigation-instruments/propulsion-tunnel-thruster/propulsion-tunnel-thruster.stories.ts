import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import './propulsion-tunnel-thruster.js';
import {TunnelThrusterState} from './propulsion-tunnel-thruster.js';

const STORY_BOX_PX = 48;

enum TunnelStoryStateLabel {
  inCommand = 'In command',
  notInCommand = 'Not in command',
  off = 'Off',
}

type TunnelThrusterStoryArgs = {
  storyState: TunnelStoryStateLabel;
  value: number;
  hasSilhouette: boolean;
};

function labelToTunnelState(label: TunnelStoryStateLabel): TunnelThrusterState {
  switch (label) {
    case TunnelStoryStateLabel.off:
      return TunnelThrusterState.Off;
    case TunnelStoryStateLabel.notInCommand:
      return TunnelThrusterState.NotInCommand;
    default:
      return TunnelThrusterState.InCommand;
  }
}

function tunnelThrusterDecorator(story: () => unknown): HTMLTemplateResult {
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

function renderTunnelThruster(args: TunnelThrusterStoryArgs) {
  return html`<obc-propulsion-tunnel-thruster
    .state=${labelToTunnelState(args.storyState)}
    .value=${args.value}
    .hasSilhouette=${args.hasSilhouette}
  ></obc-propulsion-tunnel-thruster>`;
}

const meta = {
  title: 'Indicators/Propulsion Tunnel Thruster',
  tags: ['autodocs', '6.0'],
  component: 'obc-propulsion-tunnel-thruster',
  args: {
    storyState: TunnelStoryStateLabel.inCommand,
    value: -0.33,
    hasSilhouette: false,
  },
  argTypes: {
    storyState: {
      name: 'State',
      control: {type: 'select'},
      options: Object.values(TunnelStoryStateLabel),
      table: {category: 'Attributes'},
    },
    value: {
      control: {type: 'range', min: -1, max: 1, step: 0.05},
      table: {category: 'Attributes'},
    },
    hasSilhouette: {
      control: 'boolean',
      table: {category: 'Attributes'},
    },
  },
  render: renderTunnelThruster,
  decorators: [tunnelThrusterDecorator],
} satisfies Meta<TunnelThrusterStoryArgs>;

export default meta;
type Story = StoryObj<TunnelThrusterStoryArgs>;

export const InCommand = {
  name: 'In command',
  args: {
    storyState: TunnelStoryStateLabel.inCommand,
    value: -0.33,
    hasSilhouette: false,
  },
} satisfies Story;

export const NotInCommand = {
  name: 'Not in command',
  args: {
    storyState: TunnelStoryStateLabel.notInCommand,
    value: -0.33,
    hasSilhouette: false,
  },
} satisfies Story;

export const Off = {
  args: {
    storyState: TunnelStoryStateLabel.off,
    value: 0,
    hasSilhouette: false,
  },
} satisfies Story;

export const ValueMin = {
  name: 'Value -1',
  args: {
    storyState: TunnelStoryStateLabel.inCommand,
    value: -1,
    hasSilhouette: false,
  },
} satisfies Story;

export const ValueZero = {
  name: 'Value 0',
  args: {
    storyState: TunnelStoryStateLabel.inCommand,
    value: 0,
    hasSilhouette: false,
  },
} satisfies Story;

export const ValueMax = {
  name: 'Value 1',
  args: {
    storyState: TunnelStoryStateLabel.inCommand,
    value: 1,
    hasSilhouette: false,
  },
} satisfies Story;

export const WithSilhouette = {
  name: 'Not in command + Silhouette',
  args: {
    storyState: TunnelStoryStateLabel.notInCommand,
    value: -0.33,
    hasSilhouette: true,
  },
} satisfies Story;
