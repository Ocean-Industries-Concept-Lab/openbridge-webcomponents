import { onScopeDispose, ref, type Ref } from 'vue'

export type MenuName =
  'navigation' | 'brilliance' | 'appMenu' | 'alertMenu' | 'moreMenu' | 'commandMenu'

/**
 * Which top bar menu is open.
 *
 * The menus close themselves now, so these flags exist only to keep the top
 * bar's buttons looking pressed while their menu is up. `onMenuClose` is what
 * puts a flag back when the browser closed a menu on its own.
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
   * Remembers which menu was open as the mouse goes down.
   *
   * The browser closes an open menu at that point, before the top bar tells
   * us the button was clicked. Without this, clicking the same button again
   * would look like "nothing is open, so open it" and the menu would never
   * shut (#1293).
   *
   * Keyboard presses do not trigger that early close, and the top bar's
   * events do not say which kind of press it was. Clearing this on keydown
   * covers it: a keyboard press then reads the live value instead.
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

  /** The browser closed this menu; let its button stop looking pressed. */
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
