import {svg} from 'lit';

// TODO(designer): the source of truth is Figma node 208-29982 ("Vessel",
// Generic/Top); its export draws the outline as a mask-based inside stroke
// that scales with the vessel (the bug this hand-conversion fixes). When
// regenerating via script/convert-vessel-svg-to-ts.ts, keep the outline as a
// real non-scaling stroke like the other vessel assets.
export default svg`<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M80 9.18359C71.6308 14.0249 66 23.0737 66 33.4377L66 151.06L94 151.06L94 33.4377C94 23.0737 88.3692 14.0249 80 9.18359Z" fill="var(--instrument-frame-primary-color)"/>
<path d="M80 9.18359C71.6308 14.0249 66 23.0737 66 33.4377L66 151.06L94 151.06L94 33.4377C94 23.0737 88.3692 14.0249 80 9.18359Z" vector-effect="non-scaling-stroke" stroke="var(--instrument-tick-mark-secondary-color)"/>
</svg>
`;
