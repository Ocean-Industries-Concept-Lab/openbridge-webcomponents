
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiAntenna as ObiAntennaElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-antenna.js';
 
 
 

 
 export const ObiAntenna = createComponent({
   react: React,
   tagName: 'obi-antenna',
   elementClass: ObiAntennaElement,
   events: {
     
   }
  });
 
 