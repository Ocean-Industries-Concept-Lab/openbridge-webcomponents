import {svg} from 'lit';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import RegularWatchfaceMedium from '../../generated-with-style/Watchface/RegularWatchfaceMedium.svg?raw';
import RegularWatchfaceLarge from '../../generated-with-style/Watchface/RegularWatchfaceLarge.svg?raw';
import ToplineMedium from '../../generated-with-style/Tickmarks/ToplineMedium.svg?raw';
import ToplineLarge from '../../generated-with-style/Tickmarks/ToplineLarge.svg?raw';
import {Size} from '../types';

enum TickmarkType {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
}

function tickmarks(
  size: Size,
  tickmarksDeg: number,
  tickmarkSize: TickmarkType,
  colorName: string
) {
  let width;
  if (size === Size.small) {
    width = 100;
  } else if (size === Size.medium) {
    width = 200;
  } else {
    width = 400;
  }
  const scale = width / 400;

  let innerRadius = (200 - 24) * scale;
  let outerRadius = 200 * scale;
  if (tickmarkSize === TickmarkType.secondary) {
    innerRadius = (200 - 4 - 16) * scale;
    outerRadius = (200 - 4) * scale;
  } else if (tickmarkSize === TickmarkType.tertiary) {
    innerRadius = (200 - 14 - 8) * scale;
    outerRadius = (200 - 14) * scale;
  }

  let svgPath = '';
  for (let i = 0; i < 360; i += tickmarksDeg) {
    const angle = (i * Math.PI) / 180;
    const x1 = Math.cos(angle) * innerRadius;
    const y1 = Math.sin(angle) * innerRadius;
    const x2 = Math.cos(angle) * outerRadius;
    const y2 = Math.sin(angle) * outerRadius;
    svgPath += `M ${x1} ${y1} L ${x2} ${y2} `;
  }
  return svg`<path d=${svgPath} stroke="var(--${colorName}" stroke-width="1"/>`;
}
export function watchface(size: Size, topline: boolean) {
  if (size === Size.small) {
    console.error('Small watchface not implemented');
    return null;
  } else if (size === Size.medium) {
    return svg`
         <svg viewBox="-128 -128 256 256">
            <svg width="256" height="256" x="-128" y="-128">
                ${unsafeSVG(RegularWatchfaceMedium)}
                
              </svg>
              ${tickmarks(
                size,
                90,
                TickmarkType.secondary,
                'instrument-frame-tertiary-color'
              )}
              ${
                topline
                  ? svg`<g transform="translate(-0.5 -100)"> ${unsafeSVG(
                      ToplineMedium
                    )}</g>`
                  : null
              }
          </svg>
        
        `;
  } else {
    return svg`
         <svg viewBox="-256 -256 512 512" x="-256" y="-256">
            <svg width="512" height="512" x="-256" y="-256">
                ${unsafeSVG(RegularWatchfaceLarge)}  
              </svg>
              ${tickmarks(
                size,
                90,
                TickmarkType.secondary,
                'instrument-frame-tertiary-color'
              )}
              ${
                topline
                  ? svg`<g transform="translate(-0.5 -200)"> ${unsafeSVG(
                      ToplineLarge
                    )}</g>`
                  : null
              }
          </svg>
        
        `;
  }
}
