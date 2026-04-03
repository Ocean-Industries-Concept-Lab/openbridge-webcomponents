<template>
  <div class="screen-control-container">
    <ObcToggleButtonGroup
      :value="bridgeStore.palette"
      class="palette-toggle"
      :type="ObcToggleButtonOptionType.icon"
      @value="onPaletteChange"
    >
      <ObcToggleButtonOption value="night" :type="ObcToggleButtonOptionType.icon">
        <obi-palette-night slot="icon"></obi-palette-night>
      </ObcToggleButtonOption>
      <ObcToggleButtonOption value="dusk" :type="ObcToggleButtonOptionType.icon">
        <obi-palette-dusk slot="icon"></obi-palette-dusk>
      </ObcToggleButtonOption>
      <ObcToggleButtonOption value="day" :type="ObcToggleButtonOptionType.icon">
        <obi-palette-day slot="icon"></obi-palette-day>
      </ObcToggleButtonOption>
      <ObcToggleButtonOption value="bright" :type="ObcToggleButtonOptionType.icon">
        <obi-palette-day-bright slot="icon"></obi-palette-day-bright>
      </ObcToggleButtonOption>
    </ObcToggleButtonGroup>
    <div class="screen-container">
      <div class="screen-row upper-screens">
        <ScreenComponent v-for="screen in upperScreens" :key="screen.name" :screen="screen" />
      </div>
      <div class="screen-row middle-screens">
        <ScreenComponent v-for="screen in middleScreens" :key="screen.name" :screen="screen" />
      </div>
      <div class="screen-row lower-screens">
        <ScreenComponent v-for="screen in lowerScreens" :key="screen.name" :screen="screen" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ObcToggleButtonGroup from '@oicl/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue'
import ObcToggleButtonOption from '@oicl/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue'
import { ObcToggleButtonOptionType } from '@oicl/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js'
import { useBridgeStore } from '@/stores/bridge'
import type { ObcToggleButtonGroupValueChangeEvent } from '@oicl/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js'
import type { ObcPalette } from '@oicl/openbridge-webcomponents/dist/components/brilliance-menu/brilliance-menu'
import { computed } from 'vue'
import ScreenComponent from './ScreenComponent.vue'

const bridgeStore = useBridgeStore()

const upperScreens = computed(() =>
  bridgeStore.screens.filter((screen) => screen.location === 'up')
)
const middleScreens = computed(() =>
  bridgeStore.screens.filter((screen) => screen.location === 'middle')
)
const lowerScreens = computed(() =>
  bridgeStore.screens.filter((screen) => screen.location === 'down')
)

const onPaletteChange = (value: ObcToggleButtonGroupValueChangeEvent) => {
  bridgeStore.setPalette(value.detail.value as ObcPalette)
}
</script>

<style scoped>
.screen-control-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 6fr;
  gap: 16px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.palette-toggle {
  max-width: 240px;
  justify-self: center;
  width: 100%;
}

.screen-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-top: 1px solid var(--border-divider-color);
  padding: 128px 0;
}

.screen-row {
  display: flex;
  flex-direction: row;
  gap: 16px;
}
</style>
