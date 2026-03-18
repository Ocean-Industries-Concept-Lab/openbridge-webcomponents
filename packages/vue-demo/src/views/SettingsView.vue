<script setup lang="ts">
import ObcTextInputField from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/text-input-field/ObcTextInputField.vue'
import SettingsToolbar from '@/components/SettingsToolbar.vue'
import ObcElevatedCard from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/elevated-card/ObcElevatedCard.vue'

import {
  ObcElevatedCardPosition,
  ObcElevatedCardSize
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/elevated-card/elevated-card'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-chevron-right-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-content-copy-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-license-google'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-placeholder'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-simulation'
import ComponentSizeSetting from './ComponentSizeSetting.vue'
import AutomationVariantSetting from './AutomationVariantSetting.vue'
import NavigationMenuSetting from './NavigationMenuSetting.vue'
import { useAlertStore } from '@/stores/alert'
import ZoomSetting from './ZoomSetting.vue'

const openOicl = () => {
  window.open('https://www.oicl.no', '_blank')
}

const alertStore = useAlertStore()
</script>

<template>
  <SettingsToolbar />
  <div class="wrapper">
    <ObcTextInputField has-leading-icon placeholder="Search">
      <template #leading-icon>
        <obi-search></obi-search>
      </template>
    </ObcTextInputField>
    <div class="row">
      <div class="col">
        <ObcElevatedCard
          has-trailing-icon
          :position="ObcElevatedCardPosition.Top"
          has-graphic
          border
          @click="openOicl"
        >
          <template #label> OICL </template>

          <template #trailing-icon>
            <obi-chevron-right-google></obi-chevron-right-google>
          </template>

          <template #graphic>
            <div class="logo">
              <svg
                width="96"
                height="97"
                viewBox="0 0 96 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.3999 20.2157C38.5997 4.59476 63.2435 4.59476 78.4433 20.2157C86.0338 28.0166 85.2635 38.8884 79.6537 45.8018C76.8582 49.2468 72.8785 51.6758 68.1522 52.2295C63.4327 52.7824 57.8327 51.4795 51.7863 47.2074C45.2364 42.5795 39.0134 41.1136 33.5683 41.941C28.1341 42.7668 23.6534 45.8504 20.5396 49.9819C17.2884 54.2959 15.46 59.8731 15.6212 65.3744C8.9237 50.5731 11.5166 32.4283 23.3999 20.2157Z"
                  fill="var(--element-active-color)"
                />
                <path
                  d="M80 76.0616C79.8066 76.2719 79.6107 76.4807 79.4121 76.6877C64.3055 92.4374 39.8129 92.4374 24.7064 76.6877C18.1792 69.8822 18.8322 58.9105 24.2623 51.6014C26.9443 47.9913 30.7318 45.3838 35.2562 44.6864C39.7697 43.9906 45.1946 45.1692 51.1998 49.4736C51.3214 49.5607 51.4429 49.6468 51.5644 49.7318C44.5741 73.46 66.5785 83.5872 80 76.0616Z"
                  fill="var(--element-neutral-color)"
                />
              </svg>
            </div>
          </template>
        </ObcElevatedCard>
        <ObcElevatedCard
          has-trailing-icon
          has-status
          border
          :position="ObcElevatedCardPosition.Center"
        >
          <template #label> Model </template>

          <template #status> 1.2.3456 </template>

          <template #trailing-icon>
            <obi-content-copy-google></obi-content-copy-google>
          </template>
        </ObcElevatedCard>
        <ObcElevatedCard has-trailing-icon has-status :position="ObcElevatedCardPosition.Bottom">
          <template #label> Version </template>

          <template #status> 1.2.3456 </template>

          <template #trailing-icon>
            <obi-content-copy-google></obi-content-copy-google>
          </template>
        </ObcElevatedCard>
      </div>
      <div class="col">
        <ObcElevatedCard
          has-trailing-icon
          :position="ObcElevatedCardPosition.Top"
          has-graphic
          border
        >
          <template #label> Systems and certificates </template>

          <template #trailing-icon>
            <obi-chevron-right-google></obi-chevron-right-google>
          </template>

          <template #graphic>
            <div class="logo">
              <obi-license-google></obi-license-google>
            </div>
          </template>
        </ObcElevatedCard>
        <ObcElevatedCard
          has-trailing-icon
          has-status
          border
          :position="ObcElevatedCardPosition.Center"
        >
          <template #label> Phone </template>

          <template #status> 000 00 000 </template>

          <template #trailing-icon>
            <obi-01-content-copy></obi-01-content-copy>
          </template>
        </ObcElevatedCard>
        <ObcElevatedCard has-trailing-icon has-status :position="ObcElevatedCardPosition.Bottom">
          <template #label> Mail </template>

          <template #status> abc@oicl.com </template>

          <template #trailing-icon>
            <obi-01-content-copy></obi-01-content-copy>
          </template>
        </ObcElevatedCard>
      </div>
    </div>
    <div class="divider"></div>
    <div class="group">
      <ComponentSizeSetting />
      <ZoomSetting />
      <AutomationVariantSetting />
      <NavigationMenuSetting />
      <ObcElevatedCard
        has-leading-icon
        has-action
        :size="ObcElevatedCardSize.DoubleLine"
        @action-click="alertStore.startSimulatedAlerts"
      >
        <template #leading-icon>
          <obi-simulation></obi-simulation>
        </template>
        <template #label>
          <div>Simulate alarms</div>
        </template>
        <template #description>
          <div>Simulate alarms to test the alerting system</div>
        </template>
        <template #action>Start alarms</template>
      </ObcElevatedCard>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 896px;
  margin: 0 auto;
  padding: 48px;
  padding-top: 8px;
  gap: 32px;
}

@media screen and (max-width: 768px) {
  .wrapper {
    padding: 8px;
  }
}

.logo {
  width: 100%;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo * {
  width: 96px;
  height: 96px;
  color: var(--element-neutral-color);
}

.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.col {
  flex: 1;
  min-width: 220px;
  height: fit-content;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  padding-bottom: 24px;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--border-divider-color);
}
</style>
