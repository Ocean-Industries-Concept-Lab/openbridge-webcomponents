
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcCheckbox as ObcCheckboxElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/checkbox/checkbox.js';
 import {ObcCheckboxChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/checkbox/checkbox.js';
 export type {ObcCheckboxChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/checkbox/checkbox.js';
 

 
 export const ObcCheckbox = createComponent({
   react: React,
   tagName: 'obc-checkbox',
   elementClass: ObcCheckboxElement,
   events: {
     
     onChange: 'change' as EventName<ObcCheckboxChangeEvent>,
     onDisabled: 'disabled' as EventName<ObcCheckboxChangeEvent>,
   }
  });
 
 