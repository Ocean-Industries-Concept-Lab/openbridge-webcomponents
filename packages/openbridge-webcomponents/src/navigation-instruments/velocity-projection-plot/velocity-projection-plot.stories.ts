import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {
  ObcVelocityProjectionPlot,
  VelocityProjectionDatapoint,
} from './velocity-projection-plot.js';
import './velocity-projection-plot.js';
import {widthDecorator} from '../../storybook-util.js';
import {html} from 'lit';

function scaleGeneratedDataPoints(dataPoints: VelocityProjectionDatapoint[]) {
  const sum = dataPoints.reduce((acc, curr) => acc + curr.ratioTotalEnergy, 0);
  return dataPoints.map((dp) => ({
    ...dp,
    ratioTotalEnergy: dp.ratioTotalEnergy / sum,
  }));
}

const meta: Meta<typeof ObcVelocityProjectionPlot> = {
  title: 'Instruments/Velocity projection',
  tags: ['autodocs'],
  component: 'obc-velocity-projection-plot',
  decorators: [widthDecorator],
  args: {
    width: 256,
    peakEnergyDirection: 90,
    steps: 180,
  },
  argTypes: {
    width: {
      control: {type: 'range', min: 100, max: 1000, step: 1},
    },
    peakEnergyDirection: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    steps: {
      control: {type: 'range', min: 1, max: 360, step: 1},
    },
    instantWindDirectionDeg: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    instantWindSpeedNumber: {
      control: {type: 'range', min: 0, max: 12, step: 1},
    },
    instantCurrentDirectionDeg: {
      control: {type: 'range', min: 0, max: 360, step: 1},
    },
    instantCurrentSpeedNumber: {
      control: {type: 'range', min: 0, max: 4, step: 1},
    },
  },
  render: (args) => {
    const dataPoints = generateDataPoints(
      args.peakEnergyDirection,
      360 / args.steps
    );
    console.log(dataPoints);
    return html`<obc-velocity-projection-plot
      .dataPoints=${dataPoints}
      .instantWindDirectionDeg=${args.instantWindDirectionDeg}
      .instantWindSpeedNumber=${args.instantWindSpeedNumber}
      .instantCurrentDirectionDeg=${args.instantCurrentDirectionDeg}
      .instantCurrentSpeedNumber=${args.instantCurrentSpeedNumber}
    ></obc-velocity-projection-plot>`;
  },
};

export default meta;
type Story = StoryObj<ObcVelocityProjectionPlot>;

export const Average: Story = {
  args: {},
};

export const Instantaneous: Story = {
  args: {
    instantWindDirectionDeg: 90,
    instantWindSpeedNumber: 3,
    instantCurrentDirectionDeg: 0,
    instantCurrentSpeedNumber: 1,
  },
};
function generateDataPoints(
  peakEnergyDirection: number,
  stepsDeg: number
): VelocityProjectionDatapoint[] {
  const peakAngleWindSpeed = 90;
  const peakValueWindSpeed = 1.3;
  const peakAngleTotalEnergy = peakEnergyDirection;

  const dataPoints: VelocityProjectionDatapoint[] = [];
  for (let i = 0; i < 360; i += stepsDeg) {
    const angleDeg = i;
    // use sine square wave to generate the data points
    const ratioWindEnergyOrExcessSpeed =
      Math.pow(Math.sin(((angleDeg - peakAngleWindSpeed) * Math.PI) / 180), 2) *
      peakValueWindSpeed;
    const ratioTotalEnergy =
      Math.pow(
        Math.sin(((angleDeg - peakAngleTotalEnergy - 180) * Math.PI) / 180 / 2),
        10
      ) + 0.01;

    dataPoints.push({
      startAngleDeg: angleDeg,
      endAngleDeg: angleDeg + stepsDeg,
      ratioWindEnergyOrExcessSpeed,
      ratioTotalEnergy,
    });
  }
  return scaleGeneratedDataPoints(dataPoints);
}
