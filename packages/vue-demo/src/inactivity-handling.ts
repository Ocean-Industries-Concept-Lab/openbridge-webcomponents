import { onMounted, onUnmounted, ref } from 'vue'

export function useInactivityHandling(deadlineMs: number = 30000) {
  // Ref to store the timer ID
  const timerId = ref<NodeJS.Timeout | null>(null)
  const inactive = ref(false)

  // Function to handle activity
  const resetTimer = () => {
    inactive.value = false
    // Clear the previous timer
    if (timerId.value) clearTimeout(timerId.value)

    // Set a new timer
    timerId.value = setTimeout(() => {
      inactive.value = true
    }, deadlineMs)
  }

  // Function to setup listeners
  const setupActivityListeners = () => {
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keypress', resetTimer)
    window.addEventListener('scroll', resetTimer)
    window.addEventListener('click', resetTimer)
    window.addEventListener('touchstart', resetTimer)
  }

  // Function to remove listeners
  const cleanupActivityListeners = () => {
    window.removeEventListener('mousemove', resetTimer)
    window.removeEventListener('keypress', resetTimer)
    window.removeEventListener('scroll', resetTimer)
    window.removeEventListener('click', resetTimer)
    window.removeEventListener('touchstart', resetTimer)
  }
  // Lifecycle hooks to setup and cleanup
  onMounted(() => {
    setupActivityListeners()
    resetTimer() // Initialize the timer when component mounts
  })

  onUnmounted(() => {
    cleanupActivityListeners()
    if (timerId.value) clearTimeout(timerId.value) // Clear the timer when component unmounts
  })
  return { inactive }
}
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
