import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcNorvarWaterStation,
  NorvarWaterStationType,
  NorvarWaterStationVariant,
  NorvarStationState,
} from './norvar-water-station.js';
import './norvar-water-station.js';
import {crossDecorator} from '../../storybook-util.js';
import {argTypesAbstractAutomationButton} from '../automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcNorvarWaterStation> = {
  title: 'Automation/Automation Devices/Norvar Water Station',
  tags: ['autodocs', 'experimental'],
  component: 'norvar-water-station',
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
      options: Object.values(NorvarWaterStationType),
      control: {type: 'select'},
    },
    state: {
      options: Object.values(NorvarStationState),
      control: {type: 'radio'},
    },
    variant: {
      options: Object.values(NorvarWaterStationVariant),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcNorvarWaterStation>;

export default meta;
type Story = StoryObj<ObcNorvarWaterStation>;

export const Flat: Story = {args: {variant: NorvarWaterStationVariant.flat}};

export const Button: Story = {
  args: {variant: NorvarWaterStationVariant.square},
};

export const Running: Story = {args: {state: NorvarStationState.running}};

export const Unmonitored: Story = {
  args: {state: NorvarStationState.unmonitored},
};

export const Alarm: Story = {args: {alert: true}};

export const Static: Story = {args: {static: true}};

export const AllStations: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${Object.values(NorvarWaterStationVariant).map(
        (variant) =>
          html`<div style="display: flex; gap: 16px;">
            ${Object.values(NorvarWaterStationType).map(
              (stationType) =>
                html`<norvar-water-station
                  positioning="button"
                  .variant=${variant}
                  .stationType=${stationType}
                  .showReadoutStack=${false}
                ></norvar-water-station>`
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
            ${Object.values(NorvarWaterStationType).map(
              (stationType) =>
                html`<norvar-water-station
                  positioning="button"
                  .variant=${NorvarWaterStationVariant.square}
                  .state=${state}
                  .alert=${alert}
                  .static=${isStatic}
                  .stationType=${stationType}
                  .showReadoutStack=${false}
                ></norvar-water-station>`
            )}
          </div>`
      )}
    </div>
  `,
};
