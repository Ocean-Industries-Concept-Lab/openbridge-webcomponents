import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  ObcPoiSelectionFrame,
  ObcPoiSelectionFrameState,
  ObcPoiSelectionFrameType,
} from './poi-selection-frame.js';
import './poi-selection-frame.js';

const meta: Meta<ObcPoiSelectionFrame> = {
  title: 'AR/Building blocks/POI Selection Frame',
  tags: ['autodocs', '6.1'],
  component: 'obc-poi-selection-frame',
  args: {
    type: ObcPoiSelectionFrameType.Indicator,
    state: ObcPoiSelectionFrameState.Regular,
    customMode: false,
    boxWidth: 28,
    boxHeight: 28,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(ObcPoiSelectionFrameType),
    },
    state: {
      control: {type: 'select'},
      options: Object.values(ObcPoiSelectionFrameState),
    },
    customMode: {
      control: {type: 'boolean'},
    },
    boxWidth: {
      control: {type: 'number', min: 28, step: 1},
      description:
        'Custom frame width in pixels when customMode is enabled (28px is default).',
    },
    boxHeight: {
      control: {type: 'number', min: 28, step: 1},
      description:
        'Custom frame height in pixels when customMode is enabled (28px is default).',
    },
  },
  render: (args) => html`
    <div
      style="display: flex; align-items: center; justify-content: center; min-height: 96px; background: #f7f7f7; padding: 16px;"
    >
      <obc-poi-selection-frame
        .type=${args.type}
        .state=${args.state}
        .customMode=${args.customMode}
        .boxWidth=${Math.max(0, Number(args.boxWidth) - 28)}
        .boxHeight=${Math.max(0, Number(args.boxHeight) - 28)}
      ></obc-poi-selection-frame>
    </div>
  `,
};

export default meta;
type Story = StoryObj<ObcPoiSelectionFrame>;

export const Interactive: Story = {};

export const VariantMatrix: Story = {
  render: () => {
    const states = [
      ObcPoiSelectionFrameState.Regular,
      ObcPoiSelectionFrameState.Flat,
      ObcPoiSelectionFrameState.None,
      ObcPoiSelectionFrameState.Alert,
    ];
    const types = [
      ObcPoiSelectionFrameType.Indicator,
      ObcPoiSelectionFrameType.Button,
      ObcPoiSelectionFrameType.Enhanced,
    ];

    return html`
      <style>
        .matrix {
          display: grid;
          grid-template-columns: repeat(3, minmax(84px, auto));
          gap: 12px;
          padding: 16px;
          background: #f7f7f7;
          width: fit-content;
        }

        .cell {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 84px;
          min-height: 84px;
        }
      </style>
      <div class="matrix">
        ${states.map((state) =>
          types.map(
            (type) => html`
              <div class="cell">
                <obc-poi-selection-frame
                  .type=${type}
                  .state=${state}
                ></obc-poi-selection-frame>
              </div>
            `
          )
        )}
      </div>
    `;
  },
};
