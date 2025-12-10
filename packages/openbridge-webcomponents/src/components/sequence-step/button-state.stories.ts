import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';

const meta: Meta = {
  title: 'Automation/Sequence Step/Large/State',
  component: 'obc-sequence-step',
  parameters: {layout: 'centered'},
};
export default meta;

type Story = StoryObj;

const cardStyle = `
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  text-align: center;
`;

const renderState = (value: string) => html`
  <div
    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px;"
  >
    <!-- Horizontal -->
    <div style=${cardStyle}>
      <strong>Horizontal</strong>
      <obc-sequence-step
        type="large"
        styleType="regular"
        .value=${value}
        orientation="horizontal"
        .hasInputConnector=${true}
        .hasOutputConnector=${true}
        .hasIcon=${true}
      >
      Label
      </obc-sequence-step>
    </div>

    <!-- Vertical -->
    <div style=${cardStyle}>
      <strong>Vertical</strong>
      <obc-sequence-step
        type="large"
        styleType="regular"
        .value=${value}
        orientation="vertical"
        .hasInputConnector=${true}
        .hasOutputConnector=${true}
        .hasIcon=${true}
      >
      Label
      </obc-sequence-step>
    </div>
  </div>
`;

export const NotStarted: Story = {
  name: 'Not Started',
  render: () => renderState('not-started'),
};

export const Regular: Story = {
  name: 'Regular',
  render: () => renderState('regular'),
};

export const Loading: Story = {
  name: 'Loading',
  render: () => renderState('loading'),
};

export const Next: Story = {
  name: 'Next',
  render: () => renderState('next'),
};

export const Active: Story = {
  name: 'Active',
  render: () => renderState('active'),
};

export const Completed: Story = {
  name: 'Completed',
  render: () => renderState('completed'),
};
