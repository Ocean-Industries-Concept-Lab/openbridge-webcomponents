
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcPump as ObcPumpElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/pump/pump.js';
 
 
 

 
 export const ObcPump = createComponent({
   react: React,
   tagName: 'obc-pump',
   elementClass: ObcPumpElement,
   events: {
     
   }
  });
 
 