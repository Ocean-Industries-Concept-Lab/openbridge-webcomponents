import {svg, type SVGTemplateResult} from 'lit';
import {
  ADVICE_ICON_SIZE,
  AdviceCategory,
  AdviceState,
  adviceStyle,
} from './advice.js';

/**
 * @module
 * The icon beside an advice band: the category's glyph from the icon set,
 * copied as paths so a band renderer can place it in its own coordinate
 * space, where a custom element cannot go. At rest every category shows its
 * outline glyph in the icon colour; triggered, a go-to category keeps the
 * outline in the band's colour and an alert category switches to its IEC
 * icon with that icon's own colours. Each glyph names the `obi-*` icon it
 * copies, and `advice-icons.spec.ts` holds the copy to that module.
 *
 * TODO(designer): the advice spec draws optimal as a diamond with a plus and
 * the triggered warning as a filled circle with an exclamation mark; neither
 * is in the icon set, so optimal takes the readout block's advice icon and
 * warning its IEC icon.
 */

/** One `<path>` of a glyph. `'color'` takes the icon colour; a `var()` is the token the icon module binds. */
interface GlyphPath {
  d: string;
  evenOdd?: boolean;
  fill: 'color' | 'none' | `var(${string})`;
  stroke?: `var(${string})`;
}

export interface AdviceGlyph {
  /** The icon set element this glyph copies, with `useCssColor` when its colours are tokens. */
  source: `obi-${string}`;
  useCssColor?: boolean;
  paths: GlyphPath[];
}

const outline = (source: `obi-${string}`, ...ds: string[]): AdviceGlyph => ({
  source,
  paths: ds.map((d) => ({d, evenOdd: true, fill: 'color'})),
});

const ADVICE_GLYPH = outline(
  'obi-notification-advice',
  'M9 19L12 22L15 19H20C21.1046 19 22 18.1046 22 17V5C22 3.89543 21.1046 3 20 3H4C2.89543 3 2 3.89543 2 5V17C2 18.1046 2.89543 19 4 19H9ZM12 19.1716L14.1716 17H20V5H4L4 17H9.82843L12 19.1716Z'
);
ADVICE_GLYPH.paths.push({
  d: 'M9.73374 14.6603L11.9999 13.3297L14.2661 14.6603C14.5878 14.8492 14.9786 14.5593 14.8912 14.1967L14.2965 11.7277L16.279 10.0676C16.5695 9.82438 16.4181 9.35125 16.0403 9.32191L13.4152 9.11796L12.3877 6.75425C12.2403 6.41525 11.7595 6.41525 11.6122 6.75425L10.5846 9.11796L7.95951 9.32191C7.58176 9.35125 7.43032 9.82438 7.72082 10.0676L9.70335 11.7277L9.10859 14.1967C9.02124 14.5593 9.41208 14.8492 9.73374 14.6603Z',
  fill: 'color',
});

const RUNNING_GLYPH = outline(
  'obi-running',
  'M12.0005 20C16.4188 20 20.0005 16.4183 20.0005 12C20.0005 7.58172 16.4188 4 12.0005 4C7.58221 4 4.00049 7.58172 4.00049 12C4.00049 16.4183 7.58221 20 12.0005 20ZM12.0005 22C17.5233 22 22.0005 17.5228 22.0005 12C22.0005 6.47715 17.5233 2 12.0005 2C6.47764 2 2.00049 6.47715 2.00049 12C2.00049 17.5228 6.47764 22 12.0005 22Z',
  'M17.7072 9.70706L10.5001 16.9142L6.29297 12.7071L7.70718 11.2928L10.5001 14.0857L16.293 8.29285L17.7072 9.70706Z'
);

const RUNNING_IEC_GLYPH: AdviceGlyph = {
  source: 'obi-running-color-iec',
  useCssColor: true,
  paths: [
    {
      d: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
      evenOdd: true,
      fill: 'var(--alert-running-color)',
    },
    {
      d: 'M18.2071 9.20718L10.5 16.9143L5.79291 12.2072L7.20712 10.793L10.5 14.0859L16.7929 7.79297L18.2071 9.20718Z',
      evenOdd: true,
      fill: 'var(--on-running-active-color)',
    },
  ],
};

const LEAF_GLYPH = outline(
  'obi-leaf',
  'M12 20C11.0667 20 10.1875 19.8542 9.3625 19.5625C8.5375 19.2708 7.78333 18.8583 7.1 18.325L5.7 19.7C5.51667 19.8833 5.28333 19.975 5 19.975C4.71667 19.975 4.48333 19.8833 4.3 19.7C4.11667 19.5167 4.025 19.2833 4.025 19C4.025 18.7167 4.11667 18.4833 4.3 18.3L5.675 16.925C5.14167 16.2417 4.72917 15.4833 4.4375 14.65C4.14583 13.8167 4 12.9333 4 12C4 9.76667 4.775 7.875 6.325 6.325C7.875 4.775 9.76667 4 12 4H20V12C20 14.2333 19.225 16.125 17.675 17.675C16.125 19.225 14.2333 20 12 20ZM16.25 16.25C15.0833 17.4167 13.6667 18 12 18C11.35 18 10.7292 17.9042 10.1375 17.7125C9.54583 17.5208 9.00833 17.25 8.525 16.9L13.7 11.725C13.9 11.525 14 11.2875 14 11.0125C14 10.7375 13.9 10.5 13.7 10.3C13.5167 10.1167 13.2833 10.025 13 10.025C12.7167 10.025 12.4833 10.1167 12.3 10.3L7.125 15.475C6.775 14.9917 6.5 14.4542 6.3 13.8625C6.1 13.2708 6 12.65 6 12C6 10.3333 6.58333 8.91667 7.75 7.75C8.91667 6.58333 10.3333 6 12 6H18V12C18 13.6667 17.4167 15.0833 16.25 16.25Z'
);

const CAUTION_GLYPH = outline(
  'obi-caution-google',
  'M4 4V20H20V4L4 4ZM2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4Z',
  'M11 6H13V14H11V6ZM13 16V18H11V16H13Z'
);

const CAUTION_IEC_GLYPH: AdviceGlyph = {
  source: 'obi-caution-color-iec',
  useCssColor: true,
  paths: [
    {
      d: 'M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4Z',
      evenOdd: true,
      fill: 'var(--alert-caution-color)',
    },
    {
      d: 'M4 2.5H20C20.8284 2.5 21.5 3.17157 21.5 4V20C21.5 20.8284 20.8284 21.5 20 21.5H4C3.17157 21.5 2.5 20.8284 2.5 20V4C2.5 3.17157 3.17157 2.5 4 2.5Z',
      fill: 'none',
      stroke: 'var(--alert-caution-outline-color)',
    },
    {d: 'M11 14V6H13V14H11Z', fill: 'var(--on-caution-active-color)'},
    {d: 'M13 16H11V18H13V16Z', fill: 'var(--on-caution-active-color)'},
  ],
};

const WARNING_GLYPH = outline(
  'obi-warning-google',
  'M11 6H13V14H11V6ZM13 16V18H11V16H13Z',
  'M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
);

const WARNING_IEC_GLYPH: AdviceGlyph = {
  source: 'obi-warning-unacknowledged-iec',
  useCssColor: true,
  paths: [
    {
      d: 'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z',
      evenOdd: true,
      fill: 'var(--alert-warning-color)',
    },
    {
      d: 'M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z',
      fill: 'none',
      stroke: 'var(--alert-warning-outline-color)',
    },
    {
      d: 'M7.5 13.1999V10.7999C7.5 10.5199 7.5 10.3799 7.5545 10.2729C7.60243 10.1789 7.67892 10.1024 7.773 10.0544C7.87996 9.99993 8.01997 9.99993 8.3 9.99993H10.6686C10.7909 9.99993 10.8521 9.99993 10.9096 9.98611C10.9606 9.97386 11.0094 9.95366 11.0541 9.92625C11.1046 9.89533 11.1478 9.85209 11.2343 9.76561L13.6343 7.36561C14.0627 6.93724 14.2769 6.72305 14.4608 6.70858C14.6203 6.69602 14.7763 6.76061 14.8802 6.88231C15 7.02257 15 7.32548 15 7.9313V16.0686C15 16.6744 15 16.9773 14.8802 17.1175C14.7763 17.2392 14.6203 17.3038 14.4608 17.2913C14.2769 17.2768 14.0627 17.0626 13.6343 16.6342L11.2343 14.2342C11.1478 14.1478 11.1046 14.1045 11.0541 14.0736C11.0094 14.0462 10.9606 14.026 10.9096 14.0137C10.8521 13.9999 10.7909 13.9999 10.6686 13.9999H8.3C8.01997 13.9999 7.87996 13.9999 7.773 13.9454C7.67892 13.8975 7.60243 13.821 7.5545 13.7269C7.5 13.62 7.5 13.48 7.5 13.1999Z',
      fill: 'var(--on-warning-active-color)',
    },
  ],
};

const ALARM_GLYPH = outline(
  'obi-alarm',
  'M20.3426 20L12.0005 4.14753L3.65752 20L20.3426 20ZM11.1158 1.53427L1.11648 20.5339C0.765943 21.1999 1.24879 22 2.00128 22L21.9987 22C22.7512 22 23.234 21.1999 22.8835 20.5339L12.8854 1.53432C12.5105 0.821913 11.4907 0.821889 11.1158 1.53427Z',
  'M10.9995 8.99999H12.9995V14H10.9995V8.99999ZM12.9995 16V18H10.9995V16H12.9995Z'
);

const ALARM_IEC_GLYPH: AdviceGlyph = {
  source: 'obi-alarm-unacknowledged-iec',
  useCssColor: true,
  paths: [
    {
      d: 'M11.5586 1.76758C11.7461 1.41138 12.2559 1.41137 12.4434 1.76758L22.4414 20.7666C22.6167 21.0998 22.3748 21.4998 21.999 21.5H2.00098C1.62518 21.4998 1.38327 21.0998 1.55859 20.7666L11.5586 1.76758Z',
      fill: 'var(--alert-alarm-color)',
      stroke: 'var(--alert-alarm-outline-color)',
    },
    {
      d: 'M7.5 15.7V13.3C7.5 13.02 7.5 12.88 7.5545 12.7731C7.60243 12.679 7.67892 12.6025 7.773 12.5545C7.87996 12.5 8.01997 12.5 8.3 12.5H10.6686C10.7909 12.5 10.8521 12.5 10.9096 12.4862C10.9606 12.474 11.0094 12.4538 11.0541 12.4264C11.1046 12.3954 11.1478 12.3522 11.2343 12.2657L13.6343 9.86573C14.0627 9.43736 14.2769 9.22317 14.4608 9.2087C14.6203 9.19614 14.7763 9.26073 14.8802 9.38243C15 9.5227 15 9.8256 15 10.4314V18.5687C15 19.1745 15 19.4774 14.8802 19.6177C14.7763 19.7394 14.6203 19.804 14.4608 19.7914C14.2769 19.7769 14.0627 19.5627 13.6343 19.1344L11.2343 16.7344C11.1478 16.6479 11.1046 16.6047 11.0541 16.5737C11.0094 16.5463 10.9606 16.5261 10.9096 16.5139C10.8521 16.5 10.7909 16.5 10.6686 16.5H8.3C8.01997 16.5 7.87996 16.5 7.773 16.4456C7.67892 16.3976 7.60243 16.3211 7.5545 16.227C7.5 16.1201 7.5 15.9801 7.5 15.7Z',
      fill: 'var(--on-alarm-active-color)',
    },
  ],
};

const INFO_GLYPH: AdviceGlyph = {
  source: 'obi-info',
  paths: [
    {
      d: 'M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z',
      fill: 'color',
    },
  ],
};

/** The glyph of each category at rest and while triggered. */
export const ADVICE_GLYPHS: Record<
  AdviceCategory,
  {rest: AdviceGlyph; triggered: AdviceGlyph}
> = {
  [AdviceCategory.optimal]: {rest: ADVICE_GLYPH, triggered: ADVICE_GLYPH},
  [AdviceCategory.running]: {rest: RUNNING_GLYPH, triggered: RUNNING_IEC_GLYPH},
  [AdviceCategory.eco]: {rest: LEAF_GLYPH, triggered: LEAF_GLYPH},
  [AdviceCategory.caution]: {rest: CAUTION_GLYPH, triggered: CAUTION_IEC_GLYPH},
  [AdviceCategory.warning]: {rest: WARNING_GLYPH, triggered: WARNING_IEC_GLYPH},
  [AdviceCategory.alarm]: {rest: ALARM_GLYPH, triggered: ALARM_IEC_GLYPH},
  [AdviceCategory.exclusion]: {rest: INFO_GLYPH, triggered: INFO_GLYPH},
};

/** The glyph a category shows in a state. */
export function adviceGlyph(
  category: AdviceCategory,
  state: AdviceState
): AdviceGlyph {
  const g = ADVICE_GLYPHS[category];
  return state === AdviceState.triggered ? g.triggered : g.rest;
}

export interface AdviceIconOptions {
  category: AdviceCategory;
  state: AdviceState;
  /** The icon box's centre. */
  x: number;
  y: number;
  /** The box's side; the glyph's 24-unit box scales to it. */
  size?: number;
}

/** The category's glyph, upright, centred on `(x, y)`. */
export function renderAdviceIcon(o: AdviceIconOptions): SVGTemplateResult {
  const size = o.size ?? ADVICE_ICON_SIZE;
  const glyph = adviceGlyph(o.category, o.state);
  const color = adviceStyle(o.category, o.state).iconColor;
  const k = size / ADVICE_ICON_SIZE;
  const paths = glyph.paths.map(
    (p) =>
      svg`<path d=${p.d} fill-rule=${p.evenOdd ? 'evenodd' : 'nonzero'} fill=${p.fill === 'color' ? color : p.fill} stroke=${p.stroke ?? 'none'}/>`
  );
  return svg`<g class="advice-icon" transform="translate(${o.x - size / 2} ${o.y - size / 2}) scale(${k})">${paths}</g>`;
}
