import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import './alert-icon-experimental.js';
import {FlashingSpeed} from '../../types.js';
import {
  alertStandardMatrix,
  iec6060118StoryAlertStandard,
} from '../../storybook-util.js';
import {registerAlertStandard} from '../../alert-system/alert-standard-registry.js';

registerAlertStandard(iec6060118StoryAlertStandard);

const meta: Meta<typeof ObcAlertIconExperimental> = {
  title: 'Application Components/Alerts/Alert Icon Experimental',
  tags: ['autodocs', '6.0', 'experimental'],
  component: 'obc-alert-icon-experimental',
  args: {
    standard: 'iec-62923',
    criticality: 'alarm',
    state: 'active-unacknowledged',
    flashingSpeed: FlashingSpeed.Default,
  },
  argTypes: {
    standard: {
      control: {type: 'select'},
      options: ['iec-62923', 'isa-18.2', 'iec-60601-1-8'],
    },
    flashingSpeed: {
      control: {type: 'select'},
      options: Object.values(FlashingSpeed),
    },
  },
  render: (args) =>
    html`<div style="width: 64px; height: 64px">
      <obc-alert-icon-experimental
        .standard=${args.standard}
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
  args: {
    standard: 'isa-18.2',
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
  },
};

const standardStory = (
  name: string,
  standard: string,
  story: string
): Story => ({
  name,
  parameters: {docs: {description: {story}}},
  render: () =>
    alertStandardMatrix(
      standard,
      (criticality, state) =>
        html`<div style="width: 32px; height: 32px">
          <obc-alert-icon-experimental
            .standard=${standard}
            .criticality=${criticality}
            .state=${state}
          ></obc-alert-icon-experimental>
        </div>`
    ),
});

export const Iec62923 = standardStory(
  'IEC 62923',
  'iec-62923',
  'Every criticality of IEC 62923 in every state it defines. An emergency alarm and a caution take no acknowledgement, so they are only active or normal.'
);

export const Isa182 = standardStory(
  'ISA-18.2',
  'isa-18.2',
  'Every priority of ISA-18.2 in every state it defines. A diagnostic alert takes no acknowledgement, so it is only active or normal.'
);

export const CustomStandard = standardStory(
  'Custom Standard',
  'iec-60601-1-8',
  'A standard from outside the library: IEC 60601-1-8, the alarms of medical equipment, defined in `storybook-util.ts` with `defineAlertStandard()` and registered with `registerAlertStandard()`. It brings its own priorities, states, glyphs and tempo; no component changes.'
);
