import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './sequence-item.js';
import {
  SequenceItemOrientation,
  SequenceItemLabelType,
  SequenceItemState,
} from './sequence-item.js';
import {
  SequenceStyle,
  SequenceType,
  SequenceValue,
} from '../sequence-step/sequence-step.js';

type SequenceItemArgs = {
  orientation?: SequenceItemOrientation;
  labelType?: SequenceItemLabelType;
  state?: SequenceItemState;
  title?: string;
  hasSubtitle?: boolean;
  subtitle?: string;
  hasDescription?: boolean;
  description?: string;
  hasStamp?: boolean;
  hasTimeStamp?: boolean;
  timeStamp?: string;
  hasDistanceStamp?: boolean;
  distanceStamp?: string;
  stepLabel?: string;
  stepType?: SequenceType;
  stepStyle?: SequenceStyle;
  stepValue?: SequenceValue;
  hideStepInputConnector?: boolean;
  hideStepOutputConnector?: boolean;
  stepHasIcon?: boolean;
};

const defaultArgs: SequenceItemArgs = {
  orientation: SequenceItemOrientation.vertical,
  labelType: SequenceItemLabelType.regular,
  state: SequenceItemState.enabled,
  title: 'Title',
  hasSubtitle: true,
  subtitle: 'Subtitle',
  hasDescription: false,
  description: 'Step description with multiple lines',
  hasStamp: true,
  hasTimeStamp: true,
  timeStamp: '00:00',
  hasDistanceStamp: true,
  distanceStamp: '2 NM',
};

const meta: Meta = {
  title: 'Automation/Sequence Item',
  component: 'obc-sequence-item',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use `hasStamp` to enable the meta block, then toggle `hasTimeStamp`/`hasDistanceStamp` to show individual values. ' +
          'Slots `title`, `description`, and `meta` are available when you need to override these sections with custom markup.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: [
        SequenceItemOrientation.vertical,
        SequenceItemOrientation.horizontal,
      ],
    },
    labelType: {
      control: 'select',
      options: [
        SequenceItemLabelType.regular,
        SequenceItemLabelType.multiLine,
        SequenceItemLabelType.small,
      ],
    },
    state: {
      control: 'select',
      options: [SequenceItemState.enabled, SequenceItemState.active],
    },
    hasSubtitle: {control: 'boolean'},
    hasDescription: {control: 'boolean'},
    hasStamp: {control: 'boolean'},
    hasTimeStamp: {control: 'boolean'},
    hasDistanceStamp: {control: 'boolean'},
    title: {control: 'text'},
    subtitle: {control: 'text'},
    description: {control: 'text'},
    timeStamp: {control: 'text'},
    distanceStamp: {control: 'text'},
    stepLabel: {
      table: {disable: true},
      control: false,
      description:
        'Deprecated. The internal step reuses the `title` as its label automatically.',
    },
    stepType: {
      table: {disable: true},
      control: false,
      description:
        'Deprecated. The internal step is always rendered as a small point indicator.',
    },
    stepStyle: {
      table: {disable: true},
      control: false,
    },
    stepValue: {
      table: {disable: true},
      control: false,
    },
    hideStepInputConnector: {
      table: {disable: true},
      control: false,
    },
    hideStepOutputConnector: {
      table: {disable: true},
      control: false,
    },
    stepHasIcon: {
      table: {disable: true},
      control: false,
    },
  },
  args: defaultArgs,
};

export default meta;

type Story = StoryObj<typeof meta>;

const renderItem = (args: SequenceItemArgs = {}) => html`
  <obc-sequence-item
    .orientation=${args.orientation ?? SequenceItemOrientation.vertical}
    .labelType=${args.labelType ?? SequenceItemLabelType.regular}
    .state=${args.state ?? SequenceItemState.enabled}
    .title=${args.title ?? 'Title'}
    .hasSubtitle=${args.hasSubtitle ?? false}
    .subtitle=${args.subtitle ?? ''}
    .hasDescription=${args.hasDescription ?? false}
    .description=${args.description ?? ''}
    .hasStamp=${args.hasStamp ?? false}
    .hasTimeStamp=${args.hasTimeStamp ?? false}
    .timeStamp=${args.timeStamp ?? ''}
    .hasDistanceStamp=${args.hasDistanceStamp ?? false}
    .distanceStamp=${args.distanceStamp ?? ''}
    .stepLabel=${args.stepLabel ?? ''}
    .hideStepInputConnector=${args.hideStepInputConnector ?? false}
    .hideStepOutputConnector=${args.hideStepOutputConnector ?? false}
  ></obc-sequence-item>
`;

export const Playground: Story = {
  name: '📌 Playground',
  args: {...defaultArgs},
  render: (args) => renderItem(args),
};

export const Enabled: Story = {
  render: () =>
    renderItem({
      title: 'Inspect',
      hasSubtitle: true,
      subtitle: 'Step ready',
      hasStamp: true,
      hasTimeStamp: true,
      timeStamp: '00:00',
      hasDistanceStamp: true,
      distanceStamp: '2 NM',
      stepLabel: 'Inspect',
    }),
};

export const Active: Story = {
  render: () =>
    renderItem({
      title: 'Transit',
      hasSubtitle: true,
      subtitle: 'Departing now',
      state: SequenceItemState.active,
      hasStamp: true,
      hasTimeStamp: true,
      timeStamp: '00:05',
      stepLabel: 'Transit',
      stepValue: SequenceValue.active,
      stepHasIcon: true,
    }),
};

export const HorizontalOrientation: Story = {
  name: 'Horizontal orientation',
  render: () =>
    renderItem({
      orientation: SequenceItemOrientation.horizontal,
      title: 'Holding pattern',
      hasSubtitle: true,
      subtitle: 'Await clearance',
      hasTimeStamp: true,
      timeStamp: '00:00',
      hasDistanceStamp: true,
      distanceStamp: '2 NM',
      stepLabel: 'Hold',
    }),
};

export const VerticalOrientation: Story = {
  name: 'Vertical orientation',
  render: () =>
    renderItem({
      orientation: SequenceItemOrientation.vertical,
      title: 'Plan route',
      hasSubtitle: true,
      subtitle: 'Prepare details',
      hasStamp: true,
      hasTimeStamp: true,
      timeStamp: '00:00',
      hasDistanceStamp: true,
      distanceStamp: '2 NM',
      stepLabel: 'Plan',
    }),
};

export const MultiLineLabel: Story = {
  name: 'Label: Multi-line',
  render: () =>
    renderItem({
      labelType: SequenceItemLabelType.multiLine,
      title:
        'Approach channel with safety check and additional verification steps',
      hasSubtitle: true,
      subtitle:
        'Subtitle that wraps to a new line so the component can display longer content',
      hasStamp: true,
      hasTimeStamp: true,
      timeStamp: '00:10',
      hasDistanceStamp: true,
      distanceStamp: '1.8 NM',
      stepLabel: 'Approach',
    }),
};

export const SmallLabel: Story = {
  name: 'Label: Small',
  render: () =>
    renderItem({
      labelType: SequenceItemLabelType.small,
      title: 'Waypoint update',
      hasSubtitle: true,
      subtitle: 'ETA 00:10',
      hasStamp: true,
      hasTimeStamp: true,
      timeStamp: '00:10',
      hasDistanceStamp: true,
      distanceStamp: '1.5 NM',
      stepLabel: 'WP',
    }),
};

export const RegularLabel: Story = {
  name: 'Label: Regular',
  render: () =>
    renderItem({
      labelType: SequenceItemLabelType.regular,
      title: 'Standard label',
      hasSubtitle: true,
      subtitle: 'Default sizing',
      hasStamp: true,
      hasTimeStamp: true,
      timeStamp: '00:00',
      hasDistanceStamp: true,
      distanceStamp: '2 NM',
      stepLabel: 'Regular',
    }),
};

export const WithDetails: Story = {
  name: 'With description and stamps',
  render: () =>
    renderItem({
      title: 'Dock',
      hasSubtitle: true,
      subtitle: 'Pier 1',
      hasDescription: true,
      description: 'Step description with multiple lines\nand concise updates.',
      hasStamp: true,
      hasTimeStamp: true,
      timeStamp: '00:20',
      hasDistanceStamp: true,
      distanceStamp: '0.5 NM',
      stepLabel: 'Dock',
      stepHasIcon: true,
    }),
};
