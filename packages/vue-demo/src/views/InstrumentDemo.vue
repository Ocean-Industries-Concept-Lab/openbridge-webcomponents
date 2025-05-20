<script setup lang="ts">
import ObcAzimuthThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue'
import ObcThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/thruster/ObcThruster.vue'
import { AdviceType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice'
import { onMounted, ref, computed, watch } from 'vue'
import { gsap } from 'gsap'
import ObcCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import ObcCompass from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/compass/ObcCompass.vue'
import { VesselImage } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'
import ObcSpeedGauge from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/speed-gauge/ObcSpeedGauge.vue'
import Propulsion from './Propulsion.vue'
import { useSim, type Sim } from '../composables/useSim'
import { useAlertStore } from '@/stores/alert'
import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'
import type { Alert } from '@/business/model'
import ObcPitchRoll from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/pitch-roll/ObcPitchRoll.vue'
const sim = useSim()


const rotationsPerMinute = computed(() => sim.vessel.r.value * 60);

const alertStore = useAlertStore();

const speedAlert = ref<Alert | null>(null);

const maxSpeed = 5;

watch(sim.vessel.speedForwardThroughWaterKnots, (sog) => {
    if (sog > maxSpeed && speedAlert.value === null) {
        speedAlert.value = {
            alertType: 'warning',
            alertStatus: ObcAlertMenuItemStatus.Unacknowledged,
            time: new Date(),
            title: 'High speed',
            description: `Low speed area, max ${maxSpeed} knots`,
            source: 'Test source',
            tag: 'Test tag'
        };
        alertStore.alerts.push(speedAlert.value);
    } else if (sog <= maxSpeed && speedAlert.value !== null) {
        alertStore.alerts = alertStore.alerts.filter(alert => alert !== speedAlert.value);
        speedAlert.value = null;
    }
});
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
          :current-from-direction="sim.currentFromAngleDeg"
          :current-speed="sim.currentSpeedKnots"
          :wind-speed="2"
          :wind-from-direction="30"
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
          show-readout
          :speed-advices="[{minSpeed: maxSpeed, maxSpeed: 25, type: AdviceType.caution, hinted: true}]"
        />
      </div>
    </ObcCard>
    <ObcCard class="depth">
      <div slot="title">Depth</div>
    </ObcCard>
    <ObcCard class="pitch-roll">
      <div slot="title">Pitch - Roll</div>
      <div class="pitch-roll-container">
        <ObcPitchRoll :pitch="sim.pitchRoll.pitch.value" :roll="sim.pitchRoll.roll.value" :min-avg-pitch="-4" :max-avg-pitch="4" :max-avg-roll="7"   :min-avg-roll="-7"/>
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

.pitch-roll {
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

.pitch-roll-container {
  height: 100%;
  width: 100%;
}
</style>
