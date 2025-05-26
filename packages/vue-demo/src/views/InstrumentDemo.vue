<script setup lang="ts">
import { AdviceType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/advice'
import { onMounted, ref, onUnmounted } from 'vue'
import ObcCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import { VesselImage } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'
import ObcSpeedGauge from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/speed-gauge/ObcSpeedGauge.vue'
import Propulsion from './Propulsion.vue'
import { useSim } from '../composables/useSim'
import ObcPitchRoll from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/pitch-roll/ObcPitchRoll.vue'
import { getWeather, type WeatherData } from '@/business/getWeather'
import WeatherWidget from '@/components/WeatherWidget.vue'
import ObcWind from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/wind/ObcWind.vue'
import { type WindHistogramData } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/wind/wind'
import DepthGraph from '@/components/DepthGraph.vue'
import OwnShipData from '@/components/OwnShipData.vue'
const sim = useSim()

const maxSpeed = 5;

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
});

let weatherInterval: NodeJS.Timeout | null = null;

onMounted(() => {
  getWeather(59.95, 11.0524586).then(data => {
    weather.value = data;
    console.log(data);
  });

  weatherInterval = setInterval(() => {
    getWeather(59.95, 11.0524586).then(data => {
      weather.value = data;
    });
  }, 1_000 * 60 * 10);
});

onUnmounted(() => {
  if (weatherInterval) {
    clearInterval(weatherInterval);
  }
});

const windHistogramData: WindHistogramData[] = [
  {
    direction: 0,
    occurrences: 0
  }, {
    direction: 10,
    occurrences: 0
  }, {
    direction: 20,
    occurrences: 5
  }, {
    direction: 30,
    occurrences: 3
  }, {
    direction: 40,
    occurrences: 10
  }, {
    direction: 50,
    occurrences: 30
  }, {
    direction: 60,
    occurrences: 30
  }, {
    direction: 70,
    occurrences: 30
  }, {
    direction: 80,
    occurrences: 35
  },
  {
    direction: 90,
    occurrences: 32
  }, {
    direction: 100,
    occurrences: 30
  }, {
    direction: 110,
    occurrences: 20
  }, {
    direction: 120,
    occurrences: 0
  }, ...[130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350].map(direction => ({
    direction,
    occurrences: 0
  }))
]
</script>

<template>
  <div class="container">
    <ObcCard class="own-ship">
      <div slot="title">Own ship data</div>
      <div class="compass">
        <OwnShipData :sim="sim" :weather="weather" />
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
          :speed-advices="[{ minSpeed: maxSpeed, maxSpeed: 25, type: AdviceType.caution, hinted: true }]"
        />
      </div>
    </ObcCard>
    <ObcCard class="depth">
      <div slot="title">Depth</div>
        <DepthGraph />
    </ObcCard>
    <ObcCard class="pitch-roll">
      <div slot="title">Pitch - Roll</div>
      <div class="pitch-roll-container">
        <ObcPitchRoll :pitch="sim.pitchRoll.pitch.value" :roll="sim.pitchRoll.roll.value" :min-avg-pitch="-4" :max-avg-pitch="4" :max-avg-roll="7"   :min-avg-roll="-7"/>
      </div>
    </ObcCard>
    <ObcCard class="weather">
      <div slot="title">Weather</div>
      <WeatherWidget :weather="weather" />
    </ObcCard>
    <ObcCard class="wind">
      <div slot="title">Wind</div>
        <ObcWind 
          class="wind-instrument" 
          :wind-histogram-data="windHistogramData" 
          :current-wind-from-direction="weather.windDirection" 
          :current-wind-speed-beaufort="weather.windSpeedBeaufort" 
          :vessel-heading-deg="sim.vessel.headingDeg.value"
          :vessel-image="VesselImage.psvTop"
        />
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

.weather {
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

.wind-instrument {
  height: 100%;
  width: 100%;
}
</style>
