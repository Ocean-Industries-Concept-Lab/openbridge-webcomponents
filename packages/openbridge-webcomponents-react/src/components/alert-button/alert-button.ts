
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcAlertButton as ObcAlertButtonElement} from '@tibnor/openbridge-webcomponents/dist/components/alert-button/alert-button.js';
 
 
 

 
 export const ObcAlertButton = createComponent({
   react: React,
   tagName: 'obc-alert-button',
   elementClass: ObcAlertButtonElement,
   events: {
     
     onClick: 'click' as EventName<CustomEvent<unknown>>,
   }
  });
 
 