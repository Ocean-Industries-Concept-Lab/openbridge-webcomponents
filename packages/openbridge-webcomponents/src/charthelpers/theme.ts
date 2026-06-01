/**
 * Create a MutationObserver to watch for theme changes
 *
 * Observes the `data-obc-theme` attribute on the root HTML element and triggers
 * the callback when the theme changes.
 *
 * @example
 * ```html
 * <html lang="en" data-obc-theme="day"></html>
 * ```
 *
 * The `data-obc-theme` can be bright, day, dusk or night. Changing it will set the palette.
 *
 * @param callback - Function to call when theme changes
 * @returns MutationObserver instance that can be disconnected when no longer needed
 */
export function observeThemeChanges(callback: () => void): MutationObserver {
  const root = document.documentElement;
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-obc-theme'
      ) {
        callback();
        break;
      }
    }
  });

  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-obc-theme'],
  });

  return observer;
}
