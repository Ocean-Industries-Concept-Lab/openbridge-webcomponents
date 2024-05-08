
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcAutomationTank as ObcAutomationTankElement} from '@oicl/openbridge-webcomponents/dist/automation/automation-tank/automation-tank.js';
 
 
 

 
 export const ObcAutomationTank = createComponent({
   react: React,
   tagName: 'obc-automation-tank',
   elementClass: ObcAutomationTankElement,
   events: {
     
   }
  });
 
 