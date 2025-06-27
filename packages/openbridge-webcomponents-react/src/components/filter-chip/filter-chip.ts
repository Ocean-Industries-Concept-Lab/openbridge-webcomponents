
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcFilterChip as ObcFilterChipElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/filter-chip/filter-chip.js';
 import {ObcFilterChipChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/filter-chip/filter-chip.js';
 export type {ObcFilterChipChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/filter-chip/filter-chip.js';
 

 
 export const ObcFilterChip = createComponent({
   react: React,
   tagName: 'obc-filter-chip',
   elementClass: ObcFilterChipElement,
   events: {
     
     onChipToggle: 'chip-toggle' as EventName<ObcFilterChipChangeEvent>,
   }
  });
 
 