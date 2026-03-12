<script setup lang="ts">
import { AdviceType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice'
import { onMounted, ref, onUnmounted } from 'vue'
import ObcCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import ObcSpeedGauge from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/speed-gauge/ObcSpeedGauge.vue'
import ObcInstrumentField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField.vue'
import { InstrumentFieldSize } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field'
import Propulsion from './PropulsionView.vue'
import VesselMotion from './VesselMotion.vue'
import { useSim } from '../composables/useSim'
import ObcPitchRoll from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/pitch-roll/ObcPitchRoll.vue'
import { getWeather, type WeatherData } from '@/business/getWeather'
import WeatherWidget from '@/components/WeatherWidget.vue'
import DepthCard from '@/components/DepthCard.vue'
import OwnShipData from '@/components/OwnShipData.vue'
import WindCard from '@/components/WindCard.vue'
import PropulsionFerry from './PropulsionFerry.vue'
import { VesselImage } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'

const sim = useSim()
defineProps<{
  vessel: 'psv' | 'ferry'
}>()

const maxSpeed = 10

const weather = ref<WeatherData>({
  temperature: 23.4,
  humidity: 32.4,
  pressure: 1013.25,
  pressureTrend: 'steady',
  symbolCode: 'cloudy',
  windSpeed: 10.2,
  windSpeedBeaufort: 3,
  windDirection: 30,
  timestamp: new Date()
})

let weatherInterval: NodeJS.Timeout | null = null

onMounted(() => {
  getWeather(59.95, 11.0524586).then((data) => {
    weather.value = data
    console.log(data)
  })

  weatherInterval = setInterval(
    () => {
      getWeather(59.95, 11.0524586).then((data) => {
        weather.value = data
      })
    },
    1_000 * 60 * 10
  )
})

onUnmounted(() => {
  if (weatherInterval) {
    clearInterval(weatherInterval)
  }
})
</script>

<template>
  <div class="container">
    <ObcCard class="own-ship">
      <div slot="title">Own ship data</div>
      <div class="compass">
        <OwnShipData :vessel="vessel" />
      </div>
    </ObcCard>
    <ObcCard class="speed">
      <div slot="title">Speed</div>
      <div class="speed-gauge">
        <ObcSpeedGauge :speed="sim.vessel.speedForwardThroughWaterKnots.value" :min-speed="-5" :max-speed="25"
          :speed-advices="[
            { minSpeed: maxSpeed, maxSpeed: 25, type: AdviceType.caution, hinted: true }
          ]" />
        <ObcInstrumentField :value="sim.vessel.speedForwardThroughWaterKnots.value" unit="KN" tag="STW"
          :size="InstrumentFieldSize.enhanced" neutral-color :fraction-digits="1" :max-digits="0" />
      </div>
    </ObcCard>
    <DepthCard />
    <ObcCard class="pitch-roll">
      <div slot="title">Pitch - Roll</div>
      <div class="pitch-roll-container">
        <ObcPitchRoll :pitch="sim.pitchRoll.pitch.value" :roll="sim.pitchRoll.roll.value"
          :vessel-image-fore="vessel === 'psv' ? VesselImage.psvFore : VesselImage.carFerryAft"
          :vessel-image-side="vessel === 'psv' ? VesselImage.psvSide : VesselImage.carFerrySide" :min-avg-pitch="-4"
          :max-avg-pitch="4" :max-avg-roll="7" :min-avg-roll="-7" />
        <ObcInstrumentField :value="sim.pitchRoll.pitch.value" unit="DEG" tag="Pitch" neutral-color />
        <ObcInstrumentField :value="sim.pitchRoll.roll.value" unit="DEG" tag="Roll" neutral-color />
      </div>
    </ObcCard>
    <ObcCard class="weather">
      <div slot="title">Weather</div>
      <WeatherWidget :weather="weather" />
    </ObcCard>
    <ObcCard class="wind">
      <div slot="title">Wind</div>
      <WindCard :weather="weather" :vessel-heading-deg="sim.vessel.headingDeg.value" :vessel="vessel" />
    </ObcCard>
    <ObcCard class="vessel-motion">
      <div slot="title">Speed over ground</div>
      <VesselMotion :vessel="vessel" />
    </ObcCard>
    <ObcCard class="propulsion">
      <div slot="title">Propulsion</div>
      <Propulsion v-if="vessel === 'psv'" />
      <PropulsionFerry v-else />
    </ObcCard>
  </div>
</template>

<style scoped>
.container {
  box-sizing: border-box;
  display: grid;
  padding: 4px;
  grid-template-columns: repeat(6, 1fr) 6fr 6fr;
  grid-template-rows: 6fr repeat(6, 1fr);
  height: calc(100vh - var(--app-components-topbar-touch-target-size));
  width: 100%;
  gap: 4px;
  background-color: var(--container-backdrop-color);
  overflow-y: hidden;
}

.own-ship {
  grid-column: 1 / 7;
  grid-row: 1 / 2;
}

.speed {
  grid-column: 4 / 7;
  grid-row: 2 / 4;
}

.depth {
  grid-column: 1 / 4;
  grid-row: 2 / 5;
}

.pitch-roll {
  grid-column: 1 / 4;
  grid-row: 5 / -1;
}

.weather {
  grid-column: 4 / 7;
  grid-row: -3 / -1;
}

.wind {
  grid-column: 4 / 7;
  grid-row: 4 / 6;
}

.vessel-motion {
  grid-column: -3 / -2;
  grid-row: 1 / -1;
}

.propulsion {
  grid-column: -2 / -1;
  grid-row: 1 / -1;
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
  display: grid;
  box-sizing: border-box;
  padding: 12px 24px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  gap: 4px;

  obc-speed-gauge {
    width: 100%;
    height: 100%;
  }
}

.pitch-roll-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr min-content;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  gap: 4px;
  padding: 0 16px 16px 16px;
  box-sizing: border-box;
  grid-template-areas:
    'pitch-gauge pitch-gauge'
    'pitch-field roll-field';

  obc-pitch-roll {
    grid-area: pitch-gauge;
    width: 100%;
    height: 100%;
  }
}
</style>
