
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcAlertMenu as ObcAlertMenuElement} from '@tibnor/openbridge-webcomponents/dist/components/alert-menu/alert-menu.js';
 
 
 

 
 export const ObcAlertMenu = createComponent({
   react: React,
   tagName: 'obc-alert-menu',
   elementClass: ObcAlertMenuElement,
   events: {
     
     onAckAllClick: 'ack-all-click' as EventName<CustomEvent<unknown>>,
     onAlertListClick: 'alert-list-click' as EventName<CustomEvent<unknown>>,
   }
  });
 
 