import {describe, it, expect} from 'vitest'
import {appendSegmentPath, type PathSink} from '../segmentPath.js'
import type {Straight, Corner} from '../../model/segment.js'

type Op = [string, ...number[]]
function recorder(): {sink: PathSink; ops: Op[]} {
  const ops: Op[] = []
  const sink: PathSink = {
    moveTo: (x, y) => ops.push(['moveTo', x, y]),
    lineTo: (x, y) => ops.push(['lineTo', x, y]),
    arcTo: (x1, y1, x2, y2, r) => ops.push(['arcTo', x1, y1, x2, y2, r]),
  }
  return {sink, ops}
}
const base = {connectionId: 'c', value: 'open-flow' as const, size: 'medium' as const}

describe('appendSegmentPath', () => {
  it('straight → moveTo/lineTo endpoints', () => {
    const {sink, ops} = recorder()
    appendSegmentPath(sink, {...base, kind: 'straight', x1: 10, y1: 20, x2: 90, y2: 20} as Straight)
    expect(ops).toEqual([['moveTo', 10, 20], ['lineTo', 90, 20]])
  })

  it('corner → moveTo(from) + arcTo(derived pivot, to, radius)', () => {
    const {sink, ops} = recorder()
    const c: Corner = {...base, kind: 'corner', from: {x: 42, y: 8}, to: {x: 50, y: 16}, direction: 'TopRight'}
    appendSegmentPath(sink, c)
    expect(ops).toEqual([['moveTo', 42, 8], ['arcTo', 50, 8, 50, 16, 8]])
  })

  it('corner with radius 0 → sharp L (no arcTo)', () => {
    const {sink, ops} = recorder()
    const c: Corner = {...base, kind: 'corner', from: {x: 42, y: 8}, to: {x: 50, y: 16}, direction: 'TopRight'}
    appendSegmentPath(sink, c, {radius: 0})
    expect(ops).toEqual([['moveTo', 42, 8], ['lineTo', 50, 8], ['lineTo', 50, 16]])
  })
})
