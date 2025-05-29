
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcSpeedArrows as ObcSpeedArrowsElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/speed-arrows/speed-arrows.js';
 
 
 

 
 export const ObcSpeedArrows = createComponent({
   react: React,
   tagName: 'obc-speed-arrows',
   elementClass: ObcSpeedArrowsElement,
   events: {
     
   }
  });
 
 