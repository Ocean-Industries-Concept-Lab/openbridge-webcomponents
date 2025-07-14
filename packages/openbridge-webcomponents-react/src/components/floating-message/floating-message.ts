
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcFloatingMessage as ObcFloatingMessageElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-message/floating-message.js';
 
 
 

 
 export const ObcFloatingMessage = createComponent({
   react: React,
   tagName: 'obc-floating-message',
   elementClass: ObcFloatingMessageElement,
   events: {
     
     onActionClick: 'action-click' as EventName<CustomEvent<void>>,
     onAction2Click: 'action2-click' as EventName<CustomEvent<void>>,
     onDismissClick: 'dismiss-click' as EventName<CustomEvent<void>>,
   }
  });
 
 