import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit/static-html.js';
import './poi-target/poi-target.js';

const meta: Meta = {
  title: 'AR/example',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Main: Story = {
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
        }

        img {
          display: block;
          width: 1333px;
          object-fit: cover;
          line-height: 0;
        }

        obc-poi-target {
          position: absolute;
          top: 250px;
        }

        #sailboat {
          left: 802px;
        }

        #sailboat2 {
          left: 782px;
        }

        #ferry {
          left: 615px;
        }

        #fast-small-boat {
          left: 200px;
        }
      </style>
      <div class="container">
        <img src="/AR-test-image.png" />
        <obc-poi-target
          .relativeDirection=${20}
          .overlap=${true}
          .height=${115}
          id="sailboat2"
        ></obc-poi-target>
        <obc-poi-target
          .height=${118}
          .relativeDirection=${20}
          id="sailboat"
        ></obc-poi-target>
        <obc-poi-target
          .height=${122}
          .relativeDirection=${270}
          id="fast-small-boat"
        ></obc-poi-target>
        <obc-poi-target
          .height=${108}
          .relativeDirection=${200}
          id="ferry"
        ></obc-poi-target>
      </div>
    `;
  },
};
