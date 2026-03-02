<script setup lang="ts">
import ObcCompass from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/compass/ObcCompass.vue'
import { useSim } from '../composables/useSim'
import { useWeather } from '@/business/getWeather'
import { VesselImage } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import ObcInstrumentField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField.vue'
import { InstrumentFieldSize } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field'
import {
  type AngleAdvice,
  AdviceType
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice.js'
import {
  InstrumentState,
  Priority
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types'
import { useDemoConfigStore } from '../stores/demoConfig'

const sim = useSim()
const { weather } = useWeather()
const demoConfigStore = useDemoConfigStore()

const props = defineProps<{
  vessel: 'psv' | 'ferry'
}>()

const compassRef = ref<InstanceType<typeof ObcCompass>>()
let resizeObserver: ResizeObserver | null = null

function mapTo360Degrees(value: number) {
  return (value + 360) % 360
}

const rotationsPerMinute = computed(() => sim.vessel.r.value * 60)
const degPerMinute = computed(() => {
  const rRadPerSecond = sim.vessel.r.value
  const degPerSecond = (rRadPerSecond * 180) / Math.PI
  return degPerSecond * 60
})

// Take degrees and return dd* mm.mmm'
function formatDegrees(value: number) {
  const degrees = Math.floor(value)
  const minutes = ((value - degrees) * 60).toFixed(3)
  return `${degrees}° ${minutes}'`
}

const north = computed(() => {
  const n = sim.north.value
  return formatDegrees(n)
})

const east = computed(() => {
  const e = sim.east.value
  return formatDegrees(e)
})

const windSpeedKnots = computed(() => {
  // Convert from m/s to knots
  return weather.value.windSpeed * 1.94384
})

const headingAdvice = computed((): AngleAdvice[] => {
  const vessel = props.vessel
  const isFerry = vessel === 'ferry'
  let showAdvice = sim.controllers.showAdvice.value
  if (isFerry) {
    showAdvice = !showAdvice
  }
  if (showAdvice) {
    return [
      {
        minAngle: 0,
        maxAngle: 45,
        type: AdviceType.caution,
        hinted: true
      },
      {
        minAngle: 180,
        maxAngle: 270,
        type: AdviceType.advice,
        hinted: true
      }
    ]
  }
  return []
})

onMounted(() => {
  if (compassRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect
        const element = entry.target as HTMLElement
        element.style.maxWidth = `${height}px`
      }
    })

    resizeObserver.observe(compassRef.value.$el)
  } else {
    console.error('Compass reference not found')
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})
</script>

<template>
  <div class="container-own-ship">
    <div class="readout left">
      <ObcInstrumentField
        :value="mapTo360Degrees(sim.vessel.headingDeg.value)"
        :size="InstrumentFieldSize.enhanced"
        unit="DEG"
        tag="HDG"
        :max-digits="0"
      />
      <ObcInstrumentField
        :value="mapTo360Degrees(sim.vessel.courseOverGroundDeg.value)"
        :size="InstrumentFieldSize.enhanced"
        unit="DEG"
        tag="COG"
        :max-digits="0"
      />
      <ObcInstrumentField
        :value="degPerMinute"
        :size="InstrumentFieldSize.enhanced"
        unit="DEG/min"
        tag="ROT"
        :max-digits="0"
      />
      <div class="divider"></div>
      <div class="position">
        <div class="row">
          <div class="value font-instrument-value-regular">{{ north }}</div>
          <div class="unit font-instrument-label">N</div>
        </div>
        <div class="row">
          <div class="value font-instrument-value-regular">{{ east }}</div>
          <div class="unit font-instrument-label">E</div>
        </div>
      </div>
    </div>
    <ObcCompass
      ref="compassRef"
      class="compass"
      :heading="sim.vessel.headingDeg.value"
      :course-over-ground="sim.vessel.courseOverGroundDeg.value"
      :rotations-per-minute="rotationsPerMinute"
      :vessel-image="vessel === 'psv' ? VesselImage.psvTop : VesselImage.carFerryTop"
      :current-from-direction="sim.currentFromAngleDeg"
      :current-speed="sim.currentSpeedKnots"
      :wind-speed="weather.windSpeedBeaufort"
      :wind-from-direction="weather.windDirection"
      :heading-advices="headingAdvice"
      :state="InstrumentState.active"
      :priority="demoConfigStore.hasCommand ? Priority.enhanced : Priority.regular"
    />
    <div class="readout right">
      <div class="title font-ui-label">Wind</div>
      <ObcInstrumentField
        :value="windSpeedKnots"
        :size="InstrumentFieldSize.enhanced"
        unit="KN"
        tag="Speed"
        neutral-color
        :fraction-digits="1"
        :max-digits="0"
      />
      <ObcInstrumentField
        :value="weather.windDirection"
        :size="InstrumentFieldSize.enhanced"
        unit="DEG"
        tag="Direction"
        neutral-color
        :max-digits="0"
      />
      <div class="divider"></div>
      <div class="title font-ui-label">Current</div>
      <ObcInstrumentField
        :value="sim.currentSpeedKnots"
        :size="InstrumentFieldSize.enhanced"
        unit="KN"
        tag="Speed"
        neutral-color
        :fraction-digits="1"
        :max-digits="0"
      />
      <ObcInstrumentField
        :value="sim.currentFromAngleDeg"
        :size="InstrumentFieldSize.enhanced"
        unit="DEG"
        tag="Direction"
        neutral-color
        :max-digits="0"
      />
    </div>
  </div>
</template>

<style scoped>
.container-own-ship {
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  overflow: hidden;
}

.readout {
  width: fit-content;
  display: flex;
  align-self: stretch;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 16px;
}

.readout.right {
  gap: 8px;
}

.readout.right .divider {
  margin-top: 8px;
  margin-bottom: 8px;
}

.title {
  align-self: start;
  color: var(--element-neutral-color);
}

.position {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 4px;
  width: fit-content;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: end;
  width: fit-content;
}

.value {
  white-space: nowrap;
  color: var(--element-neutral-color);
}

.unit {
  color: var(--instrument-regular-secondary-color);
  width: 16px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--border-outline-color);
}
</style>
