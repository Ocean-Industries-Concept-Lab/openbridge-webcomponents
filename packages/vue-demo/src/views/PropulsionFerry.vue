<script setup lang="ts">
import {
  InstrumentState,
  Priority
} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/types'
import ObcAzimuthThruster from '@oicl/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster'
import ObcInstrumentField from '@oicl/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField'
import { InstrumentFieldSize } from '@oicl/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field'
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
        <div class="index off font-ui-label-active">1</div>
        <div class="title font-ui-label">Fore</div>
        <ObcInstrumentField
          :value="0"
          :max-digits="3"
          off
          :size="InstrumentFieldSize.enhanced"
          neutral-color
        >
          <div slot="off-value">0</div>
        </ObcInstrumentField>
        <ObcInstrumentField
          class="field-unit"
          unit="DEG"
          tag="Angle"
          off
          label-only
          horizontal
          :size="InstrumentFieldSize.enhanced"
        />
        <ObcInstrumentField off :size="InstrumentFieldSize.enhanced" />
        <ObcInstrumentField
          class="field-unit"
          unit="%"
          tag="Power"
          off
          label-only
          horizontal
          :size="InstrumentFieldSize.enhanced"
        />
      </div>
      <div class="aft-index readout-container single">
        <div class="index font-ui-label-active">2</div>
        <div class="title font-ui-label">Aft</div>
        <ObcInstrumentField
          :value="angle"
          :setpoint="angleSetpoint"
          has-setpoint
          auto-hide-setpoint
          :auto-hide-deadband="1"
          :max-digits="3"
          :size="InstrumentFieldSize.enhanced"
        />
        <ObcInstrumentField
          class="field-unit"
          unit="DEG"
          tag="Angle"
          label-only
          horizontal
          :size="InstrumentFieldSize.enhanced"
        />
        <ObcInstrumentField
          :value="sim.propulsion.propeller.value"
          :setpoint="sim.propulsion.propellerSet.value"
          has-setpoint
          auto-hide-setpoint
          :auto-hide-deadband="1"
          :size="InstrumentFieldSize.enhanced"
        />
        <ObcInstrumentField
          class="field-unit"
          unit="%"
          tag="Power"
          label-only
          horizontal
          :size="InstrumentFieldSize.enhanced"
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
  justify-self: flex-end;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
}

.readout-container.single {
  grid-column: 2 / -1;
}

.fore-index {
  grid-row: 2 / 3;
}

.aft-index {
  grid-row: 3 / 4;
}

.index {
  justify-self: end;
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
  white-space: nowrap;
}

.field-unit {
  margin-left: -8px;
  align-self: end;
  justify-self: start;
}

obc-instrument-field {
  justify-self: end;
}
</style>
