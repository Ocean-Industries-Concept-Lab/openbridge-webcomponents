import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import './alert-icon-experimental.js';
import {FlashingSpeed} from '../../types.js';
import {alertStandardMatrix} from '../../storybook-util.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';
import {iec6060118AlertStandard} from '../../alert-system/stories/iec-60601-1-8-alert-standard.js';

const meta: Meta<typeof ObcAlertIconExperimental> = {
  title: 'Application Components/Alerts/Alert Icon Experimental',
  tags: ['autodocs', '6.0', 'experimental'],
  component: 'obc-alert-icon-experimental',
  beforeEach: () => setAlertStandard(iec62923AlertStandard),
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
  beforeEach: () => setAlertStandard(isa182AlertStandard),
  args: {
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
  },
};

const iconOfCriticalityAndState = (criticality: string, state: string) =>
  html`<div style="width: 32px; height: 32px">
    <obc-alert-icon-experimental
      .criticality=${criticality}
      .state=${state}
    ></obc-alert-icon-experimental>
  </div>`;

export const Iec62923: Story = {
  name: 'IEC 62923',
  beforeEach: () => setAlertStandard(iec62923AlertStandard),
  parameters: {
    docs: {
      description: {
        story:
          'Every criticality of IEC 62923 in every state it defines. An emergency alarm and a caution take no acknowledgement, so they are only active or normal.',
      },
    },
  },
  render: () =>
    alertStandardMatrix(
      iec62923AlertStandard,
      [
        'active',
        'active-unacknowledged',
        'active-silenced',
        'active-acknowledged',
        'active-responsibility-transferred',
        'rectified-unacknowledged',
        'normal',
      ],
      iconOfCriticalityAndState
    ),
};

export const Isa182: Story = {
  name: 'ISA-18.2',
  beforeEach: () => setAlertStandard(isa182AlertStandard),
  parameters: {
    docs: {
      description: {
        story:
          'Every priority of ISA-18.2 in every state it defines. A diagnostic alert takes no acknowledgement, so it is only active or normal.',
      },
    },
  },
  render: () =>
    alertStandardMatrix(
      isa182AlertStandard,
      ['active', 'normal', 'unacknowledged', 'acknowledged'],
      iconOfCriticalityAndState
    ),
};

export const CustomStandard: Story = {
  beforeEach: () => setAlertStandard(iec6060118AlertStandard),
  parameters: {
    docs: {
      description: {
        story:
          'A standard from outside the library: IEC 60601-1-8, the alarms of medical equipment, defined in `alert-system/stories/iec-60601-1-8-alert-standard.ts` with `defineAlertStandard()` and set with `setAlertStandard()`. It brings its own priorities, states, glyphs and tempo; no component changes.',
      },
    },
  },
  render: () =>
    alertStandardMatrix(iec6060118AlertStandard, [], iconOfCriticalityAndState),
};
