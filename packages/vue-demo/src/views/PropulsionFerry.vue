<script setup lang="ts">
import {
  InstrumentState,
  Priority
} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/types'
import ObcAzimuthThruster from '@oicl/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue'
import { useSim } from '../composables/useSim'
import { computed } from 'vue'
import { useDemoConfigStore } from '../stores/demoConfig'
import {
  type AngleAdvice,
  AdviceType
} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch/advice.js'
import { type LinearAdvice } from '@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/advice.js'
import { PropellerType } from '@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller.js'
const sim = useSim()

const configStore = useDemoConfigStore()

const angle = computed(() => {
  return (sim.propulsion.rudder.value * 180) / 30
})

const angleSetpoint = computed(() => {
  return (sim.propulsion.rudderSet.value * 180) / 30
})

const rudderAdive = computed((): AngleAdvice[] => {
  if (!sim.controllers.showAdvice.value) {
    return [
      {
        minAngle: 90,
        maxAngle: 270,
        type: AdviceType.caution,
        hinted: true
      }
    ]
  }
  return []
})

const thrusterAdvice = computed((): LinearAdvice[] => {
  if (!sim.controllers.showAdvice.value) {
    return [
      {
        min: 80,
        max: 100,
        type: AdviceType.caution,
        hinted: true
      },
      {
        min: 40,
        max: 60,
        type: AdviceType.advice,
        hinted: true
      },
      {
        min: -100,
        max: -20,
        type: AdviceType.caution,
        hinted: true
      }
    ]
  }
  return []
})
</script>

<template>
  <div class="propulsion-container">
    <svg
      width="72"
      height="16"
      viewBox="0 0 72 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="port-starboard-indicator"
    >
      <path
        d="M19.6106 14C18.5963 14 18.2264 12.6643 19.0961 12.1425L36.0002 2L52.9044 12.1425C53.7741 12.6643 53.4042 14 52.3899 14H19.6106Z"
        fill="var(--element-inactive-color)"
      />
      <circle cx="4.00024" cy="10" r="4" fill="var(--base-red-300)" />
      <circle cx="68.0002" cy="10" r="4" fill="var(--base-mint-300)" />
    </svg>

    <ObcAzimuthThruster
      class="fore-thruster"
      :state="InstrumentState.off"
      :angle="180"
      :angle-setpoint="0"
      :thrust="0"
      :thrust-setpoint="0"
      :top-propeller="PropellerType.cap"
      :bottom-propeller="PropellerType.single"
    />
    <ObcAzimuthThruster
      class="aft-thruster"
      :state="InstrumentState.active"
      :priority="configStore.hasCommand ? Priority.enhanced : Priority.regular"
      :angle="angle"
      :angle-setpoint="angleSetpoint"
      :thrust="sim.propulsion.propeller.value"
      :thrust-setpoint="sim.propulsion.propellerSet.value"
      :top-propeller="PropellerType.cap"
      :bottom-propeller="PropellerType.single"
      :thrust-advices="thrusterAdvice"
      :angle-advices="rudderAdive"
    />
    <div class="readout-grid">
      <div class="fore-index readout-container single">
        <div class="section-header">
          <div class="index off font-ui-label-active">1</div>
          <div class="title font-ui-label">Fore</div>
        </div>
        <obc-readout
          class="value-readout"
          :value="0"
          :maxDigits.prop="3"
          :hasInput.prop="false"
          variant="stack"
          direction="horizontal"
        />
        <obc-readout
          class="label-readout"
          label="Angle"
          unit="DEG"
          :labelOnly.prop="true"
          variant="stack"
          direction="horizontal"
        />
        <obc-readout
          class="value-readout"
          value="OFF"
          :hasInput.prop="false"
          variant="stack"
          direction="horizontal"
        />
        <obc-readout
          class="label-readout"
          label="Power"
          unit="%"
          :labelOnly.prop="true"
          variant="stack"
          direction="horizontal"
        />
      </div>
      <div class="aft-index readout-container single">
        <div class="section-header">
          <div class="index font-ui-label-active">2</div>
          <div class="title font-ui-label">Aft</div>
        </div>
        <obc-readout
          class="value-readout"
          :value="Math.round(angle)"
          :maxDigits.prop="3"
          :hasInput.prop="true"
          :setpointValue.prop="Math.round(angleSetpoint)"
          :inputInteraction.prop="'pop-up'"
          variant="stack"
          direction="vertical"
        />
        <obc-readout
          class="label-readout"
          label="Angle"
          unit="DEG"
          :labelOnly.prop="true"
          variant="stack"
          direction="horizontal"
        />
        <obc-readout
          class="value-readout"
          :value="Math.round(sim.propulsion.propeller.value)"
          :hasInput.prop="true"
          :setpointValue.prop="Math.round(sim.propulsion.propellerSet.value)"
          :inputInteraction.prop="'pop-up'"
          variant="stack"
          direction="vertical"
        />
        <obc-readout
          class="label-readout"
          label="Power"
          unit="%"
          :labelOnly.prop="true"
          variant="stack"
          direction="horizontal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.propulsion-container {
  position: relative;
  padding-top: 5%;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content 1fr 1fr;
  justify-content: center;
  justify-items: space-between;
  align-items: center;
}

.port-starboard-indicator {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  justify-self: center;
  align-self: center;
}

.fore-thruster,
.aft-thruster {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fore-thruster {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.aft-thruster {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

.speed-arrows-container {
  position: absolute;
  top: 3%;
  left: 0;
  right: 0;
  bottom: 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.readout-grid {
  grid-column: 4 / 5;
  grid-row: 1 / -1;
  display: grid;
  grid-template-columns: min-content min-content min-content;
  grid-template-rows: subgrid;
  align-items: center;
}

.readout-container {
  justify-self: end;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 8px;
  row-gap: 4px;
  padding-right: 16px;
}

.readout-container.single {
  grid-column: 1 / -1;
}

.section-header {
  display: contents;
}

.fore-index {
  grid-row: 2 / 3;
}

.aft-index {
  grid-row: 3 / 4;
}

.index {
  justify-self: end;
  margin-inline-end: 8px;
  box-sizing: border-box;
  height: 18px;
  padding: 0 4px;
  gap: 2px;
  border-radius: 100px;
  border: 1px solid var(--base-blue-200);
  background: var(--base-blue-050);
  color: var(--base-blue-500);
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    width: 16px;
    height: 16px;
  }
}

.index.off {
  border-color: var(--indent-enabled-border-color);
  background: var(--indent-enabled-background-color);
  color: var(--element-inactive-color);
}

.title {
  color: var(--element-neutral-color);
  justify-self: start;
  margin-inline-start: 8px;
  padding-block: 4px;
  white-space: nowrap;
}

.field-unit {
  margin-left: -8px;
  align-self: end;
  justify-self: start;
}

.value-readout {
  justify-self: end;
}

.label-readout {
  align-self: end;
  --obc-readout-padding-horizontal-safe: 3px;
}

obc-readout {
  flex-shrink: 0;
}
</style>
