import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';

const meta: Meta = {
  title: 'Automation/Sequence Step/Large/Flags',
  component: 'obc-sequence-step',
  parameters: {layout: 'centered'},
};
export default meta;

type Story = StoryObj;

export const HasIcon: Story = {
  name: 'Has Icon',
  render: () => html`
    <obc-sequence-step
      type="large"
      styleType="regular"
      .value=${'regular'}
      orientation="horizontal"
      .hasInputConnector=${true}
      .hasOutputConnector=${true}
      .hasIcon=${true}
    >
      Label
    </obc-sequence-step>
  `,
};

export const NoInputConnector: Story = {
  name: 'No Input Connector',
  render: () => html`
    <obc-sequence-step
      type="large"
      styleType="regular"
      .value=${'regular'}
      orientation="horizontal"
      .hasInputConnector=${false}
      .hasOutputConnector=${true}
      .hasIcon=${true}
    >
      Label
    </obc-sequence-step>
  `,
};

export const NoOutputConnector: Story = {
  name: 'No Output Connector',
  render: () => html`
    <obc-sequence-step
      type="large"
      styleType="regular"
      .value=${'regular'}
      orientation="horizontal"
      .hasInputConnector=${true}
      .hasOutputConnector=${false}
      .hasIcon=${true}
    >
      Label
    </obc-sequence-step>
  `,
};
