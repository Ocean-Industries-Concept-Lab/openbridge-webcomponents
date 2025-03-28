import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcAutomationTank, TankTrend, TankVariant} from './automation-tank';
import './automation-tank';
import '../../components/badge/badge';
import '../../icons/icon-auto';
import '../../icons/icon-command-locked-f';
import {html} from 'lit';
import {crossDecorator} from '../../storybook-util';

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
  decorators: [crossDecorator],
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
      <obc-badge slot="badges" size="regular" hideNumber type="automation">
        <obi-auto></obi-auto>
      </obc-badge>
      <obc-badge slot="badges" size="regular" hideNumber type="automation">
        <obi-command-locked-f></obi-command-locked-f>
      </obc-badge>
    </obc-automation-tank>`;
  },
};

export const Compact: Story = {
  args: {
    variant: TankVariant.compact,
  },
};
