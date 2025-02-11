
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcLineCross as ObcLineCrossElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/automation/line-cross/line-cross.js';
 
 
 

 
 export const ObcLineCross = createComponent({
   react: React,
   tagName: 'obc-line-cross',
   elementClass: ObcLineCrossElement,
   events: {
     
   }
  });
 
 