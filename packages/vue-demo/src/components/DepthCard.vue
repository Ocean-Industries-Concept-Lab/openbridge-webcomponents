<script setup lang="ts">
import ObcCard from '@oicl/openbridge-webcomponents-vue/components/card/ObcCard.vue'
import DepthGraph from '@/components/DepthGraph.vue'
import ObcToggleButtonGroup from '@oicl/openbridge-webcomponents-vue/components/toggle-button-group/ObcToggleButtonGroup.vue'
import ObcToggleButtonOption from '@oicl/openbridge-webcomponents-vue/components/toggle-button-option/ObcToggleButtonOption.vue'
import { ObcToggleButtonOptionType } from '@oicl/openbridge-webcomponents/dist/components/toggle-button-option/toggle-button-option.js'
import { ref } from 'vue'
import ObcStepperBox from '@oicl/openbridge-webcomponents-vue/components/stepper-box/ObcStepperBox.vue'
import { ObcStepperBoxType } from '@oicl/openbridge-webcomponents/dist/components/stepper-box/stepper-box.js'

const selectedType = ref('echogram')
const selector = ref<InstanceType<typeof ObcToggleButtonGroup> | null>(null)
const rangeValue = ref(100)
const depthValue = ref(0)
const depthAlertValue = ref(5)

function onRangeChange(event: CustomEvent<{value: number}>) {
  rangeValue.value = event.detail.value
}

function onDepthChange(event: CustomEvent<{value: number}>) {
  depthValue.value = event.detail.value
}

function onDepthAlertChange(event: CustomEvent<{value: number}>) {
  depthAlertValue.value = event.detail.value
}
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
        <ObcStepperBox
          :type="ObcStepperBoxType.leftRight"
          :value="rangeValue"
          unit="m"
          helper-text="Range"
          @change="onRangeChange"
        />
        <ObcStepperBox
          :type="ObcStepperBoxType.upDown"
          :value="depthValue"
          placeholder="auto"
          readonly
          helper-text="Depth"
          @change="onDepthChange"
        />
        <ObcStepperBox
          :type="ObcStepperBoxType.plusMinus"
          :value="depthAlertValue"
          unit="m"
          helper-text="Depth alert"
          @change="onDepthAlertChange"
        />
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
