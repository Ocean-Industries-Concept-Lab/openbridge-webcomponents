import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';
import '../sequence-item/sequence-item';
import {
  SequenceItemLabelType,
  SequenceItemOrientation,
  SequenceItemState,
} from '../sequence-item/sequence-item';
import {SequenceStyle, SequenceType, SequenceValue} from './sequence-step';

type DiagramArgs = {
  steps: Array<{
    title: string;
    subtitle: string;
    value: SequenceValue;
    state: SequenceItemState;
    labelType: SequenceItemLabelType;
    description?: string;
    hasDescription?: boolean;
    hasStamp?: boolean;
    hasTimeStamp?: boolean;
    timeStamp?: string;
    hasDistanceStamp?: boolean;
    distanceStamp?: string;
    orientation?: SequenceItemOrientation;
    stepLabel?: string;
    stepType?: SequenceType;
    stepStyle?: SequenceStyle;
    stepHasInputConnector?: boolean;
    stepHasOutputConnector?: boolean;
  }>;
};

type DiagramRenderOptions = DiagramArgs & {
  orientation?: SequenceItemOrientation;
};

const meta: Meta = {
  title: 'Automation/Sequence Step/Diagram playground',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Play with the components to assemble a complete sequence. Below are a few ready-made examples: a small indicator chain with an active step, a medium chain with a completed step, and large “button” steps.',
      },
    },
  },
  args: {
    steps: [
      {
        title: 'Title 1',
        subtitle: 'Subtitle',
        value: SequenceValue.completed,
        state: SequenceItemState.enabled,
        labelType: SequenceItemLabelType.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
      },
      {
        title: 'Title 2',
        subtitle: 'Subtitle',
        value: SequenceValue.active,
        state: SequenceItemState.active,
        labelType: SequenceItemLabelType.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
      },
      {
        title: 'Title 3',
        subtitle: 'Subtitle',
        value: SequenceValue.next,
        state: SequenceItemState.enabled,
        labelType: SequenceItemLabelType.multiLine,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
      },
      {
        title: 'Title 4',
        subtitle: 'Subtitle',
        value: SequenceValue.regular,
        state: SequenceItemState.enabled,
        labelType: SequenceItemLabelType.small,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
      },
    ],
  },
  argTypes: {
    steps: {
      control: {type: 'object'},
      description:
        'Array of step configurations. Each object accepts title, subtitle, value, state, labelType and optional stepLabel/stepType/stepStyle/stepHasInputConnector/stepHasOutputConnector.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SequenceItems: Story = {
  args: {
    steps: [
      {
        title: 'Title 1',
        subtitle: 'Subtitle',
        value: SequenceValue.notStarted,
        state: SequenceItemState.enabled,
        labelType: SequenceItemLabelType.regular,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.point,
        stepHasInputConnector: false,
        stepHasOutputConnector: true,
        stepLabel: '',
      },
      {
        title: 'Title 2',
        subtitle: 'Subtitle',
        value: SequenceValue.notStarted,
        state: SequenceItemState.active,
        labelType: SequenceItemLabelType.regular,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.point,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
        stepLabel: '',
      },
      {
        title: 'Title 3',
        subtitle: 'Subtitle',
        value: SequenceValue.notStarted,
        state: SequenceItemState.enabled,
        labelType: SequenceItemLabelType.regular,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.point,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
        stepLabel: '',
      },
    ],
  },
  parameters: {
    controls: {disable: true},
  },
  render: ({steps}: DiagramArgs) => renderSequenceItemsStory(steps),
};

const renderSequenceItemsStory = (steps: DiagramArgs['steps']) => {
  const normalizedSteps = steps.map((step, index) => ({
    ...step,
    stepLabel: step.stepLabel ?? String(index + 1),
  }));

  return html`
    <div style="display: flex; flex-direction: row; gap: 100px; width: 100%;">
      ${renderDiagram({
        steps: normalizedSteps,
        orientation: SequenceItemOrientation.horizontal,
      })}
      ${renderDiagram({
        steps: normalizedSteps,
        orientation: SequenceItemOrientation.vertical,
      })}
    </div>
  `;
};

export const SequenceItemsWithDescription: Story = {
  name: 'Sequence items with description',
  args: {
    steps: [
      {
        title: 'Title 1',
        subtitle: 'Subtitle',
        value: SequenceValue.notStarted,
        state: SequenceItemState.enabled,
        labelType: SequenceItemLabelType.multiLine,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.point,
        stepHasInputConnector: false,
        stepHasOutputConnector: true,
        stepLabel: '',
        hasDescription: true,
        description: 'Step description with multiple lines and detailed notes.',
      },
      {
        title: 'Title 2',
        subtitle: 'Subtitle',
        value: SequenceValue.notStarted,
        state: SequenceItemState.active,
        labelType: SequenceItemLabelType.multiLine,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.point,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
        stepLabel: '',
        hasDescription: true,
        description: 'Step description with multiple lines and detailed notes.',
      },
      {
        title: 'Title 3',
        subtitle: 'Subtitle',
        value: SequenceValue.notStarted,
        state: SequenceItemState.enabled,
        labelType: SequenceItemLabelType.multiLine,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.point,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
        stepLabel: '',
        hasDescription: true,
        description: 'Step description with multiple lines and detailed notes.',
      },
    ],
  },
  parameters: {
    controls: {disable: true},
  },
  render: ({steps}: DiagramArgs) => renderSequenceItemsStory(steps),
};

const renderDiagram = ({
  steps,
  orientation = SequenceItemOrientation.horizontal,
}: DiagramRenderOptions) => {
  const isHorizontal = orientation === SequenceItemOrientation.horizontal;
  const containerStyle = isHorizontal
    ? 'display: flex; flex-direction: row; width: 100%; flex-wrap: nowrap; align-items: flex-start;'
    : 'display: flex; flex-direction: column; width: 100%; align-items: flex-start;';
  const itemWrapperStyle = isHorizontal ? 'flex: 1;' : 'width: 100%;';

  return html`
    <div style=${containerStyle}>
      ${steps.map(
        (step, index) => html`
          <div style=${itemWrapperStyle}>
            <obc-sequence-item
              .orientation=${step.orientation ?? orientation}
              .labelType=${step.labelType}
              .state=${step.state}
              .title=${step.title}
              .hasSubtitle=${true}
              .subtitle=${step.subtitle}
              .hasDescription=${step.hasDescription ?? false}
              .description=${step.description ?? ''}
              .hasStamp=${step.hasStamp ?? true}
              .hasTimeStamp=${step.hasTimeStamp ?? true}
              .timeStamp=${step.timeStamp ?? '00:00'}
              .hasDistanceStamp=${step.hasDistanceStamp ?? true}
              .distanceStamp=${step.distanceStamp ?? '2 NM'}
              .stepLabel=${step.stepLabel ?? String(index + 1)}
              .stepType=${step.stepType ?? SequenceType.small}
              .stepStyle=${step.stepStyle ?? SequenceStyle.regular}
              .stepValue=${step.value}
              .stepHasInputConnector=${step.stepHasInputConnector ??
              index !== 0}
              .stepHasOutputConnector=${step.stepHasOutputConnector ??
              index !== steps.length - 1}
              .stepHasIcon=${step.stepHasIcon ?? false}
            ></obc-sequence-item>
          </div>
        `
      )}
    </div>
  `;
};

const renderStepSequence = (
  steps: DiagramArgs['steps'],
  fallbackType: SequenceType,
  orientation: 'horizontal' | 'vertical' = 'horizontal'
) => {
  const isHorizontal = orientation === 'horizontal';
  const containerStyle = isHorizontal
    ? 'display: flex; width: 100%;'
    : 'display: flex; flex-direction: column; width: 100%; align-items: flex-start;';

  return html`
    <div style=${containerStyle}>
      ${steps.map(
        (step) => html`
          <obc-sequence-step
            .type=${step.stepType ?? fallbackType}
            .styleType=${step.stepStyle ?? SequenceStyle.regular}
            .value=${step.value}
            orientation=${orientation}
            .hasInputConnector=${step.stepHasInputConnector}
            .hasOutputConnector=${step.stepHasOutputConnector}
            .hasIcon=${step.stepHasIcon ?? true}
          >
            ${step.stepLabel ??
            ((step.stepStyle ?? SequenceStyle.regular) === SequenceStyle.point
              ? '1'
              : 'Label')}
          </obc-sequence-step>
        `
      )}
    </div>
  `;
};

export const MediumButtonSequence: Story = {
  name: 'Medium button steps',
  args: {
    steps: [
      {
        stepLabel: 'Label 1',
        value: SequenceValue.completed,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: false,
        stepHasOutputConnector: false,
        hasStamp: false,
        hasTimeStamp: false,
        hasDistanceStamp: false,
        stepHasIcon: true,
      },
      {
        stepLabel: 'Label 2',
        value: SequenceValue.completed,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: false,
        hasStamp: false,
        hasTimeStamp: false,
        hasDistanceStamp: false,
        stepHasIcon: true,
      },
      {
        stepLabel: 'Label 3',
        value: SequenceValue.active,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: false,
        hasStamp: false,
        hasTimeStamp: false,
        hasDistanceStamp: false,
        stepHasIcon: true,
      },
      {
        stepLabel: 'Label 4',
        value: SequenceValue.loading,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
        hasStamp: false,
        hasTimeStamp: false,
        hasDistanceStamp: false,
        stepHasIcon: true,
      },
      {
        stepLabel: 'Label 5',
        value: SequenceValue.regular,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: false,
        stepHasOutputConnector: false,
        hasStamp: false,
        hasTimeStamp: false,
        hasDistanceStamp: false,
        stepHasIcon: true,
      },
      {
        stepLabel: 'Label 6',
        value: SequenceValue.regular,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: false,
        hasStamp: false,
        hasTimeStamp: false,
        hasDistanceStamp: false,
        stepHasIcon: true,
      },
      {
        stepLabel: 'Label 7',
        value: SequenceValue.notStarted,
        stepType: SequenceType.medium,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: false,
        hasStamp: false,
        hasTimeStamp: false,
        hasDistanceStamp: false,
        stepHasIcon: true,
      },
    ],
  },
  parameters: {
    controls: {disable: true},
  },
  render: ({steps}: DiagramArgs) => html`
    <div style="display: flex; flex-direction: column; gap: 32px; width: 100%;">
      ${renderStepSequence(steps, SequenceType.medium, 'horizontal')}
      ${renderStepSequence(steps, SequenceType.medium, 'vertical')}
    </div>
  `,
};

export const LargeButtons: Story = {
  name: 'Large button steps',
  args: {
    steps: [
      {
        stepLabel: 'Label 1',
        value: SequenceValue.completed,
        stepType: SequenceType.large,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: false,
        stepHasOutputConnector: false,
      },
      {
        stepLabel: 'Label 2',
        value: SequenceValue.completed,
        stepType: SequenceType.large,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: false,
      },
      {
        stepLabel: 'Label 3',
        value: SequenceValue.active,
        stepType: SequenceType.large,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: false,
      },
      {
        stepLabel: 'Label 4',
        value: SequenceValue.loading,
        stepType: SequenceType.large,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: true,
      },
      {
        stepLabel: 'Label 5',
        value: SequenceValue.regular,
        stepType: SequenceType.large,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: false,
        stepHasOutputConnector: false,
      },
      {
        stepLabel: 'Label 6',
        value: SequenceValue.notStarted,
        stepType: SequenceType.large,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: false,
      },
      {
        stepLabel: 'Label 7',
        value: SequenceValue.notStarted,
        stepType: SequenceType.large,
        stepStyle: SequenceStyle.regular,
        stepHasInputConnector: true,
        stepHasOutputConnector: false,
      },
    ],
  },
  parameters: {
    controls: {disable: true},
  },
  render: ({steps}: DiagramArgs) => html`
    <div style="display: flex; flex-direction: column; gap: 32px; width: 100%;">
      ${renderStepSequence(steps, SequenceType.large, 'horizontal')}
      ${renderStepSequence(steps, SequenceType.large, 'vertical')}
    </div>
  `,
};

export const LargePointSequence: Story = {
  name: 'Point steps',
  args: {
    steps: [1, 2, 3, 4, 5, 6, 7].map((value, index) => {
      const config = {
        title: '',
        subtitle: '',
        state: SequenceItemState.enabled,
        labelType: SequenceItemLabelType.regular,
        stepLabel: String(value),
        stepStyle: SequenceStyle.point,
        stepHasInputConnector: index !== 0,
        stepHasOutputConnector: index !== 6,
      };
      if (index < 3) {
        return {
          ...config,
          value: SequenceValue.completed,
          stepType: SequenceType.medium,
        };
      }
      if (index === 3) {
        return {
          ...config,
          value: SequenceValue.active,
          stepType: SequenceType.large,
          stepHasInputConnector: false,
          stepHasOutputConnector: false,
        };
      }
      return {
        ...config,
        value: SequenceValue.notStarted,
        stepType: SequenceType.medium,
      };
    }),
    showMeta: false,
  },
  parameters: {
    controls: {disable: true},
  },
  render: ({steps}: DiagramArgs) => html`
    <div style="display: flex; flex-direction: column; gap: 32px; width: 100%;">
      <div style="display: flex;">
        ${steps.map(
          (step) => html`
            <obc-sequence-step
              .type=${step.stepType ?? SequenceType.medium}
              .styleType=${SequenceStyle.point}
              .value=${step.value}
              orientation="horizontal"
              .hasInputConnector=${step.stepHasInputConnector}
              .hasOutputConnector=${step.stepHasOutputConnector}
            >
              ${step.stepLabel}
            </obc-sequence-step>
          `
        )}
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        ${steps.map(
          (step) => html`
            <obc-sequence-step
              .type=${step.stepType ?? SequenceType.medium}
              .styleType=${SequenceStyle.point}
              .value=${step.value}
              orientation="vertical"
              .hasInputConnector=${step.stepHasInputConnector}
              .hasOutputConnector=${step.stepHasOutputConnector}
            >
              ${step.stepLabel}
            </obc-sequence-step>
          `
        )}
      </div>
    </div>
  `,
};
