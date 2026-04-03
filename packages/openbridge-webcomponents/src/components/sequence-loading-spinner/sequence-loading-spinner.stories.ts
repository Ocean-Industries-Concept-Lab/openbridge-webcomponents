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
  title: 'Building Blocks/Sequence Loading Spinner',
  component: 'obc-sequence-loading-spinner',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      disableSaveFromUI: true,
    },
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
      if: {
        arg: 'progression',
        eq: SequenceLoadingSpinnerProgressionType.scanning,
      },
    },
    progressPercent: {
      control: {type: 'range', min: 0, max: 100, step: 1},
      if: {
        arg: 'progression',
        eq: SequenceLoadingSpinnerProgressionType.determinate,
      },
    },
    fillToFullDurationMs: {
      name: 'fill to full duration ms',
      control: {type: 'range', min: 0, max: 8000, step: 100},
      if: {
        arg: 'progression',
        eq: SequenceLoadingSpinnerProgressionType.determinate,
      },
    },
    fillToFullSteps: {
      name: 'fill to full steps',
      control: {type: 'range', min: 1, max: 24, step: 1},
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
    progressPercent: 25,
    fillToFullDurationMs: 3200,
    fillToFullSteps: 8,
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
          '**Determinate:** gray track; blue arc starts at `progress-percent`. With default Playground `fill-to-full-duration-ms`, the arc **steps** to 100% over that time (set to **0** for a fixed arc only—no auto fill). No whole-ring spin.',
          '**Scanning:** indeterminate segment spin; `rotation-duration-ms` applies here only.',
          '',
          '```html',
          '<obc-sequence-loading-spinner',
          '  type="button"',
          '  progression="determinate"',
          '  progress-percent="25"',
          '  fill-to-full-duration-ms="3200"',
          '  fill-to-full-steps="8"',
          '></obc-sequence-loading-spinner>',
          '```',
        ].join('\n'),
      },
    },
    controls: {
      include: [
        'type',
        'progression',
        'rotationDurationMs',
        'progressPercent',
        'fillToFullDurationMs',
        'fillToFullSteps',
      ],
    },
  },
  render: (args) => html`
    <obc-sequence-loading-spinner
      .type=${args.type}
      .progression=${args.progression}
      .rotationDurationMs=${args.rotationDurationMs}
      .progressPercent=${args.progressPercent}
      .fillToFullDurationMs=${args.progression ===
      SequenceLoadingSpinnerProgressionType.scanning
        ? 0
        : args.fillToFullDurationMs}
      .fillToFullSteps=${args.fillToFullSteps}
    ></obc-sequence-loading-spinner>
  `,
};

const renderTypes = (
  progression: SequenceLoadingSpinnerProgressionType,
  progressPercent: number = 25,
  rotationDurationMs: number = 1000,
  fillToFullDurationMs: number = 0,
  fillToFullSteps: number = 8
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
            .fillToFullDurationMs=${progression ===
            SequenceLoadingSpinnerProgressionType.scanning
              ? 0
              : fillToFullDurationMs}
            .fillToFullSteps=${fillToFullSteps}
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
  render: () =>
    renderTypes(
      SequenceLoadingSpinnerProgressionType.determinate,
      25,
      1000,
      3200,
      8
    ),
};

export const Scanning: Story = {
  parameters: {controls: {disable: true}},
  render: () =>
    renderTypes(SequenceLoadingSpinnerProgressionType.scanning, 25, 1000),
};

export const Types: Story = {
  parameters: {controls: {disable: true}},
  render: () => html`
    <div style="display: grid; gap: 24px;">
      <div style="display: grid; gap: 12px;">
        <strong>Determinate</strong>
        ${renderTypes(
          SequenceLoadingSpinnerProgressionType.determinate,
          25,
          1000,
          3200,
          8
        )}
      </div>
      <div style="display: grid; gap: 12px;">
        <strong>Scanning</strong>
        ${renderTypes(SequenceLoadingSpinnerProgressionType.scanning, 25, 1000)}
      </div>
    </div>
  `,
};
