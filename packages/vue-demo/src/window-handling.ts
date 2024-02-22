import { computed, ref, type Ref } from 'vue'

export function useWindowHandling() {
  const showNavigation = ref(false)
  const showBrilliance = ref(false)
  const showAppMenu = ref(false)
  const showAlertMenu = ref(false)
  const showMoreMenu = ref(false)

  function toggleAndhideOthers(value: Ref<boolean>) {
    const prevValue = value.value
    hideAll()
    value.value = !prevValue
  }

  function hideAll() {
    showNavigation.value = false
    showBrilliance.value = false
    showAppMenu.value = false
    showAlertMenu.value = false
    showMoreMenu.value = false
  }

  const showBackdrop = computed(() => {
    return showNavigation.value || showBrilliance.value || showAppMenu.value || showAlertMenu.value || showMoreMenu.value;
  });

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
    showBackdrop,
    hideAll,
    toggleNavigation,
    toggleBrilliance,
    toggleAppMenu,
    toggleAlertMenu,
    toggleMoreMenu
  }
}
