import {html, HTMLTemplateResult, nothing} from 'lit';
import {ObcArAlertType} from '../../types.js';
import {ObcPoiButtonType} from './poi-button.js';
export function selectionFrame(
  selected: boolean,
  alertType: ObcArAlertType,
  type: ObcPoiButtonType
): HTMLTemplateResult | typeof nothing {
  if (!selected) {
    return nothing;
  }
  if (alertType === ObcArAlertType.None && type === ObcPoiButtonType.Button) {
    return html`
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="selection-frame"
      >
        <g filter="url(#filter0_d_11288_43269)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 5C12 4.44772 11.5523 4 11 4H8C5.79086 4 4 5.79086 4 8V11C4 11.5523 4.44772 12 5 12C5.55228 12 6 11.5523 6 11V8C6 6.89543 6.89543 6 8 6H11C11.5523 6 12 5.55228 12 5ZM37 6C36.4477 6 36 5.55228 36 5C36 4.44772 36.4477 4 37 4H40C42.2091 4 44 5.79086 44 8V11C44 11.5523 43.5523 12 43 12C42.4477 12 42 11.5523 42 11V8C42 6.89543 41.1046 6 40 6H37ZM36 43C36 42.4477 36.4477 42 37 42H40C41.1046 42 42 41.1046 42 40V37C42 36.4477 42.4477 36 43 36C43.5523 36 44 36.4477 44 37V40C44 42.2091 42.2091 44 40 44H37C36.4477 44 36 43.5523 36 43ZM5 36C5.55228 36 6 36.4477 6 37V40C6 41.1046 6.89543 42 8 42H11C11.5523 42 12 42.4477 12 43C12 43.5523 11.5523 44 11 44H8C5.79086 44 4 42.2091 4 40V37C4 36.4477 4.44772 36 5 36Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_11288_43269"
            x="-3"
            y="-2"
            width="54"
            height="54"
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
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_11288_43269"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_11288_43269"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    `;
  } else if (type === ObcPoiButtonType.Button) {
    return html`<svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="selection-frame"
    >
      <g filter="url(#filter0_d_11326_86245)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11 3C11 2.44772 10.5523 2 10 2H7C4.79086 2 3 3.79086 3 6V9C3 9.55228 3.44772 10 4 10C4.55228 10 5 9.55228 5 9V6C5 4.89543 5.89543 4 7 4H10C10.5523 4 11 3.55228 11 3ZM40 4C39.4477 4 39 3.55228 39 3C39 2.44772 39.4477 2 40 2H43C45.2091 2 47 3.79086 47 6V9C47 9.55228 46.5523 10 46 10C45.4477 10 45 9.55228 45 9V6C45 4.89543 44.1046 4 43 4H40ZM39 45C39 44.4477 39.4477 44 40 44H43C44.1046 44 45 43.1046 45 42V39C45 38.4477 45.4477 38 46 38C46.5523 38 47 38.4477 47 39V42C47 44.2091 45.2091 46 43 46H40C39.4477 46 39 45.5523 39 45ZM4 38C4.55228 38 5 38.4477 5 39V42C5 43.1046 5.89543 44 7 44H10C10.5523 44 11 44.4477 11 45C11 45.5523 10.5523 46 10 46H7C4.79086 46 3 44.2091 3 42V39C3 38.4477 3.44772 38 4 38Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_11326_86245"
          x="-2"
          y="-2"
          width="54"
          height="54"
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
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11326_86245"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11326_86245"
            result="shape"
          />
        </filter>
      </defs>
    </svg>`;
  } else if (
    type === ObcPoiButtonType.Enhanced &&
    alertType === ObcArAlertType.None
  ) {
    return html`
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="selection-frame"
      >
        <g filter="url(#filter0_d_11288_43283)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 5C14 4.44772 13.5523 4 13 4H8C5.79086 4 4 5.79086 4 8V13C4 13.5523 4.44772 14 5 14C5.55228 14 6 13.5523 6 13V8C6 6.89543 6.89543 6 8 6H13C13.5523 6 14 5.55228 14 5ZM51 6C50.4477 6 50 5.55228 50 5C50 4.44772 50.4477 4 51 4H56C58.2091 4 60 5.79086 60 8V13C60 13.5523 59.5523 14 59 14C58.4477 14 58 13.5523 58 13V8C58 6.89543 57.1046 6 56 6H51ZM50 59C50 58.4477 50.4477 58 51 58H56C57.1046 58 58 57.1046 58 56V51C58 50.4477 58.4477 50 59 50C59.5523 50 60 50.4477 60 51V56C60 58.2091 58.2091 60 56 60H51C50.4477 60 50 59.5523 50 59ZM5 50C5.55228 50 6 50.4477 6 51V56C6 57.1046 6.89543 58 8 58H13C13.5523 58 14 58.4477 14 59C14 59.5523 13.5523 60 13 60H8C5.79086 60 4 58.2091 4 56V51C4 50.4477 4.44772 50 5 50Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_11288_43283"
            x="-3"
            y="-2"
            width="70"
            height="70"
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
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_11288_43283"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_11288_43283"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    `;
  } else if (type === ObcPoiButtonType.Enhanced) {
    return html`
      <svg
        width="66"
        height="66"
        viewBox="0 0 66 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="selection-frame"
      >
        <g filter="url(#filter0_d_11288_43290)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 3C14 2.44772 13.5523 2 13 2H7C4.79086 2 3 3.79086 3 6V12C3 12.5523 3.44772 13 4 13C4.55228 13 5 12.5523 5 12V6C5 4.89543 5.89543 4 7 4H13C13.5523 4 14 3.55228 14 3ZM53 4C52.4477 4 52 3.55228 52 3C52 2.44772 52.4477 2 53 2H59C61.2091 2 63 3.79086 63 6V12C63 12.5523 62.5523 13 62 13C61.4477 13 61 12.5523 61 12V6C61 4.89543 60.1046 4 59 4H53ZM52 61C52 60.4477 52.4477 60 53 60H59C60.1046 60 61 59.1046 61 58V52C61 51.4477 61.4477 51 62 51C62.5523 51 63 51.4477 63 52V58C63 60.2091 61.2091 62 59 62H53C52.4477 62 52 61.5523 52 61ZM4 51C4.55228 51 5 51.4477 5 52V58C5 59.1046 5.89543 60 7 60H13C13.5523 60 14 60.4477 14 61C14 61.5523 13.5523 62 13 62H7C4.79086 62 3 60.2091 3 58V52C3 51.4477 3.44772 51 4 51Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_11288_43290"
            x="-2"
            y="-2"
            width="70"
            height="70"
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
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_11288_43290"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_11288_43290"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    `;
  }
  throw new Error('Invalid selection frame');
}
