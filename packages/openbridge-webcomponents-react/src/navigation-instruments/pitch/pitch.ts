
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcPitch as ObcPitchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/pitch/pitch.js';
 
 
 

 
 export const ObcPitch = createComponent({
   react: React,
   tagName: 'obc-pitch',
   elementClass: ObcPitchElement,
   events: {
     
   }
  });
 
 