import {html} from 'lit';

const POI_ARROW_PATH =
  'M5.37301 4.58645L5.01984 4.93961L5.37262 5.29317L8.07356 8L5.37262 10.7068L5.01984 11.0604L5.37301 11.4136L6.31301 12.3536L6.66656 12.7071L7.02012 12.3536L11.0201 8.35355L11.3737 8L11.0201 7.64645L7.02012 3.64645L6.66656 3.29289L6.31301 3.64645L5.37301 4.58645Z';

export function poiArrow(value: string) {
  let fill = 'var(--instrument-regular-secondary-color)';
  if (value === 'checked') fill = 'var(--instrument-enhanced-secondary-color)';

  const pointer = html`<svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    vector-effect="non-scaling-stroke"
  >
    <g filter="url(#filter0_d_903_44142)">
      <path
        d=${POI_ARROW_PATH}
        fill="${fill}"
        stroke="var(--border-silhouette-color)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_903_44142"
        x="-1"
        y="0"
        width="18"
        height="18"
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
          result="effect1_dropShadow_903_44142"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_903_44142"
          result="shape"
        />
      </filter>
    </defs>
  </svg> `;

  return pointer;
}
