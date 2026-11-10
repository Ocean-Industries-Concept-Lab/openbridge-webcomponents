import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcAlertListDetailsExperimental,
  actionColumn,
  statusColumn,
  timeColumn,
  type AlertAcknowledgedByField,
} from './alert-list-details-experimental.js';
import {
  defineAlertStandard,
  type AlertStateDefinition,
} from '../../alert-system/alert-standard.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {
  isa182AlertStandard,
  type Isa182AlertOf,
} from '../../alert-system/isa-18-2-alert-standard.js';
import {
  isa182AlertAfterAction,
  isa182ServiceViewStateAfterAction,
  moveClickedAlertToStateAfterAction,
} from '../../alert-system/stories/state-after-action.js';
import {componentDocsWithSetAlertStandardCall} from '../../alert-system/stories/alert-standard-docs.js';
import {classDocs} from '../../../.storybook/manifest-docs.js';
import '../alert-frame/diagnostic-badge.js';

const RemoveFromService = 'remove-from-service';
const ReturnToService = 'return-to-service';

const offeringOnly = <State extends AlertStateDefinition>(
  state: State,
  actionId: typeof RemoveFromService | typeof ReturnToService
) => ({...state, offeredActions: [actionId]});

const isa182 = isa182AlertStandard.criticalities;

// TODO(designer): the diagnostic badge has no second frame to flash with, so
// a diagnostic alarm stays steady in every state.
const diagnosticGlyph = {
  frame: html`<obi-diagnostic-badge
    style="color: var(--alert-diagnostic-color)"
  ></obi-diagnostic-badge>`,
};

/**
 * ISA-18.2 as a maintenance console sees it, defined by the application on
 * top of the library's standard. Maintenance takes alarms out of service and
 * returns them, and does not acknowledge or shelve; instrument and system
 * faults get a diagnostic priority below low.
 */
const isa182ServiceViewStandardDefinedByTheApplication = defineAlertStandard({
  filters: isa182AlertStandard.filters,
  display: isa182AlertStandard.display,
  actions: {
    ...isa182AlertStandard.actions,
    [RemoveFromService]: {label: () => 'Disable'},
    [ReturnToService]: {label: () => 'Enable'},
  },
  criticalities: {
    critical: {
      states: {
        unacknowledged: offeringOnly(
          isa182.critical.states.unacknowledged,
          RemoveFromService
        ),
        'returned-to-normal-unacknowledged': offeringOnly(
          isa182.critical.states['returned-to-normal-unacknowledged'],
          RemoveFromService
        ),
        acknowledged: offeringOnly(
          isa182.critical.states.acknowledged,
          RemoveFromService
        ),
        'shelved-active': offeringOnly(
          isa182.critical.states['shelved-active'],
          RemoveFromService
        ),
        'shelved-not-active': offeringOnly(
          isa182.critical.states['shelved-not-active'],
          RemoveFromService
        ),
        'suppressed-by-design-active': offeringOnly(
          isa182.critical.states['suppressed-by-design-active'],
          RemoveFromService
        ),
        'suppressed-by-design-not-active': offeringOnly(
          isa182.critical.states['suppressed-by-design-not-active'],
          RemoveFromService
        ),
        'out-of-service-active': offeringOnly(
          isa182.critical.states['out-of-service-active'],
          ReturnToService
        ),
        'out-of-service-not-active': offeringOnly(
          isa182.critical.states['out-of-service-not-active'],
          ReturnToService
        ),
        normal: offeringOnly(isa182.critical.states.normal, RemoveFromService),
      },
    },
    high: {
      states: {
        unacknowledged: offeringOnly(
          isa182.high.states.unacknowledged,
          RemoveFromService
        ),
        'returned-to-normal-unacknowledged': offeringOnly(
          isa182.high.states['returned-to-normal-unacknowledged'],
          RemoveFromService
        ),
        acknowledged: offeringOnly(
          isa182.high.states.acknowledged,
          RemoveFromService
        ),
        'shelved-active': offeringOnly(
          isa182.high.states['shelved-active'],
          RemoveFromService
        ),
        'shelved-not-active': offeringOnly(
          isa182.high.states['shelved-not-active'],
          RemoveFromService
        ),
        'suppressed-by-design-active': offeringOnly(
          isa182.high.states['suppressed-by-design-active'],
          RemoveFromService
        ),
        'suppressed-by-design-not-active': offeringOnly(
          isa182.high.states['suppressed-by-design-not-active'],
          RemoveFromService
        ),
        'out-of-service-active': offeringOnly(
          isa182.high.states['out-of-service-active'],
          ReturnToService
        ),
        'out-of-service-not-active': offeringOnly(
          isa182.high.states['out-of-service-not-active'],
          ReturnToService
        ),
        normal: offeringOnly(isa182.high.states.normal, RemoveFromService),
      },
    },
    medium: {
      states: {
        unacknowledged: offeringOnly(
          isa182.medium.states.unacknowledged,
          RemoveFromService
        ),
        'returned-to-normal-unacknowledged': offeringOnly(
          isa182.medium.states['returned-to-normal-unacknowledged'],
          RemoveFromService
        ),
        acknowledged: offeringOnly(
          isa182.medium.states.acknowledged,
          RemoveFromService
        ),
        'shelved-active': offeringOnly(
          isa182.medium.states['shelved-active'],
          RemoveFromService
        ),
        'shelved-not-active': offeringOnly(
          isa182.medium.states['shelved-not-active'],
          RemoveFromService
        ),
        'suppressed-by-design-active': offeringOnly(
          isa182.medium.states['suppressed-by-design-active'],
          RemoveFromService
        ),
        'suppressed-by-design-not-active': offeringOnly(
          isa182.medium.states['suppressed-by-design-not-active'],
          RemoveFromService
        ),
        'out-of-service-active': offeringOnly(
          isa182.medium.states['out-of-service-active'],
          ReturnToService
        ),
        'out-of-service-not-active': offeringOnly(
          isa182.medium.states['out-of-service-not-active'],
          ReturnToService
        ),
        normal: offeringOnly(isa182.medium.states.normal, RemoveFromService),
      },
    },
    low: {
      states: {
        unacknowledged: offeringOnly(
          isa182.low.states.unacknowledged,
          RemoveFromService
        ),
        'returned-to-normal-unacknowledged': offeringOnly(
          isa182.low.states['returned-to-normal-unacknowledged'],
          RemoveFromService
        ),
        acknowledged: offeringOnly(
          isa182.low.states.acknowledged,
          RemoveFromService
        ),
        'shelved-active': offeringOnly(
          isa182.low.states['shelved-active'],
          RemoveFromService
        ),
        'shelved-not-active': offeringOnly(
          isa182.low.states['shelved-not-active'],
          RemoveFromService
        ),
        'suppressed-by-design-active': offeringOnly(
          isa182.low.states['suppressed-by-design-active'],
          RemoveFromService
        ),
        'suppressed-by-design-not-active': offeringOnly(
          isa182.low.states['suppressed-by-design-not-active'],
          RemoveFromService
        ),
        'out-of-service-active': offeringOnly(
          isa182.low.states['out-of-service-active'],
          ReturnToService
        ),
        'out-of-service-not-active': offeringOnly(
          isa182.low.states['out-of-service-not-active'],
          ReturnToService
        ),
        normal: offeringOnly(isa182.low.states.normal, RemoveFromService),
      },
    },
    diagnostic: {
      states: {
        unacknowledged: {
          glyph: diagnosticGlyph,
          sortingRank: 33,
          includedInFilters: ['unacked', 'active'],
          offeredActions: [RemoveFromService],
        },
        'returned-to-normal-unacknowledged': {
          glyph: diagnosticGlyph,
          sortingRank: 53,
          includedInFilters: ['unacked'],
          offeredActions: [RemoveFromService],
        },
        acknowledged: {
          glyph: diagnosticGlyph,
          sortingRank: 83,
          includedInFilters: ['active'],
          offeredActions: [RemoveFromService],
        },
        'shelved-active': {
          glyph: diagnosticGlyph,
          sortingRank: 208,
          includedInFilters: ['shelved'],
          offeredActions: [RemoveFromService],
        },
        'shelved-not-active': {
          glyph: diagnosticGlyph,
          sortingRank: 209,
          includedInFilters: ['shelved'],
          offeredActions: [RemoveFromService],
        },
        'suppressed-by-design-active': {
          glyph: diagnosticGlyph,
          sortingRank: 218,
          includedInFilters: ['suppressed-by-design'],
          offeredActions: [RemoveFromService],
        },
        'suppressed-by-design-not-active': {
          glyph: diagnosticGlyph,
          sortingRank: 219,
          includedInFilters: ['suppressed-by-design'],
          offeredActions: [RemoveFromService],
        },
        'out-of-service-active': {
          glyph: diagnosticGlyph,
          sortingRank: 228,
          includedInFilters: ['out-of-service'],
          offeredActions: [ReturnToService],
        },
        'out-of-service-not-active': {
          glyph: diagnosticGlyph,
          sortingRank: 229,
          includedInFilters: ['out-of-service'],
          offeredActions: [ReturnToService],
        },
        normal: {
          glyph: diagnosticGlyph,
          sortingRank: 344,
          offeredActions: [RemoveFromService],
        },
      },
    },
  },
});

type Isa182ServiceViewAlert = Isa182AlertOf<
  typeof isa182ServiceViewStandardDefinedByTheApplication
> &
  AlertAcknowledgedByField;

const isa182ServiceViewAlerts: Isa182ServiceViewAlert[] = [
  {
    id: 'pressure-transmitter',
    criticality: 'high',
    state: 'unacknowledged',
    alarmDescription: 'Separator pressure high',
    alarmType: 'High',
    tagName: 'PT-101',
    timeAlarmBecameActive: new Date('2024-01-15T14:39:00Z'),
  },
  {
    id: 'level-transmitter',
    criticality: 'medium',
    state: 'acknowledged',
    alarmDescription: 'Tank level high',
    alarmType: 'Deviation',
    tagName: 'LT-204',
    timeAlarmBecameActive: new Date('2024-01-15T14:37:00Z'),
    acknowledgedBy: 'John Doe',
  },
  {
    id: 'flow-transmitter-fault',
    criticality: 'diagnostic',
    state: 'unacknowledged',
    alarmDescription: 'Flow transmitter signal out of range',
    alarmType: 'Bad measurement',
    tagName: 'FT-310',
    timeAlarmBecameActive: new Date('2024-01-15T14:35:00Z'),
  },
  {
    id: 'temperature-transmitter',
    criticality: 'low',
    state: 'out-of-service-not-active',
    alarmDescription: 'Cooling water temperature low, sensor under repair',
    alarmType: 'Low',
    tagName: 'TT-115',
    timeAlarmWasPlacedOutOfService: new Date('2024-01-15T13:10:00Z'),
  },
  {
    id: 'gas-detector',
    criticality: 'critical',
    state: 'out-of-service-active',
    alarmDescription: 'Gas detector high, under calibration',
    alarmType: 'High-high',
    tagName: 'GD-402',
    timeAlarmWasPlacedOutOfService: new Date('2024-01-15T12:45:00Z'),
  },
];

const meta: Meta<ObcAlertListDetailsExperimental> = {
  title:
    'Application Components/Alerts/Alert List Details Experimental/Service View',
  tags: ['6.0', 'experimental'],
  component: 'obc-alert-list-details-experimental',
  args: {
    showHeader: true,
    columns: [
      statusColumn(),
      actionColumn({label: 'OOSRV', dividerRight: true}),
      timeColumn(),
    ],
    alerts: isa182ServiceViewAlerts,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: componentDocsWithSetAlertStandardCall(
          classDocs('ObcAlertListDetailsExperimental'),
          'isa182ServiceViewStandardDefinedByTheApplication'
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
    setAlertStandard(isa182ServiceViewStandardDefinedByTheApplication);
    return html`<obc-alert-list-details-experimental
      aria-label="Alerts"
      .filterId=${args.filterId}
      .columns=${args.columns}
      .showHeader=${args.showHeader}
      .alerts=${args.alerts}
      .selectedRowId=${args.selectedRowId}
      @cell-click=${moveClickedAlertToStateAfterAction<Isa182ServiceViewAlert>(
        (alarm, actionId) =>
          isa182AlertAfterAction(
            alarm,
            actionId,
            isa182ServiceViewStateAfterAction
          )
      )}
      style="height: 100vh; display: block; max-height: 100%;"
    ></obc-alert-list-details-experimental>`;
  },
} satisfies Meta<ObcAlertListDetailsExperimental>;

export default meta;
type Story = StoryObj<ObcAlertListDetailsExperimental>;

export const ServiceView: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The library's ISA-18.2 standard extended by the application for a maintenance console. ISA-18.2 puts taking an alarm out of service and returning it under the control of maintenance, so the library offers the operator neither. This story spreads `isa182AlertStandard`, its filters and display fields included, into a standard of its own that offers only Disable (remove from service) and Enable (return to service) in an OOSRV column, and adds a diagnostic priority for instrument and system faults.",
      },
    },
  },
};
