
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcSelect as ObcSelectElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/select/select.js';
 import {ObcSelectChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/select/select.js';
 export type {ObcSelectChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/select/select.js';
 

 
 export const ObcSelect = createComponent({
   react: React,
   tagName: 'obc-select',
   elementClass: ObcSelectElement,
   events: {
     
     onChange: 'change' as EventName<ObcSelectChangeEvent>,
   }
  });
 
 