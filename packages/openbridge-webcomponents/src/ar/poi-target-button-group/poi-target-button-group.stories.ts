import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcPoiTargetButtonGroup} from './poi-target-button-group';
import './poi-target-button-group';
import {crossDecorator} from '../../storybook-util.js';
import {html} from 'lit';
import '../poi-target-button/poi-target-button.js';
import '../../icons/icon-ais-target-activated-iec';
import '../poi-target/poi-target';
import {ObcPoiTarget} from '../poi-target/poi-target';

function onExpand(event: CustomEvent<{expand: boolean}>) {
  (document.querySelector('#outside') as ObcPoiTarget).overlap =
    event.detail.expand;
}

const meta: Meta<typeof ObcPoiTargetButtonGroup> = {
  title: 'AR/POI Target Button Group',
  tags: ['6.0'],
  component: 'obc-poi-target-button-group',
  decorators: [crossDecorator],
  args: {},
  render: (args) => html`
    <style>
      obc-poi-target {
        position: absolute;
        top: 50%;
      }
      #b1 {
        left: calc(50% - 15px);
      }
      #b2 {
        left: calc(50% + 15px);
      }
      #b3 {
        left: calc(50% - 30px);
      }

      #outside {
        left: calc(50% - 120px);
      }

      .group {
        top: 0;
        left: 0;
      }
    </style>
    <obc-poi-target-button-group
      class="group"
      .expand=${args.expand}
      positionVertical="calc(50%)"
      @expand=${onExpand}
    >
      <obc-poi-target id="b2" overlap></obc-poi-target>
      <obc-poi-target id="b3" overlap></obc-poi-target>
      <obc-poi-target id="b1" .relativeDirection=${65}> </obc-poi-target>
    </obc-poi-target-button-group>

    <obc-poi-target id="outside" .overlap=${args.expand}>
      <obi-ais-target-activated-iec></obi-ais-target-activated-iec>
    </obc-poi-target>
  `,
} satisfies Meta<ObcPoiTargetButtonGroup>;

export default meta;
type Story = StoryObj<ObcPoiTargetButtonGroup>;

export const Grouped: Story = {
  args: {
    expand: false,
  },
};

export const Expanded: Story = {
  args: {
    expand: true,
  },
};
