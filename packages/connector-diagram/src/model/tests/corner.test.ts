import {describe, it, expect} from 'vitest'
import {cornerPivot, cornerRadius, cornerDirection} from '../corner.js'
import type {Corner, CornerDirection} from '../segment.js'

const base = {kind: 'corner', connectionId: 'c', value: 'open-flow', size: 'medium'} as const

describe('corner geometry', () => {
  it('BottomLeft: pivot at (min x, max y), radius = side of the from/to square', () => {
    const c: Corner = {...base, from: {x: 128, y: 328}, to: {x: 136, y: 336}, direction: 'BottomLeft'}
    expect(cornerPivot(c)).toEqual({x: 128, y: 336})
    expect(cornerRadius(c)).toBe(8)
  })

  it('every direction picks its own corner of the square', () => {
    const from = {x: 10, y: 20}, to = {x: 18, y: 28}
    const pivots: Record<CornerDirection, {x: number; y: number}> = {
      TopLeft: {x: 10, y: 20},
      TopRight: {x: 18, y: 20},
      BottomLeft: {x: 10, y: 28},
      BottomRight: {x: 18, y: 28},
    }
    for (const direction of Object.keys(pivots) as CornerDirection[]) {
      expect(cornerPivot({...base, from, to, direction})).toEqual(pivots[direction])
    }
  })

  it('cornerDirection is the inverse of cornerPivot, whichever arm is `from`', () => {
    const a = {x: 10, y: 20}, b = {x: 18, y: 28}
    for (const direction of ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'] as CornerDirection[]) {
      const pivot = cornerPivot({...base, from: a, to: b, direction})
      expect(cornerDirection(pivot, a, b)).toBe(direction)
      expect(cornerDirection(pivot, b, a)).toBe(direction)
    }
  })
})
