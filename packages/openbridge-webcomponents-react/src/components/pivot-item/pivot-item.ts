
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcPivotItem as ObcPivotItemElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/pivot-item/pivot-item.js';
 
 
 

 
 export const ObcPivotItem = createComponent({
   react: React,
   tagName: 'obc-pivot-item',
   elementClass: ObcPivotItemElement,
   events: {
     
     onSelected: 'selected' as EventName<CustomEvent<{value: string}>>,
   }
  });
 
 