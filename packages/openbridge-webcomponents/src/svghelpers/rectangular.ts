import {svg} from 'lit';

export function rect(
  id: string,
  data: {
    width: number;
    height: number;
    strokeWidth: number;
    strokeColor: string;
    fillColor: string;
    borderRadius: number;
    strokePosition: 'inside' | 'outside';
  }
) {
  if (data.strokePosition === 'inside') {
    return svg`
		<defs>
			<clipPath id="clip${id}">
				<rect id=${id} x=${-data.width / 2} y=${-data.height / 2} width=${
          data.width
        } height=${data.height} rx=${
          data.borderRadius
        } vector-effect="non-scaling-stroke" />
			</clipPath>
		</defs>
		<rect id=${id} x=${-data.width / 2} y=${-data.height / 2} width=${
      data.width
    } height=${data.height} rx=${
      data.borderRadius
    } vector-effect="non-scaling-stroke" stroke=${
      data.strokeColor
    }  stroke-width=${data.strokeWidth * 2} fill=${
      data.fillColor
    } clip-path="url(#clip${id})"/>
		  `;
  } else {
    return null;
  }
}
