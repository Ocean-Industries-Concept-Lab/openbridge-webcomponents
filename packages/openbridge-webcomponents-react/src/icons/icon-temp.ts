
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiTemp as ObiTempElement} from '@tibnor/openbridge-webcomponents/dist/icons/icon-temp.js';
 
 
 

 
 export const ObiTemp = createComponent({
   react: React,
   tagName: 'obi-temp',
   elementClass: ObiTempElement,
   events: {
     
   }
  });
 
 