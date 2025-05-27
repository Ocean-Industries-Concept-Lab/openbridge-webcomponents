
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcBearingIndicator as ObcBearingIndicatorElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/bearing-indicator/bearing-indicator.js';
 
 
 

 
 export const ObcBearingIndicator = createComponent({
   react: React,
   tagName: 'obc-bearing-indicator',
   elementClass: ObcBearingIndicatorElement,
   events: {
     
   }
  });
 
 