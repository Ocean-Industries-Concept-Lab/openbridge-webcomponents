import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {ObcVendorButton} from './vendor-button.js';
import './vendor-button.js';
import {html} from 'lit';

const meta: Meta<typeof ObcVendorButton> = {
  title: 'Button/Vendor button',
  tags: ['autodocs','skip-snapshot'],
  component: 'obc-vendor-button',
  args: {
    imageSrc: 'https://openbridge-demo.web.app/companylogo-day.png',
  },
  decorators: [(story) => html`<div style="width:300px">${story()}</div>`],
} satisfies Meta<ObcVendorButton>;

export default meta;
type Story = StoryObj<ObcVendorButton>;

export const Primary: Story = {};
