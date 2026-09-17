import {describe, it, expect} from 'vitest'
import {renderSegments} from '../renderer.js'
import type {Segment} from '../../model/segment.js'

function fakeCtx() {
  const calls: string[] = []
  const ctx: any = new Proxy({
    canvas: {width: 100, height: 100}, lineWidth: 0, lineCap: '', lineJoin: '',
    strokeStyle: '', fillStyle: '',
  }, {
    get(t, p) {
      if (p in t) return (t as any)[p]
      return (...a: any[]) => { calls.push(String(p)); void a }
    },
    set(t, p, v) { (t as any)[p] = v; return true },
  })
  return {ctx, calls}
}
const straight = (id: string, y: number): Segment =>
  ({kind: 'straight', connectionId: id, value: 'medium-flow', size: 'medium', x1: 0, y1: y, x2: 50, y2: y})

describe('renderSegments', () => {
  it('clears then strokes (outline pass + fill pass = 2 strokes for a 2-layer value)', () => {
    const {ctx, calls} = fakeCtx()
    renderSegments(ctx, [straight('A', 10)])
    expect(calls.filter(c => c === 'clearRect')).toHaveLength(1)
    expect(calls.filter(c => c === 'stroke')).toHaveLength(2) // outline + fill
  })

  it('does NOT clear the canvas when clear:false (draw preview on top)', () => {
    const {ctx, calls} = fakeCtx()
    renderSegments(ctx, [straight('A', 10)], {clear: false})
    expect(calls.filter(c => c === 'clearRect')).toHaveLength(0)
  })

  it('closed value strokes once (single layer)', () => {
    const {ctx, calls} = fakeCtx()
    const s: Segment = {kind: 'straight', connectionId: 'A', value: 'closed', size: 'medium', x1: 0, y1: 10, x2: 50, y2: 10}
    renderSegments(ctx, [s])
    expect(calls.filter(c => c === 'stroke')).toHaveLength(1)
  })
})
