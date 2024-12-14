
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiTable as ObiTableElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-table.js';
 
 
 

 
 export const ObiTable = createComponent({
   react: React,
   tagName: 'obi-table',
   elementClass: ObiTableElement,
   events: {
     
   }
  });
 
 