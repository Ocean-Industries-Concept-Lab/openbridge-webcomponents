import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  AutomationButtonDirection,
  AutomationButtonPositioning,
  AutomationButtonVariant,
  ObcAutomationButton,
} from './automation-button.js';
import {
  AutomationButtonReadoutStack,
  AutomationButtonReadoutStackSize,
  AutomationButtonReadoutStackTag,
} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import {AutomationButtonReadoutPosition} from './automation-button.js';
import './automation-button.js';
import {html} from 'lit';
import '../../icons/icon-twoway-digital-open.js';
import '../../icons/icon-twoway-digital-closed.js';
import '../../icons/icon-switch-horizontal-on.js';
import '../../icons/icon-switch-horizontal-off.js';
import '../../icons/icon-damper-horizontal-on.js';
import '../../icons/icon-damper-horizontal-off.js';
import '../../automation/automation-badge/automation-badge.js';
import '../../icons/icon-alert-off-google.js';
import '../../icons/icon-auto.js';
import '../../icons/icon-duty.js';
import '../../icons/icon-pump-on-horizontal.js';
import '../../icons/icon-pump-off-horizontal.js';
import '../valve-analog-three-way-icon/valve-analog-three-way-icon.js';
import '../../icons/icon-command-locked-f.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame.js';

const meta: Meta<typeof ObcAutomationButton> = {
  title: 'Automation/Automation devices/Automation button',
  tags: ['autodocs', '6.0'],
  component: 'obc-automation-button',
  decorators: [crossDecorator],
  argTypes: {
    hasReadoutStack: {
      control: {type: 'boolean'},
    },
    hasIdTag: {
      control: {type: 'boolean'},
    },
    readoutPosition: {
      options: ['top', 'bottom', 'left', 'right'],
      control: {type: 'radio'},
    },
    readoutSize: {
      options: ['small', 'regular', 'enhanced'],
      control: {type: 'radio'},
    },
    alert: {
      control: {type: 'boolean'},
    },
    positioning: {
      options: Object.values(AutomationButtonPositioning),
      control: {type: 'select'},
    },
    variant: {
      options: Object.values(AutomationButtonVariant),
      control: {type: 'select'},
    },
    direction: {
      options: [
        'forward',
        'forward-fast',
        'forward-stopped',
        'backward',
        'backward-fast',
        'backward-stopped',
        'standby',
      ],
      control: {type: 'radio'},
    },
  },
  args: {
    hideReadoutStack: false,
    hasIdTag: true,
    readoutPosition: AutomationButtonReadoutPosition.bottom,
    readoutSize: AutomationButtonReadoutStackSize.regular,
  },
  parameters: {
    // Overrides the default behavior and pauses the animation at the first frame at the component level for all stories.
    chromatic: {pauseAnimationAtEnd: false},
  },
} as Meta<typeof ObcAutomationButton>;

export default meta;
type Story = StoryObj<ObcAutomationButton>;

export const ValveOpen: Story = {
  args: {
    direction: 'forward-fast',
    tag: {},
  },

  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html`<obc-automation-button
      state="open"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      .variant=${args.variant}
      .positioning=${args.positioning}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-open>
      <obi-twoway-digital-open
        usecsscolor
        slot="icon-siluette"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-open>
    </obc-automation-button>`;
  },
};

export const ValveFlat: Story = {
  ...ValveOpen,
  args: {
    variant: AutomationButtonVariant.flat,
  },
};

export const ValveAlert: Story = {
  argTypes: {
    alertFrameType: {
      options: Object.values(ObcAlertFrameType),
      control: {
        type: 'select',
      },
    },
    alertFrameThickness: {
      options: Object.values(ObcAlertFrameThickness),
      control: {
        type: 'select',
      },
    },
    alertFrameStatus: {
      options: Object.values(ObcAlertFrameStatus),
      control: {
        type: 'select',
      },
    },
  },
  args: {
    alert: true,
    alertFrameType: ObcAlertFrameType.LargeSideFlip,
    alertFrameThickness: ObcAlertFrameThickness.Small,
    alertFrameStatus: ObcAlertFrameStatus.Alarm,
  },
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="open"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      .alertFrameStatus=${args.alertFrameStatus}
      .alertFrameThickness=${args.alertFrameThickness}
      .alertFrameType=${args.alertFrameType}
      .positioning=${args.positioning}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-open>
      <obi-placeholder slot="alert-icon"></obi-placeholder>
      <div slot="alert-label">Label</div>
      <div slot="alert-timer">00:45</div>
    </obc-automation-button>`;
  },
};

export const ValveBadges: Story = {
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="open"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      ?alert=${args.alert}
      ?progress=${args.progress}
      hasBadgeSpacer
      .positioning=${args.positioning}
    >
      <obi-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-open>
      <obc-automation-badge slot="badge-top-right">
        <obi-alert-off-google></obi-alert-off-google>
        <obi-alert-off-google slot="icon-siluette"></obi-alert-off-google>
      </obc-automation-badge>
      <obc-automation-badge slot="badge-top-left">
        <obi-auto></obi-auto>
        <obi-auto slot="icon-siluette"></obi-auto>
      </obc-automation-badge>
      <obc-automation-badge slot="badge-bottom-left">
        <obi-duty></obi-duty>
        <obi-duty slot="icon-siluette"></obi-duty>
      </obc-automation-badge>
      <obc-automation-badge slot="badge-bottom-right">
        <obi-command-locked-f></obi-command-locked-f>
        <obi-command-locked-f slot="icon-siluette"></obi-command-locked-f>
      </obc-automation-badge>
    </obc-automation-button>`;
  },
};

export const ValveProgress: Story = {
  args: {
    progress: true,
  },
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="open"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-open>
    </obc-automation-button>`;
  },
};

export const ValveClosed: Story = {
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="closed"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      .static=${args.static}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-twoway-digital-closed
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-closed>
    </obc-automation-button>`;
  },
};

export const ValveClosedStatic: Story = {
  ...ValveClosed,
  args: {
    static: true,
  },
};

export const ValveNoLabels: Story = {
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [];
    const tag: AutomationButtonReadoutStackTag | null = null;
    return html` <obc-automation-button
      state="open"
      .hideReadoutStack=${true}
      .hasIdTag=${false}
      .readouts=${readouts}
      .tag=${tag}
      .variant=${args.variant}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-open>
      <obi-twoway-digital-open
        usecsscolor
        slot="icon-siluette"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-open>
    </obc-automation-button>`;
  },
};

export const SwitchOn: Story = {
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [
      {type: 'state-on', value: 'On', hasIcon: true},
    ];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="open"
      variant="square"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-switch-horizontal-on
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-switch-horizontal-on>
    </obc-automation-button>`;
  },
};

export const SwitchOff: Story = {
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [
      {type: 'state-off', value: 'Off', hasIcon: true},
    ];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="closed"
      variant="square"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-switch-horizontal-off
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-switch-horizontal-off>
    </obc-automation-button>`;
  },
};

export const DamperOn: Story = {
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [
      {type: 'state-on', value: 'On', hasIcon: true},
    ];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="open"
      variant="square"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-damper-horizontal-on
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-damper-horizontal-on>
    </obc-automation-button>`;
  },
};

export const DamperOff: Story = {
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [
      {type: 'state-off', value: 'Off', hasIcon: true},
    ];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="closed"
      variant="square"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-damper-horizontal-off
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-damper-horizontal-off>
    </obc-automation-button>`;
  },
};

export const DamperBadges: Story = {
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [
      {type: 'state-on', value: 'On', hasIcon: true},
    ];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="open"
      variant="square"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-damper-horizontal-on
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-damper-horizontal-on>
      <obc-automation-badge slot="badge-top-right">
        <obi-alert-off-google></obi-alert-off-google>
      </obc-automation-badge>
      <obc-automation-badge slot="badge-top-left">
        <obi-auto></obi-auto>
      </obc-automation-badge>
      <obc-automation-badge slot="badge-bottom-left">
        <obi-duty></obi-duty>
      </obc-automation-badge>
      <obc-automation-badge slot="badge-bottom-right">
        <obi-command-locked-f></obi-command-locked-f>
      </obc-automation-badge>
    </obc-automation-button>`;
  },
};

export const MotorOn: Story = {
  args: {
    direction: AutomationButtonDirection.forward,
  },
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [
      {type: 'state-on', value: 'On', hasIcon: true},
    ];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="open"
      variant="double"
      direction="forward"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      direction=${args.direction}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-pump-on-horizontal
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-pump-on-horizontal>
    </obc-automation-button>`;
  },
};

export const MotorOff: Story = {
  args: {
    direction: AutomationButtonDirection.forwardStopped,
  },
  render(args) {
    const readouts: AutomationButtonReadoutStack[] = [
      {type: 'state-off', value: 'Off', hasIcon: true},
    ];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="closed"
      variant="double"
      direction="forward-stopped"
      .hideReadoutStack=${args.hideReadoutStack}
      .hasIdTag=${args.hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      .direction=${args.direction}
      ?alert=${args.alert}
      ?progress=${args.progress}
      .positioning=${args.positioning}
    >
      <obi-pump-off-horizontal
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-pump-off-horizontal>
    </obc-automation-button>`;
  },
};

export const ThreeWayValveOpenRight: Story = {
  argTypes: {
    value: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      table: {category: 'Story-specific'},
    },
  } as Partial<Record<string, unknown>>,
  args: {
    value: 70,
  } as Record<string, unknown>,
  render(args) {
    const storyArgs = args as unknown as Record<string, unknown> & {
      value: number;
      alert?: boolean;
      progress?: boolean;
    };
    const readouts: AutomationButtonReadoutStack[] = [
      {
        type: 'value',
        value: 100 - storyArgs.value,
        nDigits: 3,
        unit: '%',
        direction: 'up',
        icon: 'arrow',
      },
      {
        type: 'value',
        value: storyArgs.value,
        nDigits: 3,
        unit: '%',
        direction: 'right',
        icon: 'arrow',
      },
    ];
    const tag: AutomationButtonReadoutStackTag | null = {value: 0};
    return html` <obc-automation-button
      state="open"
      .hideReadoutStack=${(args as unknown as ObcAutomationButton)
        .hideReadoutStack}
      .hasIdTag=${(args as unknown as ObcAutomationButton).hasIdTag}
      .readouts=${readouts}
      .tag=${tag}
      ?alert=${storyArgs.alert}
      ?progress=${storyArgs.progress}
    >
      <obc-valve-analog-three-way-icon
        value=${storyArgs.value}
        value2=${100 - storyArgs.value}
        slot="icon"
      ></obc-valve-analog-three-way-icon>
    </obc-automation-button>`;
  },
};
