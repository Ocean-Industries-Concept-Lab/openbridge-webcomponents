<script setup lang="ts">
import ObcElevatedCardRadioGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card-radio-group/ObcElevatedCardRadioGroup.vue'
import {
  ObcElevatedCardPosition,
  ObcElevatedCardSize
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
import ObcElevatedCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-up-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-right-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize-corner'

import { computed, ref } from 'vue'
import { ComponentSize, useDemoConfigStore } from '@/stores/demoConfig'

const showSizeOptions = ref(false)
const demoConfigStore = useDemoConfigStore()
const size = ref(demoConfigStore.componentSize)

const sizeOptions = [
  { label: 'Regular', value: ComponentSize.Regular },
  { label: 'Medium', value: ComponentSize.Medium },
  { label: 'Large', value: ComponentSize.Large },
  { label: 'XL', value: ComponentSize.XL }
]

const activeSizeLabel = computed(() => {
  return sizeOptions.find((option) => option.value === size.value)?.label
})

function onSizeChange(event: CustomEvent) {
  const newSize = event.detail.value
  size.value = newSize
  demoConfigStore.componentSize = newSize
}
</script>

<template>
  <div>
    <ObcElevatedCard
      has-leading-icon
      has-trailing-icon
      :size="ObcElevatedCardSize.DoubleLine"
      :position="showSizeOptions ? ObcElevatedCardPosition.Top : ObcElevatedCardPosition.Regular"
      :border="showSizeOptions"
      @click="showSizeOptions = !showSizeOptions"
    >
      <template #leading-icon>
        <obi-resize-corner></obi-resize-corner>
      </template>
      <template #label>
        <div>Component size</div>
      </template>
      <template #description>
        <div>Set the global component size</div>
      </template>
      <template #trailing-icon>
        <obi-chevron-up-google v-if="showSizeOptions"></obi-chevron-up-google>
        <obi-chevron-right-google v-else></obi-chevron-right-google>
      </template>
      <template #status>
        <div>{{ activeSizeLabel }}</div>
      </template>
    </ObcElevatedCard>
    <ObcElevatedCardRadioGroup
      v-if="showSizeOptions"
      :options="sizeOptions"
      :value="size"
      @change="onSizeChange"
    >
    </ObcElevatedCardRadioGroup>
  </div>
</template>
