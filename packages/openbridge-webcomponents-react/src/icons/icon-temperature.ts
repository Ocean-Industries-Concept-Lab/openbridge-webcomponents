
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiTemperature as ObiTemperatureElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-temperature.js';
 
 
 

 
 export const ObiTemperature = createComponent({
   react: React,
   tagName: 'obi-temperature',
   elementClass: ObiTemperatureElement,
   events: {
     
   }
  });
 
 