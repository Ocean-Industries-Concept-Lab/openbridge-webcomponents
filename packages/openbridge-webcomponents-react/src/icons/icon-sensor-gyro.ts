
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObiSensorGyro as ObiSensorGyroElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-sensor-gyro.js';
 
 
 

 
 export const ObiSensorGyro = createComponent({
   react: React,
   tagName: 'obi-sensor-gyro',
   elementClass: ObiSensorGyroElement,
   events: {
     
   }
  });
 
 