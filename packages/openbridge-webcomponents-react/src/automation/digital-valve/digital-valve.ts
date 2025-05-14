
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcDigitalValve as ObcDigitalValveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/digital-valve/digital-valve.js';
 
 
 

 
 export const ObcDigitalValve = createComponent({
   react: React,
   tagName: 'obc-digital-valve',
   elementClass: ObcDigitalValveElement,
   events: {
     
   }
  });
 
 