import {SVGTemplateResult, svg} from 'lit';

/**
 * SVG shape fragments for `obc-position-deviation`, copied from the Figma
 * design (512×512 canvas, centre at 256,256) and re-parameterised with CSS
 * colour variables. Rendered inside an overlay `<svg>` sharing the watch
 * frame viewBox, so all fragments rotate about the face centre.
 *
 * - `directionIndicator()` — heading arrow with the centre position roundel.
 * - `setpointMarker()` — pennant on the outer scale pointing at the setpoint.
 *
 * @ignore
 */

const DIRECTION_INDICATOR_PATH =
  'M256.934 96.6217C256.597 95.7934 255.404 95.7935 255.066 96.6217L240.151 133.281C239.433 135.046 241.416 136.693 243.066 135.702L252 130.381V236.401C242.871 238.254 236 246.325 236 256.001C236 267.046 244.954 276.001 256 276.001C267.046 276.001 276 267.046 276 256.001C276 246.325 269.129 238.254 260 236.401V130.381L268.934 135.702C270.584 136.693 272.567 135.046 271.849 133.281L256.934 96.6217ZM264.797 251.242C263.738 249.289 262.048 247.729 260 246.834V240.504C266.901 242.28 272 248.545 272 256.001C272 264.837 264.836 272.001 256 272.001C247.164 272.001 240 264.837 240 256.001C240 248.545 245.099 242.28 252 240.504V246.834C248.468 248.377 246 251.9 246 256.001C246 256.331 246.016 256.659 246.048 256.981C246.069 257.202 246.099 257.42 246.135 257.636C246.237 258.258 246.395 258.861 246.606 259.438C248.008 263.268 251.685 266.001 256 266.002C261.523 266.002 266 261.524 266 256.002C266 255.693 265.984 255.388 265.957 255.087C265.871 254.141 265.653 253.235 265.322 252.383C265.17 251.991 264.996 251.609 264.797 251.242ZM256 262C259.313 262 262 259.313 262 256C262 252.686 259.313 250 256 250C252.686 250 250 252.686 250 256C250 259.313 252.686 262 256 262Z';

/**
 * Heading arrow combined with the centre position roundel, pointing from the
 * face centre towards `angle` (degrees, 0 = up, clockwise).
 */
export function directionIndicator(
  angle: number,
  color: string
): SVGTemplateResult {
  return svg`
    <g transform="rotate(${angle}) translate(-256, -256)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d=${DIRECTION_INDICATOR_PATH}
        fill=${color}
        stroke="var(--border-silhouette-color)"
        stroke-width="2"
        paint-order="stroke"
        stroke-linejoin="round"
      />
    </g>
  `;
}

const SETPOINT_MARKER_PATH =
  'M21.7188 8.69922C22.1318 9.61741 22.1236 10.7888 21.4658 11.7637L13.6582 23.335C12.8653 24.5101 11.1347 24.5101 10.3418 23.335L2.53419 11.7637C1.87641 10.7888 1.86823 9.61741 2.28126 8.69922C2.69508 7.77931 3.59246 7.00391 4.80275 7.00391H19.1973C20.4076 7.00391 21.3049 7.77931 21.7188 8.69922Z';

/**
 * Pennant on the outer scale at `angle` (degrees, 0 = up, clockwise),
 * pointing inwards towards the face centre.
 */
export function setpointMarker(
  angle: number,
  color: string
): SVGTemplateResult {
  return svg`
    <g transform="rotate(${angle}) translate(-12, -192)">
      <path
        d=${SETPOINT_MARKER_PATH}
        fill=${color}
        stroke="var(--border-silhouette-color)"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </g>
  `;
}
