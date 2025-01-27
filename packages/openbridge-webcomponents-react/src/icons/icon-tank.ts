
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiTank as ObiTankElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-tank.js';
 
 
 

 
 export const ObiTank = createComponent({
   react: React,
   tagName: 'obi-tank',
   elementClass: ObiTankElement,
   events: {
     
   }
  });
 
 