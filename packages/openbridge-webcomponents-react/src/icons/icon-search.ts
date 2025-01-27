
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiSearch as ObiSearchElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-search.js';
 
 
 

 
 export const ObiSearch = createComponent({
   react: React,
   tagName: 'obi-search',
   elementClass: ObiSearchElement,
   events: {
     
   }
  });
 
 