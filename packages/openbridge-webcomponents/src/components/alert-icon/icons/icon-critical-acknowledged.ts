import {svg} from 'lit';

export const criticalAcknowledged = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M 22,12
           L 17,20.66
           L 7,20.66
           L 2,12
           L 7,3.34
           L 17,3.34
           Z"
        fill="var(--alert-critical-color)" stroke="var(--alert-critical-outline-color)" />
<path d="M13 13V7H11V13H13Z" fill="var(--on-critical-active-color)"/>
<path d="M13 17V15H11V17H13Z" fill="var(--on-critical-active-color)"/>
</svg>`;
