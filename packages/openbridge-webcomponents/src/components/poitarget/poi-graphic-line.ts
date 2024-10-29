import {svg, SVGTemplateResult} from 'lit';

import {
  POIStyle,
  POIState,
  POIStyleConfig,
  POI_STYLES,
} from '../../navigation-instruments/poi-graphic-line/poi-config';
import {renderPointer} from '../../navigation-instruments/poi-graphic-line/pointer';

function getPOIStyleConfig(style: POIStyle): POIStyleConfig {
  const config = POI_STYLES[style];
  if (!config) {
    throw new Error(`Style: ${style} not supported`);
  }
  return config;
}

export function renderPOIGraphicLine(
  style: POIStyle,
  state: POIState,
  width: number,
  height: number
): SVGTemplateResult {
  const config = getPOIStyleConfig(style);

  const path = config.path(height, width);
  const vbHeight = config.vbHeight(height);
  const lineWidth = config.lineWidth;
  const lineColor = config.lineColor;
  const outlineColor = config.outlineColor;
  const outlineWidth = config.outlineWidth;
  const filterAttributes = config.filterAttributes(height);
  const feColorMatrixValues = config.colorMatrixValues;
  const linearGradient = config.linearGradient(height);

  return svg`
<svg>
  <mask
    id="mask0_903_40238"
    style="mask-type:alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="${width}"
    height="${vbHeight}"
  >
    <path d=${path}
      stroke="url(#paint0_linear_903_40238)"
      stroke-width="4"
      stroke-linecap="round"
    />
  </mask>
  <g mask="url(#mask0_903_40238)">
    <g filter="url(#filter0_d_903_40238)">
      <path d=${path}
        stroke="${outlineColor}"
        stroke-width="${outlineWidth}"
        stroke-linecap="round"
      />
    </g>
    <path d=${path}
      stroke="${lineColor}"
      stroke-width="${lineWidth}"
      stroke-linecap="round"
    />
  </g>
  <defs>
    <filter
      id="filter0_d_903_40238"
      x="${filterAttributes.x}"
      y="${filterAttributes.y}"
      width="${filterAttributes.width}"
      height="${filterAttributes.height}"
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
        values="${feColorMatrixValues}"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow_903_40238"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow_903_40238"
        result="shape"
      />
    </filter>
    <linearGradient
      id="paint0_linear_903_40238"
      x1="${linearGradient.x1}"
      y1="${linearGradient.y1}"
      x2="${linearGradient.x2}"
      y2="${linearGradient.y2}"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#C2C2C2" />
      <stop offset="0.989583" stop-color="#C2C2C2" stop-opacity="0" />
    </linearGradient>
  </defs>
<svg/>

`;
}
