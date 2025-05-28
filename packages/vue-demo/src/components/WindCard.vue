<script setup lang="ts">
import ObcWind from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/wind/ObcWind.vue'
import { VesselImage } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'
import { type WindHistogramData } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/wind/wind'
import type { WeatherData } from '@/business/getWeather'

interface Props {
  weather: WeatherData
  vesselHeadingDeg: number
}

defineProps<Props>()

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
  <ObcWind 
    class="wind-instrument" 
    :wind-histogram-data="windHistogramData" 
    :current-wind-from-direction="weather.windDirection" 
    :current-wind-speed-beaufort="weather.windSpeedBeaufort" 
    :vessel-heading-deg="vesselHeadingDeg"
    :vessel-image="VesselImage.psvTop"
  />
</template>

<style scoped>
.wind-instrument {
  height: 100%;
  width: 100%;
}
</style> 