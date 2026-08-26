import { type Page, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Playwright transpiles these specs to CommonJS (vue-demo is not "type":
// "module"), so __dirname is the portable way to locate the fixtures.
const here = __dirname

export const FIXED_TIME = new Date('2024-01-01T12:00:00Z')

const weatherFixture = readFileSync(join(here, 'fixtures/weather.json'))
const logoFixture = readFileSync(join(here, 'fixtures/logo.png'))
const qrFixture = readFileSync(join(here, 'fixtures/qr.png'))

// Replace every external dependency with a fixed response so screenshots are
// deterministic and offline. Playwright matches routes most-recently-added
// first, so the broad catch-all is registered FIRST (checked last) and the
// specific fixtures are registered AFTER (checked first).
async function stubExternal(page: Page): Promise<void> {
  await page.route('**/*', (route) => {
    const { hostname } = new URL(route.request().url())
    if (hostname === 'localhost' || hostname === '127.0.0.1') return route.continue()
    return route.abort()
  })
  await page.route(/api\.met\.no\/.*locationforecast/, (route) =>
    route.fulfill({ contentType: 'application/json', body: weatherFixture })
  )
  await page.route(/openbridge-demo\.web\.app\/companylogo.*\.png/, (route) =>
    route.fulfill({ contentType: 'image/png', body: logoFixture })
  )
  await page.route(/api\.qrserver\.com\//, (route) =>
    route.fulfill({ contentType: 'image/png', body: qrFixture })
  )
}

// Disable CSS animations/transitions globally (same approach as the core
// package's vitest.setup.ts) so transitions never add per-frame jitter.
const DISABLE_ANIMATIONS_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
`

// Call BEFORE page.goto: freeze time, neutralize rAF-driven animation, kill CSS
// animations, install network stubs.
export async function freezeAndStub(page: Page): Promise<void> {
  // page.clock provides a fixed Date (so the top-bar clock reads a constant
  // time). It does not reliably freeze this app's setInterval/rAF sims, so we
  // also neutralize those below.
  await page.clock.install({ time: FIXED_TIME })
  await page.addInitScript((css) => {
    // Freeze every repeating animation source so the page settles to a
    // deterministic initial state:
    //   - requestAnimationFrame oscillators (e.g. usePitchRollSim)
    //   - setInterval sims (vessel/propulsion/IAS tank simulations)
    // One-shot setTimeout is left intact so first-render reveals still fire.
    // Safe because the suite captures with single-shot page.screenshot, which
    // (unlike toHaveScreenshot) does not depend on rAF.
    window.requestAnimationFrame = () => 0
    window.cancelAnimationFrame = () => {}
    window.setInterval = (() => 0) as typeof window.setInterval
    window.clearInterval = (() => {}) as typeof window.clearInterval
    const inject = () => {
      const style = document.createElement('style')
      style.textContent = css
      document.head.appendChild(style)
    }
    if (document.head) inject()
    else document.addEventListener('DOMContentLoaded', inject)
  }, DISABLE_ANIMATIONS_CSS)
  await stubExternal(page)
}

// Navigate and wait for a known element. Repeating sims are neutralized in
// freezeAndStub, so the page renders a deterministic initial state with no
// time advancement needed.
export async function gotoSettled(page: Page, url: string, waitFor?: string): Promise<void> {
  await page.goto(url)
  if (waitFor) {
    await expect(page.locator(waitFor).first()).toBeVisible()
  }
  // Wait for stubbed data fetches (e.g. weather) to resolve and re-render, so a
  // late-arriving response can't flip the snapshot (e.g. the weather icon).
  await page.waitForLoadState('networkidle')
}

// Take a single screenshot of the frozen page and compare to the committed
// baseline. We use page.screenshot + toMatchSnapshot rather than
// toHaveScreenshot because the latter waits for two stable frames via the
// page's requestAnimationFrame, which page.clock freezes.
export async function snapshot(page: Page, name: string): Promise<void> {
  // animations: 'disabled' settles CSS animations/transitions to their end
  // state via CDP — including inside web-component shadow DOM, which a
  // document-level <style> cannot reach (e.g. the automation-tank fill level).
  expect(await page.screenshot({ animations: 'disabled' })).toMatchSnapshot(name, {
    maxDiffPixels: 100
  })
}

// Run an open action, then wait for the resulting overlay to be visible.
export async function openOverlay(
  page: Page,
  action: (page: Page) => Promise<void>,
  settleSelector: string
): Promise<void> {
  await action(page)
  await expect(page.locator(settleSelector).first()).toBeVisible()
}
