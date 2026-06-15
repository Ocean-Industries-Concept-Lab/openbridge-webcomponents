import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcTextbox, ObcTextboxFontWeight, ObcTextboxSize} from './textbox.js';
import './textbox.js';
import {html} from 'lit';

const meta: Meta<typeof ObcTextbox> = {
  title: 'BuildingBlock/TextBox',
  tags: ['autodocs', '6.0'],
  component: 'obc-textbox',
  args: {
    content: '123 ABC',
    spacer: '1234567 ABC',
  },
  argTypes: {
    size: {
      control: {type: 'radio'},
      options: Object.values(ObcTextboxSize),
    },
    fontWeight: {
      control: {type: 'radio'},
      options: Object.values(ObcTextboxFontWeight),
    },
  },
  render: (args) => html`
    <obc-textbox .size=${args.size} .fontWeight=${args.fontWeight}>
      <div>${args.content}</div>
      <div slot="spacer">${args.spacer}</div>
    </obc-textbox>
  `,
} satisfies Meta<ObcTextbox>;

export default meta;
type Story = StoryObj<ObcTextbox>;

export const MediumRegular: Story = {
  args: {
    size: ObcTextboxSize.m,
    fontWeight: ObcTextboxFontWeight.regular,
  },
};
