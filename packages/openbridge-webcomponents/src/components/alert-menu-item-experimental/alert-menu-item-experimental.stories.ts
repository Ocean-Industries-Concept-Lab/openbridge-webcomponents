import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-menu-item-experimental.js';
import {
  ObcAlertMenuItemExperimental,
  type ObcAlertMenuItemExperimentalActionClickEvent,
} from './alert-menu-item-experimental.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {iec62923StateAfterAction} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

function moveIec62923ItemToStateAfterAction(
  event: ObcAlertMenuItemExperimentalActionClickEvent
) {
  const item = event.currentTarget as ObcAlertMenuItemExperimental;
  item.state = iec62923StateAfterAction(item.state, event.detail.actionId);
}

const meta: Meta<ObcAlertMenuItemExperimental> = {
  title: 'Application Components/Alerts/Alert Menu Item Experimental/IEC 62923',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-menu-item-experimental',
  args: {
    criticality: 'alarm',
    state: 'active-unacknowledged',
    title: 'ME 1',
    description: 'Port main engine temperature exceeds normal operating range',
    time: '14:30:00',
    size: ObcMessageMenuItemSize.SingleLine,
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: Object.values(ObcMessageMenuItemSize),
    },
  },
  parameters: {
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertMenuItemExperimental'),
          'iec62923AlertStandard'
        ),
      },
    },
  },
  render: (args) => {
    setAlertStandard(iec62923AlertStandard);
    return html`<obc-alert-menu-item-experimental
      .criticality=${args.criticality}
      .state=${args.state}
      .title=${args.title}
      .description=${args.description}
      .time=${args.time}
      .size=${args.size}
      @action-click=${moveIec62923ItemToStateAfterAction}
      style="width: 480px"
    ></obc-alert-menu-item-experimental>`;
  },
};

export default meta;
type Story = StoryObj<ObcAlertMenuItemExperimental>;

export const Regular: Story = {};

export const AcknowledgeNotAllowed: Story = {
  args: {
    criticality: 'warning',
    state: 'active-unacknowledged-acknowledge-not-allowed',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The state offers no action, so the item shows the glyph IEC 62923 defines for an alert that is acknowledged somewhere else.',
      },
    },
  },
};
