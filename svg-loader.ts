import { html } from 'lit'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

import { readFile } from 'fs/promises'
import { Plugin } from 'vite'

export const svgLoader = (): Plugin => {
  const svgRegex = /\.svg(\?(raw|url|component))?$/

  // Bookmarks:
  // - https://github.com/jpkleemans/vite-svg-loader/blob/9e511c68c4422a662758d33d7c99cbad28958c75/index.js
  // - https://github.com/denisstasyev/rollup-plugin-inline-code/blob/909325ee3652452ab7a2c849233ce1937b73a193/src/index.ts

  // const importMetaUrl = new URL('', import.meta.url);
  // const { pathname = '' } = importMetaUrl
  // const PRE_PREFIX = dirname(dirname(pathname)) + '/node_modules/'
  // const PREFIX = PRE_PREFIX + '@getgo/chameleon-icons/dist/'

  const paths = new Map<string, string>()

  return {
    name: 'svg-loader',
    enforce: 'pre',

    resolveId(id: string): string | null {
      if (id.match(svgRegex)) {
        paths.set(id, id)
        return id
      } else {
        return null
      }
    },

    async load(id: string): Promise<string | undefined> {
      let outcome: string | undefined
      if (!id.match(svgRegex)) {
        return outcome
      }
      const [path] = id.split('?', 2)
      const fileSystemPath = path.replace(/^\/@fs/, '')
      console.log('svg-loader.load', { id, path, fileSystemPath })
      return await readFile(fileSystemPath, 'utf-8')
    },

    async transform(src: string, id: string) {
      if (!paths.has(id)) {
        return null
      }
      let outcome: string | undefined = src
      if (!id.match(svgRegex)) {
        return outcome
      }
      const isSvgString = /^<svg/.test(src)
      if (isSvgString) {
        console.log('svg-loader.transform', { id, src, isSvgString })
        const code = html`${unsafeSVG(src)}`
        outcome = `${JSON.stringify(code)}`
      }
      return `export default ${JSON.stringify(outcome)}`
    },
  }
}