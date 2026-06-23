<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import AlertMenu, {
  type ObcAckAllVisibleClickEvent
} from '@oicl/openbridge-webcomponents-vue/components/alert-menu/ObcAlertMenu.vue'
import AlertMenuItem from '@oicl/openbridge-webcomponents-vue/components/alert-menu-item/ObcAlertMenuItem.vue'
import '@oicl/openbridge-webcomponents/dist/components/alert-icon/alert-icon'
import '@oicl/openbridge-webcomponents/dist/icons/icon-caution-color-iec.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-alarm-noack-iec.js'
import '@oicl/openbridge-webcomponents/dist/icons/icon-warning-noack-iec.js'
import { useRouter, useRoute } from 'vue-router'
import { ObcAlertMenuItemStatus } from '@oicl/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js'
import AlertIcon from './AlertIcon.vue'
import type { App } from '@/router'

const model = defineModel<boolean>()

const alertStore = useAlertStore()

const router = useRouter()
const route = useRoute()

function onAlertListClick() {
  const app = route.meta.app as App | undefined
  router.push({ name: app?.name + '-alert' })
  if (model.value) {
    model.value = false
  }
}

function onAckAllVisibleClick(event: ObcAckAllVisibleClickEvent) {
  let unackedAlerts
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
    v-if="model"
    class="alert-menu"
    :can-ack-all="alertStore.unackedAlerts.length > 0"
    can-silence
    @ack-all-visible-click="onAckAllVisibleClick"
    @go-to-alert-list-click="onAlertListClick"
    @silence-click="alertStore.muteAllAlerts"
  >
    <AlertMenuItem
      v-for="a of alertStore.activeAlerts"
      :key="a.tag"
      has-time
      :status="a.alertStatus"
      :time="a.time.toLocaleTimeString('en-UK')"
      @ack-click="() => (a.alertStatus = ObcAlertMenuItemStatus.Acknowledged)"
    >
      <template #alert-icon>
        <AlertIcon :alert-status="a.alertStatus" :alert-type="a.alertType" />
      </template>
      <template #title>
        {{ a.title }}
      </template>
      <template #description>
        {{ a.description }}
      </template>
    </AlertMenuItem>
  </AlertMenu>
</template>
