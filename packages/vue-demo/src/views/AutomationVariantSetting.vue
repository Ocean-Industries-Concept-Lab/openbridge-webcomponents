<script setup lang="ts">
import ObcElevatedCardRadioGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card-radio-group/ObcElevatedCardRadioGroup.vue'
import {
  ObcElevatedCardPosition,
  ObcElevatedCardSize
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
import ObcElevatedCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'

import { computed, ref } from 'vue'
import { useDemoConfigStore } from '@/stores/demoConfig'
import { AutomationButtonVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-up-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-right-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-ias'

const showSizeOptions = ref(false)
const demoConfigStore = useDemoConfigStore()
const variant = ref(demoConfigStore.iasVariants)
const options = Object.values(AutomationButtonVariant).map((value) => {
  const label = value.charAt(0).toUpperCase() + value.slice(1)
  return { label, value }
})

const selectedOption = computed(() => {
  return options.find((option) => option.value === variant.value)?.label
})

function onChange(event: CustomEvent) {
  const newSize = event.detail.value
  demoConfigStore.iasVariants = newSize
  variant.value = newSize
}
</script>

<template>
  <div>
    <ObcElevatedCard
      has-leading-icon
      has-trailing-icon
      :size="ObcElevatedCardSize.DoubleLine"
      :position="showSizeOptions ? ObcElevatedCardPosition.Top : ObcElevatedCardPosition.Regular"
      @click="showSizeOptions = !showSizeOptions"
      :border="showSizeOptions"
    >
      <template #leading-icon>
        <obi-ias></obi-ias>
      </template>
      <template #label>
        <div>Automation button variant</div>
      </template>
      <template #description>
        <div>Set the variant of automation button in the IAS view</div>
      </template>
      <template #trailing-icon>
        <obi-chevron-up-google v-if="showSizeOptions"></obi-chevron-up-google>
        <obi-chevron-right-google v-else></obi-chevron-right-google>
      </template>
      <template #status>
        <div>{{ selectedOption }}</div>
      </template>
    </ObcElevatedCard>
    <ObcElevatedCardRadioGroup
      v-if="showSizeOptions"
      :options="options"
      :value="variant"
      @change="onChange"
    >
    </ObcElevatedCardRadioGroup>
  </div>
</template>
