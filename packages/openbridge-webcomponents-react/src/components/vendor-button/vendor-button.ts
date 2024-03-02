
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcVendorButton as ObcVendorButtonElement} from '@oicl/openbridge-webcomponents/dist/components/vendor-button/vendor-button.js';
 
 
 

 
 export const ObcVendorButton = createComponent({
   react: React,
   tagName: 'obc-vendor-button',
   elementClass: ObcVendorButtonElement,
   events: {
     
   }
  });
 
 