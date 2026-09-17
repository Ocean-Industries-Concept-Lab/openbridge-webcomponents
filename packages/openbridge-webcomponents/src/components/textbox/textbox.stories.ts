import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcTextbox,
  ObcTextboxAlignment,
  ObcTextboxFontWeight,
  ObcTextboxSize,
} from './textbox.js';
import './textbox.js';
import {html} from 'lit';

interface TextboxStoryArgs extends Partial<ObcTextbox> {
  content: string;
  length: string;
}

const meta: Meta<TextboxStoryArgs> = {
  title: 'Building Blocks/Textbox',
  tags: ['autodocs', '6.0'],
  component: 'obc-textbox',
  args: {
    size: ObcTextboxSize.m,
    fontWeight: ObcTextboxFontWeight.regular,
    alignment: ObcTextboxAlignment.Right,
    content: '123 ABC',
    length: '1234567 ABC',
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
    alignment: {
      control: {type: 'radio'},
      options: Object.values(ObcTextboxAlignment),
    },
  },
  render: (args) => html`
    <obc-textbox
      .size=${args.size}
      .fontWeight=${args.fontWeight}
      .alignment=${args.alignment}
    >
      <div>${args.content}</div>
      <div slot="length">${args.length}</div>
    </obc-textbox>
  `,
};

export default meta;
type Story = StoryObj<TextboxStoryArgs>;

const labelStyle =
  'font-size: 12px; color: var(--element-neutral-color, #777);';
const captionStyle =
  'font-size: 11px; font-style: italic; max-width: 520px; color: var(--element-neutral-color, #777);';
const boxOutline = 'outline: 1px solid var(--border-outline-color);';

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;"
    >
      ${Object.values(ObcTextboxSize).map(
        (size) => html`
          <obc-textbox .size=${size}>
            <div>${size.toUpperCase()} – 123 ABC</div>
          </obc-textbox>
        `
      )}
    </div>
  `,
};

export const FontWeights: Story = {
  render: () => html`
    <div
      style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;"
    >
      ${Object.values(ObcTextboxFontWeight).map(
        (fontWeight) => html`
          <obc-textbox .fontWeight=${fontWeight}>
            <div>${fontWeight} – 123 ABC</div>
          </obc-textbox>
        `
      )}
    </div>
  `,
};

export const Alignments: Story = {
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;"
    >
      <div style=${captionStyle}>
        Alignment positions the content within the box when the box is wider
        than the content. The width is determined by whichever is wider: the
        visible content or the reserved length slot.
      </div>
      ${Object.values(ObcTextboxAlignment).map(
        (alignment) => html`
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="${labelStyle} width: 56px;">${alignment}</div>
            <obc-textbox
              .size=${args.size}
              .fontWeight=${args.fontWeight}
              .alignment=${alignment}
              style=${boxOutline}
            >
              <div>${args.content}</div>
              <div slot="length">${args.length}</div>
            </obc-textbox>
          </div>
        `
      )}
    </div>
  `,
};

export const ReserveSpace: Story = {
  args: {
    content: '5',
    length: '00000',
  },
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;"
    >
      <div style=${captionStyle}>
        Content placed in the length slot reserves width invisibly, so the box
        keeps the size of the longest expected value (here "${args.length}")
        even when the visible content is shorter.
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="${labelStyle} width: 104px;">no length slot</div>
        <obc-textbox
          .size=${args.size}
          .fontWeight=${args.fontWeight}
          .alignment=${args.alignment}
          style=${boxOutline}
        >
          <div>${args.content}</div>
        </obc-textbox>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="${labelStyle} width: 104px;">length: ${args.length}</div>
        <obc-textbox
          .size=${args.size}
          .fontWeight=${args.fontWeight}
          .alignment=${args.alignment}
          style=${boxOutline}
        >
          <div>${args.content}</div>
          <div slot="length">${args.length}</div>
        </obc-textbox>
      </div>
    </div>
  `,
};
