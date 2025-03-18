import type {Meta, StoryObj} from '@storybook/web-components';
import {
  AutomationButtonDirection,
  AutomationButtonDirectonValueLabel,
  AutomationButtonStateLabel,
  AutomationButtonTagLabel,
  AutomationButtonVariant,
  ObcAutomationButton,
} from './automation-button';
import './automation-button';
import {html} from 'lit';
import '../../icons/icon-twoway-digital-open.js';
import '../../icons/icon-twoway-digital-closed.js';
import '../../icons/icon-switch-horizontal-on.js';
import '../../icons/icon-switch-horizontal-off.js';
import '../../icons/icon-damper-horizontal-on.js';
import '../../icons/icon-damper-horizontal-off.js';
import '../../automation/automation-badge/automation-badge';
import '../../icons/icon-alert-off-google.js';
import '../../icons/icon-auto.js';
import '../../icons/icon-duty.js';
import '../../icons/icon-pump-on-horizontal.js';
import '../../icons/icon-pump-off-horizontal.js';
import '../valve-analog-three-way-icon/valve-analog-three-way-icon';
import '../../icons/icon-command-locked-f.js';
import {crossDecorator} from '../../storybook-util.js';
import {
  ObcAlertFrameStatus,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
} from '../../components/alert-frame/alert-frame';

const meta: Meta<typeof ObcAutomationButton> = {
  title: 'Automation/Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-automation-button',
  decorators: [crossDecorator],
  argTypes: {
    labelPosition: {
      options: ['top', 'bottom', 'left', 'right'],
      control: {type: 'radio'},
    },
    labelSize: {
      options: ['small', 'regular', 'enhanced'],
      control: {type: 'radio'},
    },
    labelStyle: {
      options: ['regular', 'enhanced', 'active'],
      control: {type: 'radio'},
    },
    alert: {
      control: {type: 'boolean'},
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
    labelPosition: 'bottom',
    labelSize: 'regular',
    labelStyle: 'regular',
  },
  parameters: {
    // Overrides the default behavior and pauses the animation at the first frame at the component level for all stories.
    chromatic: {pauseAnimationAtEnd: false},
  },
} satisfies Meta<ObcAutomationButton>;

export default meta;
type Story = StoryObj<ObcAutomationButton>;

export const ValveOpen: Story = {
  render(args) {
    const labels = [
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      .variant=${args.variant}
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
    const labels = [
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      .alertFrameStatus=${args.alertFrameStatus}
      .alertFrameThickness=${args.alertFrameThickness}
      .alertFrameType=${args.alertFrameType}
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
    const labels = [
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-twoway-digital-open>
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

export const ValveProgress: Story = {
  args: {
    progress: true,
  },
  render(args) {
    const labels = [
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    const labels = [
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="closed"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      .static=${args.static}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    const labels = [];
    return html` <obc-automation-button
      state="open"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      .variant=${args.variant}
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

export const SwitchOn: Story = {
  render(args) {
    const labels = [
      {type: 'state', text: 'On', bold: true} as AutomationButtonStateLabel,
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      variant="square"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    const labels = [
      {type: 'state', text: 'Off', bold: false} as AutomationButtonStateLabel,
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="closed"
      variant="square"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    const labels = [
      {type: 'state', text: 'On', bold: true} as AutomationButtonStateLabel,
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      variant="square"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    const labels = [
      {type: 'state', text: 'Off', bold: false} as AutomationButtonStateLabel,
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="closed"
      variant="square"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    const labels = [
      {type: 'state', text: 'On', bold: true} as AutomationButtonStateLabel,
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      variant="square"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    const labels = [
      {type: 'state', text: 'On', bold: true} as AutomationButtonStateLabel,
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      variant="double"
      direction="forward"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      direction=${args.direction}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    direction: 'forward-stopped',
  },
  render(args) {
    const labels = [
      {type: 'state', text: 'Off', bold: false} as AutomationButtonStateLabel,
      {
        type: 'tag',
        text: '0000',
        showHash: false,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="closed"
      variant="double"
      direction="forward-stopped"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      .direction=${args.direction}
      ?alert=${args.alert}
      ?progress=${args.progress}
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
    },
  },
  args: {
    value: 70,
  },
  render(args) {
    const labels = [
      {
        nDigits: 3,
        type: 'direction',
        unit: 'percent',
        value: 100 - args.value,
        direction: 'up',
      } as AutomationButtonDirectonValueLabel,
      {
        nDigits: 3,
        type: 'direction',
        unit: 'percent',
        value: args.value,
        direction: 'right',
      } as AutomationButtonDirectonValueLabel,
      {
        type: 'tag',
        text: '0000',
        showHash: true,
      } as AutomationButtonTagLabel,
    ];
    return html` <obc-automation-button
      state="open"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obc-valve-analog-three-way-icon
        value=${args.value}
        value2=${100 - args.value}
        slot="icon"
      ></obc-valve-analog-three-way-icon>
    </obc-automation-button>`;
  },
};
