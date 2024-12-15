
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiHvac as ObiHvacElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-hvac.js';
 
 
 

 
 export const ObiHvac = createComponent({
   react: React,
   tagName: 'obi-hvac',
   elementClass: ObiHvacElement,
   events: {
     
   }
  });
 
 