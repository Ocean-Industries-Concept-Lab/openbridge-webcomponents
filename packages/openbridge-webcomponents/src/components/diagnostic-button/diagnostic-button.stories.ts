import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcDiagnosticButton} from './diagnostic-button.js';
import './diagnostic-button.js';

const meta: Meta<ObcDiagnosticButton> = {
  title: 'Application Components/Alerts/Diagnostic Button',
  tags: ['autodocs', '6.1', 'experimental'],
  component: 'obc-diagnostic-button',
  args: {
    nAlerts: 3,
    activated: false,
  },
  argTypes: {
    nAlerts: {control: {type: 'number', min: 0}},
  },
} satisfies Meta<ObcDiagnosticButton>;

export default meta;
type Story = StoryObj<ObcDiagnosticButton>;

export const Default: Story = {};

/** The selected style, for the button whose menu is showing. */
export const Activated: Story = {
  args: {activated: true},
};

export const NoDiagnostics: Story = {
  args: {nAlerts: 0},
};
