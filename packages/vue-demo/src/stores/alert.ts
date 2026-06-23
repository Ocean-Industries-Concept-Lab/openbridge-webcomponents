import { defineStore } from 'pinia'
import { type StartAlert, type SimulatedAlert, type Alert } from '@/business/model'
import { ObcAlertMenuItemStatus } from '@oicl/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'
import { reactive } from 'vue'

const alertPriority = ['alarm', 'warning', 'caution']

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [] as Alert[],
    simulatedAlerts: [] as SimulatedAlert[],
    timeouts: [] as NodeJS.Timeout[],
    silenced: false,
    alertIndex: 0
  }),
  getters: {
    latestHighestAlert() {
      const unackedAlerts: Alert[] = this.activeAlerts.filter(
        ({ alertStatus, alertType }) =>
          alertStatus !== ObcAlertMenuItemStatus.Acknowledged && alertType !== 'caution'
      )
      if (unackedAlerts.length === 0) return null
      return unackedAlerts[0]
    },
    unackedAlerts(): Alert[] {
      return this.activeAlerts.filter(
        ({ alertStatus }) => alertStatus === ObcAlertMenuItemStatus.Unacknowledged
      )
    },
    activeAlerts(): Alert[] {
      const out = this.alerts
        .filter(({ alertStatus }) => alertStatus !== ObcAlertMenuItemStatus.Rectified)
        .sort((a, b) => {
          // Sort by time
          if (a.time > b.time) return -1
          if (a.time < b.time) return 1
          return 0
        })
        .sort((a, b) => {
          // Sort by ack
          if (
            a.alertStatus === ObcAlertMenuItemStatus.Acknowledged &&
            b.alertStatus !== ObcAlertMenuItemStatus.Acknowledged
          )
            return 1
          if (
            a.alertStatus !== ObcAlertMenuItemStatus.Acknowledged &&
            b.alertStatus === ObcAlertMenuItemStatus.Acknowledged
          )
            return -1
          return 0
        })
        .sort((a, b) => {
          // Sort by priority
          const aIndex = alertPriority.indexOf(a.alertType)
          const bIndex = alertPriority.indexOf(b.alertType)

          if (aIndex > bIndex) return 1
          if (aIndex < bIndex) return -1
          return 0
        })
      return out
    }
  },
  actions: {
    setAlerts(data: { startAlerts: StartAlert[]; simulatedAlerts: SimulatedAlert[] }) {
      this.stopSimulatedAlerts()
      this.alerts = data.startAlerts.map(
        ({ title, description, tag, ageSeconds, alertType, alertStatus, source }) => ({
          title,
          description,
          source,
          tag,
          time: new Date(Date.now() - ageSeconds * 1000),
          alertType,
          alertStatus
        })
      )
      this.simulatedAlerts = data.simulatedAlerts
    },
    startSimulatedAlerts() {
      this.alerts = []
      this.timeouts.forEach(clearTimeout)
      this.timeouts = []
      this.simulatedAlerts.forEach(
        ({
          title,
          description,
          tag,
          startSeconds,
          alertType,
          resolvedSeconds,
          source,
          notAckable
        }) => {
          let alertStatus = ObcAlertMenuItemStatus.Unacknowledged
          if (notAckable && alertType === 'alarm') {
            alertStatus = ObcAlertMenuItemStatus.NoAckAlarm
          } else if (notAckable && alertType === 'warning') {
            alertStatus = ObcAlertMenuItemStatus.NoAckWarning
          } else if (alertType === 'caution') {
            alertStatus = ObcAlertMenuItemStatus.Caution
          }
          const alert: Alert = reactive({
            title,
            description,
            source,
            tag,
            time: new Date(),
            alertType,
            alertStatus
          })
          const timeout = setTimeout(() => {
            alert.time = new Date()
            this.alerts.push(alert)
          }, startSeconds * 1000)
          this.timeouts.push(timeout)

          const timeout2 = setTimeout(
            () => {
              alert.alertStatus = ObcAlertMenuItemStatus.Rectified
              alert.time = new Date()
            },
            (startSeconds + resolvedSeconds) * 1000
          )
          this.timeouts.push(timeout2)
        }
      )
    },
    stopSimulatedAlerts() {
      this.timeouts.forEach(clearTimeout)
      this.timeouts = []
    },
    ackAllAlerts() {
      this.unackedAlerts.forEach((alert) => {
        alert.alertStatus = ObcAlertMenuItemStatus.Acknowledged
      })
    },
    muteAllAlerts() {
      this.silenced = true
    }
  }
})
