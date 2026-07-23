import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import {
  HydraulicValve43Type,
  ObcHydraulicValve43,
} from './hydraulic-valve-4-3.js';
import './hydraulic-valve-4-3.js';
import type {PositionSelectedEvent} from '../shuffle-button/shuffle-button-base.js';

const meta: Meta<typeof ObcHydraulicValve43> = {
  title: 'Automation/Hydraulic Valves/Valve 4-3',
  tags: ['autodocs', 'alpha'],
  component: 'obc-hydraulic-valve-4-3',
  args: {
    type: HydraulicValve43Type.One,
    selectedPosition: 1,
  },
  argTypes: {
    type: {
      control: {type: 'select'},
      options: Object.values(HydraulicValve43Type),
    },
    selectedPosition: {
      control: {type: 'number', min: 0, max: 2, step: 1},
    },
  },
  render: (args) => html`
    <obc-hydraulic-valve-4-3
      type=${args.type}
      .selectedPosition=${args.selectedPosition}
      @position-selected=${(event: PositionSelectedEvent) => {
        (event.target as ObcHydraulicValve43).selectedPosition =
          event.detail.position;
      }}
    ></obc-hydraulic-valve-4-3>
  `,
} satisfies Meta<ObcHydraulicValve43>;

export default meta;
type Story = StoryObj<ObcHydraulicValve43>;

export const Default: Story = {};

export const Type2: Story = {
  args: {type: HydraulicValve43Type.Two},
};

export const Type3: Story = {
  args: {type: HydraulicValve43Type.Three},
};

export const Type4: Story = {
  args: {type: HydraulicValve43Type.Four},
};

export const Type5: Story = {
  args: {type: HydraulicValve43Type.Five},
};

export const PositionLeft: Story = {
  args: {selectedPosition: 0},
};

export const PositionRight: Story = {
  args: {selectedPosition: 2},
};
