<script setup lang="ts">
import ObcCard from '@oicl/openbridge-webcomponents-vue/components/card/ObcCard'
import DepthGraph from '@/components/DepthGraph.vue'
import ObcToggleButtonGroup from '@oicl/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup'
import ObcToggleButtonOption from '@oicl/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption'
import { ObcToggleButtonOptionType } from '@oicl/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js'
import { ref } from 'vue'
import ObcStepperBox from '@oicl/openbridge-webcomponents-vue/components/stepper-box/ObcStepperBox'
import { ObcStepperBoxType } from '@oicl/openbridge-webcomponents/dist/components/stepper-box/stepper-box.js'

const selectedType = ref('echogram')
const selector = ref<InstanceType<typeof ObcToggleButtonGroup> | null>(null)
</script>

<template>
  <ObcCard
    class="depth"
    has-dialog
    :dialog-time-out-seconds="12000"
    :dialog-visible-timer-seconds="10000"
  >
    <div slot="dialog-title">Depth</div>
    <div slot="dialog-content" class="dialog-content">
      <DepthGraph :show-real-time-depth="true" />
      <ObcToggleButtonGroup
        ref="selector"
        :value="selectedType"
        :type="ObcToggleButtonOptionType.text"
        class="toggle-button-group"
      >
        <ObcToggleButtonOption value="echogram" :type="ObcToggleButtonOptionType.text"
          >Echogram</ObcToggleButtonOption
        >
        <ObcToggleButtonOption value="depth-diagram" :type="ObcToggleButtonOptionType.text"
          >Depth diagram</ObcToggleButtonOption
        >
      </ObcToggleButtonGroup>
      <div class="settings">
        <ObcStepperBox :type="ObcStepperBoxType.leftRight" has-helper-text>
          100
          <div slot="unit">m</div>
          <div slot="helper-text">Range</div>
        </ObcStepperBox>
        <ObcStepperBox :type="ObcStepperBoxType.upDown" has-helper-text>
          auto
          <div slot="unit"></div>
          <div slot="helper-text">Depth</div>
        </ObcStepperBox>
        <ObcStepperBox :type="ObcStepperBoxType.plusMinus" has-helper-text>
          5
          <div slot="unit">m</div>
          <div slot="helper-text">Depth alert</div>
        </ObcStepperBox>
      </div>
    </div>
    <div slot="title">Depth</div>
    <DepthGraph :show-real-time-depth="false" />
  </ObcCard>
</template>

<style scoped>
.depth {
  height: 100%;
  width: 100%;
}

.dialog-content {
  height: 60vh;
  width: 70vh;
  display: flex;
  flex-direction: column;
  gap: 0px;
  margin-bottom: 16px;
}

.toggle-button-group {
  margin: 0 16px;
}

.settings {
  margin: 16px 8px;
  display: flex;
  justify-content: space-between;
}
</style>
