
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcContextMenu as ObcContextMenuElement} from '@tibnor/openbridge-webcomponents/dist/components/context-menu/context-menu.js';
 
 
 

 
 export const ObcContextMenu = createComponent({
   react: React,
   tagName: 'obc-context-menu',
   elementClass: ObcContextMenuElement,
   events: {
     
   }
  });
 
 