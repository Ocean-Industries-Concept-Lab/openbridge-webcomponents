
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcAnalogValve as ObcAnalogValveElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/analog-valve/analog-valve.js';
 
 
 

 
 export const ObcAnalogValve = createComponent({
   react: React,
   tagName: 'obc-analog-valve',
   elementClass: ObcAnalogValveElement,
   events: {
     
   }
  });
 
 