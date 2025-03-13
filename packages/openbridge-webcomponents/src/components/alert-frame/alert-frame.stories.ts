import type {Meta, StoryObj} from '@storybook/web-components';
import {
  ObcAlertFrame,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
  ObcAlertFrameStatus,
} from './alert-frame';
import './alert-frame';
import '../../icons/icon-placeholder';
import {html} from 'lit';

const meta: Meta<typeof ObcAlertFrame> = {
  title: 'Alert/Frame',
  tags: ['autodocs'],
  component: 'obc-alert-frame',
  args: {
    type: ObcAlertFrameType.SmallSideFlip,
    thickness: ObcAlertFrameThickness.Small,
    status: ObcAlertFrameStatus.Alarm,
  },
  argTypes: {
    type: {
      options: Object.values(ObcAlertFrameType),
      control: {
        type: 'select',
      },
    },
    thickness: {
      options: Object.values(ObcAlertFrameThickness),
      control: {
        type: 'select',
      },
    },
    status: {
      options: Object.values(ObcAlertFrameStatus),
      control: {
        type: 'select',
      },
    },
  },
  render(args) {
    return html`<obc-alert-frame
      .type=${args.type}
      .thickness=${args.thickness}
      .status=${args.status}
    >
      <div style="width: 150px; height: 50px; background-color: #999"></div>
      <obi-placeholder slot="icon"></obi-placeholder>
      <div slot="label">Label</div>
      <div slot="timer">00:00</div>
    </obc-alert-frame>`;
  },
} satisfies Meta<ObcAlertFrame>;

export default meta;
type Story = StoryObj<ObcAlertFrame>;

export const AlarmThick: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.Regular,
  },
};

export const AlarmThinn: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Small,
    type: ObcAlertFrameType.Regular,
  },
};

export const AlarmThickSmallSideFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.SmallSideFlip,
  },
};

export const AlarmThinnSmallSideFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Small,
    type: ObcAlertFrameType.SmallSideFlip,
  },
};

export const AlarmThickLargeSideFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.LargeSideFlip,
  },
};

export const AlarmThinnLargeSideFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Small,
    type: ObcAlertFrameType.LargeSideFlip,
  },
};

export const AlarmThickBottomFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.BottomFlip,
  },
};

export const AlarmThinnBottomFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Small,
    type: ObcAlertFrameType.BottomFlip,
  },
};
