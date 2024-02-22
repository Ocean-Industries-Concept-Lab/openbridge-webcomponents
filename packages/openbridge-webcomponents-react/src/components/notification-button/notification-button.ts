
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcNotificationButton as ObcNotificationButtonElement} from '@oicl/openbridge-webcomponents/dist/components/notification-button/notification-button.js';
 
 
 

 
 export const ObcNotificationButton = createComponent({
   react: React,
   tagName: 'obc-notification-button',
   elementClass: ObcNotificationButtonElement,
   events: {
     
   }
  });
 
 