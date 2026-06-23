<script setup lang="ts">
import SettingCard from '@/components/SettingCard.vue'
import '@oicl/openbridge-webcomponents/dist/icons/icon-menu-iec.js'
import { ref } from 'vue'
import { NavigationMenuVariant, useDemoConfigStore } from '@/stores/demoConfig'

const demoConfigStore = useDemoConfigStore()
const value = ref(demoConfigStore.navigationMenuVariant)

const options = [
  { label: 'Normal (hidden/full)', value: NavigationMenuVariant.Normal },
  { label: 'Compact rail (compact/full)', value: NavigationMenuVariant.Compact },
  { label: 'Icon large rail (icon large/full)', value: NavigationMenuVariant.RailIconLarge },
  { label: 'Icon rail (icon/full)', value: NavigationMenuVariant.RailIcon }
]

function onValueChange(newValue: unknown) {
  value.value = newValue as NavigationMenuVariant
  demoConfigStore.navigationMenuVariant = newValue as NavigationMenuVariant
}
</script>

<template>
  <SettingCard
    leading-icon="obi-menu-iec"
    label="Navigation menu type"
    :options="options"
    :value="value"
    @change="onValueChange"
  />
</template>
