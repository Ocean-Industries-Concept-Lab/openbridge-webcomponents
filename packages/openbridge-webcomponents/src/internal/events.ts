/**
 * A listener that keeps an event inside the component whose template binds it.
 *
 * A child's `composed` event crosses every shadow root above it, so it leaves
 * any component that renders the child unless that component stops it or
 * declares it with `@fires` (`npm run lint:events`). Bind this where the event
 * is handled internally or can never fire; it is one stable function, so Lit
 * does not re-bind the listener on every render.
 */
export function stopPropagation(event: Event): void {
  event.stopPropagation();
}
