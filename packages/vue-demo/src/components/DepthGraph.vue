<template>
  <div ref="rootElement" class="graph-container">
    <Scatter v-if="options && data" ref="chartElement" class="graph" :options="options" :data="data"/>
  </div>
</template>

<script lang="ts" setup>
/**
 * This file demonstrates how chart js can be used to make OpenBridge graphs.
 *
 * The main points to note are:
 * - The use of css variables to make the graph colors match the OpenBridge theme.
 *   This is done by getting the css variables from the root element and using them in the graph.
 * - Use of watch to redraw the graph when the palette change.
 */
import { Scatter } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { ref, watch, computed } from 'vue'

// Used to make the line color change based on the y value
import gradientPlugin from 'chartjs-plugin-gradient'
// Used to make a reference value line
import annotationPlugin from 'chartjs-plugin-annotation'
import type { VNodeRef } from 'vue'
import { useBridgeStore } from '@/stores/bridge'
ChartJS.register(
  annotationPlugin,
  gradientPlugin,
  Title,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Filler
)
import { useSim } from '@/composables/useSim';

const sim = useSim();

const depthHistory = computed(() => {
  const [_, yData] = sim.depthData.value;
  return yData;
})

watch(() => depthHistory.value, updateGraph)

const rootElement = ref<VNodeRef | null>(null)
const chartElement = ref<VNodeRef | null>(null)
const options = ref<ChartOptions<'scatter'> | null>(null)
const data = ref<ChartData<'scatter'> | null>(null)

const bridgeStore = useBridgeStore()



watch([rootElement, bridgeStore.$state], () => {
  updateGraph()
})

function getCssVariableValue(variable: string): string {
  // Get the html element so that we can get the css variables
  const ctx = rootElement.value
  if (!ctx) {
    throw new Error('Could not find root element')
  }
  const value = getComputedStyle(ctx).getPropertyValue(variable).trim()
  if (!value) {
    throw new Error(`Could not find css variable ${variable}`)
  }
  return value
}

let frameFillColor = 'rgb(240,240,240)';
let frameStrokeColor = 'rgb(202,202,202)';

const backgroundPlugin = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart: any) => {
      const ctx: CanvasRenderingContext2D = chart.ctx;
      const chartArea = chart.chartArea;
      ctx.save();
      ctx.fillStyle = frameFillColor;
      ctx.strokeStyle = frameStrokeColor;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.strokeRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    },
  };

ChartJS.register(backgroundPlugin)


function updateGraph() {
  const elementNeutralColor = getCssVariableValue('--element-neutral-color')
  const strokeColor = elementNeutralColor;
  const fillColor = getCssVariableValue('--instrument-regular-tertiary-color');
  const instrumentFrameSecondary = getCssVariableValue('--instrument-frame-secondary-color')
  const instrumentFrameTertiary = getCssVariableValue('--instrument-frame-tertiary-color')
  const instrumentTickMarkSecondary = getCssVariableValue('--instrument-tick-mark-secondary-color')

  frameFillColor = instrumentFrameSecondary;
  frameStrokeColor = instrumentFrameTertiary;
  

  // Set default font values
  ChartJS.defaults.font.size = parseInt(
    getCssVariableValue('--global-typography-ui-label-font-size').split('px')[0]
  )
  // Use 'Open Sans' as the fallback font
  ChartJS.defaults.font.family =
    getCssVariableValue('--font-family-main') + ", 'Open Sans', sans-serif"
  ChartJS.defaults.font.weight = parseInt(
    getCssVariableValue('--global-typography-ui-label-font-weight')
  )
  ChartJS.defaults.backgroundColor = 'red'

  options.value = {
    responsive: false, // Enable responsiveness (redraw on window resize)
    maintainAspectRatio: false, // Do not maintain aspect ratio
    animation: false, // Disable animations
    plugins: {
      legend: {
        display: false // Disable the legend for this case
      },
      // @ts-expect-error: TS2353
      backgroundColorPlugin: backgroundPlugin,
    },
    scales: {
      y: {
        ticks: {
          stepSize: 25, // Step size for the y axis
          callback: (value: number | string) => {
            return (-value).toString()
          },
          padding: 8,
          color: instrumentTickMarkSecondary // Font color for the y axis

        },
        border: {
          display: false // Disable the border of the y axis
        },
        grid: {
          color: instrumentFrameTertiary,
          drawTicks: false,
        },
        position: 'right', // Position the y axis on the right side
      },
      // Similarly for the x axis
      x: {
        border: {
          color: instrumentFrameTertiary
        },
        grid: {
          display: false // Disable horizontal grid lines
        },
        ticks: {
          display: false // Disable the x axis ticks
        },
        type: 'linear'
      }
    }
  }

  data.value = {
    datasets: [
      {
        label: 'Depth',
        // prettier-ignore
        data: depthHistory.value.map((depth, index) => ({x: index,y: -depth})),
        showLine: true, // Show the line between the points
        borderWidth: 2, // Line width
        pointRadius: 0, // Hide the points
        pointHoverRadius: 0, // Hide the points on hover
        // Make a fill between the target values and the data
        fill: {
          above: fillColor,
          below: fillColor,
          target: {
            value: -50
          }
        },
        borderColor: strokeColor,
      },
    ]
  }
}
</script>

<style scoped>
.graph-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  position: relative;
}

.graph {
  width: 100%;
  height: 100%;
}
</style>
