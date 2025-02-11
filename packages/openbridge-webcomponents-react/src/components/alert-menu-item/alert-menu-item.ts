
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcAlertMenuItem as ObcAlertMenuItemElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/components/alert-menu-item/alert-menu-item.js';
 
 
 

 
 export const ObcAlertMenuItem = createComponent({
   react: React,
   tagName: 'obc-alert-menu-item',
   elementClass: ObcAlertMenuItemElement,
   events: {
     
     onAckClick: 'ack-click' as EventName<CustomEvent<unknown>>,
   }
  });
 
 