<template>
  <div class="targets-list">
    <div class="header">
      <ObcDropdownButton
        v-model="sortBy"
        :options="[
          { value: 'distance', label: 'Distance' },
          { value: 'cpa', label: 'CPA' },
          { value: 'tcpa', label: 'TCPA' }
        ]"
        full-width
        @change="updateSort"
      >
      </ObcDropdownButton>
    </div>
    <div class="targets-container">
      <div v-if="sortedTargets.length === 0" class="no-targets">No targets found</div>
      <div v-for="target in sortedTargets" v-else :key="target.mmsi" class="target-item">
        <div class="target-header">
          <div class="target-icon">
            <img
              :src="`/Type=${getVesselImage(target.shipType)}.svg`"
              alt="Ship type"
              :style="`transform: rotate(${target.courseOverGround ?? 0}deg)`"
            />
          </div>
          <div class="target-name font-ui-button">{{ target.name || 'Unknown vessel' }}</div>
          <div class="target-mmsi font-ui-label">{{ target.mmsi }}</div>
          <ObcBearingIndicator class="target-bearing" :bearing-deg="target.bearingDeg" />
        </div>
        <div class="target-data">
          <div class="data-row target-cog">
            <span class="label">COG:</span>
            <span class="value">{{
              formatBearing(target.courseOverGround ?? target.trueHeading ?? 0)
            }}</span>
            <span class="unit">deg</span>
          </div>
          <div class="data-row target-sog">
            <span class="label">SOG:</span>
            <span class="value">{{ formatSpeed(target.speedOverGround) }}</span>
            <span class="unit">kn</span>
          </div>
          <div class="divider"></div>
          <div class="data-row target-brg">
            <span class="label">BRG:</span>
            <span class="value">{{ formatBearing(target.bearingDeg) }}</span>
            <span class="unit">deg</span>
          </div>
          <div class="data-row target-rng">
            <span class="label">RNG:</span>
            <span class="value">{{ formatDistance(target.distance) }}</span>
            <span class="unit">NM</span>
          </div>
        </div>
        <div v-if="target.cpa !== undefined && target.timeToCpa !== undefined" class="target-cpa">
          <div class="data-row">
            <span class="label">CPA</span>
            <span class="value" :class="{ danger: target.cpa < 0.5 }">{{
              formatDistance(target.cpa)
            }}</span>
            <span class="unit">NM</span>
          </div>
          <div class="data-row">
            <span class="label">TCPA</span>
            <span class="value">{{ formatTime(target.timeToCpa) }}</span>
            <span class="unit">min</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue'
import { useSim } from '@/composables/useSim'
import { getCpa, type AisData } from '@/business/aisData'
import type { Ref } from 'vue'
import ObcDropdownButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/dropdown-button/ObcDropdownButton.vue'
import { getVesselImage } from '@/business/aisData'
import ObcBearingIndicator from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/bearing-indicator/ObcBearingIndicator.vue'

interface TargetWithCpa extends AisData {
  distance: number
  bearingDeg: number
  cpa?: number
  timeToCpa?: number
}

const props = defineProps<{
  vessels: Ref<Map<number, AisData>> | Map<number, AisData>
}>()

const sim = useSim()
const sortBy = ref<'distance' | 'cpa' | 'tcpa'>('distance')

// Convert sim data to AisData format for CPA calculation
const ownShipData = computed(
  (): AisData => ({
    mmsi: 0, // Own ship
    latitude: sim.north.value,
    longitude: sim.east.value,
    courseOverGround: sim.vessel.courseOverGroundDeg.value,
    speedOverGround: sim.vessel.speedForwardOverGroundKnots.value,
    name: 'Own Ship',
    msgtime: new Date().toISOString(),
    shipType: 0,
    trueHeading: sim.vessel.headingDeg.value,
    rateOfTurn: sim.vessel.rotationDegPerMinute.value / 60, // Convert to degrees per second
    navigationStatus: 0
  })
)

// Calculate CPA for all targets
const targetsWithCpa = computed((): TargetWithCpa[] => {
  const targets: TargetWithCpa[] = []
  const ownShip = ownShipData.value
  const vessels = unref(props.vessels)

  vessels.forEach((vessel) => {
    const cpaResult = getCpa(vessel, ownShip)

    const target: TargetWithCpa = {
      ...vessel,
      distance: cpaResult.distance,
      bearingDeg: cpaResult.bearingDeg
    }

    // Add CPA and TCPA if available
    if ('cpa' in cpaResult) {
      target.cpa = cpaResult.cpa
      target.timeToCpa = cpaResult.timeToCpa
    }

    targets.push(target)
  })

  return targets
})

// Sort targets based on selected criteria
const sortedTargets = computed(() => {
  const targets = [...targetsWithCpa.value]

  switch (sortBy.value) {
    case 'distance':
      return targets.sort((a, b) => a.distance - b.distance)
    case 'cpa':
      return targets.sort((a, b) => {
        // Targets without CPA come last
        if (a.cpa === undefined && b.cpa === undefined) return a.distance - b.distance
        if (a.cpa === undefined) return 1
        if (b.cpa === undefined) return -1
        return a.cpa - b.cpa
      })
    case 'tcpa':
      return targets.sort((a, b) => {
        // Targets without TCPA come last
        if (a.timeToCpa === undefined && b.timeToCpa === undefined) return a.distance - b.distance
        if (a.timeToCpa === undefined) return 1
        if (b.timeToCpa === undefined) return -1
        return a.timeToCpa - b.timeToCpa
      })
    default:
      return targets
  }
})

function updateSort(event: CustomEvent<unknown>) {
  sortBy.value = (event.detail as { value: 'distance' | 'cpa' | 'tcpa' }).value
}

function formatDistance(distance: number): string {
  return distance.toFixed(2)
}

function formatBearing(bearing: number): string {
  return Math.round(bearing).toString()
}

function formatSpeed(speed: number): string {
  return speed.toFixed(1)
}

function formatTime(timeInHours: number): string {
  const minutes = Math.round(timeInHours * 60)
  return `${minutes}`
}
</script>

<style scoped>
.targets-list {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.header {
  padding: 8px 8px;
  flex-basis: fit-content;
  flex-grow: 0;
  flex-shrink: 0;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.targets-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.target-header {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas:
    'icon name bearing'
    'icon mmsi bearing';
  align-items: center;
  border-bottom: 1px solid var(--border-outline-color);
}

.target-item {
  border-radius: 6px;
  border: 1px solid var(--border-outline-color);
  background: var(--normal-enabled-background-color);
}

.target-icon {
  grid-area: icon;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
}

.target-name {
  grid-area: name;
  align-self: end;
  color: var(--element-active-color);
}

.target-mmsi {
  grid-area: mmsi;
  align-self: start;
  color: var(--element-neutral-color);
}

.target-bearing {
  grid-area: bearing;
  align-self: center;
}

.target-data {
  display: grid;
  grid-template-columns: 1fr min-content min-content min-content 1fr min-content min-content;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'cog cog cog divider brg brg brg'
    'sog sog sog divider rng rng rng';
  gap: 4px;
  padding: 8px;

  .data-row {
    display: grid;
    grid-template-columns: subgrid;
    align-items: baseline;

    .label {
      color: var(--element-inactive-color);
      font-family: var(--global-typography-font-family);
      font-size: var(--global-typography-instrument-label-font-size);
      font-style: normal;
      font-weight: var(--global-typography-instrument-label-font-weight);
      line-height: var(--global-typography-instrument-label-line-height) /* 133.333% */;
    }

    .value {
      justify-self: end;
      color: var(--element-neutral-color);
      font-family: var(--global-typography-font-family);
      font-size: var(--global-typography-instrument-value-regular-font-size);
      font-style: normal;
      font-weight: var(--global-typography-instrument-value-regular-font-weight);
      line-height: var(--global-typography-instrument-value-regular-line-height) /* 150% */;
    }

    .unit {
      justify-self: start;
      color: var(--element-neutral-color);
      font-family: var(--global-typography-font-family);
      font-size: var(--global-typography-instrument-unit-font-size);
      font-style: normal;
      font-weight: var(--global-typography-instrument-unit-font-weight);
      line-height: var(--global-typography-instrument-unit-line-height) /* 133.333% */;
    }
  }

  .target-cog {
    grid-area: cog;
  }

  .target-sog {
    grid-area: sog;
  }

  .target-brg {
    grid-area: brg;
  }

  .target-rng {
    grid-area: rng;
  }
}

.target-cpa {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-top: 1px solid var(--border-outline-color);

  .data-row {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'value label'
      'value unit';
    align-items: end;
    column-gap: 4px;

    .value {
      justify-self: end;
      grid-column: 1/ 2;
      grid-row: 1/ -1;
      color: var(--element-neutral-color);
      font-family: var(--global-typography-font-family);
      font-size: var(--global-typography-instrument-value-enhanced-font-size);
      font-style: normal;
      font-weight: var(--global-typography-instrument-value-enhanced-font-weight);
      line-height: var(--global-typography-instrument-value-enhanced-line-height) /* 100% */;
    }

    .label {
      grid-area: label;
      color: var(--instrument-regular-secondary-color);
      font-family: var(--global-typography-font-family);
      font-size: var(--global-typography-instrument-label-font-size);
      font-style: normal;
      font-weight: var(--global-typography-instrument-label-font-weight);
      line-height: var(--global-typography-instrument-label-line-height) /* 133.333% */;
    }

    .unit {
      grid-area: unit;
      color: var(--instrument-regular-secondary-color);
      font-family: var(--global-typography-font-family);
      font-size: var(--global-typography-instrument-unit-font-size);
      font-style: normal;
      font-weight: var(--global-typography-instrument-unit-font-weight);
      line-height: var(--global-typography-instrument-unit-line-height) /* 133.333% */;
    }
  }
}

.divider {
  grid-area: divider;
  border-left: 1px solid var(--border-outline-color);
  height: 100%;
}

.no-targets {
  text-align: center;
  color: var(--element-neutral-color);
  padding: 32px 16px;
  font-style: italic;
}
</style>
