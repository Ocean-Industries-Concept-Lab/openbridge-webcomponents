
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcCornerLine as ObcCornerLineElement} from '@oicl/openbridge-webcomponents/dist/automation/corner-line/corner-line.js';
 
 
 

 
 export const ObcCornerLine = createComponent({
   react: React,
   tagName: 'obc-corner-line',
   elementClass: ObcCornerLineElement,
   events: {
     
   }
  });
 
 