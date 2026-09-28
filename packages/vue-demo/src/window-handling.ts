import { ref, type Ref } from 'vue'

export type MenuName =
  'navigation' | 'brilliance' | 'appMenu' | 'alertMenu' | 'moreMenu' | 'commandMenu'

/**
 * Which top bar menu is open.
 *
 * The menus close themselves now, so these flags exist only to keep the top
 * bar's buttons looking pressed while their menu is up. `onMenuClose` is what
 * puts a flag back when a menu closed on its own.
 *
 * Nothing here guards against a second click on the same button. While a
 * menu is open it covers the page, that button included, so the click that
 * closes the menu never reaches the top bar.
 */
export function useWindowHandling() {
  const showNavigation = ref(false)
  const showBrilliance = ref(false)
  const showAppMenu = ref(false)
  const showAlertMenu = ref(false)
  const showMoreMenu = ref(false)
  const showCommandMenu = ref(false)

  const menus: Record<MenuName, Ref<boolean>> = {
    navigation: showNavigation,
    brilliance: showBrilliance,
    appMenu: showAppMenu,
    alertMenu: showAlertMenu,
    moreMenu: showMoreMenu,
    commandMenu: showCommandMenu
  }
  const all = Object.values(menus)

  function toggleAndhideOthers(value: Ref<boolean>) {
    const wasOpen = value.value
    hideAll()
    value.value = !wasOpen
  }

  function hideAll() {
    for (const menu of all) {
      menu.value = false
    }
  }

  /** A menu closed on its own; let its button stop looking pressed. */
  function onMenuClose(name: MenuName) {
    menus[name].value = false
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

  function toggleCommandMenu() {
    toggleAndhideOthers(showCommandMenu)
  }

  return {
    showNavigation,
    showBrilliance,
    showAppMenu,
    showAlertMenu,
    showMoreMenu,
    showCommandMenu,
    hideAll,
    onMenuClose,
    toggleNavigation,
    toggleBrilliance,
    toggleAppMenu,
    toggleAlertMenu,
    toggleMoreMenu,
    toggleCommandMenu
  }
}
