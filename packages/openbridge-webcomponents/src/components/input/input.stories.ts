import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcInput} from './input';
import './input';
import {iconIds, iconIdToIconHtml} from '../../storybook-util';
import {withActions} from '@storybook/addon-actions/decorator';

import {html} from 'lit';

const meta: Meta<typeof ObcInput> = {
  title: 'Input/Input',
  tags: ['autodocs'],
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
    icon: {
      control: {type: 'select'},
      options: ['', ...iconIds],
    },
    font: {
      control: {type: 'select'},
      options: ['body', 'button'],
    },
  },
  parameters: {
    actions: {
      handles: ['input'],
    },
  },
  render: (args) => {
    return html`<obc-input
      .placeholder=${args.placeholder}
      .value=${args.value}
      .type=${args.type}
      .squared=${args.squared}
      .textAlign=${args.textAlign}
      .font=${args.font}
      @change=${console.log}
      @input=${console.log}
    >
      ${args.icon ? iconIdToIconHtml(args.icon, {slot: 'icon'}) : ''}
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

export const WithIcon: Story = {
  args: {
    placeholder: 'Placeholder',
    icon: 'search',
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
