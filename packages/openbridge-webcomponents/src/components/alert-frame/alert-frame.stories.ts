import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcAlertFrame,
  ObcAlertFrameThickness,
  ObcAlertFrameType,
  ObcAlertFrameStatus,
  AlertFrameTextSize,
} from './alert-frame.js';
import './alert-frame.js';
import '../../icons/icon-placeholder.js';
import {html} from 'lit';

const meta: Meta<typeof ObcAlertFrame> = {
  title: 'UI Components/Message and Alerts/Alert Frame',
  tags: ['autodocs', '6.0'],
  component: 'obc-alert-frame',
  args: {
    type: ObcAlertFrameType.SmallSideFlip,
    thickness: ObcAlertFrameThickness.Small,
    status: ObcAlertFrameStatus.Alarm,
    demoWidth: 200,
    showIcon: true,
    showAlertCategoryIcon: true,
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
    demoWidth: {
      control: {
        type: 'range',
        min: 20,
        max: 500,
        step: 10,
      },
    },
  },
  render(args) {
    return html` <div style="width: fit-content; position: relative;">
      <div
        style="width: ${args.demoWidth}px; height: 150px; background-color: #999"
      ></div>
      <obc-alert-frame
        .type=${args.type}
        .thickness=${args.thickness}
        .status=${args.status}
        .textSize=${args.textSize}
        .showIcon=${args.showIcon}
        .showAlertCategoryIcon=${args.showAlertCategoryIcon}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
        <div slot="label">Label</div>
        <div slot="timer">00:00</div>
      </obc-alert-frame>
    </div>`;
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

export const AlarmThickBottomFlipLargeText: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.BottomFlip,
    textSize: AlertFrameTextSize.Large,
  },
};

export const AlarmNarrowBottomFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.BottomFlip,
    demoWidth: 50,
  },
};

export const AlarmThickTopFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.TopFlip,
  },
  render: (args) => {
    return html` <div style="width: fit-content; position: relative;">
      <div
        style="width: ${args.demoWidth}px; height: 150px; background-color: #999; margin-top: 100px;"
      ></div>
      <obc-alert-frame
        .type=${args.type}
        .thickness=${args.thickness}
        .status=${args.status}
        .sharpEdgeTopRight=${args.sharpEdgeTopRight}
        .sharpEdgeBottomRight=${args.sharpEdgeBottomRight}
        .sharpEdgeTopLeft=${args.sharpEdgeTopLeft}
        .textSize=${args.textSize}
        .showIcon=${args.showIcon}
        .showAlertCategoryIcon=${args.showAlertCategoryIcon}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
        <div slot="label">Label</div>
        <div slot="timer">00:00</div>
      </obc-alert-frame>
    </div>`;
  },
};

export const AlarmThinnTopFlip: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Small,
    type: ObcAlertFrameType.TopFlip,
  },
  render: AlarmThickTopFlip.render,
};

export const AlarmThickTopFlipLargeText: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.TopFlip,
    textSize: AlertFrameTextSize.Large,
  },
  render: AlarmThickTopFlip.render,
};

export const AlarmThickTopFlipNoIcons: Story = {
  args: {
    thickness: ObcAlertFrameThickness.Large,
    type: ObcAlertFrameType.TopFlip,
    showIcon: false,
    showAlertCategoryIcon: false,
  },
  render: AlarmThickTopFlip.render,
};
