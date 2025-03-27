<template>
  <div ref="rootElement" class="container">
    <Scatter v-if="options && data" :options="options" :data="data" />
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
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { ref, watch } from 'vue'

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
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
)
const rootElement = ref<VNodeRef | null>(null)

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

function addOpacityToRgb(color: string, opacity: number): string {
  const [r, g, b] = color
    .slice(4, -1)
    .split(',')
    .map((c) => parseInt(c.trim()))
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

function updateGraph() {
  const elementNeutralColor = getCssVariableValue('--element-neutral-color')
  const instrumentFrameTertiary = getCssVariableValue('--instrument-frame-tertiary-color')
  const instrumentTickMarkTertiary = getCssVariableValue('--instrument-tick-mark-tertiary-color')

  const opacity = 0.3
  const positiveStroke = getCssVariableValue('--base-red-400')
  const positiveFill = addOpacityToRgb(positiveStroke, opacity)
  const negativeStroke = getCssVariableValue('--base-green-400')
  const negativeFill = addOpacityToRgb(negativeStroke, opacity)
  const instrumentEnhancedSecondary = getCssVariableValue('--instrument-enhanced-secondary-color')

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

  const target = 60

  options.value = {
    responsive: true, // Enable responsiveness (redraw on window resize)
    maintainAspectRatio: false, // Do not maintain aspect ratio
    animation: false, // Disable animations
    plugins: {
      legend: {
        display: false // Disable the legend for this case
      },
      annotation: {
        annotations: {
          // Make a horizontal line at y = 50 denoting the reference value
          line1: {
            type: 'line',
            yMin: target,
            yMax: target,
            borderColor: instrumentTickMarkTertiary,
            borderWidth: 1,
            borderDash: [5, 5]
          }
        }
      }
    },
    scales: {
      y: {
        min: 0, // Min y value
        max: 100, // Max y value
        ticks: {
          stepSize: 50, // Step size for the y axis
          color: elementNeutralColor // Font color for the y axis
        },
        border: {
          display: false // Disable the border of the y axis
        },
        grid: {
          color: instrumentFrameTertiary
        },
        position: 'right', // Position the y axis on the right side
        beginAtZero: true // Start the y axis at 0
      },
      // Similarly for the x axis
      x: {
        ticks: {
          stepSize: 5,
          color: elementNeutralColor
        },
        border: {
          color: instrumentFrameTertiary
        },
        grid: {
          display: false // Disable horizontal grid lines
        },
        type: 'linear'
      }
    }
  }

  data.value = {
    datasets: [
      // Draw the power line
      {
        label: 'Power',
        // prettier-ignore
        data: [{x: 0,y: 51},{x: 5,y: 70},{x: 10,y: 30},{x: 15,y: 63},{x: 20,y: 63}],
        showLine: true, // Show the line between the points
        borderWidth: 2, // Line width
        pointRadius: 0, // Hide the points
        pointHoverRadius: 0, // Hide the points on hover
        stepped: true, // Use a stepped line
        // Make a fill between the target values and the data
        fill: {
          above: positiveFill,
          below: negativeFill,
          target: {
            value: target
          }
        },
        // Make the line color change based on the y value
        gradient: {
          borderColor: {
            axis: 'y',
            colors: {
              '0': negativeStroke, // Green for values between 0 and 50
              [target]: negativeStroke,
              [target + 0.0001]: positiveStroke, // Red for values between 50.0001 and 100
              '100': positiveStroke
            }
          }
        }
      },
      // Draw advice lines
      {
        // prettier-ignore
        data: [{x: 5,y: 5},{x: 10,y: 5},{x: 10,y: Number.NaN},{x: 15,y: Number.NaN},{x: 15,y: 5},{x: 20,y: 5}],
        showLine: true,
        borderColor: instrumentEnhancedSecondary,
        borderWidth: 8,
        borderCapStyle: 'round', // Make the line ends round
        pointRadius: 0,
        stepped: true
      }
    ]
  }
}
</script>

<style scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  height: 500px;
}
</style>
