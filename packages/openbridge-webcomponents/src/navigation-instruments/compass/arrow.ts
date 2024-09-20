import {SVGTemplateResult, svg} from 'lit';

export enum ArrowStyle {
  HDG = 'HDG',
  COG = 'COG',
}

export function arrow(
  style: ArrowStyle,
  angle: number
): SVGTemplateResult | SVGTemplateResult[] {
  const colorName = 'var(--instrument-enhanced-secondary-color)';

  if (style === ArrowStyle.HDG) {
    return svg`
      <g transform="translate(-32, -${256}) rotate(${angle}, 32, 256)">
        <rect x="28" y="118" width="8" height="139" rx="4" fill="${colorName}" />
        <rect x="30.0039" y="256" width="4" height="156" rx="2" fill="${colorName}" />
        <circle cx="32" cy="256" r="8" fill="${colorName}" />
        <mask
          id="mask0_262_65165"
          style="mask-type:luminance"
          maskUnits="userSpaceOnUse"
          x="8"
          y="94"
          width="48"
          height="50"
        >
          <path
            d="M13.2833 140.564L32 96L50.7167 140.564C51.4569 142.326 49.54 144.023 47.8805 143.075L32 136L16.1195 143.075C14.46 144.023 12.5432 142.326 13.2833 140.564Z"
            fill="white"
            stroke="black"
          />
        </mask>
        <g mask="url(#mask0_262_65165)">
          <path
            d="M13.2833 140.564L32 96L50.7167 140.564C51.4569 142.326 49.54 144.023 47.8805 143.075L32 136L16.1195 143.075C14.46 144.023 12.5432 142.326 13.2833 140.564Z"
            fill="${colorName}"
          />
        </g>
      </g>
    `;
  } else if (style === ArrowStyle.COG) {
    return svg`
      <g transform="translate(-32, -${256}) rotate(${angle}, 32, 256)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.2833 140.564C12.5431 142.326 14.46 144.023 16.1195 143.075L32 136L47.8805 143.075C49.54 144.023 51.4568 142.326 50.7167 140.564L32 96L13.2833 140.564ZM32 106.33L19.2545 136.676L32 131.393L44.7455 136.676L32 106.33ZM49.865 139.602L49.8625 139.6L49.865 139.602Z"
          fill="${colorName}"
        />
        <rect x="30" y="133" width="4" height="124" rx="2" fill="${colorName}" />
        <circle cx="32" cy="256" r="4" fill="${colorName}" />
      </g>
    `;
  } else {
    return [];
  }

  // return [...shaft, circle, arrowTip];
}
