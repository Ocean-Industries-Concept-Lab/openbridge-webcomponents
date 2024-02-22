
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {Obi19Temperature as Obi19TemperatureElement} from '@oicl/openbridge-webcomponents/dist/icons/icon-19-temperature.js';
 
 
 

 
 export const Obi19Temperature = createComponent({
   react: React,
   tagName: 'obi-19-temperature',
   elementClass: Obi19TemperatureElement,
   events: {
     
   }
  });
 
 