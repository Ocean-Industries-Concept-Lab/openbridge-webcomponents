import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './cycling-dropdown-button.js';
import type {ObcCyclingDropdownButton} from './cycling-dropdown-button.js';
import '../../icons/icon-placeholder.js';

const meta: Meta<ObcCyclingDropdownButton> = {
  title: 'UI Components/Buttons/Two Step Action/Cycling Dropdown Button',
  tags: ['autodocs', '6.0'],
  component: 'obc-cycling-dropdown-button',
  parameters: {
    docs: {
      controls: {disable: true},
    },
    controls: {
      disable: true,
    },
  },
  argTypes: {
    options: {control: 'object', table: {disable: true}},
    value: {control: 'text', table: {disable: true}},
    fullWidth: {control: 'boolean', table: {disable: true}},
    disabled: {control: 'boolean', table: {disable: true}},
    openTop: {control: 'boolean', table: {disable: true}},
  },
  args: {
    fullWidth: true,
    openTop: true,
    options: [
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
    ],
    value: 'volvo',
  },
};

export default meta;
type Story = StoryObj<ObcCyclingDropdownButton>;

export const Default: Story = {
  render: (args) => html`
    <div style="width: 220px;">
      <obc-cycling-dropdown-button
        .options=${args.options}
        .value=${args.value}
        .fullWidth=${args.fullWidth}
        .disabled=${args.disabled}
        .openTop=${args.openTop}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-cycling-dropdown-button>
    </div>
  `,
};

export const Disabled: Story = {
  args: {disabled: true},
  render: (args) => html`
    <div style="width: 220px;">
      <obc-cycling-dropdown-button
        .options=${args.options}
        .value=${args.value}
        .fullWidth=${args.fullWidth}
        .disabled=${args.disabled}
        .openTop=${args.openTop}
      >
        <obi-placeholder slot="icon"></obi-placeholder>
      </obc-cycling-dropdown-button>
    </div>
  `,
};
