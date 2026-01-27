import type {
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components-vite';
import {html} from 'lit';
import './sequence-connector.js';
import {
  SequenceConnectorDirection,
  SequenceConnectorState,
  SequenceConnectorType,
} from './sequence-connector.js';

type SequenceConnectorStoryArgs = {
  type: SequenceConnectorType;
  state: SequenceConnectorState;
  direction: SequenceConnectorDirection;
  loadingBarPercent: number;
};

const states = [
  SequenceConnectorState.notStarted,
  SequenceConnectorState.loading,
  SequenceConnectorState.completed,
  SequenceConnectorState.stepsBetween,
];

const typeLabels: Record<SequenceConnectorType, string> = {
  [SequenceConnectorType.small]: 'S Indicator',
  [SequenceConnectorType.medium]: 'M Tag',
  [SequenceConnectorType.large]: 'L Button',
};

const cardStyle = `
  border: 1px solid var(--container-border-color, #d5d7de);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  text-align: center;
`;

const meta = {
  title: 'Automation/Sequence Connector',
  component: 'obc-sequence-connector',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'Example:',
          '```html',
          '<obc-sequence-connector',
          '  type="medium"',
          '  state="loading"',
          '  direction="horizontal"',
          '  loading-bar-percent="66"',
          '></obc-sequence-connector>',
          '```',
        ].join('\n'),
      },
      source: {
        transform: (
          code: string,
          storyContext: StoryContext<SequenceConnectorStoryArgs>
        ) => {
          if (storyContext.args?.state !== SequenceConnectorState.loading) {
            return code;
          }

          const percent = storyContext.args?.loadingBarPercent ?? 66;

          if (code.includes('loading-bar-percent')) {
            return code;
          }

          return code.replace(
            /<obc-sequence-connector(?![^>]*loading-bar-percent)/g,
            `<obc-sequence-connector loading-bar-percent="${percent}"`
          );
        },
      },
    },
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(typeLabels),
      mapping: {
        [typeLabels[SequenceConnectorType.small]]: SequenceConnectorType.small,
        [typeLabels[SequenceConnectorType.medium]]:
          SequenceConnectorType.medium,
        [typeLabels[SequenceConnectorType.large]]: SequenceConnectorType.large,
      },
    },
    state: {
      control: 'select',
      options: Object.values(SequenceConnectorState),
    },
    direction: {
      control: 'select',
      options: Object.values(SequenceConnectorDirection),
    },
    loadingBarPercent: {
      control: {type: 'range', min: 0, max: 100, step: 1},
    },
  },
  args: {
    type: SequenceConnectorType.medium,
    state: SequenceConnectorState.notStarted,
    direction: SequenceConnectorDirection.horizontal,
    loadingBarPercent: 66,
  },
} satisfies Meta<SequenceConnectorStoryArgs>;

export default meta;

type Story = StoryObj<SequenceConnectorStoryArgs>;

const renderConnector: Story['render'] = (args) => html`
  <div style="display: flex; justify-content: center; width: 100%;">
    <obc-sequence-connector
      .type=${args.type}
      .state=${args.state}
      .direction=${args.direction}
      .loadingBarPercent=${args.loadingBarPercent}
    ></obc-sequence-connector>
  </div>
`;

const renderStateTypes = (
  state: SequenceConnectorState,
  direction: SequenceConnectorDirection,
  loadingBarPercent: number = 66
) => html`
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    ${Object.values(SequenceConnectorType).map(
      (type) => html`
        <div style=${cardStyle}>
          <span>${typeLabels[type]}</span>
          <obc-sequence-connector
            .type=${type}
            .state=${state}
            .direction=${direction}
            .loadingBarPercent=${loadingBarPercent}
          ></obc-sequence-connector>
        </div>
      `
    )}
  </div>
`;

export const Playground: Story = {
  parameters: {
    controls: {include: ['type', 'state', 'direction', 'loadingBarPercent']},
  },
  args: {
    loadingBarPercent: 66,
  },
  render: renderConnector,
};

export const NotStarted: Story = {
  name: 'State • Not Started',
  parameters: {controls: {include: ['direction']}},
  args: {
    state: SequenceConnectorState.notStarted,
  },
  render: (args) =>
    renderStateTypes(SequenceConnectorState.notStarted, args.direction),
};

export const Loading: Story = {
  name: 'State • Loading',
  parameters: {controls: {include: ['direction', 'loadingBarPercent']}},
  args: {
    state: SequenceConnectorState.loading,
    loadingBarPercent: 66,
  },
  render: (args) =>
    renderStateTypes(
      SequenceConnectorState.loading,
      args.direction,
      args.loadingBarPercent
    ),
};

export const Completed: Story = {
  name: 'State • Completed',
  parameters: {controls: {include: ['direction']}},
  args: {
    state: SequenceConnectorState.completed,
  },
  render: (args) =>
    renderStateTypes(SequenceConnectorState.completed, args.direction),
};

export const StepsBetween: Story = {
  name: 'State • Steps Between',
  parameters: {controls: {include: ['direction']}},
  args: {
    state: SequenceConnectorState.stepsBetween,
  },
  render: (args) =>
    renderStateTypes(SequenceConnectorState.stepsBetween, args.direction),
};

export const TypeStatesHorizontal: Story = {
  name: 'Type/State • Horizontal',
  parameters: {controls: {disable: true}},
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${Object.values(SequenceConnectorType).map(
        (type) => html`
          <div>
            <strong style="display: block; margin-bottom: 12px;"
              >${typeLabels[type]}</strong
            >
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              ${states.map(
                (state) => html`
                  <div style=${cardStyle}>
                    <span style="text-transform: capitalize;">${state}</span>
                    <obc-sequence-connector
                      .type=${type}
                      .state=${state}
                      .direction=${SequenceConnectorDirection.horizontal}
                    ></obc-sequence-connector>
                  </div>
                `
              )}
            </div>
          </div>
        `
      )}
    </div>
  `,
};

export const TypeStatesVertical: Story = {
  name: 'Type/State • Vertical',
  parameters: {controls: {disable: true}},
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${Object.values(SequenceConnectorType).map(
        (type) => html`
          <div>
            <strong style="display: block; margin-bottom: 12px;"
              >${typeLabels[type]}</strong
            >
            <div style="display: flex; gap: 16px; flex-wrap: wrap;">
              ${states.map(
                (state) => html`
                  <div style=${cardStyle}>
                    <span style="text-transform: capitalize;">${state}</span>
                    <obc-sequence-connector
                      .type=${type}
                      .state=${state}
                      .direction=${SequenceConnectorDirection.vertical}
                    ></obc-sequence-connector>
                  </div>
                `
              )}
            </div>
          </div>
        `
      )}
    </div>
  `,
};
