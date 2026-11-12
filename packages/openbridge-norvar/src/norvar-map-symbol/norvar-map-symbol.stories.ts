import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcNorvarMapSymbol,
  NorvarMapSymbolType,
  NorvarMapSymbolVariant,
  NorvarStationState,
} from './norvar-map-symbol.js';
import './norvar-map-symbol.js';
import {crossDecorator} from '../storybook-util.js';
import {argTypesAbstractAutomationButton} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcNorvarMapSymbol> = {
  title: 'Components/Norvar Map Symbol',
  tags: ['autodocs', 'experimental'],
  component: 'norvar-map-symbol',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    alert: false,
    progress: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButton,
    symbolType: {
      options: Object.values(NorvarMapSymbolType),
      control: {type: 'select'},
    },
    state: {
      options: Object.values(NorvarStationState),
      control: {type: 'radio'},
    },
    variant: {
      options: Object.values(NorvarMapSymbolVariant),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcNorvarMapSymbol>;

export default meta;
type Story = StoryObj<ObcNorvarMapSymbol>;

export const Flat: Story = {args: {variant: NorvarMapSymbolVariant.flat}};

export const Button: Story = {
  args: {variant: NorvarMapSymbolVariant.regular},
};

export const Running: Story = {args: {state: NorvarStationState.running}};

export const Unmonitored: Story = {
  args: {state: NorvarStationState.unmonitored},
};

export const Alarm: Story = {args: {alert: true}};

export const AllSymbols: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${Object.values(NorvarMapSymbolVariant).map(
        (variant) =>
          html`<div style="display: flex; gap: 16px;">
            ${Object.values(NorvarMapSymbolType).map(
              (symbolType) =>
                html`<norvar-map-symbol
                  positioning="button"
                  .variant=${variant}
                  .symbolType=${symbolType}
                  .showReadoutStack=${false}
                ></norvar-map-symbol>`
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
        {state: NorvarStationState.ready, alert: false},
        {state: NorvarStationState.running, alert: false},
        {state: NorvarStationState.ready, alert: true},
        {state: NorvarStationState.unmonitored, alert: false},
      ].map(
        ({state, alert}) =>
          html`<div style="display: flex; gap: 16px;">
            ${Object.values(NorvarMapSymbolType).map(
              (symbolType) =>
                html`<norvar-map-symbol
                  positioning="button"
                  variant="regular"
                  .state=${state}
                  .alert=${alert}
                  .symbolType=${symbolType}
                  .showReadoutStack=${false}
                ></norvar-map-symbol>`
            )}
          </div>`
      )}
    </div>
  `,
};
