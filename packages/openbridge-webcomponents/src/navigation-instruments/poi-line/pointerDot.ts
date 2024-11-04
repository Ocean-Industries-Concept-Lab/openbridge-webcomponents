import {html} from 'lit';
import {POIStyle} from '../poi-graphic-line/poi-config';

export function renderPointerDot({lineStyle}: {lineStyle: POIStyle}) {
  if (lineStyle === POIStyle.Enhanced)
    return html`<svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1761_3883)">
        <rect x="2" y="1" width="4" height="4" rx="2" fill="#2E5389" />
        <rect x="1.5" y="0.5" width="5" height="5" rx="2.5" stroke="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_1761_3883"
          x="0"
          y="0"
          width="8"
          height="8"
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
            result="effect1_dropShadow_1761_3883"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1761_3883"
            result="shape"
          />
        </filter>
      </defs>
    </svg>`;
  else
    return html`<svg
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1761_4250)">
        <rect x="1" width="2" height="2" rx="1" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_1761_4250"
          x="0"
          y="0"
          width="4"
          height="4"
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
            result="effect1_dropShadow_1761_4250"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1761_4250"
            result="shape"
          />
        </filter>
      </defs>
    </svg> `;
}
