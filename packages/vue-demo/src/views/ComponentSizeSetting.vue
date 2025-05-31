<script setup lang="ts">
import SettingCard from '@/components/SettingCard.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize-corner'
import { ref } from 'vue'
import { ComponentSize, useDemoConfigStore } from '@/stores/demoConfig'

const demoConfigStore = useDemoConfigStore()
const size = ref(demoConfigStore.componentSize)

const sizeOptions = [
  { label: 'Regular', value: ComponentSize.Regular },
  { label: 'Medium', value: ComponentSize.Medium },
  { label: 'Large', value: ComponentSize.Large },
  { label: 'XL', value: ComponentSize.XL }
]

function onSizeChange(newSize: unknown) {
  size.value = newSize as ComponentSize
  demoConfigStore.componentSize = newSize as ComponentSize
}
</script>

<template>
  <SettingCard
    leading-icon="obi-resize-corner"
    label="Component size"
    description="Set the global component size"
    :options="sizeOptions"
    :value="size"
    @change="onSizeChange"
  />
</template>
