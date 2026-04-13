<script setup lang="ts">
import SettingCard from '@/components/SettingCard.vue'
import { ref } from 'vue'
import { useDemoConfigStore } from '@/stores/demoConfig'
import { AutomationButtonVariant } from '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button'
import '@oicl/openbridge-webcomponents/dist/icons/icon-ias'

const demoConfigStore = useDemoConfigStore()
const variant = ref(demoConfigStore.iasVariants)
const options = Object.values(AutomationButtonVariant).map((value) => {
  const label = value.charAt(0).toUpperCase() + value.slice(1)
  return { label, value }
})

function onChange(newValue: unknown) {
  demoConfigStore.iasVariants = newValue as AutomationButtonVariant
  variant.value = newValue as AutomationButtonVariant
}
</script>

<template>
  <SettingCard
    leading-icon="obi-ias"
    label="Automation button variant"
    description="Set the variant of automation button in the IAS view"
    :options="options"
    :value="variant"
    @change="onChange"
  />
</template>
