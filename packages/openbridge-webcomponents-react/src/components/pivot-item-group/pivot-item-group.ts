
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcPivotItemGroup as ObcPivotItemGroupElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/pivot-item-group/pivot-item-group.js';
 
 
 

 
 export const ObcPivotItemGroup = createComponent({
   react: React,
   tagName: 'obc-pivot-item-group',
   elementClass: ObcPivotItemGroupElement,
   events: {
     
     onChange: 'change' as EventName<CustomEvent<{selectedValue: string}>>,
   }
  });
 
 