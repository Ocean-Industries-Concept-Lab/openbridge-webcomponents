import { onScopeDispose, ref, type Ref } from 'vue'

export type MenuName =
  | 'navigation'
  | 'brilliance'
  | 'appMenu'
  | 'alertMenu'
  | 'moreMenu'
  | 'commandMenu'

/**
 * Open/closed state for the top bar's menus.
 *
 * The menus dismiss themselves now (`softDismiss`), so this only mirrors that
 * state for the top bar's `*-activated` props. `onMenuClose` keeps the mirror
 * honest, and the pointerdown snapshot keeps a second click on the same
 * button from reopening what light dismiss just closed.
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

  /**
   * Light dismiss runs on pointerdown, so by the time a top-bar button's
   * click arrives the menu it belongs to is already closed, and a toggle
   * reading the live value would reopen it (#1293).
   *
   * The top bar reports its buttons as bare CustomEvents, so there is no
   * `MouseEvent.detail` here to tell a pointer activation from a keyboard
   * one. Clearing the snapshot on keydown does the same job: a keyboard
   * activation then reads the live value, which light dismiss never touched.
   */
  let openAtPointerDown: Ref<boolean> | null | undefined
  const snapshot = () => {
    openAtPointerDown = all.find((menu) => menu.value) ?? null
  }
  const clearSnapshot = () => {
    openAtPointerDown = undefined
  }
  document.addEventListener('pointerdown', snapshot, true)
  document.addEventListener('keydown', clearSnapshot, true)
  onScopeDispose(() => {
    document.removeEventListener('pointerdown', snapshot, true)
    document.removeEventListener('keydown', clearSnapshot, true)
  })

  function toggleAndhideOthers(value: Ref<boolean>) {
    const wasOpen = openAtPointerDown === undefined ? value.value : openAtPointerDown === value
    clearSnapshot()
    hideAll()
    value.value = !wasOpen
  }

  function hideAll() {
    for (const menu of all) {
      menu.value = false
    }
  }

  /** The browser dismissed this menu; drop the mirrored state with it. */
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
