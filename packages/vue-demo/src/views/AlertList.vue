<template>
  <div class="container">
    <ObcAlertListDetails
      ref="alertListDetails"
      class="alert-list"
      :alerts="alerts"
      :show-time="true"
      @ack-click="handleAck"
    />
    <div class="toolbar">
      <ObcButton hug-text has-leading-icon @click="alertStore.muteAllAlerts()"
        >Mute
        <template #leading-icon>
          <obi-silence-iec></obi-silence-iec>
        </template>
      </ObcButton>
      <ObcButton :variant="ButtonVariant.raised" @click="handleAckAllVisible"
        >Ack all visible</ObcButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ButtonVariant } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/button/button.js'
import ObcButton from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/button/ObcButton.vue'
import '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-silence-iec'
import ObcAlertListDetails, {
  type Alert,
  type ObcAckClickEvent
} from '@ocean-industries-concept-lab/openbridge-webcomponents-vue/components/alert-list-details/ObcAlertListDetails.vue'
import { useAlertStore } from '@/stores/alert'
import { computed, ref } from 'vue'
import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js'
import {
  AlertStatus,
  AlertType
} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types.js'

const alertStore = useAlertStore()
const alertListDetails = ref<InstanceType<typeof ObcAlertListDetails>>()

function getStatus(status: ObcAlertMenuItemStatus): AlertStatus {
  if (status === ObcAlertMenuItemStatus.Unacknowledged) {
    return AlertStatus.Unacknowledged
  } else if (status === ObcAlertMenuItemStatus.Acknowledged) {
    return AlertStatus.Acknowledged
  } else if (status === ObcAlertMenuItemStatus.Rectified) {
    return AlertStatus.Rectified
  } else if (status === ObcAlertMenuItemStatus.Caution) {
    return AlertStatus.Acknowledged
  } else if (status === ObcAlertMenuItemStatus.NoAckAlarm) {
    return AlertStatus.Unacknowledged
  } else if (status === ObcAlertMenuItemStatus.NoAckWarning) {
    return AlertStatus.Unacknowledged
  } else {
    throw new Error('Invalid status')
  }
}

function status2NoAck(status: ObcAlertMenuItemStatus): boolean {
  return (
    status === ObcAlertMenuItemStatus.NoAckAlarm || status === ObcAlertMenuItemStatus.NoAckWarning
  )
}

const alerts = computed((): Alert[] => {
  return alertStore.alerts.map((alert) => {
    const status = getStatus(alert.alertStatus)
    const noAck = status2NoAck(alert.alertStatus)
    return {
      id: alert.tag.slice(1),
      status,
      type: alert.alertType as AlertType,
      time: alert.time.toISOString(),
      description: alert.description,
      title: alert.title,
      noAck
    }
  })
})

function handleAck(e: ObcAckClickEvent) {
  const alert = alertStore.alerts.find((alert) => alert.tag === '#' + e.detail.alert.id)
  if (alert) {
    alert.alertStatus = ObcAlertMenuItemStatus.Acknowledged
  }
}

function handleAckAllVisible() {
  alertListDetails.value?.$el.getVisibleAlerts().forEach((alert: Alert) => {
    if (alert.noAck) {
      return
    }
    const tag = '#' + alert.id
    const alertElement = alertStore.alerts.find((alert) => alert.tag === tag)
    if (alertElement) {
      alertElement.alertStatus = ObcAlertMenuItemStatus.Acknowledged
    } else {
      console.error('Alert element not found', alert)
    }
  })
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--container-background-color);
}

.toolbar {
  background: var(--container-global-color);
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
}

@media screen and (max-width: 500px) {
  .table-container {
    display: none;
  }

  .mobile-container {
    display: grid;
  }

  .toolbar {
    display: none;
  }
}

.alert-list {
  height: calc(100vh - 48px * 2);
}
</style>
