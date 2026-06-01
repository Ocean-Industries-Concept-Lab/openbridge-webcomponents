import { watch, onMounted, type ComputedRef } from 'vue'
import { useDemoConfigStore } from '../stores/demoConfig'

export function useComponentSize({ zoom }: { zoom: ComputedRef<number | undefined> }) {
  const demoConfigStore = useDemoConfigStore()

  const componentSizeClasses = [
    'obc-component-size-regular',
    'obc-component-size-medium',
    'obc-component-size-large',
    'obc-component-size-xl'
  ]

  function updateComponentSize(newSize: string) {
    const root = document.querySelector('body')
    if (root) {
      // Remove all existing component size classes
      root.classList.remove(...componentSizeClasses)
      // Add the new component size class
      root.classList.add(`obc-component-size-${newSize}`)
    }
  }

  function updateZoomLevel(newZoomLevel: number) {
    const root = document.querySelector('body')
    if (root) {
      root.style.zoom = newZoomLevel.toString()
    }
  }

  // Watch for changes in component size and update accordingly
  watch(
    () => demoConfigStore.componentSize,
    (newSize) => {
      updateComponentSize(newSize)
    },
    { immediate: true }
  )

  watch(
    () => zoom?.value ?? demoConfigStore.zoomLevel,
    (newZoomLevel) => {
      updateZoomLevel(newZoomLevel)
    },
    { immediate: true }
  )

  // Ensure component size is set on mount as a fallback
  onMounted(() => {
    updateComponentSize(demoConfigStore.componentSize)
    updateZoomLevel(demoConfigStore.zoomLevel)
  })

  return {
    updateComponentSize
  }
}
