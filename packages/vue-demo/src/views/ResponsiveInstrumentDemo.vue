<script setup lang="ts">
import ObcAzimuthThruster from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue'
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useJoystickControl } from '@/composables/useJoystickControl'

const angle = ref(30)
const thrust = ref(50)
const angleSetpoint = ref(0)
const thrustSetpoint = ref(0)
const { isActivated, x, y } = useJoystickControl()

const utcOffsetHours = new Date().getTimezoneOffset() / 60
let timeout: NodeJS.Timeout | null = null

onMounted(() => {
  updateTime()
  timeout = setInterval(updateTime, 1000 / 60)
})

onUnmounted(() => {
  if (timeout) {
    clearInterval(timeout)
  }
})

watch(isActivated, (newVal) => {
  if (newVal) {
    if (timeout) {
      clearInterval(timeout)
    }
    updateAzimuthThruster()
  }
})

const animationFrameId = ref<number | null>(null)
let prevTime: number | undefined = undefined

function updateAzimuthThruster() {
  angleSetpoint.value = y.value * 360
  thrustSetpoint.value = x.value * 100

  if (prevTime === undefined) {
    prevTime = performance.now()
  }
  const time = performance.now()
  const deltaTime = time - prevTime
  prevTime = time
  angle.value = angle.value + ((angleSetpoint.value - angle.value) * deltaTime) / 1000
  thrust.value = thrust.value + ((thrustSetpoint.value - thrust.value) * deltaTime) / 1000

  animationFrameId.value = requestAnimationFrame(updateAzimuthThruster)
}

function updateTime() {
  const time = Date.now()
  const clockHours = ((time / 1000 / 60 / 60) % 12) - utcOffsetHours
  const clockMinutes = (time / 1000 / 60) % 60
  let clockSeconds = (time / 1000) % 60
  angle.value = (clockHours / 12) * 360
  angleSetpoint.value = (clockMinutes / 60) * 360
  // map seconds so that the first minute it is increasing and the following minuite it is decreasing
  if (clockMinutes % 2 < 1) {
    clockSeconds = 60 - clockSeconds
  }

  // map seconds to -100 to 100 range
  thrust.value = 100 - (clockSeconds / 30) * 100
}

const thruster = ref<HTMLElement | null>(null)
const { width } = useElementSize(thruster)
</script>

<template>
  <div class="container">
    <ObcAzimuthThruster
      ref="thruster"
      class="instrument"
      :width-px="width"
      :angle="angle"
      :thrust="thrust"
      :angle-setpoint="angleSetpoint"
      :thrust-setpoint="thrustSetpoint"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  height: calc(100vh - 60px);
}

.instrument {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
