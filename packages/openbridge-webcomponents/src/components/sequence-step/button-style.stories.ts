import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './sequence-step';

const meta: Meta = {
  title: 'Automation/Sequence Step/Large/Style',
  component: 'obc-sequence-step',
  parameters: {layout: 'centered'},
};
export default meta;

type Story = StoryObj;

function renderStyle(styleType: string) {
  return html`
    <obc-sequence-step
      type="large"
      .styleType=${styleType}
      .value=${'regular'}
      orientation="horizontal"
      .hasInputConnector=${true}
      .hasOutputConnector=${true}
      .hasIcon=${styleType === 'regular'}
    >
      ${styleType === 'point' ? '1' : 'Label'}
    </obc-sequence-step>
  `;
}

export const Regular: Story = {render: () => renderStyle('regular')};
export const Point: Story = {render: () => renderStyle('point')};
export const Connector: Story = {render: () => renderStyle('connector')};
