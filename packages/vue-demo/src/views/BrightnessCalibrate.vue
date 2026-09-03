<template>
  <div class="container">
    <h1>Brightness blend: {{ Math.round(demoConfigStore.brightnessBlend) }}%</h1>
    <p class="hint">0% is the day palette, 100% is the bright palette.</p>
    <ObcSlider
      :value="demoConfigStore.brightnessBlend"
      :min="0"
      :max="100"
      :step="1"
      @value="onBlendChange"
    />

    <div class="instruments">
      <ObcCard class="instrument" :show-title="true">
        <span slot="title">Compass</span>
        <ObcCompass
          :heading="34"
          :course-over-ground="42"
          :vessel-image="VesselImage.psvTop"
          :face-diameter="FACE_DIAMETER"
          :state="InstrumentState.active"
          :priority="Priority.enhanced"
        />
      </ObcCard>

      <ObcCard
        v-for="azimuth in azimuths"
        :key="azimuth.caption"
        class="instrument"
        :show-title="true"
      >
        <span slot="title">{{ azimuth.caption }}</span>
        <ObcAzimuthThruster
          :angle="30"
          :thrust="60"
          :face-diameter="FACE_DIAMETER"
          :state="azimuth.state"
          :priority="azimuth.priority"
        />
      </ObcCard>

      <ObcCard class="instrument" :show-title="true">
        <span slot="title">Readout</span>
        <ObcReadout
          :value="12.4"
          label="Speed"
          unit="KN"
          :has-value="true"
          :fraction-digits="1"
          :size="ReadoutSize.large"
          :direction="ReadoutDirection.vertical"
        />
      </ObcCard>
    </div>

    <div class="swatches">
      <div v-for="token in tokens" :key="token" class="swatch">
        <div class="chip" :style="{ backgroundColor: `var(${token})` }"></div>
        <span>{{ token }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ObcSlider from '@oicl/openbridge-webcomponents-vue/components/slider/ObcSlider.vue'
import ObcCard from '@oicl/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import ObcCompass from '@oicl/openbridge-webcomponents-vue/navigation-instruments/compass/ObcCompass.vue'
import ObcAzimuthThruster from '@oicl/openbridge-webcomponents-vue/navigation-instruments/azimuth-thruster/ObcAzimuthThruster.vue'
import ObcReadout from '@oicl/openbridge-webcomponents-vue/navigation-instruments/readout/ObcReadout.vue'
import {
  ReadoutDirection,
  ReadoutSize
} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/readout/readout'
import {
  InstrumentState,
  Priority
} from '@oicl/openbridge-webcomponents/dist/navigation-instruments/types'
import { VesselImage } from '@oicl/openbridge-webcomponents/dist/navigation-instruments/watch/vessel'
import { useDemoConfigStore } from '@/stores/demoConfig'

const demoConfigStore = useDemoConfigStore()

// The instruments size themselves from their container; without an explicit
// face diameter they collapse to zero height in this flex layout.
const FACE_DIAMETER = 200

// The three instrument treatments react differently to the palette, which is
// the point of showing them side by side.
const azimuths = [
  { caption: 'Azimuth enhanced', state: InstrumentState.active, priority: Priority.enhanced },
  { caption: 'Azimuth regular', state: InstrumentState.active, priority: Priority.regular },
  { caption: 'Azimuth off', state: InstrumentState.off, priority: Priority.regular }
]

// A spread of tokens with visibly different day/bright values, so the blend is
// observable on this page and not only in the surrounding app chrome.
const tokens = [
  '--container-global-color',
  '--container-background-color',
  '--container-section-color',
  '--container-backdrop-color',
  '--border-outline-color',
  '--border-divider-color',
  '--element-active-color',
  '--element-neutral-color',
  '--element-inactive-color'
]

function onBlendChange(event: CustomEvent<number>) {
  demoConfigStore.brightnessBlend = event.detail
}
</script>

<style scoped>
.container {
  padding: 20px;
  color: var(--element-active-color);
}

.hint {
  color: var(--element-neutral-color);
}

.instruments {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 24px;
  margin-top: 32px;
}

.instrument {
  width: 280px;
  flex: 0 0 auto;
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
}

.swatch {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  color: var(--element-neutral-color);
}

.chip {
  width: 120px;
  height: 72px;
  border: 1px solid var(--border-outline-color);
  border-radius: 4px;
}
</style>
