<script setup lang="ts">
import { useSim } from '@/composables/useSim'
import { useDemoConfigStore } from '@/stores/demoConfig'
import ObcAzimuthThruster from '@oicl/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue'
import {
  AdviceType,
  type AngleAdvice
} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch/advice.js'
import { computed, onMounted, watch } from 'vue'
import {
  InstrumentState,
  Priority
} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/types.js'
import { PropellerType } from '@oicl/openbridge-webcomponents/dist/navigation-instruments/thruster/propeller.js'

const sim = useSim()
const demoConfig = useDemoConfigStore()

const props = defineProps<{
  details: boolean
}>()

function primeAzimuthDemoMotion() {
  sim.propulsion.reset()
  sim.controllers.x.value = 0.3
  sim.controllers.y.value = 0
}

onMounted(primeAzimuthDemoMotion)
watch(
  () => props.details,
  () => {
    primeAzimuthDemoMotion()
  }
)

const angle = computed(() => sim.propulsion.rudder.value)
const angleSet = computed(() => sim.propulsion.rudderSet.value)
const thrust = computed(() => sim.propulsion.propeller.value)
const thrustSet = computed(() => sim.propulsion.propellerSet.value)

const angleAdvice = computed<AngleAdvice[]>(() => {
  if (sim.controllers.showAdvice.value || props.details) {
    return [
      {
        minAngle: 0,
        maxAngle: 10,
        type: AdviceType.advice,
        hinted: true
      },
      {
        minAngle: 20,
        maxAngle: 45,
        type: AdviceType.caution,
        hinted: true
      }
    ]
  }
  return []
})
</script>

<template>
  <div class="wrapper">
    <div class="instruments">
      <obc-readout
        label="Angle"
        unit="deg"
        :value.prop="Math.round(angle)"
        :setpointValue.prop="Math.round(angleSet)"
        :hasInput.prop="true"
        :hug.prop="false"
        variant="enhanced"
        :valuePriority.prop="'enhanced'"
        :inputInteraction.prop="'pop-up'"
        :maxDigits.prop="2"
      />
      <obc-readout
        label="Thrust"
        unit="%"
        :value.prop="Math.round(thrust)"
        :setpointValue.prop="Math.round(thrustSet)"
        :hasInput.prop="true"
        :hug.prop="false"
        variant="enhanced"
        :valuePriority.prop="'enhanced'"
        :inputInteraction.prop="'pop-up'"
        :maxDigits.prop="2"
      />
    </div>
    <ObcAzimuthThruster
      :angle="angle"
      :angle-setpoint="angleSet"
      :thrust="thrust"
      :thrust-setpoint="thrustSet"
      :angle-advices="angleAdvice"
      :state="InstrumentState.active"
      :priority="demoConfig.hasCommand ? Priority.enhanced : Priority.regular"
      :top-propeller="details ? PropellerType.single : undefined"
      :bottom-propeller="details ? PropellerType.single : undefined"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.instruments {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
