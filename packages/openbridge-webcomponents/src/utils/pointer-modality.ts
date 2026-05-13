/**
 * Global pointer-modality tracker.
 *
 * Drives the `--obc-can-hover` and `--obc-can-press` CSS variables on the
 * document root based on the active pointer type, so that hover and pressed
 * visual states do not "stick" after a tap on touch and hybrid devices
 * (iPad Pro + trackpad, Surface, hybrid Android, iOS Safari).
 *
 * Behavior per gesture:
 * - `mouse` / `pen`: both variables stay at `'1'` so hover and press
 *   feedback render normally.
 * - `touch`: `--obc-can-hover` is suppressed to `'0'` for the entire
 *   gesture (hover is never meaningful on touch and is the primary
 *   source of "sticky" visuals after lift-off). `--obc-can-press` is
 *   kept at `'1'` while the finger is down so the user gets the
 *   essential press confirmation, then briefly flipped to `'0'` on
 *   `pointerup` / `pointercancel` to force a repaint that flushes any
 *   retained `:active` paint state, and restored to `'1'` on the next
 *   frame so subsequent taps still show feedback.
 *
 * After a touch `click`, the currently focused element is blurred to
 * prevent a `:focus-visible` ring from lingering after the tap.
 *
 * The installer is idempotent — calling it more than once attaches the
 * listeners only on the first call. It is automatically invoked from
 * `bundle.ts`; consumers that import individual modules can call it
 * from their app bootstrap.
 */

const INSTALLED_FLAG = '__obcPointerModalityInstalled';

interface DocumentElementWithFlag extends HTMLElement {
  [INSTALLED_FLAG]?: boolean;
}

export function installPointerModalityTracker(): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement as DocumentElementWithFlag;
  if (root[INSTALLED_FLAG]) return;
  root[INSTALLED_FLAG] = true;

  let lastPointerWasTouch = false;
  let currentHoverValue: '0' | '1' | null = null;

  const setHover = (value: '0' | '1'): void => {
    if (currentHoverValue === value) return;
    currentHoverValue = value;
    root.style.setProperty('--obc-can-hover', value);
  };

  const onPointerDown = (event: PointerEvent): void => {
    const isFinePointer =
      event.pointerType === 'mouse' || event.pointerType === 'pen';
    lastPointerWasTouch = !isFinePointer;
    // Hover is suppressed for the whole touch gesture; press feedback is
    // kept enabled so the user sees confirmation while the finger is down.
    setHover(isFinePointer ? '1' : '0');
    root.style.setProperty('--obc-can-press', '1');
    // TEMP DIAGNOSTIC: remove before merge.
    // eslint-disable-next-line no-console
    console.log(
      '[obc-pointer-modality] down',
      event.pointerType,
      'isFine=',
      isFinePointer
    );
  };

  const onPointerMove = (event: PointerEvent): void => {
    const isFinePointer =
      event.pointerType === 'mouse' || event.pointerType === 'pen';
    lastPointerWasTouch = !isFinePointer;
    setHover(isFinePointer ? '1' : '0');
  };

  const onPointerEnd = (event: PointerEvent): void => {
    if (event.pointerType === 'mouse' || event.pointerType === 'pen') return;
    // Briefly suppress press feedback to force a repaint that flushes any
    // retained `:active` paint state on touch. A double rAF guarantees the
    // `0` value is committed in its own frame before the restore, otherwise
    // the browser may coalesce both writes into a single frame and skip the
    // flush (intermittent sticky state on Android Chrome under load).
    root.style.setProperty('--obc-can-press', '0');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.style.setProperty('--obc-can-press', '1');
      });
    });
    // TEMP DIAGNOSTIC: remove before merge.
    // eslint-disable-next-line no-console
    console.log(
      '[obc-pointer-modality] end',
      event.type,
      event.pointerType,
      'lastTouch=',
      lastPointerWasTouch
    );
  };

  const onKeyDown = (): void => {
    // Keyboard interaction means subsequent synthesized clicks should not
    // be attributed to a previous touch gesture (which would incorrectly
    // blur the focused element).
    lastPointerWasTouch = false;
  };

  const clearFocusOnTouchClick = (event: MouseEvent): void => {
    if (!lastPointerWasTouch) return;
    // `detail === 0` indicates a synthesized click (e.g. Enter/Space on a
    // button); only real touch-originated clicks should clear focus.
    if (event.detail === 0) return;
    const active = document.activeElement as HTMLElement | null;
    if (active && typeof active.blur === 'function') {
      active.blur();
    }
  };

  document.addEventListener('pointerdown', onPointerDown, {
    capture: true,
    passive: true,
  });
  document.addEventListener('pointermove', onPointerMove, {
    capture: true,
    passive: true,
  });
  document.addEventListener('pointerup', onPointerEnd, {
    capture: true,
    passive: true,
  });
  document.addEventListener('pointercancel', onPointerEnd, {
    capture: true,
    passive: true,
  });
  document.addEventListener('keydown', onKeyDown, {
    capture: true,
    passive: true,
  });
  document.addEventListener('click', clearFocusOnTouchClick, {
    capture: true,
    passive: true,
  });
}
