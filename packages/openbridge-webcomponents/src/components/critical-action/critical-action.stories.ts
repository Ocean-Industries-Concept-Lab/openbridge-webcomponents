import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './critical-action.js';

type CriticalActionStoryArgs = {
  label: string;
  disabled: boolean;
  criticalDescription: string;
};

const meta = {
  title: 'UI Components/Buttons/Two Step Action/Critical Action',
  tags: ['autodocs', '6.0'],
  component: 'obc-critical-action',
  args: {
    label: 'MOB',
    disabled: false,
    criticalDescription:
      'Action description about what is about to happen when you click.',
  },
  argTypes: {
    label: {control: {type: 'text'}},
    criticalDescription: {control: {type: 'text'}},
  },
  parameters: {
    layout: 'fullscreen',
    actions: {handles: ['confirm-click']},
  },
  render: (args) => html`
    <div
      style="display: flex; justify-content: center; align-items: center; width: 100%; min-height: 100vh;"
    >
      <obc-critical-action
        ?disabled=${args.disabled}
        .label=${args.label}
        .criticalDescription=${args.criticalDescription}
      ></obc-critical-action>
    </div>
  `,
} satisfies Meta<CriticalActionStoryArgs>;

export default meta;
type Story = StoryObj<CriticalActionStoryArgs>;

export const Default: Story = {
  name: 'Default',
  args: {},
};
