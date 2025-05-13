
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcSlider as ObcSliderElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider/slider.js';
 import {ObcSliderValueEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider/slider.js';
 export type {ObcSliderValueEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider/slider.js';
 

 
 export const ObcSlider = createComponent({
   react: React,
   tagName: 'obc-slider',
   elementClass: ObcSliderElement,
   events: {
     
     onValue: 'value' as EventName<ObcSliderValueEvent>,
   }
  });
 
 