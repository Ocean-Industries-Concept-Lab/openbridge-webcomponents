import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit/static-html.js';
import './poi-target/poi-target.js';
import {ObcPoiTarget} from './poi-target/poi-target.js';

function toogleSelected(event: CustomEvent) {
  const target = event.target as ObcPoiTarget;
  const selected = target.selected;
  target.selected = !selected;
  target.selectedId = selected ? null : '1';
}

const meta: Meta = {
  title: 'AR/example',

  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => {
    return html`
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          height: 100vh;
          --obc-poi-target-selected-vertical-offset: 80px;
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
          .overlap=${!args.selected}
          .height=${115}
          id="sailboat2"
          @click=${toogleSelected}
        ></obc-poi-target>
        <obc-poi-target
          .height=${118}
          .relativeDirection=${20}
          .selected=${args.selected}
          selectedId="1"
          id="sailboat"
          @click=${toogleSelected}
        ></obc-poi-target>
        <obc-poi-target
          .height=${122}
          .relativeDirection=${270}
          id="fast-small-boat"
          @click=${toogleSelected}
        ></obc-poi-target>
        <obc-poi-target
          .height=${108}
          .relativeDirection=${200}
          id="ferry"
          @click=${toogleSelected}
        ></obc-poi-target>
      </div>
    `;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Main: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
