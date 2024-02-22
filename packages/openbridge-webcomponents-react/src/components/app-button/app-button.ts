
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcAppButton as ObcAppButtonElement} from '@oicl/openbridge-webcomponents/dist/components/app-button/app-button.js';
 
 
 

 
 export const ObcAppButton = createComponent({
   react: React,
   tagName: 'obc-app-button',
   elementClass: ObcAppButtonElement,
   events: {
     
   }
  });
 
 