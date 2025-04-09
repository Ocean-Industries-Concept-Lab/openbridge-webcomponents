import { defineStore } from 'pinia'
import { type StartAlert, type SimulatedAlert, type Alert } from '@/business/model'
import { reactive } from 'vue'
import { ObcAlertMenuItemStatus } from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item'

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
      const unackedAlerts: Alert[] = this.alerts
        .filter(
          ({ alertStatus }) =>
            alertStatus !== ObcAlertMenuItemStatus.Rectified &&
            alertStatus !== ObcAlertMenuItemStatus.Acknowledged
        )
        .sort((a, b) => {
          if (a.time > b.time) return -1
          if (a.time < b.time) return 1
          return 0
        })
        .sort((a, b) => {
          const aIndex = alertPriority.indexOf(a.alertType)
          const bIndex = alertPriority.indexOf(b.alertType)
          if (aIndex > bIndex) return -1
          if (aIndex < bIndex) return 1
          return 0
        })
      if (unackedAlerts.length === 0) return null
      return unackedAlerts[0]
    },
    unackedAlerts(): Alert[] {
      return this.activeAlerts.filter(
        ({ alertStatus }) => alertStatus !== ObcAlertMenuItemStatus.Acknowledged
      )
    },
    activeAlerts(): Alert[] {
      console.log('activeAlerts', this.alerts)
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
      console.log('out', out)
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
      this.alerts.push({
        ...this.simulatedAlerts[this.alertIndex++],
        time: new Date(),
        alertStatus: ObcAlertMenuItemStatus.Unacknowledged
      })
      /*this.alerts = []
      this.timeouts.forEach(clearTimeout)
      this.timeouts = []
      this.simulatedAlerts.forEach(
        ({ title, description, tag, startSeconds, alertType, resolvedSeconds, source }) => {
          const alert: Alert = reactive({
            title,
            description,
            source,
            tag,
            time: new Date(),
            alertType,
            alertStatus: ObcAlertMenuItemStatus.Unacknowledged
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
      )*/
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
