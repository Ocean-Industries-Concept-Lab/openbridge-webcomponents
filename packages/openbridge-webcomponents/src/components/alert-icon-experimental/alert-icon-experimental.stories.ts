import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import './alert-icon-experimental.js';
import {FlashingSpeed} from '../../types.js';
import {
  STORY_ALERT_STANDARDS,
  alertStandardMatrix,
  drawStoryWithAlertStandard,
  type StoryAlertStandardName,
} from '../../storybook-util.js';

const meta: Meta<typeof ObcAlertIconExperimental> = {
  title: 'Application Components/Alerts/Alert Icon Experimental',
  tags: ['autodocs', '6.0', 'experimental'],
  component: 'obc-alert-icon-experimental',
  beforeEach: drawStoryWithAlertStandard('iec-62923'),
  args: {
    criticality: 'alarm',
    state: 'active-unacknowledged',
    flashingSpeed: FlashingSpeed.Default,
  },
  argTypes: {
    flashingSpeed: {
      control: {type: 'select'},
      options: Object.values(FlashingSpeed),
    },
  },
  render: (args) =>
    html`<div style="width: 64px; height: 64px">
      <obc-alert-icon-experimental
        .criticality=${args.criticality}
        .state=${args.state}
        .flashingSpeed=${args.flashingSpeed}
      ></obc-alert-icon-experimental>
    </div>`,
} satisfies Meta<ObcAlertIconExperimental>;

export default meta;
type Story = StoryObj<ObcAlertIconExperimental>;

export const Primary: Story = {};

export const AutomationHigh: Story = {
  beforeEach: drawStoryWithAlertStandard('isa-18.2'),
  args: {
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
  },
};

const standardStory = (
  name: string,
  standardName: StoryAlertStandardName,
  stateNamesInRowOrder: string[],
  story: string
): Story => ({
  name,
  parameters: {docs: {description: {story}}},
  beforeEach: drawStoryWithAlertStandard(standardName),
  render: () =>
    alertStandardMatrix(
      STORY_ALERT_STANDARDS[standardName],
      stateNamesInRowOrder,
      (criticality, state) =>
        html`<div style="width: 32px; height: 32px">
          <obc-alert-icon-experimental
            .criticality=${criticality}
            .state=${state}
          ></obc-alert-icon-experimental>
        </div>`
    ),
});

export const Iec62923 = standardStory(
  'IEC 62923',
  'iec-62923',
  [
    'active',
    'active-unacknowledged',
    'active-silenced',
    'active-acknowledged',
    'active-responsibility-transferred',
    'rectified-unacknowledged',
    'normal',
  ],
  'Every criticality of IEC 62923 in every state it defines. An emergency alarm and a caution take no acknowledgement, so they are only active or normal.'
);

export const Isa182 = standardStory(
  'ISA-18.2',
  'isa-18.2',
  ['active', 'normal', 'unacknowledged', 'acknowledged'],
  'Every priority of ISA-18.2 in every state it defines. A diagnostic alert takes no acknowledgement, so it is only active or normal.'
);

export const CustomStandard = standardStory(
  'Custom Standard',
  'iec-60601-1-8',
  [],
  'A standard from outside the library: IEC 60601-1-8, the alarms of medical equipment, defined in `storybook-util.ts` with `defineAlertStandard()` and set with `setAlertStandard()`. It brings its own priorities, states, glyphs and tempo; no component changes.'
);
