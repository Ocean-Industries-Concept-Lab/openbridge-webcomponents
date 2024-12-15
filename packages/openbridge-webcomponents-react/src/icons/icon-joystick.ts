
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiJoystick as ObiJoystickElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-joystick.js';
 
 
 

 
 export const ObiJoystick = createComponent({
   react: React,
   tagName: 'obi-joystick',
   elementClass: ObiJoystickElement,
   events: {
     
   }
  });
 
 