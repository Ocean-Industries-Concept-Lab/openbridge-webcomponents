
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcScrollbar as ObcScrollbarElement} from '@oicl/openbridge-webcomponents/dist/components/scrollbar/scrollbar.js';
 
 
 

 
 export const ObcScrollbar = createComponent({
   react: React,
   tagName: 'obc-scrollbar',
   elementClass: ObcScrollbarElement,
   events: {
     
   }
  });
 
 