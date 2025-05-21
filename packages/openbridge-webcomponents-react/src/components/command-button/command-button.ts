
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcCommandButton as ObcCommandButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/command-button/command-button.js';
 
 
 

 
 export const ObcCommandButton = createComponent({
   react: React,
   tagName: 'obc-command-button',
   elementClass: ObcCommandButtonElement,
   events: {
     
   }
  });
 
 