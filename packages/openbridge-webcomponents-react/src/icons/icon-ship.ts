
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiShip as ObiShipElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-ship.js';
 
 
 

 
 export const ObiShip = createComponent({
   react: React,
   tagName: 'obi-ship',
   elementClass: ObiShipElement,
   events: {
     
   }
  });
 
 