import { onMounted, ref } from "vue"

export function useClockHandling() {
    const date = ref(new Date().toISOString())

    onMounted(() => {
        // update date every second
        setInterval(() => {
            date.value = new Date().toISOString()
        }, 1000)
    })
    return { date }
}