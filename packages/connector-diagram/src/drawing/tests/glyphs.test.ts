import {describe, it, expect, vi} from 'vitest'
import {drawEndpoint, drawArrow, drawDirectionArrow} from '../glyphs.js'
import {DEFAULT_THEME} from '../../model/types.js'
import type {Endpoint, Arrow, DirectionArrow} from '../../model/segment.js'

function fakeCtx() {
  return {
    save: vi.fn(), restore: vi.fn(), translate: vi.fn(), rotate: vi.fn(),
    beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), bezierCurveTo: vi.fn(),
    closePath: vi.fn(), stroke: vi.fn(), fill: vi.fn(), setLineDash: vi.fn(),
    rect: vi.fn(), clip: vi.fn(),
    lineWidth: 0, lineCap: '', lineJoin: '', strokeStyle: '', fillStyle: '',
  } as any
}
const base = {connectionId: 'c', value: 'open-flow' as const, size: 'medium' as const}

describe('glyphs', () => {
  it('drawEndpoint translates to the exact terminus and strokes', () => {
    const ctx = fakeCtx()
    drawEndpoint(ctx, {...base, kind: 'endpoint', x: 240, y: 58, direction: 'right'} as Endpoint, DEFAULT_THEME)
    expect(ctx.translate).toHaveBeenCalledWith(240, 58)
    expect(ctx.stroke).toHaveBeenCalled()
  })
  it('drawArrow fills a head at the terminus', () => {
    const ctx = fakeCtx()
    drawArrow(ctx, {...base, kind: 'arrow', x: 100, y: 40, direction: 'right', flow: 'going-to'} as Arrow, DEFAULT_THEME)
    expect(ctx.translate).toHaveBeenCalledWith(100, 40)
    expect(ctx.fill).toHaveBeenCalled()
  })

  describe('drawDirectionArrow', () => {
    const seg = (size: DirectionArrow['size'], value: DirectionArrow['value'] = 'open-flow', mediumColor?: DirectionArrow['mediumColor']): DirectionArrow =>
      ({connectionId: 'c', value, size, mediumColor, kind: 'direction', x: 70, y: 30, direction: 'bottom'})

    it('translates to the point and rotates to face the given direction', () => {
      const ctx = fakeCtx()
      drawDirectionArrow(ctx, seg('medium'), DEFAULT_THEME)
      expect(ctx.translate).toHaveBeenCalledWith(70, 30)
      expect(ctx.rotate).toHaveBeenCalledWith(Math.PI / 2)
    })
    it('small/medium: fills the chevron in the tertiary colour, then strokes a 1px halo', () => {
      for (const size of ['small', 'medium'] as const) {
        const ctx = fakeCtx()
        const fills: string[] = [], strokes: {color: string; width: number}[] = []
        ctx.fill.mockImplementation(() => fills.push(ctx.fillStyle))
        ctx.stroke.mockImplementation(() => strokes.push({color: ctx.strokeStyle, width: ctx.lineWidth}))
        drawDirectionArrow(ctx, seg(size), DEFAULT_THEME)
        expect(fills).toEqual([DEFAULT_THEME.pipeOutlineColor])
        expect(strokes).toEqual([{color: DEFAULT_THEME.pipeDirectionHalo, width: 1}])
        expect(ctx.clip).not.toHaveBeenCalled()
      }
    })
    it('large/xl: strokes a square-capped chevron clipped to the pipe band, no halo', () => {
      const cases = [{size: 'large', width: 4, band: 10}, {size: 'xl', width: 6, band: 14}] as const
      for (const {size, width, band} of cases) {
        const ctx = fakeCtx()
        const strokes: {color: string; width: number; cap: string}[] = []
        ctx.stroke.mockImplementation(() => strokes.push({color: ctx.strokeStyle, width: ctx.lineWidth, cap: ctx.lineCap}))
        drawDirectionArrow(ctx, seg(size), DEFAULT_THEME)
        expect(ctx.fill).not.toHaveBeenCalled()
        expect(ctx.clip).toHaveBeenCalledTimes(1)
        // Clip band = the pipe's outline stroke, centred on the pipe axis.
        expect(ctx.rect).toHaveBeenCalledWith(expect.any(Number), -band / 2, expect.any(Number), band)
        expect(strokes).toEqual([{color: DEFAULT_THEME.pipeOutlineColor, width, cap: 'square'}])
      }
    })
    it('large closed: clip band shrinks to the single closed stroke', () => {
      const ctx = fakeCtx()
      drawDirectionArrow(ctx, seg('large', 'closed'), DEFAULT_THEME)
      expect(ctx.rect).toHaveBeenCalledWith(expect.any(Number), -4, expect.any(Number), 8)
    })
    it('keeps the tertiary chevron on a closed pipe', () => {
      const ctx = fakeCtx()
      const fills: string[] = []
      ctx.fill.mockImplementation(() => fills.push(ctx.fillStyle))
      drawDirectionArrow(ctx, seg('small', 'closed'), DEFAULT_THEME)
      expect(fills).toEqual([DEFAULT_THEME.pipeOutlineColor])
    })
    it('uses the medium border colour on a medium-flow pipe', () => {
      const ctx = fakeCtx()
      const fills: string[] = []
      ctx.fill.mockImplementation(() => fills.push(ctx.fillStyle))
      drawDirectionArrow(ctx, seg('medium', 'medium-flow', 'Blue'), DEFAULT_THEME)
      expect(fills).toEqual([DEFAULT_THEME.mediumColors.Blue.border])
    })
  })
})
