<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import AlertMenu from '@tibnor/openbridge-webcomponents-vue/components/alert-menu/ObcAlertMenu'
import AlertMenuItem from '@tibnor/openbridge-webcomponents-vue/components/alert-menu-item/ObcAlertMenuItem'
import { useRouter } from 'vue-router'

const model = defineModel<boolean>()

const alertStore = useAlertStore()

const router = useRouter()

function onAlertListClick() {
  router.push({ name: 'alert' })
  if (model.value) {
    model.value = false
  }
}
</script>

<template>
  <AlertMenu
    v-if="model"
    class="alert-menu"
    @ack-all-click="alertStore.ackAllAlerts"
    @alert-list-click="onAlertListClick"
    :empty="alertStore.activeAlerts.length === 0"
  >
    <AlertMenuItem
      v-for="a of alertStore.activeAlerts"
      :key="a.tag"
      :message="a.cause"
      :time="a.time.toISOString()"
      time-since="1h 2m"
      :alert-type="a.alertType"
      :narrow-breakpoint-px="650"
      acknowledgeble
      @ack-click="() => (a.alertStatus = 'acked')"
    >
      <template #icon>
        <obi-14-alarm-unack use-css-color></obi-14-alarm-unack>
      </template>
    </AlertMenuItem>
  </AlertMenu>
</template>
