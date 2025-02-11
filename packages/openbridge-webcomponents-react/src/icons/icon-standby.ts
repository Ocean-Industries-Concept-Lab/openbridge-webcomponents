
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiStandby as ObiStandbyElement} from '@Ocean-Industries-Concept-Lab/openbridge-webcomponents/dist/icons/icon-standby.js';
 
 
 

 
 export const ObiStandby = createComponent({
   react: React,
   tagName: 'obi-standby',
   elementClass: ObiStandbyElement,
   events: {
     
   }
  });
 
 