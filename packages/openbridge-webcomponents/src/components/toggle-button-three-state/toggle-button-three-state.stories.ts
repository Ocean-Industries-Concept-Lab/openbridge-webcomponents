import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcToggleButtonThreeStateValue} from './toggle-button-three-state.js';
import './toggle-button-three-state.js';

type ObcToggleButtonThreeStateArgs = {
  state: ObcToggleButtonThreeStateValue;
  disabled: boolean;
};

const meta: Meta<ObcToggleButtonThreeStateArgs> = {
  title:
    'UI Components/Selection Controls and Switches/Toggle Button - Three State',
  tags: ['autodocs', '6.0'],
  component: 'obc-toggle-button-three-state',
  args: {
    state: ObcToggleButtonThreeStateValue.noInput,
    disabled: false,
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['change'],
    },
    docs: {
      description: {
        component: [
          '`<obc-toggle-button-three-state>` – A compact, three-state toggle.',
          '',
          '### Features',
          '- **Three states:** `no-input`, `success`, `error`.',
          '- **Status colors:** Uses alert success/error palettes for quick scanning.',
          '- **Disabled state:** Supports disabled rendering for read-only views.',
          '',
          '### Usage Guidelines',
          'Use when a control needs to express input status at a glance.',
          'Prefer `no-input` as the default state until validation completes.',
          '',
          '### Properties',
          '- `state` (`ObcToggleButtonThreeStateValue`): Current state.',
          '- `disabled` (`boolean`): Disables interaction.',
          '',
          '### Events',
          '- `change` – Fired when the user toggles the state.',
          '',
          '### Example',
          '```html',
          '<obc-toggle-button-three-state state="success"></obc-toggle-button-three-state>',
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    state: {
      options: Object.values(ObcToggleButtonThreeStateValue),
      control: {type: 'select'},
    },
    disabled: {
      control: {type: 'boolean'},
    },
  },
  render: (args) =>
    html`<div
      style="display:flex; justify-content:center; align-items:center; width:100%;"
    >
      <obc-toggle-button-three-state
        .state=${args.state}
        ?disabled=${args.disabled}
      ></obc-toggle-button-three-state>
    </div>`,
} satisfies Meta<ObcToggleButtonThreeStateArgs>;

export default meta;
type Story = StoryObj<ObcToggleButtonThreeStateArgs>;

export const NoInput: Story = {
  args: {
    state: ObcToggleButtonThreeStateValue.noInput,
  },
};

export const Success: Story = {
  args: {
    state: ObcToggleButtonThreeStateValue.success,
  },
};

export const ErrorState: Story = {
  args: {
    state: ObcToggleButtonThreeStateValue.error,
  },
};
