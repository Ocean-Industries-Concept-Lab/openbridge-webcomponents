
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiElectricalClock as ObiElectricalClockElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-electrical-clock.js';
 
 
 

 
 export const ObiElectricalClock = createComponent({
   react: React,
   tagName: 'obi-electrical-clock',
   elementClass: ObiElectricalClockElement,
   events: {
     
   }
  });
 
 