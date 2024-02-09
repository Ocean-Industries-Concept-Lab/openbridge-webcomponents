
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcNavigationMenu as ObcNavigationMenuElement} from '@tibnor/openbridge-webcomponents/dist/components/navigation-menu/navigation-menu.js';
 
 
 

 
 export const ObcNavigationMenu = createComponent({
   react: React,
   tagName: 'obc-navigation-menu',
   elementClass: ObcNavigationMenuElement,
   events: {
     
   }
  });
 
 