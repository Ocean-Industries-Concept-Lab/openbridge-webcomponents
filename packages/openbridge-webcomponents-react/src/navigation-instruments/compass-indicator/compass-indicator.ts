
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcCompassIndicator as ObcCompassIndicatorElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/compass-indicator/compass-indicator.js';
 
 
 

 
 export const ObcCompassIndicator = createComponent({
   react: React,
   tagName: 'obc-compass-indicator',
   elementClass: ObcCompassIndicatorElement,
   events: {
     
   }
  });
 
 