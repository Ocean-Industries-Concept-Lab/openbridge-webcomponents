import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './poi-object-data.js';
import {
  ObcPoiObjectDataType,
  ObcPoiObjectDataStyle,
  ObcPoiObjectDataState,
} from './poi-object-data.js';
import '../../icons/icon-vessel-generic-default-filled.js';

const meta: Meta = {
  title: 'AR/POI Button/POI Object Data',
  component: 'obc-poi-object-data',
  tags: ['skip-test', 'autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcPoiObjectDataType),
      description: 'Size/type variant',
    },
    objectStyle: {
      control: 'select',
      options: Object.values(ObcPoiObjectDataStyle),
      description: 'Color style variant',
    },
    state: {
      control: 'select',
      options: Object.values(ObcPoiObjectDataState),
      description: 'State variant',
    },
    interactive: {
      control: 'boolean',
      description: 'Enables button behavior with hover/active states',
    },
  },
  args: {
    type: ObcPoiObjectDataType.Regular,
    objectStyle: ObcPoiObjectDataStyle.Regular,
    state: ObcPoiObjectDataState.Unchecked,
    interactive: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <obc-poi-object-data
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
      .interactive=${args.interactive}
    >
      <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
    </obc-poi-object-data>
  `,
};

// === TYPE STORIES ===

export const Indicator: Story = {
  args: {type: ObcPoiObjectDataType.Indicator},
  render: (args) => html`
    <obc-poi-object-data
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
    </obc-poi-object-data>
  `,
};

export const Regular: Story = {
  args: {type: ObcPoiObjectDataType.Regular},
  render: (args) => html`
    <obc-poi-object-data
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
    </obc-poi-object-data>
  `,
};

export const Large: Story = {
  args: {type: ObcPoiObjectDataType.Large},
  render: (args) => html`
    <obc-poi-object-data
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
    </obc-poi-object-data>
  `,
};

export const NUp: Story = {
  args: {type: ObcPoiObjectDataType.NUp},
  render: (args) => html`
    <obc-poi-object-data
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
    </obc-poi-object-data>
  `,
};

export const NUpLarge: Story = {
  args: {type: ObcPoiObjectDataType.NUpLarge},
  render: (args) => html`
    <obc-poi-object-data
      .type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
    </obc-poi-object-data>
  `,
};

// === OVERVIEW STORIES ===

const sectionStyle = 'margin-bottom: 24px;';
const headerStyle =
  'margin: 0 0 12px 0; font-family: sans-serif; font-size: 14px; font-weight: 600;';
const rowStyle = 'display: flex; gap: 16px; align-items: flex-end;';
const itemStyle = 'text-align: center;';
const labelStyle = 'font-size: 10px; margin-top: 4px; font-family: sans-serif;';

const types = Object.values(ObcPoiObjectDataType);
const styles = Object.values(ObcPoiObjectDataStyle);
const states = Object.values(ObcPoiObjectDataState);

export const AllTypes: Story = {
  render: () => html`
    ${styles.map(
      (style) => html`
        <div style=${sectionStyle}>
          <h3 style=${headerStyle}>All Types - ${style} Style</h3>
          <div style=${rowStyle}>
            ${types.map(
              (type) => html`
                <div style=${itemStyle}>
                  <obc-poi-object-data .type=${type} .objectStyle=${style}>
                    <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
                  </obc-poi-object-data>
                  <div style=${labelStyle}>${type}</div>
                </div>
              `
            )}
          </div>
        </div>
      `
    )}
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Regular - All States</h3>
      <div style=${rowStyle}>
        ${states.map(
          (state) => html`
            <div style=${itemStyle}>
              <obc-poi-object-data .state=${state}>
                <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
              </obc-poi-object-data>
              <div style=${labelStyle}>${state}</div>
            </div>
          `
        )}
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Large - All States</h3>
      <div style=${rowStyle}>
        ${states.map(
          (state) => html`
            <div style=${itemStyle}>
              <obc-poi-object-data type="large" .state=${state}>
                <obi-vessel-generic-default-filled></obi-vessel-generic-default-filled>
              </obc-poi-object-data>
              <div style=${labelStyle}>${state}</div>
            </div>
          `
        )}
      </div>
    </div>
  `,
};
