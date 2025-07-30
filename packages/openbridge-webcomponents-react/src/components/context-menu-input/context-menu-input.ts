
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcContextMenuInput as ObcContextMenuInputElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
 import {ContextMenuOption} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
 export type {ContextMenuOption} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
 

 
 export const ObcContextMenuInput = createComponent({
   react: React,
   tagName: 'obc-context-menu-input',
   elementClass: ObcContextMenuInputElement,
   events: {
     
     onChange: 'change' as EventName<CustomEvent<{selectedValues: string[], selectedOptions: ContextMenuOption[]}>>,
     onItemClick: 'item-click' as EventName<CustomEvent<{value: string, option: ContextMenuOption}>>,
     onClose: 'close' as EventName<CustomEvent<void>>,
   }
  });
 
 