import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit/static-html.js';
import './poi-target/poi-target.js';
import './poi-target-button-group/poi-target-button-group.js';

const meta: Meta = {
  title: 'AR/Example',
  tags: ['6.0'],

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
          top: 298px;
        }

        #sailboat {
          left: 826px;
        }

        #sailboat2 {
          left: 806px;
        }

        #ferry {
          left: 637px;
        }

        #fast-small-boat {
          left: 224px;
        }

        .poi {
          position: absolute;
          background-color: red;
          width: 2px;
          height: 2px;
          transform: translate(-50%, -50%);
        }
      </style>
      <div class="container">
        <img src="/AR-test-image.png" />
        <obc-poi-target
          .height=${122}
          .relativeDirection=${270}
          id="fast-small-boat"
        ></obc-poi-target>
        ${args.selected
          ? html`
              <obc-poi-target
                .relativeDirection=${20}
                .overlap=${!args.selected}
                .height=${115}
                id="sailboat2"
              ></obc-poi-target>
              <obc-poi-target
                .height=${118}
                .relativeDirection=${20}
                selected
                selectedId="1"
                id="sailboat"
              ></obc-poi-target>
            `
          : html`
              <obc-poi-target-button-group positionvertical="298px">
                <obc-poi-target
                  .relativeDirection=${200}
                  .overlap=${!args.selected}
                  .height=${115}
                  id="sailboat2"
                ></obc-poi-target>
                <obc-poi-target
                  .height=${118}
                  .relativeDirection=${20}
                  id="sailboat"
                ></obc-poi-target>
              </obc-poi-target-button-group>
            `}

        <obc-poi-target
          .height=${108}
          .relativeDirection=${200}
          id="ferry"
        ></obc-poi-target>
      </div>
    `;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Main: Story = {};

export const Selected: Story = {
  tags: ['skip-snapshot'],
  args: {
    selected: true,
  },
};
