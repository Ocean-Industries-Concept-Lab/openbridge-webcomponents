
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiEnergyBattery as ObiEnergyBatteryElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-energy-battery.js';
 
 
 

 
 export const ObiEnergyBattery = createComponent({
   react: React,
   tagName: 'obi-energy-battery',
   elementClass: ObiEnergyBatteryElement,
   events: {
     
   }
  });
 
 