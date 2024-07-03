import {SVGTemplateResult, svg} from 'lit';

export enum PropellerType {
  none = 'none',
  cap = 'cap',
  single = 'single',
}

function arrowTop(height: number, arrowColor: string) {
  const y = -height - 22;
  return svg`
  <path transform="translate(-15 ${y})" d="M0.707007 14.2929L14.9999 0L29.2928 14.2929C29.9228 14.9229 29.4766 16 28.5857 16H1.41412C0.523211 16 0.0770419 14.9229 0.707007 14.2929Z" fill=${arrowColor}/>`;
}

export function topPropeller(
  height: number,
  arrowColor: string,
  type: PropellerType
): SVGTemplateResult | null {
  if (type === PropellerType.none) {
    return arrowTop(height, arrowColor);
  } else if (type === PropellerType.cap) {
    const y = -height - 50 - 1;
    return svg`
        <g transform="translate(-80 ${y})">
        <path d="M60.0016 49L60.001 37.0005C60.0004 25.9547 68.9547 17 80.0005 17C91.0459 17 100 25.9541 100 36.9995V49H60.0016Z" stroke="var(--instrument-frame-tertiary-color)" fill="var(--instrument-frame-primary-color)" vector-effect="non-scaling-stroke"/>
        <path d="M90.3784 10.889L79.9991 1.00391L69.6198 10.889C68.3125 12.1341 69.1937 14.3372 70.9991 14.3372H88.9991C90.8046 14.3372 91.6858 12.1341 90.3784 10.889Z" fill=${arrowColor} stroke-linecap="square"/>
        </g>`;
  } else if (type === PropellerType.single) {
    const y = -height - 50 - 1;
    return svg`
        <g transform="translate(-80 ${y})">
<path d="M60.0016 49L60.0016 23C60.0007 19.6866 62.6865 17 66 17L94 17C97.3137 17 100 19.6863 100 23L100 49L60.0016 49Z" fill="var(--instrument-frame-primary-color)" stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
<path d="M9 33.2643C9.00007 42.0397 60.2667 45 60.2667 45C60.2667 37.2905 62.8316 29.87 67.4405 24.2456L70.1 21C56.8343 21 8.99993 24.489 9 33.2643Z" fill="var(--instrument-frame-primary-color)"  stroke="var(--instrument-frame-tertiary-color)" vector-effect="non-scaling-stroke"/>
<path d="M151 32.7357C151 23.9604 99.7333 21 99.7333 21C99.7333 28.7095 97.1684 36.1301 92.5595 41.7544L89.9 45C103.166 45 151 41.511 151 32.7357Z" stroke="var(--instrument-frame-tertiary-color)" fill="var(--instrument-frame-primary-color)" vector-effect="non-scaling-stroke"/>
<path d="M90.3784 10.889L79.9991 1.00391L69.6198 10.889C68.3125 12.1341 69.1937 14.3372 70.9991 14.3372H88.9991C90.8046 14.3372 91.6858 12.1341 90.3784 10.889Z" fill=${arrowColor} stroke-linecap="square" vector-effect="non-scaling-stroke"/>
</g>
`;
  } else {
    return null;
  }
}

export function bottomPropeller(
  height: number,
  type: PropellerType
): SVGTemplateResult | null {
  if (type === PropellerType.none) {
    return null;
  } else if (type === PropellerType.cap) {
    const y = height + 1;
    return svg`
        <g transform="translate(-80 ${y})">
<path d="M60.0016 1C60.0006 17.7823 67.4013 33.9132 80 45C92.5988 33.9131 100 17.7824 100 1L60.0016 1Z" stroke="var(--instrument-frame-tertiary-color)" fill="var(--instrument-frame-primary-color)" vector-effect="non-scaling-stroke"/>
</g>`;
  } else if (type === PropellerType.single) {
    const y = height + 1;
    return svg`
        <g transform="translate(-80 ${y})">
        <svg width="160" height="49" viewBox="0 0 160 49" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M60.0016 1C60.0006 17.7823 67.4013 33.9132 80 45C92.5988 33.9131 100 17.7824 100 1L60.0016 1Z" stroke="var(--instrument-frame-tertiary-color)" fill="var(--instrument-frame-primary-color)" vector-effect="non-scaling-stroke" />
<path d="M151 16.7357C151 7.96035 99.7333 5 99.7333 5C98.5 13.5 92 24 81.9 29C95.1657 29 151 25.511 151 16.7357Z" stroke="var(--instrument-frame-tertiary-color)" fill="var(--instrument-frame-primary-color)" vector-effect="non-scaling-stroke" />
<path d="M9 17.2643C9.00007 26.0397 67.2667 29 67.2667 29C63.5 22 69.5 8.5 82.1 5C68.8343 5 8.99993 8.48898 9 17.2643Z" stroke="var(--instrument-frame-tertiary-color)" fill="var(--instrument-frame-primary-color)" vector-effect="non-scaling-stroke" />
</g>`;
  } else {
    return null;
  }
}
