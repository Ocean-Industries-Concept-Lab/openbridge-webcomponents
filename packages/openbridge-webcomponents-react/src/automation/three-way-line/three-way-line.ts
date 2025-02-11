
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcThreeWayLine as ObcThreeWayLineElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/three-way-line/three-way-line.js';
 
 
 

 
 export const ObcThreeWayLine = createComponent({
   react: React,
   tagName: 'obc-three-way-line',
   elementClass: ObcThreeWayLineElement,
   events: {
     
   }
  });
 
 