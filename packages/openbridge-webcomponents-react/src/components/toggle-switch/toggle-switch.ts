
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcToggleSwitch as ObcToggleSwitchElement} from '@tibnor/openbridge-webcomponents/dist/components/toggle-switch/toggle-switch.js';
 
 
 

 
 export const ObcToggleSwitch = createComponent({
   react: React,
   tagName: 'obc-toggle-switch',
   elementClass: ObcToggleSwitchElement,
   events: {
     
   }
  });
 
 