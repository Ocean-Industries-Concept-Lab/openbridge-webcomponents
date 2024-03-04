
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcRichButton as ObcRichButtonElement} from '@oicl/openbridge-webcomponents/dist/components/rich-button/rich-button.js';
 
 
 

 
 export const ObcRichButton = createComponent({
   react: React,
   tagName: 'obc-rich-button',
   elementClass: ObcRichButtonElement,
   events: {
     
   }
  });
 
 