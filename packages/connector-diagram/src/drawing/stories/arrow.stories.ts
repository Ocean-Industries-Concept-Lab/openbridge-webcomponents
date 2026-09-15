import type {Meta, StoryObj} from '@storybook/html'
import {renderSegments} from '../renderer.js'
import {GRID, DEFAULT_THEME, type PipeValue, type PipeSize, type Direction} from '../../model/types.js'
import {canvasStory} from '../../stories/canvasStory.js'
import {arrow} from './shapes.js'

const SIZE = GRID
type Flow = 'going-to' | 'coming-from'

interface Args {
  value: PipeValue
  size: PipeSize
  flow: Flow
  direction: Direction
}

const meta: Meta<Args> = {
  title: 'Connectors/Arrow',
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    value: {
      control: 'select',
      options: ['open-flow', 'open-generic', 'empty', 'medium-flow', 'enhanced', 'running', 'closed', 'closed-dash'] satisfies PipeValue[],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xl'] satisfies PipeSize[],
    },
    flow: {
      control: 'select',
      options: ['going-to', 'coming-from'] satisfies Flow[],
    },
    direction: {
      control: 'select',
      options: ['right', 'left', 'bottom', 'top'] satisfies Direction[],
    },
  },
  args: {value: 'open-flow', size: 'medium', flow: 'going-to', direction: 'right'},
}
export default meta
type Story = StoryObj<Args>

const draw = (flow: Flow, direction: Direction, value: PipeValue, size: PipeSize) =>
  canvasStory((ctx) => renderSegments(ctx, arrow(flow, direction, value, size), {theme: DEFAULT_THEME}), {width: SIZE, height: SIZE})

export const Interactive: Story = {
  render: ({value, size, flow, direction}) => draw(flow, direction, value, size),
}

export const AllDirections: Story = {
  render: ({value, size}) => {
    const flows: Flow[] = ['going-to', 'coming-from']
    const directions: Direction[] = ['right', 'left', 'bottom', 'top']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;flex-direction:column;gap:16px;padding:8px'
    for (const flow of flows) {
      const groupLabel = document.createElement('div')
      groupLabel.textContent = flow
      groupLabel.style.cssText = 'font:10px monospace;color:#aaa'
      container.appendChild(groupLabel)
      const row = document.createElement('div')
      row.style.cssText = 'display:flex;gap:16px'
      for (const direction of directions) {
        const col = document.createElement('div')
        col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px'
        const lbl = document.createElement('span')
        lbl.textContent = direction
        lbl.style.cssText = 'font:9px monospace;color:#ccc'
        col.appendChild(lbl)
        col.appendChild(draw(flow, direction, value, size))
        row.appendChild(col)
      }
      container.appendChild(row)
    }
    return container
  },
}

export const AllValues: Story = {
  render: ({size, flow, direction}) => {
    const values: PipeValue[] = ['open-flow', 'empty', 'medium-flow', 'enhanced', 'running', 'closed']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;gap:8px;padding:8px;flex-wrap:wrap'
    for (const value of values) {
      const col = document.createElement('div')
      col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px'
      const lbl = document.createElement('span')
      lbl.textContent = value
      lbl.style.cssText = 'font:9px monospace;color:#ccc;text-align:center;max-width:64px'
      col.appendChild(lbl)
      col.appendChild(draw(flow, direction, value, size))
      container.appendChild(col)
    }
    return container
  },
}
