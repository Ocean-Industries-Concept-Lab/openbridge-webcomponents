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
    // POI targets carry `data-x-moving` (a `will-change` compositing hint)
    // for a short window after position updates. Whether that window is
    // still open at capture time changes stroke rasterization, so wait for
    // it to expire — otherwise snapshots flip between two renders depending
    // on machine load. Stories that animate forever hit the deadline and
    // capture as before.
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
