import type {Meta, StoryObj} from '@storybook/html-vite'
import {renderSegments} from '../renderer.js'
import {GRID, DEFAULT_THEME, type PipeValue, type PipeSize, type Direction} from '../../model/types.js'
import {canvasStory} from '../../stories/canvasStory.js'
import {endpoint} from './shapes.js'

const SIZE = GRID

interface Args {
  value: PipeValue
  size: PipeSize
  direction: Direction
}

const meta: Meta<Args> = {
  title: 'Connectors/Endpoint',
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
    direction: {
      control: 'select',
      options: ['right', 'left', 'bottom', 'top'] satisfies Direction[],
      description: 'Direction the loose end points',
    },
  },
  args: {value: 'open-flow', size: 'medium', direction: 'right'},
}
export default meta
type Story = StoryObj<Args>

const draw = (direction: Direction, value: PipeValue, size: PipeSize) =>
  canvasStory((ctx) => renderSegments(ctx, endpoint(direction, value, size), {theme: DEFAULT_THEME}), {width: SIZE, height: SIZE})

export const Interactive: Story = {
  render: ({value, size, direction}) => draw(direction, value, size),
}

export const AllDirections: Story = {
  render: ({value, size}) => {
    const directions: Direction[] = ['right', 'left', 'bottom', 'top']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;gap:16px;padding:8px'
    for (const direction of directions) {
      const col = document.createElement('div')
      col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px'
      const lbl = document.createElement('span')
      lbl.textContent = direction
      lbl.style.cssText = 'font:9px monospace;color:#ccc'
      col.appendChild(lbl)
      col.appendChild(draw(direction, value, size))
      container.appendChild(col)
    }
    return container
  },
}

export const AllValues: Story = {
  render: ({size, direction}) => {
    const values: PipeValue[] = ['open-flow', 'open-generic', 'empty', 'medium-flow', 'enhanced', 'running', 'closed', 'closed-dash']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;gap:8px;padding:8px;flex-wrap:wrap'
    for (const value of values) {
      const col = document.createElement('div')
      col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px'
      const lbl = document.createElement('span')
      lbl.textContent = value
      lbl.style.cssText = 'font:9px monospace;color:#ccc;text-align:center;max-width:64px'
      col.appendChild(lbl)
      col.appendChild(draw(direction, value, size))
      container.appendChild(col)
    }
    return container
  },
}
