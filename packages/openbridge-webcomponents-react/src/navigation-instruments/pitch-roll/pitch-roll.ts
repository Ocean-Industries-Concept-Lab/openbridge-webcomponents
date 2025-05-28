
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcPitchRoll as ObcPitchRollElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/pitch-roll/pitch-roll.js';
 
 
 

 
 export const ObcPitchRoll = createComponent({
   react: React,
   tagName: 'obc-pitch-roll',
   elementClass: ObcPitchRollElement,
   events: {
     
   }
  });
 
 