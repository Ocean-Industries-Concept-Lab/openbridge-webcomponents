import type {Meta, StoryObj} from '@storybook/html'
import {renderSegments} from '../renderer.js'
import {GRID, DEFAULT_THEME, type PipeValue, type PipeSize} from '../../model/types.js'
import {canvasStory} from '../../stories/canvasStory.js'
import {horizontal} from './shapes.js'

interface Args {
  value: PipeValue
  size: PipeSize
  cells: number
}

const meta: Meta<Args> = {
  title: 'Connectors/Horizontal Line',
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
  canvasStory((ctx) => renderSegments(ctx, horizontal(value, size, cells), {theme: DEFAULT_THEME}), {width: GRID * cells, height: GRID})

export const Interactive: Story = {
  render: ({value, size, cells}) => draw(value, size, cells),
}

export const AllValues: Story = {
  render: ({size, cells}) => {
    const values: PipeValue[] = ['open-flow', 'open-generic', 'empty', 'medium-flow', 'enhanced', 'running', 'closed', 'closed-dash']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;flex-direction:column;gap:8px;padding:8px'
    for (const value of values) {
      const row = document.createElement('div')
      row.style.cssText = 'display:flex;align-items:center;gap:8px'
      const label = document.createElement('span')
      label.textContent = value
      label.style.cssText = 'font:11px monospace;color:#ccc;width:96px'
      row.appendChild(label)
      row.appendChild(draw(value, size, cells))
      container.appendChild(row)
    }
    return container
  },
}

export const AllSizes: Story = {
  render: ({value, cells}) => {
    const sizes: PipeSize[] = ['small', 'medium', 'large', 'xl']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;flex-direction:column;gap:8px;padding:8px'
    for (const size of sizes) {
      const row = document.createElement('div')
      row.style.cssText = 'display:flex;align-items:center;gap:8px'
      const label = document.createElement('span')
      label.textContent = size
      label.style.cssText = 'font:11px monospace;color:#ccc;width:48px'
      row.appendChild(label)
      row.appendChild(draw(value, size, cells))
      container.appendChild(row)
    }
    return container
  },
}
