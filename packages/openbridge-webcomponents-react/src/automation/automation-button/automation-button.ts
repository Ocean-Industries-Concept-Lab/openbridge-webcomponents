
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcAutomationButton as ObcAutomationButtonElement} from '@oicl/openbridge-webcomponents/dist/automation/automation-button/automation-button.js';
 
 
 

 
 export const ObcAutomationButton = createComponent({
   react: React,
   tagName: 'obc-automation-button',
   elementClass: ObcAutomationButtonElement,
   events: {
     
   }
  });
 
 