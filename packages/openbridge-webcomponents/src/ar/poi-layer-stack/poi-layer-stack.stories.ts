import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {ObcPoiLayerStack} from './poi-layer-stack.js';
import './poi-layer-stack.js';
import '../poi-layer/poi-layer.js';
import '../poi-target/poi-target.js';

type PoiLayerStackArgs = {
  label: string;
  debug: boolean;
  layerIndex: number;
};

const meta: Meta<PoiLayerStackArgs> = {
  title: 'AR/POI Layer Stack',
  tags: ['6.0'],
  component: 'obc-poi-layer-stack',
  args: {
    label: 'Layer A',
    debug: true,
    layerIndex: 0,
  },
} satisfies Meta<PoiLayerStackArgs>;

export default meta;
type Story = StoryObj<PoiLayerStackArgs>;

export const TwoLayers: Story = {
  render(args) {
    return html`
      <style>
        obc-poi-layer-stack.stack {
          display: grid;
          gap: 8px;
          width: 640px;
        }

        obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 100%;
        }
      </style>
      <obc-poi-layer-stack class="stack" selection-mode="single">
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target style="left: 120px;" height="110">
          </obc-poi-target>
          <obc-poi-target style="left: 320px;" height="70">
          </obc-poi-target>
        </obc-poi-layer>
        <obc-poi-layer
          label="Layer B"
          .layerIndex=${args.layerIndex + 1}
          debug
        >
          <obc-poi-target style="left: 220px;" height="90">
          </obc-poi-target>
        </obc-poi-layer>
      </obc-poi-layer-stack>
    `;
  },
};

export const ThreeLayers: Story = {
  render(args) {
    return html`
      <style>
        obc-poi-layer-stack.stack {
          display: grid;
          gap: 8px;
          width: 640px;
        }

        obc-poi-layer {
          --obc-poi-layer-min-height: 48px;
          width: 100%;
        }
      </style>
      <obc-poi-layer-stack class="stack" selection-mode="multi">
        <obc-poi-layer
          .label=${args.label}
          .layerIndex=${args.layerIndex}
          ?debug=${args.debug}
        >
          <obc-poi-target style="left: 80px;" height="120">
          </obc-poi-target>
          <obc-poi-target style="left: 260px;" height="80">
          </obc-poi-target>
        </obc-poi-layer>
        <obc-poi-layer
          label="Layer B"
          .layerIndex=${args.layerIndex + 1}
          debug
        >
          <obc-poi-target style="left: 180px;" height="100">
          </obc-poi-target>
          <obc-poi-target style="left: 420px;" height="140">
          </obc-poi-target>
        </obc-poi-layer>
        <obc-poi-layer
          label="Layer C"
          .layerIndex=${args.layerIndex + 2}
          debug
        >
          <obc-poi-target style="left: 140px;" height="90">
          </obc-poi-target>
          <obc-poi-target style="left: 520px;" height="110">
          </obc-poi-target>
        </obc-poi-layer>
      </obc-poi-layer-stack>
    `;
  },
};
