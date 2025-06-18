import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcRadio} from './radio.js';
import './radio.js';
import {html} from 'lit';

const meta: Meta<typeof ObcRadio> = {
  title: 'Input/Radio button',
  tags: ['autodocs', '6.0'],
  component: 'obc-radio',
} satisfies Meta<ObcRadio>;

export default meta;
type Story = StoryObj<ObcRadio>;

export const WithLabel: Story = {
  render: () => html` <obc-radio label="Radio 1" inputId="radioa"></obc-radio>`,
};

export const WithoutLabel: Story = {
  render: () => html`<obc-radio></obc-radio>`,
};

export const CheckedWithLabel: Story = {
  render: () =>
    html` <obc-radio label="Radio 1" checked inputId="radiob"></obc-radio>`,
};

export const Multiple: Story = {
  render: () =>
    html` <obc-radio label="Radio 1" inputId="radio1" name="dummy"></obc-radio>
      <obc-radio label="Radio 2" inputId="radio2" name="dummy"></obc-radio>
      <obc-radio label="Radio 3" inputId="radio3" name="dummy"></obc-radio>`,
};
