<script setup lang="ts">
import ObcThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/thruster/ObcThruster.vue'
import { InstrumentState, Priority } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/types'
import ObcAzimuthThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue'
import ObcMainEngine from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/main-engine/ObcMainEngine.vue'
import ObcRudder from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/rudder/ObcRudder.vue'
import ObcInstrumentField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField.vue'
import { InstrumentFieldSize } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field'
import ObiLink from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/icons/ObiLink.vue'
import { useSim } from '../composables/useSim'
import { computed } from 'vue'
import { useDemoConfigStore } from '../stores/demoConfig'
import {
  type AngleAdvice,
  AdviceType
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice.js'
import { type LinearAdvice } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/thruster/advice.js'
const sim = useSim()

const configStore = useDemoConfigStore()

const rudderInstrumentAngle = computed(() => sim.propulsion.rudder.value * 2)
const rudderInstrumentAngleSetpoint = computed(() => sim.propulsion.rudderSet.value * 2)

const rudderAdive = computed((): AngleAdvice[] => {
  if (sim.controllers.showAdvice.value) {
    return [
      {
        minAngle: 20,
        maxAngle: 60,
        type: AdviceType.caution,
        hinted: true
      },
      {
        minAngle: -60,
        maxAngle: -20,
        type: AdviceType.caution,
        hinted: true
      }
    ]
  }
  return []
})

const thrusterAdvice = computed((): LinearAdvice[] => {
  if (sim.controllers.showAdvice.value) {
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
    <svg width="72" height="16" viewBox="0 0 72 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      class="port-starboard-indicator">
      <path
        d="M19.6106 14C18.5963 14 18.2264 12.6643 19.0961 12.1425L36.0002 2L52.9044 12.1425C53.7741 12.6643 53.4042 14 52.3899 14H19.6106Z"
        fill="var(--element-inactive-color)" />
      <circle cx="4.00024" cy="10" r="4" fill="var(--base-red-300)" />
      <circle cx="68.0002" cy="10" r="4" fill="var(--base-mint-300)" />
    </svg>

    <div class="fore-instruments">
      <ObcThruster tunnel single-sided :setpoint="0" :state="InstrumentState.off" />
    </div>
    <div class="center-instruments">
      <ObcAzimuthThruster :state="InstrumentState.off" :angle="0" :angle-setpoint="0" :thrust="0"
        :thrust-setpoint="0" />
    </div>
    <ObcMainEngine class="main-engine-1" :state="InstrumentState.active"
      :priority="configStore.hasCommand ? Priority.enhanced : Priority.regular" :thrust="sim.propulsion.propeller.value"
      :thrust-setpoint="sim.propulsion.propellerSet.value" :speed="49" :speed-setpoint="49"
      :thrust-advices="thrusterAdvice" />
    <ObcMainEngine class="main-engine-2" :state="InstrumentState.active"
      :priority="configStore.hasCommand ? Priority.enhanced : Priority.regular" :thrust="sim.propulsion.propeller.value"
      :thrust-setpoint="sim.propulsion.propellerSet.value" :speed="49" :speed-setpoint="49"
      :thrust-advices="thrusterAdvice" />
    <ObcRudder class="rudder-1" :state="InstrumentState.active"
      :priority="configStore.hasCommand ? Priority.enhanced : Priority.regular" :angle="rudderInstrumentAngle"
      :setpoint="rudderInstrumentAngleSetpoint" :max-angle="60" :advices="rudderAdive" />
    <ObcRudder class="rudder-2" :state="InstrumentState.active"
      :priority="configStore.hasCommand ? Priority.enhanced : Priority.regular" :angle="rudderInstrumentAngle"
      :setpoint="rudderInstrumentAngleSetpoint" :max-angle="60" :advices="rudderAdive" />
    <div class="readout-grid">
      <div class="tunnel-index readout-container single">
        <div class="index off font-ui-label-active">1</div>
        <div class="title font-ui-label">BT</div>
        <ObcInstrumentField :size="InstrumentFieldSize.enhanced" neutral-color off />
        <ObcInstrumentField class="field-unit" unit="%" tag="Power" off label-only horizontal
          :size="InstrumentFieldSize.enhanced" />
      </div>
      <div class="azimuth-index readout-container single">
        <div class="index off font-ui-label-active">2</div>
        <div class="title font-ui-label">Azimuth</div>
        <ObcInstrumentField :value="0" :max-digits="3" off :size="InstrumentFieldSize.enhanced" neutral-color>
          <div slot="off-value">0</div>
        </ObcInstrumentField>
        <ObcInstrumentField class="field-unit" unit="DEG" tag="Angle" off label-only horizontal
          :size="InstrumentFieldSize.enhanced" />
        <ObcInstrumentField off :size="InstrumentFieldSize.enhanced" />
        <ObcInstrumentField class="field-unit" unit="%" tag="Power" off label-only horizontal
          :size="InstrumentFieldSize.enhanced" />
      </div>
      <div class="main-engine-index readout-container single">
        <div class="index font-ui-label-active">3
          <ObiLink class="icon" /> 4
        </div>
        <div class="title font-ui-label">ME</div>
        <ObcInstrumentField :value="30" :setpoint="30" :max-digits="3" auto-hide-setpoint :auto-hide-deadband="1"
          has-setpoint :size="InstrumentFieldSize.enhanced" />
        <ObcInstrumentField class="field-unit" unit="%" tag="Pitch" label-only horizontal
          :size="InstrumentFieldSize.enhanced" />
        <ObcInstrumentField :value="sim.propulsion.propeller.value" :setpoint="sim.propulsion.propellerSet.value"
          auto-hide-setpoint :auto-hide-deadband="1" has-setpoint :max-digits="3"
          :size="InstrumentFieldSize.enhanced" />
        <ObcInstrumentField class="field-unit" unit="RPM" tag="Speed" label-only horizontal
          :size="InstrumentFieldSize.enhanced" />
      </div>
      <div class="rudder-index readout-container single">
        <div class="index font-ui-label-active">5
          <ObiLink class="icon" /> 6
        </div>
        <div class="title font-ui-label">Rudders</div>
        <ObcInstrumentField :value="sim.propulsion.rudder.value" :setpoint="sim.propulsion.rudderSet.value" has-setpoint
          auto-hide-setpoint :auto-hide-deadband="1" :max-digits="0" :size="InstrumentFieldSize.enhanced" />

        <ObcInstrumentField class="field-unit" unit="DEG" tag="Angle" label-only horizontal
          :size="InstrumentFieldSize.enhanced" />
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
  grid-template-columns: 1fr 1fr min-content;
  grid-template-rows: min-content minmax(auto, 15%) 1fr 1fr 1fr;
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

.fore-instruments {
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  justify-self: center;
}

.center-instruments {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
  width: 100%;
  height: 80%;
}

.main-engine-1 {
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  width: 100%;
  height: 100%;
}

.main-engine-2 {
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  width: 100%;
  height: 100%;
}

.rudder-1 {
  grid-column: 1 / 2;
  grid-row: 5 / 6;
  width: 100%;
  height: 100%;
}

.rudder-2 {
  grid-column: 2 / 3;
  grid-row: 5 / 6;
  width: 100%;
  height: 100%;
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

.tunnel-index {
  grid-row: 2 / 3;
}

.azimuth-index {
  grid-row: 3 / 4;
}

.main-engine-index {
  grid-row: 4 / 5;
}

.rudder-index {
  grid-row: 5 / 6;
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
