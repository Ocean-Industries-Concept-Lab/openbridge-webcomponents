import {html, svg} from 'lit';
import {POIStyle} from '../poi-graphic-line/poi-config';

function createCircle({
  x,
  y,
  width,
  height,
  rx,
  stroke,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  stroke: string;
}) {
  return svg`<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" stroke="${stroke}">`;
}

export function renderPointerDot({
  lineStyle,
  centerX,
  centerY,
  width,
  vbHeight,
  lineColor,
  outlineColor,
}: {
  lineStyle: POIStyle;
  centerX: number;
  centerY: number;
  width: number;
  vbHeight: number;
  lineColor: string;
  outlineColor: string;
}) {
  let innerCircle = svg`<rect
        x="${centerX}"
        y="${centerY}"
        width="4"
        height="4"
        rx="2"
        fill="${lineColor}"
      />`;

  let outerCircle = null;
  let filterY = centerY;

  if (lineStyle !== POIStyle.Normal) {
    outerCircle = createCircle({
      x: centerX - 0.5,
      y: centerY - 0.5,
      width: 5,
      height: 5,
      rx: 2.5,
      stroke: outlineColor,
    });
    filterY = centerY - 1;
  } else {
    innerCircle = svg`<rect
        x="${centerX}"
        y="${centerY}"
        width="2"
        height="2"
        rx="1"
        fill="${lineColor}"
      />`;
  }

  return html`<svg
    width=${width}
    height="${vbHeight}"
    viewBox="0 0 ${width} ${vbHeight}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    vector-effect="non-scaling-stroke"
  >
    <g filter="url(#pointerDotFilter)">${innerCircle} ${outerCircle}</g>
    <defs>
      <filter
        id="pointerDotFilter"
        x="${0}"
        y="${filterY}"
        width="${width}"
        height="${width}"
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
          result="pointerDotDropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="pointerDotDropShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`;
}
