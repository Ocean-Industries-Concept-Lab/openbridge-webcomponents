import { useMediaQuery } from '@vueuse/core'

/**
 * Viewport width at and below which the demo switches to its mobile layout:
 * cards stack vertically, the top bar folds secondary actions into the more
 * menu and drops the clock's timezone. Scoped stylesheets cannot read this
 * constant, so every `@media (max-width: 768px)` in the demo cites it in a
 * comment and must move with it.
 */
export const MOBILE_BREAKPOINT_PX = 768

export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT_PX}px)`

/** Reactive "is the viewport at the mobile breakpoint or narrower". */
export function useMobileLayout() {
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
  return { isMobile }
}
