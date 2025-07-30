
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcSplitButton as ObcSplitButtonElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/split-button/split-button.js';
 import {ContextMenuOption} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
 export type {ContextMenuOption} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/context-menu-input/context-menu-input.js';
 

 
 export const ObcSplitButton = createComponent({
   react: React,
   tagName: 'obc-split-button',
   elementClass: ObcSplitButtonElement,
   events: {
     
     onClick: 'click' as EventName<CustomEvent<{action: 'primary' | 'dropdown', value?: string, option?: ContextMenuOption}>>,
     onChange: 'change' as EventName<CustomEvent<{selectedValues: string[], selectedOptions: Array<ContextMenuOption>}>>,
   }
  });
 
 