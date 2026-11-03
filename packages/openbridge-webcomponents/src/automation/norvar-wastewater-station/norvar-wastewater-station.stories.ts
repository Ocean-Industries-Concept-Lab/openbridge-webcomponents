import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcNorvarWastewaterStation,
  NorvarWastewaterStationType,
  NorvarWastewaterStationVariant,
  NorvarStationState,
  NorvarWastewaterMedium,
} from './norvar-wastewater-station.js';
import './norvar-wastewater-station.js';
import {crossDecorator} from '../../storybook-util.js';
import {argTypesAbstractAutomationButton} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcNorvarWastewaterStation> = {
  title: 'Automation/Automation Devices/Norvar Wastewater Station',
  tags: ['autodocs', 'experimental'],
  component: 'norvar-wastewater-station',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    alert: false,
    progress: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButton,
    stationType: {
      options: Object.values(NorvarWastewaterStationType),
      control: {type: 'select'},
    },
    state: {
      options: Object.values(NorvarStationState),
      control: {type: 'radio'},
    },
    variant: {
      options: Object.values(NorvarWastewaterStationVariant),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcNorvarWastewaterStation>;

export default meta;
type Story = StoryObj<ObcNorvarWastewaterStation>;

export const Flat: Story = {
  args: {variant: NorvarWastewaterStationVariant.flat},
};

export const Button: Story = {
  args: {variant: NorvarWastewaterStationVariant.regular},
};

export const Running: Story = {args: {state: NorvarStationState.running}};

export const Unmonitored: Story = {
  args: {state: NorvarStationState.unmonitored},
};

export const Alarm: Story = {args: {alert: true}};

export const Static: Story = {args: {static: true}};

export const StaticSurfaceWater: Story = {
  args: {static: true, medium: NorvarWastewaterMedium.surfaceWater},
};

export const AllStations: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${Object.values(NorvarWastewaterStationVariant).map(
        (variant) =>
          html`<div style="display: flex; gap: 16px;">
            ${Object.values(NorvarWastewaterStationType).map(
              (stationType) =>
                html`<norvar-wastewater-station
                  positioning="button"
                  .variant=${variant}
                  .stationType=${stationType}
                  .showReadoutStack=${false}
                ></norvar-wastewater-station>`
            )}
          </div>`
      )}
    </div>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${[
        {state: NorvarStationState.ready, alert: false, isStatic: false},
        {state: NorvarStationState.running, alert: false, isStatic: false},
        {state: NorvarStationState.ready, alert: true, isStatic: false},
        {state: NorvarStationState.unmonitored, alert: false, isStatic: false},
        {state: NorvarStationState.ready, alert: false, isStatic: true},
      ].map(
        ({state, alert, isStatic}) =>
          html`<div style="display: flex; gap: 16px;">
            ${Object.values(NorvarWastewaterStationType).map(
              (stationType) =>
                html`<norvar-wastewater-station
                  positioning="button"
                  .variant=${NorvarWastewaterStationVariant.regular}
                  .state=${state}
                  .alert=${alert}
                  .static=${isStatic}
                  .stationType=${stationType}
                  .showReadoutStack=${false}
                ></norvar-wastewater-station>`
            )}
          </div>`
      )}
    </div>
  `,
};
