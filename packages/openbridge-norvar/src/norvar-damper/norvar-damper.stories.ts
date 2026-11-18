import {html} from 'lit';
import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcNorvarDamper,
  NorvarStationState,
  NorvarSymbolVariant,
} from './norvar-damper.js';
import './norvar-damper.js';
import {crossDecorator} from '../storybook-util.js';
import {argTypesAbstractAutomationButton} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/abstract-automation-button-storybook-helpers.js';

const meta: Meta<typeof ObcNorvarDamper> = {
  title: 'Components/Norvar Damper',
  tags: ['autodocs', 'experimental'],
  component: 'norvar-damper',
  decorators: [crossDecorator],
  args: {
    tag: '#0012',
    open: true,
    regulating: false,
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
} as Meta<typeof ObcNorvarDamper>;

export default meta;
type Story = StoryObj<ObcNorvarDamper>;

export const Open: Story = {args: {open: true}};

export const Closed: Story = {args: {open: false}};

export const Regulating: Story = {args: {regulating: true}};

export const Button: Story = {args: {variant: NorvarSymbolVariant.regular}};

export const Running: Story = {args: {state: NorvarStationState.running}};

export const Alarm: Story = {args: {alert: true}};

/** The rows of the design file: open, closed and regulating. */
export const AllPositions: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${Object.values(NorvarSymbolVariant).map(
        (variant) =>
          html`<div style="display: flex; gap: 16px;">
            ${[
              {open: true, regulating: false},
              {open: false, regulating: false},
              {open: false, regulating: true},
            ].map(
              ({open, regulating}) =>
                html`<norvar-damper
                  positioning="button"
                  .variant=${variant}
                  .open=${open}
                  .regulating=${regulating}
                  .showReadoutStack=${false}
                ></norvar-damper>`
            )}
          </div>`
      )}
    </div>
  `,
};
