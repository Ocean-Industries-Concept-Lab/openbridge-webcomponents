import {describe, it, expect} from 'vitest'
import {resolvePipeStroke} from '../styles.js'
import {DEFAULT_THEME, STROKE_WEIGHTS, type PipeValue, type PipeSize} from '../../model/types.js'

const SIZES: PipeSize[] = ['small', 'medium', 'large', 'xl']

describe('resolvePipeStroke', () => {
  it('uses outline/fill weights from STROKE_WEIGHTS for the two-layer values', () => {
    for (const size of SIZES) {
      const s = resolvePipeStroke('running', size, DEFAULT_THEME)
      expect(s.outlineWeight).toBe(STROKE_WEIGHTS[size].outline)
      expect(s.fillWeight).toBe(STROKE_WEIGHTS[size].fill)
    }
  })

  it('closed is a single solid grey stroke at the fill weight (no fill layer)', () => {
    const s = resolvePipeStroke('closed', 'medium', DEFAULT_THEME)
    expect(s.fillColor).toBeNull()
    expect(s.fillWeight).toBeNull()
    expect(s.dashPattern).toEqual([])
    // Figma: closed uses the mid-grey #8E8E8E (pipeOutlineInverted) at fill weight
    expect(s.outlineColor).toBe(DEFAULT_THEME.pipeOutlineInverted)
    expect(s.outlineWeight).toBe(STROKE_WEIGHTS.medium.fill)
  })

  it('closed-dash is a single grey stroke with square dashes (length = gap = fill weight)', () => {
    for (const size of SIZES) {
      const s = resolvePipeStroke('closed-dash', size, DEFAULT_THEME)
      expect(s.fillColor).toBeNull()
      expect(s.outlineColor).toBe(DEFAULT_THEME.pipeOutlineInverted)
      expect(s.outlineWeight).toBe(STROKE_WEIGHTS[size].fill)
      expect(s.dashPattern).toEqual([STROKE_WEIGHTS[size].fill, STROKE_WEIGHTS[size].fill])
    }
  })

  it('open-flow and open-generic resolve to the identical stroke', () => {
    const a = resolvePipeStroke('open-flow', 'medium', DEFAULT_THEME)
    const b = resolvePipeStroke('open-generic', 'medium', DEFAULT_THEME)
    expect(b).toEqual(a)
    expect(a.outlineColor).toBe(DEFAULT_THEME.pipeOutlineColor)
    expect(a.fillColor).toBe(DEFAULT_THEME.pipeFillColor)
  })

  it('maps each colored value to its theme border/background pair', () => {
    const cases: [PipeValue, string, string][] = [
      ['empty', DEFAULT_THEME.pipeOutlineInverted, DEFAULT_THEME.pipeFillInverted],
      ['medium-flow', DEFAULT_THEME.genericBorder, DEFAULT_THEME.genericBackground],
      ['enhanced', DEFAULT_THEME.enhancedBorder, DEFAULT_THEME.enhancedBackground],
      ['running', DEFAULT_THEME.runningBorder, DEFAULT_THEME.runningBackground],
    ]
    for (const [value, outline, fill] of cases) {
      const s = resolvePipeStroke(value, 'medium', DEFAULT_THEME)
      expect(s.outlineColor).toBe(outline)
      expect(s.fillColor).toBe(fill)
    }
  })
})
