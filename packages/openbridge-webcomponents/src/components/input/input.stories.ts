import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcInput} from './input.js';
import './input';
import {iconIds, iconIdToIconHtml} from '../../storybook-util.js';
import {withActions} from '@storybook/addon-actions/decorator';
import '../../icons/icon-placeholder.js';

import {html} from 'lit';

const meta: Meta<typeof ObcInput> = {
  title: 'Input/Input',
  tags: ['autodocs', '6.0'],
  component: 'obc-input',
  args: {},
  argTypes: {
    placeholder: {
      control: {type: 'text'},
    },
    value: {
      control: {type: 'text'},
    },
    type: {
      control: {type: 'select'},
      options: ['text', 'password'],
    },
    leadingIcon: {
      control: {type: 'select'},
      options: ['', ...iconIds],
    },
    trailingIcon: {
      control: {type: 'select'},
      options: ['', ...iconIds],
    },
    font: {
      control: {type: 'select'},
      options: ['body', 'button'],
    },
    helperText: {
      control: {type: 'text'},
    },
  },
  parameters: {
    actions: {
      handles: ['input'],
    },
  },
  render: (args) => {
    return html`<obc-input
      style="width: 240px; display: block;"
      placeholder=${args.placeholder}
      value=${args.value}
      type=${args.type}
      .squared=${args.squared}
      .textAlign=${args.textAlign}
      .font=${args.font}
      .disabled=${args.disabled}
      .error=${args.error}
      @change=${console.log}
      @input=${console.log}
    >
      ${args.leadingIcon
        ? iconIdToIconHtml(args.leadingIcon, {slot: 'leading-icon'})
        : ''}
      ${args.trailingIcon
        ? iconIdToIconHtml(args.trailingIcon, {slot: 'trailing-icon'})
        : ''}
      ${args.helperText
        ? html`<div slot="helper-text">${args.helperText}</div>`
        : ''}
    </obc-input>`;
  },
  decorators: [withActions],
} satisfies Meta<ObcInput>;

export default meta;
type Story = StoryObj<ObcInput>;

export const Primary: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const HelperText: Story = {
  args: {
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    leadingIcon: 'placeholder',
    trailingIcon: 'placeholder',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Placeholder',
    error: true,
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Placeholder',
    leadingIcon: 'search',
  },
};

export const Squared: Story = {
  args: {
    placeholder: 'Placeholder',
    squared: true,
    textAlign: 'center',
  },
};

export const Bolder: Story = {
  args: {
    placeholder: 'Placeholder',
    squared: true,
    textAlign: 'center',
    font: 'button',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Placeholder',
    disabled: true,
  },
};

/*
export const SplitButton : Story =  {
  args: {
    placeholder: 'Placeholder',
    helperText: 'Helper text',
    leadingIcon: 'placeholder',
    trailingIcon: 'placeholder',
  },
  render: (args) => {
    return html`<obc-input
      style="width: 240px; display: block;"
      placeholder=${args.placeholder}
      value=${args.value}
      type=${args.type}
      .squared=${args.squared}
      .textAlign=${args.textAlign}
      .font=${args.font}
      .disabled=${args.disabled}
      .error=${args.error}
      splitbutton
      @change=${console.log}
      @input=${console.log}
    >
      ${args.leadingIcon ? iconIdToIconHtml(args.leadingIcon, {slot: 'leading-icon'}) : ''}
      ${args.trailingIcon ? iconIdToIconHtml(args.trailingIcon, {slot: 'trailing-icon'}) : ''}
      ${args.helperText ? html`<div slot="helper-text">${args.helperText}</div>` : ''}
      <obi-placeholder slot="split-button"></obi-placeholder>
    </obc-input>`;
  },
}
  */
