
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcAlertTopbarElement as ObcAlertTopbarElementElement} from '@oicl/openbridge-webcomponents/dist/components/alert-topbar-element/alert-topbar-element.js';
 
 
 

 
 export const ObcAlertTopbarElement = createComponent({
   react: React,
   tagName: 'obc-alert-topbar-element',
   elementClass: ObcAlertTopbarElementElement,
   events: {
     
     onMuteclick: 'muteclick' as EventName<CustomEvent<unknown>>,
     onAckclick: 'ackclick' as EventName<CustomEvent<unknown>>,
     onAlertclick: 'alertclick' as EventName<CustomEvent<unknown>>,
     onMessageclick: 'messageclick' as EventName<CustomEvent<unknown>>,
   }
  });
 
 