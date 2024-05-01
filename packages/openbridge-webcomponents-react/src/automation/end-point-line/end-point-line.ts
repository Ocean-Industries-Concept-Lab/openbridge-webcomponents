
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcEndPointLine as ObcEndPointLineElement} from '@oicl/openbridge-webcomponents/dist/automation/end-point-line/end-point-line.js';
 
 
 

 
 export const ObcEndPointLine = createComponent({
   react: React,
   tagName: 'obc-end-point-line',
   elementClass: ObcEndPointLineElement,
   events: {
     
   }
  });
 
 