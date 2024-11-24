<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'
import AlertMenu from '@oicl/openbridge-webcomponents-vue/components/alert-menu/ObcAlertMenu.vue'
import AlertMenuItem from '@oicl/openbridge-webcomponents-vue/components/alert-menu-item/ObcAlertMenuItem.vue'
import '@oicl/openbridge-webcomponents/dist/components/alert-icon/alert-icon'
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
    :empty="alertStore.activeAlerts.length === 0"
    @ack-all-click="alertStore.ackAllAlerts"
    @alert-list-click="onAlertListClick"
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
        <obc-alert-icon
          name="alarm-unack"
          .blink-value="alertStore.blinkAlarmValue"
        ></obc-alert-icon>
      </template>
    </AlertMenuItem>
  </AlertMenu>
</template>
