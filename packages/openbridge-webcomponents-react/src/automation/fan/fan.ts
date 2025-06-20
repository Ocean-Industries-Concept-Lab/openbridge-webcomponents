
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcFan as ObcFanElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/fan/fan.js';
 
 
 

 
 export const ObcFan = createComponent({
   react: React,
   tagName: 'obc-fan',
   elementClass: ObcFanElement,
   events: {
     
   }
  });
 
 