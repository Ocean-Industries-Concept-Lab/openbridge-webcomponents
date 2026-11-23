import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-menu-item-experimental.js';
import {
  ObcAlertMenuItemExperimental,
  type ObcAlertMenuItemExperimentalActionClickEvent,
} from './alert-menu-item-experimental.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';
import {isa182StateAfterAction} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

function moveIsa182ItemToStateAfterAction(
  event: ObcAlertMenuItemExperimentalActionClickEvent
) {
  const item = event.currentTarget as ObcAlertMenuItemExperimental;
  item.state = isa182StateAfterAction(item.state, event.detail.actionId);
}

const meta: Meta<ObcAlertMenuItemExperimental> = {
  title: 'Application Components/Alerts/Alert Menu Item Experimental/ISA-18.2',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-menu-item-experimental',
  args: {
    criticality: 'high',
    state: 'unacknowledged',
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
          'isa182AlertStandard'
        ),
      },
    },
  },
  render: (args) => {
    setAlertStandard(isa182AlertStandard);
    return html`<obc-alert-menu-item-experimental
      .criticality=${args.criticality}
      .state=${args.state}
      .title=${args.title}
      .description=${args.description}
      .time=${args.time}
      .size=${args.size}
      @action-click=${moveIsa182ItemToStateAfterAction}
      style="width: 480px"
    ></obc-alert-menu-item-experimental>`;
  },
};

export default meta;
type Story = StoryObj<ObcAlertMenuItemExperimental>;

export const TwoActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'An unacknowledged ISA-18.2 alarm offers two actions, so the item shows a button for each.',
      },
    },
  },
};
