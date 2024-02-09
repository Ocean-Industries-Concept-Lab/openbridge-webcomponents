import { ref, type Ref } from "vue"

export function useWindowHandling() {
    const showNavigation = ref(false)
const showBrilliance = ref(false)
const showAppMenu = ref(false)
const showAlertMenu = ref(false)

function toggleAndhideOthers(value: Ref<boolean>) {
  const prevValue = value.value

  showNavigation.value = false
  showBrilliance.value = false
  showAppMenu.value = false
  showAlertMenu.value = false

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
    return { showNavigation, showBrilliance, showAppMenu, showAlertMenu, toggleNavigation, toggleBrilliance, toggleAppMenu, toggleAlertMenu }
}