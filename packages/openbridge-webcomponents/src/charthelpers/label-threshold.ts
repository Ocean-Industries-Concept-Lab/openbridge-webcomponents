function hasSize(target: Element): boolean {
  const {width, height} = target.getBoundingClientRect();
  return width > 0 && height > 0;
}

/** What a chart does when its canvas is resized. */
export interface LabelThresholdCallbacks {
  /** The resize crossed the threshold, or gave the canvas its first size. */
  rebuild(): void;
  /** The resize stayed on one side of it. */
  update(): void;
}

/**
 * A chart installs its label plugins at creation time, from which side of
 * the label threshold the canvas is on. A resize that crosses the threshold
 * therefore needs a rebuild, while every other resize is an in-place
 * update. This owns the which-side state; the chart owns the decision.
 *
 * A chart created while its canvas had no size (in a hidden container) is
 * also rebuilt once, when the canvas first gets one: Chart.js keeps layout
 * state from that empty first pass, and a resize leaves the plot a pixel off
 * a chart created at its real size.
 *
 * @param target - The chart's canvas. A detached target is ignored: it has no size and no chart to serve.
 * @param isAboveThreshold - The chart's own test, read once now and after every resize.
 * @param callbacks - `rebuild` on a crossing or a first size, `update` otherwise.
 * @returns The observer, for the chart to disconnect in `disconnectedCallback`.
 */
export function observeLabelThreshold(
  target: Element,
  isAboveThreshold: () => boolean,
  callbacks: LabelThresholdCallbacks
): ResizeObserver {
  let wasAbove = isAboveThreshold();
  let hadSize = hasSize(target);
  const observer = new ResizeObserver(() => {
    if (!target.isConnected) return;
    const isAbove = isAboveThreshold();
    const crossed = isAbove !== wasAbove;
    wasAbove = isAbove;
    const gotSize = !hadSize && hasSize(target);
    hadSize = hasSize(target);
    if (crossed || gotSize) {
      callbacks.rebuild();
    } else {
      callbacks.update();
    }
  });
  observer.observe(target);
  return observer;
}
