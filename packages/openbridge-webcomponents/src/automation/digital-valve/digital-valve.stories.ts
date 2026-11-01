import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  DigitalValveVariant,
  ObcDigitalValve,
  ObcValveHandle,
} from './digital-valve.js';
import {AutomationButtonReadoutStackSize} from '../../components/automation-button-readout-stack/automation-button-readout-stack.js';
import './digital-valve.js';
import {crossDecorator} from '../../storybook-util.js';
import {argTypesAbstractAutomationButtonPassiveRound} from '../automation-button/abstract-automation-button-storybook-helpers.js';
import {Direction} from '../../types.js';
import {AutomationButtonHandleSize} from '../automation-button/automation-button.js';

const meta: Meta<typeof ObcDigitalValve> = {
  title: 'Automation/Automation Devices/Digital Valve',
  tags: ['autodocs'],
  component: 'obc-digital-valve',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    readoutSize: AutomationButtonReadoutStackSize.regular,
    alert: false,
    progress: false,
    vertical: false,
    showReadoutStack: true,
  },
  argTypes: {
    ...argTypesAbstractAutomationButtonPassiveRound,
    flowDirection: {
      options: Object.values(Direction),
      control: {type: 'radio'},
    },
    handle: {
      options: Object.values(ObcValveHandle),
      control: {type: 'radio'},
    },
  },
} as Meta<typeof ObcDigitalValve>;

export default meta;
type Story = StoryObj<ObcDigitalValve>;

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Closed: Story = {
  args: {
    open: false,
  },
};

export const Manual: Story = {
  args: {
    handle: ObcValveHandle.manual,
  },
};

export const ManualFlat: Story = {
  args: {
    handle: ObcValveHandle.manual,
    variant: DigitalValveVariant.flat,
  },
};

export const ManualDown: Story = {
  args: {
    flowDirection: Direction.Down,
    handle: ObcValveHandle.manual,
    open: true,
  },
};

export const ManualLeft: Story = {
  args: {
    flowDirection: Direction.Left,
    handle: ObcValveHandle.manual,
    open: true,
  },
};

export const ManualSymbol: Story = {
  args: {
    tag: '#0012',
    readoutSize: 'regular',
    alert: true,
    progress: false,
    vertical: false,
    showReadoutStack: true,
    handle: 'manual',
    positioning: 'symbol',
  },
};

export const ManualSymbolUp: Story = {
  args: {
    tag: '#0012',
    readoutSize: 'regular',
    alert: true,
    progress: false,
    vertical: false,
    showReadoutStack: true,
    handle: 'manual',
    positioning: 'symbol',
    flowDirection: 'up',
  },
};

export const AllHandles: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 48px; width: 480px;">
      ${Object.values(ObcValveHandle)
        .filter((handle) => handle !== ObcValveHandle.none)
        .map(
          (handle) =>
            html`<obc-digital-valve
              open
              positioning="button"
              tag=${handle}
              .handle=${handle}
            ></obc-digital-valve>`
        )}
    </div>
  `,
};

export const LetterHandlesOnEverySide: Story = {
  render: () => html`
    <div style="display: flex; gap: 48px;">
      ${Object.values(Direction).map(
        (flowDirection) =>
          html`<obc-digital-valve
            open
            positioning="button"
            .flowDirection=${flowDirection}
            .handle=${ObcValveHandle.motor}
          ></obc-digital-valve>`
      )}
    </div>
  `,
};

export const StaticOpen: Story = {
  args: {
    open: true,
    static: true,
  },
};

export const StaticClosed: Story = {
  args: {
    open: false,
    static: true,
  },
};

const handleStateRows = [
  {label: 'On', open: true, isStatic: false},
  {label: 'Off', open: false, isStatic: false},
  {label: 'Static', open: true, isStatic: true},
];

const allHandleValues = Object.values(ObcValveHandle).filter(
  (handle) => handle !== ObcValveHandle.none
);

export const HandleColors: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${handleStateRows.map(
        ({open, isStatic}) =>
          html`<div style="display: flex; gap: 32px;">
            ${allHandleValues.map(
              (handle) =>
                html`<obc-digital-valve
                  positioning="button"
                  .open=${open}
                  .static=${isStatic}
                  .showReadoutStack=${false}
                  .handle=${handle}
                ></obc-digital-valve>`
            )}
          </div>`
      )}
    </div>
  `,
};

export const SmallHandles: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${handleStateRows.map(
        ({open, isStatic}) =>
          html`<div style="display: flex; gap: 8px;">
            ${allHandleValues.map(
              (handle) =>
                html`<obc-digital-valve
                  positioning="button"
                  .variant=${DigitalValveVariant.flat}
                  .open=${open}
                  .static=${isStatic}
                  .showReadoutStack=${false}
                  .handle=${handle}
                  .handleSize=${AutomationButtonHandleSize.small}
                ></obc-digital-valve>`
            )}
          </div>`
      )}
    </div>
  `,
};
