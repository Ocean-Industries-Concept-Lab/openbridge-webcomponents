import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './sequence-toolbar.js';
import '../sequence-step/sequence-step.js';
import {SequenceToolbarType} from './sequence-toolbar.js';
import {
  SequenceStyle,
  SequenceType,
  SequenceValue,
} from '../sequence-step/sequence-step.js';

type SequenceToolbarArgs = {
  type: SequenceToolbarType;
  hasAdd: boolean;
};

const meta: Meta<SequenceToolbarArgs> = {
  title: 'Automation/Sequence Toolbar',
  component: 'obc-sequence-toolbar',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Sequence toolbar arranges sequence step items with optional start/end controls and a condensed mode.

### Slots
- \`start\` / \`end\`: content for the built-in Previous/Next (or Intro/Summary).
- Default slot: sequence steps in the center.
- \`condensed-current\` / \`condensed-total\`: labels for condensed mode.

### Events
- \`prev-click\`, \`next-click\`, \`add-click\` are fired by the default controls
  (all types for prev/next, add when \`hasAdd\`).

### Example
~~~html
<obc-sequence-toolbar type="sequential">
  <obc-sequence-step value="completed">1</obc-sequence-step>
  <obc-sequence-step value="completed">2</obc-sequence-step>
  <obc-sequence-step value="active">3</obc-sequence-step>
  <obc-sequence-step value="not-started">4</obc-sequence-step>
</obc-sequence-toolbar>
~~~
`,
      },
    },
  },
  argTypes: {
    start: {
      table: {disable: true},
    },
    end: {
      table: {disable: true},
    },
    'condensed-current': {
      table: {disable: true},
    },
    'condensed-total': {
      table: {disable: true},
    },
    type: {
      control: 'select',
      options: [
        SequenceToolbarType.unordered,
        SequenceToolbarType.condensed,
        SequenceToolbarType.sequential,
      ],
    },
  },
  args: {
    type: SequenceToolbarType.unordered,
    hasAdd: false,
  },
};

export default meta;

type Story = StoryObj<SequenceToolbarArgs>;

const renderToolbar = (args: SequenceToolbarArgs) => {
  const startLabel =
    args.type === SequenceToolbarType.unordered ? 'Intro' : 'Previous';
  const endLabel =
    args.type === SequenceToolbarType.unordered ? 'Summary' : 'Next';

  const stepItems =
    args.type === SequenceToolbarType.sequential
      ? [
          {label: '1', value: SequenceValue.completed},
          {label: '2', value: SequenceValue.completed},
          {label: '3', value: SequenceValue.completed},
          {label: '4', value: SequenceValue.active},
          {label: '5', value: SequenceValue.notStarted},
          {label: '6', value: SequenceValue.notStarted},
          {label: '7', value: SequenceValue.notStarted},
        ]
      : [
          {label: '1', value: SequenceValue.notStarted},
          {label: '2', value: SequenceValue.completed},
          {label: '3', value: SequenceValue.notStarted},
          {label: '4', value: SequenceValue.notStarted},
        ];

  const slotContent =
    args.type === SequenceToolbarType.condensed
      ? html`
          <span slot="condensed-current">1</span>
          <span slot="condensed-total">3</span>
        `
      : html`
          <span slot="start">${startLabel}</span>
          ${stepItems.map(
            (step, index) => html`
              <obc-sequence-step
                .type=${SequenceType.large}
                .styleType=${SequenceStyle.point}
                .value=${step.value}
                .showStepInputConnector=${args.type ===
                SequenceToolbarType.unordered
                  ? false
                  : index !== 0}
                .showStepOutputConnector=${args.type ===
                SequenceToolbarType.unordered
                  ? false
                  : index !== stepItems.length - 1}
                .hasIcon=${false}
              >
                ${step.label}
              </obc-sequence-step>
            `
          )}
          <span slot="end">${endLabel}</span>
        `;

  return html`
    <div style="display:flex; justify-content:center; width:100%;">
      <obc-sequence-toolbar
        style="width:auto;"
        .type=${args.type}
        .hasAdd=${args.hasAdd}
      >
        ${slotContent}
      </obc-sequence-toolbar>
    </div>
  `;
};

export const Playground: Story = {
  name: '📌 Playground',
  render: (args) => renderToolbar(args as SequenceToolbarArgs),
};

export const Unordered: Story = {
  render: (args) => renderToolbar(args as SequenceToolbarArgs),
  args: {type: SequenceToolbarType.unordered, hasAdd: false},
};

export const UnorderedWithAdd: Story = {
  name: 'Unordered + Add',
  render: (args) => renderToolbar(args as SequenceToolbarArgs),
  args: {type: SequenceToolbarType.unordered, hasAdd: true},
};

export const Condensed: Story = {
  render: (args) => renderToolbar(args as SequenceToolbarArgs),
  args: {type: SequenceToolbarType.condensed, hasAdd: false},
};

export const CondensedWithAdd: Story = {
  name: 'Condensed + Add',
  render: (args) => renderToolbar(args as SequenceToolbarArgs),
  args: {type: SequenceToolbarType.condensed, hasAdd: true},
};

export const Sequential: Story = {
  render: (args) => renderToolbar(args as SequenceToolbarArgs),
  args: {type: SequenceToolbarType.sequential, hasAdd: false},
};
