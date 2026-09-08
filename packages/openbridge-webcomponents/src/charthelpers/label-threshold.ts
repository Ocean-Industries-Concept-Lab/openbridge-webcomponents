/**
 * A chart installs its label plugins at creation time, from which side of
 * the label threshold the canvas is on. A resize that crosses the threshold
 * therefore needs a rebuild, while every other resize is an in-place
 * update. This owns the which-side state; the chart owns the decision.
 */
export interface LabelThresholdCallbacks {
  /** The resize crossed the threshold. */
  rebuild(): void;
  /** The resize stayed on one side of it. */
  update(): void;
}

export function observeLabelThreshold(
  target: Element,
  isAboveThreshold: () => boolean,
  callbacks: LabelThresholdCallbacks
): ResizeObserver {
  let wasAbove = isAboveThreshold();
  const observer = new ResizeObserver(() => {
    // A detached canvas has no size and no chart to serve.
    if (!target.isConnected) return;
    const isAbove = isAboveThreshold();
    const crossed = isAbove !== wasAbove;
    wasAbove = isAbove;
    if (crossed) {
      callbacks.rebuild();
    } else {
      callbacks.update();
    }
  });
  observer.observe(target);
  return observer;
}
