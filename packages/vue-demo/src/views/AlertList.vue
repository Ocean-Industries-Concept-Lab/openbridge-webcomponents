<template>
  <div class="container">
    <ObcAlertListDetails ref="alertListDetails" class="alert-list" :alerts="alerts" :show-time="true"
      @ack-click="handleAck" />
    <div class="toolbar">
      <ObcButton hug-text has-leading-icon @click="alertStore.muteAllAlerts()">Mute
        <template #leading-icon>
          <obi-silence-iec></obi-silence-iec>
        </template>
      </ObcButton>
      <ObcButton :variant="ButtonVariant.raised" @click="handleAckAllVisible">Ack all visible</ObcButton>
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
import { AlertType } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/types.js'

const alertStore = useAlertStore()
const alertListDetails = ref<InstanceType<typeof ObcAlertListDetails>>()

function isAcknowledged(
  status: ObcAlertMenuItemStatus
): false | { acknowledgedBy: string; acknowledgedAt: Date } {
  if (status === ObcAlertMenuItemStatus.Unacknowledged) {
    return false
  } else if (status === ObcAlertMenuItemStatus.Acknowledged) {
    return { acknowledgedBy: 'John Doe', acknowledgedAt: new Date() }
  } else if (status === ObcAlertMenuItemStatus.Rectified) {
    return { acknowledgedBy: 'John Doe', acknowledgedAt: new Date() }
  } else if (status === ObcAlertMenuItemStatus.Caution) {
    return { acknowledgedBy: 'John Doe', acknowledgedAt: new Date() }
  } else if (status === ObcAlertMenuItemStatus.NoAckAlarm) {
    return false
  } else if (status === ObcAlertMenuItemStatus.NoAckWarning) {
    return false
  } else {
    throw new Error('Invalid status')
  }
}

function isActive(status: ObcAlertMenuItemStatus): true | { rectifiedTime: Date } {
  if (status === ObcAlertMenuItemStatus.Unacknowledged) {
    return true
  } else if (status === ObcAlertMenuItemStatus.Acknowledged) {
    return true
  } else if (status === ObcAlertMenuItemStatus.Rectified) {
    return { rectifiedTime: new Date() }
  } else if (status === ObcAlertMenuItemStatus.Caution) {
    return true
  } else if (status === ObcAlertMenuItemStatus.NoAckAlarm) {
    return true
  } else if (status === ObcAlertMenuItemStatus.NoAckWarning) {
    return true
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
    const noAck = status2NoAck(alert.alertStatus)
    return {
      id: alert.tag.slice(1),
      acknowledged: isAcknowledged(alert.alertStatus),
      active: isActive(alert.alertStatus),
      type: alert.alertType as AlertType,
      time: alert.time,
      source: alert.source,
      text: alert.description,
      tagId: alert.tag,
      noAck
    } as Alert
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
