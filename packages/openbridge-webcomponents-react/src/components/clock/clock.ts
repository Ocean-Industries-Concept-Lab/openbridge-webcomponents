
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcClock as ObcClockElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/components/clock/clock.js';
 
 
 

 
 export const ObcClock = createComponent({
   react: React,
   tagName: 'obc-clock',
   elementClass: ObcClockElement,
   events: {
     
   }
  });
 
 