
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcToggleSwitch as ObcToggleSwitchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-switch/toggle-switch.js';
 
 
 

 
 export const ObcToggleSwitch = createComponent({
   react: React,
   tagName: 'obc-toggle-switch',
   elementClass: ObcToggleSwitchElement,
   events: {
     
     onInput: 'input' as EventName<CustomEvent<unknown>>,
   }
  });
 
 