import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './cycling-dropdown-button.js';
import type {ObcCyclingDropdownButton} from './cycling-dropdown-button.js';
import '../../icons/icon-placeholder.js';

const demoOptions = [
  {
    value: 'volvo',
    label: 'Volvo',
    description: 'Description',
    icon: html`<obi-placeholder></obi-placeholder>`,
  },
  {
    value: 'xc90',
    label: 'XC 90',
    description: 'Description',
    icon: html`<obi-placeholder></obi-placeholder>`,
  },
  {
    value: 'mercedes',
    label: 'Mercedes',
    description: 'Description',
    icon: html`<obi-placeholder></obi-placeholder>`,
  },
];

const meta: Meta<ObcCyclingDropdownButton> = {
  title: 'UI Components/Buttons/Two Step Action/Cycling Dropdown Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-cycling-dropdown-button',
  args: {
    ariaLabel: '',
    autoCloseDelayMs: 2000,
    fullWidth: true,
    openTop: false,
    options: demoOptions,
    value: 'volvo',
    disabled: false,
  },
  argTypes: {
    ariaLabel: {
      control: {type: 'text'},
      table: {category: 'Accessibility'},
    },
    autoCloseDelayMs: {
      control: {type: 'number'},
      table: {category: 'Behavior'},
    },
    fullWidth: {control: {type: 'boolean'}},
    openTop: {control: {type: 'boolean'}},
    disabled: {control: {type: 'boolean'}},
    value: {control: {type: 'text'}},
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['change'],
    },
  },
};

export default meta;
type Story = StoryObj<ObcCyclingDropdownButton>;

const renderStory = (args: ObcCyclingDropdownButton) => html`
  <div style="width: 220px;">
    <obc-cycling-dropdown-button
      .options=${args.options}
      .value=${args.value}
      .fullWidth=${args.fullWidth}
      .disabled=${args.disabled}
      .openTop=${args.openTop}
      .autoCloseDelayMs=${args.autoCloseDelayMs}
      .ariaLabel=${args.ariaLabel}
    >
      <obi-placeholder slot="icon"></obi-placeholder>
    </obc-cycling-dropdown-button>
  </div>
`;

export const Default: Story = {
  render: (args) => renderStory(args),
};

export const Disabled: Story = {
  args: {disabled: true},
  render: (args) => renderStory(args),
};

export const OpenTop: Story = {
  args: {openTop: true},
  render: (args) => renderStory(args),
  parameters: {
    docs: {
      description: {
        story: 'Menu opens above the trigger (`open-top`).',
      },
    },
  },
};

export const NoAutoClose: Story = {
  args: {autoCloseDelayMs: 0},
  render: (args) => renderStory(args),
  parameters: {
    docs: {
      description: {
        story:
          'Auto-close disabled (`auto-close-delay-ms="0"`). Close via outside click.',
      },
    },
  },
};
