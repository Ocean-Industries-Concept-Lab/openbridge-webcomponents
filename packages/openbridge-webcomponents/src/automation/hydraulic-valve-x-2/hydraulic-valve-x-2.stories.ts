import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  HydraulicValveX2Type,
  ObcHydraulicValveX2,
} from './hydraulic-valve-x-2.js';
import './hydraulic-valve-x-2.js';
import type {PositionSelectedEvent} from '../shuffle-button/shuffle-button-base.js';

const meta: Meta<typeof ObcHydraulicValveX2> = {
  title: 'Automation/Hydraulic Valves/Valve X-2',
  tags: ['autodocs', 'wip'],
  component: 'obc-hydraulic-valve-x-2',
  args: {
    type: HydraulicValveX2Type.TwoTwo,
    selectedPosition: 1,
    vertical: false,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(HydraulicValveX2Type),
    },
    selectedPosition: {
      control: {type: 'number', min: 0, max: 1, step: 1},
    },
  },
  render: (args) => html`
    <obc-hydraulic-valve-x-2
      type=${args.type}
      .selectedPosition=${args.selectedPosition}
      ?vertical=${args.vertical}
      @position-selected=${(event: PositionSelectedEvent) => {
        (event.target as ObcHydraulicValveX2).selectedPosition =
          event.detail.position;
      }}
    ></obc-hydraulic-valve-x-2>
  `,
} satisfies Meta<ObcHydraulicValveX2>;

export default meta;
type Story = StoryObj<ObcHydraulicValveX2>;

export const Default: Story = {};

export const TypeThreeTwo: Story = {
  args: {type: HydraulicValveX2Type.ThreeTwo},
};

export const TypeFourTwo: Story = {
  args: {type: HydraulicValveX2Type.FourTwo},
};

export const PositionFirst: Story = {
  args: {selectedPosition: 0},
};

export const Vertical: Story = {
  args: {vertical: true},
};
