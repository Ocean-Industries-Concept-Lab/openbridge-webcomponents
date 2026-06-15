import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcCapHeightTextbox,
  ObcCapHeightTextboxAlignment,
  ObcCapHeightTextboxFontWeight,
  ObcCapHeightTextboxSize,
} from './cap-height-textbox.js';
import './cap-height-textbox.js';
import {html} from 'lit';

interface CapHeightTextboxStoryArgs extends Partial<ObcCapHeightTextbox> {
  content: string;
  length: string;
}

const meta: Meta<CapHeightTextboxStoryArgs> = {
  title: 'BuildingBlock/Cap Height Textbox',
  tags: ['autodocs', '6.0'],
  component: 'obc-cap-height-textbox',
  args: {
    size: ObcCapHeightTextboxSize.m,
    fontWeight: ObcCapHeightTextboxFontWeight.regular,
    alignment: ObcCapHeightTextboxAlignment.Right,
    hug: true,
    content: '123 ABC',
    length: '1234567 ABC',
  },
  argTypes: {
    size: {
      control: {type: 'radio'},
      options: Object.values(ObcCapHeightTextboxSize),
    },
    fontWeight: {
      control: {type: 'radio'},
      options: Object.values(ObcCapHeightTextboxFontWeight),
    },
    alignment: {
      control: {type: 'radio'},
      options: Object.values(ObcCapHeightTextboxAlignment),
    },
    hug: {
      control: {type: 'boolean'},
    },
  },
  render: (args) => html`
    <obc-cap-height-textbox
      .size=${args.size}
      .fontWeight=${args.fontWeight}
      .alignment=${args.alignment}
      .hug=${args.hug}
    >
      <div>${args.content}</div>
      <div slot="length">${args.length}</div>
    </obc-cap-height-textbox>
  `,
};

export default meta;
type Story = StoryObj<CapHeightTextboxStoryArgs>;

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
      ${Object.values(ObcCapHeightTextboxSize).map(
        (size) => html`
          <obc-cap-height-textbox .size=${size}>
            <div>${size.toUpperCase()} – 123 ABC</div>
          </obc-cap-height-textbox>
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
      ${Object.values(ObcCapHeightTextboxFontWeight).map(
        (fontWeight) => html`
          <obc-cap-height-textbox .fontWeight=${fontWeight}>
            <div>${fontWeight} – 123 ABC</div>
          </obc-cap-height-textbox>
        `
      )}
    </div>
  `,
};

export const Alignments: Story = {
  args: {
    hug: false,
  },
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;"
    >
      <div style=${captionStyle}>
        Alignment positions the content within the box. It is most visible in
        length mode (hug = false), where the box stays wider than the content.
      </div>
      ${Object.values(ObcCapHeightTextboxAlignment).map(
        (alignment) => html`
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="${labelStyle} width: 56px;">${alignment}</div>
            <obc-cap-height-textbox
              .size=${args.size}
              .fontWeight=${args.fontWeight}
              .alignment=${alignment}
              .hug=${args.hug}
              style=${boxOutline}
            >
              <div>${args.content}</div>
              <div slot="length">${args.length}</div>
            </obc-cap-height-textbox>
          </div>
        `
      )}
    </div>
  `,
};

export const HugVsLength: Story = {
  args: {
    content: '1234567890',
    length: '12345',
    alignment: ObcCapHeightTextboxAlignment.Left,
  },
  render: (args) => html`
    <div
      style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;"
    >
      <div style=${captionStyle}>
        hug sizes the box to its content (everything visible). length fixes the
        box to the reserved length width and crops content on the side opposite
        the alignment.
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="${labelStyle} width: 56px;">hug</div>
        <obc-cap-height-textbox
          .size=${args.size}
          .fontWeight=${args.fontWeight}
          .alignment=${args.alignment}
          .hug=${true}
          style=${boxOutline}
        >
          <div>${args.content}</div>
          <div slot="length">${args.length}</div>
        </obc-cap-height-textbox>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="${labelStyle} width: 56px;">length</div>
        <obc-cap-height-textbox
          .size=${args.size}
          .fontWeight=${args.fontWeight}
          .alignment=${args.alignment}
          .hug=${false}
          style=${boxOutline}
        >
          <div>${args.content}</div>
          <div slot="length">${args.length}</div>
        </obc-cap-height-textbox>
      </div>
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
        <obc-cap-height-textbox
          .size=${args.size}
          .fontWeight=${args.fontWeight}
          .alignment=${args.alignment}
          .hug=${args.hug}
          style=${boxOutline}
        >
          <div>${args.content}</div>
        </obc-cap-height-textbox>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="${labelStyle} width: 104px;">length: ${args.length}</div>
        <obc-cap-height-textbox
          .size=${args.size}
          .fontWeight=${args.fontWeight}
          .alignment=${args.alignment}
          .hug=${args.hug}
          style=${boxOutline}
        >
          <div>${args.content}</div>
          <div slot="length">${args.length}</div>
        </obc-cap-height-textbox>
      </div>
    </div>
  `,
};
