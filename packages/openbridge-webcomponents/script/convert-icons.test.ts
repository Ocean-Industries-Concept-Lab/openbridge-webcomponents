import {describe, expect, it} from 'vitest';
import {getCssColorIcon, getSingleColorIcon} from './convert-icons.js';

/** The shape Figma exports for an inside stroke: a white mask clips a doubled stroke to the shape. */
const insideStroke = `<svg viewBox="0 0 24 24" fill="none">
<use xlink:href="#s0" fill="#C90000"/>
<mask id="s1" fill="white">
<use xlink:href="#s0"/>
</mask>
<path d="M1 1" stroke-width="2" stroke="#393939" mask="url(#s1)"/>
<path d="M2 2" fill="white"/>
</svg>`;

/** An outside stroke: a black mask with a white rectangle, the shape cut out of it. */
const outsideStroke = `<svg viewBox="0 0 24 24" fill="none">
<mask id="s1" maskUnits="userSpaceOnUse" x="1" y="0" width="22" height="23" fill="black">
<rect fill="white" x="1" y="0" width="22" height="23"/>
<use xlink:href="#s0"/>
</mask>
<path d="M1 1" stroke-width="2" stroke="#393939" mask="url(#s1)"/>
</svg>`;

const icon = {
  name: 'test',
  id: '0:0',
  javascriptName: 'svgtest',
  styles: {
    '#393939': {cssClass: 'on-line-color'},
    white: {cssClass: 'on-alarm-active-color'},
  },
};

const masks = (svg: string) => svg.match(/<mask[\s\S]*?<\/mask>/g);

describe('masks keep the colours Figma gave them', () => {
  it('in the single-colour variant', () => {
    expect(masks(getSingleColorIcon(insideStroke, icon))).toEqual(
      masks(insideStroke)
    );
    expect(masks(getSingleColorIcon(outsideStroke, icon))).toEqual(
      masks(outsideStroke)
    );
  });

  it('in the CSS-colour variant', () => {
    expect(masks(getCssColorIcon(insideStroke, icon))).toEqual(
      masks(insideStroke)
    );
    expect(masks(getCssColorIcon(outsideStroke, icon))).toEqual(
      masks(outsideStroke)
    );
  });

  it('while the shapes outside the mask are still recoloured', () => {
    const css = getCssColorIcon(insideStroke, icon);
    expect(css).toContain('style="stroke: var(--on-line-color)"');
    expect(css).toContain(
      '<path d="M2 2" style="fill: var(--on-alarm-active-color)"/>'
    );
    expect(getSingleColorIcon(insideStroke, icon)).toContain(
      'stroke="currentColor" mask="url(#s1)"'
    );
  });
});
