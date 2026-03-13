import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './readout.js';

const meta = {
  title: 'Instruments/Readout',
  tags: ['autodocs', '6.0'],
  component: 'obc-readout',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const TestGrid: Story = {
  name: 'Test-Grid',
  render: () => html`
    <style>
      body::before {
        content: '';
        position: fixed;
        inset: 0;
        background-image: repeating-linear-gradient(
          to bottom,
          rgba(255, 0, 0, 0.2) 0,
          rgba(255, 0, 0, 0.2) 1px,
          transparent 1px,
          transparent 4px
        );
        pointer-events: none;
      }

      .test-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
    </style>
    <div class="test-grid">
      <obc-readout value="123" label="Label" unit="Unit"></obc-readout>
      <obc-readout value="123" label="Label" unit="Unit"></obc-readout>
      <obc-readout value="123" label="Label" unit="Unit"></obc-readout>
      <obc-readout value="123" label="Label" unit="Unit"></obc-readout>
      <obc-readout value="123" label="Label" unit="Unit"></obc-readout>
      <obc-readout value="123" label="Label" unit="Unit"></obc-readout>
    </div>
  `,
};
