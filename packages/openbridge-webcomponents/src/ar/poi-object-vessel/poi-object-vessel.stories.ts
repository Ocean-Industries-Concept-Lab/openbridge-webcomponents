import type {Meta, StoryObj} from '@storybook/web-components';
import {html} from 'lit';
import './poi-object-vessel';
import {
  ObcPoiObjectVesselType,
  ObcPoiObjectVesselStyle,
  ObcPoiObjectVesselState,
} from './poi-object-vessel';
import '../../icons/icon-vessel-type-psv-outlined';
import '../../icons/icon-vessel-type-psv-filled';

const meta: Meta = {
  title: 'AR/POI Object Vessel',
  component: 'obc-poi-object-vessel',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ObcPoiObjectVesselType),
      description: 'Size/type variant',
    },
    vesselStyle: {
      control: 'select',
      options: Object.values(ObcPoiObjectVesselStyle),
      description: 'Visual style variant',
    },
    state: {
      control: 'select',
      options: Object.values(ObcPoiObjectVesselState),
      description: 'State variant',
    },
  },
  args: {
    type: ObcPoiObjectVesselType.Regular,
    vesselStyle: ObcPoiObjectVesselStyle.Regular,
    state: ObcPoiObjectVesselState.Unchecked,
  },
};

export default meta;
type Story = StoryObj;

const speedRotSlots = html`
  <svg
    slot="turn-indicator"
    viewBox="0 0 24 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 9V3A6 6 0 0 1 18 9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
  <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
  <svg
    slot="speed-indicator"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="6"
      y1="3"
      x2="6"
      y2="9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <line
      x1="10"
      y1="3"
      x2="10"
      y2="9"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
`;

// Interactive playground
export const Default: Story = {
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      ${args.type === ObcPoiObjectVesselType.Indicator
        ? html`<obi-vessel-type-psv-filled
            useCssColor
          ></obi-vessel-type-psv-filled>`
        : args.type === ObcPoiObjectVesselType.SpeedRot
          ? speedRotSlots
          : html`<obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>`}
    </obc-poi-object-vessel>
  `,
};

// === TYPE STORIES ===

export const Indicator: Story = {
  args: {
    type: ObcPoiObjectVesselType.Indicator,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
    </obc-poi-object-vessel>
  `,
};

export const Regular: Story = {
  args: {
    type: ObcPoiObjectVesselType.Regular,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

export const Large: Story = {
  args: {
    type: ObcPoiObjectVesselType.Large,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

export const SpeedRot: Story = {
  args: {
    type: ObcPoiObjectVesselType.SpeedRot,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      ${speedRotSlots}
    </obc-poi-object-vessel>
  `,
};

export const NUp: Story = {
  args: {
    type: ObcPoiObjectVesselType.NUp,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

export const NUpLarge: Story = {
  args: {
    type: ObcPoiObjectVesselType.NUpLarge,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

// === STYLE STORIES ===

export const Categorical: Story = {
  args: {
    vesselStyle: ObcPoiObjectVesselStyle.Categorical,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

// === STATE STORIES ===

export const Checked: Story = {
  args: {
    state: ObcPoiObjectVesselState.Checked,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

export const StaticUnchecked: Story = {
  args: {
    state: ObcPoiObjectVesselState.StaticUnchecked,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

export const StaticChecked: Story = {
  args: {
    state: ObcPoiObjectVesselState.StaticChecked,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

export const Activated: Story = {
  args: {
    state: ObcPoiObjectVesselState.Activated,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

export const Overlapped: Story = {
  args: {
    state: ObcPoiObjectVesselState.Overlapped,
  },
  render: (args) => html`
    <obc-poi-object-vessel
      type=${args.type}
      vesselStyle=${args.vesselStyle}
      state=${args.state}
    >
      <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
    </obc-poi-object-vessel>
  `,
};

// === OVERVIEW STORIES ===

const sectionStyle = 'margin-bottom: 24px;';
const headerStyle =
  'margin: 0 0 12px 0; font-family: sans-serif; font-size: 14px; font-weight: 600;';
const rowStyle = 'display: flex; gap: 16px; align-items: flex-end;';
const itemStyle = 'text-align: center;';
const labelStyle = 'font-size: 10px; margin-top: 4px; font-family: sans-serif;';

export const AllTypes: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>All Types - Regular Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Indicator</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="regular">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Regular</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="large">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Large</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="speed-rot">
            ${speedRotSlots}
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Speed+ROT</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="n-up">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>N-up</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="n-up-large">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>N-up Large</div>
        </div>
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>All Types - Categorical Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" vesselStyle="categorical">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Indicator</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="regular" vesselStyle="categorical">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Regular</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="large" vesselStyle="categorical">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Large</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="speed-rot" vesselStyle="categorical">
            ${speedRotSlots}
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Speed+ROT</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="n-up" vesselStyle="categorical">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>N-up</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="n-up-large" vesselStyle="categorical">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>N-up Large</div>
        </div>
      </div>
    </div>
  `,
};

export const AllStates: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>All States - Regular Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object-vessel state="unchecked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel state="checked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel state="static-unchecked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Static Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel state="static-checked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Static Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel state="activated">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Activated</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel state="overlapped">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Overlapped</div>
        </div>
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>All States - Categorical Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="unchecked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="checked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="static-unchecked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Static Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="static-checked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Static Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="activated">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Activated</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="overlapped">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Overlapped</div>
        </div>
      </div>
    </div>
  `,
};

export const AllStyles: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Regular vs Categorical Style</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="regular">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Regular</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Categorical</div>
        </div>
      </div>
    </div>

    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Indicator Style Comparison</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" vesselStyle="regular">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Regular</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" vesselStyle="categorical">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Categorical</div>
        </div>
      </div>
    </div>
  `,
};

export const IndicatorAllStates: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Indicator - All States</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" state="unchecked">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" state="checked">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" state="static-unchecked">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Static Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" state="static-checked">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Static Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" state="activated">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Activated</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel type="indicator" state="overlapped">
            <obi-vessel-type-psv-filled useCssColor></obi-vessel-type-psv-filled>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Overlapped</div>
        </div>
      </div>
    </div>
  `,
};

export const CategoricalAllStates: Story = {
  render: () => html`
    <div style=${sectionStyle}>
      <h3 style=${headerStyle}>Categorical - All States</h3>
      <div style=${rowStyle}>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="unchecked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="checked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="static-unchecked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Static Unchecked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="static-checked">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Static Checked</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="activated">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Activated</div>
        </div>
        <div style=${itemStyle}>
          <obc-poi-object-vessel vesselStyle="categorical" state="overlapped">
            <obi-vessel-type-psv-outlined></obi-vessel-type-psv-outlined>
          </obc-poi-object-vessel>
          <div style=${labelStyle}>Overlapped</div>
        </div>
      </div>
    </div>
  `,
};
