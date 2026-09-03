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
import { useDemoConfigStore } from '@/stores/demoConfig'

const demoConfigStore = useDemoConfigStore()

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
