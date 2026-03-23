import { AutomationButtonVariant } from '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export enum ComponentSize {
  Regular = 'regular',
  Medium = 'medium',
  Large = 'large',
  XL = 'xl'
}

export enum NavigationMenuVariant {
  Normal = 'normal',
  RailIcon = 'rail-icon',
  RailIconLarge = 'rail-icon-large',
  Compact = 'compact'
}

export const useDemoConfigStore = defineStore('demoConfig', {
  state: () => ({
    iasVariants: useStorage<AutomationButtonVariant>('iasVariant', AutomationButtonVariant.flat),
    componentSize: useStorage<ComponentSize>('componentSize', ComponentSize.Regular),
    navigationMenuVariant: useStorage<NavigationMenuVariant>(
      'navigationMenuVariant',
      NavigationMenuVariant.Normal
    ),
    hasCommand: useStorage<boolean>('hasCommand', true),
    zoomLevel: useStorage<number>('zoomLevel', 1)
  })
})
