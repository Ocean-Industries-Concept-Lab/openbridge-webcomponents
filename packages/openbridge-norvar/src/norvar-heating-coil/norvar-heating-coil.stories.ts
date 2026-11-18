import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcNorvarHeatingCoil,
  NorvarStationState,
  NorvarSymbolVariant,
} from './norvar-heating-coil.js';
import './norvar-heating-coil.js';
import {crossDecorator} from '../storybook-util.js';
import {argTypesAbstractAutomationButton} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcNorvarHeatingCoil> = {
  title: 'Components/Norvar Heating Coil',
  tags: ['autodocs', 'experimental'],
  component: 'norvar-heating-coil',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    alert: false,
    progress: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButton,
    state: {
      options: Object.values(NorvarStationState),
      control: {type: 'radio'},
    },
    variant: {
      options: Object.values(NorvarSymbolVariant),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcNorvarHeatingCoil>;

export default meta;
type Story = StoryObj<ObcNorvarHeatingCoil>;

export const Flat: Story = {args: {variant: NorvarSymbolVariant.flat}};

export const Button: Story = {args: {variant: NorvarSymbolVariant.regular}};

export const Running: Story = {args: {state: NorvarStationState.running}};

export const Unmonitored: Story = {
  args: {state: NorvarStationState.unmonitored},
};

export const Alarm: Story = {args: {alert: true}};

export const AllStates: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${Object.values(NorvarSymbolVariant).map(
        (variant) =>
          html`<div style="display: flex; gap: 16px;">
            ${[
              {state: NorvarStationState.ready, alert: false},
              {state: NorvarStationState.running, alert: false},
              {state: NorvarStationState.ready, alert: true},
              {state: NorvarStationState.unmonitored, alert: false},
            ].map(
              ({state, alert}) =>
                html`<norvar-heating-coil
                  positioning="button"
                  .variant=${variant}
                  .state=${state}
                  .alert=${alert}
                  .showReadoutStack=${false}
                ></norvar-heating-coil>`
            )}
          </div>`
      )}
    </div>
  `,
};
