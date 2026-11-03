import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcNorvarValve, NorvarValveActuator} from './norvar-valve.js';
import './norvar-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import {Direction} from '../../types.js';

const meta: Meta<typeof ObcNorvarValve> = {
  title: 'Automation/Automation Devices/Norvar Valve',
  tags: ['autodocs', 'experimental'],
  component: 'norvar-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    alert: false,
    progress: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    flowDirection: {
      options: Object.values(Direction),
      control: {type: 'radio'},
    },
    actuator: {
      options: Object.values(NorvarValveActuator),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcNorvarValve>;

export default meta;
type Story = StoryObj<ObcNorvarValve>;

export const Open: Story = {args: {open: true}};

export const Closed: Story = {args: {open: false}};

export const MidPosition: Story = {args: {progress: true}};

export const Alarm: Story = {args: {alert: true}};

export const Static: Story = {args: {static: true}};

export const Regular: Story = {args: {open: true, variant: 'regular'}};

const states = [
  {label: 'Closed', open: false, alert: false, progress: false},
  {label: 'Open', open: true, alert: false, progress: false},
  {label: 'Alarm', open: false, alert: true, progress: false},
  {label: 'Middle', open: false, alert: false, progress: true},
];

const actuators = Object.values(NorvarValveActuator).filter(
  (actuator) => actuator !== NorvarValveActuator.none
);

export const AllActuators: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${states.map(
        ({open, alert, progress}) =>
          html`<div style="display: flex; gap: 16px;">
            ${actuators.map(
              (actuator) =>
                html`<norvar-valve
                  positioning="button"
                  .open=${open}
                  .alert=${alert}
                  .progress=${progress}
                  tag=${actuator}
                  .actuator=${actuator}
                ></norvar-valve>`
            )}
          </div>`
      )}
    </div>
  `,
};

export const FlowDirections: Story = {
  render: () => html`
    <div style="display: flex; gap: 48px;">
      ${Object.values(Direction).map(
        (flowDirection) =>
          html`<norvar-valve
            positioning="button"
            progress
            .flowDirection=${flowDirection}
            .actuator=${NorvarValveActuator.pneumatic}
          ></norvar-valve>`
      )}
    </div>
  `,
};
