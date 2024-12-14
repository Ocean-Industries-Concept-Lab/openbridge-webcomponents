
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiBatteryPackCharging as ObiBatteryPackChargingElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-battery-pack-charging.js';
 
 
 

 
 export const ObiBatteryPackCharging = createComponent({
   react: React,
   tagName: 'obi-battery-pack-charging',
   elementClass: ObiBatteryPackChargingElement,
   events: {
     
   }
  });
 
 