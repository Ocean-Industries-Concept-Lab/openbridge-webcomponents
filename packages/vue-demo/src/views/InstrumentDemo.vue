<script setup lang="ts">
import ObcAzimuthThruster from '@oicl/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue'
import ObcThruster from '@oicl/openbridge-webcomponents-vue/navigation-instruments/thruster/ObcThruster.vue'
import { AdviceType } from '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch/advice'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const angle = ref(30)
const angleSetpoint = ref(-20)
const thrust = ref(50)
const thrustSetpoint = ref(50)

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
</script>

<template>
  <div class="container">
    <div class="ship">
      <svg viewBox="0 0 320 985" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_1_1834" fill="white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M320 231.332C320 125.694 253.456 35.5986 160 0.675873C66.558 35.5932 0.0205697 125.666 4.76837e-06 231.283L0 985H320V231.332Z"
          />
        </mask>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M320 231.332C320 125.694 253.456 35.5986 160 0.675873C66.558 35.5932 0.0205697 125.666 4.76837e-06 231.283L0 985H320V231.332Z"
          fill="var(--normal-enabled-background-color)"
        />
        <path
          d="M160 0.675873L160.35 -0.260862L160 -0.391665L159.65 -0.260862L160 0.675873ZM4.76837e-06 231.283L-0.999995 231.283L-0.999995 231.283L4.76837e-06 231.283ZM0 985L-1 985L-1 986H0V985ZM320 985V986H321V985H320ZM159.65 1.61261C252.728 36.394 319 126.125 319 231.332H321C321 125.263 254.185 34.8032 160.35 -0.260862L159.65 1.61261ZM159.65 -0.260862C65.8299 34.7977 -0.979346 125.235 -0.999995 231.283L1 231.283C1.02049 126.097 67.2861 36.3887 160.35 1.61261L159.65 -0.260862ZM1 985L1 231.283L-0.999995 231.283L-1 985L1 985ZM320 984H0V986H320V984ZM319 231.332V985H321V231.332H319Z"
          fill="var(--instrument-frame-tertiary-color)"
          mask="url(#path-1-inside-1_1_1834)"
        />
      </svg>

      <ObcThruster class="tunnel1" :thrust="10" :setpoint="10" tunnel />

      <ObcThruster class="tunnel2" :thrust="5" :setpoint="5" tunnel />

      <ObcAzimuthThruster
        class="instrument"
        :angle="angle"
        :angle-setpoint="angleSetpoint"
        :thrust="thrust"
        :thrust-setpoint="thrustSetpoint"
        :thrust-advices="[
          { min: 40, max: 60, type: AdviceType.advice, hinted: false },
          { min: 80, max: 100, type: AdviceType.caution, hinted: false }
        ]"
        :angle-advices="[
          { minAngle: 320, maxAngle: 350, type: AdviceType.advice, hinted: false },
          { minAngle: 20, maxAngle: 40, type: AdviceType.caution, hinted: false }
        ]"
      />

      <ObcThruster class="main1" :thrust="50" :setpoint="50" />

      <ObcThruster class="main2" :thrust="50" :setpoint="50" />
    </div>
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
  background-color: var(--container-background-color, #f7f7f7);
  overflow: hidden;
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
  position: absolute;
  top: 50%;
  left: 50%;
  max-height: 80vh;
  max-width: 80%;
  transform: translate(-50%, -50%);
}

.ship svg {
  width: 100%;
  max-height: 80vh;
}
</style>
