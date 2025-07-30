
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcFloatingItem as ObcFloatingItemElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/floating-item/floating-item.js';
 
 
 

 
 export const ObcFloatingItem = createComponent({
   react: React,
   tagName: 'obc-floating-item',
   elementClass: ObcFloatingItemElement,
   events: {
     
     onActionClick: 'action-click' as EventName<CustomEvent<void>>,
     onAction2Click: 'action2-click' as EventName<CustomEvent<void>>,
     onDismissClick: 'dismiss-click' as EventName<CustomEvent<void>>,
   }
  });
 
 