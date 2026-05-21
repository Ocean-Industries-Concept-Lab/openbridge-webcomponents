import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcStepperBoxType} from './stepper-box.js';
import './stepper-box.js';
import {html, nothing} from 'lit';

type StepperBoxArgs = {
  type: ObcStepperBoxType;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  stepUp: number;
  stepDown: number;
  disabled: boolean;
  helperText: string;
  placeholder: string;
  readonly: boolean;
};

const meta = {
  title: 'UI Components/Input Controls/Stepper Box',
  tags: ['autodocs', '6.0'],
  component: 'obc-stepper-box',
  args: {
    type: ObcStepperBoxType.plusMinus,
    value: 100,
    unit: 'km',
    min: 0,
    max: 1000,
    stepUp: 1,
    stepDown: 1,
    disabled: false,
    helperText: '',
    placeholder: '',
    readonly: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcStepperBoxType),
    },
    value: {control: 'number'},
    unit: {control: 'text'},
    min: {control: 'number'},
    max: {control: 'number'},
    stepUp: {control: 'number'},
    stepDown: {control: 'number'},
    disabled: {control: 'boolean'},
    helperText: {control: 'text'},
    placeholder: {control: 'text'},
    readonly: {control: 'boolean'},
  },
  render: (args) => html`
    <div style="width: 240px;">
      <obc-stepper-box
        type=${args.type}
        .value=${args.value}
        .min=${args.min}
        .max=${args.max}
        .stepUp=${args.stepUp}
        .stepDown=${args.stepDown}
        .disabled=${args.disabled}
        .helperText=${args.helperText}
        .placeholder=${args.placeholder}
        .readonly=${args.readonly}
      >
        ${args.unit ? html`<div slot="unit">${args.unit}</div>` : nothing}
      </obc-stepper-box>
    </div>
  `,
} satisfies Meta<StepperBoxArgs>;

export default meta;
type Story = StoryObj<StepperBoxArgs>;

export const PlusMinus: Story = {};

export const WithoutUnit: Story = {
  args: {unit: ''},
};

export const UpDown: Story = {
  args: {type: ObcStepperBoxType.upDown},
};

export const LeftRight: Story = {
  args: {type: ObcStepperBoxType.leftRight},
};

export const WithHelperText: Story = {
  args: {helperText: 'Helper text'},
};

export const Disabled: Story = {
  args: {disabled: true, helperText: 'Helper text'},
};
