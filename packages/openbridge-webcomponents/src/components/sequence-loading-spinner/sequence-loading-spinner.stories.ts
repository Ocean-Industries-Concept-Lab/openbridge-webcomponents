import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  Meta as DocsMeta,
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/addon-docs/blocks';
import React from 'react';
import {html} from 'lit';
import './sequence-loading-spinner.js';
import {
  SequenceLoadingSpinnerProgressionType,
  SequenceLoadingSpinnerType,
} from './sequence-loading-spinner.js';

const types = [
  SequenceLoadingSpinnerType.indicator,
  SequenceLoadingSpinnerType.indicatorPoint,
  SequenceLoadingSpinnerType.tag,
  SequenceLoadingSpinnerType.tagPoint,
  SequenceLoadingSpinnerType.button,
  SequenceLoadingSpinnerType.buttonPoint,
];

const meta = {
  title: 'Automation/Sequence Loading Spinner',
  component: 'obc-sequence-loading-spinner',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () =>
        React.createElement(
          React.Fragment,
          null,
          React.createElement(DocsMeta, null),
          React.createElement(Title, null),
          React.createElement(Subtitle, null),
          React.createElement(Description, {of: 'meta'}),
          React.createElement(Primary, null),
          React.createElement(Controls, null),
          React.createElement(Stories, null)
        ),
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: types,
    },
    progression: {
      control: 'select',
      options: Object.values(SequenceLoadingSpinnerProgressionType),
    },
    rotationDurationMs: {
      control: {type: 'range', min: 100, max: 5000, step: 50},
    },
    progressPercent: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      if: {
        arg: 'progression',
        eq: SequenceLoadingSpinnerProgressionType.determinate,
      },
    },
  },
  args: {
    type: SequenceLoadingSpinnerType.indicator,
    progression: SequenceLoadingSpinnerProgressionType.determinate,
    rotationDurationMs: 1000,
    progressPercent: 62.5,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: [
          '`<obc-sequence-loading-spinner>` — circular loading indicator for sequence UI.',
          '',
          '```html',
          '<obc-sequence-loading-spinner',
          '  type="button"',
          '  progression="determinate"',
          '  progress-percent="62.5"',
          '  rotation-duration-ms="1200"',
          '></obc-sequence-loading-spinner>',
          '```',
        ].join('\n'),
      },
    },
    controls: {
      include: ['type', 'progression', 'rotationDurationMs', 'progressPercent'],
    },
  },
  render: (args) => html`
    <obc-sequence-loading-spinner
      .type=${args.type}
      .progression=${args.progression}
      .rotationDurationMs=${args.rotationDurationMs}
      .progressPercent=${args.progression ===
      SequenceLoadingSpinnerProgressionType.scanning
        ? 62.5
        : args.progressPercent}
    ></obc-sequence-loading-spinner>
  `,
};

const renderTypes = (
  progression: SequenceLoadingSpinnerProgressionType,
  progressPercent: number = 62.5,
  rotationDurationMs: number = 1000
) => html`
  <div
    style="
      display: grid;
      gap: 24px;
      width: 100%;
      max-width: 1200px;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(140px, 140px));
      align-items: start;
    "
  >
    ${types.map(
      (type) => html`
        <div
          style="
            display: grid;
            justify-items: center;
            gap: 8px;
            text-align: center;
            padding: 12px;
            border: 1px solid var(--container-border-color, #d5d7de);
            border-radius: 12px;
            background: var(--container-background-color, #fff);
            min-height: 140px;
          "
        >
          <obc-sequence-loading-spinner
            .type=${type}
            .progression=${progression}
            .progressPercent=${progressPercent}
            .rotationDurationMs=${rotationDurationMs}
          ></obc-sequence-loading-spinner>
          <span
            style="
              font-size: 12px;
              text-transform: capitalize;
              min-height: 16px;
            "
          >
            ${type.replace(/-/g, ' ')}
          </span>
        </div>
      `
    )}
  </div>
`;

export const Determinate: Story = {
  parameters: {controls: {disable: true}},
  render: () => renderTypes(SequenceLoadingSpinnerProgressionType.determinate),
};

export const Scanning: Story = {
  parameters: {controls: {disable: true}},
  render: () =>
    renderTypes(SequenceLoadingSpinnerProgressionType.scanning, 62.5, 1000),
};

export const Types: Story = {
  parameters: {controls: {disable: true}},
  render: () => html`
    <div style="display: grid; gap: 24px;">
      <div style="display: grid; gap: 12px;">
        <strong>Determinate</strong>
        ${renderTypes(SequenceLoadingSpinnerProgressionType.determinate)}
      </div>
      <div style="display: grid; gap: 12px;">
        <strong>Scanning</strong>
        ${renderTypes(
          SequenceLoadingSpinnerProgressionType.scanning,
          62.5,
          1000
        )}
      </div>
    </div>
  `,
};
