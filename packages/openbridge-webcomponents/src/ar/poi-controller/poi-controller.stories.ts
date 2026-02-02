import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './poi-controller.js';
import {PoiFitMode} from './poi-controller.js';
import {PoiLayerSelectionMode} from '../poi-layer-stack/poi-layer-stack.js';

type PoiControllerArgs = {
  fit: PoiFitMode;
  classFilter: string[];
};

const meta: Meta<PoiControllerArgs> = {
  title: 'AR/POI Controller',
  tags: ['6.0'],
  component: 'obc-poi-controller',
  args: {
    fit: PoiFitMode.Contain,
    classFilter: [],
  },
  render: (args) => {
    const frames = [
      {
        frame: 1,
        timestamp: 0.04,
        detections: [
          {
            x: 1800,
            y: 280,
            width: 118,
            height: 32,
            confidence: 0.38,
            class: 'boat',
            class_id: 7,
          },
          {
            x: 590,
            y: 290,
            width: 140,
            height: 40,
            confidence: 0.62,
            class: 'boat',
            class_id: 7,
          },
        ],
      },
    ];

    return html`
      <style>
        .stage {
          width: 100%;
          max-width: 1200px;
          aspect-ratio: 16 / 9;
        }

        .stage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      </style>
      <div class="stage">
        <obc-poi-controller
          .frames=${frames}
          .fit=${args.fit}
          .classFilter=${args.classFilter}
        >
          <img slot="media" src="/AR-test-image.png" />
          <obc-poi-layer-stack
            slot="stack"
            selection-mode=${PoiLayerSelectionMode.Single}
          >
            <obc-poi-layer role="selected" .layerIndex=${0}></obc-poi-layer>
            <obc-poi-layer role="default" .layerIndex=${1}></obc-poi-layer>
          </obc-poi-layer-stack>
        </obc-poi-controller>
      </div>
    `;
  },
} satisfies Meta<PoiControllerArgs>;

export default meta;
type Story = StoryObj<PoiControllerArgs>;

export const Primary: Story = {
  args: {},
};
