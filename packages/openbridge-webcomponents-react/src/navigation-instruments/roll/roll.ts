
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcRoll as ObcRollElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/roll/roll.js';
 
 
 

 
 export const ObcRoll = createComponent({
   react: React,
   tagName: 'obc-roll',
   elementClass: ObcRollElement,
   events: {
     
   }
  });
 
 