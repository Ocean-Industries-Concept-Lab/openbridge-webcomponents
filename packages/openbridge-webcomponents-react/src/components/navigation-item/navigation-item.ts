
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcNavigationItem as ObcNavigationItemElement} from '@tibnor/openbridge-webcomponents/dist/components/navigation-item/navigation-item.js';
 
 
 

 
 export const ObcNavigationItem = createComponent({
   react: React,
   tagName: 'obc-navigation-item',
   elementClass: ObcNavigationItemElement,
   events: {
     
   }
  });
 
 