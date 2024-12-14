
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiEpms as ObiEpmsElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-epms.js';
 
 
 

 
 export const ObiEpms = createComponent({
   react: React,
   tagName: 'obi-epms',
   elementClass: ObiEpmsElement,
   events: {
     
   }
  });
 
 