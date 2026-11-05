import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcAlertIconExperimental} from './alert-icon-experimental.js';
import './alert-icon-experimental.js';
import {FlashingSpeed} from '../../types.js';
import {alertStandardMatrix} from '../../storybook-util.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

const meta: Meta<ObcAlertIconExperimental> = {
  title: 'Application Components/Alerts/Alert Icon Experimental/IEC 62923',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-icon-experimental',
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
  parameters: {
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertIconExperimental'),
          'iec62923AlertStandard'
        ),
      },
    },
  },
  render: (args) => {
    setAlertStandard(iec62923AlertStandard);
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

export const Primary: Story = {};

const iconOfCriticalityAndState = (criticality: string, state: string) =>
  html`<div style="width: 32px; height: 32px">
    <obc-alert-icon-experimental
      .criticality=${criticality}
      .state=${state}
    ></obc-alert-icon-experimental>
  </div>`;

export const Iec62923: Story = {
  name: 'IEC 62923',
  parameters: {
    docs: {
      description: {
        story:
          'Every criticality of IEC 62923 in every state it defines. An emergency alarm and a caution take no acknowledgement, so they are only active or normal.',
      },
    },
  },
  render: () => {
    setAlertStandard(iec62923AlertStandard);
    return alertStandardMatrix(
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
    );
  },
};
