import { AutomationButtonVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/automation-button/automation-button.js'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export enum ComponentSize {
  Regular = 'regular',
  Medium = 'medium',
  Large = 'large',
  XL = 'xl'
}

export const useDemoConfigStore = defineStore('demoConfig', {
  state: () => ({
    iasVariants: useStorage<AutomationButtonVariant>('iasVariant', AutomationButtonVariant.flat),
    componentSize: useStorage<ComponentSize>('componentSize', ComponentSize.Regular)
  })
})
