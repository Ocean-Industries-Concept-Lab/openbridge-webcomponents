<template>
  <div class="depth-container">
    <div
      ref="rootElement"
      class="graph-container"
      :class="{ 'show-real-time-depth': showRealTimeDepth }"
      :style="`--depth-line-top: ${depthLineTop};`"
    >
      <div ref="chartElement" class="graph"></div>
    </div>
    <div class="depth-readout">
      <div class="depth-readout-label font-instrument-unit">Below transducer</div>
      <div class="depth-readout-value font-instrument-value-regular">
        {{ sim.depthDownSampled.value.toFixed(1) }}
        <div class="depth-readout-unit font-instrument-unit">m</div>
      </div>
    </div>
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
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import uPlot, { type Padding } from 'uplot'
import 'uplot/dist/uPlot.min.css'

import type { VNodeRef } from 'vue'
import { useBridgeStore } from '@/stores/bridge'

import { useSim } from '@/composables/useSim'
import type { ObcPalette } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu'

const props = defineProps<{
  showRealTimeDepth: boolean
  maxDepth?: number
}>()

const offset = 100_000
const sim = useSim()
const depthHistory = computed<[number[], number[]]>(() => {
  const [x, yData] = sim!.depthData.value
  return [x, yData.map((y) => offset - y)]
})

watch(() => depthHistory.value, updateGraph)

const rootElement = ref<VNodeRef | null>(null)
const chartElement = ref<VNodeRef | null>(null)

const bridgeStore = useBridgeStore()

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  createGraph()

  // Set up resize observer
  if (rootElement.value) {
    resizeObserver = new ResizeObserver(() => {
      updateGraph()
    })
    resizeObserver.observe(rootElement.value)
  }
})

onUnmounted(() => {
  // Clean up resize observer
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

const currentPalette = ref<ObcPalette | undefined>(undefined)
watch([bridgeStore.$state, currentPalette], () => {
  if (bridgeStore.$state.bridgeData.palette !== currentPalette.value) {
    currentPalette.value = bridgeStore.$state.bridgeData.palette
    // Destroy the graph
    uplot.value?.destroy()
    uplot.value = null
    // Create a new graph
    createGraph()
  }
})

async function getCssVariableValue(variable: string, retry: number = 1): Promise<string> {
  // Get the html element so that we can get the css variables
  const ctx = rootElement.value
  if (!ctx) {
    throw new Error('Could not find root element')
  }
  const value = getComputedStyle(ctx).getPropertyValue(variable).trim()
  if (!value && retry > 0) {
    console.log(`Could not find css variable ${variable}, retrying...`)
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        resolve(getCssVariableValue(variable, retry - 1))
      })
    })
  }
  return value
}

const uplot = ref<uPlot | null>(null)

function getSize(): { width: number; height: number } {
  const box = rootElement.value?.getBoundingClientRect() ?? { width: 200, height: 200 }
  box.width = Math.max(box.width - 5, 50)
  box.height = Math.max(box.height - 10, 50)
  return box
}

async function getSeries() {
  return [
    {},
    {
      stroke: await getCssVariableValue('--element-neutral-color'),
      width: 2,
      points: { show: false },
      fill: await getCssVariableValue('--instrument-regular-tertiary-color')
    }
  ]
}

async function createGraph() {
  currentPalette.value = bridgeStore.$state.bridgeData.palette
  const box = getSize()
  const opts = {
    width: box.width,
    height: box.height,
    padding: [10, -7, 0, 0] as Padding,
    scales: {
      x: { time: false, show: false },
      y: {
        auto: true,
        show: false,
        range: () => {
          const yMax = offset
          const yMin = props.maxDepth ? props.maxDepth : Math.min(...depthHistory.value[1])
          const range = yMax - yMin
          return [yMin - range * 0.1, yMax] as [number, number]
        }
      }
    },
    series: await getSeries(),
    axes: [
      { show: false },
      {
        ticks: { show: false },
        show: true,
        grid: {
          show: true,
          stroke: await getCssVariableValue('--instrument-frame-tertiary-color'),
          width: 1
        },
        values: (self: uPlot, ticks: number[]) => {
          // Only show ticks at the start and end of the range
          return ticks.map((tick, i) => (i === 0 || i === ticks.length - 1 ? offset - tick : null))
        },
        side: 1,
        gap: 18,
        stroke: await getCssVariableValue('--instrument-tick-mark-secondary-color'),
        font: "12px 'Noto Sans', sans-serif"
      }
    ],
    legend: { show: false },
    cursor: { show: false }
  }
  uplot.value = new uPlot(opts, depthHistory.value, chartElement.value)
  updateDepthLineTop()
}

async function updateGraph() {
  if (!uplot.value) {
    return
  }
  const box = getSize()
  uplot.value.setSize({ width: box.width, height: box.height })
  uplot.value.setData(depthHistory.value)
  updateDepthLineTop()
}

const depthLineTop = ref('91.1%')
function updateDepthLineTop() {
  if (!uplot.value) {
    return
  }
  const depth = sim.depth.value
  // @ts-expect-error uPlot types are not complete
  const y = uplot.value.scales.y.valToPct(offset - depth)
  depthLineTop.value = `${100 - y * 100}%`
}
</script>

<style scoped>
.depth-container {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  padding: 24px;
  padding-right: 18px;
  padding-top: 0;
}

.graph-container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.graph {
  width: 100%;
  height: 100%;
}

.depth-readout {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
  padding-right: 6px;
  color: var(--element-neutral-color);
}

.depth-readout-label {
  flex-shrink: 0;
}

.depth-readout-value {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 4px;
  padding: 0 8px;
}
</style>

<style>
.graph .u-under {
  background-color: var(--instrument-frame-secondary-color);
}

.graph .u-axis::after {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 12px;
  bottom: -1px;
  background: var(--instrument-frame-secondary-color);
  border: 1px solid var(--instrument-frame-tertiary-color);
}

.show-real-time-depth .u-over::before {
  z-index: 1;
  border-radius: 1px;
  content: '';
  position: absolute;
  top: var(--depth-line-top);
  left: 1px;
  right: -12px;
  width: calc(100% + 12px);
  height: 1px;
  background: var(--element-neutral-color);
}

.graph .u-over::after {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  right: -1px;
  bottom: -1px;
  box-sizing: content-box;
  border: 1px solid var(--instrument-frame-tertiary-color);
}
</style>
