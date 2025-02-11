
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiTank as ObiTankElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/icons/icon-tank.js';
 
 
 

 
 export const ObiTank = createComponent({
   react: React,
   tagName: 'obi-tank',
   elementClass: ObiTankElement,
   events: {
     
   }
  });
 
 