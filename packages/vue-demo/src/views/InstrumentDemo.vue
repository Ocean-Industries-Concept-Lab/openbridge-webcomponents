<script setup lang="ts">
import ObcAzimuthThruster from '@tibnor/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster';
import { onMounted, ref } from 'vue';

const angle = ref(30)
const thrust = ref(50)

onMounted(() => {
    const startTime = Date.now()
    setInterval(() => {
        const seconds = (Date.now() - startTime) / 1000
        angle.value = Math.sin(seconds / 2) * 30
        thrust.value = Math.sin(seconds / 3) * 50 + 50
    }, 1000/60)
})


</script>

<template>
    <div class="container">
        <!-- 10 copies -->
  <ObcAzimuthThruster class="instrument" widthPx="300" :angle="angle" :thrust="thrust" v-for="i in 10" :key="i" />
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
}

.instrument {
    display: block;
    width: 300px;
  height: 300px;
  min-width: 300px;
}

</style>

