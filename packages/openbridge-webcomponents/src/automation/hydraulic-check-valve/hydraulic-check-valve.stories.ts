import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcHydraulicCheckValve} from './hydraulic-check-valve.js';
import './hydraulic-check-valve.js';

const meta: Meta<typeof ObcHydraulicCheckValve> = {
  title: 'Automation/Hydraulic Valves/Check Valve',
  tags: ['autodocs', 'alpha'],
  component: 'obc-hydraulic-check-valve',
} satisfies Meta<ObcHydraulicCheckValve>;

export default meta;
type Story = StoryObj<ObcHydraulicCheckValve>;

export const Default: Story = {};
