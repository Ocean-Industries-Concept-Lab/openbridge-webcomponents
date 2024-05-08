
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcAutomationReadout as ObcAutomationReadoutElement} from '@oicl/openbridge-webcomponents/dist/automation/automation-readout/automation-readout.js';
 
 
 

 
 export const ObcAutomationReadout = createComponent({
   react: React,
   tagName: 'obc-automation-readout',
   elementClass: ObcAutomationReadoutElement,
   events: {
     
   }
  });
 
 