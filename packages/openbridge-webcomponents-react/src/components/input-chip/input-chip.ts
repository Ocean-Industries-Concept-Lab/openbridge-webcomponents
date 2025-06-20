
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcInputChip as ObcInputChipElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/input-chip/input-chip.js';
 
 
 

 
 export const ObcInputChip = createComponent({
   react: React,
   tagName: 'obc-input-chip',
   elementClass: ObcInputChipElement,
   events: {
     
     onRemoveChip: 'remove-chip' as EventName<CustomEvent<unknown>>,
   }
  });
 
 