import type {ReactiveController, ReactiveControllerHost} from 'lit';

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

/** The palettes `data-obc-theme` selects. */
export enum ObcPalette {
  night = 'night',
  dusk = 'dusk',
  day = 'day',
  bright = 'bright',
}

const PALETTES: readonly string[] = Object.values(ObcPalette);

/** The palette on `<html>`; `day` when the attribute is missing or unknown, as in `variables.css`. */
export function currentPalette(): ObcPalette {
  const theme = document.documentElement.getAttribute('data-obc-theme');
  return theme && PALETTES.includes(theme)
    ? (theme as ObcPalette)
    : ObcPalette.day;
}

/**
 * Keeps `current` in step with `data-obc-theme` and re-renders the host when
 * it changes, for content that cannot follow the palette through CSS.
 */
export class PaletteController implements ReactiveController {
  current: ObcPalette = currentPalette();
  private observer?: MutationObserver;

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    this.current = currentPalette();
    this.observer = observeThemeChanges(() => {
      this.current = currentPalette();
      this.host.requestUpdate();
    });
  }

  hostDisconnected(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }
}
