
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcDropdownButton as ObcDropdownButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/dropdown-button/dropdown-button.js';
 import {ObcDropdownButtonChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/dropdown-button/dropdown-button.js';
 export type {ObcDropdownButtonChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/dropdown-button/dropdown-button.js';
 

 
 export const ObcDropdownButton = createComponent({
   react: React,
   tagName: 'obc-dropdown-button',
   elementClass: ObcDropdownButtonElement,
   events: {
     
     onChange: 'change' as EventName<ObcDropdownButtonChangeEvent>,
   }
  });
 
 