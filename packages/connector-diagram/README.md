# connector-diagram

Pure TypeScript library that draws OpenBridge pipe/connector diagrams on an HTML5
`<canvas>`. It has no framework dependency and no DOM dependency beyond
`CanvasRenderingContext2D`: given a canvas context and a list of `Segment`s, it
draws the pixels.

## Usage

```ts
import {renderSegments, themeFromCss} from '@oicl/connector-diagram'
import type {Segment} from '@oicl/connector-diagram'

const segments: Segment[] = [
  {connectionId: 'a', kind: 'straight', value: 'medium-flow', size: 'medium',
   mediumColor: 'Indigo', x1: 24, y1: 24, x2: 240, y2: 24},
  {connectionId: 'a', kind: 'endpoint', value: 'medium-flow', size: 'medium',
   mediumColor: 'Indigo', x: 240, y: 24, direction: 'right'},
]

// Resolve pipe colours from the live OpenBridge palette (optional — without a
// theme the built-in day defaults are used).
const styles = getComputedStyle(document.documentElement)
const theme = themeFromCss(name => styles.getPropertyValue(name),
                           document.documentElement.dataset.obcTheme)

renderSegments(canvas.getContext('2d')!, segments, {theme})
```

Each pipe is drawn as two strokes, a wider outline and a narrower fill, so pipes
that meet merge cleanly. `PipeValue` (`open-flow`, `medium-flow`, `closed`, …)
selects the colour pair and dash style; `PipeSize` (`small` … `xl`) selects the
stroke weights.

## Development

- `npm install`
- `npm run example` — serves `example/`: three OpenBridge automation components
  with pipes drawn behind them.
- `npm run build` — compile to `dist/`.
- `npm test` — unit tests.
- `npm run storybook` — visual sandbox for every connector shape (all pipe
  values and sizes).
- `npm run test-storybook` — pixel-snapshot regression tests via Playwright;
  `npm run update-snapshots` promotes the current results to baselines.

## Design source

Stroke weights, colour tokens and glyph geometry follow the **Connectors** frame
of the OpenBridge Figma design system. Colours are resolved from the OpenBridge
CSS custom properties, so the diagram follows the active palette
(bright/day/dusk/night).
