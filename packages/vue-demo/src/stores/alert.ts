import { defineStore } from 'pinia'
import { type StartAlert, type SimulatedAlert, type Alert } from '@/business/model';

const alertPriority = ['alarm',
  'warning',
  'caution',]

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [] as Alert[],
    simulatedAlerts: [] as SimulatedAlert[],
    timeouts: [] as NodeJS.Timeout[],
  }),
  getters: {
    latestHighestAlert() {
      const activeAlerts: Alert[] = this.alerts.filter(({ alertStatus }) => alertStatus !== 'rectified' && alertStatus !== 'acked').sort((a, b) => {
        if (a.time > b.time) return -1;
        if (a.time < b.time) return 1;
        return 0;
      }).sort((a, b) => {
        const aIndex = alertPriority.indexOf(a.alertType);
        const bIndex = alertPriority.indexOf(b.alertType);
        if (aIndex > bIndex) return -1;
        if (aIndex < bIndex) return 1;
        return 0;
      });
      if (activeAlerts.length === 0) return null;
      return activeAlerts[0];
    },
    activeAlerts(): Alert[] {
      return this.alerts.filter(({ alertStatus }) => alertStatus !== 'rectified' && alertStatus !== 'acked');
    }
  },
  actions: {
    setAlerts(data: { startAlerts: StartAlert[], simulatedAlerts: SimulatedAlert[] }) {
      this.stopSimulatedAlerts();
      this.alerts = data.startAlerts.map(({ cause, description, tag, ageSeconds, alertType, alertStatus }) => ({
        cause,
        description,
        tag,
        time: new Date(Date.now() - ageSeconds * 1000),
        alertType,
        alertStatus,
      }));
      this.simulatedAlerts = data.simulatedAlerts;
    },
    startSimulatedAlerts() {
      this.alerts = [];
      this.timeouts.forEach(clearTimeout);
      this.timeouts = [];
      this.simulatedAlerts.forEach(({ cause, description, tag, startSeconds, alertType, resolvedSeconds }) => {
        const alert: Alert = {
          cause,
          description,
          tag,
          time: new Date(),
          alertType,
          alertStatus: 'unacked',
        }
        const timeout = setTimeout(() => {
          alert.time = new Date();
          this.alerts.push(alert);
        }, startSeconds * 1000);
        this.timeouts.push(timeout);

        const timeout2 = setTimeout(() => {
          alert.alertStatus = 'rectified';
        }, (startSeconds + resolvedSeconds) * 1000);
        this.timeouts.push(timeout2);
      });
    },
    stopSimulatedAlerts() {
      this.timeouts.forEach(clearTimeout);
      this.timeouts = [];
    },
    ackAllAlerts() {
      this.activeAlerts.forEach(alert => {
        alert.alertStatus = 'acked';
      });
    }
  }
}
)