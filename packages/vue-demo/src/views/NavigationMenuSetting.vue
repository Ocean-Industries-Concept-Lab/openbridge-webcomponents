<script setup lang="ts">
import ObcElevatedCardRadioGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card-radio-group/ObcElevatedCardRadioGroup.vue'
import {
  ObcElevatedCardPosition,
  ObcElevatedCardSize
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
import ObcElevatedCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-up-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-right-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-menu-iec.js'

import { computed, ref } from 'vue'
import { NavigationMenuVariant, useDemoConfigStore } from '@/stores/demoConfig'

const showOptions = ref(false)
const demoConfigStore = useDemoConfigStore()
const value = ref(demoConfigStore.navigationMenuVariant)

const options = [
  { label: 'Normal (hidden/full)', value: NavigationMenuVariant.Normal },
  { label: 'Compact rail (compact/full)', value: NavigationMenuVariant.Compact },
  { label: 'Icon large rail (icon large/full)', value: NavigationMenuVariant.RailIconLarge },
  { label: 'Icon rail (icon/full)', value: NavigationMenuVariant.RailIcon },
]


const activeLabel = computed(() => {
  return options.find((option) => option.value === value.value)?.label
})

function onValueChange(event: CustomEvent) {
  const newValue = event.detail.value
  value.value = newValue
  demoConfigStore.navigationMenuVariant = newValue
}
</script>

<template>
  <div>
    <ObcElevatedCard
      has-leading-icon
      has-trailing-icon
      :size="ObcElevatedCardSize.DoubleLine"
      :position="showOptions ? ObcElevatedCardPosition.Top : ObcElevatedCardPosition.Regular"
      @click="showOptions = !showOptions"
      :border="showOptions"
    >
      <template #leading-icon>
        <obi-menu-iec></obi-menu-iec>
      </template>
      <template #label>
        <div>Navigation menu type</div>
      </template>

      <template #trailing-icon>
        <obi-chevron-up-google v-if="showOptions"></obi-chevron-up-google>
        <obi-chevron-right-google v-else></obi-chevron-right-google>
      </template>
      <template #status>
        <div>{{ activeLabel }}</div>
      </template>
    </ObcElevatedCard>
    <ObcElevatedCardRadioGroup
      v-if="showOptions"
      :options="options"
      :value="value"
      @change="onValueChange"
    >
    </ObcElevatedCardRadioGroup>
  </div>
</template>
