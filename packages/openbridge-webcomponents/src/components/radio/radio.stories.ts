import type {Meta, StoryObj} from '@storybook/web-components';
import {ObcRadio} from './radio';
import './radio';
import {html} from 'lit';

const meta: Meta<typeof ObcRadio> = {
  title: 'Input/Radio button',
  tags: ['autodocs', '6.0'],
  component: 'obc-radio',
} satisfies Meta<ObcRadio>;

export default meta;
type Story = StoryObj<ObcRadio>;

export const WithLabel: Story = {
  render: () => html` <obc-radio label="Radio 1"></obc-radio>`,
};

export const WithoutLabel: Story = {
  render: () => html`<obc-radio></obc-radio>`,
};

export const CheckedWithLabel: Story = {
  render: () => html` <obc-radio label="Radio 1" checked></obc-radio>`,
};

export const Multiple: Story = {
  render: () =>
    html` <obc-radio label="Radio 1" name="test" value="1"></obc-radio>
      <obc-radio label="Radio 2" name="test" value="2"></obc-radio>
      <obc-radio label="Radio 3" name="test" value="3"></obc-radio>`,
};
