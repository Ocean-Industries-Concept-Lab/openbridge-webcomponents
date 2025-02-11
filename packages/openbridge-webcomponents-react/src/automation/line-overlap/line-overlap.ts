
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcLineOverlap as ObcLineOverlapElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/automation/line-overlap/line-overlap.js';
 
 
 

 
 export const ObcLineOverlap = createComponent({
   react: React,
   tagName: 'obc-line-overlap',
   elementClass: ObcLineOverlapElement,
   events: {
     
   }
  });
 
 