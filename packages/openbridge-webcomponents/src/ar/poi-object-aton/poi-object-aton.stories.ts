import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './poi-object-aton.js';
import {
  ObcPoiObjectAtonType,
  ObcPoiObjectAtonStyle,
  ObcPoiObjectAtonState,
} from './poi-object-aton.js';
import '../../icons/icon-beacon-general-east.js';

const meta: Meta = {
  title: 'AR/POI Object AtoN',
  component: 'obc-poi-object-aton',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcPoiObjectAtonType),
      description: 'Size/type variant',
    },
    objectStyle: {
      control: 'select',
      options: Object.values(ObcPoiObjectAtonStyle),
      description: 'Color style variant',
    },
    state: {
      control: 'select',
      options: Object.values(ObcPoiObjectAtonState),
      description: 'State variant',
    },
    interactive: {
      control: 'boolean',
      description: 'Enables button behavior with hover/active states',
    },
  },
  args: {
    type: ObcPoiObjectAtonType.Regular,
    objectStyle: ObcPoiObjectAtonStyle.Regular,
    state: ObcPoiObjectAtonState.Unchecked,
    interactive: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <obc-poi-object-aton
      type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
      .interactive=${args.interactive}
    >
      <obi-beacon-general-east></obi-beacon-general-east>
    </obc-poi-object-aton>
  `,
};

// === TYPE STORIES ===

export const Indicator: Story = {
  args: {type: ObcPoiObjectAtonType.Indicator},
  render: (args) => html`
    <obc-poi-object-aton
      type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-beacon-general-east></obi-beacon-general-east>
    </obc-poi-object-aton>
  `,
};

export const Regular: Story = {
  args: {type: ObcPoiObjectAtonType.Regular},
  render: (args) => html`
    <obc-poi-object-aton
      type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-beacon-general-east></obi-beacon-general-east>
    </obc-poi-object-aton>
  `,
};

export const Large: Story = {
  args: {type: ObcPoiObjectAtonType.Large},
  render: (args) => html`
    <obc-poi-object-aton
      type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-beacon-general-east></obi-beacon-general-east>
    </obc-poi-object-aton>
  `,
};

export const AtoN: Story = {
  args: {type: ObcPoiObjectAtonType.AtoN},
  render: (args) => html`
    <obc-poi-object-aton
      type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-beacon-general-east></obi-beacon-general-east>
    </obc-poi-object-aton>
  `,
};

export const NUp: Story = {
  args: {type: ObcPoiObjectAtonType.NUp},
  render: (args) => html`
    <obc-poi-object-aton
      type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-beacon-general-east></obi-beacon-general-east>
    </obc-poi-object-aton>
  `,
};

export const NUpLarge: Story = {
  args: {type: ObcPoiObjectAtonType.NUpLarge},
  render: (args) => html`
    <obc-poi-object-aton
      type=${args.type}
      .objectStyle=${args.objectStyle}
      .state=${args.state}
    >
      <obi-beacon-general-east></obi-beacon-general-east>
    </obc-poi-object-aton>
  `,
};

// === OVERVIEW STORIES ===

const sectionStyle = 'margin-bottom: 24px;';
const headerStyle =
  'margin: 0 0 12px 0; font-family: sans-serif; font-size: 14px; font-weight: 600;';
const rowStyle = 'display: flex; gap: 16px; align-items: flex-end;';
const itemStyle = 'text-align: center;';
const labelStyle = 'font-size: 10px; margin-top: 4px; font-family: sans-serif;';

const types = Object.values(ObcPoiObjectAtonType);
const styles = Object.values(ObcPoiObjectAtonStyle);
const states = Object.values(ObcPoiObjectAtonState);

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
                  <obc-poi-object-aton type=${type} .objectStyle=${style}>
                    <obi-beacon-general-east></obi-beacon-general-east>
                  </obc-poi-object-aton>
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

export const AllStyles: Story = {
  render: () => html`
    ${types.map(
      (type) => html`
        <div style=${sectionStyle}>
          <h3 style=${headerStyle}>${type} - All Styles</h3>
          <div style=${rowStyle}>
            ${styles.map(
              (style) => html`
                <div style=${itemStyle}>
                  <obc-poi-object-aton type=${type} .objectStyle=${style}>
                    <obi-beacon-general-east></obi-beacon-general-east>
                  </obc-poi-object-aton>
                  <div style=${labelStyle}>${style}</div>
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
              <obc-poi-object-aton .state=${state}>
                <obi-beacon-general-east></obi-beacon-general-east>
              </obc-poi-object-aton>
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
              <obc-poi-object-aton type="large" .state=${state}>
                <obi-beacon-general-east></obi-beacon-general-east>
              </obc-poi-object-aton>
              <div style=${labelStyle}>${state}</div>
            </div>
          `
        )}
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>AtoN - All States</h3>
      <div style=${rowStyle}>
        ${states.map(
          (state) => html`
            <div style=${itemStyle}>
              <obc-poi-object-aton type="aton" .state=${state}>
                <obi-beacon-general-east></obi-beacon-general-east>
              </obc-poi-object-aton>
              <div style=${labelStyle}>${state}</div>
            </div>
          `
        )}
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>N-up Large - All States</h3>
      <div style=${rowStyle}>
        ${states.map(
          (state) => html`
            <div style=${itemStyle}>
              <obc-poi-object-aton type="n-up-large" .state=${state}>
                <obi-beacon-general-east></obi-beacon-general-east>
              </obc-poi-object-aton>
              <div style=${labelStyle}>${state}</div>
            </div>
          `
        )}
      </div>
    </div>
  `,
};

export const AtonAllStates: Story = {
  render: () => html`
    ${styles.map(
      (style) => html`
        <div style=${sectionStyle}>
          <h3 style=${headerStyle}>AtoN - ${style} - All States</h3>
          <div style=${rowStyle}>
            ${states.map(
              (state) => html`
                <div style=${itemStyle}>
                  <obc-poi-object-aton
                    type="aton"
                    .objectStyle=${style}
                    .state=${state}
                  >
                    <obi-beacon-general-east></obi-beacon-general-east>
                  </obc-poi-object-aton>
                  <div style=${labelStyle}>${state}</div>
                </div>
              `
            )}
          </div>
        </div>
      `
    )}
  `,
};

export const IndicatorAllStates: Story = {
  render: () => html`
    ${styles.map(
      (style) => html`
        <div style=${sectionStyle}>
          <h3 style=${headerStyle}>Indicator - ${style} - All States</h3>
          <div style=${rowStyle}>
            ${states.map(
              (state) => html`
                <div style=${itemStyle}>
                  <obc-poi-object-aton
                    type="indicator"
                    .objectStyle=${style}
                    .state=${state}
                  >
                    <obi-beacon-general-east></obi-beacon-general-east>
                  </obc-poi-object-aton>
                  <div style=${labelStyle}>${state}</div>
                </div>
              `
            )}
          </div>
        </div>
      `
    )}
  `,
};
