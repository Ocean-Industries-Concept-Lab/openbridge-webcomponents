
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiPrint as ObiPrintElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-print.js';
 
 
 

 
 export const ObiPrint = createComponent({
   react: React,
   tagName: 'obi-print',
   elementClass: ObiPrintElement,
   events: {
     
   }
  });
 
 