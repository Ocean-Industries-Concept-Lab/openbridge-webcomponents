import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './two-step-switch.js';

type TwoStepSwitchStoryArgs = {
  activeStateLabel: string;
  disabled: boolean;
  idleActionLabel: string;
  idleStateLabel: string;
  activeActionLabel: string;
};

const meta = {
  title: 'UI Components/Buttons/Two Step Action/Two Step Switch',
  tags: ['autodocs'],
  component: 'obc-two-step-switch',
  args: {
    activeStateLabel: 'IN CMD',
    disabled: false,
    idleActionLabel: 'Take',
    idleStateLabel: 'NO CMD',
    activeActionLabel: 'Release',
  },
  argTypes: {
    activeStateLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    idleActionLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
    idleStateLabel: {control: {type: 'text'}, table: {category: 'Switch copy'}},
    activeActionLabel: {
      control: {type: 'text'},
      table: {category: 'Switch copy'},
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => html`
    <div
      style="display: flex; justify-content: center; align-items: center; width: 100%; min-height: 100vh;"
    >
      <obc-two-step-switch
        ?disabled=${args.disabled}
        .idleActionLabel=${args.idleActionLabel}
        .idleStateLabel=${args.idleStateLabel}
        .activeActionLabel=${args.activeActionLabel}
        .activeStateLabel=${args.activeStateLabel}
      ></obc-two-step-switch>
    </div>
  `,
} satisfies Meta<TwoStepSwitchStoryArgs>;

export default meta;
type Story = StoryObj<TwoStepSwitchStoryArgs>;

export const Default: Story = {
  name: 'Default',
  args: {},
};
