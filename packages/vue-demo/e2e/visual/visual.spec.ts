import { test } from '@playwright/test'
import { freezeAndStub, gotoSettled, openOverlay, snapshot } from './helpers'

// Visual smoke tests for the vue-demo screens.
//
// Skipped screens: /ecdis (live WebGL MapLibre map + AIS network stream) and
// /ar (continuous requestAnimationFrame driven by a CDN HLS video) cannot be
// frozen into a deterministic frame, so they are not snapshotted here.
//
// TODO(visual): give /ecdis and /ar partial coverage instead of skipping them
// entirely — e.g. mask the map canvas / <video> element via the toHaveScreenshot
// `mask` option (or capture only a stable sub-region such as the top bar /
// instrument panel), so regressions in the surrounding OpenBridge chrome are
// still caught while the non-deterministic pixels are ignored.

const routes: { name: string; url: string; waitFor: string }[] = [
  { name: 'conning-psv', url: '/', waitFor: 'header' },
  { name: 'conning-ferry', url: '/ferry', waitFor: 'header' },
  { name: 'ias', url: '/ias', waitFor: '.container' },
  { name: 'small-screen-azimuth-thruster', url: '/small-screen/azimuth-thruster', waitFor: 'header' },
  { name: 'screen-control-apps', url: '/screen-control/apps', waitFor: 'header' },
  { name: 'icons', url: '/icons', waitFor: '.icon-list-container' },
  { name: 'zoom-calibrate', url: '/zoom-calibrate', waitFor: 'header' },
  { name: 'qr-code', url: '/qr-code', waitFor: 'header' },
  { name: 'conning-help', url: '/conning/help', waitFor: 'header' },
  { name: 'conning-settings', url: '/conning/settings', waitFor: 'header' },
  { name: 'conning-alert', url: '/conning/alert', waitFor: 'header' }
]

for (const r of routes) {
  test(`route: ${r.name}`, async ({ page }) => {
    await freezeAndStub(page)
    await gotoSettled(page, r.url, r.waitFor)
    await snapshot(page, `${r.name}.png`)
  })
}

// Interactive overlay states, opened via DOM locators (Playwright pierces open
// shadow DOM). NOTE: the original plan used the app menu, but its top-bar button
// is hidden at desktop width in this demo, so the command menu is used as the
// second menu example. The pattern (open via locator, wait for container,
// snapshot) is identical for any overlay.

test('overlay: command menu open', async ({ page }) => {
  await freezeAndStub(page)
  await gotoSettled(page, '/', 'header')
  await openOverlay(page, (p) => p.locator('.command-button button').first().click(), '.command-menu')
  await snapshot(page, 'overlay-command-menu.png')
})

test('overlay: alert menu open', async ({ page }) => {
  await freezeAndStub(page)
  await gotoSettled(page, '/', 'header')
  await openOverlay(page, (p) => p.locator('obc-alert-button button').first().click(), '.alert-menu')
  await snapshot(page, 'overlay-alert-menu.png')
})

test('overlay: depth dialog open', async ({ page }) => {
  await freezeAndStub(page)
  await gotoSettled(page, '/', 'header')
  await openOverlay(page, (p) => p.locator('.depth').first().click(), '.dialog-content')
  await snapshot(page, 'overlay-depth-dialog.png')
})
