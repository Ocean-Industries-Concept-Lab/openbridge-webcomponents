<script setup lang="ts">
import ObcElevatedCardRadioGroup from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card-radio-group/ObcElevatedCardRadioGroup.vue'
import {
  ObcElevatedCardPosition,
  ObcElevatedCardSize
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
import ObcElevatedCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-up-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-right-google'

import { computed, ref } from 'vue'

export interface SettingOption<T = unknown> {
  label: string
  value: T
}

export interface SettingCardProps<T = unknown> {
  leadingIcon: string
  label: string
  description?: string
  options: SettingOption<T>[]
  value: T
}

const props = defineProps<SettingCardProps>()

const emit = defineEmits<{
  change: [value: unknown]
}>()

const showOptions = ref(false)

// Convert complex value types to strings for the radio group component
const stringOptions = computed(() => {
  return props.options.map((option) => ({
    label: option.label,
    value: String(option.value)
  }))
})

const stringValue = computed(() => String(props.value))

const activeLabel = computed(() => {
  return props.options.find((option) => option.value === props.value)?.label
})

function onValueChange(event: CustomEvent) {
  const stringValue = event.detail.value
  // Find the original value from the string representation
  const originalOption = props.options.find((option) => String(option.value) === stringValue)
  if (originalOption) {
    emit('change', originalOption.value)
  }
}
</script>

<template>
  <div>
    <ObcElevatedCard
      has-leading-icon
      has-trailing-icon
      :size="ObcElevatedCardSize.DoubleLine"
      :position="showOptions ? ObcElevatedCardPosition.Top : ObcElevatedCardPosition.Regular"
      :border="showOptions"
      @click="showOptions = !showOptions"
    >
      <template #leading-icon>
        <component :is="leadingIcon"></component>
      </template>
      <template #label>
        <div>{{ label }}</div>
      </template>
      <template v-if="description" #description>
        <div>{{ description }}</div>
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
      :options="stringOptions"
      :value="stringValue"
      @change="onValueChange"
    >
    </ObcElevatedCardRadioGroup>
  </div>
</template>
