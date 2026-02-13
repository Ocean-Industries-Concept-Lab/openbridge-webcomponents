import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {html} from 'lit';
import './gauge-horizontal.js';
import '../../bars-graphs/line-graph/line-graph.js';
import {AdviceType} from '../watch/advice.js';
import {
  FillMode,
  BorderRadiusPosition,
  InstrumentState,
} from './gauge-horizontal.js';

const meta: Meta = {
  title: 'Instruments/Gauge Horizontal',
  tags: ['autodocs', '6.0'],
  component: 'obc-gauge-horizontal',
  argTypes: {
    minValue: {control: {type: 'range', min: -100, max: 100}},
    maxValue: {control: {type: 'range', min: 0, max: 1000}},
    mainTickbars: {
      control: {type: 'object'},
      table: {type: {summary: 'number[] | undefined'}},
    },
    primaryTickbarsInterval: {control: {type: 'number', min: 1}},
    secondaryTickbarsInterval: {control: {type: 'number', min: 1}},
    tertiaryTickbarsInterval: {control: {type: 'number', min: 1}},
    hideLabels: {control: {type: 'boolean'}},
    borderRadiusPosition: {
      control: {type: 'select'},
      options: Object.values(BorderRadiusPosition),
    },
    enhanced: {control: {type: 'boolean'}},
    fillMode: {control: {type: 'radio'}, options: ['fill', 'tint']},
    fillMin: {control: {type: 'number'}},
    fillMax: {control: {type: 'number'}},
    value: {control: {type: 'range', min: -100, max: 100, step: 1}},
    setpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    newSetpoint: {control: {type: 'range', min: -100, max: 100, step: 1}},
    atSetpoint: {control: {type: 'boolean'}},
    disableAutoAtSetpoint: {control: {type: 'boolean'}},
    autoAtSetpointDeadband: {
      control: {type: 'number', min: 0, max: 10, step: 0.5},
    },
    setpointAtZeroDeadband: {
      control: {type: 'number', min: 0, max: 5, step: 0.1},
    },
    state: {control: {type: 'select'}, options: Object.values(InstrumentState)},
    side: {control: {type: 'radio'}, options: ['top', 'bottom']},
    advices: {control: {type: 'object'}},
  },
  args: {
    minValue: 0,
    maxValue: 100,
    mainTickbars: [],
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: undefined,
    hideLabels: false,
    borderRadiusPosition: BorderRadiusPosition.innerFirstChild,
    enhanced: false,
    fillMode: FillMode.fill,
    fillMin: 0,
    fillMax: 40,
    value: undefined,
    setpoint: undefined,
    newSetpoint: undefined,
    atSetpoint: false,
    disableAutoAtSetpoint: false,
    autoAtSetpointDeadband: 1,
    setpointAtZeroDeadband: 0.5,
    state: 'inCommand',
    side: 'bottom',
    advices: [],
  },
  render: (args) => html`
    <obc-gauge-horizontal
      .minValue=${args.minValue}
      .maxValue=${args.maxValue}
      .mainTickbars=${args.mainTickbars}
      .primaryTickbarsInterval=${args.primaryTickbarsInterval}
      .secondaryTickbarsInterval=${args.secondaryTickbarsInterval}
      .tertiaryTickbarsInterval=${args.tertiaryTickbarsInterval}
      .hideLabels=${args.hideLabels}
      .borderRadiusPosition=${args.borderRadiusPosition}
      .enhanced=${args.enhanced}
      .fillMode=${args.fillMode}
      .fillMin=${args.fillMin}
      .fillMax=${args.fillMax}
      .value=${args.value}
      .setpoint=${args.setpoint}
      .newSetpoint=${args.newSetpoint}
      .atSetpoint=${args.atSetpoint}
      .disableAutoAtSetpoint=${args.disableAutoAtSetpoint}
      .autoAtSetpointDeadband=${args.autoAtSetpointDeadband}
      .setpointAtZeroDeadband=${args.setpointAtZeroDeadband}
      .state=${args.state}
      .side=${args.side}
      .advices=${args.advices}
    >
    </obc-gauge-horizontal>
  `,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const DefaultBottom: Story = {
  name: 'Default (bottom side, labels, advice)',
  args: {
    minValue: 0,
    maxValue: 100,
    side: 'bottom',
    tertiaryTickbarsInterval: 2,
    setpoint: 50,
    value: 40,
    advices: [{min: 60, max: 80, type: AdviceType.caution, hinted: true}],
  },
};

export const ComponentSizeComparison: Story = {
  name: 'Component size comparison (regular/medium/large/xl)',

  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 40px; align-items: flex-start;"
    >
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Regular
        </div>
        <div class="obc-component-size-regular">
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            side="bottom"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Medium
        </div>
        <div class="obc-component-size-medium">
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            side="bottom"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Large
        </div>
        <div class="obc-component-size-large">
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            side="bottom"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-horizontal>
        </div>
      </div>
      <div style="text-align: left;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">XL</div>
        <div class="obc-component-size-xl">
          <obc-gauge-horizontal
            minValue="0"
            maxValue="100"
            side="bottom"
            primaryTickbarsInterval="20"
            secondaryTickbarsInterval="10"
            tertiaryTickbarsInterval="2"
            setpoint="50"
            value="40"
            .advices=${[
              {min: 60, max: 80, type: AdviceType.caution, hinted: true},
            ]}
          ></obc-gauge-horizontal>
        </div>
      </div>
    </div>
  `,
};

export const DefaultTop: Story = {
  name: 'Default (top side, labels)',

  args: {
    minValue: 0,
    maxValue: 100,
    side: 'top',
  },
};

export const NegativeRange: Story = {
  name: 'Negative range (-100 to 100)',

  args: {
    minValue: -100,
    maxValue: 100,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const SmallRange: Story = {
  name: 'Small range (0 to 10)',

  args: {
    minValue: 0,
    maxValue: 10,
    primaryTickbarsInterval: 2,
    secondaryTickbarsInterval: 1,
  },
};

export const WithBarFillBottom: Story = {
  name: 'With bar fill (bottom side, enhanced)',

  args: {
    minValue: 0,
    maxValue: 100,

    enhanced: true,
    value: 65,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
  },
};

export const WithBarFillTop: Story = {
  name: 'With bar fill (top side)',

  args: {
    minValue: -100,
    maxValue: 100,

    enhanced: false,
    value: 45,
    primaryTickbarsInterval: 20,
    secondaryTickbarsInterval: 10,
    side: 'top',
  },
};

export const FillModeComparison: Story = {
  name: 'Fill mode comparison, enhanced (fill vs tint)',

  render: () => html`
    <div
      style="display: flex; flex-direction:column; gap: 40px; align-items: flex-start;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Fill Mode
        </div>
        <obc-gauge-horizontal
          minValue="0"
          maxValue="100"
          enhanced
          fillMode="${FillMode.fill}"
          fillMin="0"
          fillMax="65"
          value="65"
          setpoint="70"
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-horizontal
          minValue="0"
          maxValue="100"
          enhanced
          fillMode="${FillMode.tint}"
          fillMin="40"
          fillMax="80"
          value="65"
          setpoint="70"
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          Tint Mode
        </div>
        <obc-gauge-horizontal
          minValue="0"
          maxValue="100"
          enhanced
          fillMode="${FillMode.tint}"
          value="65"
          setpoint="70"
          primaryTickbarsInterval="20"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
    </div>
  `,
};

export const TintModeWithAdvice: Story = {
  name: 'Tint mode with advice overlays',

  args: {
    minValue: -100,
    maxValue: 100,

    enhanced: true,
    fillMode: FillMode.tint,
    fillMin: -50,
    fillMax: 50,
    value: 20,
    setpoint: 30,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    advices: [
      {min: 40, max: 60, type: AdviceType.caution, hinted: true},
      {min: -60, max: -40, type: AdviceType.caution, hinted: true},
    ],
  },
};

export const WithAdvice: Story = {
  name: 'With advice overlays',

  args: {
    minValue: -100,
    maxValue: 100,

    value: 10,
    setpoint: 10,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
    tertiaryTickbarsInterval: 2,
    advices: [
      {min: 80, max: 100, type: AdviceType.caution, hinted: true},
      {min: 50, max: 70, type: AdviceType.caution, hinted: false},
      {min: 20, max: 40, type: AdviceType.caution, hinted: true},
      {min: -20, max: 20, type: AdviceType.advice, hinted: true},
      {min: -40, max: -20, type: AdviceType.advice, hinted: false},
      {min: -60, max: -40, type: AdviceType.advice, hinted: true},
    ],
  },
};

export const WithSetpointAtValue: Story = {
  name: 'With setpoint (value at setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,
    enhanced: true,
    fillMin: 0,
    fillMax: 50,
    value: 50,
    setpoint: 50,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const WithSetpointAwayFromValue: Story = {
  name: 'With setpoint (value away from setpoint)',

  args: {
    minValue: -100,
    maxValue: 100,

    enhanced: true,
    value: 30,
    setpoint: 70,
    primaryTickbarsInterval: 50,
    secondaryTickbarsInterval: 10,
  },
};

export const SetpointStateComparison: Story = {
  name: 'State comparison (inCommand/active/loading/off/focus)',

  render: () => html`
    <div
      style="display: flex; flex-direction:column; gap: 40px; align-items: flex-start;"
    >
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          inCommand
        </div>
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="50"
          setpoint="50"
          state="inCommand"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          active
        </div>
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="30"
          setpoint="70"
          state="active"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          loading
        </div>
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="-20"
          setpoint="40"
          state="loading"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">off</div>
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="60"
          setpoint="-30"
          state="off"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 8px; font-size: 14px; color: #ccc;">
          adjusting/touching
        </div>
        <obc-gauge-horizontal
          minValue="-100"
          maxValue="100"
          enhanced
          value="30"
          setpoint="30"
          .newSetpoint=${70}
          state="inCommand"
          primaryTickbarsInterval="50"
          secondaryTickbarsInterval="10"
        ></obc-gauge-horizontal>
      </div>
    </div>
  `,
};
