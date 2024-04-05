export enum PipeMedium {
    normal = 'normal',
    empty = 'empty',
    water = 'water',
  }

export type PipeMediumType = keyof typeof PipeMedium;

export function pipeColor(medium: PipeMediumType): {inner: string, outer: string} {
    let innerColor = '--automation-pipe-primary-color'
    if (medium === PipeMedium.empty) {
        innerColor = '--automation-pipe-primary-inverted-color'
    } else if (medium === PipeMedium.water) {
        innerColor = '--automation-fresh-water'
    }
    return {inner: innerColor, outer: '--automation-pipe-tertiary-color'};
}