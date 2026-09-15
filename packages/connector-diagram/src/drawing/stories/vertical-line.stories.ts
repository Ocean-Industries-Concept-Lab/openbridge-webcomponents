import type {Meta, StoryObj} from '@storybook/html'
import {renderSegments} from '../renderer.js'
import {GRID, DEFAULT_THEME, type PipeValue, type PipeSize} from '../../model/types.js'
import {canvasStory} from '../../stories/canvasStory.js'
import {vertical} from './shapes.js'

interface Args {
  value: PipeValue
  size: PipeSize
  cells: number
}

const meta: Meta<Args> = {
  title: 'Connectors/Vertical Line',
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
    cells: {
      control: {type: 'range', min: 1, max: 16, step: 1},
      description: 'Length in 24px grid cells',
    },
  },
  args: {value: 'open-flow', size: 'medium', cells: 4},
}
export default meta
type Story = StoryObj<Args>

const draw = (value: PipeValue, size: PipeSize, cells: number) =>
  canvasStory((ctx) => renderSegments(ctx, vertical(value, size, cells), {theme: DEFAULT_THEME}), {width: GRID, height: GRID * cells})

export const Interactive: Story = {
  render: ({value, size, cells}) => draw(value, size, cells),
}

export const AllValues: Story = {
  render: ({size, cells}) => {
    const values: PipeValue[] = ['open-flow', 'open-generic', 'empty', 'medium-flow', 'enhanced', 'running', 'closed', 'closed-dash']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;gap:8px;padding:8px;align-items:flex-start'
    for (const value of values) {
      const col = document.createElement('div')
      col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px'
      const label = document.createElement('span')
      label.textContent = value
      label.style.cssText = 'font:9px monospace;color:#ccc;text-align:center;max-width:56px'
      col.appendChild(label)
      col.appendChild(draw(value, size, cells))
      container.appendChild(col)
    }
    return container
  },
}

export const AllSizes: Story = {
  render: ({value, cells}) => {
    const sizes: PipeSize[] = ['small', 'medium', 'large', 'xl']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;gap:8px;padding:8px;align-items:flex-start'
    for (const size of sizes) {
      const col = document.createElement('div')
      col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px'
      const label = document.createElement('span')
      label.textContent = size
      label.style.cssText = 'font:11px monospace;color:#ccc'
      col.appendChild(label)
      col.appendChild(draw(value, size, cells))
      container.appendChild(col)
    }
    return container
  },
}
