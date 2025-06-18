
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcMotor as ObcMotorElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/automation/motor/motor.js';
 
 
 

 
 export const ObcMotor = createComponent({
   react: React,
   tagName: 'obc-motor',
   elementClass: ObcMotorElement,
   events: {
     
   }
  });
 
 