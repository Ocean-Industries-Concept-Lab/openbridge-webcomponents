import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcPump} from './pump.js';
import './pump.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  AutomationButtonDirection,
  AutomationButtonLabelDirection,
  AutomationButtonReadoutPosition,
  AutomationButtonVariant,
} from '../automation-button/automation-button.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {argTypesAbstractAutomationButtonMotorized} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import {
  AutomationButtonBadgeAlert,
  AutomationButtonBadgeCommandLocked,
  AutomationButtonBadgeControl,
  AutomationButtonBadgeInterlock,
} from '../automation-button/abstract-automation-button.js';
import {
  AutomationButtonBadgeKind,
  setAutomationBadgeLayout,
} from '../automation-button/badge-layout.js';
import {setAutomationBadgeSymbolOverride} from '../automation-button/badge-symbols.js';

const meta: Meta<typeof ObcPump> = {
  title: 'Automation/Automation Devices/Pump',
  tags: ['6.0'],
  component: 'obc-pump',
  decorators: [crossDecorator],
  args: {
    tag: '#0007',
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonMotorized,
  },
} as Meta<typeof ObcPump>;

export default meta;
type Story = StoryObj<ObcPump>;

export const OnVerical: Story = {
  args: {
    turnedOn: true,
    vertical: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: AutomationButtonLabelDirection.up,
  },
};

export const OnHorizontal: Story = {
  args: {
    turnedOn: true,
    vertical: false,
    direction: AutomationButtonDirection.backwardFast,
    labelDirection: AutomationButtonLabelDirection.left,
  },
};

export const OffVertical: Story = {
  args: {
    turnedOn: false,
    vertical: true,
    direction: AutomationButtonDirection.standby,
    labelDirection: AutomationButtonLabelDirection.up,
  },
};

export const OffHorizontal: Story = {
  args: {
    turnedOn: false,
    vertical: false,
    direction: AutomationButtonDirection.backwardStopped,
    labelDirection: AutomationButtonLabelDirection.right,
  },
};

export const VariantDoubleSizeLarge: Story = {
  args: {
    turnedOn: true,
    vertical: true,
    direction: AutomationButtonDirection.forward,
    labelDirection: AutomationButtonLabelDirection.up,
    variant: AutomationButtonVariant.double,
  },
  globals: {
    componentSize: 'obc-component-size-large',
  },
};

const allBadges = {
  turnedOn: true,
  vertical: false,
  direction: AutomationButtonDirection.forward,
  labelDirection: AutomationButtonLabelDirection.left,
  badgeControl: AutomationButtonBadgeControl.Auto,
  badgeAlert: AutomationButtonBadgeAlert.Alarm,
  badgeInterlock: AutomationButtonBadgeInterlock.Interlock,
  badgeCommandLocked: AutomationButtonBadgeCommandLocked.CommandLocked,
};

export const BadgeLayoutLocal: Story = {
  args: {
    ...allBadges,
    badgeLayout: {
      topLeft: AutomationButtonBadgeKind.Alert,
      topRight: AutomationButtonBadgeKind.Control,
      bottomRight: null,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alert and control swap corners on this pump only, and command-locked is hidden.',
      },
    },
  },
};

export const BadgeLayoutGlobal: Story = {
  args: allBadges,
  beforeEach: () => {
    setAutomationBadgeLayout({
      topLeft: AutomationButtonBadgeKind.Interlock,
      bottomLeft: AutomationButtonBadgeKind.Control,
    });
    return () => setAutomationBadgeLayout(undefined);
  },
  parameters: {
    docs: {
      description: {
        story:
          'The app-wide layout from `setAutomationBadgeLayout()` puts interlock top-left and control bottom-left on every device.',
      },
    },
  },
};

const simulationBadges = {
  ...allBadges,
  badgeInterlock: AutomationButtonBadgeInterlock.Simulation,
  badgeCommandLocked: AutomationButtonBadgeCommandLocked.Simulation,
};

export const BadgeSymbolsLocal: Story = {
  args: {
    ...simulationBadges,
    badgeSymbolOverride: {
      control: {auto: 'a'},
      commandLocked: {simulation: 's'},
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'This pump draws A for auto and S for simulation on the command-locked corner; the interlock corner keeps the simulation cube.',
      },
    },
  },
};

export const BadgeSymbolsGlobal: Story = {
  args: simulationBadges,
  beforeEach: () => {
    setAutomationBadgeSymbolOverride({
      interlock: {simulation: 's'},
      commandLocked: {simulation: 's'},
    });
    return () => setAutomationBadgeSymbolOverride(undefined);
  },
  parameters: {
    docs: {
      description: {
        story:
          'The app-wide override from `setAutomationBadgeSymbolOverride()` draws S for simulation on every device.',
      },
    },
  },
};
