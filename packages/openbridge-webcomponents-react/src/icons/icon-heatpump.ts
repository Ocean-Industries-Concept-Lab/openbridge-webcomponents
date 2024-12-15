
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiHeatpump as ObiHeatpumpElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-heatpump.js';
 
 
 

 
 export const ObiHeatpump = createComponent({
   react: React,
   tagName: 'obi-heatpump',
   elementClass: ObiHeatpumpElement,
   events: {
     
   }
  });
 
 