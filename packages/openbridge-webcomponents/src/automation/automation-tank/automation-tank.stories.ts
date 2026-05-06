import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAutomationTank,
  TankOrientation,
  TankTrend,
  TankType,
} from './automation-tank.js';
import './automation-tank.js';
import '../../components/badge/badge.js';
import '../../icons/icon-auto.js';
import '../../icons/icon-command-locked-f.js';
import {html} from 'lit';
import {crossDecorator} from '../../storybook-util.js';
import {BadgeType, BadgeSize} from '../../components/badge/badge.js';

const meta: Meta<ObcAutomationTank> = {
  title: 'Automation/Tanks/Tank',
  tags: ['autodocs'],
  component: 'obc-automation-tank',
  args: {
    value: 9_000,
    max: 10_000,
    trend: TankTrend.fastFalling,
    tag: '#0000',
    type: TankType.generic,
    orientation: TankOrientation.vertical,
    compact: false,
  },
  argTypes: {
    trend: {
      options: Object.values(TankTrend),
      control: {type: 'radio'},
    },
    type: {
      options: Object.values(TankType),
      control: {type: 'radio'},
    },
    orientation: {
      options: Object.values(TankOrientation),
      control: {type: 'radio'},
    },
    value: {
      control: {type: 'range', min: 0, max: 10_000},
    },
    compact: {
      control: {type: 'boolean'},
    },
  },
  decorators: [crossDecorator],
} satisfies Meta<ObcAutomationTank>;

export default meta;
type Story = StoryObj<ObcAutomationTank>;

export const Generic: Story = {
  args: {type: TankType.generic},
};

export const Atmospheric: Story = {
  args: {type: TankType.atmospheric},
};

export const Pressurized: Story = {
  args: {type: TankType.pressurized},
};

export const Battery: Story = {
  args: {type: TankType.battery},
};

export const AtmosphericWithBadges: Story = {
  args: {type: TankType.atmospheric},
  render(args) {
    return html`
      <obc-automation-tank
        .value=${args.value}
        .max=${args.max}
        .trend=${args.trend}
        .tag=${args.tag}
        .type=${args.type}
        .orientation=${args.orientation}
        .compact=${args.compact}
      >
        <obc-badge
          slot="badges"
          .size=${BadgeSize.regular}
          .showNumber=${false}
          .type=${BadgeType.automation}
          .showIcon=${true}
        >
          <obi-auto slot="badge-icon"></obi-auto>
        </obc-badge>
        <obc-badge
          slot="badges"
          .size=${BadgeSize.regular}
          .showNumber=${false}
          .type=${BadgeType.automation}
          .showIcon=${true}
        >
          <obi-command-locked-f slot="badge-icon"></obi-command-locked-f>
        </obc-badge>
      </obc-automation-tank>
    `;
  },
};

export const Compact: Story = {
  args: {compact: true},
};

export const CompactAtmospheric: Story = {
  args: {compact: true, type: TankType.atmospheric},
};

export const Horizontal: Story = {
  args: {orientation: TankOrientation.horizontal},
};

export const HorizontalAtmospheric: Story = {
  args: {
    orientation: TankOrientation.horizontal,
    type: TankType.atmospheric,
  },
};
