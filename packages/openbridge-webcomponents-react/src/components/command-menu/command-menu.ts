
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcCommandMenu as ObcCommandMenuElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/command-menu/command-menu.js';
 import {ObcCommandMenuChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/command-menu/command-menu.js';
 export type {ObcCommandMenuChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/command-menu/command-menu.js';
 

 
 export const ObcCommandMenu = createComponent({
   react: React,
   tagName: 'obc-command-menu',
   elementClass: ObcCommandMenuElement,
   events: {
     
     onChange: 'change' as EventName<ObcCommandMenuChangeEvent>,
   }
  });
 
 