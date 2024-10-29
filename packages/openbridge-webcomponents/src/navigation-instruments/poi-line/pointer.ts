import {svg, SVGTemplateResult} from 'lit';

export function renderPointer({fill, y}: {fill: string; y: number}) {
  return svg`
    <g filter="url(#filter0_d_1664_26945)">
      <rect x="2" y="${y}" width="4" height="4" rx="2" fill="${fill}" />
      <rect x="1.5" y="${y - 0.5}" width="5" height="5" rx="2.5" stroke="white" />
    </g>
    <defs>
      <filter
        id="filter0_d_1664_26945"
        x="0"
        y="0"
        width="8"
        height="${y + 10}"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1664_26945"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1664_26945"
          result="shape"
        />
      </filter>
    </defs>
  `;
}
