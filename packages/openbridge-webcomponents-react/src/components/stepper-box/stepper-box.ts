
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcStepperBox as ObcStepperBoxElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/stepper-box/stepper-box.js';
 
 
 

 
 export const ObcStepperBox = createComponent({
   react: React,
   tagName: 'obc-stepper-box',
   elementClass: ObcStepperBoxElement,
   events: {
     
     onDown: 'down' as EventName<CustomEvent<unknown>>,
     onUp: 'up' as EventName<CustomEvent<unknown>>,
   }
  });
 
 