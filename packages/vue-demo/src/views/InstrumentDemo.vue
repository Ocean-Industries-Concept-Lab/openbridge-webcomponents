<script setup lang="ts">
import ObcAzimuthThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue'
import ObcThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/thruster/ObcThruster.vue'
import { AdviceType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice'
import { onMounted, ref, computed } from 'vue'
import { gsap } from 'gsap'
import ObcCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import ObcCompass from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/compass/ObcCompass.vue'
import { VesselImage } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'
import ObcSpeedGauge from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/speed-gauge/ObcSpeedGauge.vue'
import Propulsion from './Propulsion.vue'
import { useSim, type Sim } from '../composables/useSim'
const angle = ref(30)
const angleSetpoint = ref(-20)
const thrust = ref(50)
const thrustSetpoint = ref(50)
const sim = useSim()

onMounted(() => {
  const tl = gsap.timeline({ repeat: -1 })
  tl.to(angle, { value: -20, duration: 5 })
    .to(thrustSetpoint, { value: 90, duration: 3 }, '>')
    .to(thrust, { value: 90, duration: 7 }, '<1')
    .to(angleSetpoint, { value: 30, duration: 3 }, '>')
    .to(angle, { value: 30, duration: 7 }, '<1')
    .to(thrustSetpoint, { value: 50, duration: 3 }, '>')
    .to(thrust, { value: 50, duration: 5 }, '<1')
    .to(angleSetpoint, { value: -20, duration: 5 }, '>')
})

const rotationsPerMinute = computed(() => sim.vessel.r.value * 60)
</script>

<template>
  <div class="container">
    <ObcCard class="own-ship">
      <div slot="title">Own ship data</div>
      <div class="compass">
        <ObcCompass
          :heading="sim.vessel.headingDeg.value"
          :course-over-ground="sim.vessel.courseOverGroundDeg.value"
          :rotations-per-minute="rotationsPerMinute"
          :vessel-image="VesselImage.psvTop"
        />
      </div>
    </ObcCard>
    <ObcCard class="speed">
      <div slot="title">Speed</div>
      <div class="speed-gauge">
        <ObcSpeedGauge
          :speed="sim.vessel.speedForwardThroughWaterKnots.value"
          :min-speed="-5"
          :max-speed="25"
          enhanced
        />
      </div>
    </ObcCard>
    <ObcCard class="depth">
      <div slot="title">Depth</div>
    </ObcCard>
    <ObcCard class="cameras">
      <div slot="title">Cameras</div>
      <div>
      </div>
    </ObcCard>
    <ObcCard class="consumption">
      <div slot="title">Consumption</div>
      <div>
      </div>
    </ObcCard>
    <ObcCard class="wind">
      <div slot="title">Wind</div>
      <div>
      </div>
    </ObcCard>
    <ObcCard class="propulsion">
      <div slot="title">Propulsion</div>
        <Propulsion :sim="sim" />
      
    </ObcCard>
  </div>
</template>

<style scoped>
.container {
  box-sizing: border-box;
  display: grid;
  padding: 4px;
  grid-template-columns: repeat(6, 1fr) 6fr;
  grid-template-rows: 2fr 1fr 1fr;
  height: calc(100vh - var(--app-components-topbar-touch-target-size));
  width: 100%;
  gap: 4px;
  background-color: var(--container-backdrop-color);
}

.own-ship {
  grid-column: 1 / 7;
  grid-row: 1 / 2;
}

.speed {
  grid-column: 1 / 4;
  grid-row: 2 / 3;
}

.depth {
  grid-column: 4 / 7;
  grid-row: 2 / 3;
}

.cameras {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
}

.consumption {
  grid-column: 3 / 5;
  grid-row: 3 / 4;
}

.wind {
  grid-column: 5 / 7;
  grid-row: 3 / 4;
}

.propulsion {
  grid-column: 7 / 9;
  grid-row: 1 / 4;
}

.tunnel1,
.tunnel2 {
  position: absolute;
  display: block;
  left: calc((400 - 320) / 800 * 100%);
  top: 10%;
  width: calc(320 / 400 * 100%);
}

.tunnel2 {
  top: 20%;
}

.main1,
.main2 {
  position: absolute;
  display: block;
  left: 12%;
  top: 72%;
  width: calc(128 / 400 * 100%);
}

.main2 {
  left: unset;
  right: 12%;
}

.instrument {
  position: absolute;
  display: block;
  left: 0;
  top: 30%;
  width: 100%;
  height: 40%;
}

.ship {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ship svg {
  width: 100%;
  max-height: 80vh;
}

.compass {
  height: 100%;
  width: 100%;
}

.speed-gauge {
  height: 100%;
  width: 100%;
}
</style>
