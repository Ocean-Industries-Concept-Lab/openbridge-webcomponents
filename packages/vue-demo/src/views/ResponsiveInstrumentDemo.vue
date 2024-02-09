<script setup lang="ts">
import ObcAzimuthThruster from '@tibnor/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster';
import { onMounted, ref } from 'vue';
import { useElementSize } from '@vueuse/core';

const angle = ref(30)
const thrust = ref(50)
const angleSetpoint = ref(0)

onMounted(() => {
    setInterval(() => {
        const time = Date.now()
        const clockHours = (time / 1000 / 60 / 60) % 12
        const clockMinutes = (time / 1000 / 60) % 60
        const clockSeconds = (time / 1000) % 60
        angle.value = clockHours / 12 * 360
        angleSetpoint.value = clockMinutes / 60 * 360
        thrust.value = (100-clockSeconds / 30 * 100)
    }, 1000/60)
})

const thruster = ref<ObcAzimuthThruster | null>(null)
const { width } = useElementSize(thruster)

</script>

<template>
  <div class="container">
    <ObcAzimuthThruster ref="thruster" class="instrument" :widthPx="width" :angle="angle" :thrust="thrust" :angle-setpoint="angleSetpoint"/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  background-color: var(--container-background-color);
}

.instrument {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

