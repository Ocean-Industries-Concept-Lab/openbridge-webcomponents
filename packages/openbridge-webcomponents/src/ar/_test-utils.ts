export const isVitestBrowser = Boolean(
  (globalThis as {__vitest_browser__?: unknown}).__vitest_browser__
);

const nextFrames = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );

export const waitForStorySettle = async (
  options: {drainTransitions?: boolean} = {}
) => {
  if ('fonts' in document) {
    await (document as Document & {fonts?: FontFaceSet}).fonts?.ready;
  }

  await nextFrames();

  if (options.drainTransitions && isVitestBrowser) {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 220);
    });
    // `data-x-moving` is a `will-change` hint POI targets carry briefly after
    // a position update; whether it is still set at capture time changes
    // stroke rasterization, so snapshots flip under load unless it has
    // expired. Stories that animate forever hit the deadline instead.
    const deadline = performance.now() + 2000;
    while (
      document.querySelector('[data-x-moving]') &&
      performance.now() < deadline
    ) {
      await new Promise<void>((resolve) => setTimeout(resolve, 50));
    }
    await nextFrames();
  }
};
