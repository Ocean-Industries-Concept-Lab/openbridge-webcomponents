import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html, type HTMLTemplateResult} from 'lit';
import {ObcRudderIndicator, RudderIndicatorState} from './rudder-indicator.js';
import './rudder-indicator.js';

const STORY_BOX_PX = 48;

function rudderIndicatorDecorator(story: () => unknown): HTMLTemplateResult {
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
  title: 'Indicators/Rudder Indicator',
  tags: ['autodocs', '6.0'],
  component: 'obc-rudder-indicator',
  args: {
    angle: 45,
    setpoint: 38,
    state: RudderIndicatorState.InCommand,
    hasSilhouette: false,
  },
  argTypes: {
    angle: {
      control: {type: 'range', min: -90, max: 90, step: 1},
      table: {category: 'Attributes'},
    },
    setpoint: {
      control: {type: 'range', min: -90, max: 90, step: 1},
      table: {category: 'Attributes'},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(RudderIndicatorState),
      table: {category: 'Attributes'},
    },
    hasSilhouette: {
      control: 'boolean',
      table: {category: 'Attributes'},
    },
  },
  decorators: [rudderIndicatorDecorator],
} satisfies Meta<typeof ObcRudderIndicator>;

export default meta;
type Story = StoryObj<typeof ObcRudderIndicator>;

export const InCommand = {
  args: {
    angle: 45,
    setpoint: 38,
    state: RudderIndicatorState.InCommand,
    hasSilhouette: false,
  },
} satisfies Story;

export const NotInCommand = {
  name: 'Not In Command',
  args: {
    angle: 45,
    setpoint: 38,
    state: RudderIndicatorState.NotInCommand,
    hasSilhouette: false,
  },
} satisfies Story;

export const Off = {
  args: {
    angle: 0,
    setpoint: 0,
    state: RudderIndicatorState.Off,
    hasSilhouette: false,
  },
} satisfies Story;

export const AngleMinus90 = {
  name: 'Angle -90',
  args: {
    angle: -90,
    setpoint: 38,
    state: RudderIndicatorState.InCommand,
    hasSilhouette: false,
  },
} satisfies Story;

export const AngleZero = {
  name: 'Angle 0',
  args: {
    angle: 0,
    setpoint: 38,
    state: RudderIndicatorState.InCommand,
    hasSilhouette: false,
  },
} satisfies Story;

export const Angle90 = {
  name: 'Angle 90',
  args: {
    angle: 90,
    setpoint: 38,
    state: RudderIndicatorState.InCommand,
    hasSilhouette: false,
  },
} satisfies Story;

export const NotInCommandWithSilhouette = {
  name: 'Not in command + Silhouette',
  args: {
    angle: 45,
    setpoint: 38,
    state: RudderIndicatorState.NotInCommand,
    hasSilhouette: true,
  },
} satisfies Story;

export const OffWithSilhouette = {
  name: 'Off + Silhouette (Should Not Render)',
  args: {
    angle: 0,
    setpoint: 0,
    state: RudderIndicatorState.Off,
    hasSilhouette: true,
  },
} satisfies Story;
