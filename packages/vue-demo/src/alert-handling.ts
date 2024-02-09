import { computed } from "vue"
import { useAlertStore } from "./stores/alert"
import type { Alert } from "./business/model"
import { AlertType } from "@tibnor/openbridge-webcomponents/dist/types"



export const useAlertHandling = () => {
    const alertStore = useAlertStore()
    const visibleAlert = computed<null | Alert>(() => {
        return alertStore.latestHighestAlert
    })
    
    const visibleAlertType = computed<AlertType>(() => {
    if (!visibleAlert.value) {
        return AlertType.None
    }
    if (visibleAlert.value.alertType === 'alarm') {
        return AlertType.Alarm
    }
    if (visibleAlert.value.alertType === 'warning') {
        return AlertType.Warning
    }
    if (visibleAlert.value.alertType === 'caution') {
        return AlertType.Caution
    }
    return AlertType.None
    })

    function onMuteAlert() {
    if (!visibleAlert.value) {
        return
    }
    visibleAlert.value.alertStatus = 'silenced'
    }

    function onAckAlert() {
    if (!visibleAlert.value) {
        return
    }
    visibleAlert.value.alertStatus = 'acked'
    }
    return {visibleAlert, visibleAlertType, onMuteAlert, onAckAlert}
}