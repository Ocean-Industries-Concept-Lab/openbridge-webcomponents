
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcMenuButton as ObcMenuButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/menu-button/menu-button.js';
 import {ContextMenuOption} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
 export type {ContextMenuOption} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
 

 
 export const ObcMenuButton = createComponent({
   react: React,
   tagName: 'obc-menu-button',
   elementClass: ObcMenuButtonElement,
   events: {
     
     onChange: 'change' as EventName<CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>>,
     onItemClick: 'item-click' as EventName<CustomEvent<{value: string, option: ContextMenuOption}>>,
     onClose: 'close' as EventName<CustomEvent<void>>,
   }
  });
 
 