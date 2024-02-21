
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcThruster as ObcThrusterElement} from '@tibnor/openbridge-webcomponents/dist/navigation-instruments/thruster/thruster.js';
 
 
 

 
 export const ObcThruster = createComponent({
   react: React,
   tagName: 'obc-thruster',
   elementClass: ObcThrusterElement,
   events: {
     
   }
  });
 
 