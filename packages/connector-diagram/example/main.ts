// OpenBridge palette — provides every --base-*, --container-*, --element-* and
// --automation-* variable. The dusk set is selected by data-obc-theme on <html>.
import '@oicl/openbridge-webcomponents/dist/openbridge.css'
// The three automation components drawn on top of the pipes.
import '@oicl/openbridge-webcomponents/dist/automation/motor/motor.js'
import '@oicl/openbridge-webcomponents/dist/automation/pump/pump.js'
import '@oicl/openbridge-webcomponents/dist/automation/digital-valve/digital-valve.js'

import {renderSegments, themeFromCss} from '../src/index.js'
import type {PipeValue, ComponentBox, Direction, Segment} from '../src/index.js'

const STAGE_W = 720
const STAGE_H = 420
const SCALE = 2 // render at 2x for crisp lines on HiDPI

/**
 * Three parts at fixed locations. The box is the component's 48x48 icon — the
 * part the pipes visually connect to. Motor and Pump share a horizontal centre
 * lane (y = 120), Pump and Valve share a vertical centre lane (x = 440), so
 * those runs come out dead straight. Motor → Valve is deliberately offset and
 * routes with corners.
 */
const ICON = 48

const boxes: ComponentBox[] = [
  {componentId: 'motor', x: 104, y: 96, w: ICON, h: ICON},
  {componentId: 'pump', x: 416, y: 96, w: ICON, h: ICON},
  {componentId: 'valve', x: 416, y: 312, w: ICON, h: ICON},
]

/**
 * The port a pipe attaches to: the midpoint of the box edge on the given side.
 * The router needs the real edge point (not the centre) so it knows which way
 * the pipe leaves the part — the run to the centre is added separately by
 * routeToSegments when it is passed `boxes`.
 */
function port(componentId: string, direction: Direction) {
  const b = boxes.find(k => k.componentId === componentId)!
  const cx = b.x + b.w / 2
  const cy = b.y + b.h / 2
  switch (direction) {
    case 'top':    return {componentId, direction, x: cx, y: b.y} as const
    case 'right':  return {componentId, direction, x: b.x + b.w, y: cy} as const
    case 'bottom': return {componentId, direction, x: cx, y: b.y + b.h} as const
    case 'left':   return {componentId, direction, x: b.x, y: cy} as const
  }
}

const segments: Segment[] = [
  {
    "connectionId": "motor-valve",
    "value": "closed",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "corner",
    "from": {
      "x": 128,
      "y": 328
    },
    "to": {
      "x": 136,
      "y": 336
    },
    "direction": "BottomLeft"
  },
  {
    "connectionId": "valve-outlet",
    "value": "closed",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "endpoint",
    "x": 640,
    "y": 336,
    "direction": "right"
  },
  {
    "connectionId": "pump-valve",
    "value": "medium-flow",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 440,
    "y1": 144,
    "x2": 440,
    "y2": 312
  },
  {
    "connectionId": "pump-valve",
    "value": "medium-flow",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 440,
    "y1": 120,
    "x2": 440,
    "y2": 144,
    "decorative": true
  },
  {
    "connectionId": "pump-valve",
    "value": "medium-flow",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 440,
    "y1": 336,
    "x2": 440,
    "y2": 312,
    "decorative": true
  },
  {
    "connectionId": "motor-valve",
    "value": "closed",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 128,
    "y1": 144,
    "x2": 128,
    "y2": 328
  },
  {
    "connectionId": "motor-valve",
    "value": "closed",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 128,
    "y1": 120,
    "x2": 128,
    "y2": 144,
    "decorative": true
  },
  {
    "connectionId": "motor-pump",
    "value": "medium-flow",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 152,
    "y1": 120,
    "x2": 416,
    "y2": 120
  },
  {
    "connectionId": "motor-pump",
    "value": "medium-flow",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 128,
    "y1": 120,
    "x2": 152,
    "y2": 120,
    "decorative": true
  },
  {
    "connectionId": "motor-pump",
    "value": "medium-flow",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 440,
    "y1": 120,
    "x2": 416,
    "y2": 120,
    "decorative": true
  },
  {
    "connectionId": "motor-valve",
    "value": "closed",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 136,
    "y1": 336,
    "x2": 416,
    "y2": 336
  },
  {
    "connectionId": "motor-valve",
    "value": "closed",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 440,
    "y1": 336,
    "x2": 416,
    "y2": 336,
    "decorative": true
  },
  {
    "connectionId": "valve-outlet",
    "value": "closed",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 464,
    "y1": 336,
    "x2": 640,
    "y2": 336
  },
  {
    "connectionId": "valve-outlet",
    "value": "closed",
    "size": "medium",
    "mediumColor": "Indigo",
    "kind": "straight",
    "x1": 440,
    "y1": 336,
    "x2": 464,
    "y2": 336,
    "decorative": true
  }
]

// --- Lay out the parts over the canvas --------------------------------------

// .part is a zero-size anchor: place it on the box CENTRE, since these
// components draw their icon centred on the element's own position.
for (const b of boxes) {
  const el = document.getElementById(b.componentId)!
  el.style.left = `${b.x + b.w / 2}px`
  el.style.top = `${b.y + b.h / 2}px`
}

// `speedInPercent` is a property with no dashed attribute alias, so set it in
// JS — the running motor and pump then show a real speed in their readouts.
;(document.querySelector('obc-motor') as {speedInPercent?: number}).speedInPercent = 82
;(document.querySelector('obc-pump') as {speedInPercent?: number}).speedInPercent = 64

// --- Route and draw ---------------------------------------------------------

const canvas = document.getElementById('pipes') as HTMLCanvasElement
canvas.width = STAGE_W * SCALE
canvas.height = STAGE_H * SCALE
canvas.style.width = `${STAGE_W}px`
canvas.style.height = `${STAGE_H}px`

const ctx = canvas.getContext('2d')!
ctx.scale(SCALE, SCALE)

/**
 * Resolve the pipe colours from the live palette rather than the built-in day
 * defaults, so the pipes match the dusk components. The reader hands
 * themeFromCss the computed value of each OpenBridge custom property.
 */
function drawPipes(mediumColorOn: boolean): void {
  const root = document.documentElement
  const styles = getComputedStyle(root)
  const theme = themeFromCss(
    name => styles.getPropertyValue(name),
    root.dataset.obcTheme,
  )
  const openValue: PipeValue = mediumColorOn ? "medium-flow" : "open-flow"
  const segmentsStyled: Segment[] = segments.map(seg => ({
    ...seg,
    value: seg.value === "medium-flow" ? openValue : seg.value
  }))
  renderSegments(ctx, segmentsStyled, {theme})
}

// The palette stylesheet may still be loading on first paint; redraw once the
// document's styles have settled so the resolved variables are real values.
let mediumColorOn = false
drawPipes(mediumColorOn)
document.fonts?.ready.then(() => drawPipes(mediumColorOn))


document.getElementById('toggle-medium-color')?.addEventListener('click', () => {
  mediumColorOn = !mediumColorOn
  drawPipes(mediumColorOn)
})
