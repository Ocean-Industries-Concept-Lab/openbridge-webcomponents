import {DEFAULT_THEME, GRID, type ThemeVars} from '../model/types.js'

export interface CanvasStoryOptions {
  width: number
  height: number
  theme?: ThemeVars
  scale?: number
}

/**
 * Creates a <canvas> element, calls the draw function, and returns the element.
 * Used as the Storybook render function for pure canvas drawing stories.
 * The scale parameter allows rendering at 2x for sharper snapshots on HiDPI.
 */
export function canvasStory(
  draw: (ctx: CanvasRenderingContext2D) => void,
  {width, height, scale = 2}: CanvasStoryOptions
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const ctx = canvas.getContext('2d')!
  ctx.scale(scale, scale)
  draw(ctx)

  return canvas
}

/** Standard canvas height for a single pipe row */
export const PIPE_ROW_HEIGHT = GRID

/** Default story theme — matches DEFAULT_THEME */
export {DEFAULT_THEME}
