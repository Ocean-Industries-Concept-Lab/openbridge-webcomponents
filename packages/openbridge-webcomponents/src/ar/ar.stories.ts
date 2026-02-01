import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit/static-html.js';
import './poi-controller/poi-controller.js';

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
        <obc-poi-controller
          .detections=${[
            {x: 600, y: 285, width: 40, height: 40, id: 'fast-small-boat'},
            {x: 1830, y: 270, width: 40, height: 40, id: 'sailboat2'},
            {x: 2300, y: 300, width: 40, height: 40, id: 'sailboat'},
            {x: 2360, y: 300, width: 40, height: 40, id: 'ferry'},
          ]}
        >
          <img slot="media" src="/AR-test-image.png" />
        </obc-poi-controller>
      </div>
    `;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Main: Story = {};
