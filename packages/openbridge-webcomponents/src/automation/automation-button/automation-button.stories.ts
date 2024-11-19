import type {Meta, StoryObj} from '@storybook/web-components';
import {
  AutomationButtonDirection,
  AutomationButtonDirectonValueLabel,
  AutomationButtonSize,
  AutomationButtonStateLabel,
  AutomationButtonTagLabel,
  ObcAutomationButton,
} from './automation-button';
import './automation-button';
import {html} from 'lit';
import '../../icons/icon-09-twoway-digital-open';
import '../../icons/icon-09-twoway-digital-closed';
import '../../icons/icon-09-switch-horizontal-on';
import '../../icons/icon-09-switch-horizontal-off';
import '../../icons/icon-09-damper-horizontal-on';
import '../../icons/icon-09-damper-horizontal-off';
import '../../components/badge/badge';
import '../../icons/icon-14-alert-off';
import '../../icons/icon-08-auto';
import '../../icons/icon-08-duty';
import '../../icons/icon-16-lock';
import '../../icons/icon-08-pump-on-horisontal';
import '../../icons/icon-08-pump-off-horisontal';
import '../valve-analog-three-way-icon/valve-analog-three-way-icon';
import {BadgeSize} from '../../components/badge/badge';
import {crossDecorator} from '../../storybook-util';

const meta: Meta<typeof ObcAutomationButton> = {
  title: 'Automation/Button',
  tags: ['autodocs'],
  component: 'obc-automation-button',
  decorators: [crossDecorator],
  argTypes: {
    size: {
      options: ['small', 'regular', 'large', 'xl'],
      control: {type: 'radio'},
    },
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
    size: 'regular',
    labelPosition: 'bottom',
    labelSize: 'regular',
    labelStyle: 'regular',
  },
  parameters: {
    // Overrides the default behavior and pauses the animation at the first frame at the component level for all stories.
    chromatic: { pauseAnimationAtEnd: false },
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
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-09-twoway-digital-open>
    </obc-automation-button>`;
  },
};

export const ValveAlert: Story = {
  args: {
    alert: true,
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
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-09-twoway-digital-open>
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
    const badgeSize = [
      AutomationButtonSize.small,
      AutomationButtonSize.regular,
    ].includes(args.size)
      ? BadgeSize.regular
      : BadgeSize.large;
    return html` <obc-automation-button
      state="open"
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-09-twoway-digital-open>
      <obc-badge
        hideNumber
        type="automation"
        .size=${badgeSize}
        slot="badge-top-right"
      >
        <obi-14-alert-off></obi-14-alert-off>
      </obc-badge>
      <obc-badge
        hideNumber
        type="automation"
        .size=${badgeSize}
        slot="badge-top-left"
      >
        <obi-08-auto></obi-08-auto>
      </obc-badge>
      <obc-badge
        hideNumber
        type="automation"
        .size=${badgeSize}
        slot="badge-bottom-left"
      >
        <obi-08-duty></obi-08-duty>
      </obc-badge>
      <obc-badge
        hideNumber
        type="automation"
        .size=${badgeSize}
        slot="badge-bottom-right"
      >
        <obi-16-lock></obi-16-lock>
      </obc-badge>
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
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-twoway-digital-open
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-09-twoway-digital-open>
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
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-twoway-digital-closed
        usecsscolor
        slot="icon"
        style="display: block; transform: rotate(90deg); line-height: 0;"
      ></obi-09-twoway-digital-closed>
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
      variant="switch"
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-switch-horizontal-on
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-09-switch-horizontal-on>
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
      variant="switch"
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-switch-horizontal-off
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-09-switch-horizontal-off>
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
      variant="switch"
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-damper-horizontal-on
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-09-damper-horizontal-on>
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
      variant="switch"
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-damper-horizontal-off
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-09-damper-horizontal-off>
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
    const badgeSize = [
      AutomationButtonSize.small,
      AutomationButtonSize.regular,
    ].includes(args.size)
      ? BadgeSize.regular
      : BadgeSize.large;
    return html` <obc-automation-button
      state="open"
      size=${args.size}
      variant="switch"
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-09-damper-horizontal-on
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-09-damper-horizontal-on>
      <obc-badge
        hideNumber
        type="automation"
        .size=${badgeSize}
        slot="badge-top-right"
      >
        <obi-14-alert-off></obi-14-alert-off>
      </obc-badge>
      <obc-badge
        hideNumber
        type="automation"
        .size=${badgeSize}
        slot="badge-top-left"
      >
        <obi-08-auto></obi-08-auto>
      </obc-badge>
      <obc-badge
        hideNumber
        type="automation"
        .size=${badgeSize}
        slot="badge-bottom-left"
      >
        <obi-08-duty></obi-08-duty>
      </obc-badge>
      <obc-badge
        hideNumber
        type="automation"
        .size=${badgeSize}
        slot="badge-bottom-right"
      >
        <obi-16-lock></obi-16-lock>
      </obc-badge>
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
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      direction=${args.direction}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-08-pump-on-horisontal
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-08-pump-on-horisontal>
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
      size=${args.size}
      .labels=${labels}
      .labelPosition=${args.labelPosition}
      .labelSize=${args.labelSize}
      .labelStyle=${args.labelStyle}
      .direction=${args.direction}
      ?alert=${args.alert}
      ?progress=${args.progress}
    >
      <obi-08-pump-off-horisontal
        usecsscolor
        slot="icon"
        style="display: block; line-height: 0;"
      ></obi-08-pump-off-horisontal>
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
      size=${args.size}
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
