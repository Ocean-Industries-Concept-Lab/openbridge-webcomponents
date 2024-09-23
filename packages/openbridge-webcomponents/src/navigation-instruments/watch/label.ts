import {svg, SVGTemplateResult} from 'lit-html';

export function renderLabels(scale: number): SVGTemplateResult {
  const labelWidth = 32;
  const gap = 8;
  const radius: number = 368 / 2;
  const labels = [
    {
      label: 'E',
      x: radius + gap / scale + labelWidth / 2,
      y: 0,
      class: 'label',
    },
    {
      label: 'S',
      x: 0,
      y: radius + gap / scale + labelWidth / 2,
      class: 'label',
    },
    {
      label: 'W',
      x: -(radius + gap / scale + labelWidth / 2),
      y: 0,
      class: 'label',
    },
  ];

  let arrow = svg`<defs>
        <mask id="circleMask">
            <rect x="-${radius}" y="-${radius}" width="${radius * 2}" height="${radius * 2}" fill="black"/>
            <circle cx="0" cy="0" r="${radius}" fill="white"/>
        </mask>
    </defs>
    <g mask="url(#circleMask)" transform="translate(0, ${-(radius + 45 / scale)}) scale(${1 / scale}, ${1 / scale})">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M-32.04 42.7192 0 0 32.039 42.7192C21.627 40.9314 10.922 40 0 40-10.922 40-21.627 40.9314-32.04 42.7192Z" 
      fill="var(--instrument-tick-mark-secondary-color)"/>
        <path d="M5.003 29H2.091L-3.013 20.264H-3.077C-3.066 20.52-3.056 20.7813-3.045 21.048-3.034 21.3147-3.024 21.5867-3.013 21.864-2.992 22.1307-2.976 22.4027-2.965 22.68-2.954 22.9573-2.944 23.2347-2.933 23.512V29H-4.997V17.576H-2.101L2.987 26.232H3.035C3.024 25.9867 3.014 25.736 3.003 25.48 2.992 25.2133 2.982 24.952 2.971 24.696 2.971 24.4293 2.966 24.1627 2.955 23.896 2.944 23.6293 2.934 23.3627 2.923 23.096V17.576H5.003V29Z" fill="var(--element-active-inverted-color)"/>
      </g>`;

  if (scale < 0.58) {
    arrow = svg`
      <g mask="url(#circleMask)" transform="translate(0, ${-radius})">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M-17.8457 24.984 0 0 17.8458 24.984C11.9868 24.3338 6.0324 24 0 24-6.0323 24-11.9867 24.3338-17.8457 24.984Z" fill="var(--instrument-frame-tertiary-color)"/>
        </g>`;

    labels.push({
      label: 'N',
      x: 0,
      y: -(radius + gap / scale + labelWidth / 2),
      class: 'label',
    });
  }

  return svg`
    ${arrow}

    ${labels.map(
      (l) => svg`
        <text
          x="${l.x}"
          y="${l.y}"
          class="${l.class}"
        >
          ${l.label}
        </text>
      `
    )}
  `;
}
