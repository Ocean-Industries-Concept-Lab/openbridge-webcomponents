
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiTemperature as ObiTemperatureElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-temperature.js';
 
 
 

 
 export const ObiTemperature = createComponent({
   react: React,
   tagName: 'obi-temperature',
   elementClass: ObiTemperatureElement,
   events: {
     
   }
  });
 
 