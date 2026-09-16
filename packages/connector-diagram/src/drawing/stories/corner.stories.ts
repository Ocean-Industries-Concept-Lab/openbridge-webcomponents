import type {Meta, StoryObj} from '@storybook/html'
import {renderSegments} from '../renderer.js'
import {GRID, DEFAULT_THEME, type PipeValue, type PipeSize} from '../../model/types.js'
import {canvasStory} from '../../stories/canvasStory.js'
import {corner, type CornerName} from './shapes.js'

const SIZE = GRID * 2 // room for two arms + the rounded bend

interface Args {
  value: PipeValue
  size: PipeSize
  direction: CornerName
}

const meta: Meta<Args> = {
  title: 'Connectors/Corner',
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
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'] satisfies CornerName[],
    },
  },
  args: {value: 'open-flow', size: 'medium', direction: 'bottom-right'},
}
export default meta
type Story = StoryObj<Args>

const draw = (direction: CornerName, value: PipeValue, size: PipeSize) =>
  canvasStory((ctx) => renderSegments(ctx, corner(direction, value, size, SIZE), {theme: DEFAULT_THEME}), {width: SIZE, height: SIZE})

export const Interactive: Story = {
  render: ({value, size, direction}) => draw(direction, value, size),
}

export const AllDirections: Story = {
  render: ({value, size}) => {
    const directions: CornerName[] = ['bottom-right', 'bottom-left', 'top-right', 'top-left']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;gap:16px;padding:8px;flex-wrap:wrap'
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
