/**
 * Host positioning model shared by `obc-automation-tank` and the specialty
 * tanks (`obc-heat-pump`, `obc-hydraulic-separator`, `obc-heat-exchanger`).
 *
 * - `point`: the host has the component's fixed design footprint and a P&ID
 *   anchor — the visual content is shifted with `translateX(-50%)` so the
 *   tank's top-center aligns with the host's top-left placement coordinate.
 *   Use this when dropping the tank onto a P&ID canvas at a pipe-grid
 *   coordinate.
 * - `button` (default): the host fills its parent container (100% × 100%)
 *   with no anchor offset. Use this when embedding the tank inside a sized
 *   layout slot — the parent controls the footprint and the tank renders
 *   responsively inside it, just like a regular button.
 *
 *   If the parent leaves *one* axis indefinite — a flex/grid slot sized with
 *   `min-height`/`max-height` rather than `height`, or a cross axis freed by
 *   `align-self: center` — the corresponding `100%` computes to `auto` and the
 *   tank derives that axis from the other one through the design aspect ratio
 *   of the matching `point` footprint. The size then does not depend on the
 *   tank's own content, which would otherwise make the constraint circular
 *   (issue #1121).
 *
 *   If *both* axes are indefinite (a shrink-to-fit parent, e.g. an unsized
 *   `inline-block`) there is no axis left to derive from, so the host falls
 *   back to its text content. That is stable and non-circular, but much
 *   smaller than the design footprint — give the parent a definite size on at
 *   least one axis, and on both whenever the exact footprint matters.
 */
export enum TankPositioning {
  point = 'point',
  button = 'button',
}
