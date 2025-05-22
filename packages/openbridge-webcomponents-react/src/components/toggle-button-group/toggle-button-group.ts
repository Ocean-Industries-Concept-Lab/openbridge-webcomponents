
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcToggleButtonGroup as ObcToggleButtonGroupElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';
 import {ObcToggleButtonGroupValueChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';
 export type {ObcToggleButtonGroupValueChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/toggle-button-group/toggle-button-group.js';
 

 
 export const ObcToggleButtonGroup = createComponent({
   react: React,
   tagName: 'obc-toggle-button-group',
   elementClass: ObcToggleButtonGroupElement,
   events: {
     
     onValue: 'value' as EventName<ObcToggleButtonGroupValueChangeEvent>,
   }
  });
 
 