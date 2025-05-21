
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcStartStopSwitch as ObcStartStopSwitchElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/start-stop-switch/start-stop-switch.js';
 import {ObcStartStopSwitchChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/start-stop-switch/start-stop-switch.js';
 export type {ObcStartStopSwitchChangeEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/start-stop-switch/start-stop-switch.js';
 

 
 export const ObcStartStopSwitch = createComponent({
   react: React,
   tagName: 'obc-start-stop-switch',
   elementClass: ObcStartStopSwitchElement,
   events: {
     
     onChange: 'change' as EventName<ObcStartStopSwitchChangeEvent>,
   }
  });
 
 