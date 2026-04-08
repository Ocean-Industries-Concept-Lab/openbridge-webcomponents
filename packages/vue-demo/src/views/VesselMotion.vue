<script setup lang="ts">
import ObcSpeedArrows from '@oicl/openbridge-webcomponents-vue/navigation-instruments/speed-arrows/ObcSpeedArrows'
import {
  Direction,
  ActiveColor
} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/speed-arrows/speed-arrows'
import { useSim } from '../composables/useSim'
import { computed } from 'vue'
import ObcInstrumentField from '@oicl/openbridge-webcomponents-vue/navigation-instruments/instrument-field/ObcInstrumentField'
import { InstrumentFieldSize } from '@oicl/openbridge-webcomponents/dist/navigation-instruments/instrument-field/instrument-field'
const sim = useSim()

defineProps<{
  vessel: 'psv' | 'ferry'
}>()

const speedArrowsForward = computed(() =>
  Math.min(Math.ceil(Math.abs(sim.vessel.speedForwardOverGroundKnots.value / 3)), 3)
)
const speedArrowsForwardDirection = computed(() =>
  sim.vessel.speedForwardOverGroundKnots.value >= 0 ? Direction.forward : Direction.backward
)

const speedArrowsSidewaysBow = computed(() =>
  Math.min(Math.ceil(Math.abs(sim.vessel.speedSidewaysOverGroundKnotsAtBow.value / 1)), 3)
)
const speedArrowsSidewaysBowDirection = computed(() =>
  sim.vessel.speedSidewaysOverGroundKnotsAtBow.value >= 0 ? Direction.left : Direction.right
)

const speedArrowsSidewaysStern = computed(() =>
  Math.min(Math.ceil(Math.abs(sim.vessel.speedSidewaysOverGroundKnotsAtStern.value / 1)), 3)
)
const speedArrowsSidewaysSternDirection = computed(() =>
  sim.vessel.speedSidewaysOverGroundKnotsAtStern.value >= 0 ? Direction.left : Direction.right
)
</script>

<template>
  <div class="vessel-image-container">
    <div class="vessel-image">
      <svg
        v-if="vessel === 'psv'"
        width="236"
        height="920"
        viewBox="50 0 236 920"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M81.769 424.635L81.769 218.171C81.769 8.08435 168 8.08435 168 8.08435C168 8.08435 254.232 8.08434 254.232 218.171L254.232 493.456L254.232 897.141C254.232 898.245 253.336 899.141 252.232 899.141L232.674 899.141L103.327 899.141L83.769 899.141C82.6645 899.141 81.769 898.245 81.769 897.141L81.769 424.635Z"
          fill="var(--instrument-frame-primary-color)"
        />
        <path
          d="M81.769 424.635L110.513 381.169L110.513 344.947L229.081 344.947L229.081 468.101L254.232 493.456M254.232 493.456L254.232 897.141C254.232 898.245 253.336 899.141 252.232 899.141L232.674 899.141L103.327 899.141L83.769 899.141C82.6645 899.141 81.769 898.245 81.769 897.141L81.769 218.171C81.769 8.08435 168 8.08434 168 8.08434C168 8.08434 254.232 8.08434 254.232 218.171L254.232 493.456Z"
          stroke="var(--instrument-tick-mark-tertiary-color)"
        />
        <path
          d="M110.513 302.708L67.397 302.708L67.397 245.22L110.513 216.477L139.256 144.617L196.744 144.617L225.488 216.477L268.603 245.22L268.603 302.708L225.488 302.708L203.93 324.266L132.07 324.266L110.513 302.708Z"
          fill="var(--instrument-frame-primary-color)"
        />
        <path
          d="M132.07 324.266L110.513 302.708L67.397 302.708L67.397 245.22L110.513 216.477L139.256 144.617M132.07 324.266L203.93 324.266M132.07 324.266L132.07 223.662C133.753 195.51 139.256 144.617 139.256 144.617M203.93 324.266L225.488 302.708L268.603 302.708L268.603 245.22L225.488 216.477L196.744 144.617M203.93 324.266L203.93 223.662C202.247 195.51 196.744 144.617 196.744 144.617M196.744 144.617L139.256 144.617"
          stroke="var(--instrument-tick-mark-tertiary-color)"
        />
        <path
          d="M203.93 265.979L203.93 301.909L189.558 309.095L146.442 309.095L132.07 301.909L132.07 265.979L146.442 287.537L189.558 287.537L203.93 265.979Z"
          fill="var(--instrument-frame-primary-color)"
        />
        <path
          d="M189.558 287.537L203.93 265.979L203.93 301.909L189.558 309.095M189.558 287.537L146.442 287.537M189.558 287.537L189.558 309.095M146.442 287.537L132.07 265.979L132.07 301.909L146.442 309.095M146.442 287.537L146.442 309.095M146.442 309.095L189.558 309.095"
          stroke="var(--instrument-tick-mark-tertiary-color)"
        />
        <rect
          x="110"
          y="80"
          width="120"
          height="130"
          fill="var(--instrument-frame-primary-color)"
        />
      </svg>
      <svg v-else viewBox="65 0 30 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M80.0007 151.999C73.373 152 68 146.627 68 139.999L68 128.776L68 104.642L68 56.7557L68 19.9992C68 13.3717 73.3726 7.99916 80 7.99916C86.6274 7.99916 92 13.3717 92 19.9992L92 23.108L92 56.7557L92 108.092L92 137.357L92 139.999C92 146.626 86.6278 151.999 80.0007 151.999Z"
          fill="var(--instrument-frame-primary-color)"
        />
        <path
          d="M85.8387 85.9422L73.9677 85.9422L73.9677 74.336L85.8387 74.336L85.8387 85.9422Z"
          fill="var(--instrument-frame-primary-color)"
        />
        <path
          d="M92 108.092L86.2419 108.092M92 108.092L92 56.7557M92 108.092L92 137.357M86.2419 108.092L84.4516 104.642L72.9355 104.642L68 104.642M86.2419 108.092L86.2419 137.357L92 137.357M68 104.642L68 128.776L68 139.999C68 146.627 73.373 152 80.0007 151.999V151.999C86.6278 151.999 92 146.626 92 139.999L92 137.357M68 104.642L68 56.7557M68 56.7557L68 19.9992C68 13.3717 73.3726 7.99916 80 7.99916V7.99916V7.99916C86.6274 7.99916 92 13.3717 92 19.9992L92 23.108M68 56.7557L86.2419 56.7557M92 56.7557L86.2419 56.7557M92 56.7557L92 23.108M86.2419 56.7557L86.2419 23.108L92 23.108M73.9677 85.9422L85.8387 85.9422M73.9677 85.9422L73.9677 74.336M73.9677 85.9422L76.5806 83.424M85.8387 85.9422L85.8387 74.336M85.8387 85.9422L83.2258 83.424M85.8387 74.336L73.9677 74.336M85.8387 74.336L83.2258 76.8541M73.9677 74.336L76.5806 76.8541M76.5806 83.424L83.2258 83.424M76.5806 83.424L76.5806 76.8541M83.2258 83.424L83.2258 76.8541M83.2258 76.8541L76.5806 76.8541"
          vector-effect="non-scaling-stroke"
          stroke="var(--instrument-tick-mark-tertiary-color)"
        />
        <rect x="70" y="15" width="20" height="20" fill="var(--instrument-frame-primary-color)" />
        <rect x="70" y="125" width="20" height="20" fill="var(--instrument-frame-primary-color)" />
        <rect x="70" y="70" width="20" height="20" fill="var(--instrument-frame-primary-color)" />
      </svg>
    </div>
    <ObcSpeedArrows
      class="speed-arrows bow-sideways"
      :class="{ reverse: sim.vessel.speedSidewaysOverGroundKnotsAtBow.value < 0 }"
      :speed-knots="Math.abs(sim.vessel.speedSidewaysOverGroundKnotsAtBow.value)"
      :direction="speedArrowsSidewaysBowDirection"
      :n-active-arrows="speedArrowsSidewaysBow"
      :active-color="ActiveColor.Regular"
      :tinted-arrows="true"
    />
    <ObcSpeedArrows
      class="speed-arrows forward"
      :class="{ reverse: sim.vessel.speedForwardOverGroundKnots.value < 0 }"
      :speed-knots="Math.abs(sim.vessel.speedForwardOverGroundKnots.value)"
      :direction="speedArrowsForwardDirection"
      :n-active-arrows="speedArrowsForward"
      :active-color="ActiveColor.Regular"
      :tinted-arrows="true"
    />

    <ObcSpeedArrows
      class="speed-arrows stern-sideways"
      :class="{ reverse: sim.vessel.speedSidewaysOverGroundKnotsAtStern.value < 0 }"
      :speed-knots="Math.abs(sim.vessel.speedSidewaysOverGroundKnotsAtStern.value)"
      :direction="speedArrowsSidewaysSternDirection"
      :n-active-arrows="speedArrowsSidewaysStern"
      :active-color="ActiveColor.Regular"
      :tinted-arrows="true"
    />
    <ObcInstrumentField
      class="speed-readout forward"
      :value="Math.abs(sim.vessel.speedForwardOverGroundKnots.value)"
      :max-digits="2"
      :fraction-digits="0"
      :size="InstrumentFieldSize.enhanced"
      tag="Bow"
      unit="kn"
      neutral-color
      center
      show-zero-padding
    />
    <ObcInstrumentField
      class="speed-readout bow-sideways"
      :value="Math.abs(sim.vessel.speedSidewaysOverGroundKnotsAtBow.value)"
      :max-digits="2"
      :fraction-digits="0"
      :size="InstrumentFieldSize.enhanced"
      tag="Bow"
      unit="kn"
      neutral-color
      center
      show-zero-padding
    />
    <ObcInstrumentField
      class="speed-readout stern-sideways"
      :value="Math.abs(sim.vessel.speedSidewaysOverGroundKnotsAtStern.value)"
      :max-digits="2"
      :fraction-digits="0"
      :size="InstrumentFieldSize.enhanced"
      tag="Aft"
      unit="kn"
      neutral-color
      center
      show-zero-padding
    />
  </div>
</template>

<style scoped>
.vessel-image-container {
  position: relative;
  display: grid;
  height: 80%;
  width: 100%;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: repeat(5, 20%);
  justify-content: center;
  align-items: center;
}

.vessel-image {
  grid-column: 2 / 3;
  grid-row: 2 / -2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    max-width: 100%;
    max-height: 100%;
  }
}

.speed-arrows {
  justify-self: center;
  align-self: center;
}

.speed-arrows.bow-sideways {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  justify-self: end;
}

.speed-arrows.bow-sideways.reverse {
  grid-column: 3 / 4;
  justify-self: start;
}

.speed-arrows.forward {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  align-self: end;
}

.speed-arrows.forward.reverse {
  grid-row: -2 / -1;
  align-self: start;
}

.speed-arrows.stern-sideways {
  grid-column: 1 / 2;
  grid-row: 4 / 5;
  justify-self: end;
}

.speed-arrows.stern-sideways.reverse {
  grid-column: 3 / 4;
  justify-self: start;
}

.speed-readout {
  grid-column: 2 / 3;
  justify-self: center;
  align-self: center;
}

.speed-readout.forward {
  grid-row: 3 / 4;
}

.speed-readout.bow-sideways {
  grid-row: 2 / 3;
}

.speed-readout.stern-sideways {
  grid-row: 4 / 5;
}
</style>
