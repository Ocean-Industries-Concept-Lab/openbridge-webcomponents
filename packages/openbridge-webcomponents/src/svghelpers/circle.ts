import {svg} from 'lit';

interface CircleNotch {
  /** Angle in watch coordinates where 0 is 12 o'clock and values increase clockwise. */
  angle: number;
  /** Visual width of the notch at the ring edge. */
  width: number;
  /** How far the notch points inward from the ring edge. */
  depth: number;
  /** Optional fill color for the notch body. Defaults to none. */
  fillColor?: string;
  /** Optional stroke color for the notch outline. */
  strokeColor?: string;
  /** Optional stroke width for the notch outline. */
  strokeWidth?: number;
}

export function circle(
  id: string,
  data: {
    radius: number;
    strokeWidth: number;
    strokeColor: string;
    strokePosition: 'inside' | 'outside' | 'center';
    fillColor: string;
    notch?: CircleNotch;
  }
) {
  const notch = data.notch
    ? svg`<g transform="rotate(${data.notch.angle})">
        <path
          d="M ${-data.notch.width / 2} ${-data.radius} L 0 ${-(data.radius - data.notch.depth)} L ${data.notch.width / 2} ${-data.radius}"
          fill=${data.notch.fillColor ?? 'none'}
          stroke=${data.notch.strokeColor ?? 'currentColor'}
          stroke-width=${data.notch.strokeWidth ?? 1}
          vector-effect="non-scaling-stroke"
          paint-order="stroke fill"
        />
      </g>`
    : null;

  if (data.strokePosition === 'center') {
    return svg`<g>
      <circle id=${id} cx="0" cy="0" 
      r=${data.radius} vector-effect="non-scaling-stroke" 
      stroke=${data.strokeColor}  stroke-width=${data.strokeWidth} 
      fill=${data.fillColor}></circle>
      ${notch}
    </g>`;
  } else if (data.strokePosition === 'inside') {
    return svg`
		<defs>
			<clipPath id="clip${id}">
				<circle id=${id} cx="0" cy="0" r=${
          data.radius
        } vector-effect="non-scaling-stroke" />
			</clipPath>
		</defs>
		<g>
			<circle id=${id} cx="0" cy="0" r=${
        data.radius
      } vector-effect="non-scaling-stroke" stroke=${
        data.strokeColor
      }  stroke-width=${data.strokeWidth * 2} fill=${
        data.fillColor
      } clip-path="url(#clip${id})"/>
			${notch}
		</g>
  `;
  } else {
    return svg`
		<g>
			<circle id=${id} cx="0" cy="0" r=${
        data.radius
      } vector-effect="non-scaling-stroke" stroke=${
        data.strokeColor
      } stroke-width=${data.strokeWidth * 2} fill=${data.fillColor}/>
			${notch}
		</g>
		  `;
  }
}

export function ringOutside(
  id: string,
  data: {radius: number; strokeWidth: number; strokeColor: string}
) {
  return svg`
		<defs>
				<mask id="${id}">
					<rect x="-50%" y="-50%" width="100%" height="100%" fill="white" />
					<circle cx="0" cy="0" r=${data.radius} fill="black" />
				</mask>
		</defs>
  		<circle  cx="0" cy="0" r=${data.radius} stroke-width=${
        data.strokeWidth * 2
      } fill="none" stroke=${
        data.strokeColor
      }  vector-effect="non-scaling-stroke" mask="url(#${id})" />
	`;
}
