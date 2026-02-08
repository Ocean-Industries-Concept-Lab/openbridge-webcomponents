import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './poi-pointer.js';
import {ObcPoiPointerState, ObcPoiPointerType} from './poi-pointer.js';

type PoiPointerArgs = {
  type: ObcPoiPointerType;
  state: ObcPoiPointerState;
};

const meta: Meta<PoiPointerArgs> = {
  title: 'AR/Building Blocks/POI Pointer',
  tags: ['6.0'],
  component: 'obc-poi-pointer',
  decorators: [
    (story) => html`
      <style>
        .poi-pointer-story-frame {
          min-height: 320px;
          padding: 24px;
          background: #f7f7f7;
          display: inline-block;
        }
      </style>
      <div class="poi-pointer-story-frame">${story()}</div>
    `,
  ],
  args: {
    type: ObcPoiPointerType.Point,
    state: ObcPoiPointerState.Regular,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiPointerType),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcPoiPointerState),
    },
  },
} satisfies Meta<PoiPointerArgs>;

export default meta;
type Story = StoryObj<PoiPointerArgs>;

export const Primary: Story = {
  render: (args) => html`
    <obc-poi-pointer .type=${args.type} .state=${args.state}></obc-poi-pointer>
  `,
};

export const VariantMatrix: Story = {
  render: () => {
    const states = [
      ObcPoiPointerState.Regular,
      ObcPoiPointerState.Uncertain,
      ObcPoiPointerState.Active,
      ObcPoiPointerState.Selected,
    ];
    const types = [
      ObcPoiPointerType.Point,
      ObcPoiPointerType.Button,
      ObcPoiPointerType.Camera,
    ];

    return html`
      <style>
        .matrix {
          display: grid;
          grid-template-columns: repeat(3, 96px);
          row-gap: 20px;
          column-gap: 16px;
          align-items: center;
          justify-items: center;
        }
      </style>
      <div class="matrix">
        ${states.map((state) =>
          types.map(
            (type) => html`
              <obc-poi-pointer .type=${type} .state=${state}></obc-poi-pointer>
            `
          )
        )}
      </div>
    `;
  },
};
