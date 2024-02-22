
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcSlider as ObcSliderElement} from '@oicl/openbridge-webcomponents/dist/components/slider/slider.js';
 
 
 

 
 export const ObcSlider = createComponent({
   react: React,
   tagName: 'obc-slider',
   elementClass: ObcSliderElement,
   events: {
     
     onValue: 'value' as EventName<CustomEvent<unknown>>,
   }
  });
 
 