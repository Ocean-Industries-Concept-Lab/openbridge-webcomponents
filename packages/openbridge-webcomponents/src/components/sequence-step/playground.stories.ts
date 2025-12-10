import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';

const meta: Meta = {
  title: 'Automation/Sequence Step/📌 Playground',
  component: 'obc-sequence-step',
  parameters: {layout: 'centered'},
  argTypes: {
    type: {control: 'select', options: ['small', 'medium', 'large']},
    styleType: {control: 'select', options: ['regular', 'point', 'connector']},
    value: {
      control: 'select',
      options: [
        'not-started',
        'regular',
        'loading',
        'next',
        'active',
        'completed',
      ],
    },
    orientation: {control: 'select', options: ['horizontal', 'vertical']},
    hasInputConnector: {control: 'boolean'},
    hasOutputConnector: {control: 'boolean'},
    hasIcon: {control: 'boolean'},
    label: {control: 'text'},
    sequenceItem: {control: 'boolean'},
    title: {control: 'text'},
    subtitle: {control: 'text'},
    duration: {control: 'text'},
  },
  args: {
    type: 'medium',
    styleType: 'regular',
    value: 'regular',
    orientation: 'horizontal',
    hasInputConnector: true,
    hasOutputConnector: true,
    hasIcon: true,
    label: 'Label',
    sequenceItem: false,
    title: 'Title',
    subtitle: 'Subtitle',
    duration: '00:00 — 2 NM',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
    >
      <obc-sequence-step
        .type=${args.type}
        .styleType=${args.styleType}
        .value=${args.value}
        .orientation=${args.orientation}
        .hasInputConnector=${args.hasInputConnector}
        .hasOutputConnector=${args.hasOutputConnector}
        .hasIcon=${args.hasIcon}
      >
        ${args.label}
      </obc-sequence-step>

      ${args.sequenceItem
        ? html`
            <div style="text-align: center;">
              <div><strong>${args.title}</strong></div>
              <div>${args.subtitle}</div>
              <div style="font-size: 12px; color: gray;">${args.duration}</div>
            </div>
          `
        : ''}
    </div>
  `,
};
