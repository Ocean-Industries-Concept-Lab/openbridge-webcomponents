<template>
  <template v-if="alertStatus === ObcAlertMenuItemStatus.Acknowledged">
    <template v-if="alertType === 'alarm'">
      <obi-alarm-acknowledged-iec usecsscolor class="status-icon"></obi-alarm-acknowledged-iec>
    </template>
    <template v-else-if="alertType === 'caution'">
      <obi-caution-color-iec usecsscolor class="status-icon"></obi-caution-color-iec>
    </template>
    <template v-else-if="alertType === 'warning'">
      <obi-warning-acknowledged-iec usecsscolor class="status-icon"></obi-warning-acknowledged-iec>
    </template>
  </template>
  <template v-else-if="alertStatus === ObcAlertMenuItemStatus.Unacknowledged">
    <template v-if="alertType === 'alarm'">
      <obc-alert-icon class="status-icon" type="alarm" active></obc-alert-icon>
    </template>
    <template v-else-if="alertType === 'caution'">
      <obi-caution-color-iec usecsscolor class="status-icon"></obi-caution-color-iec>
    </template>
    <template v-else-if="alertType === 'warning'">
      <obc-alert-icon class="status-icon" type="warning" active></obc-alert-icon>
    </template>
  </template>
  <template v-else-if="alertStatus === ObcAlertMenuItemStatus.Rectified">
    <template v-if="alertType === 'alarm'">
      <obi-alarm-rectified-iec usecsscolor class="status-icon"></obi-alarm-rectified-iec>
    </template>
    <template v-else-if="alertType === 'caution'">
      <obi-caution-color-iec usecsscolor class="status-icon"></obi-caution-color-iec>
    </template>
    <template v-else-if="alertType === 'warning'">
      <obi-warning-rectified-iec usecsscolor class="status-icon"></obi-warning-rectified-iec>
    </template>
  </template>
  <template v-else-if="alertStatus === ObcAlertMenuItemStatus.Caution">
    <obi-caution-color-iec usecsscolor class="status-icon"></obi-caution-color-iec>
  </template>
  <template v-else-if="alertStatus === ObcAlertMenuItemStatus.NoAckAlarm">
    <obc-alert-icon class="status-icon" type="alarm" active></obc-alert-icon>
  </template>
  <template v-else-if="alertStatus === ObcAlertMenuItemStatus.NoAckWarning">
    <obc-alert-icon class="status-icon" type="warning" active></obc-alert-icon>
  </template>
  <template v-else>
    {{ alertStatus }}
  </template>
</template>

<script setup lang="ts">
import { ObcAlertMenuItemStatus } from '@oicl/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-alarm-noack-iec.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-warning-noack-iec.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-alarm-acknowledged-iec.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-warning-acknowledged-iec.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-caution-color-iec.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-alarm-rectified-iec.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-warning-rectified-iec.js'

defineProps<{
  alertStatus: ObcAlertMenuItemStatus
  alertType: string
}>()
</script>
