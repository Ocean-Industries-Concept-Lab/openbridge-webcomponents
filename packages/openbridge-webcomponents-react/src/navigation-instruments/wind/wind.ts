
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcWind as ObcWindElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/wind/wind.js';
 
 
 

 
 export const ObcWind = createComponent({
   react: React,
   tagName: 'obc-wind',
   elementClass: ObcWindElement,
   events: {
     
   }
  });
 
 