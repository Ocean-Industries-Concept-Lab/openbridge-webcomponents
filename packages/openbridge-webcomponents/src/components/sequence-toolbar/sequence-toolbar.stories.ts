import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './sequence-toolbar.js';
import '../sequence-step/sequence-step.js';
import '../../icons/icon-chevron-left-google.js';
import '../../icons/icon-chevron-right-google.js';
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
    controls: {
      exclude: ['has-add'],
    },
    docs: {
      description: {
        component: `Sequence toolbar arranges sequence step items with optional start/end controls and a condensed mode.

### Slots
- \`start\` / \`end\`: provide custom Previous/Next (or Intro/Summary).
- Default slot: sequence steps in the center.
- \`condensed-current\` / \`condensed-total\`: labels for condensed mode.
- \`add\`: optional add control.

### Events
- \`prev-click\`, \`next-click\`, \`add-click\` are fired by the default controls.

### Example
~~~html
<obc-sequence-toolbar type="sequential">
  <obc-sequence-step slot="start">Previous</obc-sequence-step>
  <obc-sequence-step value="completed">1</obc-sequence-step>
  <obc-sequence-step value="completed">2</obc-sequence-step>
  <obc-sequence-step value="active">3</obc-sequence-step>
  <obc-sequence-step value="not-started">4</obc-sequence-step>
  <obc-sequence-step slot="end" value="completed">Next</obc-sequence-step>
</obc-sequence-toolbar>
~~~

### Styling
The toolbar may set \`variant\` on slotted \`obc-sequence-step\` elements:
- \`toolbar-prev\` for \`start\` when \`type="sequential"\`.
- \`toolbar-condensed-icon\` for \`start/end\` when \`type="condensed"\`.
- Only the Previous control is modified for sequential; the Next control keeps default styles.
Provide your own \`variant\` to opt out.`,
      },
    },
  },
  argTypes: {
    showAddButton: {
      table: {disable: true},
    },
    start: {
      table: {disable: true},
    },
    end: {
      table: {disable: true},
    },
    add: {
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
          <obc-sequence-step
            slot="start"
            class="condensed-icon"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.point}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
            aria-label="Previous"
          >
            <obi-chevron-left-google></obi-chevron-left-google>
          </obc-sequence-step>
          <span slot="condensed-current">1</span>
          <span slot="condensed-total">3</span>
          <obc-sequence-step
            slot="end"
            class="condensed-icon"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.point}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
            aria-label="Next"
          >
            <obi-chevron-right-google></obi-chevron-right-google>
          </obc-sequence-step>
        `
      : html`
          <obc-sequence-step
            slot="start"
            class="edge-button edge-button--outline"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.regular}
            .value=${SequenceValue.notStarted}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
          >
            ${startLabel}
          </obc-sequence-step>
          ${stepItems.map(
            (step, index) => html`
              <obc-sequence-step
                .type=${SequenceType.large}
                .styleType=${SequenceStyle.point}
                .value=${step.value}
                .hideStepInputConnector=${args.type ===
                SequenceToolbarType.unordered
                  ? true
                  : index === 0}
                .hideStepOutputConnector=${args.type ===
                SequenceToolbarType.unordered
                  ? true
                  : index === stepItems.length - 1}
                .hasIcon=${false}
              >
                ${step.label}
              </obc-sequence-step>
            `
          )}
          <obc-sequence-step
            slot="end"
            class="edge-button"
            .type=${SequenceType.large}
            .styleType=${SequenceStyle.regular}
            .value=${args.type === SequenceToolbarType.unordered
              ? SequenceValue.notStarted
              : SequenceValue.completed}
            .hideStepInputConnector=${true}
            .hideStepOutputConnector=${true}
            .hasIcon=${false}
          >
            ${endLabel}
          </obc-sequence-step>
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
