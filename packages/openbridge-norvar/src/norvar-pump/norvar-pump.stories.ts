import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcNorvarPump,
  MotorizedVariant,
  NorvarAvailability,
} from './norvar-pump.js';
import './norvar-pump.js';
import {crossDecorator} from '../storybook-util.js';
import {argTypesAbstractAutomationButton} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcNorvarPump> = {
  title: 'Components/Norvar Pump',
  tags: ['autodocs', 'experimental'],
  component: 'norvar-pump',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    turnedOn: false,
    alert: false,
    progress: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButton,
    availability: {
      options: Object.values(NorvarAvailability),
      control: {type: 'radio'},
    },
    variant: {
      options: [MotorizedVariant.flat, MotorizedVariant.regular],
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcNorvarPump>;

export default meta;
type Story = StoryObj<ObcNorvarPump>;

export const Running: Story = {args: {turnedOn: true}};

export const Stopped: Story = {args: {turnedOn: false}};

export const Button: Story = {
  args: {turnedOn: true, variant: MotorizedVariant.regular},
};

export const Disabled: Story = {
  args: {availability: NorvarAvailability.disabled},
};

export const SafetyOff: Story = {
  args: {availability: NorvarAvailability.safetyOff},
};

export const Alarm: Story = {args: {turnedOn: true, alert: true}};

/** The rows of the design file: running, stopped, disabled, safety switch off, alarm while running and alarm while stopped. */
export const AllStates: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${[MotorizedVariant.flat, MotorizedVariant.regular].map(
        (variant) =>
          html`<div style="display: flex; gap: 16px;">
            ${[
              {turnedOn: true},
              {turnedOn: false},
              {availability: NorvarAvailability.disabled},
              {availability: NorvarAvailability.safetyOff},
              {turnedOn: true, alert: true},
              {turnedOn: false, alert: true},
            ].map(
              (state) =>
                html`<norvar-pump
                  positioning="button"
                  .variant=${variant}
                  .turnedOn=${state.turnedOn ?? false}
                  .alert=${state.alert ?? false}
                  .availability=${
                    state.availability ?? NorvarAvailability.available
                  }
                  .showReadoutStack=${false}
                ></norvar-pump>`
            )}
          </div>`
      )}
    </div>
  `,
};
