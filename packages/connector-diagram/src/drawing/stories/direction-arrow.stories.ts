import type {Meta, StoryObj} from '@storybook/html-vite'
import {renderSegments} from '../renderer.js'
import {GRID, DEFAULT_THEME, type PipeValue, type PipeSize, type Direction, type MediumColor} from '../../model/types.js'
import {canvasStory} from '../../stories/canvasStory.js'
import {directionArrow} from './shapes.js'

const SIZE = GRID

interface Args {
  value: PipeValue
  size: PipeSize
  direction: Direction
  mediumColor: MediumColor
}

const meta: Meta<Args> = {
  title: 'Connectors/Direction Arrow',
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
    },
    mediumColor: {
      control: 'select',
      options: ['Neutral', 'Enhanced', 'Blue', 'Cyan', 'Teal', 'Green', 'Yellow', 'Orange', 'Red', 'Purple', 'Indigo'] satisfies MediumColor[],
    },
  },
  args: {value: 'open-flow', size: 'medium', direction: 'right', mediumColor: 'Teal'},
}
export default meta
type Story = StoryObj<Args>

const draw = (direction: Direction, value: PipeValue, size: PipeSize, mediumColor?: MediumColor) =>
  canvasStory((ctx) => renderSegments(ctx, directionArrow(direction, value, size, mediumColor), {theme: DEFAULT_THEME}), {width: SIZE, height: SIZE})

function labelled(text: string, el: HTMLElement): HTMLElement {
  const col = document.createElement('div')
  col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px'
  const lbl = document.createElement('span')
  lbl.textContent = text
  lbl.style.cssText = 'font:9px monospace;color:#ccc;text-align:center;max-width:64px'
  col.append(lbl, el)
  return col
}

export const Interactive: Story = {
  render: ({value, size, direction, mediumColor}) => draw(direction, value, size, mediumColor),
}

/** The shape differs per size (Figma): filled chevron + halo for S/M, a thick
 *  clipped stroke for L/XL. */
export const AllSizes: Story = {
  render: ({value, mediumColor}) => {
    const sizes: PipeSize[] = ['small', 'medium', 'large', 'xl']
    const directions: Direction[] = ['right', 'left', 'bottom', 'top']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;flex-direction:column;gap:16px;padding:8px'
    for (const size of sizes) {
      const row = document.createElement('div')
      row.style.cssText = 'display:flex;gap:16px'
      for (const direction of directions) row.appendChild(labelled(`${size} ${direction}`, draw(direction, value, size, mediumColor)))
      container.appendChild(row)
    }
    return container
  },
}

export const AllValues: Story = {
  render: ({size, direction}) => {
    const values: PipeValue[] = ['open-flow', 'open-generic', 'empty', 'medium-flow', 'enhanced', 'running', 'closed', 'closed-dash']
    const container = document.createElement('div')
    container.style.cssText = 'display:flex;gap:8px;padding:8px;flex-wrap:wrap'
    for (const value of values) container.appendChild(labelled(value, draw(direction, value, size, 'Blue')))
    return container
  },
}
