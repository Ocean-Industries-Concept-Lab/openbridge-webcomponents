import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './poitarget.css?inline';
import {
  POIStyle,
  POIState,
} from '../../navigation-instruments/poi-graphic-line/poi-config';
import {renderPOIGraphicLine} from './poi-graphic-line';

import '../icon-button/icon-button';
import '../../icons/icon-iec-02-ais-target-activated';

@customElement('obc-poitarget')
export class ObcPOITarget extends LitElement {
  @property({type: Number}) height = 240;
  @property({type: String}) POIStyle: POIStyle = POIStyle.enhanced;
  @property({type: String}) POIState: POIState = POIState.solid;

  override render() {
    return html`
      <div class="wrapper">
        ${renderPOIGraphicLine(this.POIStyle, this.POIState, 4, 100)}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poitarget': ObcPOITarget;
  }
}

//  <svg
//           width="48"
//           height="${this.height + 3}"
//           viewBox="0 0 48 ${this.height + 3}"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <g filter="url(#filter0_d_903_44197)">
//             <g clip-path="url(#clip0_903_44197)">
//               <path
//                 d="M8 17.6C8 14.2397 8 12.5595 8.65396 11.2761C9.2292 10.1471 10.1471 9.2292 11.2761 8.65396C12.5595 8 14.2397 8 17.6 8H30.4C33.7603 8 35.4405 8 36.7239 8.65396C37.8529 9.2292 38.7708 10.1471 39.346 11.2761C40 12.5595 40 14.2397 40 17.6V30.4C40 33.7603 40 35.4405 39.346 36.7239C38.7708 37.8529 37.8529 38.7708 36.7239 39.346C35.4405 40 33.7603 40 30.4 40H17.6C14.2397 40 12.5595 40 11.2761 39.346C10.1471 38.7708 9.2292 37.8529 8.65396 36.7239C8 35.4405 8 33.7603 8 30.4V17.6Z"
//                 fill="#2E5389"
//               />
//               <path
//                 fill-rule="evenodd"
//                 clip-rule="evenodd"
//                 d="M24 13L17 33H31L24 13ZM24 19.0542L19.819 31L28.181 31L24 19.0542Z"
//                 fill="white"
//               />
//             </g>
//             <path
//               d="M8.5 17.6C8.5 15.9116 8.50039 14.6754 8.58008 13.6999C8.6593 12.7303 8.81438 12.0626 9.09946 11.5031C9.62677 10.4682 10.4682 9.62677 11.5031 9.09946C12.0626 8.81438 12.7303 8.6593 13.6999 8.58008C14.6754 8.50039 15.9116 8.5 17.6 8.5H30.4C32.0884 8.5 33.3246 8.50039 34.3001 8.58008C35.2697 8.6593 35.9374 8.81438 36.4969 9.09946C37.5318 9.62677 38.3732 10.4682 38.9005 11.5031C39.1856 12.0626 39.3407 12.7303 39.4199 13.6999C39.4996 14.6754 39.5 15.9116 39.5 17.6V30.4C39.5 32.0884 39.4996 33.3246 39.4199 34.3001C39.3407 35.2697 39.1856 35.9374 38.9005 36.4969C38.3732 37.5318 37.5318 38.3732 36.4969 38.9005C35.9374 39.1856 35.2697 39.3407 34.3001 39.4199C33.3246 39.4996 32.0884 39.5 30.4 39.5H17.6C15.9116 39.5 14.6754 39.4996 13.6999 39.4199C12.7303 39.3407 12.0626 39.1856 11.5031 38.9005C10.4682 38.3732 9.62677 37.5318 9.09946 36.4969C8.81438 35.9374 8.6593 35.2697 8.58008 34.3001C8.50039 33.3246 8.5 32.0884 8.5 30.4V17.6Z"
//               stroke="#2E5389"
//             />
//           </g>
//           <mask
//             id="mask0_903_44197"
//             style="mask-type:alpha"
//             maskUnits="userSpaceOnUse"
//             x="22"
//             y="46"
//             width="4"
//             height="${this.height - 48}"
//           >
//             <path
//               d="M24 48L24 236"
//               stroke="url(#paint0_linear_903_44197)"
//               stroke-width="4"
//               stroke-linecap="round"
//             />
//           </mask>
//           <g mask="url(#mask0_903_44197)">
//             <g filter="url(#filter1_d_903_44197)">
//               <path
//                 d="M24 48L24 236"
//                 stroke="white"
//                 stroke-width="2"
//                 stroke-linecap="round"
//               />
//             </g>
//             <path d="M24 48L24 236" stroke="#2E5389" stroke-linecap="round" />
//           </g>
//           <g filter="url(#filter2_d_903_44197)">
//             <rect
//               x="22"
//               y="${this.height - 4}"
//               width="4"
//               height="4"
//               rx="2"
//               fill="#2E5389"
//             />
//             <rect
//               x="21.5"
//               y="${this.height - 4.5}"
//               width="5"
//               height="5"
//               rx="2.5"
//               stroke="white"
//             />
//           </g>
//           <defs>
//             <filter
//               id="filter0_d_903_44197"
//               x="4"
//               y="6"
//               width="40"
//               height="40"
//               filterUnits="userSpaceOnUse"
//               color-interpolation-filters="sRGB"
//             >
//               <feFlood flood-opacity="0" result="BackgroundImageFix" />
//               <feColorMatrix
//                 in="SourceAlpha"
//                 type="matrix"
//                 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                 result="hardAlpha"
//               />
//               <feOffset dy="2" />
//               <feGaussianBlur stdDeviation="2" />
//               <feColorMatrix
//                 type="matrix"
//                 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
//               />
//               <feBlend
//                 mode="normal"
//                 in2="BackgroundImageFix"
//                 result="effect1_dropShadow_903_44197"
//               />
//               <feBlend
//                 mode="normal"
//                 in="SourceGraphic"
//                 in2="effect1_dropShadow_903_44197"
//                 result="shape"
//               />
//             </filter>
//             <filter
//               id="filter1_d_903_44197"
//               x="22"
//               y="47"
//               width="4"
//               height="${this.height - 8}"
//               filterUnits="userSpaceOnUse"
//               color-interpolation-filters="sRGB"
//             >
//               <feFlood flood-opacity="0" result="BackgroundImageFix" />
//               <feColorMatrix
//                 in="SourceAlpha"
//                 type="matrix"
//                 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                 result="hardAlpha"
//               />
//               <feOffset dy="1" />
//               <feGaussianBlur stdDeviation="0.5" />
//               <feColorMatrix
//                 type="matrix"
//                 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
//               />
//               <feBlend
//                 mode="normal"
//                 in2="BackgroundImageFix"
//                 result="effect1_dropShadow_903_44197"
//               />
//               <feBlend
//                 mode="normal"
//                 in="SourceGraphic"
//                 in2="effect1_dropShadow_903_44197"
//                 result="shape"
//               />
//             </filter>
//             <filter
//               id="filter2_d_903_44197"
//               x="20"
//               y="${this.height - 5}"
//               width="8"
//               height="8"
//               filterUnits="userSpaceOnUse"
//               color-interpolation-filters="sRGB"
//             >
//               <feFlood flood-opacity="0" result="BackgroundImageFix" />
//               <feColorMatrix
//                 in="SourceAlpha"
//                 type="matrix"
//                 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//                 result="hardAlpha"
//               />
//               <feOffset dy="1" />
//               <feGaussianBlur stdDeviation="0.5" />
//               <feColorMatrix
//                 type="matrix"
//                 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
//               />
//               <feBlend
//                 mode="normal"
//                 in2="BackgroundImageFix"
//                 result="effect1_dropShadow_903_44197"
//               />
//               <feBlend
//                 mode="normal"
//                 in="SourceGraphic"
//                 in2="effect1_dropShadow_903_44197"
//                 result="shape"
//               />
//             </filter>
//             <linearGradient
//               id="paint0_linear_903_44197"
//               x1="2.5"
//               y1="1"
//               x2="2.5"
//               y2="${this.height + 1}"
//               gradientUnits="userSpaceOnUse"
//             >
//               <stop stop-color="#C2C2C2" />
//               <stop offset="0.989583" stop-color="#C2C2C2" stop-opacity="0" />
//             </linearGradient>
//             <clipPath id="clip0_903_44197">
//               <path
//                 d="M8 17.6C8 14.2397 8 12.5595 8.65396 11.2761C9.2292 10.1471 10.1471 9.2292 11.2761 8.65396C12.5595 8 14.2397 8 17.6 8H30.4C33.7603 8 35.4405 8 36.7239 8.65396C37.8529 9.2292 38.7708 10.1471 39.346 11.2761C40 12.5595 40 14.2397 40 17.6V30.4C40 33.7603 40 35.4405 39.346 36.7239C38.7708 37.8529 37.8529 38.7708 36.7239 39.346C35.4405 40 33.7603 40 30.4 40H17.6C14.2397 40 12.5595 40 11.2761 39.346C10.1471 38.7708 9.2292 37.8529 8.65396 36.7239C8 35.4405 8 33.7603 8 30.4V17.6Z"
//                 fill="white"
//               />
//             </clipPath>
//           </defs>
//         </svg>
//       </div>
