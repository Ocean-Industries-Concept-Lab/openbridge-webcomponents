import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcProgressIndicatorDots} from './progress-indicator-dots.js';
import './progress-indicator-dots.js';

const meta: Meta<ObcProgressIndicatorDots> = {
  title: 'UI Components/Progress Indicator Dots',
  tags: ['6.0'],
  component: 'obc-progress-indicator-dots',
  argTypes: {
    totalSteps: {
      control: {type: 'number', min: 1, max: 10},
    },
    currentStep: {
      control: {type: 'number', min: 1, max: 10},
      description: 'Current step (should not exceed totalSteps)',
    },
    fullwidth: {
      control: {type: 'boolean'},
    },
  },
  args: {
    totalSteps: 5,
    currentStep: 1,
    fullwidth: false,
  },
} satisfies Meta<ObcProgressIndicatorDots>;

export default meta;
type Story = StoryObj<ObcProgressIndicatorDots>;

export const Primary: Story = {
  args: {
    totalSteps: 5,
    currentStep: 3,
    fullwidth: false,
  },
  render: (args) => html`
    <obc-progress-indicator-dots
      .totalSteps="${args.totalSteps}"
      .currentStep="${args.currentStep}"
      .fullwidth="${args.fullwidth}"
    >
    </obc-progress-indicator-dots>
  `,
};

export const ThreeSteps: Story = {
  args: {
    totalSteps: 3,
    currentStep: 2,
    fullwidth: false,
  },
  render: (args) => html`
    <obc-progress-indicator-dots
      .totalSteps="${args.totalSteps}"
      .currentStep="${args.currentStep}"
      .fullwidth="${args.fullwidth}"
    >
    </obc-progress-indicator-dots>
  `,
};

export const SevenSteps: Story = {
  args: {
    totalSteps: 7,
    currentStep: 4,
    fullwidth: false,
  },
  render: (args) => html`
    <obc-progress-indicator-dots
      .totalSteps="${args.totalSteps}"
      .currentStep="${args.currentStep}"
      .fullwidth="${args.fullwidth}"
    >
    </obc-progress-indicator-dots>
  `,
};

export const Fullwidth: Story = {
  args: {
    totalSteps: 5,
    currentStep: 3,
    fullwidth: true,
  },
  render: (args) => html`
    <obc-progress-indicator-dots
      .totalSteps="${args.totalSteps}"
      .currentStep="${args.currentStep}"
      .fullwidth="${args.fullwidth}"
    >
    </obc-progress-indicator-dots>
  `,
};
