
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcAppMenu as ObcAppMenuElement} from '@tibnor/openbridge-webcomponents/dist/components/app-menu/app-menu.js';
 
 
 

 
 export const ObcAppMenu = createComponent({
   react: React,
   tagName: 'obc-app-menu',
   elementClass: ObcAppMenuElement,
   events: {
     
   }
  });
 
 