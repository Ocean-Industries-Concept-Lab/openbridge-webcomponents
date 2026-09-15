import type {Meta, StoryObj} from '@storybook/html'
import {renderSegments} from '../renderer.js'
import {GRID, DEFAULT_THEME, type PipeValue, type PipeSize} from '../../model/types.js'
import {canvasStory} from '../../stories/canvasStory.js'
import {cross} from './shapes.js'

const SIZE = GRID * 4 // two full pipes meeting with no gap

interface Args {
  value: PipeValue
  size: PipeSize
}

const meta: Meta<Args> = {
  title: 'Connectors/Cross',
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
  },
  args: {value: 'open-flow', size: 'medium'},
}
export default meta
type Story = StoryObj<Args>

const draw = (value: PipeValue, size: PipeSize) =>
  canvasStory((ctx) => renderSegments(ctx, cross(value, size, SIZE), {theme: DEFAULT_THEME}), {width: SIZE, height: SIZE})

export const Interactive: Story = {
  render: ({value, size}) => draw(value, size),
}

export const AllValues: Story = {
  render: ({size}) => {
    const values: PipeValue[] = ['open-flow', 'empty', 'medium-flow', 'enhanced', 'running', 'closed', 'closed-dash']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;gap:8px;padding:8px;flex-wrap:wrap'
    for (const value of values) {
      const col = document.createElement('div')
      col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px'
      const lbl = document.createElement('span')
      lbl.textContent = value
      lbl.style.cssText = 'font:9px monospace;color:#ccc;text-align:center;max-width:64px'
      col.appendChild(lbl)
      col.appendChild(draw(value, size))
      container.appendChild(col)
    }
    return container
  },
}
