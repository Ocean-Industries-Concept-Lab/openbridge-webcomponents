
 import * as React from 'react';
 import {createComponent, EventName} from '@lit/react';
 
 import {ObcSliderDouble as ObcSliderDoubleElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider-double/slider-double.js';
 import {ObcSliderDoubleValueEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider-double/slider-double.js';
 export type {ObcSliderDoubleValueEvent} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/components/slider-double/slider-double.js';
 

 
 export const ObcSliderDouble = createComponent({
   react: React,
   tagName: 'obc-slider-double',
   elementClass: ObcSliderDoubleElement,
   events: {
     
     onValue: 'value' as EventName<ObcSliderDoubleValueEvent>,
   }
  });
 
 