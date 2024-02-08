import {svg} from 'lit';

export function circle(
  id: string,
  data: {
    radius: number;
    strokeWidth: number;
    strokeColor: string;
    strokePosition: 'inside' | 'outside';
    fillColor: string;
  }
) {
  if (data.strokePosition === 'inside') {
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
		</g>
  `;
  } else {
    return svg`
		<circle id=${id} cx="0" cy="0" r=${
      data.radius
    } vector-effect="non-scaling-stroke" stroke=${
      data.strokeColor
    } stroke-width=${data.strokeWidth * 2} fill=${data.fillColor}/>
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
