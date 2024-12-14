
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiCctv as ObiCctvElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-cctv.js';
 
 
 

 
 export const ObiCctv = createComponent({
   react: React,
   tagName: 'obi-cctv',
   elementClass: ObiCctvElement,
   events: {
     
   }
  });
 
 