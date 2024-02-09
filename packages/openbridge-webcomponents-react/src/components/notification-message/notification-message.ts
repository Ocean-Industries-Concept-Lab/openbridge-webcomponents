
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcNotificationMessage as ObcNotificationMessageElement} from '@tibnor/openbridge-webcomponents/dist/components/notification-message/notification-message.js';
 
 
 

 
 export const ObcNotificationMessage = createComponent({
   react: React,
   tagName: 'obc-notification-message',
   elementClass: ObcNotificationMessageElement,
   events: {
     
   }
  });
 
 