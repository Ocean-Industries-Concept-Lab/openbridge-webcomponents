import { AutomationButtonVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button.js'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useDemoConfigStore = defineStore('demoConfig', {
  state: () => ({
    iasVariants: useStorage<AutomationButtonVariant>('iasVariant', AutomationButtonVariant.flat)
  })
})
