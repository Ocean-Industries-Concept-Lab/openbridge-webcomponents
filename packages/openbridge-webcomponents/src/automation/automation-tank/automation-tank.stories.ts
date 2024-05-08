import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAutomationTank, TankTrend, TankVariant} from './automation-tank';
import './automation-tank';
import '../../components/badge/badge';
import '../../icons/icon-08-auto';
import '../../icons/icon-16-lock';
import {html} from 'lit';

const meta: Meta<typeof ObcAutomationTank> = {
  title: 'Automation/Tank',
  tags: ['autodocs'],
  component: 'obc-automation-tank',
  args: {
    value: 9_000,
    max: 10_000,
    trend: TankTrend.fastFalling,
    tag: '#0000',
  },
  argTypes: {
    trend: {
      options: Object.values(TankTrend),
      control: {type: 'radio'},
    },
    value: {
      control: {type: 'range', min: 0, max: 10_000},
    },
    variant: {
      options: Object.values(TankVariant),
      control: {type: 'radio'},
    },
  },
  decorators: [
    (story) =>
      html`<div
        style="display: flex; justify-content: center; align-items: center; height: 100vh"
      >
        ${story()}
      </div>`,
  ],
} satisfies Meta<ObcAutomationTank>;

export default meta;
type Story = StoryObj<ObcAutomationTank>;

export const Vertical: Story = {
  args: {},
};

export const VerticalWithBadges: Story = {
  render(args) {
    return html`<obc-automation-tank
      .value=${args.value}
      .max=${args.max}
      .trend=${args.trend}
      .tag=${args.tag}
    >
      <obc-badge slot="badges" size="regular" hide-number type="automation">
        <obi-08-auto></obi-08-auto>
      </obc-badge>
      <obc-badge slot="badges" size="regular" hide-number type="automation">
        <obi-16-lock></obi-16-lock>
      </obc-badge>
    </obc-automation-tank>`;
  },
};

export const Compact: Story = {
  args: {
    variant: TankVariant.compact,
  },
};
