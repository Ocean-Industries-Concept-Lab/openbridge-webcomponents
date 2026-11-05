import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcAlertListDetailsExperimental,
  actionColumn,
  statusColumn,
  timeColumn,
  typeColumn,
  type AlertAcknowledgedByField,
} from './alert-list-details-experimental.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {
  isa182AlertStandard,
  type Isa182Alert,
} from '../../alert-system/isa-18-2-alert-standard.js';
import {
  isa182AlertAfterAction,
  moveClickedAlertToStateAfterAction,
} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';

type Isa182ListAlert = Isa182Alert & AlertAcknowledgedByField;

const isa182AlertsOfEveryPriority: Isa182ListAlert[] = [
  {
    id: 'level-1',
    criticality: 'critical',
    state: 'unacknowledged',
    alarmDescription: 'Emergency shutdown condition detected',
    alarmType: 'High-high',
    tagName: 'CRIT-01',
    timeAlarmBecameActive: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'level-2',
    criticality: 'high',
    state: 'unacknowledged',
    alarmDescription: 'Main engine overspeed',
    alarmType: 'High',
    tagName: 'HIGH-02',
    timeAlarmBecameActive: new Date('2024-01-15T14:30:00Z'),
  },
  {
    id: 'level-3',
    criticality: 'medium',
    state: 'unacknowledged',
    alarmDescription: 'Tank level approaching high limit',
    alarmType: 'Deviation',
    tagName: 'MED-03',
    timeAlarmBecameActive: new Date('2024-01-15T14:28:00Z'),
  },
  {
    id: 'level-4',
    criticality: 'low',
    state: 'unacknowledged',
    alarmDescription: 'Filter maintenance due',
    alarmType: 'Low',
    tagName: 'LOW-04',
    timeAlarmBecameActive: new Date('2024-01-15T14:25:00Z'),
  },
];

const meta: Meta<ObcAlertListDetailsExperimental> = {
  title:
    'Application Components/Alerts/Alert List Details Experimental/ISA-18.2',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  args: {
    showHeader: true,
    alerts: isa182AlertsOfEveryPriority,
    columns: [
      statusColumn(),
      actionColumn({dividerRight: true}),
      typeColumn(),
      timeColumn(),
    ],
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertListDetailsExperimental'),
          'isa182AlertStandard'
        ),
      },
    },
  },
  argTypes: {
    columns: {control: false},
    filterId: {
      control: {type: 'select'},
      options: [
        undefined,
        'unacked',
        'active',
        'shelved',
        'suppressed-by-design',
        'out-of-service',
      ],
    },
  },
  render: (args) => {
    setAlertStandard(isa182AlertStandard);
    return html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      .filterId=${args.filterId}
      .columns=${args.columns}
      .showHeader=${args.showHeader}
      .alerts=${args.alerts}
      .selectedRowId=${args.selectedRowId}
      @cell-click=${moveClickedAlertToStateAfterAction<Isa182ListAlert>(
        (alarm, actionId) => isa182AlertAfterAction(alarm, actionId)
      )}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-details-experimental>`;
  },
} satisfies Meta<ObcAlertListDetailsExperimental>;

export default meta;
type Story = StoryObj<ObcAlertListDetailsExperimental>;

export const LevelCategories: Story = {};

const isa182AlertsInEveryKindOfState: Isa182ListAlert[] = [
  {
    id: 'unacknowledged',
    criticality: 'high',
    state: 'unacknowledged',
    alarmDescription: 'Unacknowledged',
    alarmType: 'High',
    tagName: 'high',
    timeAlarmBecameActive: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'acknowledged',
    criticality: 'high',
    state: 'acknowledged',
    alarmDescription: 'Acknowledged',
    alarmType: 'High',
    tagName: 'high',
    timeAlarmBecameActive: new Date('2024-01-15T14:38:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'returned-to-normal',
    criticality: 'high',
    state: 'returned-to-normal-unacknowledged',
    alarmDescription: 'Returned to normal, unacknowledged',
    alarmType: 'High',
    tagName: 'high',
    timeAlarmBecameActive: new Date('2024-01-15T14:37:00Z'),
  },
  {
    id: 'normal',
    criticality: 'high',
    state: 'normal',
    alarmDescription: 'Normal',
    alarmType: 'High',
    tagName: 'high',
  },
  {
    id: 'shelved',
    criticality: 'medium',
    state: 'shelved-active',
    alarmDescription: 'Shelved, active',
    alarmType: 'Deviation',
    tagName: 'medium',
    timeAlarmWasShelved: new Date('2024-01-15T14:34:00Z'),
  },
  {
    id: 'suppressed',
    criticality: 'critical',
    state: 'suppressed-by-design-not-active',
    alarmDescription: 'Suppressed by design, not active',
    alarmType: 'High-high',
    tagName: 'critical',
    timeAlarmWasSuppressed: new Date('2024-01-15T14:33:00Z'),
  },
  {
    id: 'out-of-service',
    criticality: 'low',
    state: 'out-of-service-active',
    alarmDescription: 'Out of service, active',
    alarmType: 'Low',
    tagName: 'low',
    timeAlarmWasPlacedOutOfService: new Date('2024-01-15T14:32:00Z'),
  },
];

const ISA_18_2_FILTER_IDS = [
  undefined,
  'unacked',
  'active',
  'shelved',
  'suppressed-by-design',
  'out-of-service',
];

export const FilterModes: Story = {
  name: 'Filters',
  parameters: {
    docs: {
      description: {
        story:
          'The same ISA-18.2 alarms, one in each kind of state, without a filter and under each filter the standard declares. A filter lists the alarms whose state is included in it.',
      },
    },
  },
  render: () => {
    setAlertStandard(isa182AlertStandard);
    return html`<style>
        .filters {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 16px;
        }
        .filters obc-alert-list-details-experimental {
          display: block;
          height: 440px;
        }
      </style>
      <div class="filters">
        ${ISA_18_2_FILTER_IDS.map(
          (filterId) =>
            html`<section>
              <h4>${filterId ?? 'no filter'}</h4>
              <obc-alert-list-details-experimental
                aria-label=${`${filterId ?? 'all'} alerts`}
                .filterId=${filterId}
                .alerts=${isa182AlertsInEveryKindOfState}
                .columns=${[statusColumn(), actionColumn()]}
                .showHeader=${false}
                @cell-click=${moveClickedAlertToStateAfterAction<Isa182ListAlert>(
                  (alarm, actionId) => isa182AlertAfterAction(alarm, actionId)
                )}
              ></obc-alert-list-details-experimental>
            </section>`
        )}
      </div>`;
  },
};
