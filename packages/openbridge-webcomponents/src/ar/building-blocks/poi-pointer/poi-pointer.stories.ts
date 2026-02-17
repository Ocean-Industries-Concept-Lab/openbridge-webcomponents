import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './poi-pointer.js';
import {ObcPoiPointerState, ObcPoiPointerType} from './poi-pointer.js';

type PoiPointerArgs = {
  type: ObcPoiPointerType;
  state: ObcPoiPointerState;
  boxWidth: number | null;
  boxHeight: number | null;
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
    boxWidth: null,
    boxHeight: null,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiPointerType),
      table: {type: {summary: 'ObcPoiPointerType'}},
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcPoiPointerState),
      table: {type: {summary: 'ObcPoiPointerState'}},
    },
    boxWidth: {
      control: {type: 'number', min: 0, step: 1},
      table: {type: {summary: 'number'}},
      description:
        'Extra width (px) applied to all button/camera states, and point selected.',
    },
    boxHeight: {
      control: {type: 'number', min: 0, step: 1},
      table: {type: {summary: 'number'}},
      description:
        'Extra height (px) applied to all button/camera states, and point selected.',
    },
    'box-width': {control: false, table: {disable: true}},
    'box-height': {control: false, table: {disable: true}},
  },
  parameters: {
    controls: {
      include: ['type', 'state', 'boxWidth', 'boxHeight'],
    },
    docs: {
      controls: {
        include: ['type', 'state', 'boxWidth', 'boxHeight'],
      },
    },
  },
} satisfies Meta<PoiPointerArgs>;

export default meta;
type Story = StoryObj<PoiPointerArgs>;

export const Primary: Story = {
  render: (args) => html`
    <obc-poi-pointer
      .type=${args.type}
      .state=${args.state}
      .boxWidth=${args.boxWidth}
      .boxHeight=${args.boxHeight}
    ></obc-poi-pointer>
  `,
};

export const VariantMatrix: Story = {
  render: (args) => {
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
        .matrix-wrap {
          display: inline-block;
        }

        .matrix {
          display: grid;
          grid-template-columns: repeat(3, 132px);
          row-gap: 14px;
          column-gap: 14px;
        }

        .cell {
          width: 132px;
          height: 110px;
          position: relative;
        }

        .cell::before,
        .cell::after {
          content: '';
          position: absolute;
          background: rgba(0, 0, 0, 0.2);
          pointer-events: none;
        }

        .cell::before {
          width: 1px;
          top: 0;
          bottom: 0;
          left: calc(50% - 0.5px);
        }

        .cell::after {
          height: 1px;
          left: 0;
          right: 0;
          top: calc(50% - 0.5px);
        }

        .stage {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0;
          line-height: 0;
        }

        .stage > obc-poi-pointer {
          display: block;
        }
      </style>
      <div class="matrix-wrap">
        <div class="matrix">
          ${states.map((state) =>
            types.map(
              (type) => html`
                <div class="cell">
                  <div class="stage">
                    <obc-poi-pointer
                      .type=${type}
                      .state=${state}
                      .boxWidth=${state === ObcPoiPointerState.Active ||
                      state === ObcPoiPointerState.Selected
                        ? args.boxWidth
                        : null}
                      .boxHeight=${state === ObcPoiPointerState.Active ||
                      state === ObcPoiPointerState.Selected
                        ? args.boxHeight
                        : null}
                    ></obc-poi-pointer>
                  </div>
                </div>
              `
            )
          )}
        </div>
      </div>
    `;
  },
};
