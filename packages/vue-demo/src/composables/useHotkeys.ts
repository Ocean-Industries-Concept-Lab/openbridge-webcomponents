import { useAlertStore } from '@/stores/alert'

export function useHotkeys() {
    const alertStore = useAlertStore()

    window.addEventListener('keydown', (e) => {
        if (e.key === 's') {
            alertStore.startSimulatedAlerts();
        }
    })
}
