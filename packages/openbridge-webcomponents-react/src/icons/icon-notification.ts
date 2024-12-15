
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiNotification as ObiNotificationElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-notification.js';
 
 
 

 
 export const ObiNotification = createComponent({
   react: React,
   tagName: 'obi-notification',
   elementClass: ObiNotificationElement,
   events: {
     
   }
  });
 
 