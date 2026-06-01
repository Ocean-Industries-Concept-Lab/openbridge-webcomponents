import { computed } from 'vue'
import { useAlertStore } from './stores/alert'
import type { Alert } from './business/model'
import { AlertType } from '@oicl/openbridge-webcomponents/dist/types'
import { ObcAlertMenuItemStatus } from '@oicl/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'

export const useAlertHandling = () => {
  const alertStore = useAlertStore()
  const visibleAlert = computed<null | Alert>(() => {
    return alertStore.latestHighestAlert ?? null
  })

  const visibleAlertType = computed<AlertType>(() => {
    const alert = alertStore.activeAlerts[0]
    if (!alert) {
      return AlertType.Warning
    } else if (alert.alertType === 'alarm') {
      return AlertType.Alarm
    } else if (alert.alertType === 'warning') {
      return AlertType.Warning
    } else if (alert.alertType === 'caution') {
      return AlertType.Caution
    }
    return AlertType.Caution
  })

  const silenced = computed<boolean>(() => {
    return visibleAlert.value === null || alertStore.silenced
  })

  function onMuteAlert() {
    if (!visibleAlert.value) {
      return
    }
    alertStore.muteAllAlerts()
  }

  function onAckAlert() {
    if (!visibleAlert.value) {
      return
    }
    visibleAlert.value.alertStatus = ObcAlertMenuItemStatus.Acknowledged
  }
  return { visibleAlert, visibleAlertType, silenced, onMuteAlert, onAckAlert }
}
