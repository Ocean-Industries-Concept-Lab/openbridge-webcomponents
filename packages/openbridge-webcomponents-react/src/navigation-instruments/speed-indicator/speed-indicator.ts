
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcSpeedIndicator as ObcSpeedIndicatorElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/speed-indicator/speed-indicator.js';
 
 
 

 
 export const ObcSpeedIndicator = createComponent({
   react: React,
   tagName: 'obc-speed-indicator',
   elementClass: ObcSpeedIndicatorElement,
   events: {
     
   }
  });
 
 