import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './alert-menu-experimental.js';
import {
  ObcAlertMenuExperimental,
  ObcAlertMenuExperimentalAckAllVisibleClickEvent,
} from './alert-menu-experimental.js';
import '../alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {
  ObcAlertMenuItemExperimental,
  ObcAlertMenuItemExperimentalActionClickEvent,
} from '../alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {ObcTabbedCard} from '../tabbed-card/tabbed-card.js';
import {ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON} from '../../alert-system/alert-standard.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';
import {
  iec62923StateAfterAction,
  isa182StateAfterAction,
} from '../../alert-system/stories/state-after-action.js';

function moveIec62923ItemToStateAfterAction(
  event: ObcAlertMenuItemExperimentalActionClickEvent
) {
  const item = event.currentTarget as ObcAlertMenuItemExperimental;
  item.state = iec62923StateAfterAction(item.state, event.detail.actionId);
}

function moveIsa182ItemToStateAfterAction(
  event: ObcAlertMenuItemExperimentalActionClickEvent
) {
  const item = event.currentTarget as ObcAlertMenuItemExperimental;
  item.state = isa182StateAfterAction(item.state, event.detail.actionId);
}

function acknowledgeVisibleIsa182Items(
  event: ObcAlertMenuExperimentalAckAllVisibleClickEvent
) {
  for (const {element} of event.detail.visibleElements) {
    const item = element as ObcAlertMenuItemExperimental;
    item.state = isa182StateAfterAction(
      item.state,
      ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
    );
  }
}

const iec62923ItemsInEveryKindOfState = html`
  <obc-alert-menu-item-experimental
    criticality="alarm"
    state="active-unacknowledged"
    title="alarm"
    description="Active, unacknowledged"
    time="14:39:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="alarm"
    state="active-acknowledged"
    title="alarm"
    description="Active, acknowledged"
    time="14:38:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="alarm"
    state="rectified-unacknowledged"
    title="alarm"
    description="Rectified, unacknowledged"
    time="14:37:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="alarm"
    state="normal"
    title="alarm"
    description="Normal"
    time="14:36:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="caution"
    state="active"
    title="caution"
    description="Caution, takes no ACK"
    time="14:35:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="warning"
    state="active-unacknowledged-acknowledge-not-allowed"
    title="warning"
    description="Acknowledged elsewhere"
    time="14:34:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="warning"
    state="active-responsibility-transferred"
    title="warning"
    description="Responsibility transferred"
    time="14:33:00"
    @action-click=${moveIec62923ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
`;

const isa182ItemsInEveryKindOfState = html`
  <obc-alert-menu-item-experimental
    criticality="high"
    state="unacknowledged"
    title="high"
    description="Unacknowledged"
    time="14:39:00"
    @action-click=${moveIsa182ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="high"
    state="acknowledged"
    title="high"
    description="Acknowledged"
    time="14:38:00"
    @action-click=${moveIsa182ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="high"
    state="returned-to-normal-unacknowledged"
    title="high"
    description="Returned to normal, unacknowledged"
    time="14:37:00"
    @action-click=${moveIsa182ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="high"
    state="normal"
    title="high"
    description="Normal"
    time="14:36:00"
    @action-click=${moveIsa182ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="diagnostic"
    state="active"
    title="diagnostic"
    description="Diagnostic, takes no ACK"
    time="14:35:00"
    @action-click=${moveIsa182ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="medium"
    state="shelved"
    title="medium"
    description="Shelved"
    time="14:34:00"
    @action-click=${moveIsa182ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="critical"
    state="suppressed-by-design"
    title="critical"
    description="Suppressed by design"
    time="14:33:00"
    @action-click=${moveIsa182ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
  <obc-alert-menu-item-experimental
    criticality="low"
    state="out-of-service"
    title="low"
    description="Out of service"
    time="14:32:00"
    @action-click=${moveIsa182ItemToStateAfterAction}
  ></obc-alert-menu-item-experimental>
`;

const meta: Meta<ObcAlertMenuExperimental> = {
  title: 'Application Components/Alerts/Alert Menu Experimental',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-menu-experimental',
  beforeEach: () => setAlertStandard(iec62923AlertStandard),
  args: {
    canAckAll: true,
    showSilenceButton: true,
    showAlertListButton: true,
  },
  render: (args) =>
    html`<obc-alert-menu-experimental
      .canAckAll=${args.canAckAll}
      .showSilenceButton=${args.showSilenceButton}
      .showAlertListButton=${args.showAlertListButton}
    >
      ${iec62923ItemsInEveryKindOfState}
    </obc-alert-menu-experimental>`,
};

export default meta;
type Story = StoryObj<ObcAlertMenuExperimental>;

export const Regular: Story = {};

export const Automation: Story = {
  beforeEach: () => setAlertStandard(isa182AlertStandard),
  parameters: {
    docs: {
      description: {
        story:
          'ISA-18.2 declares five filters, so the menu has five tabs, and it lets several alarms be acknowledged at once, so the menu offers ACK visible. Under IEC 62923, as in the other stories, it does not: MSC.302 9.9 asks for one alarm at a time.',
      },
    },
  },
  render: (args) =>
    html`<obc-alert-menu-experimental
      .canAckAll=${args.canAckAll}
      .showSilenceButton=${args.showSilenceButton}
      .showAlertListButton=${args.showAlertListButton}
      @ack-all-visible-click=${acknowledgeVisibleIsa182Items}
    >
      ${isa182ItemsInEveryKindOfState}
    </obc-alert-menu-experimental>`,
};

export const Empty: Story = {
  render: () =>
    html`<obc-alert-menu-experimental></obc-alert-menu-experimental>`,
};

const ISA_18_2_FILTER_COUNT = 5;

export const Tabs: Story = {
  beforeEach: () => setAlertStandard(isa182AlertStandard),
  parameters: {
    docs: {
      description: {
        story:
          'The same ISA-18.2 alarms, one in each kind of state, with each tab selected. Each tab is a filter the standard declares, and shows the alarms whose state is included in it.',
      },
    },
  },
  render: () =>
    html`<style>
        .menu-tabs {
          display: grid;
          grid-template-columns: repeat(2, max-content);
          gap: 16px;
        }
        .menu-tabs obc-alert-menu-experimental::part(wrapper) {
          width: 560px;
          height: 400px;
        }
      </style>
      <div class="menu-tabs">
        ${Array.from(
          {length: ISA_18_2_FILTER_COUNT},
          () =>
            html`<obc-alert-menu-experimental
              canAckAll
              .showSilenceButton=${false}
              .showAlertListButton=${false}
              @ack-all-visible-click=${acknowledgeVisibleIsa182Items}
            >
              ${isa182ItemsInEveryKindOfState}
            </obc-alert-menu-experimental>`
        )}
      </div>`,
  play: async ({canvasElement}) => {
    const menus = canvasElement.querySelectorAll('obc-alert-menu-experimental');
    for (const [index, menu] of [...menus].entries()) {
      await menu.updateComplete;
      const card = menu.shadowRoot!.querySelector(
        'obc-tabbed-card'
      ) as ObcTabbedCard;
      await card.updateComplete;
      card.shadowRoot!.querySelector<HTMLElement>(`#tab-${index}`)!.click();
      await menu.updateComplete;
    }
  },
};

export const NoAlertStandard: Story = {
  beforeEach: () => setAlertStandard(undefined),
  parameters: {
    docs: {
      description: {
        story:
          'Until the application calls `setAlertStandard()`, the menu has one tab, shows none of its items and says that no alert standard is set. The console says how to set one.',
      },
    },
  },
};
