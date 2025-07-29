
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcTopbarMessageItem as ObcTopbarMessageItemElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/topbar-message-item/topbar-message-item';
 
 
 

 
 export const ObcTopbarMessageItem = createComponent({
   react: React,
   tagName: 'obc-topbar-message-item',
   elementClass: ObcTopbarMessageItemElement,
   events: {
     
     onMessageClick: 'message-click' as EventName<CustomEvent<unknown>>,
     onActionClick: 'action-click' as EventName<CustomEvent<unknown>>,
   }
  });
 
 