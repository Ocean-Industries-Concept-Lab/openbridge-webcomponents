import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import './alert-icon-experimental.js';
import {FlashingSpeed} from '../../types.js';
import {alertStandardMatrix} from '../../storybook-util.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

const meta: Meta<ObcAlertIconExperimental> = {
  title: 'Application Components/Alerts/Alert Icon Experimental/ISA-18.2',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-icon-experimental',
  args: {
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
    flashingSpeed: FlashingSpeed.Default,
  },
  argTypes: {
    flashingSpeed: {
      control: {type: 'select'},
      options: Object.values(FlashingSpeed),
    },
  },
  parameters: {
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertIconExperimental'),
          'isa182AlertStandard'
        ),
      },
    },
  },
  render: (args) => {
    setAlertStandard(isa182AlertStandard);
    return html`<div style="width: 64px; height: 64px">
      <obc-alert-icon-experimental
        .criticality=${args.criticality}
        .state=${args.state}
        .flashingSpeed=${args.flashingSpeed}
      ></obc-alert-icon-experimental>
    </div>`;
  },
} satisfies Meta<ObcAlertIconExperimental>;

export default meta;
type Story = StoryObj<ObcAlertIconExperimental>;

export const AutomationHigh: Story = {};

const iconOfCriticalityAndState = (criticality: string, state: string) =>
  html`<div style="width: 32px; height: 32px">
    <obc-alert-icon-experimental
      .criticality=${criticality}
      .state=${state}
    ></obc-alert-icon-experimental>
  </div>`;

export const Isa182: Story = {
  name: 'ISA-18.2',
  parameters: {
    docs: {
      description: {
        story:
          'Every priority of ISA-18.2 in every state it defines. A shelved, suppressed or out-of-service alarm is a state of its own while active and while not active.',
      },
    },
  },
  render: () => {
    setAlertStandard(isa182AlertStandard);
    return alertStandardMatrix(
      isa182AlertStandard,
      ['normal', 'unacknowledged', 'acknowledged'],
      iconOfCriticalityAndState
    );
  },
};
