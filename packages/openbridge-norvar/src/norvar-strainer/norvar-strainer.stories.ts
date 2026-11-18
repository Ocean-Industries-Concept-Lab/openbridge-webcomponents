import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcNorvarStrainer,
  NorvarStationState,
  NorvarSymbolVariant,
} from './norvar-strainer.js';
import './norvar-strainer.js';
import {crossDecorator} from '../storybook-util.js';
import {argTypesAbstractAutomationButton} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcNorvarStrainer> = {
  title: 'Components/Norvar Strainer',
  tags: ['autodocs', 'experimental'],
  component: 'norvar-strainer',
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
} as Meta<typeof ObcNorvarStrainer>;

export default meta;
type Story = StoryObj<ObcNorvarStrainer>;

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
                html`<norvar-strainer
                  positioning="button"
                  .variant=${variant}
                  .state=${state}
                  .alert=${alert}
                  .showReadoutStack=${false}
                ></norvar-strainer>`
            )}
          </div>`
      )}
    </div>
  `,
};
