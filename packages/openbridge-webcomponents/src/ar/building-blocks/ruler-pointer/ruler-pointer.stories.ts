import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './ruler-pointer.js';
import {ObcRulerPointerType} from './ruler-pointer.js';

type RulerPointerArgs = {
  type: ObcRulerPointerType;
};

const meta: Meta<RulerPointerArgs> = {
  title: 'AR/Building Blocks/Ruler Pointer',
  tags: ['skip-test', '6.0'],
  component: 'obc-ruler-pointer',
  decorators: [
    (story) => html`
      <style>
        .ruler-pointer-story-frame {
          min-height: 160px;
          padding: 24px;
          background: #f7f7f7;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div class="ruler-pointer-story-frame">${story()}</div>
    `,
  ],
  args: {
    type: ObcRulerPointerType.Default,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcRulerPointerType),
    },
  },
} satisfies Meta<RulerPointerArgs>;

export default meta;
type Story = StoryObj<RulerPointerArgs>;

export const Primary: Story = {
  render: (args) =>
    html`<obc-ruler-pointer .type=${args.type}></obc-ruler-pointer>`,
};

export const VariantMatrix: Story = {
  render: () => html`
    <style>
      .matrix {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    </style>
    <div class="matrix">
      <obc-ruler-pointer
        .type=${ObcRulerPointerType.Default}
      ></obc-ruler-pointer>
      <obc-ruler-pointer
        .type=${ObcRulerPointerType.Regular}
      ></obc-ruler-pointer>
      <obc-ruler-pointer
        .type=${ObcRulerPointerType.Selected}
      ></obc-ruler-pointer>
    </div>
  `,
};
