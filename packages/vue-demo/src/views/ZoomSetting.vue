<script setup lang="ts">
import SettingCard from '@/components/SettingCard.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-resize-corner'
import { ref } from 'vue'
import { useDemoConfigStore } from '@/stores/demoConfig'

const demoConfigStore = useDemoConfigStore()
const zoomLevel = ref(demoConfigStore.zoomLevel)

const zoomLevelOptions = [
  { label: '100%', value: 1 },
  { label: '125%', value: 1.25 },
  { label: '150%', value: 1.5 },
  { label: '175%', value: 1.75 },
  { label: '200%', value: 2 }
]

function onZoomLevelChange(newZoomLevel: unknown) {
  zoomLevel.value = newZoomLevel as number
  demoConfigStore.zoomLevel = newZoomLevel as number
}
</script>

<template>
  <SettingCard
    leading-icon="obi-resize-corner"
    label="Zoom level"
    description="Set the global zoom level"
    :options="zoomLevelOptions"
    :value="zoomLevel"
    @change="onZoomLevelChange"
  />
</template>
