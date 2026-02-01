import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit/static-html.js';
import './poi-target/poi-target.js';
import './poi-target-button-group/poi-target-button-group.js';
import './poi-layer-stack/poi-layer-stack.js';
import './poi-layer/poi-layer.js';
import {PoiLayerSelectionMode} from './poi-layer-stack/poi-layer-stack.js';

const meta: Meta = {
  title: 'AR/Example',
  tags: ['6.0', 'skip-snapshot'],

  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return html`
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          height: 100vh;
          position: relative;
          --obc-poi-target-selected-vertical-offset: 80px;
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          line-height: 0;
          position: relative;
          z-index: 0;
        }

        obc-poi-layer-stack {
          position: absolute;
          bottom: 36vh;
          left: 0;
          right: 0;
          max-height: 40vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          pointer-events: none;
          z-index: 1;
        }

        obc-poi-layer-stack > * {
          pointer-events: auto;
        }

        obc-poi-layer {
          grid-row: 1;
          grid-column: 1;
          width: 100%;
          --obc-poi-layer-min-height: 48px;
        }
      </style>
      <div class="container">
        <img src="/AR-test-image.png" />
        <obc-poi-layer-stack selection-mode=${PoiLayerSelectionMode.Multi}>
          <obc-poi-layer label="Background" .layerIndex=${2} debug>
            <obc-poi-target
              .x=${167}
              .y=${122}
              .relativeDirection=${270}
              id="fast-small-boat"
            ></obc-poi-target>
            <obc-poi-target
              .x=${826}
              .y=${115}
              .relativeDirection=${20}
              id="sailboat2"
            ></obc-poi-target>
            <obc-poi-target
              .x=${846}
              .y=${118}
              .relativeDirection=${20}
              id="sailboat"
            ></obc-poi-target>
            <obc-poi-target
              .x=${637}
              .y=${108}
              .relativeDirection=${200}
              id="ferry"
            ></obc-poi-target>
          </obc-poi-layer>
          <obc-poi-layer label="Active" .layerIndex=${1} debug> </obc-poi-layer>
          <obc-poi-layer label="Selected" .layerIndex=${0} debug>
          </obc-poi-layer>
        </obc-poi-layer-stack>
      </div>
    `;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Main: Story = {};
