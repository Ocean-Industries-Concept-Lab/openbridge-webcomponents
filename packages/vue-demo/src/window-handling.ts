import { ref, type Ref } from 'vue'

export function useWindowHandling() {
  const showNavigation = ref(false)
  const showBrilliance = ref(false)
  const showAppMenu = ref(false)
  const showAlertMenu = ref(false)
  const showMoreMenu = ref(false)

  function toggleAndhideOthers(value: Ref<boolean>) {
    const prevValue = value.value

    showNavigation.value = false
    showBrilliance.value = false
    showAppMenu.value = false
    showAlertMenu.value = false
    showMoreMenu.value = false

    value.value = !prevValue
  }

  function toggleNavigation() {
    toggleAndhideOthers(showNavigation)
  }

  function toggleBrilliance() {
    toggleAndhideOthers(showBrilliance)
  }

  function toggleAppMenu() {
    toggleAndhideOthers(showAppMenu)
  }

  function toggleAlertMenu() {
    toggleAndhideOthers(showAlertMenu)
  }

  function toggleMoreMenu() {
    toggleAndhideOthers(showMoreMenu)
  }

  return {
    showNavigation,
    showBrilliance,
    showAppMenu,
    showAlertMenu,
    showMoreMenu,
    toggleNavigation,
    toggleBrilliance,
    toggleAppMenu,
    toggleAlertMenu,
    toggleMoreMenu,
  }
}
