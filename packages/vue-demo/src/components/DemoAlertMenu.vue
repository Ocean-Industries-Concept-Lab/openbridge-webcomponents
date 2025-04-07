<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import AlertMenu, { type ObcAckAllVisibleClickEvent } from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/alert-menu/ObcAlertMenu.vue'
import AlertMenuItem from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/alert-menu-item/ObcAlertMenuItem.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-icon/alert-icon'
import { useRouter } from 'vue-router'
import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js'
const model = defineModel<boolean>()

const alertStore = useAlertStore()

const router = useRouter()

function onAlertListClick() {
  router.push({ name: 'alert' })
  if (model.value) {
    model.value = false
  }
}

function onAckAllVisibleClick(event: ObcAckAllVisibleClickEvent) {
  console.log('onAckAllVisibleClick', event)
  let unackedAlerts;
  if (event.detail.tabName === 'unacked') {
    unackedAlerts = [...alertStore.unackedAlerts]
  } else {
    unackedAlerts = [...alertStore.activeAlerts]
  }
  event.detail.visibleElements.forEach(({ index }) => {
    const item = unackedAlerts[index]
    if (item && item.alertStatus === ObcAlertMenuItemStatus.Unacknowledged) {
      item.alertStatus = ObcAlertMenuItemStatus.Acknowledged
    }
  })
}
</script>

<template>
  <AlertMenu
v-if="model" class="alert-menu" :empty="alertStore.unackedAlerts.length === 0"
    :can-ack-all="alertStore.unackedAlerts.length > 0" :can-silence="!alertStore.silenced"
    @ack-all-visible-click="onAckAllVisibleClick" @go-to-alert-list-click="onAlertListClick"
    @silence-click="alertStore.muteAllAlerts">
    <template v-if="alertStore.unackedAlerts.length > 0" #unacked>
      <AlertMenuItem
v-for="a of alertStore.unackedAlerts" :key="a.tag" has-time
        @ack-click="() => (a.alertStatus = ObcAlertMenuItemStatus.Acknowledged)">
        <template #alert-icon>
          <obc-alert-icon name="alarm-unack"></obc-alert-icon>
        </template>
        <template #title>
          {{ a.title }}
        </template>
        <template #description>
          {{ a.description }}
        </template>
        <template #time>
          {{ a.time.toLocaleTimeString('en-UK') }}
        </template>
      </AlertMenuItem>
    </template>
    <template v-if="alertStore.activeAlerts.length > 0" #all>
      <AlertMenuItem
v-for="a of alertStore.activeAlerts" :key="a.tag" has-time
        :status="a.alertStatus" @ack-click="() => (a.alertStatus = ObcAlertMenuItemStatus.Acknowledged)">
        <template #alert-icon>
          <template v-if="a.alertStatus === ObcAlertMenuItemStatus.Acknowledged">
            <template v-if="a.alertType === 'alarm'">
              <obi-alarm-acknowledged-iec usecsscolor class="status-icon"></obi-alarm-acknowledged-iec>
            </template>
            <template v-else-if="a.alertType === 'caution'">
              <obi-caution-color usecsscolor class="status-icon"></obi-caution-color>
            </template>
            <template v-else-if="a.alertType === 'warning'">
              <obi-warning-acknowledged-iec usecsscolor class="status-icon"></obi-warning-acknowledged-iec>
            </template>
          </template>
          <template v-else-if="a.alertStatus === ObcAlertMenuItemStatus.Unacknowledged">
            <template v-if="a.alertType === 'alarm'">
              <obc-alert-icon class="status-icon" name="alarm-unack"></obc-alert-icon>
            </template>
            <template v-else-if="a.alertType === 'caution'">
              <obi-caution-color usecsscolor class="status-icon"></obi-caution-color>
            </template>
            <template v-else-if="a.alertType === 'warning'">
              <obc-alert-icon class="status-icon" name="warning-unack"></obc-alert-icon>
            </template>
          </template>
          <template v-else-if="a.alertStatus === ObcAlertMenuItemStatus.Rectified">
            <template v-if="a.alertType === 'alarm'">
              <obi-alarm-rectified-iec usecsscolor class="status-icon"></obi-alarm-rectified-iec>
            </template>
            <template v-else-if="a.alertType === 'caution'">
              <obi-caution-color-iec usecsscolor class="status-icon"></obi-caution-color-iec>
            </template>
            <template v-else-if="a.alertType === 'warning'">
              <obi-warning-rectified-iec usecsscolor class="status-icon"></obi-warning-rectified-iec>
            </template>
          </template>
        </template>
        <template #title>
          {{ a.title }}
        </template>
        <template #description>
          {{ a.description }}
        </template>
        <template #time>
          {{ a.time.toLocaleTimeString('en-UK') }}
        </template>
      </AlertMenuItem>
    </template>
  </AlertMenu>
</template>
