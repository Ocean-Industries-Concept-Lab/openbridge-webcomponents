import { ref, watch, type ComputedRef } from 'vue'
import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'
import type { Alert } from '../business/model'
import { useAlertStore } from '../stores/alert'
import { useSim } from './useSim'

export function useSpeedAlerts(maxSpeed: number, disable: ComputedRef<boolean>) {
  const sim = useSim()
  const alertStore = useAlertStore()
  const speedAlert = ref<Alert | null>(null)

  watch(sim.vessel.speedForwardThroughWaterKnots, (sog) => {
    if (sog > maxSpeed && speedAlert.value === null && !disable.value) {
      speedAlert.value = {
        alertType: 'warning',
        alertStatus: ObcAlertMenuItemStatus.Unacknowledged,
        time: new Date(),
        title: 'High speed',
        description: `Low speed area, max ${maxSpeed} knots`,
        source: 'Test source',
        tag: 'Test tag'
      }
      alertStore.alerts.push(speedAlert.value)
    } else if ((sog <= maxSpeed || disable.value) && speedAlert.value !== null) {
      alertStore.alerts = alertStore.alerts.filter((alert) => alert !== speedAlert.value)
      speedAlert.value = null
    }
  })

  return {
    speedAlert
  }
}
