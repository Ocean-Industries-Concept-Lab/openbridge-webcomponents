
 import * as React from 'react';
 import {createComponent} from '@lit/react';
 
 import {ObcSpeedGauge as ObcSpeedGaugeElement} from '@ocean-industries-concept-lab/openbridge-webcomponents/dist/navigation-instruments/speed-gauge/speed-gauge.js';
 
 
 

 
 export const ObcSpeedGauge = createComponent({
   react: React,
   tagName: 'obc-speed-gauge',
   elementClass: ObcSpeedGaugeElement,
   events: {
     
   }
  });
 
 