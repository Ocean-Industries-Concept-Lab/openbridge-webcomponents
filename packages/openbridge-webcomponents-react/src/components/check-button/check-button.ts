
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcCheckButton as ObcCheckButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/check-button/check-button.js';
 
 
 

 
 export const ObcCheckButton = createComponent({
   react: React,
   tagName: 'obc-check-button',
   elementClass: ObcCheckButtonElement,
   events: {
     
     onCheckButtonClick: 'check-button-click' as EventName<CustomEvent<{checked: boolean, type: string}>>,
   }
  });
 
 